'use strict';

/**
 * Import controllers.
 */
const count = require('./controllers/count');
const session = require('./controllers/session');

module.exports = function (router) {

  /**
   * Define routes here.
   */

  /**
   * api collection.
   */

  /**
   * api count, use for test
   */
  router.get('inc', count.increment);
  router.get('dec', count.decrement);
  router.get('getCount', count.getCount);

  /**
   * api session, record session information
   */
  router.get('session', session.getSession);
  router.get('updatesession', session.updateSession);

};
