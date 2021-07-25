# node-assignment-3

### Modules used: 
1. dotenv
2. express
3. mongoose
4. nodemon
5. pug

### DB Used
Mongodb Atlas Cloud database

### How to run in local system?

1. Nodejs should be installed already
2. Clone repo from the above git link
3. Type ```npm install``` to install the dependencies
4. Create a ```config.env``` file in the root folder with the below details
```
BASE_URL="assignment-3"
DB_PASS = <YOUR_MONGO_ATLAS_PASSWORD>
DB_NAME = <YOUR_MONGO_ATLAS_DB_NAME>
DB_BASE_URL =<YOUR_MONGO_ATLAS_DB_URL_WITH_REPLACEMENT_TOKEN> **
```
4. Save the file
5. Open console and got to the folder
6. type ```npm start``` in the console and hit enter
7. Open ```http://127.0.0.1:3000/``` in a browser.

** Like ```mongodb+srv://someusername:<PASSWORD>@cluster0.sbgxh.mongodb.net/<DBNAME>?retryWrites=true&w=majority```
