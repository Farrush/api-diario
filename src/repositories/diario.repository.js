import con from './connection.js'

export async function sDiario(id){
    const sql = "select id_diario id, nm_titulo titulo from diario_tb where id_diario = ?"
    return await con.query(sql, [id])
}
export async function sDiarios(){
    const sql = "select id_diario id, nm_titulo titulo from diario_tb"
    return await con.query(sql)
}
export async function sDiariosPorUsuario(id){
    const sql = "select d.id_diario id, d.nm_titulo titulo from diario_tb as d inner join usuario_tb as u on u.id_diario = d.id_diario where u.id_usuario = ?"

    return await con.query(sql, [id])
}
export async function iDiario(diario){
    if(diario.titulo === null)
        diario.titulo = "Meu Diário"
    const sql = "insert into diario_tb (nm_titulo) values (?)"
    return await con.query(sql, [diario.titulo])
}
export async function uDiario(diario, id) {
    diario = {...diario, id}
    const sql = "update diario_tb set nm_titulo = ? where id_diario = ?"
    return await con.query(sql, [diario.titulo, diario.id])
}
export async function dDiario(id) {
    const sql = "delete from diario_tb where id_diario = ?"
    return await con.query(sql, [id])
}