var itsApp = angular.module('registration',[
]);


itsApp.config(['$stateProvider', function ($stateProvider){


    $stateProvider

        .state('registration', {
            // registration state. This state will contain multiple views
            url:'/registration',
            views:{

                '':
                {
                    templateUrl:'client/app/registration/registration.html',
                    controller: 'registrationCtrl'
                }

            }


        })
}]);

itsApp.controller('registrationCtrl',['$scope','registrationService','$state', function ($scope,registrationService, $state) {
    console.log("working registrationCtrl");
    angular.element('body').addClass('bg-white');

    $scope.registrationData = {};

    $scope.registration = function(registrationData){

        $scope.errorMessage = '';

        console.log(registrationData);

        if(registrationData.hasOwnProperty('user_name') && registrationData.hasOwnProperty('user_password') &&
            registrationData.hasOwnProperty('user_email') && registrationData.hasOwnProperty('user_phone')){

            if(true){

                $state.go('login')
            }else{
                $scope.errorMessage = "All fields are Required"
                 $state.go('registration')
            }
        }

        
    }

    $scope.ersaedErrorMessage = function(argument) {
        
        $scope.errorMessage = '';
    }


}]);

itsApp.factory('registrationService', ['$http', '$q', function ($http, $q) {
    return {
        registration: function (userData) {

            var deferred = $q.defer();

            $http.post('/registration', {sessionKey: sessionKey, UserID: sessionUserID}).success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                console.log("There is some connection error!");
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
}]);
