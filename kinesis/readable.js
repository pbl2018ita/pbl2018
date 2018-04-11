const AWS = require('aws-sdk')

//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
var credentials = new AWS.SharedIniFileCredentials({profile: 'stagihobd'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});

const { KinesisReadable } = require('kinesis-streams')
const client = new AWS.Kinesis()
const reader = new KinesisReadable(client, 'test')

reader.on('data', function(data) {
  var d = JSON.parse(data.toString())
  console.log(Buffer.from(d).toString())
})
