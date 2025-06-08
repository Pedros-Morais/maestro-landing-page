import emailjs from '@emailjs/browser';

// Credenciais do EmailJS (idealmente deveriam vir de variáveis de ambiente)
const SERVICE_ID = "service_xol2mne";
const TEMPLATE_ID = "template_wtf4dzc";
const PUBLIC_KEY = "5Ys2OtrDM9Y8aha4P";

// Inicializa o EmailJS no cliente (não no servidor)
export const initEmailJS = () => {
  if (typeof window !== 'undefined') {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
      console.log('EmailJS initialized with public key');
    } else {
      console.log('EmailJS não foi inicializado: chave pública não encontrada');
    }
  }
};

// Enviar email diretamente do frontend usando EmailJS
export const sendEmailToSubscriber = async (email: string, name: string): Promise<{success: boolean, error?: any}> => {
  try {
    if (typeof window === 'undefined') {
      throw new Error('Esta função só pode ser executada no navegador');
    }
    
    const templateParams = {
      to_email: email,
      to_name: name,
      from_name: "Equipe Maestro",
      message: `Olá ${name}, agradecemos por se inscrever no beta do Maestro. Você será notificado em breve com acesso antecipado.`,
      subject: `Bem-vindo ao Beta do Maestro, ${name}!`
    };
    
    // Enviando email via EmailJS
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    
    console.log(`Email enviado com sucesso para ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar email via EmailJS:', error);
    return { success: false, error };
  }
};
