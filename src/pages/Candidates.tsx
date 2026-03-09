import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HRLayout from '../components/HRLayout';

interface Candidate {
  id: number;
  name: string;
  university: string;
  major: string;
  appliedFor: string;
  aiScore: number;
  status: 'new' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  skills: string[];
  appliedAt: string;
  gpa?: string;
}

const STATUS_CONFIG = {
  new: { label: '新申请', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  reviewing: { label: '简历筛选', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  interview: { label: '面试阶段', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  offer: { label: '已发 Offer', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  rejected: { label: '未通过', color: 'bg-slate-400/10 text-slate-400 border-slate-400/20' },
};

const CANDIDATES: Candidate[] = [
  { id: 1, name: '张泽华', university: '清华大学', major: '交互设计', appliedFor: '高级 UX 设计实习生', aiScore: 95, status: 'interview', skills: ['Figma', 'UX设计', 'Prototyping', '用户研究'], appliedAt: '2026-03-08', gpa: '3.9/4.0' },
  { id: 2, name: '李明远', university: '北京大学', major: '计算机科学', appliedFor: '后端工程实习生', aiScore: 91, status: 'reviewing', skills: ['Java', 'Spring Boot', 'MySQL', 'Kafka'], appliedAt: '2026-03-07', gpa: '3.8/4.0' },
  { id: 3, name: '王思琪', university: '复旦大学', major: '数据科学', appliedFor: '数据分析管培生', aiScore: 87, status: 'new', skills: ['Python', 'SQL', 'Tableau', 'R语言'], appliedAt: '2026-03-09', gpa: '3.7/4.0' },
  { id: 4, name: '陈浩宇', university: '上海交通大学', major: '工业工程', appliedFor: '数据分析管培生', aiScore: 83, status: 'new', skills: ['Excel', 'Python', 'SPSS', '统计分析'], appliedAt: '2026-03-09' },
  { id: 5, name: '林雨晴', university: '浙江大学', major: '人力资源管理', appliedFor: '人力资源助理', aiScore: 79, status: 'offer', skills: ['招聘流程', '劳动法', 'HR系统', 'Excel'], appliedAt: '2026-03-01', gpa: '3.6/4.0' },
  { id: 6, name: '赵一凡', university: '南京大学', major: '市场营销', appliedFor: '市场营销实习生', aiScore: 72, status: 'rejected', skills: ['内容策划', '新媒体', 'PPT', '文案写作'], appliedAt: '2026-02-28' },
];

export default function Candidates() {
  const [activeFilter, setActiveFilter] = useState<'all' | Candidate['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredCandidates = CANDIDATES.filter(c => {
    const matchesStatus = activeFilter === 'all' || c.status === activeFilter;
    const matchesSearch = c.name.includes(searchQuery) || c.university.includes(searchQuery) || c.appliedFor.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const counts = {
    all: CANDIDATES.length,
    new: CANDIDATES.filter(c => c.status === 'new').length,
    reviewing: CANDIDATES.filter(c => c.status === 'reviewing').length,
    interview: CANDIDATES.filter(c => c.status === 'interview').length,
    offer: CANDIDATES.filter(c => c.status === 'offer').length,
    rejected: CANDIDATES.filter(c => c.status === 'rejected').length,
  };

  return (
    <HRLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">候选人管理</h1>
            <p className="text-slate-500 dark:text-slate-400">管理所有已申请岗位的候选人，AI 推荐排序</p>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-xl">search</span>
            </span>
            <input
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm w-56 focus:ring-2 focus:ring-primary outline-none"
              placeholder="搜索候选人或岗位..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {[
            { key: 'new', label: '新申请', color: 'text-blue-500' },
            { key: 'reviewing', label: '筛选中', color: 'text-purple-500' },
            { key: 'interview', label: '面试中', color: 'text-amber-500' },
            { key: 'offer', label: '已发Offer', color: 'text-green-500' },
            { key: 'rejected', label: '未通过', color: 'text-slate-400' },
          ].map(item => (
            <div key={item.key} className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className={`text-2xl font-black ${item.color}`}>{counts[item.key as keyof typeof counts]}</div>
              <div className="text-xs text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary/40'}`}
          >
            全部 ({counts.all})
          </button>
          {(Object.keys(STATUS_CONFIG) as Candidate['status'][]).map(s => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === s ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary/40'}`}
            >
              {STATUS_CONFIG[s].label} ({counts[s]})
            </button>
          ))}
        </div>

        {/* Candidate Cards */}
        <div className="flex flex-col gap-3">
          {filteredCandidates.map(candidate => {
            const cfg = STATUS_CONFIG[candidate.status];
            const isExpanded = expandedId === candidate.id;
            return (
              <div key={candidate.id} className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/20 transition-all overflow-hidden">
                <div className="p-5 flex items-center gap-4">
                  {/* Avatar */}
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    {candidate.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">{candidate.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>{cfg.label}</span>
                      {candidate.gpa && <span className="text-xs text-slate-400">GPA {candidate.gpa}</span>}
                    </div>
                    <p className="text-sm text-slate-500 mb-1">{candidate.university} · {candidate.major}</p>
                    <p className="text-xs text-slate-400">申请：<span className="text-primary font-medium">{candidate.appliedFor}</span> · {candidate.appliedAt}</p>
                  </div>

                  <div className="text-right flex-shrink-0 hidden md:block">
                    <div className="text-primary font-black text-2xl">{candidate.aiScore}<span className="text-sm font-normal">%</span></div>
                    <div className="text-xs text-slate-400 mb-2">AI推荐</div>
                    <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden ml-auto">
                      <div className="bg-primary h-full" style={{ width: `${candidate.aiScore}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : candidate.id)}
                    className="p-2 text-slate-400 hover:text-primary transition-colors flex-shrink-0"
                  >
                    <span className="material-symbols-outlined">{isExpanded ? 'expand_less' : 'expand_more'}</span>
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/30">
                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">技能标签</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map(s => (
                          <span key={s} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link to="/resume" className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">description</span>
                        查看简历
                      </Link>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg text-sm font-bold hover:bg-amber-500/20 transition-colors">
                        <span className="material-symbols-outlined text-sm">event</span>
                        发送面试邀约
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-auto">
                        <span className="material-symbols-outlined text-sm">close</span>
                        不合适
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </HRLayout>
  );
}
