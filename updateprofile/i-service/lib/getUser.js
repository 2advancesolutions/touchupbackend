'use strict';

const dynamodb = require('serverless-dynamodb-client');
let docClient = dynamodb.doc;

function getUser(uuid, callback) {
    let params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            'uuid': uuid
        }
    };
    console.log(params);
    docClient.get(params, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}

module.exports = getUser;