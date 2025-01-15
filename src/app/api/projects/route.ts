import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
        comments: true,
      },
    });

    return Response.json(projects);
  } catch (error) {
    console.error("Error: ", error);
    return Response.json({ error: "Erro ao buscar projetos" });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, startDate, endDate, responsible } = body;

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        responsible,
        progress: 0,
      },
    });
    return Response.json(newProject);
  } catch (error) {
    console.error("Error: ", error);
    return Response.json({ error: "Erro ao criar projeto" });
  }
}