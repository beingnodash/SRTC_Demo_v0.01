import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HRLayout from '../components/HRLayout';

const DEPARTMENTS = ['工程部', '设计部', '市场部', '产品管理', '财务部', '人力资源部'];
const MENTORS = [
  { name: 'Sarah Jenkins', role: '资深设计师' },
  { name: 'Michael Chen', role: '技术主管' },
  { name: 'Elena Rodriguez', role: '产品经理' },
];

export default function CreateJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    department: '',
    description: '',
    mentor: '',
    published: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handlePublish = () => {
    if (!form.title) return;
    // Save to localStorage simulation
    const existing = JSON.parse(localStorage.getItem('hrJobs') || '[]');
    localStorage.setItem('hrJobs', JSON.stringify([...existing, { ...form, id: Date.now(), applicants: 0, postedAt: new Date().toISOString() }]));
    setSubmitted(true);
    setTimeout(() => navigate('/'), 1200);
  };

  const previewTitle = form.title || 'UX 研究实习生';
  const previewDept = form.department || '设计部门';
  const previewDesc = form.description || '加入我们的设计团队，共同塑造我们数字产品的未来。你将与导师紧密合作，进行用户访谈，分析反馈，并提供可落地的见解...';
  const selectedMentor = MENTORS.find(m => m.name === form.mentor);

  return (
    <HRLayout>
      {/* Success Toast */}
      {submitted && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          岗位已成功发布！正在跳转...
        </div>
      )}

      <div className="px-8 py-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link to="/" className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight">创建实习岗位</h1>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-base mt-1 ml-9">设计一个具有吸引力的机会，并为申请人提供所有必要的资源。</p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
              {/* Basic Info */}
              <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">info</span>基本信息
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">职位名称 <span className="text-red-400">*</span></span>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800 text-sm p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="例如：UX 研究实习生"
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">部门</span>
                    <select
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800 text-sm p-3 focus:ring-2 focus:ring-primary outline-none"
                      value={form.department}
                      onChange={e => setForm({ ...form, department: e.target.value })}
                    >
                      <option value="">选择部门</option>
                      {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </label>
                </div>
              </section>

              {/* Description & Mentor */}
              <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">description</span>岗位详情与导师
                </h3>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">详细说明</span>
                    <textarea
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800 text-sm p-3 focus:ring-2 focus:ring-primary outline-none custom-scrollbar"
                      placeholder="描述职责、所需技能和学习成果..."
                      rows={5}
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                    ></textarea>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">导师分配</span>
                    <div className="relative">
                      <select
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-800 text-sm p-3 pl-10 focus:ring-2 focus:ring-primary outline-none"
                        value={form.mentor}
                        onChange={e => setForm({ ...form, mentor: e.target.value })}
                      >
                        <option value="">指派一名导师</option>
                        {MENTORS.map(m => <option key={m.name}>{m.name}（{m.role}）</option>)}
                      </select>
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                    </div>
                  </label>
                </div>
              </section>

              {/* Upload */}
              <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">upload_file</span>实习任务书
                </h3>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center group hover:border-primary transition-colors cursor-pointer">
                  <div className="bg-primary/10 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                  </div>
                  <p className="font-semibold">点击上传或拖拽文件到此处</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">支持 PDF, DOCX 格式，最大 10MB</p>
                  <input className="hidden" type="file" />
                </div>
              </section>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handlePublish}
                  disabled={!form.title || submitted}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    form.title && !submitted
                      ? 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                  type="button"
                >
                  {submitted ? <><span className="material-symbols-outlined text-sm">check</span>已发布</> : '发布岗位'}
                </button>
                <button
                  className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  type="button"
                >
                  保存草稿
                </button>
              </div>
            </form>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg">学生视角预览</h3>
                <span className="bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">实时预览</span>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary to-indigo-900 relative">
                  <div className="absolute -bottom-6 left-6 p-1 bg-white dark:bg-slate-900 rounded-xl shadow-md">
                    <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">apartment</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 pt-10 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold tracking-tight transition-all">{previewTitle}</h4>
                      <p className="text-primary font-medium text-sm">{previewDept}</p>
                    </div>
                    <span className="text-xs text-slate-400">发布于 刚刚</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 全职</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> 线下</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">payments</span> 有偿</span>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h5 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">职位描述</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{previewDesc.slice(0, 100)}{previewDesc.length > 100 ? '...' : ''}</p>
                    </div>
                    {selectedMentor && (
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {selectedMentor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{selectedMentor.name}</p>
                            <p className="text-[10px] text-slate-500">指定导师 &amp; {selectedMentor.role}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="w-full py-3 rounded-lg bg-primary/50 text-white font-bold cursor-not-allowed" disabled>立即申请</button>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
                <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                <p className="text-xs text-amber-700 dark:text-amber-400"><strong>提示：</strong>包含详细描述和指定导师的职位发布的申请质量平均提高 40%。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HRLayout>
  );
}
