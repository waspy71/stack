
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
let morgan = require('morgan')
const Person = require('./models/person')

morgan.token('data', (request) => {
  if(request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed ID' })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))


app.get('/info', (request, response) => {
  const date = Date()
  
  Person.find({})
  .then(persons => {
    response.send(`
      <p>Phone book has info for ${persons.length} people</p>
      <p>${date}</p>
      `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(!person) {
        response.status(404).end()
      } else {
        response.json(person)
      }
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.json(400).json({
      error: 'Name or Number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(returnedPerson => {
    response.json(returnedPerson)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.json(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = Person.findById(request.params.id)
    .then(person => {

      if(!person) {
        return request.status(404).end()
      }

      person.number = number

      person.save()
        .then(returnedPerson => {
          response.json(returnedPerson)
        })
    })
    .catch( error => next(error))

})

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is runnin on PORT ${PORT}`)
})


