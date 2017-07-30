'use strict';

const dynamodb = require('serverless-dynamodb-client');
let docClient = dynamodb.doc;

function getAllUsers(limit, callback) {
    let tableName = process.env.TABLE_NAME;
    let params = {
        TableName: tableName
    };
    docClient.scan(params, (err, data) => {
        if (err) return callback(err);
        return callback(null, data.Items);
    });
}

module.exports = getAllUsers;