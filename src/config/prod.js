export default {
  "server": {
    "port": 3000,
    "env": "prod"
  },
  "mongo": {
    url: "mongodb://mongoTrack/koala",
    opt: {
      auth: {"authdb": "admin"},
      server: {
        socketOptions: {keepAlive: 1},
        poolSize: 1000
      }
    },
  }
};
