// our-first-route.js
const createError = require('fastify-error');
const ForbiddenError = createError('403_ERROR', 'Message: ', 403);

class CustomError extends Error {
  constructor(...args) {
    super(...args);
    Object.assign(this, args?.[0]);
    console.log(this.toJSON());
  }

}

Object.defineProperty(CustomError.prototype, 'toJSON', {
  value: function () {
      var alt = {};

      Object.getOwnPropertyNames(this).forEach(function (key) {
          alt[key] = this[key];
      }, this);

      return alt;
  },
  configurable: true,
  writable: true
});

function raiseAsyncError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new ForbiddenError('Async Error')), 5000);
  });
}

async function routes(fastify) {
  fastify.get('/test', async () => {
    // throw {t:1};
    throw new ForbiddenError({error:123});
    return { hello: 'world' };
  });

  fastify.get('/sync-error', async () => {
    if (true) {
      throw new ForbiddenError('Sync Error');
    }
    return { hello: 'world' };
  });

  fastify.get('/async-error', async () => {
    await raiseAsyncError();
    return { hello: 'world' };
  });

  fastify.get('/custom-error', async () => {
    if (true) {
      throw new CustomError({ status: 419, data: { a: 1, b: 2} });
    }
    return { hello: 'world' };
  });


  const opts = {
    httpStatus: 201,
    schema: {
      description: 'post some data',
      tags: ['test'],
      summary: 'qwerty',
      additionalProperties: false,
      body: {
        additionalProperties: false,
        type: 'object',
        required: ['someKey', 'someOtherKey'],
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number', minimum: 10 },
        },
      },
      response: {
        200: {
          type: 'object',
          additionalProperties: false,
          required: ['hello'],
          properties: {
            value: { type: 'string' },
            otherValue: { type: 'boolean' },
            hello: { type: 'string' },
          },
        },
        201: {
          type: 'object',
          additionalProperties: false,
          required: ['hello-test'],
          properties: {
            value: { type: 'string' },
            otherValue: { type: 'boolean' },
            'hello-test': { type: 'string' },
          },
        },
      },
    },
  };

  fastify.post('/test', opts, async (req, res) => {
    res.status(201);
    console.log(req.body);
    return { hello: 'world' };
  });
}

module.exports = routes;
