angular.module('WebUIManagerApp')

/**
* directive for date picker used across the app
* Element Directive */
.directive('fieldDatePicker', ['$timeout','$rootScope','$parse','widgetsNotificationService','UtilitiesService', 'ErrorService','TermsAndConditionsService',
                               function ($timeout,$rootScope,$parse,widgetsNotificationService,UtilitiesService, ErrorService,TermsAndConditionsService) {
       return {
              restrict: 'E',
              require: 'ngModel',
              link: function (scope, element, attrs,ngModel) {
//                  scope.ngModel = null;
                     ngModel.$formatters.shift();
                     scope.validDate = false;
                     $(element).find('input').removeClass('date-error');
                     element.bind("keypress", function (event) {
                         if (event.which === 13) {
                    		 event.currentTarget.blur();
                    	 }
                   });
                     /**
                     * watches for the ngModel value of Date if it is Empty removes the date error displayed */
                     scope.$watch('ngModel',function(newvalue,oldvalue){
                    	 
                           if(newvalue == null){
                                  scope.day = "";
                                  scope.month = "";
                                  scope.year = "";
                                  scope.removeError(scope.fieldName + 'dateFormatError');
                                  scope.removeError(scope.fieldName);
                           }
                           if(newvalue==""){
                        	   
                                  scope.showError = false;
                           }else if(newvalue instanceof Date){
                                  var dateArray = moment(scope.ngModel).format('DD/MM/YYYY').split('/');
                                  scope.day = dateArray[0];
                                  scope.month = dateArray[1];
                                  scope.year = dateArray[2];
                                  if (scope.year.length == 4 && scope.year < "1000") {
                                	  scope.addError(scope.fieldName + 'dateFormatError');
                                  }
                                  else{
                                	  scope.removeError(scope.fieldName + 'dateFormatError');
                                	  scope.removeError('effectiveDate');
                                	  scope.removeError(scope.fieldName);
                                  }
                           }else if(newvalue && newvalue != '' && !(newvalue instanceof Object)){
                        	   if(newvalue.indexOf('/') <= 0 ){
                        		 if(scope.inputDate == undefined){
                        			 scope.ngModel = '';
                        		 }
                        	   }else{
                        		   var dateArray = newvalue.split('/');
                                   scope.day = dateArray[0];
                                   scope.month = dateArray[1];
                                   scope.year = dateArray[2];
                                   scope.ngModel =  moment(newvalue,'DD/MM/YYYY');
                                   scope.removeError(scope.fieldName);
                                   scope.removeError(scope.fieldName + 'dateFormatError');
                        	   }
                                  
                           }
                           scope.changeMethod(scope.ngModel);
                     })

                     /**
                     * method to remove the date Error message 
                      * Highlight on field */
                     scope.removeError = function(key){
                           scope.showError = false;
                           var notifications = ErrorService.removeResolvedError(ErrorService.currentNotifications,key);
                     }

                     /**
                     * watches for the variable update from controller used to invoke the date error and highlight 
                      * */
                     scope.$watch('error',function(newValue, oldValue) {
                           if(!newValue){
                                  scope.removeError();
                                  scope.showError = false;
                           }
                           else{
                                  scope.showError = true;
                           }
                     })

                     /**
                     * Method to add the date error when format is being failed */
                     scope.addError = function(key) {
                           scope.showError = true;
                           var notifications = ErrorService.generateCustomError(key,'date_format_failed_error_message','manageTermsAndConditions');
                           $timeout(function(){
                        	   ErrorService.displayNotification(notifications);   
                           })                          
                           scope.ngModel = angular.copy(scope.inputDate);
                     }
                     
                     
                     scope.boxChangeMethod = function(){
                    	  var day = $(element).find('.day').val();
                          var month = $(element).find('.month').val();
                          var year = $(element).find('.year').val();
                          scope.inputDate = day+month+year; 
                          scope.ngModel = angular.copy(scope.inputDate);
                    	 var notifications = ErrorService.removeResolvedError(ErrorService.currentNotifications,scope.fieldName);
                    	 ErrorService.displayNotification(notifications);
                    	 
                     }

                     /**
                     * Validates the date based on the input entered */
                     scope.validateDate = function(boxFormat){
                    	   var testString;
                           var day = $(element).find('.day').val();
                           var month = $(element).find('.month').val();
                           var year = $(element).find('.year').val();
                           scope.inputDate = day+month+year; 
//                           TermsAndConditionsService.setInputDate(scope.inputDate);
//                           TermsAndConditionsService.setDateErrorKey(scope.fieldName);
                           var typedValue = day+month+year;
                           if(day && day.length > 2)
                                  scope.addError(scope.fieldName + 'dateFormatError');
                           if(year && year.length >4)
                        	   scope.addError(scope.fieldName + 'dateFormatError');
                           if(month && month.length > 2)
                        	   scope.addError(scope.fieldName + 'dateFormatError');
                           if(day != '' && month != '' && year != ''){
                                  $(element).find('input.hide').val(typedValue);
                                  scope.inputDate = day+month+year; 
                                  scope.inputDate.replace(/\D/gi,"");
                                  if(/^\d+$/.test(scope.inputDate)){
                                         if (year.length == 2) {
                                                if (year <= 29) {
                                                       year = "20" + year;
                                                } else {
                                                       year = "19" + year;
                                                }             
                                         }
                                         else if ((year == null) || (year.length == 0)) {
                                                year = moment().format('YYYY/MM/DD').split('/')[0];
                                         }else if (year.length == 4 && year < "1000") {
                                                //year = "invalid";
                                        	  scope.addError(scope.fieldName + 'dateFormatError');
                                         }else if (year.length != 4) {
                                                //year ="invalid";
                                        	  scope.addError(scope.fieldName + 'dateFormatError');
                                         }
                                         testString = year+"/"+month+"/"+day;

                                         var inputDate = moment(testString,"YYYY/MM/DD");
                                         if(moment(testString,"YYYY/MM/DD").isValid()){
                                                scope.showError = false;
                                                scope.validDate = true;
                                                scope.ngModel = inputDate._d;
                                                if(typeof scope.changeMethod == 'function')
                                                       scope.changeMethod(scope.ngModel);
                                         }else{
                                        	  scope.addError(scope.fieldName + 'dateFormatError');
                                         }
                                  }else{
                                         if(typedValue != ""){
                                                $(element).find('input.hide').val(typedValue);
                                                scope.showError = true;
                                                scope.initDate = moment()._d;
                                                scope.addError(scope.fieldName + 'dateFormatError');
                                         }
                                         else {
                                        	 scope.removeError(scope.fieldName + 'dateFormatError');
                                         }
                                  }
                           }else{
                                  if(year == "" && month == "" && day  == ""){
                                	  scope.removeError(scope.fieldName + 'dateFormatError');
                                  		 scope.ngModel = '';
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
                     required: '=?',
                     fieldName: '@',
                     focus: '=?',
                     changeMethod : '&',
                     error :'=?',
                     placeHolderName :"@"
              },
              template:function(tElement, tAttrs){
                     return '<div class="input-icon datepicker_position field-date-picker " ><input type="text" ng-keypress="opened=false" name={{fieldName}} '+
                     'class="hide sub_filter form-control custom-placeholder gutter-right-30" ng-blur="validateDate();" ng-change="removeError();showError = false;"  init-date="initDate"'+
                     'datepicker-popup="{{format}}" ng-required="required"'+
                     'ng-model="ngModel"'+ 
                     'is-open="opened" min-date="minDate"'+
                     'max-date="maxDate" datepicker-options="dateOptions"'+
                     'close-text="Close" ><div class="row"><div class="col-md-3 col-xs-2 "><input type="text"  maxlength ="2"  ng-blur="validateDate(\'day\');" ng-change = "boxChangeMethod()"         ng-class="{\'required-error\':showError}" ng-model="day" ng-readonly="fieldDisabled" class="form-control day blur-class" placeholder="DD"></div>'+
                     '<div class="col-md-3 col-xs-2 blur-class"><input type="text"  maxlength ="2" ng-class="{\'required-error\':showError}" ng-blur="validateDate(\'month\');" ng-change = "boxChangeMethod()"                     ng-model="month" ng-readonly="fieldDisabled"  class="form-control month blur-class" placeholder="MM"></div><div class="col-lg-3 col-md-4 col-xs-2 custom-datepicker-width">'+
                     '<input type="text" maxlength ="4" ng-class="{\'required-error\':showError}" ng-blur="validateDate(\'year\');" ng-model="year" ng-change = "boxChangeMethod()"   ng-readonly="fieldDisabled" class="form-control year blur-class" placeholder="YYYY"></div><div class="col-lg-1 col-md-2 col-xs-1"><a ng-hide="fieldDisabled"    class="calender_icon col-md-1"'+
                     'ng-click="openPopup($event)"><i class="date_icon" data-i18n-tool-tip="{title: {bundle: \'common\', key: \'calendar_icon\'}}" >'+
                     '</i></a></div></div>';
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
 
