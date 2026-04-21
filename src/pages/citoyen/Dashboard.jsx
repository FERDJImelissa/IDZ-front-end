import { Link } from 'react-router-dom';
import CitoyenLayout from '../../components/CitoyenLayout';
import { mockRequests } from '../../data/mockData';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const statusConfig = {
  pending:  { label: 'En attente',  cls: 'status-pending' },
  accepted: { label: 'Acceptée ✓', cls: 'status-accepted' },
  rejected: { label: 'Rejetée ✗',  cls: 'status-rejected' },
};

const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const now = new Date();
const dateLabel = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

export default function CitoyenDashboard() {
  const { user } = useAuth();

  return (
    <CitoyenLayout>
      <div className="p-8 max-w-5xl">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-idz-soot">
            Bonjour, {user.prenom} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Tableau de bord · Commune d'{user.commune} · Né(e) le {user.dateNaissance} à {user.lieuNaissance}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">{dateLabel}</p>
        </div>

        {/* New request CTA */}
        <div className="mb-8">
          <Link
            to="/citoyen/nouvelle-demande"
            className="inline-flex items-center gap-2 btn-primary text-sm"
          >
            <PlusCircle size={17} />
            Nouvelle demande
          </Link>
        </div>

        {/* Requests table */}
        <div className="bg-white rounded-soft shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-heading font-bold text-idz-soot">Mes demandes récentes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3 w-10">#</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Document</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Commune</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Date de dépôt</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Statut</th>
                </tr>
              </thead>
              <tbody>
                {mockRequests.map((req, i) => {
                  const s = statusConfig[req.statut];
                  return (
                    <tr
                      key={req.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-xs text-gray-400 font-mono">{req.num}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-idz-soot">{req.document}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{req.commune}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{req.date}</td>
                      <td className="px-4 py-4">
                        <span className={s.cls}>{s.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {mockRequests.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">
              Aucune demande pour le moment.
              <Link to="/citoyen/nouvelle-demande" className="text-idz-action ml-1 hover:underline">Créez votre première demande →</Link>
            </div>
          )}
        </div>
      </div>
    </CitoyenLayout>
  );
}
