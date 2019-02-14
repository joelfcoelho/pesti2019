const _ = require('lodash');

let env = process.env.NODE_ENV || 'development';

// All configurations will extend these options
// ============================================
let all = {
    env: env,

    // Server port
    port: process.env.PORT || 9000,

    // Mongoose connection
    mongoose: {
        uri: 'mongodb://pesti2019:pesti2019@ds331735.mlab.com:31735/pesti2019'
    }

    // jwt: {
    //     secret   : "",
    //     issuer   : "",
    //     audience : "Everyone"
    // }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require(`./${env}.js`)
);
