import mysql from "mysql2/promise"

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "diario_db",
    port: 3306
})

export default con;