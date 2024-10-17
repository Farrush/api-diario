import {sUsuario, sUsuarios, iUsuario, uUsuario, dUsuario} from '../repositories/usuario.repository.js'
import { login } from '../repositories/autenticacao.repository.js'
import valId from '../validations/ids/id.validator.js'
import valUsuario from '../validations/usuario/usuario.validator.js'
export async function buscaUsuarios(){
    const [usuarios] =  await sUsuarios()
    return usuarios
}

export async function buscaUsuario(req){
    valId(req.params.id)
    let id = req.params.id
    const [usuario] = await sUsuario(id)
    return usuario[0]
}

export async function adicionaUsuario(usuario){
    const [res] = await iUsuario(usuario)
    return res.insertId
}

export async function alteraUsuario(req){
    valId(req.params.id)
    valUsuario(req.body)
    let id = req.params.id
    let usuario = req.body
    const [res] = await uUsuario(usuario, id)

    return res.changedRows
}
export async function deletaUsuario(req){
    valId(req.params.id)
    let id = req.params.id
    const [res] = await dUsuario(id)
    return res
}

export async function loginUsuario(req){
    let email = req.body.email
    let senha = req.body.senha
    const [usuario] = await login(email, senha)
    return usuario
}