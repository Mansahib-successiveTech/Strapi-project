import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_TASK } from "@/lib/mutations";
import { GET_PROJECTS } from "@/lib/queries";

function TaskItem({ task }) {
  const [taskStatus, setTaskStatus] = useState(task.TaskStatus);

  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK,{
    refetchQueries:[{query:GET_PROJECTS}],
     awaitRefetchQueries: true,
  }
  );

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

      {/* Update Status Dropdown */}
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
    </li>
  );
}

export default TaskItem;
