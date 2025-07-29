import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const history = await prisma.historiqueMedical.findMany({
      where: { patientId: id },
      orderBy: { dateConsultation: 'desc' },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('Erreur récupération historique médical:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
