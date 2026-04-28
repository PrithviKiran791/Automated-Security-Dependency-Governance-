const _ = require('lodash');

// Simple function to demonstrate library usage
function secureMerge(obj1, obj2) {
    return _.merge({}, obj1, obj2);
}

module.exports = secureMerge;