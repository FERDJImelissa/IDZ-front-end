import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ListOrdered, Clock, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AgentLayout({ children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-idz-alabaster">
      {/* Top Header */}
      <header className="bg-idz-forest text-white flex items-center justify-between px-6 py-3 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-idz-action text-white font-bold font-heading text-sm w-9 h-9 flex items-center justify-center rounded-md">
            IDZ
          </div>
          <div>
            <div className="font-heading font-bold text-sm leading-tight">IDZ</div>
            <div className="text-white/60 text-xs">Services Communaux Algériens</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-right leading-tight">
            <div className="font-semibold text-white">{user.prenom}</div>
            <div className="text-[10px] text-white/60 font-medium uppercase tracking-wider">{user.commune || 'APC Béjaïa'}</div>
          </div>
          <span className="text-white/40">|</span>
          <span className="bg-white/10 border border-white/20 rounded-md px-2 py-0.5 text-xs font-semibold">2FA ✓</span>
          <button
            onClick={() => {
                logout();
                navigate('/');
            }}
            className="text-white/70 hover:text-white transition-colors text-xs"
          >
            ← Déconnexion
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-44 bg-idz-forest flex flex-col py-4 px-3 shrink-0">
          <div className="mb-2">
            <span className="flex items-center gap-1.5 text-xs text-green-400 font-semibold px-2 py-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
              CONNECTÉ
            </span>
            <span className="text-xs text-amber-400 font-medium px-2">8 demandes en attente</span>
          </div>

          <nav className="flex flex-col gap-1 flex-1 mt-3">
            <NavLink
              to="/agent/dashboard"
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <LayoutDashboard size={16} />
              {t('nav.dashboard')}
            </NavLink>
            <NavLink
              to="/agent/file-attente"
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <ListOrdered size={16} />
              {t('nav.queue')}
            </NavLink>
            <NavLink
              to="/agent/dashboard"
              end
              className="sidebar-link"
            >
              <Clock size={16} />
              {t('nav.history')}
            </NavLink>
            <NavLink
              to="/agent/profil"
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <User size={16} />
              {t('nav.profile')}
            </NavLink>
          </nav>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          >
            <LogOut size={15} />
            {t('nav.logout')}
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
