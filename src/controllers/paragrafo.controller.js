import { buscaParagrafo, buscaParagrafos, adicionaParagrafo, alteraParagrafo, deletaParagrafo, buscaParagrafosPorDiario } from "../services/paragrafo.service.js";
import { Router } from "express";
import { autenticar } from "../utils/jwt.js";

const endpoints = Router()

endpoints.get('/paragrafo', autenticar, async (req, res) => {
    try{
        res.send(await buscaParagrafos())
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.get('/paragrafo/:id', autenticar, async (req, res) => {
    try{
        res.send(await buscaParagrafo(req))
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.get('/paragrafo/diario/:id', autenticar, async (req, res) => {
    try{
        res.send(await buscaParagrafosPorDiario(req))
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.post('/paragrafo', autenticar, async (req, res) => {
    try{
        let novoId = await adicionaParagrafo(req)
        res.send({idNovoParagrafo: novoId})

    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.put('/paragrafo/:id', autenticar, async (req, res) => {
    try{
        let resp = await alteraParagrafo(req)
        res.send({alterado: resp})
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.delete('/paragrafo/:id', autenticar, async (req, res) => {
    try{
        let paragrafo = await buscaParagrafo(req)
        if(paragrafo == null)
            throw new Error("Parágrafo não existe")

        await deletaParagrafo(req)

        res.send({excluido: paragrafo})
    }catch(err){
        res.status(404).send({erro: err.message})
    }
})

export default endpoints