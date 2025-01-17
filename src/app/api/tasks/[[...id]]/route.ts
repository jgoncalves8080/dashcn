import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();

    return Response.json(tasks);
  } catch (error) {
    console.error('Error: ', error);
    return Response.json({ error: 'Erro ao buscar tarefas' });
  }
}

export async function POST(req: Request) {
  try {
    const { name, projectId } = await req.json();

    const newTask = await prisma.task.create({
      data: {
        name,
        projectId
      }
    });

    return Response.json(newTask);
  } catch (error) {
    console.error('Error: ', error);
    return Response.json({ error: 'Erro ao criar tarefa' });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;

    await prisma.task.delete({ where: { id: Number(id) } });

    return Response.json({ status: 204 });
  } catch (error) {
    console.error('Error: ', error);
    return Response.json({ error: 'Erro ao deletar tarefa' });
  }
}
