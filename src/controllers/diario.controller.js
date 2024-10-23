import { Router } from "express";
import { autenticar } from "../utils/jwt.js";
import { adicionaDiario, alteraDiario, buscaDiario, buscaDiarios, buscaDiarioPorUsuario, deletaDiario } from "../services/diario.service.js";
const endpoints = Router()

endpoints.get('/diario', autenticar, async (req, res) =>{
    try{
        res.send(await buscaDiarios())
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.get('/diario/:id', autenticar, async (req, res) =>{
    try{
        res.send(await buscaDiario(req))

    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.get('/diario/usuario/:id', autenticar, async (req, res) =>{
    try{
        res.send(await buscaDiarioPorUsuario(req))
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.post('/diario', autenticar, async (req, res) =>{
    try{
        let novoId = await adicionaDiario(req)
        res.send({idNovoDiario: novoId})

    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.put('/diario/:id', autenticar, async (req, res) =>{
    try{
        let resp = await alteraDiario(req)
        res.send({alterado: resp})
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.delete('/diario/:id', autenticar, async (req, res) =>{
    try{
        let diario = await buscaDiario(req)
        if(diario == null)
            throw new Error("Diário não existe para ser deletado")

        await deletaDiario(req)

        res.send({excluido: diario})
    }catch(err){
        res.status(404).send({erro: err.message})
    }
})


export default endpoints