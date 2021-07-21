const routes = require('next-routes')();
routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/:address')
module.exports = routes;

