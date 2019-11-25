FROM node:12

ENV DIR /var/www

WORKDIR $DIR
COPY . $DIR
RUN npm ci --unsafe-perm .
RUN npm run build
RUN cp serve.json build/

# tmp hack to make path work
RUN mkdir -p build/looplijsten
RUN cp build/*.* build/looplijsten/
RUN cp -r build/static build/looplijsten/

EXPOSE 7000

CMD npm run serve
