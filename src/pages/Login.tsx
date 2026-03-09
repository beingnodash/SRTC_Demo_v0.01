import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleSelectRole = (role: 'student' | 'hr') => {
    localStorage.setItem('userRole', role);
    if (role === 'student') {
      localStorage.setItem('userName', '张泽华');
      localStorage.setItem('userSchool', '清华大学 · 交互设计');
      navigate('/jobs');
    } else {
      localStorage.setItem('userName', '李招聘');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-3xl">corporate_fare</span>
        </div>
        <div>
          <h1 className="text-white text-2xl font-black tracking-tight">央企实习招聘平台</h1>
          <p className="text-slate-400 text-xs">SRTC · AI 驱动的央企实习匹配系统</p>
        </div>
      </div>

      <p className="text-slate-300 text-lg mb-10 font-medium">请选择您的登录身份</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* 学生端 */}
        <button
          onClick={() => handleSelectRole('student')}
          onMouseEnter={() => setHoveredRole('student')}
          onMouseLeave={() => setHoveredRole(null)}
          className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/60 rounded-2xl p-8 flex flex-col items-center gap-5 transition-all duration-300 cursor-pointer text-left hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
        >
          <div className={`size-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${hoveredRole === 'student' ? 'bg-primary shadow-lg shadow-primary/40' : 'bg-slate-700'}`}>
            <span className="material-symbols-outlined text-white text-4xl">school</span>
          </div>
          <div className="text-center">
            <h3 className="text-white text-xl font-bold mb-2">学生求职者</h3>
            <p className="text-slate-400 text-sm leading-relaxed">探索央企实习机会、编辑简历、追踪申请进度，通过 AI 匹配找到最适合您的岗位</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/20">AI 智能匹配</span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">简历管理</span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">申请追踪</span>
          </div>
          <div className={`flex items-center gap-2 text-sm font-bold transition-colors ${hoveredRole === 'student' ? 'text-primary' : 'text-slate-400'}`}>
            以学生身份登录
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </div>
        </button>

        {/* HR端 */}
        <button
          onClick={() => handleSelectRole('hr')}
          onMouseEnter={() => setHoveredRole('hr')}
          onMouseLeave={() => setHoveredRole(null)}
          className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/60 rounded-2xl p-8 flex flex-col items-center gap-5 transition-all duration-300 cursor-pointer text-left hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1"
        >
          <div className={`size-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${hoveredRole === 'hr' ? 'bg-emerald-600 shadow-lg shadow-emerald-500/40' : 'bg-slate-700'}`}>
            <span className="material-symbols-outlined text-white text-4xl">manage_accounts</span>
          </div>
          <div className="text-center">
            <h3 className="text-white text-xl font-bold mb-2">企业 HR 招募方</h3>
            <p className="text-slate-400 text-sm leading-relaxed">发布实习岗位、管理候选人、借助 AI 推荐快速筛选优质人才，提升招募效率</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">岗位发布</span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">候选人管理</span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">数据洞察</span>
          </div>
          <div className={`flex items-center gap-2 text-sm font-bold transition-colors ${hoveredRole === 'hr' ? 'text-emerald-400' : 'text-slate-400'}`}>
            以 HR 身份登录
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </div>
        </button>
      </div>

      <p className="text-slate-600 text-xs mt-10">© 2026 央企实习招聘平台 · SRTC · 演示版本</p>
    </div>
  );
}
