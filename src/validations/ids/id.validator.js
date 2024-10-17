export default function validar(id){
    if(!id){
        throw new Error("ID não informado")
    }
    if(isNaN(id))
        throw new Error("ID informado não é um número")
}