"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaPrint, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

type Patient = {
  id: string;
  name: string;
  age: number;
  sexe: string | null;
  diagnosis: string;
  poids: number | null;
  taille: number | null;
  traitement: string | null;
  numSecu: string | null;
  medecin: string | null;
  createdAt: string;
};

export default function FicheMedicalePatient() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUpdate = searchParams.get('updated');
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/patients/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
        const data = await res.json();
        setPatient(data);
        setLoading(false);
        
        if (fromUpdate === 'true') {
          setShowUpdateSuccess(true);
          setTimeout(() => {
            window.print();
          }, 1000);
          setTimeout(() => {
            setShowUpdateSuccess(false);
          }, 5000);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement fiche médicale:", err);
        setError("Impossible de charger les informations du patient");
        setLoading(false);
      });
  }, [id, fromUpdate]);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">Chargement...</div>;
  if (error || !patient) return <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">{error || "Patient introuvable."}</div>;

  const isEtatCritique = patient.diagnosis?.toLowerCase().includes("critique");
  const dateCreation = new Date(patient.createdAt).toLocaleDateString('fr-FR');
  const imc = patient.poids && patient.taille 
    ? (patient.poids / (patient.taille * patient.taille)).toFixed(1)
    : null;

  return (
    <div className="min-h-screen p-6 print:p-0 bg-white text-black">
      {/* En-tête institutionnel */}
      <header className="hidden print:flex justify-between items-center border-b-2 border-blue-800 pb-4 mb-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-blue-900">CENTRE HOSPITALIER UNIVERSITAIRE</h1>
          <p className="text-gray-700">Service de Médecine Générale</p>
        </div>
        <div className="text-right">
          <p className="font-bold">UAC-IFRI-GL-2025</p>
          <p>00229 Abomey-Calavi</p>
          <p>Tél: +229 XX XX XX XX</p>
        </div>
      </header>

      {showUpdateSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center space-x-2 no-print z-50">
          <FaCheckCircle />
          <span>Fiche mise à jour ! Impression en cours...</span>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto print:max-w-full">
        {/* Barre d'actions (non imprimée) */}
        <div className="flex justify-between mb-6 no-print">
          <button onClick={() => router.back()} className="flex items-center text-blue-800 hover:underline print:hidden">
            <FaArrowLeft className="mr-2" /> Retour
          </button>
            <div className="flex gap-3">
            <button onClick={() => window.print()} className="bg-gray-700 text-white px-4 py-2 rounded flex items-center print:hidden">
              <FaPrint className="mr-2" /> Imprimer
            </button>
          </div>
        </div>

        {/* Titre principal */}
        <div className="text-center mb-8 border-b-2 border-blue-800 pb-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">FICHE MEDICALE PATIENT</h1>
          <p className="text-sm text-gray-600">N° Dossier: {patient.id}</p>
        </div>

        {/* Alerte état critique */}
        {isEtatCritique && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 rounded flex items-center print:bg-red-50">
            <FaExclamationTriangle className="text-red-600 mr-2 text-xl" />
            <div>
              <p className="font-bold text-red-700">URGENCE MEDICALE</p>
              <p className="text-sm">Prise en charge prioritaire requise</p>
            </div>
          </div>
        )}

        {/* Section informations patient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Colonne gauche - Identité */}
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">IDENTITÉ DU PATIENT</h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="w-40 font-semibold">Nom complet:</span>
                <span className="border-b border-dotted border-gray-400 flex-1">{patient.name}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-semibold">Date création:</span>
                <span>{dateCreation}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-semibold">Âge/Sexe:</span>
                <span>{patient.age} ans / {patient.sexe || "NR"}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-semibold">N° Sécurité Sociale:</span>
                <span className="border-b border-dotted border-gray-400 flex-1">{patient.numSecu || "Non renseigné"}</span>
              </div>
            </div>
          </div>

          {/* Colonne droite - Paramètres médicaux */}
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">PARAMÈTRES MÉDICAUX</h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="w-40 font-semibold">Taille/Poids:</span>
                <span>{patient.taille ? `${patient.taille} m` : "NR"} / {patient.poids ? `${patient.poids} kg` : "NR"}</span>
              </div>
              {imc && (
                <div className="flex">
                  <span className="w-40 font-semibold">IMC:</span>
                  <span>{imc} kg/m²</span>
                </div>
              )}
              <div className="flex">
                <span className="w-40 font-semibold">Médecin traitant:</span>
                <span>Dr {patient.medecin || "Non désigné"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section diagnostic */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">DIAGNOSTIC PRINCIPAL</h2>
          <div className={`p-3 rounded ${isEtatCritique ? "bg-red-50 border-l-4 border-red-500" : "bg-gray-50"}`}>
            <p className={isEtatCritique ? "font-bold text-red-700" : ""}>
              {patient.diagnosis}
            </p>
          </div>
        </div>

        {/* Section traitement */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">TRAITEMENT PRESCRIT</h2>
          <div className="bg-gray-50 p-3 rounded">
            {patient.traitement ? (
              <div className="whitespace-pre-line">{patient.traitement}</div>
            ) : (
              <p className="italic text-gray-500">Aucun traitement enregistré</p>
            )}
          </div>
        </div>

        {/* Section recommandations */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">RECOMMANDATIONS</h2>
          <div className="space-y-2">
            {patient.traitement ? (
              <>
                <p>• Suivi médical régulier obligatoire</p>
                <p>• Respect strict de la posologie prescrite</p>
                <p>• Consultation immédiate en cas d aggravation</p>
                {isEtatCritique && (
                  <p className="font-bold text-red-700">• Surveillance continue nécessaire</p>
                )}
              </>
            ) : (
              <p className="italic text-gray-500">Aucune recommandation spécifique</p>
            )}
          </div>
        </div>

        {/* Pied de page institutionnel */}
        <footer className="border-t-2 border-blue-800 pt-4 text-sm text-gray-700 print:mt-8">
          <div className="flex justify-between">
            <div>
              <p>Éditée le: {new Date().toLocaleDateString('fr-FR')}</p>
              <p>Par: Dr {patient.medecin || "Médecin non spécifié"}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Document médical confidentiel</p>
              <p>Signature et cachet du médecin:</p>
              <div className="mt-8 border-t border-gray-400 w-48 ml-auto pt-2">
                <p className="text-center text-xs">Cachet et signature</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}