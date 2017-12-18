app.register.controller('ProductsController',
		['$rootScope', '$scope', '$log', '$state', 'urlConstants', '$timeout', 'breadcrumbService', 'CommonDataService', 'ErrorService',
			function ($rootScope, $scope, $log, $state, urlConstants, $timeout, breadcrumbService, CommonDataService, ErrorService) {

	breadcrumbService.breadcrumb(["Products"]);

	var productsVm = this;
	productsVm.productName = "";
	productsVm.sampleProducts = [];

	CommonDataService.callServer('products', success);
	function success(response) {
		if(response.type && response.type == "Exception") {
			notification = ErrorService.generateCustomError("002", response.messageToDisplay, 'common');
			ErrorService.displayNotification(notification);
		}
		else {
			ErrorService.removeAllNotifications();
			productsVm.sampleProducts = response.product;
		}
	}
	
	$scope.passCode = function(productCode){
		$rootScope.prodCode = productCode;
	}
	
	productsVm.exit = function() {
		ErrorService.removeAllNotifications();
		$state.go('home');
	}
	
}]);