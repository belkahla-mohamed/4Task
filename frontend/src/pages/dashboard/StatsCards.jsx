import { Circle, CheckCircle, PlayCircle, Clock } from "lucide-react"

const StatsCards = ({ stats }) => {
  const cards = [
    {
      label: "Total Tasks",
      value: stats.total,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      icon: Circle,
    },
    {
      label: "Completed",
      value: stats.completed,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      icon: CheckCircle,
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      icon: PlayCircle,
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      icon: Clock,
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards 