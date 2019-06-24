# js-api-automation
demo project, api testing, js

#### Run tests
- `yarn test` run all tests


#### Run test application
- `sudo docker run -d --name wekan-db -p 27017:27017 mongo:3.2.20` to start database

- `sudo docker run -d --name wekan --link "wekan-db:db" -e "MONGO_URL=mongodb://db" -e "ROOT_URL=http://localhost:38021" -p 38020:80 -p 38021:8080 wekanteam/wekan` to start application

- open `http://localhost:38021/` and create admin user.
