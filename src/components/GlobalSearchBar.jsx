import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'

export default function GlobalSearchBar({ onSearch, searchQuery }) {
    const [localQuery, setLocalQuery] = useState(searchQuery || '')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(localQuery)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Search size={22} className="opacity-70" />
            </div>

            <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="예: '차도운'의 데이터 찾기, 또는 '개발팀 급여 합계'"
                className="w-full h-16 pl-14 pr-32 bg-white dark:bg-[#232323] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm hover:shadow-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-[#e5e5e5]"
            />

            <div className="absolute inset-y-0 right-2 flex items-center">
                <button
                    type="submit"
                    className="flex items-center gap-2 h-12 px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl transition-all shadow-sm shadow-indigo-500/20 active:scale-95"
                >
                    <Sparkles size={16} />
                    <span>AI 분석</span>
                </button>
            </div>
        </form>
    )
}
