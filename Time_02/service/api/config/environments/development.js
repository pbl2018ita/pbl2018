var nconf = require('nconf')
nconf.set('url', 'mywebsite.com')

/*
 DATABSE SETTINGS
*/
nconf.set('database', {
  name: 'stagihobd-ts02',
  user: 'ts02',
  password: '',
  server: 'ds227119.mlab.com',
  port: '27119'
})