import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../components/StudentLayout';

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  department: string;
  appliedAt: string;
  status: 'pending' | 'interview' | 'offer' | 'rejected';
  matchScore: number;
  location: string;
}

const STATUS_CONFIG = {
  pending: { label: '已投递·审核中', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: 'hourglass_empty' },
  interview: { label: '面试邀约', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: 'event' },
  offer: { label: '录用通知', color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: 'verified' },
  rejected: { label: '未通过', color: 'bg-slate-400/10 text-slate-400 border-slate-400/20', icon: 'close' },
};

const DEFAULT_APPS: Application[] = [
  {
    id: 100,
    jobTitle: '高级 UX 设计实习生',
    company: '国家投资集团',
    department: '数字化转型部',
    appliedAt: '2026-03-08 14:32',
    status: 'interview',
    matchScore: 95,
    location: '北京 · 西城区',
  },
  {
    id: 101,
    jobTitle: '数据分析管培生',
    company: '中国建筑集团',
    department: '战略规划部',
    appliedAt: '2026-03-05 10:15',
    status: 'pending',
    matchScore: 82,
    location: '深圳 · 南山区',
  },
];

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | Application['status']>('all');

  useEffect(() => {
    const stored = localStorage.getItem('applications');
    const parsed: Application[] = stored ? JSON.parse(stored) : [];
    // merge default apps that aren't already in localStorage
    const ids = parsed.map(a => a.id);
    const merged = [...DEFAULT_APPS.filter(a => !ids.includes(a.id)), ...parsed];
    setApplications(merged);
  }, []);

  const filtered = activeTab === 'all' ? applications : applications.filter(a => a.status === activeTab);

  const tabCounts = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">我的申请记录</h1>
          <p className="text-slate-500 dark:text-slate-400">跟踪所有已投递岗位的状态变化</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '已投递', count: tabCounts.all, icon: 'send', color: 'text-primary' },
            { label: '面试邀约', count: tabCounts.interview, icon: 'event', color: 'text-amber-500' },
            { label: '已录用', count: tabCounts.offer, icon: 'verified', color: 'text-green-500' },
            { label: '未通过', count: tabCounts.rejected, icon: 'close', color: 'text-slate-400' },
          ].map(item => (
            <div key={item.label} className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <span className={`material-symbols-outlined text-2xl ${item.color} mb-1 block`}>{item.icon}</span>
              <div className={`text-2xl font-black ${item.color}`}>{item.count}</div>
              <div className="text-xs text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'pending', 'interview', 'offer', 'rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary/40'
              }`}
            >
              {tab === 'all' ? '全部' : STATUS_CONFIG[tab].label}
              <span className="ml-1.5 text-xs">({tabCounts[tab]})</span>
            </button>
          ))}
        </div>

        {/* Application Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">inbox</span>
            <p className="text-slate-400 font-medium mb-4">暂无申请记录</p>
            <Link to="/jobs" className="inline-flex items-center gap-2 bg-primary text-white font-bold py-2 px-6 rounded-lg text-sm shadow-sm shadow-primary/20">
              <span className="material-symbols-outlined text-sm">search</span>
              去探索岗位
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(app => {
              const cfg = STATUS_CONFIG[app.status];
              return (
                <div key={app.id} className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex gap-4 hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">apartment</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">{app.jobTitle}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${cfg.color}`}>
                        <span className="material-symbols-outlined text-xs">{cfg.icon}</span>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">{app.company} · {app.department}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{app.location}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>投递于 {app.appliedAt}</span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        AI匹配 {app.matchScore}%
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Link to="/job-detail" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
                        查看岗位详情
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
