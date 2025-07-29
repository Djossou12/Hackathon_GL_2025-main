import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const patient = await prisma.patient.findUnique({ where: { id } });

    if (!patient) {
      return NextResponse.json({ error: 'Patient non trouvé' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await req.json();

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error('Erreur mise à jour patient:', error);
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.patient.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Erreur suppression patient:', error);
    return NextResponse.json({ error: 'Erreur suppression' }, { status: 500 });
  }
}
