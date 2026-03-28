import 'dotenv/config'
import express from 'express'
import nodemon from 'nodemon'
import logger from './logger.js'
import morgan from 'morgan'
const app = express()
const port = process.env.PORT || 3000

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);


let teaData = []
let nextID = 1

app.use(express.json())
app.get('/', (req, res) => {
    console.log("hola funciona")
    res.send("Servidor funcionando 🚀")
})
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextID++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        res.status(404).send("tea not found ")
    }
    res.status(200).send(tea)
})
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        res.status(404).send("tea not found ")
    }
    res.status(200).send(tea)
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

    if (index === -1) {
        res.status(404).send("tea not found ")
    }
    teaData.splice(index, 1)
    return res.status(200).send("deleted")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})