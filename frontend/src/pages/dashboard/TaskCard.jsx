import { useState } from "react"
import { CheckCircle, PlayCircle, Circle, Wifi, WifiOff, Edit3, Trash2, Calendar, GripVertical } from "lucide-react"

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, dragHandleProps }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <PlayCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const getSyncIcon = (syncStatus) => {
    return syncStatus === "synced" ? (
      <Wifi className="h-4 w-4 text-green-500" />
    ) : (
      <WifiOff className="h-4 w-4 text-yellow-500" />
    )
  }

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 ${
        task.status === "done" ? "opacity-75" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onStatusChange(task.id, task.status)}
            className="mt-1 transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            {getStatusIcon(task.status)}
          </button>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-gray-900 dark:text-gray-100 mb-2 ${
                task.status === "done" ? "line-through opacity-60" : ""
              }`}
            >
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              {task.categoryName && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-medium">
                  {task.categoryName}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getSyncIcon(task.syncStatus)}
          {/* Drag handle */}
          <span {...(dragHandleProps || {})} className="cursor-grab p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span>
        </div>
        <div
          className={`flex items-center space-x-1 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-900/20 transition-colors duration-200 "
            title="Edit task"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
            className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard 