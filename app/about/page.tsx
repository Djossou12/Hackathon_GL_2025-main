/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUserMd, FaChartLine, FaLightbulb, FaShieldAlt, FaHandsHelping } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type TeamMemberProps = {
  name: string;
  role: string;
  img?: React.ReactNode;
};



const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
  >
    <div className="text-blue-500 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const TeamMember = ({ name, role, img }: TeamMemberProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center"
  >
    <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-blue-100">
      {/* Remplacez par une image réelle */}
      <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500">
        {img || "Photo"}
      </div>
    </div>
    <h4 className="font-bold text-gray-800">{name}</h4>
    <p className="text-blue-600 text-sm">{role}</p>
  </motion.div>
);

export default function About() {
  return (
    <ProtectedRoute>
  
    <div className="min-h-screen bg-gray-50">
      <Navbar />
    
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Révolutionner la prise en charge des maladies rénales</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              AI4CKD combine intelligence artificielle et expertise médicale pour transformer la gestion des patients atteints d insuffisance rénale chronique.
            </p>
            
            <Link 
              href="/" 
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Diagnostque IA
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Chez AI4CKD, nous croyons que chaque patient atteint de maladie rénale chronique mérite une prise en charge personnalisée et proactive. 
              Notre plateforme intègre des algorithmes avancés pour aider les médecins à détecter précocement les risques, 
              optimiser les traitements et améliorer la qualité de vie des patients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaHeartbeat />}
              title="Santé des patients"
              description="Surveillance continue des paramètres vitaux et indicateurs rénaux"
            />
            <FeatureCard
              icon={<FaUserMd />}
              title="Support clinique"
              description="Outils d'aide à la décision pour les professionnels de santé"
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Analyse prédictive"
              description="Détection précoce des risques de progression de la maladie"
            />
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 mb-8 md:mb-0 md:pr-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Technologie</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Notre plateforme utilise des modèles d apprentissage automatique validés cliniquement, 
                entraînés sur des milliers de cas réels pour fournir des recommandations personnalisées.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaLightbulb className="text-blue-500 mt-1 mr-3" />
                  <span className="text-gray-700">Algorithmes certifiés par les autorités de santé</span>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="text-blue-500 mt-1 mr-3" />
                  <span className="text-gray-700">Données cryptées et conformes au RGPD</span>
                </li>
                <li className="flex items-start">
                  <FaHandsHelping className="text-blue-500 mt-1 mr-3" />
                  <span className="text-gray-700">Interopérabilité avec les principaux systèmes de santé</span>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 bg-white p-8 rounded-xl shadow-md border border-gray-200"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center text-gray-400">
                {/*Interface AI4CKD*/}
                <img src="/ai4ckd-interface.png" alt="AI4CKD Interface" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des experts en néphrologie, intelligence artificielle et expérience utilisateur unis pour améliorer les soins rénaux.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <TeamMember name="BOUSSARI Samuel" role="Développeur web/Mobile" img={undefined} />
            <TeamMember name="SANNI BAYER S. Berenger" role="Développeur web/Mobile" img={undefined} />
            <TeamMember name="TONON Marie-Orens" role="Développeur web/Mobile" img={undefined} />
            <TeamMember name="AHOKPOSSI Brunel" role="Développeur web/Mobile" img={undefined} />
            <TeamMember name="WEDJANGNON Axel" role="Développeur web/Mobile" img={undefined} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre pratique clinique ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Découvrez comment AI4CKD peut optimiser votre suivi des patients et améliorer leurs résultats.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/" 
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
              >
                Demander une démo
              </Link>
              <Link 
                href="/" 
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Parler à un expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">AI4CKD</span>
              <p className="text-gray-400 mt-1">Innovation au service de la néphrologie</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-blue-300 transition">Accueil</Link>
              <Link href="/about" className="hover:text-blue-300 transition">À propos</Link>
              <Link href="/" className="hover:text-blue-300 transition">Solutions</Link>
              <Link href="/" className="hover:text-blue-300 transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </ProtectedRoute>
    
  );
}