const RESOLVER_ABI = require('../ressources/ABI/Resolver');
const Contract = require('web3-eth-contract');
const _ = require('underscore');

/**
 * Creates an instance of Resolver
 *
 * @param {string} address
 * @param {string} node
 * @constructor
 */
function Resolver(address, node) {
    const self = this;
    self.resolver = new Contract(RESOLVER_ABI, address);
    _.each(self.resolver.methods, function (method, name) {
        if (name !== 'supportsInterface') {
            self.resolver.methods[name] = _.partial(method, node);
        }
    });
}

/**
 * Returns the address
 *
 * @method addr
 * @returns {Promise<any>}
 */
Resolver.prototype.addr = function () {
    return this.resolver.methods.addr().call();
};
