var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http) {
    console.log("Hello World from controller");

    // $http.get('/contactlist');

    var refresh = function(){
        $http.get('/contactlist').success(function(response){
            console.log("Got data!");
            $scope.contactlist = response;
        });
    };
    refresh();

    //Allows us to take variables here and send it to our template using the $scope variable.
    $scope.addContact = function() {
        $http.post('/contactlist', $scope.contact).success(function(response){
            console.log(response);
            refresh(); //grabs everything from the database again and refreshes and shows
        });
    };

    $scope.remove = function(id){
        console.log(id);
        $http.delete('/contactlist/' + id).success(function(response){
        refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id).success(function(response){
            $scope.contact = response;
        });
    };

    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
          refresh();
        });
    };

    $scope.deselect = function(){
        $scope.contact = "";
    };


}]);
