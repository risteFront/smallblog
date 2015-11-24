angular.module('myApp.post',['ngRoute','firebase'])

.controller('PostCtrl',['$scope','$http','$firebaseArray',function($scope,$http,$firebaseArray){
	  var ref = new Firebase('https://smallblog.firebaseio.com/post');
	  $scope.posts = $firebaseArray(ref);
	  console.log($scope.posts);

	  $scope.showEditForm = function(post){

	   $scope.showEdit = true;

        $scope.id     = post.$id;
	  	$scope.title = post.title;
	  	$scope.description =post.description;
	  	$scope.username = post.username;


	  }

	    $scope.editFormSubmit = function(){
	   	console.log("edit form");
	   	var id = $scope.id;
	   	var record = $scope.posts.$getRecord(id);

	   	record.title          = $scope.title;
	   	record.description    = $scope.description;
	   	record.username       = $scope.username;
	   	console.log($scope.title)

	   	$scope.posts.$save(record).then(function(ref){
	   		console.log(ref.key);

	   		clearField()

	   		$scope.showEdit = false;
	   	})
	   }

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

	  $scope.deleteForm = function(post){
	  	$scope.posts.$remove(post);
	  }

	  function clearField(){
	   	$scope.title="";
	   	$scope.description="";
	   	$scope.username="";
	   }

}])