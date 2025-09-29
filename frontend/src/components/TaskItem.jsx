"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_TASK } from "@/lib/mutations";
import AddComment from "@/components/AddComment";

export function TaskItem({ task,refetchProjects }) {
  const [taskStatus, setTaskStatus] = useState(task.TaskStatus);
  const [comments, setComments] = useState(task.comments || []);

  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setTaskStatus(newStatus);

    try {
      await updateTask({
        variables: {
          documentId: task.documentId,
          data: { TaskStatus: newStatus },
        },
      });
      if (refetchProjects) await refetchProjects();
      alert("Task updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  return (
    <li className="p-3 bg-gray-100 rounded-lg border-l-4 border-blue-500">
      <p className="font-medium text-gray-800">{task.title}</p>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate || "N/A"}</p>

      {/* Dynamic Status Dropdown */}
      <label className="block mt-2 mb-1 font-medium text-gray-700">Status:</label>
      <select
        value={taskStatus}
        onChange={handleStatusChange}
        className="w-full border px-2 py-1 rounded"
        disabled={loading}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      {error && <p className="text-red-500 mt-1">{error.message}</p>}

      {/*  Comments Section */}
      {comments.length > 0 && (
        <ul className="mt-2 pl-4 space-y-1 text-gray-700 text-sm">
          {comments.map((comment, id) => (
            <li key={id}>
              <strong>{comment.user?.username || "Unknown"}:</strong> {comment.content}
            </li>
          ))}
        </ul>
      )}

      <AddComment
        taskId={task.documentId}
        refetchProjects={refetchProjects}
        onCommentAdded={(newComment) => setComments([...comments, newComment])}
      />
    </li>
  );
}
