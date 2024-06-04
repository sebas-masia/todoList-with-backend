import {useState} from "react";
import { Input } from "./input";
import { Button } from "./button";
import TodoItem from "./TodoItem";
import { ModeToggle } from "./mode-toggle";

const TodoList = () => {
    const [todos, setTodos] = useState<Array<{text: string, completed: boolean}>>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, {text: newTodo, completed: false}])
            setNewTodo('')
        }
    }

    const handleToggleComplete = (index: number) => {
        const updatedTodos = todos.map((todo, i) => {
            return i === index ? {...todo, completed: !todo.completed} : todo
        })
        setTodos(updatedTodos)
    }

    const handleDeleteTodo = (index: number) => {
        const updatedTodos = todos.filter((_, i) => i !== index)
        setTodos(updatedTodos)
    }

    return (
        <div className="flex h-screen items-center flex-col mt-10">
            <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">Todo List</h1>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                <Input type="text" placeholder="Add your Todo 👍" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
                <Button type="submit" onClick={handleAddTodo}>Add ➕</Button>
            </div>
            <ul className="text-center">
                {todos.map((todo, index) => (
                    <TodoItem 
                        key={index} 
                        todo={todo} 
                        onToggleComplete={() => handleToggleComplete(index)}
                        onDelete={() => handleDeleteTodo(index)}
                    />
                ))}
            </ul>
            <div className="absolute top-2 right-2 mt-5 mr-5">
                <ModeToggle />
            </div>
        </div>
    )

}

export default TodoList;