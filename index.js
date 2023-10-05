const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());


const questions = [];


server.post('/questions', (req, res) => {
  const { id, name, country } = req.body;

  if (!id || !name || !country) {
    return res.status(400).json({ error: 'Please provide id, name, and country for the question.' });
  }

  const newQuestion = { id, name, country };
  questions.push(newQuestion);

  return res.status(201).json(newQuestion);
});


server.get('/questions', (req, res) => {
  return res.status(200).json(questions);
});


server.get('/questions/:id', (req, res) => {
  const { id } = req.params;

  // Find the question by ID
  const question = questions.find((q) => q.id === id);

  if (!question) {
    return res.status(404).json({ error: 'Question not found.' });
  }

  return res.status(200).json(question);
});


server.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  const { name, country } = req.body;


  const question = questions.find((q) => q.id === id);

  if (!question) {
    return res.status(404).json({ error: 'Question not found.' });
  }


  question.name = name || question.name;
  question.country = country || question.country;

  return res.status(200).json(question);
});

// Route to delete a question by ID
server.delete('/questions/:id', (req, res) => {
  const { id } = req.params;

  // Find the question by ID
  const index = questions.findIndex((q) => q.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Question not found.' });
  }

  // Remove the question from the database
  questions.splice(index, 1);

  return res.status(204).send(); // No content response
});

// Initialize the server on port 3000
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Questions API',
      version: '1.0.0',
      description: 'API for managing questions',
    },
    basePath: '/',
  },
  apis: ['./index.js'], // Especifique o arquivo contendo as rotas da API
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger documentation at /swagger.json
server.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Serve Swagger UI at /docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Inicialize o servidor na porta 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});