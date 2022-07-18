require('dotenv').config();
const app = require('./api');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

const UserController = require('./controller/userController');
const UserMiddleware = require('./middlewares/userMiddleware');

const CategoryController = require('./controller/categoryController');
const CategoryMiddleware = require('./middlewares/categoryMiddeware');

const PostController = require('./controller/postController');
const PostMiddleware = require('./middlewares/postMiddleware');

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

app.get('/categories', 
  UserMiddleware.validateToken,
  CategoryController.getAll);

app.post('/post', 
  UserMiddleware.validateToken,
  PostMiddleware.validateBody,
  PostMiddleware.validateCategory,
  PostController.create);

app.get('/post/search',
  UserMiddleware.validateToken,
  PostController.getLike);

app.get('/post',
  UserMiddleware.validateToken,
  PostController.getAll);

app.get('/post/:id', 
  UserMiddleware.validateToken,
  PostMiddleware.validateId,
  PostController.getById);

app.put('/post/:id', 
  UserMiddleware.validateToken,
  PostMiddleware.validateUpdateUser,
  PostMiddleware.validateBody,
  PostController.update);

app.delete('/post/:id',
  UserMiddleware.validateToken,
  PostMiddleware.validateId,
  PostMiddleware.validateUpdateUser,
  PostController.destroy);

app.delete('/user/me',
  UserMiddleware.validateToken,
  UserController.destroy);

app.listen(port, () => console.log('ouvindo porta', port));
