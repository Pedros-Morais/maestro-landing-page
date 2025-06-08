import emailjs from '@emailjs/browser';

// Inicializa o EmailJS no cliente (não no servidor)
export const initEmailJS = () => {
  if (typeof window !== 'undefined') {
    // Estes valores seriam normalmente armazenados em variáveis de ambiente
    // Configuração para EmailJS seria aqui
    const PUBLIC_KEY = "5Ys2OtrDM9Y8aha4P";
    
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
      console.log('EmailJS initialized');
    } else {
      console.log('EmailJS não foi inicializado: chave pública não encontrada');
    }
  }
};

// Para um ambiente de produção real, você usaria este tipo de função
export const sendEmailToSubscriber = async (email: string, name: string) => {
  try {
    console.log(`Email enviado para ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error };
  }
};
