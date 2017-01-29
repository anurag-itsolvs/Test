var itsApp = angular.module('itsApp', [
'ui.router'
]).constant("ENV", "development"); //for production use 'production', for development use 'development'.

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

itsApp.run(['$rootScope', '$anchorScroll','$http' ,'$rootScope', 'ENV', function ($rootScope, $anchorScroll, $http, $rootScope, ENV) {


         if( ENV === 'development' ) {
             console.log('development');

             var URLS = {
                 FETCH : 'client/app/config/development_api_config.json'
             };

             $http.get(URLS.FETCH)
                 .then(function(response) {
                     $rootScope.configData = response.data;
                     console.log($rootScope.configData)
                 });
         }

         if( ENV === 'production' ) {
            console.log('production');

             var URLS = {
                 FETCH : 'client/app/config/production_api_config.json'
             };

             $http.get(URLS.FETCH)
                 .then(function(response) {
                     $rootScope.configData = response.data;
                     console.log($rootScope.configData)
                 });
         }
 }]);


itsApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login')

    $stateProvider

        .state('itscrm', {
            url:'/',
            abstract: true

        });



}]);

itsApp.controller('userCtrl',['$scope','userServices', function ($scope, userServices) {
    console.log("userCtrl is working");

    $scope.sendForm = function(){

        var name = $scope.user_name
        console.log(name)
        $scope.user_name =''
        var data = {};

        data.name = name;
        userServices.insertUser(data)
            .then(function(result) {
                console.log(result);
                console.log(result.data.message)
                var response = result.data.message

                var status = result.data.status;

                var htmlData = '';
                
                
                if(status ===false){
                    htmlData  += "<div class='title'> Error!</div><br/>";
                    htmlData  += "<table class='table table-bordered'>";
                    htmlData  +="<tbody>";
                    htmlData  +="<tr>";
                    htmlData  +="<td>"+response+"</td>";
                    htmlData  +="</tr>";
                    htmlData  +="</tbody>";
                    htmlData  +="</table>";
                }
                else{
                    htmlData  += "<div class='title'> Last inserted user</div><br/>";
                    htmlData  += "<table class='table table-bordered'>";
                    htmlData  +="<thead><tr>";
                    htmlData  +="<th> User Id</th>";
                    htmlData  +="<th> User name </th>";
                    htmlData  +="</thead></tr>";
                    htmlData  +="<tbody>";
                    for(var i=0; i< response.length; i++){
                    
                        htmlData  +="<tr>";
                        htmlData  +="<td>"+response[i].user_pid+"</td>";
                        htmlData  +="<td>"+response[i].user_name+"</td>";
                        htmlData  +="</tr>";
                                
                    }
                    htmlData  +="</tbody>";
                    htmlData  +="</table>";
                }
                
                
                
                $('.response').html(htmlData)

            },function(err) {
                console.log(err);
            });

    }

    $scope.getUserList = function(){

        userServices.getUsers()
            .then(function(result) {
                console.log(result);
                console.log(result.data.message)
                var response = result.data.message

                var htmlData = '';
                htmlData  += "<div class='title'> All users </div><br/>";
                htmlData  += "<table class='table table-bordered'>";
                if(response.length === 0){
                    htmlData  +="<tbody>";
                    htmlData  +="<tr>";
                    htmlData  +="<td>No record found.</td>";
                    htmlData  +="</tr>";
                    htmlData  +="</tbody>";
                    htmlData  +="</table>";
                }
                else{

                    htmlData  +="<thead><tr>";
                    htmlData  +="<th> User Id</th>";
                    htmlData  +="<th> User name </th>";
                    htmlData  +="</thead></tr>";
                    htmlData  +="<tbody>";
                    for(var i=0; i< response.length; i++){
                    
                        htmlData  +="<tr>";
                        htmlData  +="<td>"+response[i].user_pid+"</td>";
                        htmlData  +="<td>"+response[i].user_name+"</td>";
                        htmlData  +="</tr>";
                                
                    }
                    htmlData  +="</tbody>";
                    htmlData  +="</table>";
                }
                
                $('.response').html(htmlData)

            },function(err) {
                console.log(err);
            });
    }

    

}]);

itsApp.factory('userServices', ['$http', '$q','$rootScope', function ($http, $q, $rootScope) {
    var configData = $rootScope.configData;
    return {
        insertUser: function (data) {

            var deferred = $q.defer();

            $http({
                url: configData.apiHost+configData.userApi.insert_users_api_path,
                method: configData.userApi.insert_users_api_method,
                data : data,
                timeout: deferred.promise, // cancel promise, standard thing in $http request
                cancel: deferred // this is where we check for every routing
            }).then(function (data) {
                deferred.resolve(data);
            })

            return deferred.promise;
        },
        getUsers: function () {

            var deferred = $q.defer();

            $http({
                url: configData.apiHost+configData.userApi.get_users_api_path,
                method: configData.userApi.get_users_api_method,
                timeout: deferred.promise, // cancel promise, standard thing in $http request
                cancel: deferred // this is where we check for every routing
            }).then(function (data) {
                deferred.resolve(data);
            })

            return deferred.promise;
        }
    }
}])