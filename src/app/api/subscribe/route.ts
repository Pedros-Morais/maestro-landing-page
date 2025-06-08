import { NextResponse } from "next/server";


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

   
    console.log(`Email armazenado: ${email}`);
    
    console.log(`Email registrado com sucesso: ${email}`);
    console.log(`Nome formatado: ${formattedName}`);
    console.log(`Simulando envio de email para: ${email}`);
    console.log(`Assunto: Bem-vindo ao Beta do Maestro, ${formattedName}!`);
      
    await new Promise(resolve => setTimeout(resolve, 800));

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

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
