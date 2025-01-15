import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { name, projectId } = body;

      const newTask = await prisma.task.create({
        data: {
          name,
          projectId,
        },
      });

      return Response.json(newTask);
    } catch (error) {
      console.error("Error: ", error);
      return Response.json({ error: "Erro ao criar tarefa" });
    }
   
}


export async function PATCH(
  req: Request,
) {
  try {
    const body = await req.json();
    const { id, isCompleted } = body;

  const updatedTask = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { isCompleted },
  });

    return Response.json(updatedTask);
  } catch (error) {
    console.error("Error: ", error);
    return Response.json({ error: "Erro ao atualizar tarefa" });
  }
}