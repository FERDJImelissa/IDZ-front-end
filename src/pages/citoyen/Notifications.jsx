import CitoyenLayout from '../../components/CitoyenLayout';
import { mockNotifications } from '../../data/mockData';
import { Download, AlertCircle } from 'lucide-react';

export default function CitoyenNotifications() {
  return (
    <CitoyenLayout>
      <div className="p-8 max-w-3xl">
        <h1 className="text-2xl font-heading font-bold text-idz-soot mb-1">
          notifications 👋
        </h1>
        <div className="w-16 h-0.5 bg-idz-action mt-1 mb-8 rounded-full" />

        <div className="space-y-4">
          {mockNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`rounded-soft p-6 flex items-start justify-between gap-4 ${
                notif.type === 'accepted'
                  ? 'bg-green-100 border border-green-200'
                  : 'bg-red-100 border border-red-200'
              }`}
            >
              <div className="flex-1">
                <p className={`font-heading font-bold text-base mb-1 ${notif.type === 'accepted' ? 'text-green-800' : 'text-red-800'}`}>
                  DEM -{notif.id} - : {notif.document}
                </p>
                <p className={`font-semibold text-sm ${notif.type === 'accepted' ? 'text-green-700' : 'text-red-700'}`}>
                  {notif.message}
                </p>
                {notif.type === 'rejected' && notif.motif && (
                  <div className="mt-3 bg-white/60 rounded-md px-3 py-2 text-xs text-red-600 flex items-start gap-1.5">
                    <AlertCircle size={13} className="mt-0.5 shrink-0" />
                    <span>{notif.motif}</span>
                  </div>
                )}
              </div>
              <div className="shrink-0">
                {notif.type === 'accepted' ? (
                  <button className="flex items-center gap-2 bg-white border border-green-300 text-green-700 hover:bg-green-50 text-xs font-semibold px-4 py-2 rounded-soft transition-all shadow-sm">
                    <Download size={14} />
                    Télécharger la ici
                  </button>
                ) : (
                  <button className="flex items-center gap-2 bg-white/60 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold px-4 py-2 rounded-soft transition-all">
                    voir la cause de rejet
                  </button>
                )}
              </div>
            </div>
          ))}

          {mockNotifications.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">
              Aucune notification pour le moment.
            </div>
          )}
        </div>
      </div>
    </CitoyenLayout>
  );
}
