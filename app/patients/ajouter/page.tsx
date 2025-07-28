"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserPlus, FaUser, FaNotesMedical, FaCheckCircle, 
  FaWeight, 
  FaArrowLeft, FaExclamationTriangle, FaHeartbeat} from "react-icons/fa";

export default function AjouterPatientPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sexe: "",
    diagnosis: "",
    poids: "",
    taille: "",
    traitement: "",
    numSecu: "",
    medecin: "",
    rendezvous: "",
    groupeSanguin: "",
    allergies: "",
    notes: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }

    if (!formData.age) {
      newErrors.age = "L'âge est requis";
    } else if (isNaN(Number(formData.age))) {
      newErrors.age = "L'âge doit être un nombre";
    } else if (Number(formData.age) < 0 || Number(formData.age) > 120) {
      newErrors.age = "L'âge doit être entre 0 et 120 ans";
    }

    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = "Le diagnostic est requis";
    }

    if (formData.poids && isNaN(Number(formData.poids))) {
      newErrors.poids = "Le poids doit être un nombre";
    }

    if (formData.taille && isNaN(Number(formData.taille))) {
      newErrors.taille = "La taille doit être un nombre";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          age: Number(formData.age),
          sexe: formData.sexe || null,
          diagnosis: formData.diagnosis.trim(),
          poids: formData.poids ? Number(formData.poids) : null,
          taille: formData.taille ? Number(formData.taille) : null,
          traitement: formData.traitement || null,
          numSecu: formData.numSecu || null,
          medecin: formData.medecin || null,
          rendezvous: formData.rendezvous || null,
          groupeSanguin: formData.groupeSanguin || null,
          allergies: formData.allergies || null,
          notes: formData.notes || null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'ajout");
      }

      setShowSuccess(true);
      setTimeout(() => router.push("/patients"), 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      setErrors({ submit: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (errors[id]) {
      setErrors(prev => ({ 
        ...prev, 
        [id]: undefined as unknown as string // Conversion de type
      }));
    }
  };

  const imcValue = formData.poids && formData.taille
    ? (Number(formData.poids) / Math.pow(Number(formData.taille), 2)).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4 text-black">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <FaCheckCircle />
              <span>Patient ajouté avec succès!</span>
            </div>
          </motion.div>
        )}

        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <FaExclamationTriangle />
              <span>{errors.submit}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <FaArrowLeft className="mr-2" />
          Retour
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <FaUserPlus />
              Nouveau Patient
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h2 className="font-semibold text-blue-700 flex items-center gap-2 mb-4">
                  <FaUser />
                  Informations personnelles
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Âge <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="age"
                      type="number"
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.age ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label htmlFor="sexe" className="block text-sm font-medium text-gray-700 mb-1">
                      Sexe
                    </label>
                    <select
                      id="sexe"
                      value={formData.sexe}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="numSecu" className="block text-sm font-medium text-gray-700 mb-1">
                      N° Sécurité Sociale
                    </label>
                    <input
                      id="numSecu"
                      type="text"
                      value={formData.numSecu}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg">
                <h2 className="font-semibold text-blue-700 flex items-center gap-2 mb-4">
                  <FaHeartbeat />
                  Santé
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="groupeSanguin" className="block text-sm font-medium text-gray-700 mb-1">
                      Groupe sanguin
                    </label>
                    <select
                      id="groupeSanguin"
                      value={formData.groupeSanguin}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                      Allergies
                    </label>
                    <input
                      id="allergies"
                      type="text"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-indigo-50 p-5 rounded-lg">
                <h2 className="font-semibold text-indigo-700 flex items-center gap-2 mb-4">
                  <FaNotesMedical />
                  Informations médicales
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                      Diagnostic <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="diagnosis"
                      type="text"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.diagnosis ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.diagnosis && <p className="text-red-500 text-sm mt-1">{errors.diagnosis}</p>}
                  </div>

                  <div>
                    <label htmlFor="traitement" className="block text-sm font-medium text-gray-700 mb-1">
                      Traitement
                    </label>
                    <textarea
                      id="traitement"
                      rows={3}
                      value={formData.traitement}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="medecin" className="block text-sm font-medium text-gray-700 mb-1">
                      Médecin traitant
                    </label>
                    <input
                      id="medecin"
                      type="text"
                      value={formData.medecin}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="rendezvous" className="block text-sm font-medium text-gray-700 mb-1">
                      Rendez-vous
                    </label>
                    <input
                      id="rendezvous"
                      type="datetime-local"
                      value={formData.rendezvous}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-5 rounded-lg">
                <h2 className="font-semibold text-indigo-700 flex items-center gap-2 mb-4">
                  <FaWeight />
                  Mesures
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="poids" className="block text-sm font-medium text-gray-700 mb-1">
                      Poids (kg)
                    </label>
                    <input
                      id="poids"
                      type="number"
                      step="0.1"
                      value={formData.poids}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.poids ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.poids && <p className="text-red-500 text-sm mt-1">{errors.poids}</p>}
                  </div>

                  <div>
                    <label htmlFor="taille" className="block text-sm font-medium text-gray-700 mb-1">
                      Taille (m)
                    </label>
                    <input
                      id="taille"
                      type="number"
                      step="0.01"
                      value={formData.taille}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.taille ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.taille && <p className="text-red-500 text-sm mt-1">{errors.taille}</p>}
                  </div>
                </div>

                {imcValue && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-100">
                    <p className="text-sm text-gray-500">IMC calculé</p>
                    <p className="text-xl font-bold">{imcValue} kg/m²</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium mt-4 transition ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                {isSubmitting ? "Enregistrement..." : "Enregistrer le patient"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}