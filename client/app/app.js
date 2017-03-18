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
			development: ['localhost'],
			production: ['yourwebsite.com, www.yourwebsite.com']
		},
		vars: {
			development: {
				apiUrl: 'http://api-dev.yourapiprovider.com.br',
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
	$httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
	
	// Code bellow sets all behaviors on all calls, for headers and calls errors tretaments
	$httpProvider.interceptors.push(function($q, $cookies, $location, $rootScope) {
		return {
			'request': function(config) {
				// Configurates header "token" to user in all calls, token is stored in user cookie (check app/login/login.js)
				config.headers['token'] = envServiceProvider.read('apiToken');
				return config;
			},
			'response': function(response) {
				// $location.path('/')

				return response;
			},
			'requestError': function(rejection) {
				// SE ALGUMA CHAMADA REJEITADA, ENVIA PARA LOGIN E REMOVE COOKIE
		     	// $location.path('/');
		     	// $cookies.remove('accessToken');
		     	alert('requestError');

		      return $q.reject(rejection);
		    },
		    'responseError': function(rejection) {
		    	// SE ALGUMA CHAMADA REJEITADA, ENVIA PARA LOGIN E REMOVE COOKIE
		     	// $location.path('/');
		     	// $cookies.remove('accessToken');
		     	alert('responseError');

		      return $q.reject(rejection);
		    },
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
	$urlRouterProvider.otherwise('/');
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


