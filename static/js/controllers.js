
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

var map;
var markers = [];


function initMap() {

           map = new google.maps.Map(document.getElementById('map'), {
          center:{lat:-36.85, lng:174.77},
          zoom: 8
        });



/*
            map.addListener('click', '$http' ,function(tik, $http) {
            
                $http({
                method: "GET",
                url: '/api/v1/getWeather?lat=' + tik.latLng.lat() +'&lon=' + tik.latLng.lon()
            }).then( function(response) {
            
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;

                point(response.data.lat, response.data.lng);
            });

        });
    */
    
}

            var cityName = document.getElementById('zip1City');
            var weatherDetail = document.getElementById('zip1Weather');
            var click = document.getElementById('map');

            click.addListener('click', function(){

            var xhttp = new XMLHttpRequest();

            ourRequest.onload = function(){
                var ourData = JSON.parse(ourRequest.response.data);
                cityName = ourData.city;
                weatherDetail = ourData.weather;

            };

            xhttp.open("GET", "/api/v1/getWeather?", true);
            xhttp.send();
            });








function point(lat, lon){
    
        marker = new google.maps.Marker({
            position: {lat:parseFloat(lat), lng:parseFloat(lon)},
            map : map
        });

        if(marker.length >4){
            markers.shift().setMap(null);
        }
        markers.push(marker);
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
    scr.setAttribute('src','https://maps.googleapis.com/maps/api/js?key=AIzaSyD7q_2vy-nMQAxHHGUcGpy1_hMZ29q8MmM&callback=initMap');
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
                point(response.data.lat, response.data.lng);
            });
        
    };
    
}]);