"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaSave, FaTimes, FaUser, FaNotesMedical, FaWeight, FaRulerVertical, FaIdCard, FaUserMd, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

interface PatientForm {
  name: string;
  age: string;
  sexe: string;
  diagnosis: string;
  poids: string;
  taille: string;
  traitement: string;
  numSecu: string;
  medecin: string;
  allergies: string;
  groupeSanguin: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormTouched {
  [key: string]: boolean;
}

export default function EditPatientPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientForm>({
    name: "",
    age: "",
    sexe: "",
    diagnosis: "",
    poids: "",
    taille: "",
    traitement: "",
    numSecu: "",
    medecin: "",
    allergies: "",
    groupeSanguin: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [numSecuExists, setNumSecuExists] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/patients/${id}`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Erreur lors de la récupération des données");
        }
        
        const data = await res.json();
        setPatient({
          name: data.name || "",
          age: data.age?.toString() || "",
          sexe: data.sexe || "",
          diagnosis: data.diagnosis || "",
          poids: data.poids?.toString() || "",
          taille: data.taille?.toString() || "",
          traitement: data.traitement || "",
          numSecu: data.numSecu || "",
          medecin: data.medecin || "",
          allergies: data.allergies || "",
          groupeSanguin: data.groupeSanguin || "",
        });
      } catch (err) {
        console.error("Erreur chargement patient:", err);
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        toast.error(message, {
          icon: <FaExclamationTriangle className="text-red-500" />,
        });
        router.push("/patients");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [id, router]);

  const validateField = (name: keyof PatientForm, value: string): string => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Le nom est requis";
        else if (value.length < 2) error = "Le nom doit contenir au moins 2 caractères";
        break;
      case "age":
        if (!value) error = "L'âge est requis";
        else if (isNaN(Number(value))) error = "L'âge doit être un nombre";
        else if (parseInt(value) < 0 || parseInt(value) > 120) error = "L'âge doit être entre 0 et 120";
        break;
      case "numSecu":
        if (value && !/^\d{13,15}$/.test(value)) error = "Doit contenir 13 à 15 chiffres";
        break;
      case "taille":
        if (value && (isNaN(Number(value)) || parseFloat(value) < 0.5 || parseFloat(value) > 2.5)) 
          error = "La taille doit être entre 0.5 et 2.5 mètres";
        break;
      case "poids":
        if (value && (isNaN(Number(value)) || parseFloat(value) < 1 || parseFloat(value) > 300)) 
          error = "Le poids doit être entre 1 et 300 kg";
        break;
      case "diagnosis":
        if (!value.trim()) error = "Le diagnostic est requis";
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (name === "numSecu" && patient.numSecu && patient.numSecu !== patient.numSecu) {
      checkNumSecuExists(patient.numSecu);
    }
    
    const error = validateField(name as keyof PatientForm, patient[name as keyof PatientForm]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const checkNumSecuExists = async (numSecu: string) => {
    try {
      const res = await fetch(`/api/patients/check-numsecu?numSecu=${numSecu}&excludeId=${id}`);
      const data = await res.json();
      
      if (data.exists) {
        setErrors(prev => ({ ...prev, numSecu: "Ce numéro de sécurité sociale est déjà utilisé" }));
        setNumSecuExists(true);
      } else {
        setNumSecuExists(false);
        if (errors.numSecu === "Ce numéro de sécurité sociale est déjà utilisé") {
          setErrors(prev => ({ ...prev, numSecu: "" }));
        }
      }
    } catch (err) {
      console.error("Erreur vérification numSecu:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name as keyof PatientForm, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors: FormErrors = {};
    (Object.keys(patient) as Array<keyof PatientForm>).forEach(key => {
      if (key === "numSecu" && patient[key] && numSecuExists) {
        newErrors[key] = "Ce numéro de sécurité sociale est déjà utilisé";
      } else {
        newErrors[key] = validateField(key, patient[key]);
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(patient).reduce((acc, key) => ({ ...acc, [key]: true }), {} as FormTouched));
    
    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors) {
      toast.error("Veuillez corriger les erreurs avant de soumettre", {
        icon: <FaExclamationTriangle className="text-red-500" />,
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...patient,
          age: patient.age ? parseInt(patient.age) : null,
          poids: patient.poids ? parseFloat(patient.poids) : null,
          taille: patient.taille ? parseFloat(patient.taille) : null
        }),
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(responseData.error || "Échec de la mise à jour");
      }
      
      toast.success("Modifications enregistrées avec succès!", {
        duration: 4000,
        position: "top-center",
        icon: <FaCheckCircle className="text-green-500" />,
      });
      
      router.push(`/patients/?updated=true`);
    } catch (err) {
      console.error("Erreur mise à jour:", err);
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(message, {
        icon: <FaExclamationTriangle className="text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Voulez-vous vraiment annuler les modifications non enregistrées ?")) {
      router.push('/patients');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
      <Toaster />
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Modification du dossier patient</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-4 border-b flex items-center">
              <FaUser className="text-blue-700 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Informations personnelles</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet*</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    touched.name && errors.name ? "border-red-500" : ""
                  }`}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Âge*</label>
                <input
                  type="number"
                  name="age"
                  value={patient.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="0"
                  max="120"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    touched.age && errors.age ? "border-red-500" : ""
                  }`}
                />
                {touched.age && errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                <select
                  name="sexe"
                  value={patient.sexe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">N° Sécurité Sociale</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="numSecu"
                    value={patient.numSecu}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    pattern="[0-9]{13,15}"
                    title="Doit contenir 13 à 15 chiffres"
                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      touched.numSecu && errors.numSecu ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {touched.numSecu && errors.numSecu && (
                  <p className="mt-1 text-sm text-red-600">{errors.numSecu}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Groupe sanguin</label>
                <select
                  name="groupeSanguin"
                  value={patient.groupeSanguin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Inconnu</option>
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
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-4 border-b flex items-center">
              <FaNotesMedical className="text-blue-700 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Informations médicales</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taille (m)</label>
                <div className="relative">
                  <FaRulerVertical className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="taille"
                    value={patient.taille}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    step="0.01"
                    min="0.5"
                    max="2.5"
                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      touched.taille && errors.taille ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {touched.taille && errors.taille && (
                  <p className="mt-1 text-sm text-red-600">{errors.taille}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                <div className="relative">
                  <FaWeight className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="poids"
                    value={patient.poids}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    step="0.1"
                    min="1"
                    max="300"
                    className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      touched.poids && errors.poids ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {touched.poids && errors.poids && (
                  <p className="mt-1 text-sm text-red-600">{errors.poids}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Médecin traitant</label>
                <div className="relative">
                  <FaUserMd className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="medecin"
                    value={patient.medecin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies connues</label>
                <textarea
                  name="allergies"
                  value={patient.allergies}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnostic principal*</label>
                <textarea
                  name="diagnosis"
                  value={patient.diagnosis}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    touched.diagnosis && errors.diagnosis ? "border-red-500" : ""
                  }`}
                />
                {touched.diagnosis && errors.diagnosis && (
                  <p className="mt-1 text-sm text-red-600">{errors.diagnosis}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Traitement prescrit</label>
                <textarea
                  name="traitement"
                  value={patient.traitement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center disabled:opacity-50"
            >
              <FaTimes className="mr-2" />
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting || Object.values(errors).some(error => error)}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center ${
                isSubmitting || Object.values(errors).some(error => error) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}