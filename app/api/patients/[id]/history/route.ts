import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function extractIdFromUrl(url: string) {
  const match = url.match(/\/api\/patients\/([^\/]+)\/history/);
  return match ? match[1] : null;
}

export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req.nextUrl.pathname);

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
  }

  try {
    const history = await prisma.historiqueMedical.findMany({
      where: { patientId: id },
      orderBy: { dateConsultation: 'desc' },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

