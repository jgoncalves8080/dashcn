'use client'

import { Task } from '@/models/Task/Task'
import { CheckCircle, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface TaskListProps {
  tasks: Task[]
  onRemoveTask: (taskId: number) => void
  onCompleteTask: (taskId: number) => void
}

export const TaskList = ({ tasks, onRemoveTask, onCompleteTask }: TaskListProps) => {
  const t = useTranslations() 

  const handleCompleteToggle = (taskId: number) => {
    if (onCompleteTask) onCompleteTask(taskId)
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">{t('tasks.associatedTasks')}</h2>{' '}
   
      {tasks.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 rounded-lg border ${
                task.isCompleted
                  ? 'bg-green-100 border-green-400 text-green-800 dark:bg-green-200'
                  : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'
              }`}>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCompleteToggle(task.id)}
                  className={`p-2 rounded-full ${
                    task.isCompleted ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  <CheckCircle size={20} />
                </button>
                <span
                  className={`${
                    task.isCompleted
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-800 dark:text-gray-100'
                  }`}>
                  {task.name}
                </span>
              </div>
              <button
                onClick={() => onRemoveTask(task.id)}
                className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
          {t('tasks.noTasks')} 
        </div>
      )}
    </div>
  )
}
