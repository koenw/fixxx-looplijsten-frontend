FROM node:12

ENV DIR /var/www

WORKDIR $DIR
COPY . $DIR
RUN npm clean-install --unsafe-perm .
RUN npm run build

EXPOSE 7000

CMD npm run serve
