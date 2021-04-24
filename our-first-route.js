// our-first-route.js

async function routes(fastify) {
  fastify.get('/test', async () => ({ hello: 'world' }));

  const opts = {
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
    },
  };

  fastify.post('/test', opts, async (arg) => {
    console.log(arg.body);
    return { hello: 'world' };
  });
}

module.exports = routes;
