# Angular 1 Basic Structure

## Setup
- Clone repo to your local:
    * ```$ git clone https://github.com/carloscmatos/angularbasicstructure.git```  
- Or get the latest .zip file [here](https://github.com/carloscmatos/angularbasicstructure/archive/v1.1.0.zip)

- IMPORTANT - Remove all git files from this repo so you won't mess it!!!!
	* ```$ rm -rf .git```

- Run npm install in the root folder
    * ```$ npm install```
- Run bower install in root folder:
    * ```$ bower install```
- Run gulp to creat dist folder
	* ```$ gulp build_all```
- Run server
	* ```$ node server/app.js```
- Check if everything is runnink OK in your browser
	* ```localhost:8000```


## Coding details

- Your coding folder is [client](./client/app)
- File [index.html](./client/index.html) is where you ui-route is called, if you have any include that goes to every single page, you cann add it here, otherwise, add it in each html.
	* This 
- File [app.js](./client/app/app.js) is where your routes(states) will be, there are three state examples.
	* State otherwise is the one that will keep your path and render your 404 page.
- Inside [views](./client/app/views) create your static views, I usually put there all views that will be called via include in different pages.
- Create your folders according to your funcionalyties (there are 2 examples, main and getexample), main is usually your homepage but it is not mandatory to be called like that.
	* You must keep the module named "app" in the [main.js](./client/app/main/main.js) file
- After you create each module folder, you must include its name in [main.js](./client/app/main/main.js) file
- Put your images in the [image](./client/app/assets/img) folder

- The [index.html](./client/index.html) is ready to receive SEO tags like:
	*```$scope.seo.title = 'Quick Start | Get Example';```
    *```$scope.seo.description = 'Angular 1 quick start - Get Example.';```
    *```$scope.seo.breadcrumb = [];```
    *```$scope.seo.indextag = "noindex, nofollow";```
    *```$scope.seo.canonical = "http://www.angualrquickstart.com.br";```
- Usem them if you wish, otherwise, you can delete them from your [index.html](./client/index.html) file