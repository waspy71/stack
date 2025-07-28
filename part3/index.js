
require('dotenv').config()
const express = require('express')
let morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

morgan.token('data', (request) => {
  if(request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get('/api/info', (request, response) => {
  const date = Date()
  response.send(`
    <p>Phone book has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  // const id = request.params.id
  // const person = persons.find(p => p.id === id)

  // if(!person) {
  //   response.status(404).end()
  // } else {
  //   response.json(person)
  // }
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  // const isNameTaken = persons.find(p => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())

  // if(!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'Name or Number is missing'
  //   })
  // } else if (isNameTaken) {
  //   return response.status(400).json({
  //     error: 'Name must be unique'
  //   })
  // }

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

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is runnin on PORT ${PORT}`)
})


