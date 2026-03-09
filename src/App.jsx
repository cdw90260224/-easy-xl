import { useState, useEffect } from 'react'
import Header from './components/Header'
import GlobalSearchBar from './components/GlobalSearchBar'
import AnalysisPreview from './components/AnalysisPreview'
import DataGrid from './components/DataGrid'
import { dummyData } from './data/dummyData'

function App() {
  const [theme, setTheme] = useState('light')
  const [searchQuery, setSearchQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  // Theme Toggle Logic
  useEffect(() => {
    // Check system preference or localStorage on load
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Handle Search Output
  const handleSearch = (query) => {
    setSearchQuery(query)
    // Simulate AI processing
    if (query.trim() === '') {
      setAnalysisResult(null)
      return
    }

    // Simple simulated logic
    setIsProcessing(true)
    setTimeout(() => {
      // Mock logic: if querying sum
      if (query.includes('합계') || query.includes('총')) {
        setAnalysisResult({
          formula: "=SUM(D2:D100)",
          explanation: "선택된 데이터의 총합을 계산합니다.",
          estimatedValue: "₩" + dummyData.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()
        })
      } else if (query.includes('평균')) {
        setAnalysisResult({
          formula: "=AVERAGE(D2:D100)",
          explanation: "선택된 데이터의 평균 금액을 계산합니다.",
          estimatedValue: "₩" + Math.round(dummyData.reduce((acc, curr) => acc + curr.amount, 0) / dummyData.length).toLocaleString()
        })
      } else {
        // default text filter mock
        setAnalysisResult({
          formula: `=FILTER(A:D, REGEXMATCH(A:A, "${query}"))`,
          explanation: `이름이나 내용에 '${query}'가 포함된 항목을 필터링합니다.`,
          estimatedValue: "-"
        })
      }
      setIsProcessing(false)
    }, 800)
  }

  const handleSyncToSheets = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert('구글 시트에 성공적으로 반영되었습니다!')
    }, 1500)
  }

  // Filter Data
  const filteredData = dummyData.filter(item => {
    if (!searchQuery) return true
    return item.name.includes(searchQuery) || item.department.includes(searchQuery) || item.role.includes(searchQuery)
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a1a1a] text-slate-800 dark:text-[#e5e5e5] transition-colors duration-200">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section & Search */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">무엇을 도와드릴까요?</h1>
          <GlobalSearchBar onSearch={handleSearch} searchQuery={searchQuery} />
        </div>

        {/* AI Analysis Preview */}
        {searchQuery && (
          <AnalysisPreview
            result={analysisResult}
            isProcessing={isProcessing}
            onSync={handleSyncToSheets}
          />
        )}

        {/* Data Grid */}
        <DataGrid data={filteredData} searchQuery={searchQuery} />
      </main>
    </div>
  )
}

export default App
