// our-first-route.js

async function routes (fastify, options) {
  fastify.get('/test', async (request, reply) => {
    return { hello: 'world' }
  })

  const opts = {
   schema: {
    description: 'post some data',
    tags: ['user', 'code'],
    summary: 'qwerty',
     body: {
        type: 'object',
        required: ['requiredKey'],
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number', minimum: 10 }
        }
     }
   }
  }

  fastify.post('/test', opts, async (request, reply) => {
    return { hello: 'world' }
  })
}




module.exports = routes
