import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../components/StudentLayout';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  department: string;
  type: string;
  matchScore: number;
  tags: string[];
  description: string;
  isNew?: boolean;
  isHot?: boolean;
}

const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: '高级 UX 设计实习生',
    company: '国家投资集团',
    location: '北京 · 西城区',
    duration: '4-6个月',
    department: '数字化转型部',
    type: '线下全职',
    matchScore: 95,
    tags: ['Figma', 'UX设计', '用户研究', '产品思维'],
    description: '参与集团核心管理系统的 UI/UX 设计升级，与资深设计师紧密合作，进行用户访谈与数据分析...',
    isHot: true,
  },
  {
    id: 2,
    title: '后端工程实习生',
    company: '中化控股',
    location: '上海 · 浦东新区',
    duration: '3-6个月',
    department: '技术部',
    type: '线下全职',
    matchScore: 88,
    tags: ['Java', 'Spring Boot', 'MySQL', '微服务'],
    description: '负责企业内部系统核心模块的设计与开发，参与代码评审，编写技术文档...',
    isNew: true,
  },
  {
    id: 3,
    title: '数据分析管培生',
    company: '中国建筑集团',
    location: '深圳 · 南山区',
    duration: '6个月',
    department: '战略规划部',
    type: '线下全职',
    matchScore: 82,
    tags: ['Python', 'SQL', 'Tableau', '数据挖掘'],
    description: '协助开展市场数据分析与行业研究，为决策层提供数据支撑报告...',
  },
  {
    id: 4,
    title: '人力资源助理',
    company: '华润集团',
    location: '香港 · 中环',
    duration: '3个月',
    department: '集团人力资源部',
    type: '混合办公',
    matchScore: 75,
    tags: ['HR流程', 'Excel', '招聘协调', '人力分析'],
    description: '协助人力资源团队完成招聘流程管理、候选人跟进及数据整理...',
  },
  {
    id: 5,
    title: '市场营销实习生',
    company: '中粮集团',
    location: '北京 · 朝阳区',
    duration: '3-4个月',
    department: '品牌营销中心',
    type: '线下全职',
    matchScore: 70,
    tags: ['内容策划', '新媒体运营', 'PPT', '品牌传播'],
    description: '参与品牌营销活动的策划与执行，协助撰写营销文案，维护社交媒体账号...',
  },
  {
    id: 6,
    title: '前端开发实习生',
    company: '中国移动',
    location: '广州 · 天河区',
    duration: '4个月',
    department: '信息技术部',
    type: '线下全职',
    matchScore: 67,
    tags: ['React', 'TypeScript', 'CSS', '前端工程化'],
    description: '参与公司内部管理系统和用户门户的前端开发工作，与后端接口联调，优化用户体验...',
    isNew: true,
  },
];

const FILTERS = ['全部', '设计类', '技术类', '运营类', '综合管培'];
const CITIES = ['全部城市', '北京', '上海', '深圳', '广州', '香港'];

export default function JobList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [activeCity, setActiveCity] = useState('全部城市');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedJobs(prev => prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]);
  };

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.includes(searchQuery) || job.company.includes(searchQuery) || job.tags.some(t => t.includes(searchQuery));
    const matchesCity = activeCity === '全部城市' || job.location.startsWith(activeCity);
    return matchesSearch && matchesCity;
  });

  return (
    <StudentLayout>
      <div className="bg-slate-50 dark:bg-background-dark/50 min-h-full">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary to-indigo-900 py-10 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-primary/30 mb-3">
              <span className="material-symbols-outlined text-white/60">auto_awesome</span>
              <span className="text-white/60 text-sm font-medium">AI 正在为您智能匹配 · 基于您的简历与技能</span>
            </div>
            <h1 className="text-white text-3xl font-black mb-3">探索央企实习机会</h1>
            <p className="text-white/70 mb-6">已为您推荐 <span className="text-white font-bold">{MOCK_JOBS.length}</span> 个高匹配度岗位</p>
            <div className="relative max-w-2xl">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </span>
              <input
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/30 shadow-xl"
                placeholder="搜索职位名称、公司、技能标签..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === f
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="ml-auto">
              <select
                value={activeCity}
                onChange={e => setActiveCity(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-sm focus:ring-primary focus:border-primary outline-none"
              >
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="flex flex-col gap-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <span className="material-symbols-outlined text-5xl mb-3 block">search_off</span>
                <p>未找到匹配的岗位，请尝试其他关键词</p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all p-6 flex flex-col md:flex-row gap-4"
                >
                  {/* Company Logo Placeholder */}
                  <div className="size-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary flex-shrink-0 self-start">
                    <span className="material-symbols-outlined text-3xl">apartment</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">{job.title}</h3>
                        {job.isHot && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">🔥 热门</span>}
                        {job.isNew && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">✨ 新发布</span>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-primary font-black text-2xl leading-none">{job.matchScore}<span className="text-sm font-normal">%</span></div>
                        <div className="text-xs text-slate-400 mt-0.5">AI匹配</div>
                      </div>
                    </div>

                    <p className="text-primary font-medium text-sm mb-2">{job.company} · {job.department}</p>

                    <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{job.location}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span>{job.duration}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>{job.type}</span>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-xs font-medium">{tag}</span>
                      ))}
                    </div>

                    {/* Match Bar */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${job.matchScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">匹配度 {job.matchScore}%</span>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to="/job-detail"
                        className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all shadow-sm shadow-primary/20 text-center"
                      >
                        查看详情
                      </Link>
                      <button
                        onClick={() => toggleSave(job.id)}
                        className={`flex items-center gap-1.5 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                          savedJobs.includes(job.id)
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-amber-500 hover:border-amber-500/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {savedJobs.includes(job.id) ? 'star' : 'star_border'}
                        </span>
                        {savedJobs.includes(job.id) ? '已收藏' : '收藏'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
