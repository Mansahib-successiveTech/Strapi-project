
import Link from "next/link";


export function ActionButtons({ buttons }) {
  const addProjectBtn = buttons.find((btn) => btn.link === "/addproject");
  const addTaskBtn = buttons.find((btn) => btn.link === "/addtask");

  return (
    <div className="flex gap-4 mb-6">
      {addProjectBtn && (
        <Link
          href={addProjectBtn.link}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {addProjectBtn.label}
        </Link>
      )}
      {addTaskBtn && (
        <Link
          href={addTaskBtn.link}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          {addTaskBtn.label}
        </Link>
      )}
    </div>
  );
}