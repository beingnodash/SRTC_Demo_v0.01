import React from 'react';
import { Link } from 'react-router-dom';
import HRLayout from '../components/HRLayout';

const POSTINGS = [
  { title: '高级 UX 设计实习生', dept: '产品与设计', status: 'active', applicants: 142, score: 92, posted: '2天前' },
  { title: '后端工程实习生', dept: '技术部', status: 'active', applicants: 285, score: 85, posted: '5天前' },
  { title: '数据分析实习生', dept: '财务部', status: 'reviewing', applicants: 96, score: 78, posted: '1周前' },
  { title: '人力资源运营支持', dept: '企业人力资源部', status: 'filled', applicants: 54, score: 100, posted: '2周前' },
];

const STATUS_CONFIG = {
  active: { label: '活跃', color: 'bg-green-500/10 text-green-500 border-green-500/20', dot: 'bg-green-500' },
  reviewing: { label: '审核中', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', dot: 'bg-amber-500' },
  filled: { label: '已招满', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20', dot: 'bg-slate-400' },
};

export default function Dashboard() {
  return (
    <HRLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">HR 控制台</h1>
              <p className="text-slate-500 dark:text-slate-400">管理您的企业实习计划和 AI 人才匹配。</p>
            </div>
            <Link
              to="/create-job"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              发布新实习
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <span className="material-symbols-outlined">campaign</span>
                </div>
                <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 tracking-wider mb-1">ACTIVE POSTINGS</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">24</h3>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="text-red-500 text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_down</span> 5%
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 tracking-wider mb-1">TOTAL APPLICANTS</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1,284</h3>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> 28%
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 tracking-wider mb-1">AI RECOMMENDED</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">156</h3>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <span className="text-slate-400 text-sm font-bold">0%</span>
              </div>
              <p className="text-xs font-bold text-slate-500 tracking-wider mb-1">CURRENT INTERNS</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">42</h3>
            </div>
          </div>

          {/* Recent Postings Table */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">最近的实习发布</h3>
              <Link to="/candidates" className="text-sm text-primary hover:underline">查看所有候选人</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                    <th className="p-4 font-medium">职位</th>
                    <th className="p-4 font-medium">部门</th>
                    <th className="p-4 font-medium">状态</th>
                    <th className="p-4 font-medium">申请人数</th>
                    <th className="p-4 font-medium">AI 匹配得分</th>
                    <th className="p-4 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {POSTINGS.map((p, i) => {
                    const cfg = STATUS_CONFIG[p.status as keyof typeof STATUS_CONFIG];
                    return (
                      <tr key={i} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => {}}>
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white">{p.title}</p>
                          <p className="text-xs text-slate-500">{p.posted}发布</p>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{p.dept}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.color}`}>
                            <span className={`size-1.5 rounded-full ${cfg.dot}`}></span>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">{p.applicants}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: `${p.score}%` }}></div>
                            </div>
                            <span className="font-bold text-xs">{p.score}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <Link to="/candidates" className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">arrow_forward</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                AI 招聘洞察
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                根据目前的候选人趋势，您的"高级 UX 设计实习生"职位吸引的高质量候选人比行业平均水平多出 40%。建议针对前 5 名 AI 匹配的候选人提前启动面试阶段。
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500 mb-1">招聘效率</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">18.4 <span className="text-lg font-normal text-slate-500">天</span></h3>
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900"></div>
                  <div className="size-8 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900"></div>
                  <div className="size-8 rounded-full bg-slate-400 dark:bg-slate-500 border-2 border-white dark:border-slate-900"></div>
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold border-2 border-white dark:border-slate-900">+12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HRLayout>
  );
}
