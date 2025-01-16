import prisma from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const projectId = (await params).id

    const comments = await prisma.comment.findMany({
      where: { projectId: Number(projectId) }
    })

    return Response.json(comments)
  } catch (error) {
    console.error('Error: ', error)
    return Response.json({ error: 'Erro ao buscar comentários' })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { text, projectId } = body

    const newComment = await prisma.comment.create({
      data: {
        text,
        projectId: parseInt(projectId)
      }
    })

    return new Response(JSON.stringify(newComment), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error adding comment:', error)
    return new Response(JSON.stringify({ error: 'Erro ao criar comentário' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const commentId = (await params).id

    if (!commentId) {
      return new Response(JSON.stringify({ error: 'ID do comentário não fornecido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await prisma.comment.delete({
      where: { id: parseInt(commentId) }
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Erro ao deletar comentário:', error)
    return new Response(JSON.stringify({ error: 'Erro ao deletar comentário' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
