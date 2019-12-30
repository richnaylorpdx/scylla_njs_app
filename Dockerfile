
FROM alpine
RUN apk update;apk add nodejs nodejs-npm
COPY * /app/
WORKDIR /app
CMD npm install;node --expose-gc --max_old_space_size=5024 app.js
