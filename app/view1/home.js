'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view1/home.html',
  })
  .when('/post',{
  	templateUrl: 'view1/post.html',
  	controller: 'PostCtrl'
  })
  .when('/login',{
  	templateUrl:'view1/login.html',
  	controller : 'LoginCtrl'
  })
  .when('/signin',{
    templateUrl:'view1/signin.html',
    controller: 'LoginCtrl'
  })
}])

.controller('HomeCtrl', [function() {

}])
