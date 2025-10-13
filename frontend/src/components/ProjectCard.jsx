"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProjectCard({ project }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage on client side
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("login"));
  }, []);

  return isAuthenticated ? (
    <Link href={`/projects/${project.documentId}`}>
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
        {project.thumbnail?.url && (
          <Image
            src={`http://localhost:1337${project.thumbnail.url}`}
            alt={project.thumbnail.alternativeText || project.name}
            width={400}
            height={200}
            className="w-full h-40 object-cover rounded-md mb-3"
           // priority={false} // lazy load for non-hero images
            loading="lazy"
          />
        )}
        <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
      </div>
    </Link>
  ) : (
    <div className="bg-white p-5 rounded-xl shadow cursor-not-allowed">
      {project.thumbnail?.url && (
        <Image
          src={`http://localhost:1337${project.thumbnail.url}`}
          alt={project.thumbnail.alternativeText || project.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-md mb-3"
          loading="lazy"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
      <p className="text-sm text-gray-500 mt-1">Login to view details</p>
    </div>
  );
}
