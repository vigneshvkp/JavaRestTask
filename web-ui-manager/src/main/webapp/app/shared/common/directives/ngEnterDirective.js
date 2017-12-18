/**
* Directive watches for enter key press and triggers the functionality 
 * that is mentioned in the ng_enter attribute*/
angular.module('WebUIManagerApp').directive('ngEnter', function ($rootScope) {
      return {
            restrict: 'A',
            link: function (scope, element, attrs) {
	            element.bind("keypress", function (event) {
	                  if (event.which === 13&&document.activeElement.tagName!="BUTTON"&&document.activeElement.tagName!="A") {
	                		scope.eventObject = event.target;
	                		event.target.blur();
//	                	  	$('.datepicker_position input').blur();
	                        if($(event.target).hasClass('blur-class')) {
	                        	event.target.blur();
	                        	$('.blur-class').blur();
	                        }
	                        scope.$apply(function (){ 
	                            scope.$eval(attrs.ngEnter);
	                      	});
	                        event.preventDefault();
	                  }
	            });
      }
      }
});