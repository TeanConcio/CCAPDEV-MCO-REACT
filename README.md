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



Notes About the Deployed Application:

1. Our application uses the Render hosting service to deploy online. As our application uses 2 servers, we had to make and configure 2 separate Render services to run our application. However, as the Render plans for these servers are both of the free tier, they are quite slow at communicating with each other, then to the database. Due to this, some functionalities may seem a bit slow, and we ask for the user to be patient when waiting for the application to load.

2. We did not implement an Edit Profile feature due to the application needing to constantly interact with the database to track the user of each post and comment (posts and comments have the user's username built-in to reduce backend requests). To compensate for this, we implemented Adding Friends and Nested Comments features for users to keep in touch with each other and better express their opinions.

3. As comments in our application can be nested, displaying all nested comments at once can take a while for our application to load. To compensate for this, the user will have to manually reveal each nested comment reply as to not bloat up the entire page.

4. As uploading and storing pictures online requires either a premium database, constantly committing to Github, or using a 3rd party storage service, we found it not feasible to implement these due to them requiring constant large data transferring that may slow down the website and because of the current constraints in time. To compensate, our application only stores new uploaded pictures into local storage. Thus, when clearing cookies or logging out, some images may fail to render. The only images available are those that were built into the application's public asset folder.

5. When the "Keep Me Logged In" is checked upon logging in, the token and login data will be stored into the user's local storage, allowing them to stay logged in through multiple sessions. However, when leaving it off, instead of remembering the user's tab website session, the application will store the token and login data into local storage but with an expiry of 1 minute, to which after that time will logout the user. As implementing session management for both tab sessions and device sessions was not possible due to current constraints in time, this will act as a proof of concept when the user's login token expires.