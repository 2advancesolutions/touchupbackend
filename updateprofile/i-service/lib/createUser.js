'use strict';

const uuid = require('node-uuid');
const dynamodb = require('serverless-dynamodb-client');
let docClient = dynamodb.doc;

function createUser(user, callback) {
    let newId = uuid.v4();
    if(user.uuid === ""){
       user.uuid = newId;
    }
    let params = {
        TableName: process.env.TABLE_NAME,
        Item: user
    };
    docClient.put(params, callback);
}

module.exports = createUser;