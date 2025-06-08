'use client';

import { useEffect } from 'react';
import { initEmailJS } from '@/utils/emailService';

export default function EmailJSInitializer() {
  useEffect(() => {
    // Inicializa o EmailJS no lado do cliente
    initEmailJS();
  }, []);

  return null; // Este componente não renderiza nada
}
