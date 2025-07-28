"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaSave, FaExclamationCircle } from "react-icons/fa";

type Patient = {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  poids: number | null;
  taille: number | null;
  traitement: string | null;
  numSecu: string | null;
  medecin: string | null;
  createdAt: string;
};

export default function CompleterDossierPatient() {
  const { id } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (!id) return;

    fetch(`/api/patients/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
        const data = await res.json();
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement patient:", err);
        setError("Impossible de charger les informations du patient");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (!patient) return;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedValue: any = value;
    
    // Convertir les valeurs numériques
    if (type === 'number') {
      parsedValue = value ? parseFloat(value) : null;
    }
    
    setPatient({ ...patient, [name]: parsedValue });
    
    // Effacer l'erreur pour ce champ si elle existe
    if (formErrors[name]) {
      setFormErrors({...formErrors, [name]: ''});
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    // Validation basique
    if (patient?.poids && patient.poids <= 0) errors.poids = "Le poids doit être supérieur à 0";
    if (patient?.taille && patient.taille <= 0) errors.taille = "La taille doit être supérieure à 0";
    if (patient?.numSecu && !/^\d{13,15}$/.test(patient.numSecu)) {
      errors.numSecu = "Le numéro de sécurité sociale doit contenir entre 13 et 15 chiffres";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patient || !id) return;
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      const response = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la sauvegarde: ${response.status}`);
      }

      // Rediriger vers la fiche médicale après la mise à jour réussie
      router.push(`/patients/dossier/${id}`);
      
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
      setError("Erreur lors de la sauvegarde des informations");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">
        Chargement des informations...
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-600">
        <FaExclamationCircle className="text-4xl mb-4" />
        <h2 className="text-xl">{error || "Patient introuvable."}</h2>
        <button 
          onClick={() => router.back()}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 text-black">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-indigo-600 hover:underline"
          >
            <FaArrowLeft className="mr-2" />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-center text-indigo-700">
            Compléter la fiche médicale
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Informations de base (non modifiables) */}
          <div className="mb-6 bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">
              Informations de base
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nom complet</label>
                <input
                  type="text"
                  value={patient.name}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Âge</label>
                <input
                  type="number"
                  value={patient.age}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
                  disabled
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">Diagnostic</label>
                <input
                  type="text"
                  value={patient.diagnosis}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Informations médicales complémentaires */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">
              Informations médicales complémentaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Poids (kg) <span className="text-gray-500 text-sm">(optionnel)</span>
                </label>
                <input
                  type="number"
                  name="poids"
                  value={patient.poids || ''}
                  onChange={handleChange}
                  step="0.1"
                  placeholder="Ex: 70.5"
                  className={`w-full p-2 border rounded ${
                    formErrors.poids ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.poids && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.poids}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Taille (m) <span className="text-gray-500 text-sm">(optionnel)</span>
                </label>
                <input
                  type="number"
                  name="taille"
                  value={patient.taille || ''}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="Ex: 1.75"
                  className={`w-full p-2 border rounded ${
                    formErrors.taille ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.taille && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.taille}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Traitement en cours <span className="text-gray-500 text-sm">(optionnel)</span>
                </label>
                <textarea
                  name="traitement"
                  value={patient.traitement || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Entrez les détails du traitement"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Informations administratives */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">
              Informations administratives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Numéro de sécurité sociale <span className="text-gray-500 text-sm">(optionnel)</span>
                </label>
                <input
                  type="text"
                  name="numSecu"
                  value={patient.numSecu || ''}
                  onChange={handleChange}
                  placeholder="Ex: 1234567890123"
                  className={`w-full p-2 border rounded ${
                    formErrors.numSecu ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.numSecu && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.numSecu}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Médecin traitant <span className="text-gray-500 text-sm">(optionnel)</span>
                </label>
                <input
                  type="text"
                  name="medecin"
                  value={patient.medecin || ''}
                  onChange={handleChange}
                  placeholder="Ex: Dr. Martin"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Message d'erreur global */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center ${
                saving ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <FaSave className="mr-2" />
              {saving ? 'Enregistrement...' : 'Enregistrer et voir la fiche'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}