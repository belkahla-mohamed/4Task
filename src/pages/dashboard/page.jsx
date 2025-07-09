"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  Edit,
  Trash2,
} from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { WifiStatus } from "@/components/wifi-status"
import { LanguageSwitcher } from "@/components/language-switcher"
import { TaskDialog } from "@/components/task-dialog"
import { useTaskStore } from "@/lib/task-store"
import { useTranslation } from "@/components/translation-provider"
import { format } from "date-fns"

export default function DashboardPage() {
  const { tasks, loadTasks, updateTask, deleteTask } = useTaskStore()
  const { t, isRTL } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />
      case "done":
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      case "done":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus })
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsTaskDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsTaskDialogOpen(false)
    setEditingTask(null)
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId)
    }
  }

  const categories = Array.from(new Set(tasks.map((task) => task.category).filter(Boolean)))

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "done").length,
  }

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isRTL ? "font-sans" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <div className="bg-primary p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <CheckCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">4Task</h1>
          </Link>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              onClick={() => setIsTaskDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              Add Task
            </Button>
            <WifiStatus />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground group-hover:scale-110 transition-transform duration-200">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-200">
                {stats.pending}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                {stats.inProgress}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-200">
                {stats.completed}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Filter className="h-5 w-5 text-primary" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background border-border focus:border-primary transition-colors duration-200"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background border-border focus:border-primary transition-colors duration-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-background border-border focus:border-primary transition-colors duration-200">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-background border-border focus:border-primary transition-colors duration-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setPriorityFilter("all")
                  setCategoryFilter("all")
                }}
                className="border-border hover:bg-muted transition-all duration-200 hover:scale-105"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="bg-card border-border shadow-md">
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {tasks.length === 0
                    ? "Get started by creating your first task!"
                    : "Try adjusting your filters or search terms."}
                </p>
                <Button
                  onClick={() => setIsTaskDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card
                key={task.id}
                className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 shadow-md group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                          {task.title}
                        </h3>
                        <Badge className={`${getStatusColor(task.status)} transition-all duration-200 hover:scale-105`}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">{task.status.replace("-", " ")}</span>
                        </Badge>
                        <Badge
                          className={`${getPriorityColor(task.priority)} transition-all duration-200 hover:scale-105`}
                        >
                          {task.priority.toUpperCase()}
                        </Badge>
                        {task.category && (
                          <Badge
                            variant="outline"
                            className="border-border text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            {task.category}
                          </Badge>
                        )}
                      </div>
                      {task.description && (
                        <p className="text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-200">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              task.synced ? "bg-green-500" : "bg-yellow-500"
                            } animate-pulse`}
                          />
                          <span>{task.synced ? "Synced" : "Local"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-wrap">
                      <Select value={task.status} onValueChange={(value) => handleStatusChange(task.id, value)}>
                        <SelectTrigger className="w-32 bg-background border-border focus:border-primary transition-colors duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTask(task)}
                        className="border-border hover:bg-muted transition-all duration-200 hover:scale-105"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                        className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <TaskDialog open={isTaskDialogOpen} onOpenChange={handleCloseDialog} task={editingTask} />
    </div>
  )
}
