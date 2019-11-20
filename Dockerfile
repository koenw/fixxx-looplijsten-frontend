FROM node:12

ENV DIR /var/www

WORKDIR $DIR
COPY . $DIR
RUN npm ci --unsafe-perm .
RUN npm run build

EXPOSE 7000
EXPOSE 443

CMD npm run serve-production
