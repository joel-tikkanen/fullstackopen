const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const body = request.body
  console.log(getTokenFrom(request))
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  catch (error) {
    return response.status(400).end()
  }

  blog
    .save()
    .then(result => {
      user.blogs = user.blogs.concat(result.id)
      response.status(201).json(result)
    })
    .catch(() => {
      return response.status(400).end()
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
