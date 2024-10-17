import endpointsUsuario from '../controllers/usuario.controller.js'


export default function rotas(server){
    server.use(endpointsUsuario)
}