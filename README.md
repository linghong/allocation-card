## App structure and Techniques
1. This project's client side was bootstrapped with Create React App, using Redux for state management, d3.js for building the donut chart. The client side runs on port 3000. 

2. This project uses json-server as a fake API GET/POST end point, running on port 4000. 
, 
3. All the code for the assignment is on the client folder; the code for the fake dbserver and for managing the project startup is located on the outside folder.


## Install:
Please do the following two stps to install the code:
1. install node module in client side:
 go to 'client' folder run:  
`npm install` 
 
2. under the top folder, install node module for fake json-server, run: 
`npm install` 


## Start:
To start the app, under the top folder, run: 
`npm run dev` 

It will start the json-server (on port 4000) and the front end (on port 3000) concurrently. A page will automatically open on the browser.

