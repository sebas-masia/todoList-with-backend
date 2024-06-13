import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import TodoItem from "./TodoItem";
import { ModeToggle } from "./mode-toggle";
import User from "./User";

interface Todo {
  id: number;
  label: string;
  is_done: boolean;
}

interface User {
  id: number;
  name: string;
  todos: Todo[];
}

const TodoList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    fetchTodos(selectedUser?.name || "");
  }, [selectedUser]);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users?offset=0&limit=100",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUser = async (userName: string) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${userName}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setUsers([...users, data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (userName: string) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
        method: "DELETE",
      });
      await getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const fetchTodos = async (userName: string) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${userName}`
      );
      const data = await response.json();
      if (data.todos) {
        setTodos(data.todos);
      }
      return;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const createTodo = async (userName: string, label: string) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${userName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: label, is_done: false }),
        }
      );
      const data = await response.json();
      await fetchTodos(selectedUser?.name || "");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (
    todoId: number,
    label: string,
    is_done: boolean
  ) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${todoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label, is_done }),
        }
      );
      const data = await response.json();
      await fetchTodos(selectedUser?.name || "");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
        method: "DELETE",
      });
      await fetchTodos(selectedUser?.name || "");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await createTodo(selectedUser?.name || "", newTodo);
        setNewTodo("");
      } catch (error) {
        console.error("Error in handleAddTodo:", error);
      }
    }
  };

  const handleToggleComplete = async (todoId: number) => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
      try {
        await updateTodo(todoId, todo.label, !todo.is_done);
      } catch (error) {
        console.error("Error in handleToggleComplete:", error);
      }
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
    } catch (error) {
      console.error("Error in handleDeleteTodo:", error);
    }
  };

  return (
    <div className="flex h-screen items-center flex-col mt-10">
      <div className="flex gap-5">
        {selectedUser && (
          <Button
            type="submit"
            onClick={() => {
              setSelectedUser(null);
              setTodos([]);
            }}
          >
            ◀️
          </Button>
        )}
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          {selectedUser ? `${selectedUser.name}'s Todo List` : "Todo List"}
        </h1>
      </div>
      {!selectedUser && (
        <>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
            <Input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Add your name"
            />
            <Button
              type="submit"
              onClick={() => {
                createUser(newUserName);
                setNewUserName("");
              }}
            >
              Create User
            </Button>
          </div>

          <div className="w-full max-w-sm items-center space-x-2 mt-5">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
              Users
            </h2>
            <ul>
              {users.map((user) => (
                <User
                  key={user.id}
                  user={user}
                  deleteUser={deleteUser}
                  setSelectedUser={setSelectedUser}
                />
              ))}
            </ul>
          </div>
        </>
      )}
      {selectedUser && (
        <>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
            <Input
              type="text"
              placeholder="Add your Todo 👍"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button type="submit" onClick={handleAddTodo}>
              Add ➕
            </Button>
          </div>
          <ul className="text-center">
            {todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={() => handleToggleComplete(todo.id)}
                  onDelete={() => handleDeleteTodo(todo.id)}
                />
              );
            })}
          </ul>
        </>
      )}
      <div className="absolute top-2 right-2 mt-5 mr-5">
        <ModeToggle />
      </div>
    </div>
  );
};

export default TodoList;
