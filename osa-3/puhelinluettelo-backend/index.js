const express = require('express')
let morgan = require('morgan')

const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req) => {return JSON.stringify(req.body)})
app.use(morgan('tiny'))
app.use(cors())


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log('phonebook: ')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    response.json(persons)
  })
})


app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.send('Phonebook has info for '+result.length+' people'+'<p>' + new Date().toLocaleString() + '</p>')
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
    id: (Math.random() * 1000000) | 0
  })
      
   
  person.save()
    .then(result => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`)
      response.json(result)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) =>{
  const body = request.body
  const person = {
    name: body.name,
    important: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      next(error)
    })

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



