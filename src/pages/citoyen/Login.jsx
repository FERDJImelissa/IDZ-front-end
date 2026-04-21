import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import citoyenBg from '../../assets/citoyen_bg.jpg';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

const ALGERIA_PHOTO = citoyenBg;

export default function CitoyenLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({ prenom: '', nin: '', password: '' });
  // Register form state
  const [regForm, setRegForm] = useState({ prenom: '', nom: '', nin: '', password: '', telephone: '', email: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    login({ prenom: loginForm.prenom, type: 'citoyen' });
    navigate('/citoyen/dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    login({ prenom: regForm.prenom, nom: regForm.nom, type: 'citoyen' });
    navigate('/citoyen/dashboard');
  };

  return (
    <div className="min-h-screen flex font-body">
      {/* ── Left / Form side ────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 bg-idz-alabaster relative">
        {/* Back link */}
        <Link to="/" className="absolute top-5 right-6 flex items-center gap-1.5 text-xs text-gray-400 hover:text-idz-forest transition-colors">
          <ArrowLeft size={13} /> Retour à l'accueil
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-idz-forest text-white font-heading font-bold text-sm w-9 h-9 flex items-center justify-center rounded-md">IDZ</div>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-soft shadow-lg border border-gray-100 p-8">
          <h1 className="text-xl font-heading font-bold text-idz-forest text-center mb-1">
            {tab === 'login' ? 'Connexion Citoyen' : 'Inscription Citoyen'}
          </h1>
          <p className="text-xs text-gray-400 text-center mb-6">
            {tab === 'login' ? 'Accédez à votre espace personnel sécurisé' : 'Créez votre espace personnel sécurisé'}
          </p>

          {/* Tabs */}
          <div className="flex rounded-soft border border-gray-200 overflow-hidden mb-6">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-sm font-semibold transition-all ${tab === 'login' ? 'bg-idz-forest text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              Connexion
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2 text-sm font-semibold transition-all ${tab === 'register' ? 'bg-idz-forest text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              Inscription
            </button>
          </div>

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Prénom</label>
                <input
                  type="text"
                  placeholder="Ex: Amina"
                  value={loginForm.prenom}
                  onChange={e => setLoginForm({...loginForm, prenom: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">NIN (18 chiffres)</label>
                <input
                  type="text"
                  placeholder="123456789123456789"
                  maxLength={18}
                  value={loginForm.nin}
                  onChange={e => setLoginForm({...loginForm, nin: e.target.value})}
                  className="input-field font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                    className="input-field pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
                Se connecter →
              </button>
              <p className="text-center text-xs text-idz-action hover:underline cursor-pointer mt-2">
                Mot de passe oublié / S'inscrire
              </p>
            </form>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Prénom</label>
                  <input type="text" placeholder="Ex: Amina" className="input-field" required
                    value={regForm.prenom} onChange={e => setRegForm({...regForm, prenom: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nom</label>
                  <input type="text" placeholder="Ex: Benali" className="input-field" required
                    value={regForm.nom} onChange={e => setRegForm({...regForm, nom: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">NIN (18 chiffres)</label>
                <input type="text" placeholder="123456789123456789" maxLength={18} className="input-field font-mono" required
                  value={regForm.nin} onChange={e => setRegForm({...regForm, nin: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe</label>
                  <input type="password" placeholder="••••••••" className="input-field" required
                    value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Numéro de téléphone</label>
                  <input type="tel" placeholder="05XXXXXXXX" className="input-field" required
                    value={regForm.telephone} onChange={e => setRegForm({...regForm, telephone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input type="email" placeholder="votre@email.com" className="input-field" required
                  value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary w-full mt-1 flex items-center justify-center gap-2">
                Confirmer →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Right / Photo side ──────────────────────────── */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src={ALGERIA_PHOTO}
          alt="Vue d'Alger"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.parentNode.style.background = 'linear-gradient(135deg, #294411, #1a2d0a)';
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-idz-forest/30" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-soft p-4 text-white">
            <p className="text-sm font-semibold">🔒 Connexion sécurisée</p>
            <p className="text-xs text-white/70 mt-1">Vos données sont protégées par chiffrement TLS 1.2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
