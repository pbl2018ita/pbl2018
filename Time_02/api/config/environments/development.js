var nconf = require('nconf')
nconf.set('url', 'mywebsite.com')

/*
 DATABSE SETTINGS
*/

nconf.set('database', {
  name: 'mongo_test',
  user: 'test',
  password: 't3stmongo',
  server: 'ds229609.mlab.com',
  port: '29609'
})