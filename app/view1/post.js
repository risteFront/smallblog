angular.module('myApp.post',['ngRoute','firebase'])
.controller('PostCtrl',['$scope','$http','$firebaseArray',function($scope,$http,$firebaseArray){
	  var ref = new Firebase('https://smallblog.firebaseio.com/post');
	  $scope.posts = $firebaseArray(ref);
	  console.log($scope.posts);

	  $scope.submitForm =function(){
	  	console.log("submit Form");

	  	//Assign Value

	  	if($scope.title){var title =$scope.title}else{var title = null}
	  	if($scope.description){var description =$scope.description}else{var description =null}
	  	if($scope.username){var username =$scope.username}else{var username = null}

	  	$scope.posts.$add({
	  		title:title,
	  		description:description,
	  		username:username
	  	})
	  	.then(function(ref){
	  		var id = ref.key();
	  		console.log("added contact with id :" + id);

	  		clearField();

	  		$scope.postAdded="Successfuly added post";
	  	})	
	  }

	  function clearField(){
	   	$scope.title="";
	   	$scope.description="";
	   	$scope.username="";
	   }
}])