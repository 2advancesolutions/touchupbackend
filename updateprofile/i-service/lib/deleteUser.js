'use strict';

const dynamodb = require('serverless-dynamodb-client');
let docClient = dynamodb.doc;

function deleteUser(uuid, callback) {
    let params = {
        TableName: process.env.TABLE_NAME,
        Key: {
             'uuid': uuid
        }
    };
    docClient.delete(params,callback);
}

module.exports = deleteUser;