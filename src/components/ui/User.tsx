import { Button } from "./button";

interface Todo {
  id: number;
  label: string;
  is_done: boolean;
}

interface UserHola {
  id: number;
  name: string;
  todos: Todo[];
}

type UserProps = {
  user: UserHola;
  deleteUser: (userName: string) => void;
  setSelectedUser: (user: UserHola) => void;
};

const User: React.FC<UserProps> = ({ user, deleteUser, setSelectedUser }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-sm mt-5 p-4 border rounded-md shadow-md gap-5">
      <Button
        className="flex-grow-2 w-full"
        onClick={() => setSelectedUser(user)}
      >
        {user.name}
      </Button>
      <div className="flex-grow flex justify-end">
        <Button onClick={() => deleteUser(user.name)}>❌</Button>
      </div>
    </div>
  );
};

export default User;
