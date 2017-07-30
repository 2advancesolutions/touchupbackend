'use strict';

const service = require('./i-service');
const dynamodb = require('serverless-dynamodb-client');
const docClient = dynamodb.doc;


function constructErrorResponse(err) {
    const errorBody = {
        'errorType': 'Internal Server Error',
        'errorMessage': 'There was an unknown server error',
        'error': err
    };
    return {
        statusCode: 500,
        body: JSON.stringify(errorBody)
    };
}
module.exports.getAllUsers = (event, context, callback) => {
    const response = {};
    service.getAllUsers(null, (err, users) => {
        if (err) {
            response = constructErrorResponse(err);
        } else {
            response.statusCode = 200;
            response.headers = { 'Access-Control-Allow-Origin': '*' };
            response.body = JSON.stringify({
                'users': users
            });
        }
        return callback(null, response);
    });
}
module.exports.getUser = (event, context, callback) => {

    const pp = event.pathParameters;
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { // a map of attribute name to AttributeValue for all primary key attributes
            uuid: pp.id, //(string | number | boolean | null | Binary)
            // more attributes...

        },
        ConsistentRead: false, // optional (true | false)
        ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    };
    docClient.get(params, function (err, data) {
        const response = {};
        if (err) {
            constructErrorResponse(err);
        }  // an error occurred
        else {
            response.statusCode = 200;
            response.headers = { 'Access-Control-Allow-Origin': '*' };
            response.body = JSON.stringify({
                'users': data
            });
            return callback(null, response);
        } // successful response
    });
};
module.exports.createUser = (event, context, callback) => {
    const data = JSON.parse(event.body);
    service.createUser(data, (err) => {
        let response = {};
        if (err) {
            response = constructErrorResponse(err);
        } else {
            response.statusCode = 204;
            response.headers = { 'Access-Control-Allow-Origin': '*' };
        }
        return callback(null, response);
    });
};
module.exports.deleteUser = (event, context, callback) => {
    const pp = event.pathParameters
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { // a map of attribute name to AttributeValue for all primary key attributes
            uuid: pp.id,
            // attribute_value (string | number | boolean | null | Binary)
            // more attributes...

        },
        //  ConditionExpression: 'attribute_exists(attribute_name)', // optional String describing the constraint to be placed on an attribute
        // ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
        //'#name': 'attribute name'
        //},
        // ExpressionAttributeValues: { // a map of substitutions for all attribute values
        //':value': 'VALUE'
        // },
        ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
        ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
        ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
    };
    docClient.delete(params, function (err, data) {
        const response = {};
        if (err) {
            response = constructErrorResponse(err);
        } else {
            response.statusCode = 200;
            response.headers = { 'Access-Control-Allow-Origin': '*' };
            response.body = JSON.stringify({
                'users': data
            });
            return callback(null, response);
        }
    });
}
