const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
   response.json(blogs)
  })

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end()
  }
  if (request.body.likes === undefined) {
    request.body.likes = 0
  }
  const user = request.user
  if (!user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: request.body.title, 
    author: request.body.author, 
    url: request.body.url, 
    likes: request.body.likes,
    user: user.id.toString()
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
    
})

blogsRouter.delete('/:id', async (request, response) => {
  /*
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  */
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(result)

})


module.exports = blogsRouter