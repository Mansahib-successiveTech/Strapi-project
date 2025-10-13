import { TaskList } from "@/components/TaskList";
import Image from "next/image";

export default function ProjectDetail({ project }) {
  if (!project) return <p className="p-6 text-red-500">Project not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {project.thumbnail?.url && (
        <Image
          src={`http://localhost:1337${project.thumbnail.url}`}
          alt={project.thumbnail.alternativeText || project.name}
          width={800}
          height={400}
          className="w-full h-60 object-cover rounded-md mb-4"
          priority
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-700 mb-4">{project.description}</p>

      <h2 className="text-xl font-semibold mb-2">Tasks</h2>
      {project.tasks?.length > 0 ? (
        <TaskList tasks={project.tasks} />
      ) : (
        <p className="text-gray-400 text-sm">No tasks for this project.</p>
      )}
    </div>
  );
}
