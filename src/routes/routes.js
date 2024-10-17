import endpointsUsuario from '../controllers/usuario.controller.js'
import endpointsDiario from '../controllers/diario.controller.js'
import endpointsPara from '../controllers/paragrafo.controller.js'

export default function rotas(server){
    server.use(endpointsUsuario)
    server.use(endpointsDiario)
    server.use(endpointsPara)
}