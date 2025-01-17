import { Comment } from '@/models/Comment/Comment';
import { Project } from '@/models/Project/Project';
import { Task } from '@/models/Task/Task';

export const fetchProjectDetails = async (projectId: string): Promise<Project> => {
  const response = await fetch(`/api/projects/${projectId}`);
  if (!response.ok) throw new Error('Erro ao buscar detalhes do projeto');
  return response.json();
};

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch('/api/projects');
  if (!response.ok) throw new Error('Erro ao buscar detalhes do projeto');
  return response.json();
};

export const fetchProjectStatus = async () => {
  try {
    const response = await fetch('/api/projects/status');
    if (!response.ok) {
      throw new Error('Erro ao buscar status dos projetos');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados de status:', error);
    throw error;
  }
};

export const updateProjectDetails = async (
  projectId: string,
  updates: Partial<{ progress: number; status: string }>
): Promise<Project> => {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar projeto');
  }

  return response.json();
};

export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await fetch('/api/tasks');
  if (!response.ok) throw new Error('Erro ao buscar tarefas');
  return response.json();
};

export const fetchComments = async (projectId: string): Promise<Comment[]> => {
  const response = await fetch(`/api/comments/${projectId}`);
  if (!response.ok) throw new Error('Erro ao buscar comentário');
  return response.json();
};

export const addComment = async (text: string, projectId: string): Promise<Comment> => {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, projectId })
  });
  if (!response.ok) throw new Error('Erro ao adicionar comentário');
  return response.json();
};

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erro ao excluir comentário');
};

export const associateTask = async (taskId: number, projectId: string): Promise<Project> => {
  const response = await fetch(`/api/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId })
  });
  if (!response.ok) throw new Error('Erro ao associar tarefa');
  return response.json();
};

export const createProject = async (data: {
  name: string
  description: string
  startDate: string
  endDate: string
  responsible: string
}) => {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar projeto');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    throw error;
  }
};

export const removeTaskAssociation = async (
  taskId: number,
  projectId: string
): Promise<Project> => {
  const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao remover associação de tarefa');
  return response.json();
};
