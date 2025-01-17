'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Project } from '@/models/Project/Project';
import { Task } from '@/models/Task/Task';
import { fetchProjectDetails, updateProjectDetails } from '@/service/api';

import { CommentSection } from './Comment';
import ProjectDetailsSkeleton from './Loading';
import { TaskList } from './TaskList';
import { TaskSelector } from './TaskSelector';

export default function ProjectDetailsView({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [associatedTasks, setAssociatedTasks] = useState<Task[]>([]);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([
    { id: 1, projectId: 1, name: 'Design da Interface', isCompleted: false },
    { id: 2, projectId: 2, name: 'Desenvolvimento Front-end', isCompleted: false },
    { id: 3, projectId: 1, name: 'Implementação da API', isCompleted: false }
  ]);

  const [editProgress, setEditProgress] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectDetails = await fetchProjectDetails(projectId);
        setProject(projectDetails);
        setAssociatedTasks(projectDetails.tasks);
        setEditProgress(projectDetails.progress);
        setEditStatus(projectDetails.status);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  const handleAddTask = (taskId: number) => {
    const task = availableTasks.find((task) => task.id === taskId);
    if (task) {
      setAssociatedTasks([...associatedTasks, task]);
      setAvailableTasks(availableTasks.filter((t) => t.id !== taskId));
    }
  };

  const handleRemoveTask = (taskId: number) => {
    const task = associatedTasks.find((task) => task.id === taskId);
    if (task) {
      setAvailableTasks([...availableTasks, task]);
      setAssociatedTasks(associatedTasks.filter((t) => t.id !== taskId));
    }
  };

  const handleCompleteTask = (taskId: number) => {
    setAssociatedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProject = await updateProjectDetails(projectId, {
        progress: editProgress,
        status: editStatus
      });
      setProject(updatedProject);
      toast.success('Informações salvas com sucesso!', {
        position: 'top-right',
        autoClose: 2000
      });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao salvar alterações. Tente novamente.', {
        position: 'top-right',
        autoClose: 2000
      });
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setEditProgress(value);
  };

  if (loading) return <ProjectDetailsSkeleton />;

  if (!project) return <div>Projeto não encontrado.</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <button
          onClick={() => router.push('/projects')}
          className="text-blue-500 hover:text-blue-700 bg-transparent border-none cursor-pointer"
        >
          Voltar para Projetos
        </button>
      </div>

      <p className="mt-2 text-gray-500">{project.description}</p>

      <div className="mt-4">
        <label className="block font-semibold">Progresso:</label>
        <input
          type="number"
          value={editProgress}
          onChange={handleProgressChange}
          className="w-full border rounded p-2 mt-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Status:</label>
        <select
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
          className="w-full border rounded p-2 mt-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="active">Ativo</option>
          <option value="delayed">Atrasado</option>
          <option value="completed">Concluído</option>
        </select>
      </div>

      <button
        onClick={handleSaveChanges}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Salvar Alterações
      </button>

      <TaskList
        tasks={associatedTasks}
        onRemoveTask={handleRemoveTask}
        onCompleteTask={handleCompleteTask}
      />
      <TaskSelector tasks={availableTasks} onAddTask={handleAddTask} />
      <CommentSection projectId={projectId} />
    </div>
  );
}
