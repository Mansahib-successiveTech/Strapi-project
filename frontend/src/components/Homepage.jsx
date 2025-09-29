"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS, GET_HERO, GET_ACTIONS } from "../lib/queries";
import HeroBanner from "@/components/HeroBanner";
import Link from "next/link";
import { ActionButtons } from "./ActionButtons";
import { TaskList } from "./TaskList";

export default function Homepage() {
  const [page, setPage] = useState(0);
  const limit = 10; // Items per page
  const [selectedProject, setSelectedProject] = useState(null);
  const [showSplash, setShowSplash] = useState(false);

  // Queries
  const { data: heroData } = useQuery(GET_HERO);
  const { data: projectsData, loading, error, refetch } = useQuery(GET_PROJECTS, {
    variables: { pagination: { start: page * limit, limit } },
    fetchPolicy: "network-only",
  });
  const { data: actionsData } = useQuery(GET_ACTIONS);

  const hero = heroData?.heroBanners?.[0];
  const buttons = actionsData?.actions?.[0]?.buttons || [];

  // Hero splash logic
  useEffect(() => {
    const hasSeenHero = localStorage.getItem("hasSeenHero");
    if (!hasSeenHero && hero) {
      setShowSplash(true);
      localStorage.setItem("hasSeenHero", "true");

      const timer = setTimeout(() => setShowSplash(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hero]);

  if (loading) return <p className="text-gray-500">Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {showSplash && hero && <HeroBanner hero={hero} />}

      <div className="max-w-4xl mx-auto p-6">
        <ActionButtons buttons={buttons} />

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.projects.map((project) => (
            <ProjectCard
              key={project.documentId}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

      {/* Pagination */}
<div className="flex justify-between items-center mt-6">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
    disabled={page === 0}
    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
  >
    Previous
  </button>

  {/* Current Page Display */}
  <span className="text-gray-700 font-medium">
    Page {page + 1}
  </span>

  <button
    onClick={() => setPage((prev) => prev + 1)}
    disabled={!projectsData?.projects?.length || projectsData.projects.length < limit}
    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
  >
    Next
  </button>
</div>


        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            refetchProjects={refetch}
          />
        )}
      </div>
    </div>
  );
}

// Project Card
function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
    >
      {project.thumbnail?.url && (
        <img
          src={`http://localhost:1337${project.thumbnail.url}`}
          alt={project.thumbnail.alternativeText || project.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h2>
      <p className="text-gray-600 truncate">{project.description}</p>
    </div>
  );
}

// Project Modal
function ProjectModal({ project, onClose, refetchProjects }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        {project.thumbnail?.url && (
          <img
            src={`http://localhost:1337${project.thumbnail.url}`}
            alt={project.thumbnail.alternativeText || project.name}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
        <p className="text-gray-700 mb-4">{project.description}</p>

        {/* Add Task */}
        {typeof window !== "undefined" && localStorage.getItem("strapi_jwt") && (
          <Link
            href={`/addtask?projectId=${project.documentId}`}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-4 inline-block"
          >
            + Add Task
          </Link>
        )}

        {/* Tasks */}
        <h3 className="text-xl font-semibold mb-2">Tasks</h3>
        {project.tasks?.length > 0 ? (
          <TaskList tasks={project.tasks} refetchProjects={refetchProjects} />
        ) : (
          <p className="text-gray-400 text-sm">No tasks for this project.</p>
        )}
      </div>
    </div>
  );
}
