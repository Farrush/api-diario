import express from "express"
import cors from 'cors'
import rotas from "./routes/routes.js"

const server = express()
server.use(express.json())
server.use(cors())
rotas(server)




server.listen(5040, () => {
    console.log("Api rodando na porta "+5040)
})