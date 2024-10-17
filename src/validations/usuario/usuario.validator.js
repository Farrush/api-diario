export default function validar(u){
    if(!u)
        throw new Error("Usuário não informado")
    if(u.nome == undefined)
        throw new Error("Nome do usuário não informado")
    if(u.email == undefined)
        throw new Error("Email do usuário não informado")
    if(u.senha == undefined)
        throw new Error("Senha não inserida")
}