import { supabase } from "./db";
import { useEffect, useState } from "react";
import { Database } from "./types";

type Todo = Database["public"]["Tables"]["todos"]["Row"];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    supabase
      .from("todos")
      .select("*")
      .then((res) => {
        // console.log(res.data);
        setTodos(res.data || []);
      });
  }, []);
  return (
    <>
      <h1>To Do</h1>
      {todos.map((todo, idx) => {
        const time = new Date(todo.created_at).toLocaleTimeString();
        const date = new Date(todo.created_at).toLocaleDateString();
        return (
          <div key={todo.id}>
            ({idx + 1}) 📅{date} ⏰{time} 📰{todo.title}
          </div>
        );
      })}
    </>
  );
}

export default App;
