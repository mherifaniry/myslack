
# NodeJS CHAT APPLICATION for CyberSecurity

TASK: Try to create a clone of Slack.
Slack is one of the most widely used collaboration and messaging platform used by software teams worldwide, and boasts of a wide range of functionalities and sleek UI.
You will implement features like user authentication, public channels, DM features, and private channels, and optionally, even notifications, user profile edits and more! (edited)

REQUIREMENTS:
- Auth: login/logout (DONE)
- Messages between users (DONE)
- Messages in a channel (DONE)
- Realtime messaging (DONE)
- Versionning (github, gitlab,...) (DONE)
- README for launching and testing the app (DONE)

BONUS:
- Connexion status (connected or not) (NOT DONE)
- UI/UX (NOT DONE)
- Be creative ;)


## Requirements
For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node

#### Node installation on Windows

- Just go on official `bNode.js` website and download the installer. You have to download `npm` after
- If the installation was successful, you should be able to run the following command.

```http
  $ node --version
  v16.17.0

  $ npm --version
  8.15.0
```

### Setup the project 

- Donwload the zip project and unzip it 
- cd PROJECT_TITLE
- Run the next command to install dependencies

```http
  npm install
```

- Create .env file inside the main directory and add the following configurations
- NB: you may change to other port but make sure to use the same on the URL

```http
  TOKEN_KEY = '32e3ecd1ef81b909b4a7b0dc336e15c6'
  PORT = 8888
  DB_USERNAME = 'mherifaniry'
  DB_PASSWORD = 'Q6hnv7V6x4q9Rf7V'
```

### Runnig the project 

- commande line

```http
  node server.js
```

- Open your browser (chrome or firefox) and open the following link

```http
  http://localhost:8888/user/login
```
### TEST
- Create an accounte (nom, prenom, email, mdp)
- I send you an image on mail and this is the explaination
- 1: To display account information. Click 1 to modify the information.
- 2: Content of a conversation
- 3: List of public (eye) and private (padlock) channels. No invitation to join a private chat at the moment but anyone can chat on public channels
- 4: direct messages with other users
- 5: To disconnect
- 6: message to send
- 7: to send a message

### REMARQUES
- Make sure you use internet network because i used online MOONGOSE ATLAS DATABASE and many other CDN
- I did my best despite of electricity failure yesterday, I spent 24 hours on this project cause i went in church saturday. Thank you for understanding :
