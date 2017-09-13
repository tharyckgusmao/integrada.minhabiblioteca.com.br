

if(process.env.NODE_ENV === 'production'){

    module.exports = require('./configure.production.js');

}else{

  module.exports = require('./configure.develompment.js');

}
