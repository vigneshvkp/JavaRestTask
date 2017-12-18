angular.module('WebUIManagerApp')
/** 
 * directive used for customInputBox  */
.directive('customRadioButton', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		require: 'ngModel',
		/** isolated scope for directive */
		scope: {
			/**
			 *  name value should be direct value that should be added to name attribute*/
			name:"@",
			value:"@",
			id:"@",
			ngModel: '=',
			/**
			 * the value should be either true or false/set the scope variable from controller */
			isReadOnly:"=",
			changeMethod:"&",
			bundleName : "@",
			label : "@",
			checkvalue:"=",
			updateValue : "="
		},
		link: function(scope, element, attrs,ngModelController) {
			function DoPrevent(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			scope.methodForChangeEvent = function() {
				if(scope.isReadOnly)
					scope.checkvalue = false;
				if(scope.changeMethod && !scope.isReadOnly) {
					ngModelController.$setViewValue(scope.ngModel);
					ngModelController.$render();
					scope.changeMethod();
				}
			}
			scope.updated = 0;
			scope.$watch('ngModel', function(newvalue,oldvalue) {
				if(newvalue != oldvalue && scope.isReadOnly && oldvalue != undefined && !scope.checkvalue) {
					if(scope.updated == 0) {
						if(scope.updateValue != false)
						scope.ngModel = oldvalue;
						scope.updated++;
					} else {
						scope.ngModel = newvalue;
						scope.updated--;
						scope.checkvalue = true;
					}					
				}
			});
			scope.$watch('isReadOnly',function(newvalue,oldvalue) {
				if(newvalue) {
					angular.element(element).find('.radio-info').addClass('disable_check');
					angular.element(element).find('.radio-info').on('click', DoPrevent);
				} else {
					angular.element(element).find('.radio-info').off('click', DoPrevent);
					angular.element(element).find('.radio-info').removeClass('disable_check')
				}	
			})	
		},
		template:function(tElement, tAttrs){
			return '<div class="radio radio-info radio-inline custom-radio-button"><input type="radio" ng-model="ngModel" name={{name}} value={{value}} id={{id}} ng-change="methodForChangeEvent();"></input><label data-i18n-text="{bundle:\'{{bundleName}}\', key:\'{{label}}\'}"/></div>';
		},
		controller: function($scope) {
		
		}

	};
}])