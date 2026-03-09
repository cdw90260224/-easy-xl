import React, { useState } from 'react';
import {
    Search, Moon, Sun, ShieldCheck, Wand2,
    ArrowRight, Lock, FileSpreadsheet, AlertCircle
} from 'lucide-react';

// 1. 샘플 데이터 (데이터가 없어서 흰 화면이 뜨지 않도록 내부에 포함)
const MOCK_DATA = [
    { id: 1, name: "차도운", department: "기획팀", role: "PM", amount: 4500000, date: "2025-03-01" },
    { id: 2, name: "박지민", department: "개발팀", role: "시니어", amount: 5500000, date: "2024-12-15" },
    { id: 3, name: "이영희", department: "디자인팀", role: "팀장", amount: 4800000, date: "2025-01-10" },
    { id: 4, name: "탄보", department: "글로벌팀", role: "매니저", amount: 4000000, date: "2025-02-05" },
];

// 2. 표(DataGrid) 컴포넌트 (파일을 나누지 않고 내부에 정의)
const DataGrid = ({ data, searchQuery }) => {
    const renderHighlighted = (text) => {
        if (!searchQuery || typeof text !== 'string') return text;
        const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                        <span key={i} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 font-medium rounded-sm px-0.5">
                            {part}
                        </span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };

    return (
        <div className="w-full bg-white dark:bg-[#1c1f26] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-[#1c1f26]">
                <FileSpreadsheet className="text-green-600 dark:text-green-500" size={20} />
                <h2 className="font-semibold text-lg text-slate-800 dark:text-white">급여 관리.xlsx</h2>
                <span className="ml-auto text-xs text-slate-500">총 {data.length}행</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-[#141414] text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-4 font-medium">이름</th>
                            <th className="px-6 py-4 font-medium">부서</th>
                            <th className="px-6 py-4 font-medium text-right">급여 (₩)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data.length > 0 ? data.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-[#232323] transition-colors">
                                <td className="px-6 py-4 text-sm font-medium dark:text-white">{renderHighlighted(row.name)}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{renderHighlighted(row.department)}</td>
                                <td className="px-6 py-4 text-sm text-right font-medium dark:text-slate-200">{row.amount.toLocaleString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-12 text-center text-slate-400">검색 결과가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 3. 메인 앱 컴포넌트
export default function App() {
    const [query, setQuery] = useState("");
    const [isDark, setIsDark] = useState(true);

    const filteredData = MOCK_DATA.filter(item =>
        item.name.includes(query) || item.department.includes(query)
    );

    const showPreview = query.length >= 2;

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen bg-slate-50 dark:bg-[#0f1115] p-4 md:p-8 transition-colors text-slate-900 dark:text-slate-100 font-sans">

                {/* 상단 보안 가이드 바 */}
                <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                        <ShieldCheck size={14} />
                        <span className="hidden sm:inline">로컬 보안 모드: 모든 데이터는 브라우저 내에서 안전하게 처리됩니다.</span>
                        <span className="sm:hidden text-[10px]">보안 모드 활성 중</span>
                    </div>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-white/10 transition-colors"
                    >
                        {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
                    </button>
                </div>

                {/* 헤더 섹션 */}
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <h1 className="text-4xl font-black mb-3 tracking-tight">
                        EasyXL<span className="text-indigo-600">.GG</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium">자연어로 제어하는 전문가용 엑셀 에이전트</p>

                    <div className="relative max-w-2xl mx-auto group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="예: 기획팀 차도운 내역 합산해줘"
                            className="w-full p-5 pl-14 rounded-2xl border-none shadow-2xl dark:bg-[#1c1f26] focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all outline-none"
                        />
                    </div>
                </div>

                {/* 콘텐츠 그리드 */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 메인 데이터 표 */}
                    <div className="lg:col-span-2">
                        <DataGrid data={filteredData} searchQuery={query} />
                    </div>

                    {/* 사이드바: 미리보기 및 보안 */}
                    <div className="space-y-6">
                        {showPreview ? (
                            <div className="bg-white dark:bg-[#1c1f26] p-6 rounded-2xl shadow-xl border-t-4 border-indigo-500 transform transition-all animate-in slide-in-from-right-4">
                                <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400 font-bold">
                                    <Wand2 size={18} />
                                    <span>AI 분석 결과 미리보기</span>
                                </div>

                                <div className="bg-slate-50 dark:bg-[#12141a] p-4 rounded-xl mb-4 border border-slate-100 dark:border-slate-800">
                                    <p className="text-[11px] text-slate-500 uppercase font-bold mb-1">예상 실행 결과</p>
                                    <p className="text-2xl font-black text-slate-800 dark:text-white">
                                        {query.includes("합산") ? "₩ 4,500,000" : "데이터 분석 중..."}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        <p className="text-xs text-green-600 font-semibold tracking-tight">
                                            {query.includes("합산") ? "=SUMIFS 함수 적용 예정" : "적합한 함수 매칭 중..."}
                                        </p>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-indigo-500/20">
                                    엑셀 시트에 반영하기 <ArrowRight size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white/40 dark:bg-[#1c1f26]/30 p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                                <div className="p-3 bg-slate-100 dark:bg-[#252a33] rounded-full mb-3 text-slate-400">
                                    <Wand2 size={24} />
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">자연어 명령어를 입력하면<br />AI가 실시간 분석 결과를 보여줍니다.</p>
                            </div>
                        )}

                        {/* 보안 섹션 */}
                        <div className="bg-white dark:bg-[#1c1f26] p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800">
                            <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                                <Lock size={16} className="text-indigo-500" /> 데이터 보안 시스템
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="shrink-0 p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                        <ShieldCheck size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold mb-0.5">로컬 전용 샌드박스</p>
                                        <p className="text-[10px] text-slate-500">모든 계산은 귀하의 브라우저 램 내에서만 수행됩니다.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="shrink-0 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                        <Lock size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold mb-0.5">개인정보 비식별화</p>
                                        <p className="text-[10px] text-slate-500">이름, 부서 등 식별값은 AI 엔진 전송 전 토큰화됩니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}