import dotenv from "dotenv";
dotenv.config();
import postgres from "postgres";


const sql = postgres({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    port: process.env.DB_PORT,
    ssl: 'require',
});

// Criando uma nova tarefa
export async function createTask(title, description) {
    const res = await sql`INSERT INTO tasks (title, description) VALUES (${title}, ${description}) RETURNING *`;
    return res[0];
}

// Obtendo todas as tarefas
export async function getAllTasks() {
    const res = await sql`SELECT * FROM tasks`;
    return res;
}
