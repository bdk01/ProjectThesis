
# Teaching Assistant Supporting System

The primary responsibility of this system is to provide students with a user-friendly platform to manage posts.
It focuses on serving as a teaching assistant, empowering them to effectively manage the forum and maintain control over student interactions via the posts. 

# Install & Start
# Setup environment
I have created the file .env.example. Based on that, you can create the .env file
## Prerequisites:
You must have Docker Installed in your System !

Follow this link to install the docker https://docs.docker.com/desktop/install/windows-install/

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

See Dockerfile and docker-compose.yml for more details.

The port of App should be :

Client : http://localhost:3000

Server : http://localhost:8080
## Tech Stack

**Client:** React, Redux-toolkit, TailwindCSS

**Server:** Nodejs, Expressjs

**Database:** Mongodb , Redis

## Demo 
Here is the demo video link allow you to see clearly product visually: 
https://www.youtube.com/watch?v=gXu-pcqu-IA
