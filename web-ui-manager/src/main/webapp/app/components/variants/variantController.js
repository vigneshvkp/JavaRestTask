app.register.controller('variantController',
		['$rootScope', '$scope', '$log', '$state', 'urlConstants', '$timeout', 'breadcrumbService', 'CommonDataService', 'ProductsService', 'ErrorService',
			function ($rootScope, $scope, $log, $state, urlConstants, $timeout, breadcrumbService, CommonDataService, ProductsService, ErrorService) {
	
	breadcrumbService.breadcrumb(["Products", "Manage Products"]);
	
	var variantVM = this;
	variantVM.schemeName = "";
	variantVM.dataResponse = []; 
	variantVM.prodCodeVar = $rootScope.prodCode;
	
	CommonDataService.callServer('products/' + variantVM.prodCodeVar, success);
	
	function success(response) {
		variantVM.dataResponse = [];
		if(response && response.type == "Exception") {
			ErrorService.displayErrorMessage("variantRetrieveFail", response.messageToDisplay, "manageProducts");
		}
		else {
			if(response.product) { 
				variantVM.dataResponse.push(angular.copy(response.product));
			}
			if(response.scheme) {
				if(response.scheme instanceof Array) {
					angular.forEach(response.scheme, function(value, index) {
						variantVM.dataResponse.push(value);
					});
				}
				else {
					variantVM.dataResponse.push(response.scheme);
				}
			}
			if(response.clone) {
				if(response.clone instanceof Array) {
					angular.forEach(response.clone, function(value, index) {
						value.businessDescription = angular.copy(value.cloneFromDescription);
						variantVM.dataResponse.push(value);
					});
				}
				else {
					response.clone.businessDescription = angular.copy(response.clone.cloneFromDescription);
					variantVM.dataResponse.push(response.clone);
				} 
			}
		}
	}
	
	variantVM.clone = function(selectedRecord) {
		ProductsService.setSelectedVariantRecord(selectedRecord);
		$state.go('clones');
	}
	
	$scope.passFileName = function(selectedRecord){
		$rootScope.selectedVariant = selectedRecord.file ? selectedRecord.file : selectedRecord.cloneFile;
	}
	
	variantVM.exit = function() {
		ErrorService.removeAllNotifications();
		$state.go('home');
	}
	
	$scope.callSelenium = function(fileName){
		$rootScope.selectedFileName = fileName;
		$state.go('seleniumEdit');
	}
}]);