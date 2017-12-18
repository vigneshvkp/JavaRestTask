angular.module('WebUIManagerApp')
/** 
 * directive used for customInputBox  */
.directive('customInputBox', ['$timeout','$rootScope', function ($timeout,$rootScope) {
	return {
		restrict: 'E',
		require: 'ngModel',
		/** isolated scope for directive */
		scope: {
			/**
			 *  name value should be direct value that should be added to name attribute*/
			name:"@",
			ngModel: '=ngModel',
			title: '=',
			/**
			 *  the value should be either true or false/
			 *  scope variable from controller  */
			isRequired: "=",
			maxLengthLimit:"=",
			/**
			 * the value should be either true or false/set the scope variable from controller */
			isReadOnly:"=",
			setFocus:"=",
			error:"=",
			changeMethod:"&",
			blurMethod:"&",
			isNumberEnabled: "=",
			isAmountEnabled:"=",
			isNumberWithCommaEnabled:"=",
			isNegativeNumberWithCommaEnabled:"=",
			blurMethodParam :"=",
			placeHolderName :"@",
			fieldType :"@",
			isReconcileAmountEnabled : "=",
			classForBlur : "=",
			allowNegative : "=",
			amountLength : "@"
		},
		link: function(scope, element, attrs,ngModelController) {
			element.bind('keypress',function(event){
				if(event.keyCode == 45 && attrs.allowNegative == "false"){
					event.preventDefault();
				}
				if (event.which === 13) {
					scope.methodForBlurEvent();
				} 
			});
			scope.methodForChangeEvent = function(){
				if(scope.changeMethod) {
					ngModelController.$setViewValue(scope.ngModel);
					ngModelController.$render();
					scope.changeMethod();
				}
			}
			scope.methodForBlurEvent = function(){
				if(!scope.isReadOnly) {
					if(scope.blurMethod) {
						ngModelController.$setViewValue(scope.ngModel);
						ngModelController.$render();
						scope.blurMethod();
					}
				}
			}
			scope.$watch('ngModel',function(newvalue,oldvalue){
				if(newvalue){
					scope.methodForChangeEvent();
				}				
			})
	},
	template:function(tElement, tAttrs){
		return '<input id={{name}} '+(tAttrs.isNumberEnabled== "true" ? "numbers-only" : tAttrs.isAmountEnabled == "true" ? "is-amount" : tAttrs.isNumberWithCommaEnabled == "true" ? "numbers-with-commas":tAttrs.isNegativeNumberWithCommaEnabled == "true"?"negative-numbers-with-commas":"") + ' ng-class="{\'required-error\': error,\'text-right\': ' +(tAttrs.isNumberEnabled||tAttrs.isAmountEnabled||tAttrs.isNumberWithCommaEnabled||tAttrs.isNegativeNumberWithCommaEnabled)+ ',\'blur-class\':'+(tAttrs.classForBlur == "true")+'}" ng-blur="methodForBlurEvent()" ng-change="methodForChangeEvent()"'+
		'focus-me="setFocus" '+(tAttrs.isNumberEnabled == "true" || tAttrs.isAmountEnabled == "true" || tAttrs.isNumberWithCommaEnabled == "true" || tAttrs.isNegativeNumberWithCommaEnabled == "true"? "maxlength={{maxLengthLimit}}" : "ng-maxlength={{maxLengthLimit}}")+' class="form-control custom-placeholder" ng-model="ngModel" title={{title}} ng-required="isRequired" amount-length ="amountLength"'+
		'name={{name}} '+(tAttrs.placeHolderName != undefined ? "placeholder ='{{placeHolderName}}'" : "") + (tAttrs.fieldType ? "type ='{{fieldType}}'" : "text") + ' ng-readonly="isReadOnly"></input>';
	}		
};
}])