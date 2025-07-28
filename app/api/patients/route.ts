import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const patient = await req.json();

    // Validation des données
    if (!patient.name || !patient.age || !patient.diagnosis) {
      return NextResponse.json(
        { error: 'Nom, âge et diagnostic sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation du sexe
    const validSexes = ['M', 'F', 'Autre', null];
    if (patient.sexe && !validSexes.includes(patient.sexe)) {
      return NextResponse.json(
        { error: 'Le sexe doit être M, F, Autre ou null' },
        { status: 400 }
      );
    }

    // Création du patient
    const newPatient = await prisma.patient.create({
      data: {
        name: patient.name,
        age: parseInt(patient.age),
        sexe: patient.sexe || null, // S'assure que le sexe est soit M/F/Autre soit null
        diagnosis: patient.diagnosis,
        poids: patient.poids ? parseFloat(patient.poids) : null,
        taille: patient.taille ? parseFloat(patient.taille) : null,
        traitement: patient.traitement || null,
        numSecu: patient.numSecu || null,
        medecin: patient.medecin || null,
        ...(patient.rendezvous && { rendezvous: new Date(patient.rendezvous) }),
        groupeSanguin: patient.groupeSanguin || null,
        allergies: patient.allergies || null,
        notes: patient.notes || null
      }
    });

    return NextResponse.json(newPatient, { status: 201 });

  } catch (error) {
    console.error('Erreur ajout patient:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du patient' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        age: true,
        sexe: true, 
        diagnosis: true,
        poids: true,
        taille: true,
        traitement: true,
        numSecu: true,
        medecin: true,
        rendezvous: true,
        groupeSanguin: true,
        allergies: true,
        notes: true,
        createdAt: true
      }
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error('Erreur lors du chargement des patients:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des patients' },
      { status: 500 }
    );
  }
}