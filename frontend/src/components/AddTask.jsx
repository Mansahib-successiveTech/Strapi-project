"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import { GET_PROJECTS, GET_USERS } from "@/lib/queries";
import { CREATE_TASK } from "@/lib/mutations";

export default function AddTask() {
  const searchParams = useSearchParams();
  const projectIdFromUrl = searchParams.get("projectId");

  const { data: projectsData, loading: loadingProjects,refetch } =useQuery(GET_PROJECTS, {
  fetchPolicy: "network-only",
});
    

  const { data: usersData, loading: loadingUsers } = useQuery(GET_USERS);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    project: "",
    assignedTo: "",
    TaskStatus: "pending",
  });

  const [createTask, { loading: creating, error, data }] = useMutation(CREATE_TASK);

  // Pre-fill project if param is present
  useEffect(() => {
    if (projectIdFromUrl) {
      setTaskForm((prev) => ({ ...prev, project: projectIdFromUrl }));
    }
  }, [projectIdFromUrl]);

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        variables: {
          data: {
            title: taskForm.title,
            description: taskForm.description,
            TaskStatus: taskForm.TaskStatus,
            dueDate: taskForm.dueDate,
            project: taskForm.project,
            assignedTo: taskForm.assignedTo,
          },
          //status: "PUBLISHED"  maybe make this save so admin backend can publish
        },
      });
      if (refetch) await refetch();
      alert("Task created successfully!");
      setTaskForm({
        title: "",
        description: "",
        dueDate: "",
        project: projectIdFromUrl || "",
        assignedTo: "",
        TaskStatus: "pending",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  if (loadingProjects || loadingUsers) return <p>Loading...</p>;

  return (
    <div className="max-w-md mt-20 mx-auto p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskForm.title}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={taskForm.description}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={taskForm.dueDate}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />

        {/* Select Project */}
        <select
          name="project"
          value={taskForm.project}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
          disabled={!!projectIdFromUrl} // if coming from existing project
        >
          <option value="">Select Project</option>
          {projectsData.projects.map((p) => (
            <option key={p.documentId} value={p.documentId}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Select User */}
        <select
          name="assignedTo"
          value={taskForm.assignedTo}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        >
          <option value="">Assign To</option>
          {usersData.usersPermissionsUsers.map((u) => (
            <option key={u.documentId} value={u.documentId}>
              {u.username}
            </option>
          ))}
        </select>

        {/* Task Status */}
        <select
          name="TaskStatus"
          value={taskForm.TaskStatus}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
          disabled={creating}
        >
          {creating ? "Saving..." : "Save Task"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error.message}</p>}
      {data && (
        <p className="text-green-500 mt-2">
          Task "{data.createTask.title}" created successfully!
        </p>
      )}
    </div>
  );
}
