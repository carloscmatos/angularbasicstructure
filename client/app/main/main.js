angular.module('app')

.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
       
            if(scope.windowWidth < 756){
                angular.element(".last_content_form").css('display','none');
            }else{
                angular.element(".last_content_form").css('display','inline-block');
            }
        }, true);

    }
})

.controller('MainCtrl', ['$scope', '$sce', function ($scope, $sce) {

// Put your data in here, SCOPE will grant you can access then from your view.
    $scope.seo.title = 'Quick Start | Angular 1.X.X Quick Start';
    $scope.seo.description = 'Angular 1 quick start guide with bower and gulp.';
    $scope.seo.breadcrumb = [];
    $scope.seo.indextag = "noindex, nofollow";
    $scope.seo.canonical = "http://www.angualrquickstart.com.br";

}]);