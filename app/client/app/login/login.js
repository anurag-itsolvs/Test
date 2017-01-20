var ifaceChatApp = angular.module('login',[
]);


ifaceChatApp.config(['$stateProvider', function ($stateProvider){


    $stateProvider

        .state('login', {
            // login state. This state will contain multiple views
            url:'/login',
            views:{
                
                '':
                {
                    templateUrl:'client/app/login/login.html',
                    controller: 'loginCtrl'
                }

            }


        })
}]);

ifaceChatApp.controller('loginCtrl',['$scope','loginService','$state', function ($scope,loginService, $state) {
    console.log("working loginCtrl");
    angular.element('body').addClass('bg-white');

    $scope.loginData = {};

    $scope.login = function(loginData){

        $scope.errorMessage = '';

        console.log(loginData);

        if(loginData.hasOwnProperty('user_name') && loginData.hasOwnProperty('user_password')){

            if(loginData.user_name === 'admin' && loginData.user_password ==='admin#123'){

                $state.go('home')
            }else{
                $scope.errorMessage = "User name and password Incorrect!"
                 $state.go('login')
            }
        }

        
    }

    $scope.ersaedErrorMessage = function(argument) {
        
        $scope.errorMessage = '';
    }
    


}]);

ifaceChatApp.factory('loginService', ['$http', '$q', function ($http, $q) {
    return {
        login: function (userData) {

            var deferred = $q.defer();

            $http.post('/login', {sessionKey: sessionKey, UserID: sessionUserID}).success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                console.log("There is some connection error!");
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
}]);
