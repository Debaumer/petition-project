var index = require('./controllers/index');

module.exports = function(app) {
  app.all('/', index.index);
}
