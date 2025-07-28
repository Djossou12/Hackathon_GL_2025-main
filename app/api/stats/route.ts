// app/api/stats/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const totalPatients = await prisma.patient.count();
    const averageAge = await prisma.patient.aggregate({
      _avg: { age: true },
    });

    const diagnoses = await prisma.patient.groupBy({
      by: ["diagnosis"],
      _count: { diagnosis: true },
    });

    return NextResponse.json({
      totalPatients,
      averageAge: averageAge._avg.age || 0,
      diagnoses,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des stats :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
