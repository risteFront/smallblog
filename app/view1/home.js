'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view1/home.html',
    controller: 'HomeCtrl'
  })
  .when('/post',{
  	templateUrl: 'view1/post.html',
  	controller: 'PostCtrl'
  })
}])

.controller('HomeCtrl', [function() {

}])
.controller('PostCtrl'['$scope','$http','$firebaseArray',function($scope,$http,$firebaseArray){
	   var ref = new Firebase('https://smallblog.firebaseio.com/post');
	  $scope.posts = $firebaseArray(ref);
	  console.log($scope.posts);
}])