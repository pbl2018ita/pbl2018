FROM node:latest

RUN mkdir -p /usr/src/app
RUN npm install nodemon -g

WORKDIR /usr/src/app
RUN cd .. && git clone https://github.com/pbl2018ita/pbl2018.git && cp ./pbl2018/Time_01/servicos/hospital/app/package.json /usr/src/app/package.json && cd app
RUN npm install -g

EXPOSE 9000
EXPOSE 5858

CMD ["npm", "start"]
