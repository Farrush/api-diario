import { Router } from "express";
import { criarDiarioParaNovoUsuario, deletaDiarioDepoisDeDeletarUsuario } from "../services/diario.service.js";
import { buscaUsuario, buscaUsuarios, adicionaUsuario, alteraUsuario, deletaUsuario, loginUsuario } from "../services/usuario.service.js";
import { autenticar, geraToken } from "../utils/jwt.js";
import valUsuario from "../validations/usuario/usuario.validator.js";
const endpoints = Router()

endpoints.get('/usuario', async (req, res) => {
    try{
        res.send(await buscaUsuarios())

    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.get('/usuario/:id', async (req, res) =>{
    try{
        res.send(await buscaUsuario(req))
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.post('/usuario', async (req, res) => {
    try{
        valUsuario(req.body)
        let usuario = req.body
        let novoDiario = await criarDiarioParaNovoUsuario(usuario)
        usuario = {...usuario, diario: novoDiario}
        let novoId = await adicionaUsuario(usuario)
        res.send({idNovoUsuario: novoId})

    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.put('/usuario/:id', autenticar, async (req, res) => {
    try{
        let resp = await alteraUsuario(req)
        res.send({alterado: resp})
    }catch(err){
        res.status(400).send({erro: err.message})
    }
})
endpoints.delete('/usuario/:id', autenticar, async (req, res) => {
    try{
        let usuario = await buscaUsuario(req)
        if(usuario == null)
            throw new Error("Usuário não existe")

        await deletaUsuario(req)
        if(usuario.diario != undefined || usuario.diario != null){
            await deletaDiarioDepoisDeDeletarUsuario(usuario.diario)
        }
        res.send({excluido: usuario})
    }catch(err){
        res.status(404).send({erro: err.message})
    }
})

endpoints.post('/usuario/login', async (req, res)=>{
    try{
        const [usuario] = await loginUsuario(req)
        if(usuario == undefined)
            throw new Error("Email ou senha incorretos")
        const token = geraToken(usuario)
        res.send({usuario, token})
    } catch (err) {
        res.status(401).send({ erro: err.message });
    }
})
export default endpoints