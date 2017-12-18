angular.module('WebUIManagerApp')

/**
 * directive for date picker used across the app
 * Element Directive */
.directive('customDatePicker', ['$timeout','$parse','widgetsNotificationService','UtilitiesService', 'ErrorService',
                                function ($timeout,$parse,widgetsNotificationService,UtilitiesService, ErrorService) {
	return {
		restrict: 'E',
		require: 'ngModel',
		link: function (scope, element, attrs,ngModel) {
			ngModel.$formatters.shift();
			scope.validDate = false;
			$(element).find('input').removeClass('date-error');

			/**
			 * watches for the ngModel value of Date if it is Empty removes the date error displayed */
			scope.$watch('ngModel',function(newvalue,oldvalue){
				if(newvalue==""){
					scope.dateError = false;
					scope.removeError();
				}
				if(typeof scope.changeMethod == 'function'){
					scope.changeMethod();
				}
			})	

			/**
			 * method to remove the date Error message 
			 * Highlight on field */
			scope.removeError = function(){
				scope.showError = false;
				$(element).find('input').removeClass('date-error');
				ErrorService.removeResolvedError(ErrorService.currentNotifications,scope.fieldName);
			}

			/**
			 * watches for the variable update from controller used to invoke the date error and highlight 
			 * */
			scope.$watch('clearError.value',function(newValue, oldValue) {
				if(newValue){
					$(element).find('input').val('');
					scope.removeError();
					scope.clearError.value = !scope.clearError.value;
				}
			})

			/**
			 * Method to add the date error when format is being failed */
			scope.addError = function() {
				$(element).find('input').addClass('date-error');
				scope.showError = true;
				var notifications = ErrorService.generateCustomError(scope.fieldName,'date_format_failed_error_message');
				ErrorService.displayNotification(notifications);
				scope.ngModel = scope.inputDate._d;
			}
			scope.methodForBlurEvent = function(){
				if(scope.blurMethod) {
					ngModel.$setViewValue(scope.ngModel);
					ngModel.$render();
					scope.blurMethod();
				}
			}

			/**
			 * Validates the date based on the input entered */
			scope.validateDate = function(){
				if($(element).find('input').hasClass('date-error')) {
					scope.removeError();
				}
				scope.inputDate = $(element).find('input').val();
				scope.typedValue = angular.copy(scope.inputDate);
				var temp = scope.typedValue.toString().split('/');
				if(temp.length > '1'){
					var formatedDate = '';
					angular.forEach(temp,function(value,key){
						if(key == '0' || key == '1'){
							if(value.length != '2'){
								value = "0"+value;
							}
						}
						formatedDate = formatedDate+value;
					});
					scope.inputDate = formatedDate;
				}
				scope.inputDate = scope.inputDate.replace(/\D/gi,"");
				if(/^\d+$/.test(scope.inputDate)){
					if(scope.inputDate.length > 8){
						scope.showError = true;
						scope.initDate = moment()._d;
						scope.addError();
					}else{
						var date = scope.inputDate.substr(0,2);
						var month = scope.inputDate.substr(2,2);
						var year = scope.inputDate.substr(4);
						if (year.length == 2) {
							if (year <= 29) {
								year = "20" + year;
							} else {
								year = "19" + year;
							}		
						}
						else if ((year == null) || (year.length == 0)) {
							year = moment().format('YYYY/MM/DD').split('/')[0];
						} 
						else if (year.length == 4 && year < "1000") {
							//year = "invalid";
							scope.addError();
						}
						else if (year.length != 4) {
							//year ="invalid";
							scope.addError();
						}
						var testString = year+"/"+month+"/"+date;
						var inputDate = moment(testString,"YYYY/MM/DD");
						if(moment(testString,"YYYY/MM/DD").isValid()){
							scope.showError = false;
							scope.validDate = true;
							scope.ngModel = inputDate._d;
							scope.methodForBlurEvent();
							if(typeof scope.changeMethod == 'function')
								scope.changeMethod(scope.ngModel);
						}else{
							scope.initDate = moment()._d;
//							$(element).find('input').val('2015').trigger('change');
							$(element).find('input').val(scope.typedValue);
							scope.addError();
						}
					}
				}else{
					if(scope.typedValue != ""){
						scope.showError = true;
						scope.initDate = moment()._d;
						scope.addError();
					}
					else {
						scope.removeError();
					}
				}
			}
		},
		/** isolated scope for directive */
		scope: {
			ngModel: '=',
			ngReadonly: '=?',
			minDate: '=?',
			maxDate: '=?',            
			dateOptions: '=?',
			fieldDisabled: '=?',
			required: '=',
			fieldName: '@',
			focus: '=?',
			changeMethod : '&',
			clearError :'=?',
			placeHolderName :"@",
			showError:'=?',
			blurMethod:'&'
		},
		template:function(tElement, tAttrs){
			return '<div class="input-icon datepicker_position calendertable" ><input type="text" ng-keypress="opened=false" name={{fieldName}} '+
			'class="sub_filter form-control custom-placeholder gutter-right-30" maxlength="10" ng-blur="validateDate();" ng-change="removeError();showError = false;"  init-date="initDate"'+
			'datepicker-popup="{{format}}" ng-required="required"'+
			'ng-model="ngModel" ng-readonly="fieldDisabled"' +(tAttrs.placeHolderName != undefined ? "placeholder ='{{placeHolderName}}'" : "") +' ng-class="{\'required-error\':showError}"'+ 
			'is-open="opened" min-date="minDate" focus-me="focus"'+
			'max-date="maxDate" datepicker-options="dateOptions"'+
			'close-text="Close" > <a ng-hide="fieldDisabled" class="calender_icon"'+
			'ng-click="openPopup($event)"><i class="date_icon" data-i18n-tool-tip="{title: {bundle: \'common\', key: \'calendar_icon\'}}" >'+
			'</i></a></div>';
		},
		controller: function($scope,widgetsNotificationService){
			$scope.initDate = moment()._d;
			$scope.maxDate = new Date(9999, 11, 31);
			$scope.minDate = new Date(1000,0,1);
			// check if it was defined.  If not - set a default            
			$scope.dateOptions = $scope.dateOptions || {
				formatYear: 'yyyy',
				startingDay: 1, 
				showWeeks: false
			};
			$scope.openPopup = function ($event) {
				$('.filterPanel').css('overflow','visible');
				$event.stopPropagation();
				$timeout(function(){
					$('.dropdown-menu .btn-success').trigger('click');
				},3);
				$timeout(function(){
					$scope.opened = true;
				},5);
			};
			$scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			$scope.format = $scope.formats[0];
		}
	};
}]);