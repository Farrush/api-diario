import { sParagrafo, sParagrafos, iParagrafo, uParagrafo, dParagrafo, sParagrafosByDiario } from "../repositories/paragrafo.repository.js";
import valId from '../validations/ids/id.validator.js'
import valPara from "../validations/paragrafo/paragrafo.validator.js";
export async function buscaParagrafos(){
    let [paragrafos] = await sParagrafos()
    return paragrafos
}
export async function buscaParagrafo(req){
    valId(req.params.id)
    let id = req.params.id
    let [paragrafo] = await sParagrafo(id)
    return paragrafo[0]
}
export async function buscaParagrafosPorDiario(req){
    valId(req.params.id)
    let id = req.params.id
    let [paragrafos] = await sParagrafosByDiario(id)
    return paragrafos
}
export async function adicionaParagrafo(req){
    valPara(req.body)
    let paragrafo = req.body
    let [res] = await iParagrafo(paragrafo)
    return res.insertId
}

export async function alteraParagrafo(req){
    valId(req.params.id)
    valPara(req.body)
    let paragrafo = req.body
    let id = req.params.id
    let [res] = await uParagrafo(paragrafo, id)
    return res.changedRows
}
export async function deletaParagrafo(req){
    valId(req.params.id)
    let id = req.params.id
    let [res] = await dParagrafo(id)
    return res
}