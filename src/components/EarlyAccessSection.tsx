"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EarlyAccessSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setIsError(true);
      setErrorMessage('Por favor, informe seu email');
      return;
    }
    
    if (!validateEmail(email)) {
      setIsError(true);
      setErrorMessage('Por favor, informe um email válido');
      return;
    }

    setIsError(false);
    setErrorMessage('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar o email');
      }
      
      if (data.userName) {
        setUserName(data.userName);
      }
      
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 10000);
      
    } catch (error) {
      console.error('Erro:', error);
      setIsError(true);
      setErrorMessage('Ocorreu um erro ao processar seu email. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="early-access" className="relative w-full py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-[#F28500]/10 rounded-full blur-[120px]"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#F28500]/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container px-4 mx-auto max-w-5xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-[#F28500] mb-3 font-medium">
            Acesso Antecipado
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Seja o primeiro a <span className="text-[#F28500]">experimentar</span>
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Registre-se agora para ter acesso antecipado ao Maestro e simplifique o processo DevOps da sua equipe antes de todos.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor email"
                className={`w-full pl-6 pr-36 py-4 rounded-full bg-gray-800/50 border ${
                  isError ? 'border-red-500' : 'border-gray-700 group-hover:border-[#F28500]/50'
                } text-white placeholder-gray-400 focus:outline-none focus:border-[#F28500] transition-all duration-300`}
                disabled={isSubmitting || isSubmitted}
              />
              
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="absolute right-1 top-1 bottom-1 px-6 rounded-full bg-gradient-to-r from-[#F28500] to-[#F28500]/80 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#F28500]/20 disabled:opacity-70"
                whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirmado
                  </span>
                ) : (
                  'Registrar'
                )}
              </motion.button>
            </div>
            
            {isError && (
              <motion.p 
                className="text-red-500 text-sm mt-2 pl-6"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errorMessage}
              </motion.p>
            )}
            
            {isSubmitted && !isError && (
              <motion.div 
                className="mt-2 pl-6"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-green-500 font-medium mb-1">
                  {userName ? `Obrigado, ${userName}!` : "Obrigado!"}  
                </p>
                <p className="text-gray-300 text-sm">
                  Seu acesso ao beta do Maestro foi confirmado. Acabamos de enviar um email com instruções para os próximos passos.
                </p>
              </motion.div>
            )}
          </form>
          
          <motion.p 
            className="text-gray-400 text-xs mt-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Não se preocupe, não enviaremos spam. Você pode cancelar a inscrição a qualquer momento.
          </motion.p>
        </motion.div>
        
        <motion.div
          className="mt-16 flex justify-center space-x-6 opacity-70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 text-[#F28500] mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-300 text-sm">Sem cartão de crédito</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-[#F28500] mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-300 text-sm">Acesso prioritário</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-[#F28500] mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-300 text-sm">Suporte dedicado</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
