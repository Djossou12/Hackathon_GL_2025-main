"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Constants
const CKD_STATS = [
  { id: 1, value: "10%", label: "de la population mondiale" },
  { id: 2, value: "5", label: "stades d'évolution" },
  { id: 3, value: "850M", label: "personnes affectées" },
  { id: 4, value: "2x", label: "risque cardiovasculaire" }
];

export default function Home() {
  
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col relative">
      
      <main className="flex-grow">
      <Navbar />
      
        {/* Hero Section */}
        <section className="py-8 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 lg:pr-12">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.1 }}
                >
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 md:mb-6 text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    Révolutionnez le <span className="text-teal-600">suivi néphrologique</span> avec l IA
                  </motion.h1>
                  
                  <motion.p 
                    className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    AI4CKD est une plateforme innovante qui utilise l intelligence artificielle pour améliorer 
                    la détection précoce, le suivi et la gestion des maladies rénales chroniques.
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    <Link
                      href="/patients"
                      className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-teal-600 transition text-sm md:text-base text-center"
                    >
                      Demarrer
                    </Link>
                    <Link
                      href="/about"
                      className="px-4 py-2 md:px-6 md:py-3 bg-white border border-blue-200 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition text-sm md:text-base text-center"
                    >
                      Documentation
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              
              <motion.div 
                className="lg:w-1/2 w-full mt-8 lg:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl blur-md opacity-50"></div>
                  <div className="relative bg-white p-1 sm:p-2 rounded-xl shadow-xl">
                    <Image
                      src="/maladie-renale-chronique.svg"
                      alt="Interface de suivi rénal"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-blue-700 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              La maladie rénale chronique en chiffres
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              {CKD_STATS.map((stat) => (
                <motion.div
                  key={stat.id}
                  className="text-center p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm sm:text-base md:text-lg opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CKD Info Section */}
        

        {/* Features Section */}
        

        {/* CTA Section */}
        
      </main>

      <Footer />
    </div>
  </ProtectedRoute>
    
  );
}

function Footer() {
  return (
    <ProtectedRoute>
  
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              AI4CKD
              <Image 
                src="/logo-maladie-renale.svg" 
                alt="Logo" 
                width={24} 
                height={24} 
                className="ml-2"
              />
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Plateforme certifiée de suivi néphrologique par intelligence artificielle.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/patients" className="text-gray-400 hover:text-white transition text-sm">Patients</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition text-sm">Tableau de bord</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition text-sm">Ressources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition text-sm">À propos</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition text-sm">Recherche clinique</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition text-sm">Blog médical</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition text-sm">Confidentialité</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition text-sm">Conditions</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition text-sm">HIPAA</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} AI4CKD - Tous droits réservés. 
            Dispositif médical CE certifié.
          </p>
        </div>
      </div>
    </footer>
  </ProtectedRoute>
    
  );
}