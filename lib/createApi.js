'use strict';

module.exports = data => {

  let excludeItem = require('./excludeItem');

  let Model = data.Model;
  let collectionName = Model.collection.collectionName;
  let exclude = data.exclude || [];
  let sort = data.sort || '_id';

  let routes = [

    {
      method: 'POST',
      path: `/api/${collectionName}`,
      handler: (request, reply) => {
        let fb = new Model(request.payload);
        fb.save(err => {
          if(err) throw err;
          reply(fb);
        });
      }
    },

    {
      method: 'GET',
      path: `/api/${collectionName}/{id}`,
      handler: (request, reply) => {
        Model.findOne({_id: request.params.id}, '-__v').exec()
          .then(d => reply(d));
      }
    },

    {
      method: 'GET',
      path: `/api/${collectionName}`,
      handler: (request, reply) => {

        let _sort = request.query.sort || sort;
        let _filter = request.query || {};
        delete _filter.sort;

        Model.find(_filter, '-__v').sort(_sort).exec()
          .then(d => reply({[collectionName]: d}));

      }
    },

    {
      method: 'DELETE',
      path: `/api/${collectionName}/{id}`,
      handler: (request, reply) => {
        Model.findOne({_id: request.params.id}).remove().exec()
          .then(() => reply({id: request.params.id}));
      }
    }

  ];

  if(Array.isArray(exclude)){
    exclude.forEach(flag => {
      routes = excludeItem(routes, flag);
    });
  }else{
    routes = excludeItem(routes, exclude);
  }

  return routes;

};
