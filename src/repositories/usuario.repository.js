import con from './connection.js'

export async function sUsuarios(){
    const sql = "select id_usuario id, nm_nome nome, em_email email, id_diario diario from usuario_tb"

    return await con.query(sql)
}

export async function sUsuario(id){
    const sql = "select id_usuario id, nm_nome nome, em_email email, id_diario diario from usuario_tb where id_usuario = ?"

    return await con.query(sql, [id])
}
export async function iUsuario(usuario){
    const sql = "insert into usuario_tb (nm_nome, em_email, pw_senha, id_diario) values (?, ?, sha2(?, 256), ?)"

    return await con.query(sql, [usuario.nome, usuario.email, usuario.senha, usuario.diario])
}
export async function uUsuario(usuario, id){
    usuario = {...usuario, id}
    const sql = "update usuario_tb set nm_nome = ?, em_email = ?, pw_senha = sha2(?, 256), id_diario = ? where id_usuario = ?"
    return await con.query(sql, [usuario.nome, usuario.email, usuario.senha, usuario.diario, usuario.id])
}

export async function dUsuario(id){
    const sql = "delete from usuario_tb where id_usuario = ?"
    return await con.query(sql, [id])
}

