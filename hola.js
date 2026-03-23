
const http = require('http')

const hostname = '127.0.0.1'
const port = 3041

const server = http.createServer((req, res) => {
    if (req.url = "/") {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end("hola webonazo")
    } else if (req.url = "/login") {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end("hola webin")
    } else {
        res.statusCode = 404
        res.setHeader('Content-type', 'text/plain')
        res.end("not found")
    }
})

server.listen(port, hostname, () => {
    console.log(`sever lisrten at https://${hostname}:${port}`)
})
