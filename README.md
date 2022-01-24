# campground_website
You need to run npm install.
For development purpose, create a .env file  in the main folder with the MAPBOX_TOKEN for mapbox. To deploy the app, you have to set up the enviroment by yourself, like the PORT number, the mongo database url in Atlas. For test, we use local computer to create mongoDB and have another url.
Run node app.js(in the main directory), you should be able to check the website on http://localhost:3000/.
You can CRUD(create, read, update, delete) the campgrounds in the website, and authentication and authorization are needed for some features(like create new campground, leave a review for a campground, delete a campground, or delete a existed review). For the uploaded files(images), you use your computer as a local server to save them and when you delete an image, the related saved file will be deleted in the backend as well. 
Mapbox is used to locate the campgrounds, and you can click on the map to redirect to the specific campground you want to check.
