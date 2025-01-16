import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany()

    const statusCount = {
      active: 0,
      completed: 0,
      delayed: 0
    }

    projects.forEach((project) => {
      if (project.status === 'active') {
        statusCount['active']++
      } else if (project.status === 'completed') {
        statusCount['completed']++
      } else if (project.status === 'delayed') {
        statusCount['delayed']++
      }
    })

    const statusData = [
      { title: 'Projetos Ativos', count: statusCount['active'], color: '#34d399' },
      { title: 'Projetos Concluídos', count: statusCount['completed'], color: '#3b82f6' },
      { title: 'Projetos Atrasados', count: statusCount['delayed'], color: '#f87171' }
    ]

    return Response.json(statusData)
  } catch (error) {
    console.error('Error: ', error)
    return Response.json({ error: 'Erro ao buscar status dos projetos' })
  }
}
