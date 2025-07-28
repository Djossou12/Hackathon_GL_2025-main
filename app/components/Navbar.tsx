"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // Supprimer toutes les traces d'authentification
    localStorage.removeItem("isLoggedIn");
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Forcer un rechargement complet
    window.location.href = "/login";
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 text-xl font-bold">AI4CKD</span>
              <Image 
                src="/logo-maladie-renale.svg" 
                alt="Logo AI4CKD pour la gestion des maladies rénales chroniques" 
                width={52} 
                height={32} 
                className="ml-2"
                priority
              />
            </Link>
          </div>
          
          {/* Menu mobile */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Ouvrir le menu de navigation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link href="/patients" className="px-2 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Patients
            </Link>
            <Link href="/dashboard" className="px-2 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Tableau de bord
            </Link>
            <Link href="/about" className="px-2 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              À propos
            </Link>
            <button 
              onClick={handleLogout}
              className="ml-2 px-3 py-2 text-sm lg:text-base bg-red-500 text-white rounded-md hover:bg-red-600 transition whitespace-nowrap flex items-center"
              aria-label="Se déconnecter de l'application"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile ouvert */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/patients" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Patients
            </Link>
            <Link 
              href="/dashboard" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Tableau de bord
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center"
              aria-label="Se déconnecter de l'application"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}