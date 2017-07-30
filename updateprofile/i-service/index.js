'use strict';

const s = require('require-dir')('./lib');

module.exports = {
    getUser: s.getUser,
    getAllUsers: s.getAllUsers,
    createUser: s.createUser,
    deleteUser: s.deleteUser
}