import React, { useState, useEffect } from 'react';
import StudentLayout from '../components/StudentLayout';

const DEFAULT_SKILLS = ['Python', 'Java', 'SQL', 'Office 办公套件'];

export default function ResumeEdit() {
  const [skills, setSkills] = useState<string[]>(DEFAULT_SKILLS);
  const [newSkill, setNewSkill] = useState('');
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: '张小明',
    phone: '138****0000',
    email: 'xiaoming.zhang@example.com',
    jobStatus: '在校-寻找实习',
    school: '清华大学',
    major: '计算机科学与技术',
    degree: '本科',
    gradDate: '2025-06',
    selfIntro: '本人性格稳重，具备扎实的计算机专业基础，学习能力强。在校期间多次获得奖学金，熟悉常用的数据结构与算法。渴望在央企平台深入学习，为企业数字化转型贡献力量。',
  });

  const completeness = Math.min(100, 40 + skills.length * 5 + (formData.selfIntro.length > 50 ? 15 : 0) + (formData.email ? 5 : 0));

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify({ ...formData, skills }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <StudentLayout>
      {/* Toast */}
      {saved && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          简历已成功保存！
        </div>
      )}

      <div className="flex items-center justify-end px-6 md:px-20 py-3 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 sticky top-[57px] z-40">
        <div className="flex gap-3">
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold">
            <span className="material-symbols-outlined mr-2 text-sm">visibility</span>预览
          </button>
          <button
            onClick={handleSave}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
          >
            保存
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-[960px] flex flex-col gap-8">
          {/* Completeness */}
          <section className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-4">
              <div className="flex gap-6 justify-between items-end">
                <div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold">简历完整度</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">完善实习经历和技能标签，可提升面试邀约率</p>
                </div>
                <p className="text-primary text-2xl font-bold">{completeness}%</p>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-3 rounded-full bg-primary transition-all duration-500" style={{ width: `${completeness}%` }}></div>
              </div>
            </div>
          </section>

          {/* Basic Info */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">个人基本信息</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-100 dark:bg-slate-900/30 rounded-xl">
              <label className="flex flex-col gap-2">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">姓名</span>
                <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">联系电话</span>
                <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">电子邮箱</span>
                <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">求职状态</span>
                <select className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" value={formData.jobStatus} onChange={e => setFormData({...formData, jobStatus: e.target.value})}>
                  <option>在校-寻找实习</option>
                  <option>应届生-寻找全职</option>
                </select>
              </label>
            </div>
          </section>

          {/* Education */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-l-4 border-primary pl-4">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">教育背景</h2>
              <button className="text-primary flex items-center gap-1 text-sm font-bold">
                <span className="material-symbols-outlined text-lg">add_circle</span> 添加教育经历
              </button>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-900/30 rounded-xl flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">就读院校</span>
                  <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">专业名称</span>
                  <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">学历</span>
                  <select className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})}>
                    <option>本科</option>
                    <option>硕士</option>
                    <option>博士</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">毕业年份</span>
                  <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" type="month" value={formData.gradDate} onChange={e => setFormData({...formData, gradDate: e.target.value})} />
                </label>
              </div>
            </div>
          </section>

          {/* Internship Experience */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-l-4 border-primary pl-4">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">实习经历</h2>
              <button className="text-primary flex items-center gap-1 text-sm font-bold">
                <span className="material-symbols-outlined text-lg">add_circle</span> 添加实习
              </button>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-900/30 rounded-xl flex flex-col gap-6 border border-dashed border-slate-300 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">公司名称</span>
                  <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" placeholder="公司全称" type="text" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">职位名称</span>
                  <input className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-12 focus:ring-2 focus:ring-primary outline-none" placeholder="所属部门/岗位" type="text" />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">工作内容</span>
                <textarea className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-primary outline-none" placeholder="请描述您的职责和工作成果..." rows={4}></textarea>
              </label>
            </div>
          </section>

          {/* Skills */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">技能标签</h2>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-900/30 rounded-xl">
              <div className="flex flex-wrap gap-2 mb-4 min-h-[36px]">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center gap-2 border border-primary/30">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </span>
                ))}
                {skills.length === 0 && <span className="text-slate-400 text-sm italic">暂无技能标签，请在下方添加</span>}
              </div>
              <div className="flex gap-2">
                <input
                  className="form-input flex-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 h-10 text-sm focus:ring-2 focus:ring-primary outline-none"
                  placeholder="输入技能名称，按回车或点击添加"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all"
                >
                  添加
                </button>
              </div>
            </div>
          </section>

          {/* Self Introduction */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">自我评价</h2>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-900/30 rounded-xl">
              <textarea
                className="form-input w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-primary outline-none"
                placeholder="请简要介绍您的优势、特长以及职业规划..."
                rows={5}
                value={formData.selfIntro}
                onChange={e => setFormData({...formData, selfIntro: e.target.value})}
              ></textarea>
            </div>
          </section>

          {/* Resume Attachment */}
          <section className="flex flex-col gap-6 pb-10">
            <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">简历附件</h2>
            </div>
            <div className="p-8 bg-slate-100 dark:bg-slate-900/30 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-4 group hover:border-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-5xl text-slate-400 group-hover:text-primary transition-colors">upload_file</span>
              <div className="text-center">
                <p className="text-slate-900 dark:text-white font-bold">点击或拖拽文件上传</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">支持 PDF, Word 格式，文件大小不超过 10MB</p>
              </div>
              <button className="mt-2 px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">选择文件</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                <div>
                  <p className="text-sm font-bold">张小明_个人简历_清华大学.pdf</p>
                  <p className="text-xs text-slate-500">2.4 MB</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </StudentLayout>
  );
}
