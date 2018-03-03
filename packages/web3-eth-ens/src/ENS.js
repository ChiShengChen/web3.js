const config = require('./config');
const Registry = require('./contracts/Registry');

/**
 * Constructs a new instance of ENS
 *
 * @method ENS
 * @param {Object} eth
 * @constructor
 */
function ENS(eth) {
    this.eth = eth;
}

Object.defineProperty(ENS.prototype, 'registry', {
    get: function(){
        return new Registry(this);
    },
    enumerable: true
});

/**
 * Returns the address record associated with a name.
 *
 * @method getAddress
 * @param {string} name
 * @return {Promise<string>} a promise
 */
ENS.prototype.getAddress = function (name) {
    return this.registry.resolver(name).then(function(resolver) {
        return resolver.addr();
    }).catch(function(error) {
        throw error;
    });
};

/**
 * Sets a new address
 *
 * @param {string} name
 * @param {string} address
 * @returns {Promise<Transaction>}
 */
ENS.prototype.setAddress = function (name, address) {
    return this.registry.resolver(name).then(function(resolver) {
        return resolver.setAddr(address).send();
    }).catch(function(error) {
        throw error;
    });
};

/**
 * Returns the public key
 *
 * @param {string} name
 * @returns {Promise<T>}
 */
ENS.prototype.getPubkey = function(name) {
  return this.registry.resolver(name).then(function(resolver) {
      return resolver.pubkey();
  }).catch(function(error) {
      throw error;
  });
};

/**
 * Set the new public key
 *
 * @param {string} name
 * @param {string} x
 * @param {string} y
 * @returns {Promise<Transaction>}
 */
ENS.prototype.setPubkey = function(name, x, y) {
  return this.registry.resolver(name).then(function(resolver) {
      return resolver.setPubkey(x, y).send();
  }).catch(function(error) {
      throw error;
  });
};

/**
 * Returns the content
 *
 * @param {string} name
 * @returns {Promise<T>}
 */
ENS.prototype.getContent = function(name) {
    return this.registry.resolver(name).then(function(resolver) {
        return resolver.content();
    }).catch(function(error) {
        throw error;
    })
};

/**
 * Sets the new content
 *
 * @param {string} name
 * @param {string} hash
 * @returns {Promise<Transaction>}
 */
ENS.prototype.setContent = function(name, hash) {
  return this.registry.resolver(name).then(function(resolver) {
      return resolver.setContent(hash);
  }).catch(function(error) {
      throw error;
  });
};

/**
 * Checks if the current used network is synced and looks for ENS support there.
 * Throws an error if not.
 *
 * @returns {Promise<Block>}
 */
ENS.prototype.checkNetwork = function () {
    const self = this;
    return self.eth.getBlock('latest').then(function (block) {
        const headAge = new Date() / 1000 - block.timestamp;
        if (headAge > 3600) {
            throw new Error("Network not synced; last block was " + headAge + " seconds ago");
        }
        return self.eth.net.getNetworkType();
    }).then(function (networkType) {
        const addr = config.addresses[networkType];
        if (typeof addr === 'undefined') {
            throw new Error("ENS is not supported on network " + networkType);
        }

        return addr;
    }).catch(function (err) {
        throw err;
    });
};
