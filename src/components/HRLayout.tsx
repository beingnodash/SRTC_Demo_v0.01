import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HRLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: '控制台', icon: 'dashboard' },
  { path: '/create-job', label: '实习项目', icon: 'work' },
  { path: '/candidates', label: '候选人', icon: 'group' },
  { path: '/analytics', label: '数据分析', icon: 'bar_chart' },
];

export default function HRLayout({ children }: HRLayoutProps) {
  const location = useLocation();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col justify-between flex-shrink-0">
          <div>
            <div className="p-6 flex items-center gap-3 text-primary">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">corporate_fare</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">中心企业</h2>
            </div>

            <div className="px-4 mb-6">
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-xl">search</span>
                </span>
                <input
                  className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="搜索实习、候选人..."
                  type="text"
                />
              </div>
            </div>

            <nav className="px-4 space-y-1">
              <p className="px-4 text-xs font-bold text-slate-500 mb-2">主菜单</p>
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      active
                        ? 'bg-primary text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors">
              <span className="material-symbols-outlined">help</span>
              支持中心
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-end px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-full">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-full">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 ml-2">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
