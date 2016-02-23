/**
 * 根据环境变量加载不同的配置文件，
 * 如果NODE_ENV是dev，则会加载当前目录下的dev.js作为配置文件，
 * 如果NODE_ENV是prod，则会加载当前目录下的prod.js作为配置文件，
 * 如果没有指定环境变量，默认加载dev.js.
 *
 * @author centsent
 **/
import _ from 'lodash';
const env = process.env.NODE_ENV || 'dev';
const envConfig = require(`./${env}`);

const defaultOptions = {
  "mongo": {
    "opt": {
      "server": {
        "socketOptions": {"keepAlive": 1},
        "poolSize": 100
      }
    }
  }
};

export default _.merge(defaultOptions, envConfig);
