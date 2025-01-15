import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { text, projectId } = body;

      const newComment = await prisma.comment.create({
        data: {
          text,
          projectId,
        },
      });

      return Response.json(newComment);
    } catch (error) {
      console.error("Error: ", error);
      return Response.json({ error: "Erro ao criar comentário" });
    }
   
}
