"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT } from "@/lib/mutations";
import { useRouter } from "next/navigation";

export default function AddProjectForm() {
  const router= useRouter();
  const [createProject] = useMutation(CREATE_PROJECT);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // Update form state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form and create project
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({
        variables: { data: projectData, status: "PUBLISHED" }, //maybe make this save so admin backend can publish
      });
      setProjectData({ name: "", description: "", startDate: "", endDate: "" });
      alert("Project created successfully!");
      router.push("/");
      
    } catch (error) {
      console.log("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={projectData.startDate}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
          />
          <input
            type="date"
            name="endDate"
            value={projectData.endDate}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Save Project
        </button>
      </form>
    </div>
  );
}
