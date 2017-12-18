/**
 * dircetive that is used for input fields which allows only numbers to be entered*/
angular.module('WebUIManagerApp').directive('numbersOnly', function(){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
		modelCtrl.$parsers.push(function (inputValue) {
			// this next if is necessary for when using ng-required on your input. 
			// In such cases, when a letter is typed first, this parser will be called
			// again, and the 2nd time, the value will be undefined
			if (inputValue == undefined)
				return '';
			var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
			if (transformedInput!=inputValue) {
				modelCtrl.$setViewValue(transformedInput);
				modelCtrl.$render();
			}         

			return transformedInput;         
		});
	}
	};
});

/**
 * Directive which is used for the decimal field validations
 * */
angular.module('WebUIManagerApp').directive('numbersWithCommas', function () {
	function addCommaToIntegers(val){
		val=""+val;
		var commas, wholeNumbers;  
		wholeNumbers = val.replace(/(\.\d+)$/, '');
		commas = wholeNumbers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		return "" + commas ;
	};
	return {
		restrict:'A',
		require: 'ngModel',
		link: function (scope,element,attrs, modelCtrl) {
		scope.$watch('ngModel', function(inputValue,oldValue) {
			if(inputValue){
				if (inputValue == undefined)
					return '';
				inputValue = inputValue.replace(/[,]/g,"");
				var arr = String(inputValue).split("");
				if (arr.length === 0) return;
				if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
				if (arr.length === 2 && inputValue === '-.') return;
				if (isNaN(inputValue)) {
					scope.ngModel = oldValue;
				}
				inputValue = inputValue.split('.')[0];
				transformedInput = inputValue;
				var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
				if (transformedInput!=inputValue) {
					scope.ngModel = transformedInput;
				}               
				if (isNaN(transformedInput.replace(/[,.]/g,""))||transformedInput.replace(/[,.]/g,"")==="") {
					scope.ngModel = oldValue;  
				}
				if(!isNaN(transformedInput)&&!element.is(':focus')){
					scope.ngModel=addCommaToIntegers(scope.ngModel);
				}
			}
		});
		element.bind('blur',function(){
			if(typeof scope.ngModel==="string"?scope.ngModel.replace(/[-.]/g,"")!=="":false){
				scope.ngModel = scope.ngModel.replace(/^0+/, '');
				scope.ngModel=scope.ngModel.replace(/[,]/g,"");
				scope.ngModel=addCommaToIntegers(scope.ngModel);
			}
			else scope.ngModel="";
			scope.$applyAsync();
		});
		element.bind('focus',function(){
			if(!scope.ngReadonly) {
				if(typeof scope.ngModel==="string"){
					scope.ngModel=scope.ngModel.replace(/[,]/g,"");
				}
				scope.$applyAsync();
			}
		});           
		element.bind('keydown',function(event){
			if(event.keyCode==188 || event.keyCode == 190 || event.keyCode == 110){
				event.preventDefault();
			}
		});
	},
	scope:{
		ngModel : "=",
		ngReadonly : "="
	}
	};
});

/**
 * Directive which is used for the decimal field validations
 * */
angular.module('WebUIManagerApp').directive('negativeNumbersWithCommas', function () {
	function addCommaToIntegers(val){
		val=""+val;
		var commas, wholeNumbers;  
		wholeNumbers = val.replace(/(\.\d+)$/, '');
		commas = wholeNumbers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		return "" + commas ;
	};
	return {
		restrict:'A',
		require: 'ngModel',
		link: function (scope,element,attrs, modelCtrl) {
		scope.$watch('ngModel', function(inputValue,oldValue) {
			if(inputValue){
				if (inputValue == undefined)
					return '';
				inputValue = inputValue.replace(/[,]/g,"");
				var arr = String(inputValue).split("");
				if (arr.length === 0) return;
				if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
				if (arr.length === 2 && inputValue === '-.') return;
				if (isNaN(inputValue)) {
					scope.ngModel = oldValue;
				}
				inputValue = inputValue.split('.')[0];
				transformedInput = inputValue;
//				var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
				if (transformedInput!=inputValue) {
					scope.ngModel = transformedInput;
				}               
				if (isNaN(transformedInput.replace(/[,.]/g,""))||transformedInput.replace(/[,.]/g,"")==="") {
					scope.ngModel = oldValue;  
				}
				if(!isNaN(transformedInput)&&!element.is(':focus')){
					scope.ngModel=addCommaToIntegers(scope.ngModel);
				}
			}
		});
		element.bind('blur',function(){
			if(typeof scope.ngModel==="string"?scope.ngModel.replace(/[-.]/g,"")!=="":false){
				scope.ngModel=scope.ngModel.replace(/[,]/g,"");
				scope.ngModel=addCommaToIntegers(scope.ngModel);
			}
			else scope.ngModel="";
			scope.$applyAsync();
		});
		element.bind('focus',function(){
			if(!scope.ngReadonly) {
				if(typeof scope.ngModel==="string"){
					scope.ngModel=scope.ngModel.replace(/[,]/g,"");
				}
				scope.$applyAsync();
			}
		});           
		element.bind('keydown',function(event){
			if(event.keyCode==188){
				event.preventDefault();
			}
		});
	},
	scope:{
		ngModel : "=",
		ngReadonly : "="
	}
	};
});


/**
 * Directive which is used for the decimal field validations
 * */
angular.module('WebUIManagerApp').directive('isNumber', function () {
	return {
		restrict:'A',
		link: function (scope) {	
		scope.$watch('ngModel', function(newValue,oldValue) {
			if(newValue){
				var arr = String(newValue).split("");
				if (arr.length === 0) return;
				if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
				if (arr.length === 2 && newValue === '-.') return;
				if (isNaN(newValue)) {
					scope.ngModel = oldValue;
				}
			}
		});
	},
	scope:{
		ngModel : "="
	}
	};
});


/**
 * Directive which is used for the decimal field validations
 * */
angular.module('WebUIManagerApp').directive('isAmount', function ($filter) {
	return {
		restrict:'A',
		link: function (scope,element) {                
		scope.$watch('ngModel', function(newValue,oldValue) {
			if(newValue){
				newValue = newValue.replace(/[,]/g,"");
				var arr = String(newValue).split("");
				if (arr.length === 0) return;
				if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
				if (arr.length === 2 && newValue === '-.') return;
				if (isNaN(newValue)) {
					scope.ngModel = oldValue;
				}
			}
		});
		element.bind('blur',function(){
			if(scope.ngModel != "" && !scope.ngReadonly){ 
				if(scope.amountLength != undefined){
					scope.ngModel = $filter('number')(scope.ngModel,scope.amountLength)
					scope.$applyAsync();
				}
				else{
					scope.ngModel = $filter('number')(scope.ngModel,6)
					scope.$applyAsync();
				}
				
			}
		});
		element.bind('focus',function(){
			if(!scope.ngReadonly) {
				if(typeof scope.ngModel==="string"){
					scope.ngModel=scope.ngModel.replace(/[,]/g,"");
				}
				scope.$applyAsync();
			}
		});                           
		element.bind('keydown',function(event){
			if(event.keyCode==188){
				event.preventDefault();
			}
		});
	},
	scope:{
		ngModel : "=",
		ngReadonly : "=",
		amountLength : "="
	}
	};
})
.directive('radioDisabled', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			function DoPrevent(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			attrs.$observe('radioDisabled', function(value) {
				if(value == "true" || value == true){
					scope.checkvalue = false;
					 angular.element(document).ready(function () {
						 $timeout(function(){
								angular.element(element).parent().find('label').addClass('hide-radio');
							},500);
					    });
					 if(angular.element(element).parent().hasClass('custom-radio-button') == false) {
							angular.element(angular.element(element).parent()).on('click', DoPrevent);
							scope.updated = 0;
							scope.$watch('ngModel', function(newvalue,oldvalue) {
								if(newvalue != oldvalue && oldvalue != undefined && !scope.checkvalue) {
									if(scope.updated == 0) {
										scope.ngModel = oldvalue;
										scope.updated++;
									} else {
										scope.ngModel = newvalue;
										scope.updated--;
										checkvalue = true;
									}					
								}
							});
						 }
//					angular.element(element).attr('disabled',true);
//					angular.element(element).off('click').on("click", function(){
//						return false;
//					});
				}else{
					angular.element(element).parent().find('label').removeClass('hide-radio');
					 if(angular.element(element).parent().hasClass('custom-radio-button') == false) {
						 scope.checkvalue = true;
						 angular.element(angular.element(element).parent()).off('click', DoPrevent);
					 }
//					angular.element(element).attr('disabled',false);
				}
			});
		},
		scope: {
			ngModel: '='
		}
	};
}]);

