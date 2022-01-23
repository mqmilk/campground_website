# campground_website
After npm install, create a .env file with the MAPBOX_TOKEN in the main folder, and connect to the mongoose database(In the code, you treat your computer as local server for mongoose database), you should be able to go to http://localhost:3000/.
You can CRUD(create, read, update, delete) the campgrounds in the website, and authentication and authorization are needed for some features(like create new campground, leave a review for a campground, delete a campground, or delete a existed review). For the uploaded files(images), you use your computer as a local server to save them and when you delete an image, the related saved file will be deleted in the backend as well. Mapbox is used to locate the campgrounds, and you can see and click on the map to link to the specific map you want to check.
