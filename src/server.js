//importações
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

//trabalhar na parte de real time
const socketio = require('socket.io')
const http = require('http')

//usar funções do express()
const app = express()

//config para real time
const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {} //em producao o ideal para armazenar os dados da users que estao logados em um banco rápido, recomenda redis



const routes = require('./routes')
const username = '', password = '', database = ''

mongoose.connect(`mongodb+srv://${username}:${password}@omnistack-unhgp.mongodb.net/${database}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err == null) {
        console.log('conectado!')
    }
    console.log(err)
})



//ouvir toda a informacao do todo usuario logado, o socket representa a conexao com o usuario 
io.on('connect', socket => {
    //socket.handshake.query ira pegar a informacao passada na query la no frontend

    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id

    /* setTimeout(()=>{
        socket.emit('hello', 'World') //enviar msg depois de 4sec
    }, 4000)
    */

})

//midleware, todas as rotas tem acesso ao io que permite enviar e receber msg do mobile e web
app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})


//get, post, put, delete

//req.query = acessar query params (filtros)
//req.params = acessar route params (edicao, delete)
//req.body = acessar corpo da requisição (criacao , adicao)

app.use(cors())
app.use(express.json()) //vai passar a aceitar json
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes) //usar as rotas 
const PORT = 3333

//aqui deve ser trocado por server, pronta pra ouvir requisicoes http e websockets
server.listen(PORT, () => {
    console.log(`Running in: ${PORT}`)
})