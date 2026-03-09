import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/jobs" className="flex items-center gap-3 text-primary">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">corporate_fare</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">央企实习平台</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/jobs"
              className={`text-sm font-medium transition-colors ${isActive('/jobs') || isActive('/job-detail') ? 'text-primary font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
            >
              岗位探索
            </Link>
            <Link
              to="/my-applications"
              className={`text-sm font-medium transition-colors ${isActive('/my-applications') ? 'text-primary font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
            >
              我的申请
            </Link>
            <Link
              to="/resume"
              className={`text-sm font-medium transition-colors ${isActive('/resume') ? 'text-primary font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
            >
              简历编辑
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm w-52 focus:ring-2 focus:ring-primary outline-none transition-all hidden md:block"
              placeholder="搜索意向岗位或企业..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl hidden md:block">search</span>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">张泽华</p>
              <p className="text-xs text-slate-500">清华大学 · 交互设计</p>
            </div>
            <div className="size-10 rounded-full border-2 border-primary/30 p-0.5 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
