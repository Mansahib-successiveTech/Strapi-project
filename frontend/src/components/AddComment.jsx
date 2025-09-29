"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { jwtDecode } from "jwt-decode"; 
import { CREATE_COMMENT } from "@/lib/mutations";

export default function AddComment({ taskId, onCommentAdded,refetchProjects }) {
  const [content, setContent] = useState("");
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);

  const getLoggedInUserId = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("strapi_jwt") : null;
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const userId = await getLoggedInUserId();
    if (!userId) {
      alert("You must be logged in to add a comment");
      return;
    }

    try {
      const { data } = await createComment({
        variables: {
          data: {
            content,
            task: taskId,
            user: userId,
          },
        },
      });

      if (onCommentAdded) onCommentAdded(data.createComment);
      if (refetchProjects) await refetchProjects();
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <textarea
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Posting..." : "Add Comment"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </form>
  );
}
