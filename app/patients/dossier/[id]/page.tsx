
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaPrint, FaExclamationTriangle, FaCheckCircle, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

type HistoriqueMedical = {
  id: number;
  patientId: string;
  dateConsultation: string;
  motif: string;
  observations: string | null;
  prescription: string | null;
};

export default function FicheMedicalePatient() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUpdate = searchParams.get('updated');
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [history, setHistory] = useState<HistoriqueMedical[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      fetch(`/api/patients/${id}`),
      fetch(`/api/patients/${id}/history`)
    ])
    .then(async ([patientRes, historyRes]) => {
      if (!patientRes.ok) throw new Error(`Erreur API patient: ${patientRes.status}`);
      if (!historyRes.ok) throw new Error(`Erreur API historique: ${historyRes.status}`);

      const patientData = await patientRes.json();
      const historyData = await historyRes.json();

      setPatient(patientData);
      setHistory(historyData);
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

  const isEtatCritique = patient?.diagnosis?.toLowerCase().includes("critique");
  const dateCreation = patient ? new Date(patient.createdAt).toLocaleDateString('fr-FR') : "";
  const imc = patient && patient.poids && patient.taille 
    ? (patient.poids / (patient.taille * patient.taille)).toFixed(1)
    : null;

  const generatePDF = () => {
    if (!patient) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("FICHE MEDICALE PATIENT", 14, 20);

    // Patient identity
    doc.setFontSize(14);
    doc.text("IDENTITÉ DU PATIENT", 14, 30);
    doc.setFontSize(12);
    doc.text(`Nom complet: ${patient.name}`, 14, 38);
    doc.text(`Date création: ${dateCreation}`, 14, 44);
    doc.text(`Âge/Sexe: ${patient.age} ans / ${patient.sexe || "NR"}`, 14, 50);
    doc.text(`N° Sécurité Sociale: ${patient.numSecu || "Non renseigné"}`, 14, 56);

    // Medical parameters
    doc.setFontSize(14);
    doc.text("PARAMÈTRES MÉDICAUX", 14, 66);
    doc.setFontSize(12);
    doc.text(`Taille/Poids: ${patient.taille ? `${patient.taille} m` : "NR"} / ${patient.poids ? `${patient.poids} kg` : "NR"}`, 14, 74);
    if (imc) doc.text(`IMC: ${imc} kg/m²`, 14, 80);
    doc.text(`Médecin traitant: Dr ${patient.medecin || "Non désigné"}`, 14, 86);

    // Diagnosis
    doc.setFontSize(14);
    doc.text("DIAGNOSTIC PRINCIPAL", 14, 96);
    doc.setFontSize(12);
    doc.text(patient.diagnosis, 14, 104);

    // Treatment
    doc.setFontSize(14);
    doc.text("TRAITEMENT PRESCRIT", 14, 114);
    doc.setFontSize(12);
    if (patient.traitement) {
      const splitTreatment = doc.splitTextToSize(patient.traitement, 180);
      doc.text(splitTreatment, 14, 122);
    } else {
      doc.text("Aucun traitement enregistré", 14, 122);
    }

    // Recommendations
    doc.setFontSize(14);
    doc.text("RECOMMANDATIONS", 14, 142);
    doc.setFontSize(12);
    if (patient.traitement) {
      doc.text("• Suivi médical régulier obligatoire", 14, 150);
      doc.text("• Respect strict de la posologie prescrite", 14, 156);
      doc.text("• Consultation immédiate en cas d aggravation", 14, 162);
      if (isEtatCritique) {
        doc.text("• Surveillance continue nécessaire", 14, 168);
      }
    } else {
      doc.text("Aucune recommandation spécifique", 14, 150);
    }

    // Medical history table
    if (history.length > 0) {
      doc.setFontSize(14);
      doc.text("HISTORIQUE MÉDICAL", 14, 180);

      const tableColumn = ["Date", "Motif", "Observations", "Prescription"];
      const tableRows: string[][] = [];

      history.forEach(item => {
        const row = [
          new Date(item.dateConsultation).toLocaleDateString('fr-FR'),
          item.motif,
          item.observations || "-",
          item.prescription || "-"
        ];
        tableRows.push(row);
      });

      (doc as any).autoTable({
        startY: 185,
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
      });
    }

    // Footer
    doc.setFontSize(10);
    doc.text(`Éditée le: ${new Date().toLocaleDateString('fr-FR')}`, 14, doc.internal.pageSize.height - 20);
    doc.text(`Par: Dr ${patient.medecin || "Médecin non spécifié"}`, 14, doc.internal.pageSize.height - 14);
    doc.text("Document médical confidentiel", 14, doc.internal.pageSize.height - 8);

    doc.save(`Fiche_Medicale_${patient.name.replace(/ /g, "_")}.pdf`);
  };

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
            <button onClick={generatePDF} className="bg-red-700 text-white px-4 py-2 rounded flex items-center print:hidden">
              <FaFilePdf className="mr-2" /> Générer PDF
            </button>
          </div>
        </div>

        {/* Titre principal */}
        <div className="text-center mb-8 border-b-2 border-blue-800 pb-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">FICHE MEDICALE PATIENT</h1>
          <p className="text-sm text-gray-600">N° Dossier: {patient?.id}</p>
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
                <span className="border-b border-dotted border-gray-400 flex-1">{patient?.name}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-semibold">Date création:</span>
                <span>{dateCreation}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-semibold">Âge/Sexe:</span>
                <span>{patient?.age} ans / {patient?.sexe || "NR"}</span>
              </div>
              <div className="flex">
                <span className="w-40 font-semibold">N° Sécurité Sociale:</span>
                <span className="border-b border-dotted border-gray-400 flex-1">{patient?.numSecu || "Non renseigné"}</span>
              </div>
            </div>
          </div>

          {/* Colonne droite - Paramètres médicaux */}
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">PARAMÈTRES MÉDICAUX</h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="w-40 font-semibold">Taille/Poids:</span>
                <span>{patient?.taille ? `${patient.taille} m` : "NR"} / {patient?.poids ? `${patient.poids} kg` : "NR"}</span>
              </div>
              {imc && (
                <div className="flex">
                  <span className="w-40 font-semibold">IMC:</span>
                  <span>{imc} kg/m²</span>
                </div>
              )}
              <div className="flex">
                <span className="w-40 font-semibold">Médecin traitant:</span>
                <span>Dr {patient?.medecin || "Non désigné"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section diagnostic */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">DIAGNOSTIC PRINCIPAL</h2>
          <div className={`p-3 rounded ${isEtatCritique ? "bg-red-50 border-l-4 border-red-500" : "bg-gray-50"}`}>
            <p className={isEtatCritique ? "font-bold text-red-700" : ""}>
              {patient?.diagnosis}
            </p>
          </div>
        </div>

        {/* Section traitement */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">TRAITEMENT PRESCRIT</h2>
          <div className="bg-gray-50 p-3 rounded">
            {patient?.traitement ? (
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
            {patient?.traitement ? (
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

        {/* Section historique médical */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">HISTORIQUE MÉDICAL</h2>
          {history.length === 0 ? (
            <p className="italic text-gray-500">Aucun historique médical disponible</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Motif</th>
                  <th className="border border-gray-300 p-2 text-left">Observations</th>
                  <th className="border border-gray-300 p-2 text-left">Prescription</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">{new Date(item.dateConsultation).toLocaleDateString('fr-FR')}</td>
                    <td className="border border-gray-300 p-2">{item.motif}</td>
                    <td className="border border-gray-300 p-2">{item.observations || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.prescription || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pied de page institutionnel */}
        <footer className="border-t-2 border-blue-800 pt-4 text-sm text-gray-700 print:mt-8">
          <div className="flex justify-between">
            <div>
              <p>Éditée le: {new Date().toLocaleDateString('fr-FR')}</p>
              <p>Par: Dr {patient?.medecin || "Médecin non spécifié"}</p>
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
