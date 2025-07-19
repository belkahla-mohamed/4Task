"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  PlayCircle,
  Edit3,
  Trash2,
  AlertCircle,
  Wifi,
  WifiOff,
  User,
  Settings,
  Filter,
  X,
  ChevronDown,
} from "lucide-react"

import DashboardHeader from "./DashboardHeader"
import StatsCards from "./StatsCards"
import TaskControls from "./TaskControls"
import TaskFilters from "./TaskFilters"
import TaskGrid from "./TaskGrid"
import EmptyState from "./EmptyState"
import LoadingState from "./LoadingState"
import TaskModal from "./TaskModal"


// --- Strapi API utility functions ---
const STRAPI_URL = "https://fresh-egg-85913f543b.strapiapp.com"

async function fetchTasks() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/tasks?populate=category`, { cache: "no-store" })
    const data = await res.json()
    console.log("Tasks API response:", data)

    if (data.data && Array.isArray(data.data)) {
      return data.data.map((item) => ({
        id: item.id,
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
        await updateTaskInStrapi(editingTask.id, taskData)
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
      `}</style>
    </div>
  )
}
