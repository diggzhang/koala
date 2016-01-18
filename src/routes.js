'use strict';

/**
 * Import controllers.
 */
const count = require('./controllers/count');

module.exports = function (router) {

  /**
   * Define routes here.
   */

  /**
   * Get api.
   */
  router.get('inc', count.increment);
  router.get('dec', count.decrement);
  router.get('wow', count.wow);
  router.get('getCount', count.getCount);

  /**
   * Post api.
   */
};
