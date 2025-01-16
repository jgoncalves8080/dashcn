import React from 'react'

interface OverviewCardProps {
  title: string
  count: number
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ title, count }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </div>
  )
}
