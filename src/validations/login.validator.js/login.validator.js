export default function validar(u){
    if(!u || u == undefined || u == null)
        throw new Error("Usuário não informado")
    if(u.email == undefined || u.email.length < 6)
        throw new Error("Email não informado")
    if(u.senha == undefined || u.senha.length < 1)
        throw new Error("Senha não inserida")
    if(!u.email.includes('@'))
        throw new Error("Email inválido")
}