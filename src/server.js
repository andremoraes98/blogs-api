require('dotenv').config();
const app = require('./api');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

const UserController = require('./controller/userController');
const UserMiddleware = require('./middlewares/userMiddleware');

const CategoryController = require('./controller/categoryController');
const CategoryMiddleware = require('./middlewares/categoryMiddeware');

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login',
  UserMiddleware.validateBody,
  UserMiddleware.validateEmailExists,
  UserController.getToken);

app.post('/user',
  UserMiddleware.validateInfos,
  UserMiddleware.validateInfoEmailExist,
  UserController.create);

app.get('/user',
  UserMiddleware.validateToken,
  UserController.getAll);

app.get('/user/:id',
  UserMiddleware.validateToken,
  UserMiddleware.validateIdExists,
  UserController.getById);

app.post('/categories',
  UserMiddleware.validateToken,
  CategoryMiddleware.validateBody,
  CategoryController.create);

app.listen(port, () => console.log('ouvindo porta', port));
