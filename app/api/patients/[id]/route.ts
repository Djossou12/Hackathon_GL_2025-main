import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function extractIdFromUrl(url: string) {
  const match = url.match(/\/api\/patients\/([^\/]+)/);
  return match ? match[1] : null;
}

export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req.nextUrl.pathname);

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
  }

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

export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req.nextUrl.pathname);

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
  }

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

export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req.nextUrl.pathname);

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
  }

  try {
    await prisma.patient.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Erreur suppression patient:', error);
    return NextResponse.json({ error: 'Erreur suppression' }, { status: 500 });
  }
}
