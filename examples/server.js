const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/'
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/test/get', function (req, res) {
  res.json(req.query);
});

router.post('/test/post', function (req, res) {
  res.json(req.body);
})

router.options('/test/options', function (req, res) {
  res.end();
})

router.delete('/test/delete', function (req, res) {
  res.end();
})

router.head('/test/head', function (req, res) {
  res.end();
})

router.post('/test/post', function (req, res) {
  res.json(req.body);
})

router.put('/test/put', function (req, res) {
  res.json(req.body);
})

router.patch('/test/patch', function (req, res) {
  res.json(req.body);
})

router.get('/error/get', function (req, res) {
  res.status(500);
  res.end();
})

router.get('/error/timeout', function (req, res) {
  setTimeout(() => {
    res.json(req.query);
  }, 3000);
})

router.get('/test/user', function (req, res) {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'DJ',
      age: 25
    }
  });
})

app.use(router);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
})