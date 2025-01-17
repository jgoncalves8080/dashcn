import prisma from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;

    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        tasks: true,
        comments: true
      }
    });

    if (!project) return Response.json({ error: 'Projeto não encontrado' });
    return Response.json(project);
  } catch (error) {
    console.error('Error: ', error);
    return Response.json({ error: 'Erro ao buscar projeto' });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json();
    const { name, description, startDate, endDate, responsible, progress, status } = body;

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        responsible,
        progress,
        status
      }
    });

    return Response.json(updatedProject);
  } catch (error) {
    console.error('Error: ', error);
    return Response.json({ error: 'Erro ao atualizar projeto' });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;

    await prisma.project.delete({ where: { id: Number(id) } });

    return Response.json({ status: 204 });
  } catch (error) {
    console.error('Error: ', error);
    return Response.json({ error: 'Erro ao deletar projeto' });
  }
}
