'use client'

import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/presentation/components/ui/select'
import { Textarea } from '@/presentation/components/ui/textarea'
import { createProject } from '@/service/api'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface CreateProjectModalProps {
  onClose: () => void
  onSuccess: (project: any) => void
}

interface FormValues {
  name: string
  startDate: string
  endDate: string
  description: string
  responsible: string
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onSuccess }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      const newProject = await createProject(data)
      onSuccess(newProject)
      toast.success(t('createProject.projectCreatedSuccess'), {
        position: 'top-right',
        autoClose: 2000
      })
      onClose()
    } catch (error) {
      toast.error(t('createProject.projectCreateError'), {
        position: 'top-right',
        autoClose: 2000
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('createProject.title')}</DialogTitle>
          <DialogDescription>{t('createProject.description')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">{t('createProject.nameLabel')}</Label>
            <Input id="name" {...register('name', { required: t('createProject.nameRequired') })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="startDate">{t('createProject.startDateLabel')}</Label>
            <Input
              id="startDate"
              type="date"
              {...register('startDate', { required: t('createProject.startDateRequired') })}
            />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>
          <div>
            <Label htmlFor="endDate">{t('createProject.endDateLabel')}</Label>
            <Input
              id="endDate"
              type="date"
              {...register('endDate', { required: t('createProject.endDateRequired') })}
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">{t('createProject.descriptionLabel')}</Label>
            <Textarea
              id="description"
              {...register('description', { required: t('createProject.descriptionRequired') })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="responsible">{t('createProject.responsibleLabel')}</Label>
            <Select onValueChange={(value) => setValue('responsible', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('createProject.responsiblePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="João">{t('createProject.joao')}</SelectItem>
                <SelectItem value="Maria">{t('createProject.maria')}</SelectItem>
                <SelectItem value="Carlos">{t('createProject.carlos')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.responsible && (
              <p className="text-red-500 text-sm">{errors.responsible.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.back')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('common.loading') : t('createProject.save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
