# Tasksmanagement

```
MEAN STACK APPLICATION (MongoDB,Expess.j,Angular,Node.js)
```
## Installation

### Installation of NVM

1. First download the NVM installation script using cURL as follows

        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

2. After downloading the script, run the script using bash as follows

        bash install_nvm.sh
    
3. To reflect the changes for the current user session, use following command

        source ~/.profile
    
4. Check installed NVM version as follows

        nvm --version
    
5. Install a particular version of node

        nvm install 10.15

### Install Mongodb

Mongodb can be install by following the steps from this [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) or follow the below steps. 

1. Import the public key used by the package management system.

        wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

2. Create a list file for MongoDB

        echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

3.  Reload local package database

        sudo apt-get update

4.  Install the MongoDB packages

        sudo apt-get install -y mongodb-org

5.  Start MongoDB

        sudo service mongod start

### Install Angular CLI via npm

1. Install the angularcli

        npm install -g @angular/cli

### Run the Application 

1. Remove the package-lock.json

        rm package-lock.json

2. Install the dependencies

        npm install

3. Build the angular project 

        ng build 

4. Run the server 

        node server.js 

```
    Application will be running at http://localhost:3000 
```

# Steps to Deploy the application on the EC2 Engine on AWS.

These are the steps

1. Launch a new ec2 instance from Amazon Web Service.
2. Setup SSH Connection to connect ec2 instance
3. Install Nodejs using nvm
4. Install MongoDB database
5. Install Angularcli 
6. Run the application

## Follow the steps below

1. Create a new ec2 instance from Amazon Web Service.

To create a new instance, you should have an active account on AWS.After logging to Aws.

Select an ec2 option from Services

<img src="./img/Screenshot from 2019-10-16 05-18-09.png">

Then click on **Launch Instance** button after that you’ll land to below page.

<img src="./img/Screenshot from 2019-10-16 05-22-51.png">

Then select one image from list of options. Please select an image according to your requirement and whichever is suitable for you. So in my case I’ll select Ubuntu 16.04.

Note: After that maybe some installation command not work if you select an image other than Ubuntu 16.04.

Next Choose instance type, Let’s choose t2.micro which is eligible for the free tier, so if your account is less than 12 months old you can run your server for free. Thanks to Amazon!

```Danger
Note: t2.micro has only 1GB RAM, which is not sufficient for running the bigger applications.
In my case, I took t2.medium which is not under free tier.
```

<img src="./img/Screenshot from 2019-10-16 05-29-38.png">

Next Configure instance details, this is more complicated step but we can ignore this for now.

<img src="./img/Screenshot from 2019-10-16 05-31-46.png">

Next Add storage, Default size is 8 Gb but you can update size according to your requirement , but for now 8gb is enough

<img src="./img/Screenshot from 2019-10-16 05-33-24.png">

Next Add Tags, add key-value pair for instance, but for now we’ll skip this step .Tags is useful if you use more instance it’s better to search by Tag.

Next Configure Security Group,In my opinion this steps is more important ,Where we inbound(expose our server port) and outbound(restrict to access other server)

In our case, to connect ec2 instance we need open **ssh port 22** and to access our site publicly we need expose **http port 80** (when you visit any website by default it connect to port 80 )with selecting option **anywhere** for source

**Inbound and Outbond Source**      

1. Anywhere from anywhere we can access this port
2. Custom only provided IP access this port.
3. My IP only access this port within same server.

<img src="./img/Screenshot from 2019-10-16 05-39-54.png">

Next Click review and launch, then you’ll see options selected in all steps.

<img src="./img/Screenshot from 2019-10-16 05-42-26.png">

Next Click on Launch, then it’ll ask to create new key pair , which will used to connect our server using ssh with this key.

Download this key pair, and click on Launch.

2. Setup ssh connection to connect EC2 instance.

After creating instance , Go to that instance. In this page there is connect button click on that connect button then you’ll see this modal.
This is can be found in the connect option.

        chmod 400 <pem file path>  

        ssh -i <pem file path> <user>@<public DNS>

        eg. ssh -i "tasks.pem" ubuntu@ec2-49-214-8-132.us-west-2.compute.amazonaws.com

Note: In my case, user for my ec2 server is ubuntu because I’ve selected Ubuntu 16.04.So In your case user will be different if you have selected an machine other than Ubuntu. Here is the list of al default user for Amazon Image.[See here](https://alestic.com/2014/01/ec2-ssh-username/)

3. Install Node Js on ec2 instance.

    To set up Node.js on your Ubuntu instance.

    Follow the [Steps](#Installation-of-NVM)

    For more info click on the [link](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)

4. Install Mongodb on ec2 instance.

    To set-up Mongodb on the Ubuntu instance.

    Follow the [Steps](#Install-Mongodb)

    For more info click on the [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

5. Install Angularcli.

    To set-up Angularcli on the Ubuntu instance.

    Follow the [Steps](#Install-Angular-CLI-via-npm)

6. Run the application.

    Follow the [Steps](#Run-the-Application)

```
Now Express App start on port 3000

Then open below url in browser

        http://<your public DNS>:3000
```

But if you close this terminal or if you perform Ctrl+C server will stop.

So to start server in the background there are multiple NPM library but we’ll use forever to start server. Here is the different option.
For more [info](https://expressjs.com/en/advanced/pm.html)

Install forever globally using npm

        npm install -g forever

Start server using forever

        forever start server.js

To see list of forever process

        forever list

To see Express Server logs

        tail -f <logfile path>

If you want to store logs in predefined file, then start server with following command

        forever start server.js -l /path/to/log/file


To access this server publicly, you’ve to open port 3000 from security group by adding into inbound rule, as we open port in **Step1**

After opening 3000 port publicly , hit below url

        http://<your pblic DNs>:3000
        
        eg. http://ec2-0-0-0-0.us-west-2.compute.amazonaws.com:3000


## ISSUES FACED AND SOLUTIONS

1. What is the Right Amazon Machine Image to choose for my application?

```
Try to pick the one which you work locally in your laptop. It will be easy for working on machine which we work dialy.
Like, I picked ubuntu as I familar and work on Ubuntu.

```

2. Why my application is not generating ES5 build on ng build?

```
**Mistake:**
I picked free tier t2.micro for deploying, but this machine has only 1 GB RAM,and my application was not able to build.
**Solution:**
When I took t2.medium with 4GB Ram, then it started working.

```

3. Why my application is not opening even on successful running of my node server ?

```
**Mistake:**
I did not add the 3000 port in the security group, because of which i could not access the application with my public-dns IP of my instance.
**Solution:**
I have added the custom rule for 3000 port and anywhere as source in the new rule.
For more [info](https://ourcodeworld.com/articles/read/977/how-to-deploy-a-node-js-application-on-aws-ec2-server)
```






