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

app.use(router);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
})