app.service('NetworkService', ['$http','$q', '$state','$rootScope', function($http, $q, $state, $rootScope) {

	this.get = function(url, successCallback, errorCallback, param) {
		// $http returns a promise, which has a then function, which also returns a promise

		//Define headers in Options here
		var options = {
				headers: {},
				params: param
		};
		var deferred = $q.defer();
		var promise = $http.get(url,options).then(
			function(response) {
			// The then function here is an opportunity to modify the response
			// The return value gets picked up by the then in the controller.
			if(response.status == 200) {
				deferred.resolve(response.data);
				if(successCallback)
					successCallback(response.data);
			}
		}, function(response) {
			deferred.reject(response);
			if(errorCallback)
				errorCallback(response);
		}).catch(function(e) {
			//alert('Network Error') // To do need to be finalised 	UtilitiesService.throwError(undefined, {message: "Network Error?! [NTWRK-SRVC]", type: "internal"});
		});
		// Return the promise to the data service
		return deferred.promise;
	};

	this.post = function(url, data, successCallback, errorCallback, headers) {
		// $http returns a promise, which has a then function, which also returns a promise
		//Define headers in Options here
		var options = {
				headers: {
					'Content-Type' :  'application/json'
				}
		};
		if(headers) {
			options.headers = headers;
		}
		
		var deferred = $q.defer();
		var promise = $http.post(url, data, options).then(function (response) {
			// The then function here is an opportunity to modify the response
			// The return value gets picked up by the then in the controller.
			if(response.status == 200) {
				deferred.resolve(response.data);
				if(successCallback)
					successCallback(response.data);
			}
		}, function(response){
			deferred.reject(response);
			if(errorCallback) {
				errorCallback(response);
			}
			else {
				alert('Internal Server Error');
			}
			//errorCallback(response);
		}).catch(function(e){
			alert(e); // To do need to be finalised 	UtilitiesService.throwError(undefined, {message: "Network Error?! [NTWRK-SRVC]", type: "internal"});
		});
		// Return the promise to the data service
		return deferred.promise;
	};

}])


//Defered notify - additional implementation possible for logging.