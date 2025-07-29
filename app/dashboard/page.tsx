/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiHeart, FiTrendingUp, FiAlertTriangle, FiRefreshCw, FiTrendingDown } from "react-icons/fi";
import { DateRangePicker } from "../components/charts/DateRangePicker";
import { BarChart } from "../components/charts/BarChart";
import { PieChart } from "../components/charts/PieChart";
import { ProgressCircle } from "../components/charts/ProgressCircle";
import { DataTable } from "../components/charts/DataTable";
import { CalendarChart } from "../components/charts/CalendarChart";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import router from "next/router";

type Stats = {
  totalPatients: number;
  averageAge: number;
  genders: { gender: string; count: number }[];
  diagnoses: { diagnosis: string; count: number }[];
  monthlyTrend: { month: string; count: number }[];
  riskDistribution: { risk: string; count: number }[];
  recentPatients: { id: string; name: string; lastVisit: string; status: string }[];
};

const notificationAction = {
  label: 'Voir',
  onClick: () => {
    // Par exemple :
    router.push('/patients/details');
  }
} as const;

export default function ModernDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    end: new Date()
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          start: dateRange.start.toISOString(),
          end: dateRange.end.toISOString()
        });

        const res = await fetch(`/api/stats?${params}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">
            Chargement des données...
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="mt-4 text-lg font-medium text-gray-600">
            Aucune donnée disponible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
  
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord AI4CKD</h1>
          <div className="flex items-center space-x-4">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                // re-fetch data on click
                const fetchData = async () => {
                  try {
                    setLoading(true);
                    const params = new URLSearchParams({
                      start: dateRange.start.toISOString(),
                      end: dateRange.end.toISOString()
                    });

                    const res = await fetch(`/api/stats?${params}`);
                    if (!res.ok) {
                      throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    const data = await res.json();
                    setStats(data);
                  } catch (error) {
                    console.error("Fetch error:", error);
                  } finally {
                    setLoading(false);
                  }
                };

                fetchData();
              }}
              disabled={loading}
              aria-label="Rafraîchir les données"
            >
              <FiRefreshCw className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <KpiCard
            icon={<FiUsers className="text-blue-500" size={24} />}
            title="Patients"
            value={stats.totalPatients || 0}
            change="+12%"
            trend="up"
          />
          <KpiCard
            icon={<FiHeart className="text-green-500" size={24} />}
            title="Âge Moyen"
            value={stats.averageAge ? stats.averageAge.toFixed(1) : "N/A"}
            change="+2.5%"
            trend="up"
          />
          <KpiCard
            icon={<FiTrendingUp className="text-purple-500" size={24} />}
            title="Nouveaux Cas"
            value={stats.monthlyTrend?.[stats.monthlyTrend.length - 1]?.count || 0}
            change="+8%"
            trend="up"
          />
          <KpiCard
            icon={<FiAlertTriangle className="text-red-500" size={24} />}
            title="Cas Critiques"
            value={stats.riskDistribution?.find(r => r.risk === "High")?.count || 0}
            change="-3%"
            trend="down"
          />
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Activité Mensuelle</h2>
            <BarChart
              data={stats.monthlyTrend || []}
              xField="month"
              yField="count"
              height={300}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Répartition par Genre</h2>
            <PieChart
              data={stats.genders || []}
              angleField="count"
              colorField="gender"
              height={300}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Niveau de Risque</h2>
            <ProgressCircle
              data={stats.riskDistribution || []}
              height={300}
            />
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Diagnostics Fréquents</h2>
            <CalendarChart
              data={stats.diagnoses}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">Patients Récents</h2>
            <DataTable
              data={stats.recentPatients || []}
              columns={[
                { header: "Nom", accessor: "name" },
                { header: "Dernière Visite", accessor: "lastVisit" },
                {
                  header: "Statut",
                  accessor: "status",
                  cell: (value: unknown) => {
                    const status = value as string;
                    return (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        status === "Critique" ? "bg-red-100 text-red-800" :
                        status === "Stable" ? "bg-green-100 text-green-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {status}
                      </span>
                    );
                  }
                }
              ]}
              height={350}
            />
          </motion.div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
    
  );
}


interface KpiCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}

// Component for KPI Cards
function KpiCard({ icon, title, value, change, trend }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition" title={`${title}: ${value}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${
        trend === "up" ? "text-green-600" : "text-red-600"
      }`}>
        {trend === "up" ? (
          <FiTrendingUp className="mr-1" />
        ) : (
          <FiTrendingDown className="mr-1" />
        )}
        {change}
        <span className="text-gray-500 ml-1">vs période précédente</span>
      </div>
    </div>
  );
}
