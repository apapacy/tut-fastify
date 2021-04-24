// our-first-route.js

async function routes(fastify) {
  fastify.get('/test', async () => ({ hello: 'world' }));

  const opts = {
    httpStatus: 201,
    schema: {
      description: 'post some data',
      tags: ['user', 'code'],
      summary: 'qwerty',
      additionalProperties: false,
      body: {
        additionalProperties: false,
        type: 'object',
        required: ['someKey'],
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number', minimum: 10 },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            value: { type: 'string' },
            otherValue: { type: 'boolean' },
            hello: { type: 'string' },
          },
        },
      },
    },
  };

  fastify.post('/test', opts, async (req, res) => {
    res.status(201);
    console.log(req.body);
    throw new Error({ status: 422, message: 'test' });
    return { hello: 'world' };
  });
}

module.exports = routes;
