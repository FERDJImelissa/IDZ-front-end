import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgentLayout from '../../components/AgentLayout';
import { mockAgentRequests } from '../../data/mockData';
import { FileText, ArrowRight, X, Check, ArrowLeft } from 'lucide-react';

export default function AgentRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [motif, setMotif] = useState('');
  
  const request = mockAgentRequests.find(r => r.id === id) || mockAgentRequests[0];

  const handleAction = (type) => {
    if (type === 'reject' && !motif) {
      alert('Veuillez saisir un motif de rejet.');
      return;
    }
    alert(`Demande ${type === 'accept' ? 'acceptée' : 'rejetée'} avec succès.`);
    navigate('/agent/dashboard');
  };

  return (
    <AgentLayout>
      <div className="p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              <ArrowLeft size={18} className="text-gray-500" />
            </button>
            <h1 className="text-2xl font-heading font-bold text-idz-soot">
              {request.citoyen}
            </h1>
          </div>
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
            En attente
          </span>
        </div>

        {/* Citizen Info Card */}
        <div className="bg-white rounded-soft border border-gray-100 shadow-sm p-6 mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Informations du citoyen</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Nom</span>
              <span className="font-bold text-idz-soot">{request.nom}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Prénom</span>
              <span className="font-bold text-idz-soot">{request.prenom}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">NIN</span>
              <span className="font-bold text-idz-action font-mono text-xs">{request.nin}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Date naiss.</span>
              <span className="font-bold text-idz-soot">{request.dateNaissance}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Commune</span>
              <span className="font-bold text-idz-soot">{request.communeCitoyen}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Document demandé</span>
              <span className="font-bold text-idz-soot">{request.documentDemande}</span>
            </div>
          </div>
        </div>

        {/* Pieces Justificatives */}
        <div className="bg-white rounded-soft border border-gray-100 shadow-sm p-6 mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Pièces justificatives</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {request.pieces.map((piece, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-soft bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <FileText size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-idz-soot">{piece.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{piece.type} · {piece.size}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-idz-action text-[10px] font-bold hover:underline">
                  Visualiser <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Section */}
        <div className="bg-white rounded-soft border border-gray-100 shadow-sm p-6 mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Décision</p>
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Motif de rejet (obligatoire si rejet) :</label>
            <textarea 
              rows={3}
              placeholder="Saisir un motif de rejet..."
              className="input-field resize-none"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => handleAction('reject')}
              className="flex-1 btn-outline-red flex items-center justify-center gap-2 py-4"
            >
              <X size={18} />
              Rejeter la demande
            </button>
            <button 
              onClick={() => handleAction('accept')}
              className="flex-1 btn-primary flex items-center justify-center gap-2 py-4"
            >
              <Check size={18} />
              Accepter & Générer QR Code
            </button>
          </div>
        </div>

        {/* Tip */}
        <div className="bg-idz-action/5 border border-idz-action/20 rounded-soft p-4 flex items-start gap-3">
          <div className="bg-white p-1.5 rounded-lg shadow-sm border border-idz-action/20">
            <FileText size={16} className="text-idz-action" />
          </div>
          <p className="text-[10px] text-idz-action leading-relaxed">
            <span className="font-bold">Après acceptation :</span> génération automatique du PDF officiel avec QR code d'authentification unique (hash SHA-256 + NIN + date).
          </p>
        </div>
      </div>
    </AgentLayout>
  );
}
