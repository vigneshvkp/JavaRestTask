var webUIManagerApp = angular.module('WebUIManagerApp');
/**
 * Service to handle the breadcrumb.
 */
webUIManagerApp.service('breadcrumbService', ['$rootScope', '$q', function ($rootScope, $q) {
	var currentBreadcrumb = null,
	currentBreadcrumbLocals = null,
	currentPromise = null;
	/**
	 * Get/Sets the breadcrumb.
	 * @param input The new breadcrumb or if undefined, then works as a getter.
	 */
	this.breadcrumb = function (input, locals) {
		var localPromise;
		if (input !== undefined) {
			localPromise = currentPromise = $q.when(locals);
			currentPromise.then(function (realLocals) {
				if (localPromise === currentPromise) {
					currentBreadcrumb = input;
					currentBreadcrumbLocals = realLocals;
					$rootScope.$broadcast('$breadcrumbChanged', input, realLocals);
					currentPromise = null;
				}
			});
		}
		return currentBreadcrumb;
	};
	this.breadcrumbLocals = function () {
		return currentBreadcrumbLocals;
	};

}]);

/**
 * The directive to add the breadcrumb to the page.
 */
webUIManagerApp.directive('widgetsBreadcrumb', [function () {
	return {
		restrict: 'C',
		templateUrl: 'app/shared/partials/breadcrumb.htm',
		scope: true,
		controller: ['$scope','$rootScope', 'breadcrumbService', 'UtilitiesService', 'RouteProviderConstants',
		             function ($scope,$rootScope, coreBreadcrumbService, UtilitiesService, RouteProviderConstants) {
			$scope.breadcrumb = coreBreadcrumbService.breadcrumb();
			$scope.breadcrumbUrl = {};
			$scope.objectToDisplay = undefined;
			angular.forEach($scope.breadcrumb, function(value, key){
				if(value instanceof Object) {
					$scope.objectToDisplay = value;
				}
				else {

					$scope.breadcrumbUrl[value] = RouteProviderConstants[value];	

				}
			});
			$scope.breadcrumbLocals = coreBreadcrumbService.breadcrumbLocals();
			$scope.showingParent = false;
			$scope.toggleParent = function () {
				$scope.showingParent = !$scope.showingParent;
			};

			$scope.breadCrumbClicked = function(breadcrumbLink) {
				$rootScope.$broadcast('isbreadCrumbClicked',breadcrumbLink);
				//UtilitiesService.setRetrieveMode(''); Since it is not used in the composer
				//UtilitiesService.notificationRemove();
				UtilitiesService.breadcrumbNavigation = true;
				UtilitiesService.breadcrumbLink = breadcrumbLink;

			};
			$scope.$on('$breadcrumbChanged',
					function () {
				$scope.breadcrumb = coreBreadcrumbService.breadcrumb();
				$scope.breadcrumbUrl = {};
				angular.forEach($scope.breadcrumb, function(value, key){
					if(value instanceof Object) {
						$scope.objectToDisplay = angular.copy(value);
						$scope.breadcrumb.splice(key, 1);
					}
					else {
							$scope.breadcrumbUrl[value] = RouteProviderConstants[value];
					}
				});
				$scope.breadcrumbLocals = coreBreadcrumbService.breadcrumbLocals();
				if (!$scope.breadcrumbLocals) {
					$scope.breadcrumbLocals = {};
				}
				$scope.breadcrumbLocals.reload = function () {
					$route.reload();
				};
			});
		}]
	};
}]);
