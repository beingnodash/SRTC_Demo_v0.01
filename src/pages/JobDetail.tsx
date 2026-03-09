import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentLayout from '../components/StudentLayout';

const JOBS = [
  { title: '高级UX设计实习生', company: '国家投资集团 · 北京', score: 95 },
  { title: '后端工程实习生', company: '中化控股 · 上海', score: 88 },
  { title: '数据分析管培生', company: '中国建筑集团 · 深圳', score: 82 },
  { title: '人力资源助理', company: '华润集团 · 香港', score: 75 },
];

export default function JobDetail() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('applications') || '[]');
    const newApp = {
      id: Date.now(),
      jobTitle: '高级 UX 设计实习生',
      company: '国家投资集团',
      department: '数字化转型部',
      appliedAt: new Date().toLocaleString('zh-CN', { hour12: false }).slice(0, 16),
      status: 'pending',
      matchScore: 95,
      location: '北京 · 西城区',
    };
    localStorage.setItem('applications', JSON.stringify([...existing, newApp]));
    setApplied(true);
    setShowModal(false);
    setTimeout(() => navigate('/my-applications'), 800);
  };

  return (
    <StudentLayout>
      <div className="relative flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 57px)' }}>
        {/* Left Sidebar Job List */}
        <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">推荐岗位</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">AI智能匹配中</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-1.5 rounded bg-primary text-white font-medium">综合匹配</button>
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">最新发布</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {JOBS.map((job, i) => (
              <div
                key={i}
                onClick={() => setSelectedJob(i)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedJob === i
                    ? 'bg-primary/5 border-l-4 border-primary'
                    : 'border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-${selectedJob === i ? 'bold' : 'semibold'} text-slate-${selectedJob === i ? '900 dark:text-white' : '700 dark:text-slate-300'}`}>{job.title}</h4>
                  <span className={`font-bold text-sm ${selectedJob === i ? 'text-primary' : 'text-slate-400'}`}>{job.score}%</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{job.company}</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                  <div className={`h-full ${selectedJob === i ? 'bg-primary' : 'bg-primary/40'}`} style={{ width: `${job.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark/50 overflow-y-auto custom-scrollbar">
          <div className="p-8 max-w-4xl mx-auto w-full">
            {/* Job Header */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 mb-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">高级UX设计实习生</h1>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="flex items-center gap-1 text-slate-500 text-sm"><span className="material-symbols-outlined text-sm">location_on</span>北京 · 西城区</span>
                    <span className="flex items-center gap-1 text-slate-500 text-sm"><span className="material-symbols-outlined text-sm">calendar_today</span>4-6个月</span>
                    <span className="flex items-center gap-1 text-slate-500 text-sm"><span className="material-symbols-outlined text-sm">schedule</span>4天/周</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-medium">国投集团 | 数字化转型部</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-primary text-sm font-bold flex items-center gap-1 justify-end">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    AI 极高匹配
                  </div>
                  <div className="text-4xl font-bold text-primary">95<span className="text-xl">%</span></div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h5 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                  AI 匹配理由
                </h5>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  您的简历中体现了扎实的交互设计基础（Figma, Adobe XD）以及丰富的 B 端系统设计经验。您在"智慧政务"项目中的表现与国投集团数字化转型部的业务场景高度契合。此外，您的英语水平能胜任国际化协作要求。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">description</span>岗位描述
                  </h3>
                  <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    <p>1. 参与集团核心管理系统的 UI/UX 设计升级，负责从原型到高保真视觉的输出；</p>
                    <p>2. 协助资深设计师进行用户调研与数据分析，提炼产品优化点；</p>
                    <p>3. 参与建立与维护集团统一的设计规范体系（Design System）；</p>
                    <p>4. 与产品经理及前端开发团队紧密协作，确保设计方案的高质量落地。</p>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold mb-2">任职要求：</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>设计类相关专业，本科及以上学历，在读学生；</li>
                        <li>熟练掌握 Figma, Sketch, Protopie 等主流设计工具；</li>
                        <li>具备良好的逻辑思维能力和审美水平，关注细节；</li>
                        <li>有大型互联网公司或数字化转型项目实习经验者优先。</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">task</span>实习任务书预览
                  </h3>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                    <div className="flex items-center gap-4">
                      <div className="size-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">国投数字化转型实习生-任务大纲.pdf</p>
                        <p className="text-xs text-slate-500">2.4 MB · 包含周报要求与考核标准</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">download</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">supervisor_account</span>带教导师
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">王</div>
                    <div>
                      <p className="font-bold">王清璇</p>
                      <p className="text-xs text-slate-500">数字化转型部 · 首席UX专家</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 text-xs italic text-slate-500 leading-relaxed border-l-2 border-primary">
                    "我们正在进行一场深度的数字化变革，期待有想法、敢实践的年轻力量加入，共同定义央企数字化的新高度。"
                  </div>
                </div>

                <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
                  <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10">verified</span>
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold mb-1">国家投资集团</h4>
                    <p className="text-xs text-white/80 mb-4 font-light">世界500强央企</p>
                    <ul className="text-xs space-y-2 opacity-90">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span>签署正式实习协议</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span>提供实习津贴及午餐</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span>优秀者提供秋招直通绿卡</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Apply Bar */}
      <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">star</span>
              <span className="text-sm font-medium">收藏岗位</span>
            </button>
            <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors ml-4">
              <span className="material-symbols-outlined">share</span>
              <span className="text-sm font-medium">分享</span>
            </button>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
          <p className="text-xs text-slate-400">已有 128 人申请该岗位，竞争指数：<span className="text-yellow-500">适中</span></p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs text-slate-500 hidden sm:block">预计反馈时间：2个工作日内</p>
          <button
            onClick={() => !applied && setShowModal(true)}
            className={`font-bold py-2.5 px-10 rounded-lg shadow-lg transition-all flex items-center gap-2 ${
              applied
                ? 'bg-green-500 text-white shadow-green-500/20 cursor-default'
                : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
            }`}
          >
            {applied ? (
              <><span className="material-symbols-outlined text-sm">check_circle</span>已成功投递</>
            ) : (
              <>立即申请<span className="material-symbols-outlined text-sm">send</span></>
            )}
          </button>
        </div>
      </footer>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-6">
              <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">send</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">确认投递申请</h3>
              <p className="text-slate-500 text-sm">您即将申请以下岗位，请确认信息无误：</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-white mb-1">高级 UX 设计实习生</p>
              <p className="text-sm text-primary font-medium mb-2">国家投资集团 · 数字化转型部</p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">location_on</span>北京 · 西城区
                <span className="ml-2 material-symbols-outlined text-sm">auto_awesome</span>
                <span className="text-primary font-bold">95% AI 匹配</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                再想想
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                确认投递
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
}
