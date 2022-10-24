const path = require('path');

const rootPath = __dirname;
module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/tunes',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId:'1088996608672790',
    appSecret: process.env.FACEBOOK_APP_SECRET,
  }
};