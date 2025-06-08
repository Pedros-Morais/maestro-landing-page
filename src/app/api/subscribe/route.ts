import { NextResponse } from "next/server";
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_xol2mne";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_wtf4dzc";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "5Ys2OtrDM9Y8aha4P"; 

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const namePart = email.split('@')[0];
    const formattedName = namePart
      .split(/[\._-]/)
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    const templateParams = {
      to_email: email,
      to_name: formattedName,
      from_name: "Equipe Maestro",
      message: `Olá ${formattedName}, agradecemos por se inscrever no beta do Maestro. Você será notificado em breve com acesso antecipado.`,
      subject: `Bem-vindo ao Beta do Maestro, ${formattedName}!`
    };

    console.log(`Email armazenado: ${email}`);
    
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        console.error("Erro ao enviar email via EmailJS:", emailError);
      }
    } else {
      console.log("Configuração de EmailJS não detectada - modo simulação");
      console.log(`Enviaria email para: ${email}`);
      console.log(`Assunto: Bem-vindo ao Beta do Maestro, ${formattedName}!`);
      console.log(`Corpo: Olá ${formattedName}, agradecemos por se inscrever no beta do Maestro.`);
      
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    return NextResponse.json({
      success: true,
      message: "Email enviado com sucesso!",
      userName: formattedName
    });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      { error: "Falha ao processar a requisição" },
      { status: 500 }
    );
  }
}

// Função para validar o formato do email
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
