angular.module('WebUIManagerApp')
/** 
 * directive used for customDropDown  */
.directive('customDropDown', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		require: 'ngModel',
		/** isolated scope for directive */
		scope: {
			/**
			 *  name value should be direct value that should be added to name attribute*/
			name:"@",
			placeHolderValue:"@",
			ngModel: '=',
			/**
			 *  the value should be either true or false/
			 *  scope variable from controller  */
			isRequired: "=",
			/**
			 * the value should be either true or false/set the scope variable from controller */
			isReadOnly:"=?",
			setFocus:"=?",
			error:"=?",
			isSearchPage:"=?",
			changeMethod:"&",
			blurMethod:"&",
			selectMethod:"&",
			list:"=?",
			key:"@",
			allowClear:'=',
			isMultiple: "=?",
			 isMultipleDisplay: "=",
             displayKey : "@",
			checkByIndex:"=?",
			allowAll : "=?",
			clearSearchTextBox : "=?"
		},
		link: function(scope, element, attrs,ngModel) {
			attrs.$observe('dynamiclist',function(newvalue){
				if(newvalue){
					scope.list = JSON.parse(newvalue);
				}
			})
			scope.methodForChangeEvent = function(){
				var val = scope.key;
				if(scope.changeMethod){
					ngModel.$setViewValue(scope.ngModel);
					ngModel.$render();
					scope.changeMethod();
				}
			}
			scope.methodForBlurEvent = function(){
				if(scope.blurMethod){
					ngModel.$setViewValue(scope.ngModel);
					ngModel.$render();
					scope.blurMethod();
				}
			}
			/**
			 * watches for changes in list and recreates the dropdown list */
			scope.$watch('list',function(newvalue,oldvalue){
				if (!scope.select2Initialized) return;
				if(newvalue){
					$timeout(function() {
						if(newvalue instanceof Array == false){
							if(Object.keys(newvalue).length != 0){
								scope.list = [newvalue];
							}
						}
						angular.element(element).find('select').select2('destroy');
						angular.element(element).find('select').select2({
							placeholder: scope.placeHolderValue ? scope.placeHolderValue:"",
									allowClear: scope.allowClear == undefined ? true: scope.allowClear, 
											minimumResultsForSearch: scope.clearSearchTextBox == true ? Infinity:'' //minimumResultsForSearch: ''
						}).on("select2:selecting", function(e) {
							scope.setSelected = true;
						}).on("select2:blur", function (e) {
							scope.methodForBlurEvent();
						});
						if(scope.error){
							angular.element(element).find('.select2-selection').addClass('required-error');
						}
						scope.select2Initialized = true;
						if(scope.setFocus){
							angular.element(element).find('.select2-selection').trigger('focus');
						}
					});
				}else{
					scope.ngModel = {};
				}
			},true)


			/** watches for focus attribute and focus select */
			scope.$watch('setFocus',function(newvalue,oldvalue){
				$timeout(function () {
					if(newvalue){
						angular.element(element).find('.select2-selection').trigger('focus');
					}
				});
			})
			var test = true;
			/**
			 * watches for the ngModel and updates the change */
			scope.$watch('ngModel',function(newvalue,oldvalue){
				if(newvalue == null){
					$timeout(function() {
						angular.element(element).find('select').trigger('change');
						angular.element(element).find('.select2-selection__rendered').attr('title','');
						scope.methodForChangeEvent();
					});
				}
				if(JSON.stringify(newvalue) !== JSON.stringify(oldvalue)){
					scope.valueLoaded = true;
				}else{
					scope.valueLoaded = false;
				}
				if(newvalue){
					if(scope.valueLoaded || (scope.isMultiple != true && Object.keys(newvalue).length == 0)){
							$timeout(function() {
								angular.element(element).find('select').trigger('change');
								scope.methodForChangeEvent();
							});	
						
					}else{
						$timeout(function() {
							angular.element(element).find('select').trigger('change.select2');
						});
					}
				}
				$timeout(function() {
					angular.element('.select2-selection__clear').attr('title','Clear');
				}); 
			})
			/** watches for focus attribute and focus select */
			scope.$watch('error',function(newvalue,oldvalue){
				if(newvalue){
					angular.element(element).find('.select2-selection').addClass('required-error');
				}else{
					angular.element(element).find('.select2-selection').removeClass('required-error');
				}
			})


			/** watches for focus attribute and focus select */
			scope.$watch('isReadOnly',function(newvalue,oldvalue){
				if(newvalue){
					angular.element(element).find('select').select2('destroy');
					angular.element(element).find('select').prop('disabled', true);
					angular.element(element).find('select').select2();
				}else{
					angular.element(element).find('select').select2('destroy');
					angular.element(element).find('select').prop('disabled', false);
					angular.element(element).find('select').select2({
						placeholder: "",
						allowClear: scope.allowClear == undefined ? true: scope.allowClear, 
					    minimumResultsForSearch: scope.clearSearchTextBox == true ? Infinity:''
					});
				}
			})
			angular.element(document).ready(function () {
				angular.element(element).find('select').select2({
					placeholder: "",
					allowClear: scope.allowClear == undefined ? true: scope.allowClear, 
					minimumResultsForSearch: scope.clearSearchTextBox == true ? Infinity:''// minimumResultsForSearch: ''
				});
				scope.select2Initialized = true;
			});
		},
		template: function(tElement,tAttrs){
			 if(tAttrs.isMultipleDisplay == "true"){
       		  return '<select focus-me="setFocus"  multiple="multiple" class="form-control custom-select" ng-model="ngModel" ng-class="{\'required-error\': error}" '+
                 'ng-change="methodForChangeEvent()" ng-required="isRequired" name={{name}} ' +(tAttrs.key == undefined ? "ng-options='val for val in list track by val'" : (tAttrs.key.indexOf('.')!= -1) && (tAttrs.key.indexOf('[')== -1) ? 
                              "ng-options='val[key1][key2] for val in list track by val[key1][key2]'" : "ng-options='val[displayKey] for val in list track by val[key]'") + '><option></option></select>'; 		  
			 }
			 else if(tAttrs.isMultiple == "true"){
				return '<select focus-me="setFocus"  multiple="multiple" class="form-control custom-select" ng-model="ngModel" ng-class="{\'required-error\': error}" '+
				' ng-required="isRequired" name={{name}} ' +(tAttrs.key == undefined ? "ng-options='val for val in list track by val'" : (tAttrs.key.indexOf('.')!= -1) && (tAttrs.key.indexOf('[')== -1) ? 
						"ng-options='val[key1][key2] for val in list track by val[key1][key2]'" : "ng-options='val[key] for val in list track by val[key]'") + '><option></option></select>'; 		  
			}else{
				return '<select focus-me="setFocus"  class="form-control custom-select" ng-model="ngModel" ng-class="{\'required-error\': error,\'sub_filter\':isSearchPage}" '+
				' ng-required="isRequired" name={{name}} ' +(tAttrs.key == undefined ? "ng-options='val for val in list track by val'" : (tAttrs.key.indexOf('.')!= -1) && (tAttrs.key.indexOf('[')== -1) ? 
						"ng-options='val[key1][key2] for val in list track by val[key1][key2]'" : (tAttrs.checkByIndex == "true")?"ng-options='val[key] for val in list'":"ng-options='val[key] for val in list track by val[key]'") + '><option></option></select>'; 
			}
		},
		controller: function($scope){
			if($scope.key && $scope.key.indexOf('.') != -1) {
				var keys = $scope.key.split('.');
				$scope.key1 = keys[0];
				$scope.key2 = keys[1];
			}
			$scope.haveMultipleValues = function(){
				if($scope.isMultiple){
					return "multiple";
				}else{
					return "";
				}
			}
		}
	};
}])
