import { fetchGraphQL, GET_PROJECTS } from "@/lib/queries";
import ProjectDetail from "@/components/ProjectDetail";
import { draftMode } from "next/headers";

//  Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { projectId } = await params;

  const { isEnabled } = await draftMode();
  const status = isEnabled ? "DRAFT" : "PUBLISHED";

  const projectsData = await fetchGraphQL(GET_PROJECTS, { status });
  const project = projectsData?.projects?.find(p => p.documentId === projectId);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: project.name,
    description: project.description || `Details and tasks for project ${project.name}.`,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { projectId } =await params;

  const { isEnabled } = await draftMode();
  const status = isEnabled ? "DRAFT" : "PUBLISHED";

  const projectsData = await fetchGraphQL(GET_PROJECTS, { status });
  const project = projectsData?.projects?.find(p => p.documentId === projectId);

  if (!project)
    return (
      <p className="p-6 text-red-500 text-center text-lg">
        Project not found — might be draft or deleted.
      </p>
    );

  return <ProjectDetail project={project} />;
}
