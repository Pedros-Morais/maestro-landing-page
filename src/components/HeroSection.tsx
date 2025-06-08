'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ParticleAnimation from './ParticleAnimation';
import { colors } from '@/app/styles/colors';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#1A1C21] to-[#2A2D34]">
      {/* Particle Background */}
      <ParticleAnimation className="opacity-60" />
      
      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center lg:items-start pt-24 pb-16 lg:pt-40">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#F28500]/10 border border-[#F28500]/20 text-[#FF9D37] text-sm font-medium">
              Automação Inteligente para DevOps
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Orquestração de DevOps <span className="text-[#F28500]">Simplificada</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Automatize, escale e monitore seus pipelines de CI/CD com Maestro - 
              a plataforma que unifica seus workflows de DevOps com simplicidade.
            </p>
            
            <div className="flex justify-center lg:justify-start">
              <motion.a
                href="#early-access"
                className="px-8 py-4 bg-gradient-to-r from-[#F28500] to-[#FF9D37] rounded-lg text-white font-medium text-lg shadow-lg shadow-[#F28500]/25 hover:shadow-xl hover:shadow-[#F28500]/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Acesso Antecipado
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="text-gray-400 font-medium">Integrado com:</div>
              <div className="flex items-center gap-6">
                <motion.div 
                  className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src="/icons/amazon.svg" 
                    alt="Amazon" 
                    width={40} 
                    height={40} 
                    className="object-contain"
                  />
                </motion.div>
                <motion.div 
                  className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src="/icons/slack.svg" 
                    alt="Slack" 
                    width={40} 
                    height={40} 
                    className="object-contain"
                  />
                </motion.div>
                <motion.div 
                  className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src="/icons/git.svg" 
                    alt="Git" 
                    width={40} 
                    height={40} 
                    className="object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Dashboard mockup - replace with actual dashboard image */}
            <div className="relative bg-[#2A2D34] rounded-xl shadow-2xl shadow-black/30 border border-white/10 overflow-hidden aspect-[16/10]">
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#1A1C21] flex items-center">
                <div className="flex gap-1.5 ml-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="mt-8 p-4 w-full h-[calc(100%-2rem)] bg-gradient-to-br from-[#2A2D34] to-[#1A1C21]">
                {/* Dashboard content placeholder */}
                <div className="flex gap-4 mb-4">
                  <div className="w-1/3 h-8 bg-[#F28500]/20 rounded"></div>
                  <div className="w-1/3 h-8 bg-gray-700/50 rounded"></div>
                  <div className="w-1/3 h-8 bg-gray-700/50 rounded"></div>
                </div>
                <div className="flex gap-4 h-[calc(100%-2rem)]">
                  <div className="w-1/4 h-full">
                    <div className="h-full space-y-2">
                      <div className="w-full h-12 bg-[#F28500]/10 border border-[#F28500]/20 rounded"></div>
                      <div className="w-full h-12 bg-gray-700/20 rounded"></div>
                      <div className="w-full h-12 bg-gray-700/20 rounded"></div>
                      <div className="w-full h-12 bg-gray-700/20 rounded"></div>
                    </div>
                  </div>
                  <div className="w-3/4 h-full bg-gray-800/30 rounded overflow-hidden">
                    <div className="p-4">
                      <div className="mb-4 w-1/2 h-8 bg-white/5 rounded"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-28 rounded bg-gradient-to-br from-[#F28500]/20 to-[#F28500]/5 border border-[#F28500]/10"></div>
                        <div className="h-28 rounded bg-white/5"></div>
                        <div className="h-28 rounded bg-white/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-[#F28500]/20 rounded-full blur-[120px]"></div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut", 
            delay: 1.5 
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-gray-400">Scroll para explorar</div>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center items-start p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-[#F28500] rounded-full"
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
