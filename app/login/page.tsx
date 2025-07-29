"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Notification from "../components/Notification";
import Spinner from "../components/Spinner";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "medecin123";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || 
                        document.cookie.includes("isLoggedIn=true");
      
      if (isLoggedIn) {
        // Empêcher la boucle de redirection
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    setTimeout(() => {
      if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Stocker l'état de connexion
        localStorage.setItem("isLoggedIn", "true");
        document.cookie = "isLoggedIn=true; path=/; max-age=86400"; // 24h
        
        // Redirection immédiate
        window.location.href = "/"; // Utilisez window.location pour éviter les problèmes de cache
      } else {
        setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
        setIsSubmitting(false);
      }
    }, 1000); // Simulate network delay for spinner
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Spinner />
          <span className="sr-only">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 text-black animate-fadeIn">
      {errorMessage && (
        <Notification
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage("")}
        />
      )}
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transition-opacity duration-700"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center text-blue-600">
          Connexion Administrateur
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Bienvenue sur le projet de gestion des patients réalisé. <br />
          <span className="font-medium text-gray-800">
            Utilisateur : <code className="bg-gray-200 px-1 rounded">{DEFAULT_USERNAME}</code><br />
            Mot de passe : <code className="bg-gray-200 px-1 rounded">{DEFAULT_PASSWORD}</code>
          </span>
        </p>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
          disabled={isSubmitting}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 active:bg-blue-800 transition flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
