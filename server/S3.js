const AWS = require('aws-sdk');
const { accessKeyId, secretAccessKey } = require('../apiKeys');

module.exports = new AWS.S3({
  credentials: {
    accessKeyId, secretAccessKey
  }
});