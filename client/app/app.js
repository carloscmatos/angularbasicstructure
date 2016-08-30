// create a angular module named 'app' - you need to include all other modules you create in this list
angular.module('app', [
	'ngResource',
	'ui.router',
	'rzModule',
	'slickCarousel',
	'angular-md5',
	'environment',
	'notfound',
	'getexample',
	])


.config(function(envServiceProvider) {
	// set the domains and variables for each environment - if you are using GET to retrieve informations
	envServiceProvider.config({
		domains: {
			localhost: ['localhost'],
			development: ['dev.yourwebsite.com'],
			staging: ['staging.yourwebsite.com'],
			production: ['yourwebsite.com, www.yourwebsite.com']
		},
		vars: {
			localhost: {
				apiUrl: 'http://api-dev.yourapiprovider.com.br',
				apiToken: 'apitoken'
			},			
			development: {
				apiUrl: 'http://api-dev.yourapiprovider.com.br',
				apiToken: 'apitoken'
			},
			staging: {
				apiUrl: 'http://api-staging.yourapiprovider.com.br',
				apiToken: 'apitoken'
			},
			production: {
				apiUrl: 'http://api.yourapiprovider.com.br',
				apiToken: 'apitoken'
			}
		}
	});
})

.config(['$httpProvider', 'envServiceProvider', function($httpProvider, envServiceProvider){
	'use strict';

	$httpProvider.interceptors.push(function($q) {
		return {
			'request': function(config) {
				if(config.url != 'http://ipv4.myexternalip.com/json'){
					config.headers['Authorization'] = 'Token ' + envServiceProvider.read('apiToken');
				}
				return config;
			}
		};
	});

}])

.config(['$resourceProvider', function($resourceProvider) {
	'use strict';
  	// Don't strip trailing slashes from calculated URLs
  	$resourceProvider.defaults.stripTrailingSlashes = false;
}])

// router options
.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
	'use strict';
	$locationProvider.html5Mode(true); // allow html5mode routes (no #)
	$urlRouterProvider.otherwise(function($injector, $location){
    	$injector.get('$state').go('404');
	}); // if route not found redirect to /
}])

// Insert your routes here
.config(['$stateProvider', function ($stateProvider) {
	'use strict';

	$stateProvider
		.state('home', { // this is a name for our route
		  url: '/', // the actual url path of the route
		  templateUrl: 'app/main/main.html', // the template that will load
		  controller: 'MainCtrl' // the name of the controller to use
		})
		.state('testeget', { // this is a name for our route
		  url: '/routeexample', // the actual url path of the route
		  templateUrl: 'app/getexample/getexample.html', // the template that will load
		  controller: 'ExternalDataCtrl' // the name of the controller to use
		})		
		// If route is not listed, it show 404 html and uses not found controller
		.state('otherwise', {
		  	url: '/*path',
		  	templateUrl: 'app/views/notfound/404.html',
		  	controller:  'NotFoundPageCtrl',
		});
}])

// after the configuration and when app runs the first time we o some more stuff
.run(['$rootScope', '$state', function ($rootScope, $state) {
	'use strict';
	
	// this is available from all across the app
	$rootScope.appName = 'app';

	// make $state available from templates
	$rootScope.$state = $state;

	// make seo available to all views
	$rootScope.seo = {
		title: '',
		description: '',
		canonical: '',
		breadcrumb: []
	};
}]);


