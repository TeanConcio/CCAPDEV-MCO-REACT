# CCAPDEV-MCO



Local Setup instructions:

1. Unzip the Folder

2. Open the folder in VSCode, or any code editor with a terminal

3. Right click server folder, and press open in integrated terminal (or just find path of server), THEN, type npm i.

4. After installing everything needed for the server, type npm run dev
    - (If you arent able to connect to the database, login in MongoDB with the given credentials, go to network settings and add your ip address to whitelist it)
    - Credentials: username/email: antesemetichustasa@gmail.com password: antesemetic0

5. Right click the client folder, and press open in integrated terminal (or just find path of client), THEN type npm i

6. After installing everything needed for the client, type npm start.



Local Host Port Disclaimer:

As our application uses 2 servers, we are unable to locally host the application at port:3000 alone.
port:3000 is used by the React.js server while port:4000 is used by the Express.js server.



Deployed Application Link:
https://pokehub-ccapdev.onrender.com/