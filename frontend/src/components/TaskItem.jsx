"use client";

export function TaskItem({ task }) {
  return (
    <li className="p-3 bg-gray-100 rounded-lg border-l-4 border-blue-500">
      <p className="font-medium text-gray-800">{task.title}</p>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <p className="text-xs text-gray-500 mt-1">
        Due: {task.dueDate || "N/A"}
      </p>

      {/*Status */}
      <p className="mt-2 font-medium text-gray-700">
        Status:{" "}
        <span className="px-2 py-1 bg-gray-200 rounded text-sm">
          {task.TaskStatus}
        </span>
      </p>

      {/* Comments Section */}
      {task.comments?.length > 0 && (
        <ul className="mt-2 pl-4 space-y-1 text-gray-700 text-sm">
          {task.comments.map((comment, id) => (
            <li key={id}>
              <strong>{comment.user?.username || "Unknown"}:</strong>{" "}
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
