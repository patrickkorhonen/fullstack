const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

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
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    }
  ]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
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

const generateId = () => {
    const id = persons.length > 0
      ? Number((Math.random() * 1000000).toFixed())
      : 0
    return id
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name && !body.number) {
      return response.status(400).json({ 
        error: 'both name and number are missing' 
      })
    }
    if (!body.name) {
        return response.status(400).json({ 
          error: 'name is missing' 
        })
      }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number is missing' 
      })
    }
    if (persons.map((person) => person.name).includes(body.name)) {
        return response.status(400).json({ 
          error: 'name already exists' 
        })
      }
  
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
