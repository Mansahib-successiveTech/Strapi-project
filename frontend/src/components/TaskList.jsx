import { TaskItem } from "./TaskItem";

// Task List component
export function TaskList({ tasks,refetchProjects }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task,id) => (
        <TaskItem key={id} task={task} refetchProjects={refetchProjects} />
      ))}
    </ul>
  );
}
