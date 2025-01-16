'use client'

import { Comment } from '@/models/Comment/Comment'
import { Button } from '@/presentation/components/ui/button'
import { Textarea } from '@/presentation/components/ui/textarea'
import { addComment, deleteComment, fetchComments } from '@/service/api'
import DOMPurify from 'dompurify'
import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const CommentSection = ({ projectId }: { projectId: string }) => {
  const t = useTranslations()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingComments, setLoadingComments] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComments(projectId)
        setComments(response)
      } catch (error) {
        console.error('Erro ao buscar comentários:', error)
      } finally {
        setLoadingComments(false)
      }
    }
    fetchData()
  }, [projectId])

  const handleAddComment = async (text: string) => {
    setLoading(true)
    try {
      const sanitizedText = DOMPurify.sanitize(text)
      const newComment = await addComment(sanitizedText, projectId)
      setComments((prev) => [...prev, newComment])
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = (id: number) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center gap-4">
          <span>{t('comments.deleteConfirmation')}</span> 
          <Button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={async () => {
              try {
                await deleteComment(id)
                setComments((prev) => prev.filter((comment) => comment.id !== id))
                toast.success(t('comments.deletedSuccessfully')) 
              } catch (error) {
                toast.error(t('comments.errorDeleting'), {
                  position: 'top-right',
                  autoClose: 2000,
                })}
            }}>
            {t('comments.yes')}
          </Button>
          <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeToast}>
            {t('comments.cancel')} 
          </Button>
        </div>
      ),
      {
        position: 'top-right',
        autoClose: false,
      }
    )
  }


  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">{t('comments.addComment')}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const comment = formData.get('comment') as string
          if (comment) handleAddComment(comment)
          e.currentTarget.reset()
        }}
        className="space-y-4 mt-4">
        <Textarea
          name="comment"
          placeholder={t('comments.writeComment')}
          rows={4}
          className="w-full"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t('comments.adding') : t('comments.addComment')}
        </Button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">{t('comments.comments')}</h3>
        <div className="space-y-2 mt-4">
          {loadingComments ? (
            <div>{t('comments.loadingComments')}</div>
          ) : comments.length === 0 ? (
            <p>{t('comments.noComments')}</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <p>{comment.text}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
