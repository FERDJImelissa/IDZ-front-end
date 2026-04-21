import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AgentLayout from '../../components/AgentLayout';
import { mockAgentRequests, agentStats } from '../../data/mockData';
import { Eye } from 'lucide-react';

export default function AgentDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const statCards = [
    { label: 'En attente', value: agentStats.enAttente, color: 'text-orange-500', border: 'border-l-orange-500' },
    { label: "Traitées aujourd'hui", value: agentStats.traiteesAujourdhui, color: 'text-green-500', border: 'border-l-green-500' },
    { label: 'Rejetées', value: agentStats.rejetees, color: 'text-red-500', border: 'border-l-red-500' },
    { label: "Taux d'acceptation", value: `${agentStats.tauxAcceptation}%`, color: 'text-idz-forest', border: 'border-l-idz-forest' },
  ];

  return (
    <AgentLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-idz-soot">
            Tableau de bord — Agent APC
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Alger Centre · Mardi 31 mars 2026
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat) => (
            <div key={stat.label} className={`bg-white p-6 rounded-soft shadow-sm border border-gray-100 border-l-[6px] ${stat.border}`}>
              <div className={`text-4xl font-heading font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Queue */}
        <div className="bg-white rounded-soft shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-heading font-bold text-idz-soot">
              File d'attente — Demandes citoyennes
            </h2>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {agentStats.enAttente} en attente
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-6 py-4 w-10">#</th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Citoyen</th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Document</th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Date</th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Commune</th>
                  <th className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockAgentRequests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">{req.num}</td>
                    <td className="px-4 py-4 text-sm font-bold text-idz-soot">{req.citoyen}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{req.document}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{req.date}</td>
                    <td className="px-4 py-4">
                      <span className="bg-idz-action/10 text-idz-action text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {req.commune}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => navigate(`/agent/demande/${req.id}`)}
                        className="bg-idz-action hover:bg-[#5a9118] text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                      >
                        <Eye size={14} />
                        Traiter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
}
