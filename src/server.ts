import fastify from 'fastify';

const app = fastify({logger: false});
 
app.register(require('./routes'), { prefix: 'api/' });

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333

app.listen({
  host: '0.0.0.0',
  port: PORT,
})
.then(() => {
  console.log(`HTTP Server Running on port ${PORT}!`)
});