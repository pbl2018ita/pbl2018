const AWS = require('aws-sdk')

//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
var credentials = new AWS.SharedIniFileCredentials({profile: 'stagihobd'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});

const { KinesisWritable } = require('kinesis-streams')
const client = new AWS.Kinesis()
client.config.update({ maxRetries: 10 })
const writable = new KinesisWritable(client, 'test')

//stream from keyboard to kinesis
process.stdin.pipe(writable)
