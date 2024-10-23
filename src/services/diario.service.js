import { sDiario,sDiarios, uDiario, iDiario, dDiario, sDiariosPorUsuario } from "../repositories/diario.repository.js";
import valId from '../validations/ids/id.validator.js'
import valDiario from "../validations/diario/diario.validator.js";

export async function buscaDiarios(){
    let [diarios] = await sDiarios()
    return diarios
}
export async function buscaDiario(req){
    valId(req.params.id)
    let id = req.params.id
    let [diario] = await sDiario(id)
    return diario[0]
}
export async function buscaDiarioPorUsuario(req){
    valId(req.params.id)
    let id = req.params.id
    let [diario] = await sDiariosPorUsuario(id)
    return diario[0]
}
export async function adicionaDiario(req){
    valDiario(req.body)
    let diario = req.body
    let [res] = await iDiario(diario)
    return res.insertId
}
export async function alteraDiario(req){
    valId(req.params.id)
    valDiario(req.body)
    let id = req.params.id
    let diario = req.body
    let [res] = await uDiario(diario, id)
    return res.changedRows
}

export async function deletaDiario(req){
    valId(req.params.id)
    let id = req.params.id
    let [res] = await dDiario(id)
    return res
}
export async function deletaDiarioDepoisDeDeletarUsuario(id) {
    valId(id)
    let [res] = await dDiario(id)
    return res
}
export async function criarDiarioParaNovoUsuario(usuario){
    let diario = {titulo: `Diário de ${usuario.nome}`}
    let [res] = await iDiario(diario)
    return res.insertId
}