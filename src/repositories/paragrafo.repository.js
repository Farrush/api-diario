import con from './connection.js'

export async function sParagrafos(){
    const sql = "select id_paragrafo id, co_conteudo conteudo, id_diario diario from paragrafo_tb"

    return await con.query(sql)
}

export async function sParagrafo(id){
    const sql = "select id_paragrafo id, co_conteudo conteudo, id_diario diario from paragrafo_tb where id_paragrafo = ?"

    return await con.query(sql, [id])
}
export async function sParagrafosByDiario(id){
    const sql = "select p.id_paragrafo id, p.co_conteudo conteudo, p.id_diario diario from paragrafo_tb as p inner join diario_tb as d on d.id_diario = p.id_diario where d.id_diario = ?"
    return await con.query(sql, [id])
}
export async function iParagrafo(paragrafo){
    const sql = "insert into paragrafo_tb (co_conteudo, id_diario) values (?, ?)"

    return await con.query(sql, [paragrafo.conteudo, paragrafo.diario])
}
export async function uParagrafo(paragrafo, id){
    paragrafo = {...paragrafo, id}
    const sql = "update paragrafo_tb set co_conteudo = ?, id_diario = ? where id_paragrafo = ?"
    return await con.query(sql, [paragrafo.conteudo, paragrafo.diario, paragrafo.id])
}

export async function dParagrafo(id){
    const sql = "delete from paragrafo_tb where id_paragrafo = ?"
    return await con.query(sql, [id])
}
