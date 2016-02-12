var Client = require('./client');

function connect(opts) {
    opts = opts || {};

    opts.host = opts.host || 'localhost';
    opts.port = opts.port || 8500;

    return new Client(opts);
}

module.exports = connect;
