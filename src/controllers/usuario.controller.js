import { Router } from "express";
import { buscaUsuario, buscaUsuarios, adicionaUsuario, alteraUsuario, deletaUsuario, loginUsuario } from "../services/usuario.service.js";
import { autenticar, geraToken } from "../utils/jwt.js";
const endpoints = Router()

endpoints.get('/usuario', async (req, res) => {
    res.send(await buscaUsuarios())
})
endpoints.get('/usuario/:id', async (req, res) =>{
    res.send(await buscaUsuario(req))
})
endpoints.post('/usuario', async (req, res) => {
    let novoId = await adicionaUsuario(req)
    res.send({idNovoUsuario: novoId})
})
endpoints.put('/usuario/:id', autenticar, async (req, res) => {
    try{
        let resp = await alteraUsuario(req)
        res.send({alterado: resp})
    }catch(err){
        res.status(401).send({erro: err.message})
    }
})
endpoints.delete('/usuario/:id', autenticar, async (req, res) => {
    try{
        let usuario = await buscaUsuario(req)
        if(usuario == null)
            throw new Error("Usuário não existe")

        await deletaUsuario(req)
        if(usuario.diario !== null){
            //Apagar o diário
        }
        res.send({excluido: usuario})
    }catch(err){
        res.status(404).send({erro: err.message})
    }
})

endpoints.post('/usuario/login', async (req, res)=>{
    try{
        const [usuario] = await loginUsuario(req)
        const token = geraToken(usuario)
        res.send({token})
    } catch (err) {
        res.status(401).send({ erro: err.message });
    }
})
export default endpoints