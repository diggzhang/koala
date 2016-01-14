import _ from 'lodash';
const env = process.env.NODE_ENV || 'dev';
const envConfig = require(`./${env}`);

const dbOptions = {
  mongo: {
    url: "mongodb://10.8.8.111/koala_dev"
  }
};

export default dbOptions
