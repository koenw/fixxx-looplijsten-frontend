FROM node:12

ENV DIR /var/www

WORKDIR $DIR
COPY . $DIR
RUN npm install --unsafe-perm .
RUN npm run build

EXPOSE 7000

CMD npm run serve
