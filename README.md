# hapi-mongoose-api

**use this plugin only in Node 4.0.0 and up**

## how to use?

```bash
npm install --save hapi-mongoose-api
```

register this plugin in Hapi

```javascript
server.register(require('hapi-mongoose-api'), /* error */);
```

you can pass options with the register function

```javascript
server.register({
  register: require('hapi-mongoose-api'),
  options: {
    mongoURL: 'mongodb://localhost/mydb', //default: process.env.MONGO_URL
    models: './models/mongoose' //default: ./models/mongoose
  }
}, /* error */);
```

## models

make sure your models look like this

```javascript

/* filename: Student.js */

'use strict';

module.exports = {

  api: true, //default: false
  sort: '-created', //default: _id
  exclude: 'GET', //default empty, you can also pass an array ['GET', 'DELETE']
  collection: 'feedback', //default: mongoose default (name + 's')

  schema: {
    studentId: String,
    feedback: String,
    created: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    }
  }

};


```

this only creates a model (no API)

```javascript

/* filename: Student.js */

'use strict';

module.exports = {

  schema: {
    studentId: String,
    feedback: String,
    created: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    }
  }

};


```

## api?

if you set the variable api to true, this plugin creates api routes for your mongoose models

- GET /api/{collectionname}
- GET /api/{collectionname}/{id}
- POST /api/{collectionname}/{id}
- DELETE /api/{collectionname}/{id}

TODO: UPDATE

### filtering

example:

```
GET /api/students/?age=20&gender=male
```

### sorting

example:

```
GET /api/students/?sort=age
GET /api/students/?sort=-age
GET /api/students/?age=20&sort=-age
```
