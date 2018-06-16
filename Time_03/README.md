# STAGIHO-BD

#Time Scrum 03

Config Heroku
<li>heroku git:remote -a stagihobd-ts03
<li>heroku config:add BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs

Criacao do arquivo .buildpack

Para deploy a partir do subdiretorio do Repositorio GIT... Ir para a raiz do diretorio e executar o seguinte comando
<li> git subtree push --prefix Time_03/api heroku master


Para deploy a partir do clone do repositorio da Heroku:
<li> git push heroku master 



https://stagihobd-ts03.herokuapp.com/