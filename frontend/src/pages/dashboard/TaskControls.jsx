import { Search, Filter, ChevronDown, Plus } from "lucide-react"

const TaskControls = ({ searchTerm, setSearchTerm, showFilters, setShowFilters, handleAddTask }) => (
  <div className="flex flex-col lg:flex-row gap-4">
    {/* Search */}
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
      />
    </div>
    {/* Filter Toggle */}
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="flex items-center space-x-2 cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <Filter className="h-4 w-4" />
      <span>Filters</span>
      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
    </button>
    {/* Add Task Button */}
    <button
      onClick={handleAddTask}
      className="flex items-center cursor-pointer space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Plus className="h-4 w-4" />
      <span>Add Task</span>
    </button>
  </div>
)

export default TaskControls 