const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(() => {
      response.status(400).end()
    })
})

blogRouter.delete('/:id', (request, response) => {
  Blog
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).json(result)
    })
    .catch(err => {
      console.log(err)
      response.status(400).end()
    })
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(body)
  await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
  response.end()
})

module.exports = blogRouter
