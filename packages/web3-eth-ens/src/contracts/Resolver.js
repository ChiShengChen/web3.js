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
    self.node = node;
    self.resolver = new Contract(RESOLVER_ABI, address);
}

/**
 * Returns the address
 *
 * @method addr
 * @returns {Promise<any>}
 */
Resolver.prototype.addr = function () {
    return this.resolver.methods.addr(this.node).call();
};

/**
 * Sets a new address
 *
 * @method setAddr
 * @param {string} address
 * @returns {Promise<Transaction>}
 */
Resolver.prototype.setAddr = function(address) {
    return this.resolver.methods.setAddr(this.node, address).send();
};

/**
 * Returns the public key
 *
 * @returns {Promise<any>}
 */
Resolver.prototype.pubkey = function() {
    return this.resolver.method.pubkey(this.node).call();
};

/**
 * Sets a new public key
 *
 * @method setPubkey
 * @param x
 * @param y
 * @returns {Promise<Transaction>}
 */
Resolver.prototype.setPubkey = function(x, y) {
    return this.resolver.methods.setPubkey(this.node, y, y).send();
};

/**
 * Returns the content of this resolver
 *
 * @method getContent
 * @returns {Promise<any>}
 */
Resolver.prototype.content = function() {
    return this.resolver.methods.content(this.node).call();
};

/**
 * Set the content of this resolver
 *
 * @param {string} hash
 * @returns {Promise<Transaction>}
 */
Resolver.prototype.setContent = function(hash) {
    return this.resolver.method.setContent(this.node, hash).send();
};



