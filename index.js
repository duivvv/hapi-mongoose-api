'use strict';

module.exports.register = (server, options, next) => {

  let modelsPath = options.models || './models/mongoose';
  let mongoURL = options.mongoURL || process.env.MONGO_URL;

  let path = require('path');
  let fs = require('fs');

  let validateFileName = require('./lib/validateFileName');
  let createApi = require('./lib/createApi');

  let mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  mongoose.connect(mongoURL);

  fs.readdirSync(modelsPath).forEach(file => {

    if(!validateFileName(file)) return;

    let name = path.basename(file, path.extname(file));
    let data = require(path.relative(__dirname, path.join(modelsPath, file)));

    let opts = data.collection ? {collection: data.collection} : {};

    data.Model = mongoose.model(name, new Schema(data.schema, opts));

    if(data.api){
      createApi(data).forEach(route => server.route(route));
    }

  });

  next();

};

module.exports.register.attributes = {
  pkg: require('./package.json')
};