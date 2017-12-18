angular.module('WebUIManagerApp')
/** 
 * directive used for customInputBox*/
.directive('customCheckBox', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		require: 'ngModel',
		 transclude: true,
		/** isolated scope for directive */
		scope: {
			/**
			 *  name value should be direct value that should be added to name attribute*/
			name:"@",
			value:"@",
			ngModel: '=',
			/**
			 * the value should be either true or false/set the scope variable from controller */
			isReadOnly:"=",
			changeMethod:"&",
			isChecked:"@",
			bundleName : "@",
			label : "@",
			focus : "=?"
		},
		link: function(scope, element, attrs,ngModelController) {
			var prevValue;
			function DoPrevent(e) {
				e.preventDefault();
				e.stopPropagation();
			}
			scope.$watch('ngModel', function (newValue, oldValue) {
				if(newValue != ""){
					if(scope.ngModel == "true" || scope.ngModel == "1" || scope.ngModel == "Yes"){
						scope.ngModel = true;
					}
					scope.checked = typeof scope.ngModel == typeof scope.isChecked?scope.ngModel == scope.ischecked : scope.ngModel;
					if(scope.isReadOnly){
						prevValue = oldValue;
					}
				}
			});
			scope.methodForChangeEvent = function(){
				if(scope.isReadOnly){
					scope.ngModel = prevValue;
					return false;
				}
				else if(scope.changeMethod) {
					ngModelController.$setViewValue(scope.ngModel);
					ngModelController.$render();
					scope.changeMethod();
				}
			}
			scope.$watch('isReadOnly',function(newvalue,oldvalue){
				if(newvalue){
					angular.element(element).find('.checkbox-inline').addClass('disable_check');
					angular.element(element).find('.checkbox-inline').on('click', DoPrevent);
				}
				else{
					angular.element(element).find('.checkbox-inline').off('click', DoPrevent);
					angular.element(element).find('.checkbox-inline').removeClass('disable_check');
				}	
			})
		},
		template:function(tElement, tAttrs){
			return '<div class="checkbox checkbox-inline custom-radio-button"><input focus-me="focus" tabindex="0" id="{{checkBoxId}}" type="checkbox" ng-model="ngModel" name={{name}} ng-value={{value}} ng-checked="checked" radio-disabled="{{isReadOnly}}" ng-change="methodForChangeEvent()"></input><label for="{{checkBoxId}}" data-i18n-text="{bundle:\'{{bundleName}}\', key:\'{{label}}\'}"/></div>';
		},
		controller: function($scope) {
			$scope.checked = typeof $scope.ngModel == typeof $scope.isChecked?$scope.ngModel == $scope.ischecked : $scope.ngModel;
			$scope.checkBoxId = "Composer"+(Math.floor(Math.random()*10)+(Math.random()*10));
		}
		
	};
}])