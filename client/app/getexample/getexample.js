angular.module('getexample',[

])

.factory('GetExternalData', ['$resource', 'envService', function($resource, envService) {

  return $resource(envService.read('apiUrl') + '/staticpath/:action/:slug/', {slug:'@slug'}, 
  {
    update: {
        method: 'PUT',
        params: {action:'actionexample'}
    }
  });

}])

.controller('ExternalDataCtrl', ['$stateParams', '$scope', function($stateParams, $scope) {
    
// Put your logic in here, SCOPE will grant you can access then from your view.
    $scope.slug = $stateParams.slug;
    $scope.extdata = 'EXTERNAL DATA.';
    $scope.seo.title = 'Quick Start | Get Example';
    $scope.seo.description = 'Angular 1 quick start - Get Example.';
    $scope.seo.breadcrumb = [];
    $scope.seo.indextag = "noindex, nofollow";

}]);