import { todo } from "@/types/types";
import { SQLiteDatabase } from "expo-sqlite";

export async function init(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, title text NOT NULL, description text NOT NULL, isDone integer DEFAULT 0 NOT NULL, createdAt text DEFAULT CURRENT_TIMESTAMP NOT NULL, updatedAt text DEFAULT CURRENT_TIMESTAMP NOT NULL);
    INSERT INTO todos (title, description) SELECT 'Basic todo', 'Explore the app to start' WHERE (NOT EXISTS (SELECT 1 FROM todos WHERE title = 'Basic todo' AND description = 'Explore the app to start')) OR ((SELECT COUNT(*) FROM todos) > 2);`);
}

export async function getTodos(db: SQLiteDatabase) {
  const result = await db.getAllAsync("SELECT * FROM todos");
  return result as todo[];
}

export async function updateTodoState(
  db: SQLiteDatabase,
  id: number,
  done: boolean
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE todos set isDone = ? WHERE id = ?",
    done,
    id
  );

  return result.changes === 1 ? true : false;
}

export async function dropTodos(db: SQLiteDatabase) {
  await db.runAsync("DELETE FROM todos");
}
