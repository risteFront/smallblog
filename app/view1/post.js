angular.module('myApp.post',['ngRoute','firebase'])

.controller('PostCtrl',['$scope','$http','$firebaseArray','$http',function($scope,$http,$firebaseArray,$http){
	  var ref = new Firebase('https://smallblog.firebaseio.com/post');
	  $scope.posts = $firebaseArray(ref);

	  	//display post for every 5 min

	   window.setInterval(function(){

		$http.get('https://smallblog.firebaseio.com/post.json').success(function(data){
       	console.log(data);
       	var array = []
       	for(var prop in data){
       		array.push(data[prop]);
       	}
       	var index = array[Math.floor(Math.random()*array.length)];
       	console.log(index);
        $scope.displayTitle       =index.title 
       	$scope.displayDescription =index.description 
       	$scope.displayUsername    =index.username 
       	
       })
	}, 300000);      
       



	  $scope.showEditForm = function(post){

	   $scope.showEdit = true;
        
        $scope.id          = post.$id;
	  	$scope.title       = post.title;
	  	$scope.description =post.description;
	  	$scope.username    = post.username;


	  }

	    $scope.editFormSubmit = function(){
		var ref = new Firebase("https://smallblog.firebaseio.com/login");
		var authData = ref.getAuth();

		if (authData) {
		  console.log("User " + authData.uid + " is logged in with " + authData.provider);
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
			} else {
				$scope.msg="Plase Login if you want to add post";
				$scope.showMsg = true;
			}
			
  				
		} 
		

	 
	  

	  $scope.submitForm =function(){
	  	var ref = new Firebase("https://smallblog.firebaseio.com/login");
		var authData = ref.getAuth();

		if (authData) {
		  console.log("User " + authData.uid + " is logged in with " + authData.provider);
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
		} else {
			$scope.msg="Plase Login if you want to add post";
			$scope.showMsg = true;
		}

	  	console.log("submit Form");

  	   
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