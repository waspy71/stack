

const express = require('express')
const app = express()


app.use(express.json())

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

const generateId = () => {
  return String(Math.trunc(Math.random() * 10000))
}

app.get('/api/info', (request, response) => {
  const date = Date()
  response.send(`
    <p>Phone book has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if(!person) {
    response.status(404).end()
  } else {
    response.json(person)
  }
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const isNameTaken = persons.find(p => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or Number is missing'
    })
  } else if (isNameTaken) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is runnin on PORT ${PORT}`)
})


