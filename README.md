
# Teaching Assistant Supporting System

The primary responsibility of this system is to provide students with a user-friendly platform to manage posts.
It focuses on serving as a teaching assistant, empowering them to effectively manage the forum and maintain control over student interactions via the posts. 

# Install & Start

## Prerequisites:
You must have Docker Installed in your System !

## How to run the App :

Move to the folder contain docker-compose.yml

Run the app using :
```bash
  $ docker-compose up -d
```
Above command will start the services on (-d) detach mode (similar like running the app in background)

Then you can check the status of the containers by running:    
```bash
  $ docker ps
```
The port of App should be :

Client : http://localhost:3000

Server : http://localhost:8080
## Tech Stack

**Client:** React, Redux-toolkit, TailwindCSS

**Server:** Nodejs, Expressjs

**Database:** Mongodb , Redis
