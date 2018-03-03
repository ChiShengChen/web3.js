const Contract = require('web3-eth-contract');
const namehash = require('eth-ens-namehash');
const REGISTRY_ABI = require('../ressources/ABI/Registry');
const Resolver = require('./Resolver');


/**
 * A wrapper around the ENS registry contract.
 *
 * @method ENSRegistry
 * @constructor
 * @param {Object} ens
 */
function Registry(ens) {
    this.ens = ens;
    this.registry = ens.checkNetwork().then(function (address) {
        return new Contract(REGISTRY_ABI, address);
    });
}

/**
 * Returns the address of the owner of an ENS name.
 *
 * @method owner
 * @param {string} name
 * @return {Promise<any>}
 */
Registry.prototype.owner = function(name) {
    return this.registry.then(function (contract) {
        return contract.methods.owner(namehash.hash(name)).call();
    }).catch(function (error) {
        throw error;
    });
};

/**
 * Returns the resolver contract associated with a name.
 *
 * @method resolver
 * @param {string} name
 * @return {Promise<Resolver>}
 */
Registry.prototype.resolver = function(name) {
    const node = namehash.hash(name);
    return this.registry.then(function (contract) {
        return contract.methods.resolver(node).call();
    }).then(function (address) {
        return new Resolver(address, node);
    }).catch(function (error) {
        throw error;
    });
};
