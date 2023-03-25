const express = require('express')
let morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.static('build'))
const cors = require('cors')
app.use(cors())

morgan.token('response-body', (req, res) => {return JSON.stringify(req.body)});
app.use(morgan('tiny'))
app.use(morgan(':method :url :response-time :response-body'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    console.log(persons)
    response.json(persons)
})


app.get('/info', (request, response) => {
    response.send("Phonebook has info for "+persons.length+" people"+"<p>" + new Date().toLocaleString() + "</p>")
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id = (Math.random() * 10000 | 0)
    
    if (!person.name || !person.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
    }

    if (persons.find(p => p.name === person.name)){
        return response.status(422).json({ 
            error: 'name must be unique' 
        })
    }
    
    console.log(person)
    persons = persons.concat(person)
    console.log(persons)
    response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})