import { Button } from "./button";

interface Todo {
  label: string;
  is_done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: () => void;
  onDelete: () => void;
}

const TodoItem = ({ todo, onToggleComplete, onDelete }: TodoItemProps) => {
  return (
    <li
      className="flex items-center justify-between w-full max-w-sm mt-5 p-4 border rounded-md shadow-md gap-5"
      style={{ backgroundColor: todo.is_done ? "#32de84" : "#FEBE10" }}
    >
      {todo.label}
      <Button onClick={onToggleComplete}>
        {todo.is_done ? "🔙 Undo" : "☑️ Done"}
      </Button>
      <Button onClick={onDelete}>❌ Delete</Button>
    </li>
  );
};

export default TodoItem;
