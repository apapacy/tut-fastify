// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
});

const Ajv = require('ajv');

const ajv = new Ajv({
  removeAdditional: false,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
  strictTypes: true,
  nullable: true,
  strictRequired: true,
});

fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => ajv.compile(schema));

fastify.setErrorHandler((error, request, reply) => {
  console.log(error);
  reply.status(error.status || 500).send(error.toJSON && error.toJSON() || error);
});

fastify.register(require('fastify-swagger'), {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0',
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  hideUntagged: true,
  exposeRoute: true,
});

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.register(require('./our-first-route'));

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
