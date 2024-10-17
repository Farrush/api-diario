## Como iniciar a api

#### Criar as tabelas do arquivo script.sql no banco de dados 

#### No console
npm i

npm start

#### Alterar os dados em sql/repositories/connection.js
const con = await mysql.createConnection({

    host: "localhost",

    user: "-----seu usuario do mysql-----",

    password: "----sua senha do mysql----",

    database: "diario_db",

    port: 3306
})