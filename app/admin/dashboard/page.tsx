'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  total: number;
  byStatus: { status: string; count: number }[];
  byDay: { date: string; count: number }[];
}

const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa'];

export default function AdminDashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Fetch data
    Promise.all([
      fetch('/api/contacts/list').then(r => r.json()),
      fetch('/api/admin/stats').then(r => r.json())
    ]).then(([contactsData, statsData]) => {
      setContacts(contactsData);
      setStats(statsData);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    router.push('/admin/login');
  };

  const filteredContacts = filter === 'all' 
    ? (Array.isArray(contacts) ? contacts : []) 
    : (Array.isArray(contacts) ? contacts.filter(c => c.status === filter) : []);

  const exportToCSV = () => {
    const csvData = filteredContacts.map(contact => ({
      Nome: contact.name,
      Email: contact.email,
      Telefone: contact.phone || '',
      Empresa: contact.company || '',
      Mensagem: contact.message,
      Status: contact.status,
      Data: new Date(contact.created_at).toLocaleString('pt-BR')
    }));

    const headers = Object.keys(csvData[0] || {});
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contatos_lumina_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 flex items-center justify-center">
        <div className="text-orange-500 text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-orange-500 mb-2">Dashboard Administrativo</h2>
          <p className="text-gray-400">Lumina Studios - Gestão de Contatos</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            disabled={filteredContacts.length === 0}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            EXPORTAR CSV
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            SAIR
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-orange-500/20">
          <div className="text-gray-400 text-sm mb-2">Total de Contatos</div>
          <div className="text-4xl font-bold text-orange-500">{stats?.total || 0}</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-orange-500/20">
          <div className="text-gray-400 text-sm mb-2">Novos</div>
          <div className="text-4xl font-bold text-blue-400">
            {stats?.byStatus.find(s => s.status === 'new')?.count || 0}
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-orange-500/20">
          <div className="text-gray-400 text-sm mb-2">Taxa de Conversão</div>
          <div className="text-4xl font-bold text-green-400">
            {stats?.total ? ((stats.total / (stats.total + 100)) * 100).toFixed(1) : 0}%
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-orange-500/20">
          <div className="text-gray-400 text-sm mb-2">Hoje</div>
          <div className="text-4xl font-bold text-purple-400">
            {stats?.byDay[stats.byDay.length - 1]?.count || 0}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart - Contatos por Dia */}
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-orange-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Contatos nos Últimos 7 Dias</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats?.byDay || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #f97316' }}
                labelStyle={{ color: '#f97316' }}
              />
              <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Status */}
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-orange-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Distribuição por Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats?.byStatus || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.status}: ${entry.count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stats?.byStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #f97316' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-orange-500/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Lista de Contatos</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'new'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Novos
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Nome</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Empresa</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Telefone</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Data</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition">
                  <td className="py-3 px-4 text-white">{contact.name}</td>
                  <td className="py-3 px-4 text-gray-300">{contact.email}</td>
                  <td className="py-3 px-4 text-gray-300">{contact.company || '-'}</td>
                  <td className="py-3 px-4 text-gray-300">{contact.phone || '-'}</td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(contact.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                      {contact.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredContacts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum contato encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
