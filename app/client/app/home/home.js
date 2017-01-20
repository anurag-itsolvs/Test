var ifaceChatApp = angular.module('home',[
]);


ifaceChatApp.config(['$stateProvider', function ($stateProvider){


    $stateProvider

        .state('home', {
            // login state. This state will contain multiple views
            url:'/home',
            views:{
                
                '':
                {
                    templateUrl:'client/app/home/home.html',
                    controller: 'homeCtrl'
                }

            }


        })
}]);

ifaceChatApp.controller('homeCtrl',['$scope','loginService','$compile','$timeout','$http', function ($scope,loginService, $compile, $timeout, $http) {
    console.log("working homeCtrl");
    angular.element('body').addClass('bg-white');


     var URLS = {
        FETCH : 'client/assets/json/thoughts.json'
    };



    $scope.print =function(argument) {
        console.log("aaa")
        var pageBody = angular.element('body').html();
        var printContent = angular.element('#print_content').html();
        angular.element('body').html(printContent)  
        window.print()
          
        var $bind_in_angular = angular.element('body').html(pageBody)
        $compile($bind_in_angular)($scope)

    }

    

    $timeout(function(){

        $scope.currentDate = {};

        $scope.setDate =function (current_date) {
        
        $scope.currentDate.date = moment(current_date).format('D');
        $scope.currentDate.day = moment(current_date).format('dddd');
        $scope.currentDate.month = moment(current_date).format('MMMM');
        $scope.currentDate.year = moment(current_date).format('YYYY');

        console.log($scope.currentDate.date)
        console.log($scope.currentDate.month)

        $http.get(URLS.FETCH)
            .then(function(response) {
                $scope.thoughts = response.data;
                console.log($scope.thoughts)

                if($scope.currentDate.month === "January"){
                    if($scope.thoughts.hasOwnProperty("January")){
                        for(var i=0; i< $scope.thoughts.January.length; i++){
                          if($scope.thoughts.January[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.January[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "February"){
                    if($scope.thoughts.hasOwnProperty("February")){
                        for(var i=0; i< $scope.thoughts.February.length; i++){
                          if($scope.thoughts.February[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.February[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "March"){
                    if($scope.thoughts.hasOwnProperty("March")){
                        for(var i=0; i< $scope.thoughts.March.length; i++){
                          if($scope.thoughts.March[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.March[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "April"){
                    if($scope.thoughts.hasOwnProperty("April")){
                        for(var i=0; i< $scope.thoughts.April.length; i++){
                          if($scope.thoughts.April[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.April[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "May"){
                    if($scope.thoughts.hasOwnProperty("May")){
                        for(var i=0; i< $scope.thoughts.May.length; i++){
                          if($scope.thoughts.May[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.May[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "June"){
                    if($scope.thoughts.hasOwnProperty("June")){
                        for(var i=0; i< $scope.thoughts.June.length; i++){
                          if($scope.thoughts.June[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.June[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "July"){
                    if($scope.thoughts.hasOwnProperty("July")){
                        for(var i=0; i< $scope.thoughts.July.length; i++){
                          if($scope.thoughts.July[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.July[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "August"){
                    if($scope.thoughts.hasOwnProperty("August")){
                        for(var i=0; i< $scope.thoughts.August.length; i++){
                          if($scope.thoughts.August[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.August[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "September"){
                    if($scope.thoughts.hasOwnProperty("September")){
                        for(var i=0; i< $scope.thoughts.September.length; i++){
                          if($scope.thoughts.September[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.September[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "October"){
                    if($scope.thoughts.hasOwnProperty("October")){
                        for(var i=0; i< $scope.thoughts.October.length; i++){
                          if($scope.thoughts.October[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.October[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "November"){
                    if($scope.thoughts.hasOwnProperty("November")){
                        for(var i=0; i< $scope.thoughts.November.length; i++){
                          if($scope.thoughts.November[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.November[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
                if($scope.currentDate.month === "December"){
                    if($scope.thoughts.hasOwnProperty("December")){
                        for(var i=0; i< $scope.thoughts.December.length; i++){
                          if($scope.thoughts.December[i].date === $scope.currentDate.date){
                            $scope.thought = $scope.thoughts.December[i].thought
                            console.log($scope.thought);
                          }
                            
                        }
                    }
                }
            });

        


        $scope.$apply()
        
        }

    $('#calendar').datepicker({
        inline: true,
        numberOfMonths: 2,
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        onSelect: function(dateText, inst) { 
          var dateAsString = dateText; //the first parameter of this function
          var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method

          $scope.setDate(dateAsObject)
       }
    });

    var current_date =  $('#calendar').datepicker( "getDate" );
        $scope.setDate(current_date)

        
    })
    

    var left_mid_content = "<ul>";
    for(var i=1; i<16; i++){
        left_mid_content +="<li><span class='number'>"+i+".</span><input type=text class='content_row'  size='70' maxlength='70'/></li>"
    }
    left_mid_content += "</ul>";
    var $bind_in_angular = angular.element('#thoughts_and_ideas').html(left_mid_content)
    $compile($bind_in_angular)($scope);



    var thank_you_note_content = "<ul>";
    for(var i=1; i<4; i++){
        thank_you_note_content +="<li><span class='number'>"+i+".</span><input type=text class='content_row'  size='70' maxlength='70'/></li>"
    }
    thank_you_note_content += "</ul>";
    var $bind_in_angular = angular.element('#thank_you_note').html(thank_you_note_content)
    $compile($bind_in_angular)($scope);


    
    var five_before_eleven_content = "<ul>";
    for(var i=1; i<6; i++){
        five_before_eleven_content +="<li><span class='number'>"+i+".</span><input type=text class='content_row'  size='70' maxlength='70'/></li>"
    }
    five_before_eleven_content += "</ul>";
    var $bind_in_angular = angular.element('#five_before_eleven_box').html(five_before_eleven_content)
    $compile($bind_in_angular)($scope);





    var connections_content = "<ul>";
    for(var i=1; i<4; i++){
        connections_content +="<li><span class='number'>"+i+".</span><input type=text class='content_row'  size='70' maxlength='70'/></li>"
    }
    connections_content += "</ul>";
    var $bind_in_angular = angular.element('#connections').html(connections_content)
    $compile($bind_in_angular)($scope);



    var challenges_content = "<ul>";
    for(var i=1; i<7; i++){
        challenges_content +="<li><span class='number'>"+i+".</span><input type=text class='content_row'  size='70' maxlength='70'/></li>"
    }
    challenges_content += "</ul>";
    var $bind_in_angular = angular.element('#challenges').html(challenges_content)
    $compile($bind_in_angular)($scope);



    var what_i_spent_content = "<ul>";
    for(var i=1; i<4; i++){
        what_i_spent_content +="<li><span class='number'>"+i+".</span><input type=text class='content_row'  size='70' maxlength='70'/></li>"
    }
    what_i_spent_content += "</ul>";
    var $bind_in_angular = angular.element('#what_i_spent').html(what_i_spent_content)
    $compile($bind_in_angular)($scope);


}]);

ifaceChatApp.factory('homeService', ['$http', '$q', function ($http, $q) {
    return {
        login: function (userData) {

            var deferred = $q.defer();

            $http.post('/home', {sessionKey: sessionKey, UserID: sessionUserID}).success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                console.log("There is some connection error!");
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
}]);