'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Lead {
  id: number;
  name: string;
  email: string;
  score: number;
  created_at: string;
  lead_status: string;
}

interface Stats {
  total: string;
  avg_score: string;
  max_score: number;
  min_score: number;
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchLeads();
  }, [router]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      setLeads(data.leads);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  // Preparar dados para o gráfico de pontuações
  const scoreRanges = [
    { range: '0-200', count: 0 },
    { range: '201-400', count: 0 },
    { range: '401-600', count: 0 },
    { range: '601-800', count: 0 },
    { range: '801-1000', count: 0 },
  ];

  leads.forEach(lead => {
    if (lead.score <= 200) scoreRanges[0].count++;
    else if (lead.score <= 400) scoreRanges[1].count++;
    else if (lead.score <= 600) scoreRanges[2].count++;
    else if (lead.score <= 800) scoreRanges[3].count++;
    else scoreRanges[4].count++;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Leads do Mini-Game</h1>
            <p className="text-gray-300">Jogadores que completaram o Neural Link Calibration</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              DASHBOARD
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              SAIR
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-gray-300 text-sm mb-2">Total de Jogadores</div>
            <div className="text-4xl font-bold text-white">{stats?.total || 0}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-gray-300 text-sm mb-2">Pontuação Média</div>
            <div className="text-4xl font-bold text-orange-400">
              {stats?.avg_score ? Math.round(parseFloat(stats.avg_score)) : 0}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-gray-300 text-sm mb-2">Maior Pontuação</div>
            <div className="text-4xl font-bold text-green-400">{stats?.max_score || 0}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-gray-300 text-sm mb-2">Menor Pontuação</div>
            <div className="text-4xl font-bold text-blue-400">{stats?.min_score || 0}</div>
          </div>
        </div>

        {/* Gráfico de Distribuição de Pontuações */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Distribuição de Pontuações</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreRanges}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="range" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="count" fill="#f97316" name="Jogadores" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabela de Leads */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Lista de Jogadores</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 text-gray-300 font-semibold">Nome</th>
                  <th className="text-left py-4 px-4 text-gray-300 font-semibold">Email</th>
                  <th className="text-center py-4 px-4 text-gray-300 font-semibold">Pontuação</th>
                  <th className="text-center py-4 px-4 text-gray-300 font-semibold">Data</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400">
                      Nenhum jogador encontrado
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white">{lead.name}</td>
                      <td className="py-4 px-4 text-gray-300">{lead.email}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-bold">
                          {lead.score}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-300">
                        {new Date(lead.created_at).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
