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
  MoreVertical,
} from "lucide-react"

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Finish the quarterly project proposal for the marketing team",
    dueDate: "2024-01-15",
    status: "pending",
    category: "Work",
    priority: "high",
    syncStatus: "synced",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Get milk, bread, eggs, and vegetables for the week",
    dueDate: "2024-01-12",
    status: "in-progress",
    category: "Personal",
    priority: "medium",
    syncStatus: "pending",
    createdAt: "2024-01-09",
  },
  {
    id: 3,
    title: "Review code changes",
    description: "Review pull requests from the development team",
    dueDate: "2024-01-11",
    status: "done",
    category: "Work",
    priority: "high",
    syncStatus: "synced",
    createdAt: "2024-01-08",
  },
]

// Floating background elements
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-5 animate-pulse"
        style={{ backgroundColor: "#1E90FF" }}
      />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-5 animate-bounce-slow"
        style={{ backgroundColor: "#FFA500" }}
      />
      <div
        className="absolute top-1/2 right-10 w-16 h-16 rounded-full opacity-5 animate-ping"
        style={{ backgroundColor: "#63B3ED" }}
      />
    </div>
  )
}

// Task Card Component
const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle className="h-5 w-5" style={{ color: "#4ADE80" }} />
      case "in-progress":
        return <PlayCircle className="h-5 w-5" style={{ color: "#FFA500" }} />
      default:
        return <Circle className="h-5 w-5" style={{ color: "#B0B0B0" }} />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF6B6B"
      case "medium":
        return "#FFA500"
      case "low":
        return "#4ADE80"
      default:
        return "#B0B0B0"
    }
  }

  const getSyncIcon = (syncStatus) => {
    return syncStatus === "synced" ? (
      <Wifi className="h-4 w-4" style={{ color: "#4ADE80" }} />
    ) : (
      <WifiOff className="h-4 w-4" style={{ color: "#FFA500" }} />
    )
  }

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
        isHovered ? "shadow-2xl" : "shadow-lg"
      }`}
      style={{
        backgroundColor: "#1E1E1E",
        borderColor: isHovered ? "#1E90FF" : "rgba(255, 255, 255, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onStatusChange(task.id, task.status)}
            className="transition-transform duration-200 hover:scale-110"
          >
            {getStatusIcon(task.status)}
          </button>
          <div>
            <h3
              className={`font-semibold text-lg ${task.status === "done" ? "line-through opacity-60" : ""}`}
              style={{ color: "#E0E0E0" }}
            >
              {task.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${getPriorityColor(task.priority)}20`,
                  color: getPriorityColor(task.priority),
                }}
              >
                {task.priority}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "#1E90FF20",
                  color: "#1E90FF",
                }}
              >
                {task.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {getSyncIcon(task.syncStatus)}
          <div className="relative">
            <button className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <MoreVertical className="h-4 w-4" style={{ color: "#B0B0B0" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 line-clamp-2" style={{ color: "#B0B0B0" }}>
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs" style={{ color: "#B0B0B0" }}>
          <Calendar className="h-4 w-4" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: "#1E90FF20", color: "#1E90FF" }}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: "#FF6B6B20", color: "#FF6B6B" }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Add/Edit Task Modal
const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    category: "Personal",
    priority: "medium",
  })

  useEffect(() => {
    if (task) {
      setFormData(task)
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
        category: "Personal",
        priority: "medium",
      })
    }
  }, [task, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md mx-4 p-6 rounded-3xl shadow-2xl border transform animate-modal-in"
        style={{
          backgroundColor: "#1E1E1E",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#E0E0E0" }}>
          {task ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B0B0B0" }}>
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "#121212",
                borderColor: "#404040",
                color: "#E0E0E0",
              }}
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B0B0B0" }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none resize-none"
              style={{
                backgroundColor: "#121212",
                borderColor: "#404040",
                color: "#E0E0E0",
              }}
              placeholder="Enter task description"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B0B0B0" }}>
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "#121212",
                borderColor: "#404040",
                color: "#E0E0E0",
              }}
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B0B0B0" }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
                style={{
                  backgroundColor: "#121212",
                  borderColor: "#404040",
                  color: "#E0E0E0",
                }}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B0B0B0" }}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
                style={{
                  backgroundColor: "#121212",
                  borderColor: "#404040",
                  color: "#E0E0E0",
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Status (only for edit) */}
          {task && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B0B0B0" }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
                style={{
                  backgroundColor: "#121212",
                  borderColor: "#404040",
                  color: "#E0E0E0",
                }}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "#404040",
                color: "#E0E0E0",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "#1E90FF",
                color: "#FFFFFF",
              }}
            >
              {task ? "Update" : "Add"} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filteredTasks, setFilteredTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

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
          task.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((task) => task.category === categoryFilter)
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

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...taskData, id: editingTask.id, syncStatus: "pending" } : task,
        ),
      )
    } else {
      // Add new task
      const newTask = {
        ...taskData,
        id: Date.now(),
        syncStatus: "pending",
        createdAt: new Date().toISOString(),
      }
      setTasks([...tasks, newTask])
    }
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleStatusChange = (taskId, currentStatus) => {
    const statusOrder = ["pending", "in-progress", "done"]
    const currentIndex = statusOrder.indexOf(currentStatus)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]

    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: nextStatus, syncStatus: "pending" } : task)))
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === "done").length
    const inProgress = tasks.filter((task) => task.status === "in-progress").length
    const pending = tasks.filter((task) => task.status === "pending").length

    return { total, completed, inProgress, pending }
  }

  const stats = getTaskStats()

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
      <FloatingElements />

      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-lg border-b"
        style={{
          backgroundColor: "rgba(18, 18, 18, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl" style={{ backgroundColor: "#1E90FF" }}>
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{ color: "#E0E0E0" }}>
                    4Task Dashboard
                  </h1>
                  <div className="flex items-center space-x-2">
                    {isOnline ? (
                      <Wifi className="h-4 w-4" style={{ color: "#4ADE80" }} />
                    ) : (
                      <WifiOff className="h-4 w-4" style={{ color: "#FFA500" }} />
                    )}
                    <span className="text-xs" style={{ color: "#B0B0B0" }}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200">
                <Settings className="h-5 w-5" style={{ color: "#B0B0B0" }} />
              </button>
              <button className="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200">
                <User className="h-5 w-5" style={{ color: "#B0B0B0" }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Tasks", value: stats.total, color: "#1E90FF", icon: Circle },
            { label: "Completed", value: stats.completed, color: "#4ADE80", icon: CheckCircle },
            { label: "In Progress", value: stats.inProgress, color: "#FFA500", icon: PlayCircle },
            { label: "Pending", value: stats.pending, color: "#B0B0B0", icon: Clock },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: "#B0B0B0" }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: "#E0E0E0" }}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
              style={{ color: "#B0B0B0" }}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "#404040",
                color: "#E0E0E0",
              }}
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "#404040",
                color: "#E0E0E0",
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "#404040",
                color: "#E0E0E0",
              }}
            >
              <option value="all">All Categories</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "#404040",
                color: "#E0E0E0",
              }}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Add Task Button */}
          <button
            onClick={handleAddTask}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "#1E90FF",
              color: "#FFFFFF",
            }}
          >
            <Plus className="h-5 w-5" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <TaskCard
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 mx-auto mb-4" style={{ color: "#B0B0B0" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#E0E0E0" }}>
              No tasks found
            </h3>
            <p className="mb-6" style={{ color: "#B0B0B0" }}>
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your filters or search terms"
                : "Get started by adding your first task"}
            </p>
            <button
              onClick={handleAddTask}
              className="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "#1E90FF",
                color: "#FFFFFF",
              }}
            >
              Add Your First Task
            </button>
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
