FROM node:12

ENV DIR /var/www

WORKDIR $DIR
COPY . $DIR
RUN npm ci --unsafe-perm .
RUN if [ "$BUILD_ENV" != "production" ]; then npm run build:acc ; fi
RUN if [ "$BUILD_ENV" = "production" ]; then npm run build ; fi
RUN cp serve.json build/

# tmp hack to make path work
RUN mkdir -p build/looplijsten
RUN cp build/*.* build/looplijsten/
RUN cp -r build/static build/looplijsten/
RUN cp -r build/icons build/looplijsten/

EXPOSE 7000

CMD npm run serve
