'use client'

import { Task } from '@/models/Task/Task'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/presentation/components/ui/select'
import { useTranslations } from 'next-intl'

interface TaskSelectorProps {
  tasks: Task[]
  onAddTask: (taskId: number) => void
}

export const TaskSelector = ({ tasks, onAddTask }: TaskSelectorProps) => {
  const t = useTranslations()

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">{t('tasks.associateNewTask')}</h2>
      <Select onValueChange={(value) => onAddTask(Number(value))}>
        <SelectTrigger className="w-full mt-4">
          <SelectValue placeholder={t('tasks.selectTask')} />
        </SelectTrigger>
        <SelectContent>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <SelectItem key={task.id} value={task.id.toString()}>
                {task.name}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500 dark:text-gray-400">
              {t('tasks.noTasksAvailable')}
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
