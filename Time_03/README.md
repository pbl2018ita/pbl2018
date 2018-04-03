# STAGIHO-BD

#Time Scrum 03

Config Heroku
<li>heroku git:remote -a stagihobd-ts03
<li>heroku config:add BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs

Criacao do arquivo .buildpack

Ir para a raiz do diretorio e executar o seguinte comando
<li> git subtree push --prefix Time_03/api heroku master

