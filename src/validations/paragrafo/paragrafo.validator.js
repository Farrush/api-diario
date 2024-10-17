export default function validar(p){
    if(!p)
        throw new Error("Paragrafo não informado")
    if(p.diario == null || p.diario == undefined)
        throw new Error("O ID do diário do parágrafo não foi informado")
}