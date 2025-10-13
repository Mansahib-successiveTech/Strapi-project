
import HeroBanner from "@/components/HeroBanner";
import { GET_HERO, GET_PROJECTS, fetchGraphQL } from "../lib/queries";
import ProjectCard from "./ProjectCard";


export default async function Homepage() {
  const heroData = await fetchGraphQL(GET_HERO);
  const projectsData = await fetchGraphQL(GET_PROJECTS);
  const hero = heroData.heroBanners?.[0];

  
  return (
    <div className=" min-h-screen">
      {hero && <HeroBanner hero={hero} />}

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-dark">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.projects.map((project) => (
            <ProjectCard
              key={project.documentId} 
              project={project} 
              
            />
          ))}
        </div>
      </div>
    </div>
  );
}
