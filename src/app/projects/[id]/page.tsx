import ProjectDetailsView from '@/presentation/views/ProjectsView/Details';

export type ProjectDetailsPageParams = {
  params: {
    id: string
  }
}

export default function ProjectDetailsPage({ params: { id } }: ProjectDetailsPageParams) {
  return <ProjectDetailsView projectId={id} />;
}
