## Infra topic - Exercise 2

### Create two simple expressjs applications

Firstly, we have to create a simple expressjs app

```bash
mkdir app1
cd app1
npm init -y
npm i express
```

Create a file app/app.js with the following content:

```js
const express = require('express')

const app = express()

const appName = process.env.APP_NAME ?? 'App'

app.get('/', (req, res, next) => {
  res.send(`<h1> ${appName} </h1>`)
})

app.listen('3000', () => {
  console.log(`${appName} start`)
})
```

### Dockerize the app above

app/Dockerfile

```Dockerfile
FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm i

COPY . .

CMD ["node" , "app.js"]
```

./docker-compose.yaml

```yaml
version: '3.9'

services:
  app1:
    container_name: app1
    build: ./app
    environment:
      - APP_NAME=App1

  app2:
    build: ./app
    container_name: app2
    environment:
      - APP_NAME=App2
```

### Set up nginx as a load balancer

**Add nginx container into docker-compose.yaml**

```
nginx:
    image: nginx
    ports:
      - '80:80'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
```

**./nginx.conf**

```
events {}

http {
    upstream backendserver {
        server app1:3000;
        server app2:3000;
    }

    server {
        listen  80;

        location / {
            proxy_pass  http://backendserver/;
        }
    }
}
```
