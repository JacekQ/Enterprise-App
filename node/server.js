const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./database.json')

const SECRET_KEY = 'DzielnyJK IS the besciak';

server.use(jsonServer.defaults());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
server.use(bodyParser.json());

const createToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

const userdb = JSON.parse(fs.readFileSync('./database.json', 'UTF-8')).users || [];

const isAuthenticated = ({ email, password }) => {
    return userdb.findIndex(user => user.email === email && user.password === password) !== -1;
}

const findAuthenticatedUser = ({ email, password }) => {
    return userdb.find(user => user.email === email && user.password === password);
}

server.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (isAuthenticated({ email, password }) === false) {
      const status = 401;
      const message = 'Incorrect email or password';
      res.status(status).json({ status, message });
      return;
    }
    const access_token = createToken({ email, password });
    // res.status(200).json({ access_token });

    // ze zwracaniem pełnego usera
    const user = {...findAuthenticatedUser({ email, password })};
    delete user.password;
    user.token = access_token;
    res.status(200).json({ user });
})

// server.get('/users', (req, res) => {
//     // ze zwracaniem pełnego usera
//     const user = {...findAuthenticatedUser({ email, password })};
//     delete user.password;
//     user.token = access_token;
//     res.status(200).json({ user });
// })

// If you want to target /users/:id specifically
router.render = function (req, res) {
  if (req.url.indexOf('/users/') !== -1) {
    delete(res.locals.data.password);
  } else if (req.url.indexOf('/users') !== -1 && req.method === 'GET') {
    // usuniecie pasword ze wszystkich userow
    res.locals.data.forEach(data => delete(data.password));
  }
  res.jsonp(res.locals.data)
}

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    // if (req.method === 'GET') {  // enables GET routes
    if (req.method === '1') { // protects all routes
      next();
    } else {
      if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
          const status = 401;
          const message = 'Bad authorization header';
          res.status(status).json({ status, message });
          return;
      }
      try {
          verifyToken(req.headers.authorization.split(' ')[1]);
          next();
      } catch (err) {
          const status = 401;
          const message = 'Error: access_token is not valid';
          res.status(status).json({ status, message });
      }
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('Server running...');
});

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
