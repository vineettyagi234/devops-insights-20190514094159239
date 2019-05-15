
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

function initMap() {

        var location = '/api/v1/getWeather?name=' + data;
        var marker;


        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(174.77, -36.85),
          zoom: 12
      });

        var i;
        for(i=0; i < location.lenght; i++){
            marker = new google.maps.Marker({
                    position: new google.maps.LatLng({i}{1},{i}{2}),
                    map:map,

            });

            
            
        }



}

    

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";


    var scr = document.createElement('script');
    scr.setAttribute('src','https://maps.googleapis.com/maps/api/js?key=&callback=initMap');
    scr.setAttribute('type', 'text/javascript');
    document.getElementById('map').appendChild(scr);


    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        
            $http({
                method: "GET",
                url: '/api/v1/getWeather?name=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                } 
            });
        
    };
    
}]);