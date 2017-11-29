var env = process.env.NODE_ENV || 'dev';

var config = {
    dev: {
        mongo: {
            url: 'mongodb://localhost:27017/mytask'
        }, 
        facebook: {
            callback: 'http://localhost:12345/auth/facebook/callback'
        }
    },
    production: {
        mongo: {
            url: 'mongodb://localhost:27017/mytask'
        }, 
        facebook: {
            callback: 'http://64.137.166.57:12345/auth/facebook/callback'
        }
    }
};

module.exports = config[env];