
/*
 * Module dependencies
 */

var http = require('http');

/*
 * Module exports
 */

module.exports = Client;

/**
 *
 * @param opts
 * @constructor
 */
function Client(opts) {
    this.host = opts.host;
    this.port = opts.port;
}

/**
 *
 * @param serviceName
 * @public
 */
Client.prototype.getServiceNodes = function (serviceName) {
    return getJSON(this._prepareOpts(`/v1/catalog/service/${serviceName}`));
};

/**
 *
 * @public
 */
Client.prototype.getServices = function () {
    return getJSON(this._prepareOpts(`/v1/catalog/services`));
};

/**
 *
 * @public
 */
Client.prototype.getNodes = function () {
    return getJSON(this._prepareOpts(`/v1/catalog/nodes`));
};

/**
 *
 * @param node
 * @public
 */
Client.prototype.getNode = function (node) {
    return getJSON(this._prepareOpts(`/v1/catalog/node/${node}`));
};

/**
 *
 * @param path
 * @returns {{host: *, port: *, path: *}}
 * @private
 */
Client.prototype._prepareOpts = function (path) {
    return {
        host: this.host,
        port: this.port,
        path: path
    }
};

function getJSON(options) {
    return new Promise((resolve, reject) => {
        var data = '';
        http.request(options, function (response) {
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                if (response.statusCode < 400) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`${response.statusCode}: ${response.statusMessage}`));
                }
            });
        }).end();
    });
}
