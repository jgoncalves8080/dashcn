'use client'

import { CreateProjectModal } from '@/presentation/components/common/createProjectModal'
import { Button } from '@/presentation/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Progress } from '@/presentation/components/ui/progress'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProjectsView: React.FC = () => {
  const t = useTranslations() 
  const [projects, setProjects] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Erro ao buscar projetos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleModalToggle = () => setIsModalOpen(!isModalOpen)

  const navigateToDetails = (projectId: number) => {
    router.push(`/projects/${projectId}`)
  }

  const handleNewProjectSuccess = (newProject: any) => {
    setProjects((prevProjects) => [...prevProjects, newProject])
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('projects.title')}</h1> 
        <Button onClick={handleModalToggle}>{t('projects.newProject')}</Button>{' '}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton className="h-40 mb-4" />
              <Skeleton className="h-6 mb-2" />
              <Skeleton className="h-4" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <p className="text-xl font-semibold mb-4">{t('projects.noProjects')}</p>{' '}
          <p className="text-center">
            {t('projects.createNew')} 
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="shadow-md cursor-pointer"
              onClick={() => navigateToDetails(project.id)}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm font-medium mb-2 ${getStatusColor(project.status)}`}>
                  {project.status}
                </p>
                <Progress value={project.progress} />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {project.progress}% {t('projects.completed')} 
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isModalOpen && (
        <CreateProjectModal onClose={handleModalToggle} onSuccess={handleNewProjectSuccess} />
      )}
    </div>
  )
}

export default ProjectsView

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ativo':
      return 'text-green-500'
    case 'Concluído':
      return 'text-blue-500'
    case 'Atrasado':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}
