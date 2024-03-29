require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const User = require('./models/user')

  

app.use(cors())
app.use(express.static('build'))

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
  User.find({}).then(result => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
    User.find({}).then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    User.findById(id).then(user => {
      if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
    }).catch(error => {
      next(error)
    })
  })

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  User.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const user = {
      name: body.name,
      number: body.number,
    }

    User.findByIdAndUpdate(request.params.id, user, { new: true, runValidators: true, context: 'query' })
      .then(updatedUser => {
        response.json(updatedUser)
      })
      .catch(error => next(error))
})


  
  app.post('/api/persons', (request, response, next) => {
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

    const user = new User({
        name: body.name,
        number: body.number,
    })

    user.save().then(result => {
        console.log(`added ${user.name} number ${user.number} to phonebook`)
        response.json(result)
    })
    .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
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

  const PORT = process.env.PORT
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
