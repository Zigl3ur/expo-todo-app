import { todo } from "@/types/types";
import { SQLiteDatabase } from "expo-sqlite";

export async function init(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, title text NOT NULL, description text NOT NULL, isDone integer DEFAULT 0 NOT NULL, createdAt text DEFAULT CURRENT_TIMESTAMP NOT NULL, updatedAt text DEFAULT CURRENT_TIMESTAMP NOT NULL);
    INSERT INTO todos (title, description) SELECT 'basic todo', 'basic todo description' WHERE (NOT EXISTS (SELECT 1 FROM todos WHERE title = 'basic todo' AND description = 'basic todo description')) OR ((SELECT COUNT(*) FROM todos) > 2);`);
}

export async function getTodos(db: SQLiteDatabase) {
  const result = await db.getAllAsync("SELECT * FROM todos");
  return result as todo[];
}
