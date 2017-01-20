var itsApp = angular.module('itsApp', ['ui.router',])

itsApp.config(['$stateProvider', function ($stateProvider) {


    $stateProvider

        .state('login', {
            // people state. This state will contain multiple views
            url: '/login',
            views: {
                // Main template. It will be placed in the ui-view of the people-dashboard-list.tmpl.html file when /dashboard url is
                // visited (relatively named)
                '': {
                    templateUrl: 'client/app/home/user.html',
                    controller: 'userCtrl'
                }
            }


        })
}])


itsApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login')

    $stateProvider

        .state('itscrm', {
            url:'/',
            abstract: true

        });



}]);

itsApp.controller('userCtrl',['$scope','invitationServices', function ($scope, invitationServices) {
    console.log("userCtrl is working");

    $scope.sendForm = function(){

        var name = $scope.user_name
        console.log(name)
        var data = {};

        data.name = name;


    invitationServices.invitation(data)
        .then(function(data) {
            console.log(data);

            var aa  = "<span> API Response is - "+data.data+"</span>"
            $('.response').html(aa)

        },function(err) {
            console.log(err);
        });

    }

    

}]);

itsApp.factory('invitationServices', ['$http', '$q', function ($http, $q) {
    return {
        invitation: function (data) {

            var deferred = $q.defer();

            $http.post('/getData', {data: data}).then(function (data) {
                deferred.resolve(data);
            })

            return deferred.promise;
        }
    }
}])