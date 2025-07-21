"use client"
import { useState, useEffect, useRef } from "react"
import { BotMessageSquare, Send, Bot, Minimize2 } from "lucide-react"
import DashboardHeader from "./dashboard/DashboardHeader"
import StatsCards from "./dashboard/StatsCards"
import TaskControls from "./dashboard/TaskControls"
import TaskFilters from "./dashboard/TaskFilters"
import TaskGrid from "./dashboard/TaskGrid"
import EmptyState from "./dashboard/EmptyState"
import LoadingState from "./dashboard/LoadingState"
import TaskModal from "./dashboard/TaskModal"

// --- Strapi API utility functions ---
const STRAPI_URL = "https://necessary-laughter-8861a20860.strapiapp.com"

async function fetchTasks() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/tasks?populate=category`, { cache: "no-store" })
    const data = await res.json()
    console.log("Tasks API response:", data)
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((item) => ({
        id: item.id,
        documentId: item.documentId || "undefined",
        title: item.attributes?.title || item.title || "Untitled Task",
        description: item.attributes?.description || item.description || "",
        dueDate: item.attributes?.dueDate || item.dueDate || "",
        status: item.attributes?.statusTask || item.statusTask || "pending",
        category: item.attributes?.category?.data?.id || item.category?.id || null,
        categoryName:
          item.attributes?.category?.data?.attributes?.name ||
          item.attributes?.category?.data?.name ||
          item.category?.name ||
          "",
        priority: item.attributes?.priority || item.priority || "medium",
        syncStatus: item.attributes?.isSynced ? "synced" : "pending",
        createdAt: item.attributes?.createdAt || item.createdAt || new Date().toISOString(),
      }))
    } else {
      console.warn("Unexpected tasks response structure:", data)
      return []
    }
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return []
  }
}

async function fetchCategories() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/categories`)
    const data = await res.json()
    console.log("Categories API response:", data)
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((item) => ({
        id: item.id,
        name: item.name,
      }))
    } else {
      console.warn("Unexpected categories response structure:", data)
      return []
    }
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

async function addTaskToStrapi(task) {
  const res = await fetch(`${STRAPI_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        statusTask: task.status,
        priority: task.priority,
        category: task.category,
        isSynced: true,
      },
    }),
  })
  const data = await res.json()
  return data.data
}

async function updateTaskInStrapi(id, task) {
  const res = await fetch(`${STRAPI_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        statusTask: task.status,
        priority: task.priority,
        category: task.category,
        isSynced: true,
      },
    }),
  })
  const data = await res.json()
  return data.data
}

async function deleteTaskFromStrapi(id) {
  await fetch(`${STRAPI_URL}/api/tasks/${id}`, { method: "DELETE" })
}

// Helper to extract userId from JWT
function getUserIdFromToken() {
  const token = localStorage.getItem("authToken")
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.id || payload.sub || null
  } catch {
    return null
  }
}

// AI Chat Component
function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([{ from: "ai", text: "Hello! How can I help you with your tasks today?" }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Fetch chat history when opened
  useEffect(() => {
    async function fetchHistory() {
      const userId = getUserIdFromToken()
      if (!userId || !isOpen) return
      setHistoryLoading(true)
      try {
        const res = await fetch(`https://ai-chatbot-dusky-tau.vercel.app/api/chat?userId=${userId}`)
        const data = await res.json()
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages)
        } else {
          setMessages([{ from: "ai", text: "Hello! How can I help you with your tasks today?" }])
        }
      } catch {
        setMessages([{ from: "ai", text: "Hello! How can I help you with your tasks today?" }])
      } finally {
        setHistoryLoading(false)
      }
    }
    if (isOpen) fetchHistory()
    // eslint-disable-next-line
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading, historyLoading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { from: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    setMessages((prev) => [...prev, { from: "ai", text: "•••", typing: true }])

    try {
      const token = localStorage.getItem("authToken")
      const userId = getUserIdFromToken()

      if (!userId) {
        setMessages((prev) => [...prev.slice(0, -1), { from: "ai", text: "You must be logged in to chat." }])
        setLoading(false)
        return
      }

      const res = await fetch("https://ai-chatbot-dusky-tau.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, question: userMessage.text }),
      })

      const data = await res.json()
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "ai", text: data.answer || "Sorry, I did not understand that." },
      ])
    } catch (err) {
      setMessages((prev) => [...prev.slice(0, -1), { from: "ai", text: "Error: Unable to connect to AI server." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-24 right-0 sm:right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 animate-in">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-3 bg-gray-50 dark:bg-gray-900/50 scrollbar-hide" style={{ overflowY: 'auto' }}>
        {historyLoading ? (
          <div className="flex justify-center items-center h-full text-gray-400 text-sm">Loading chat history...</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line break-words ${
                  msg.from === "user"
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md shadow-sm border border-gray-200 dark:border-gray-600"
                }`}
              >
                {msg.typing ? (
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || historyLoading}
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 rounded-xl cursor-pointer bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !input.trim() || historyLoading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Fetch tasks and categories from Strapi
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [tasksData, categoriesData] = await Promise.all([fetchTasks(), fetchCategories()])
        setTasks(tasksData)
        setCategories(categoriesData)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Filter tasks
  useEffect(() => {
    let filtered = tasks
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description || "").toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }
    if (categoryFilter !== "all") {
      filtered = filtered.filter((task) => String(task.category) === String(categoryFilter))
    }
    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter)
    }
    setFilteredTasks(filtered)
  }, [tasks, searchTerm, statusFilter, categoryFilter, priorityFilter])

  const handleAddTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSaveTask = async (taskData) => {
    setLoading(true)
    try {
      if (editingTask) {
        await updateTaskInStrapi(editingTask.documentId, taskData)
      } else {
        await addTaskToStrapi(taskData)
      }
      const updatedTasks = await fetchTasks()
      setTasks(updatedTasks)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return
    setLoading(true)
    try {
      await deleteTaskFromStrapi(taskId)
      const updatedTasks = await fetchTasks()
      setTasks(updatedTasks)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (taskId, currentStatus) => {
    const statusOrder = ["pending", "in_progress", "done"]
    const currentIndex = statusOrder.indexOf(currentStatus)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: nextStatus, syncStatus: "pending" } : task)))
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === "done").length
    const inProgress = tasks.filter((task) => task.status === "in_progress").length
    const pending = tasks.filter((task) => task.status === "pending").length
    return { total, completed, inProgress, pending }
  }

  const stats = getTaskStats()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <DashboardHeader isOnline={isOnline} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <TaskControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            handleAddTask={handleAddTask}
          />

          {/* Filters */}
          {showFilters && (
            <TaskFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              categories={categories}
            />
          )}
        </div>

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Tasks Grid */}
        {!loading && filteredTasks.length > 0 && (
          <TaskGrid
            filteredTasks={filteredTasks}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleStatusChange={handleStatusChange}
          />
        )}

        {/* Empty State */}
        {!loading && filteredTasks.length === 0 && (
          <EmptyState
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            priorityFilter={priorityFilter}
            handleAddTask={handleAddTask}
          />
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
        categories={categories}
      />

      {/* AI Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 group"
      >
        <BotMessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>

      {/* AI Chat Component */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
        /* Hide scrollbars for chat messages area */
        .scrollbar-hide {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Webkit */
        }
      `}</style>
    </div>
  )
}
