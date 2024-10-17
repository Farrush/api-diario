import con from './connection.js'

export async function login(email, senha){
    const sql = "select id_usuario id, nm_nome nome, em_email email from usuario_tb where em_email = ? and pw_senha = sha2(?, 256);"
    return await con.query(sql, [email, senha])
}