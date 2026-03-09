import { Bot, CheckCircle2, Loader2, Sparkles, Send } from 'lucide-react'

export default function AnalysisPreview({ result, isProcessing, onSync }) {
    if (isProcessing) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    </div>
                </div>
                <div className="space-y-3 mt-6">
                    <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                    <div className="h-10 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                </div>
            </div>
        )
    }

    if (!result) return null;

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Bot size={24} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    AI 분석 결과
                                    <Sparkles size={16} className="text-amber-400" />
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">{result.explanation}</p>
                            </div>

                            <div className="bg-slate-50 dark:bg-[#141414] p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                                    생성된 수식
                                </div>
                                <code className="text-indigo-600 dark:text-indigo-400 font-mono text-lg font-medium">
                                    {result.formula}
                                </code>
                            </div>

                            {result.estimatedValue && result.estimatedValue !== "-" && (
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-slate-500">예측 결과값:</span>
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">{result.estimatedValue}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50/50 dark:bg-[#232323] px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                    onClick={onSync}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-offset-[#1f1f1f]"
                >
                    <Send size={16} />
                    구글 시트에 반영
                </button>
            </div>
        </div>
    )
}
