import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob';
import ResumeEdit from './pages/ResumeEdit';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import JobList from './pages/JobList';
import MyApplications from './pages/MyApplications';
import Candidates from './pages/Candidates';

export default function App() {
  return (
    <BrowserRouter>
      {/* Dev Navigation */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-1.5 bg-slate-900 p-3 rounded-xl shadow-2xl border border-slate-700 opacity-30 hover:opacity-100 transition-opacity text-xs">
        <div className="text-slate-500 font-bold uppercase tracking-wider mb-1 text-[10px]">Dev Nav</div>
        <div className="text-slate-400 font-semibold text-[10px] mb-0.5">— 公共 —</div>
        <Link to="/login" className="text-white hover:text-primary">🔑 Login</Link>
        <div className="text-slate-400 font-semibold text-[10px] mt-1 mb-0.5">— 学生端 —</div>
        <Link to="/jobs" className="text-white hover:text-primary">📋 岗位列表</Link>
        <Link to="/job-detail" className="text-white hover:text-primary">🔍 职位详情</Link>
        <Link to="/resume" className="text-white hover:text-primary">📄 简历编辑</Link>
        <Link to="/my-applications" className="text-white hover:text-primary">📬 我的申请</Link>
        <div className="text-slate-400 font-semibold text-[10px] mt-1 mb-0.5">— HR 端 —</div>
        <Link to="/" className="text-white hover:text-primary">📊 HR Dashboard</Link>
        <Link to="/create-job" className="text-white hover:text-primary">➕ 创建岗位</Link>
        <Link to="/candidates" className="text-white hover:text-primary">👥 候选人</Link>
      </div>

      <Routes>
        {/* 公共 */}
        <Route path="/login" element={<Login />} />
        {/* 学生端 */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job-detail" element={<JobDetail />} />
        <Route path="/resume" element={<ResumeEdit />} />
        <Route path="/my-applications" element={<MyApplications />} />
        {/* HR 端 */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </BrowserRouter>
  );
}
