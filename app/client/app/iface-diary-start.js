var ifaceDiaryApp = angular.module('ifaceDiaryApp', [
	'ui.router',
	'login',
	'registration',
	'home'
	])

ifaceDiaryApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login')

    $stateProvider

        .state('ifacechat', {
            url:'/',
            abstract: true

        });

}]);
