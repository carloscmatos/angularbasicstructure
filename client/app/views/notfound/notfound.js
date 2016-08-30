angular.module('notfound', [

])

.factory('Error404', ['$resource', 'envService', function($resource, envService) {
	return $resource(envService.read('apiUrl') + '/getError/:slug/', {slug:'@slug'});
}])

.controller('NotFoundPageCtrl', ['$scope', '$http', '$sce', '$state', '$stateParams', 'Error404', function($scope, $http, $sce, $state, $stateParams, Error404) {

	$scope.seo.title = 'Ouch, route not known.';
	$scope.seo.description = 'This URL is not known, you might be a bit high.';
	$scope.seo.indextag = "noindex, nofollow";	
}]);