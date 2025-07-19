import { AlertCircle } from "lucide-react"

const EmptyState = ({ searchTerm, statusFilter, categoryFilter, priorityFilter, handleAddTask }) => (
  <div className="text-center py-16">
    <AlertCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">No tasks found</h3>
    <p className="mb-6 text-gray-600 dark:text-gray-400">
      {searchTerm || statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all"
        ? "Try adjusting your filters or search terms"
        : "Get started by adding your first task"}
    </p>
    <button
      onClick={handleAddTask}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Add Your First Task
    </button>
  </div>
)

export default EmptyState 