import CitoyenLayout from '../../components/CitoyenLayout';
import { mockCitizen } from '../../data/mockData';

export default function CitoyenProfile() {
  const initials = `${mockCitizen.prenom[0]}${mockCitizen.nom[0]}`;

  return (
    <CitoyenLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-heading font-bold text-idz-soot mb-1">Mon Profil</h1>
        <p className="text-sm text-gray-400 mb-8">Informations personnelles liées à votre NIN</p>

        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-idz-action flex items-center justify-center text-xl font-heading font-bold text-idz-forest bg-idz-action/10">
            {initials}
          </div>
          <div>
            <p className="font-heading font-bold text-idz-soot text-base">{mockCitizen.nom} {mockCitizen.prenom}</p>
            <p className="text-sm text-gray-400">{mockCitizen.commune}, Alger</p>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-gray-100 rounded-soft p-6 space-y-4">
          {[
            { label: 'Nom complet',              value: `${mockCitizen.nom} ${mockCitizen.prenom}` },
            { label: 'Date ET lieu de naissance', value: mockCitizen.dateNaissance },
            { label: 'NIN',                       value: mockCitizen.nin, mono: true },
            { label: 'Commune',                   value: `${mockCitizen.commune}, Alger` },
            { label: 'Email',                     value: mockCitizen.email },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex items-start gap-4">
              <span className="text-sm text-gray-400 w-48 shrink-0">{label}</span>
              <span className={`text-sm font-semibold text-idz-soot ${mono ? 'font-mono' : ''}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </CitoyenLayout>
  );
}
