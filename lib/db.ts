import test_data from "@/data/test_data.json";
import { todo } from "@/types/types";
import { SQLiteDatabase } from "expo-sqlite";

/**
 *  init db by creating table todos if it doesnt exist and add a default todo if it isnt already here or if there is no todos
 * @param db the SQLite database connection
 */
export async function init(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, title text NOT NULL, description text NOT NULL, isDone integer DEFAULT 0 NOT NULL, createdAt text DEFAULT CURRENT_TIMESTAMP NOT NULL, updatedAt text DEFAULT CURRENT_TIMESTAMP NOT NULL);
    INSERT INTO todos (title, description) SELECT 'Basic todo', 'Explore the app to start' WHERE ((SELECT COUNT(*) FROM todos) < 1);`); // TODO
}

/**
 * fetch all todos from table todos
 * @param db the SQLite database connection
 * @returns the array of todos
 */
export async function getTodos(db: SQLiteDatabase): Promise<todo[]> {
  const result = await db.getAllAsync(
    "SELECT * FROM todos ORDER BY createdAt ASC"
  );
  return result as todo[];
}

export async function searchTodos(
  db: SQLiteDatabase,
  title: string
): Promise<todo[]> {
  const result = await db.getAllAsync(
    "SELECT * FROM todos WHERE title LIKE ?",
    `%${title}%`
  );

  return result as todo[];
}

/**
 * fetch todo data from given todo id
 * @param db the SQLite database connection
 * @param id  the todo id to get info of
 * @returns the todo title, description
 */
export async function getTodosById(
  db: SQLiteDatabase,
  id: string
): Promise<todo> {
  const result = await db.getFirstAsync(
    "SELECT title, description FROM todos WHERE id = ?;",
    id
  );

  return result as todo;
}

/**
 * update the status of a todo by its given id
 * @param db the SQLite database connection
 * @param id the id of the todos to update
 * @param done the status value to update
 * @returns if it succeed or not
 */
export async function updateTodoState(
  db: SQLiteDatabase,
  id: number,
  done: boolean
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE todos SET isDone = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
    done,
    id
  );

  return result.changes === 1 ? true : false;
}

/**
 * edit the title and description of a todo by its given id
 * @param db the SQLite database connection
 * @param id the id of the todos to edit
 * @param title the new todo title
 * @param description the new todo description
 */
export async function editTodos(
  db: SQLiteDatabase,
  id: string,
  title: string,
  description: string
) {
  await db.runAsync(
    "UPDATE todos SET title = ?, description = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
    title,
    description,
    id
  );
}

/**
 * delete all todos from the todos table
 * @param db the SQLite database connection
 */
export async function dropTodos(db: SQLiteDatabase) {
  await db.runAsync("DELETE FROM todos");
}

/**
 * create a new todo on the todo table with given title and description
 * @param db the SQLite database connection
 * @param title the todo title
 * @param description the description todo
 */
export async function createTodo(
  db: SQLiteDatabase,
  title: string,
  description: string
) {
  await db.runAsync(
    "INSERT INTO todos (title, description) VALUES (? , ?)",
    title,
    description
  );
}

/**
 * inset test data in the todos table
 * @param db the SQLite database connection
 */
export async function insertTestData(db: SQLiteDatabase) {
  test_data.map(async (todo_test) => {
    await createTodo(db, todo_test.title, todo_test.description);
  });
}
