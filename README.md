# campground_website
You need to run npm install.
For development purpose, create a .env file with the MAPBOX_TOKEN and DB_URL(the mongo Atlas url for your server. For test, you can use local computer as server) in the main folder. To deploy the app, you set up the enviroment.
Run node app.js(in the main directory), you should be able to check the website on http://localhost:3000/.
You can CRUD(create, read, update, delete) the campgrounds in the website, and authentication and authorization are needed for some features(like create new campground, leave a review for a campground, delete a campground, or delete a existed review). For the uploaded files(images), you use your computer as a local server to save them and when you delete an image, the related saved file will be deleted in the backend as well. 
Mapbox is used to locate the campgrounds, and you can click on the map to redirect to the specific campground you want to check.
