(function () {
  'use strict';
var app = angular.module('i18nCustomDirective', ['angular-cache']);

/** This method will append the i18n label in to the dom element
  * @param {object} element the dom element object
  * @param {string} i18nValue the i18n label text
  * @param {service} $compile the angularJS $compile service
  * @param {object} scope the directive level scope object
  */	
function appendI18nContent(element, i18nValue,$compile, scope, dynamicObject) {
	i18nValue = replaceDynamicValue(dynamicObject, i18nValue);
	var managedContent;
    managedContent = angular.element('<span>' + i18nValue + '</span>');
    element.html('');
    element.append(managedContent.contents());
	$compile(element.contents())(scope);
}

/** This method will append the i18n Title or Tool tip in to the attribute
 * @param {object} element the dom element object
 * @param {object} attr the attribute
 * @param {string} key the attribute key
 * @param {string} value the i18n title value
 */	
function appendI18nToolTipContent(element, attr, key, value, tooltipObject) {
	value = replaceDynamicValue(tooltipObject, value);
    element.attr(key, value);
    attr.$set(key, value);
}

/** This method will replace the dynamic values with the orignial text
 * @param {Array} array of dynamic values 
 * @param {string} value the i18n title value
 */	
function replaceDynamicValue(dynamicObject, value) {
	if(dynamicObject.dynaValue) {
  		var curMatch;
  		var rxp = /{([^}]+)}/g;
  		var count = 0;
		while(curMatch = rxp.exec(value)) {
			value = value.replace('{' + curMatch[1] + '}', dynamicObject.dynaValue[count]);
			count++;
		}
	}
	return value;
}

/** This method will append the client side i18n message with list of message argument passed and show the notification
 * @param {object} messages the list of messages to show in the notification
 * @param {service} widgetsNotificationService the notification service to show message banner
 * @param {string} messageType the type of notification whether success or error message
 */	
function appendDynaMessage(messages, widgetsNotificationService, messageType) {
	var messageList = [];
	var rxp = /{([^}]+)}/g;
	var curMatch;
	angular.forEach(messages, function(value, index) {
		var count = 0;
		while(curMatch = rxp.exec(value.messageKey)) {
			value.messageKey = value.messageKey.replace('{' + curMatch[1] + '}', value.dynaMessage[count]);
			count ++;
		}
		if (messageList.indexOf(value.messageKey) == -1) {
			messageList.push(value.messageKey);
		}
	});
	widgetsNotificationService.reset();
	if(messageType == 'success'){
		widgetsNotificationService.addSuccessNotification(messageList);
	}else if(messageType == 'warning'){
		widgetsNotificationService.addWarningNotification(messageList);
	}else{
		widgetsNotificationService.addErrorNotification(messageList);
	}
}

/** This service will load the bundle file to cache and return the territory specific text for mentioned key */
app.service('i18nCacheService', function (CacheFactory, $http, $q, i18nConfiguration) {
    return {
   	/** @param {string} bundle the bundle name
      * @param {string} key the message key
   	  * @param {string} locale the territory language code 
   	  * @returns : return the promise */
      i18n: function (bundle, key, locale) {
    	  // console.log('bundle', bundle, key, locale);
    	  if (!CacheFactory.get(bundle)) {
    	      CacheFactory.createCache(bundle, {
    	        deleteOnExpire: 'aggressive',
    	        recycleFreq: 60000
    	      });
    	    }
		  var location;
    	  if (i18nConfiguration.localeSpecification == 'folder') {
    		  location = './app/shared/resources/language/' + locale + '/' + bundle + '.properties';
		  } else if (i18nConfiguration.localeSpecification == 'file') {
			  location = './app/shared/resources/language/' + bundle + '_' + locale + '.properties';
		  } else {
			  location = './app/shared/resources/language/' + locale + '/' + bundle +  '/bundle.properties';
		  }
    	  var bundleCache = CacheFactory.get(bundle);
    	  var deferred = $q.defer();
          $http.get(location, { cache: bundleCache }).success(function (data) {
        	  if (key instanceof Array) {
        		  angular.forEach(key, function(value, index) {
        			  var validationMessage = data[value.messageKey];
    	        	  if (validationMessage == undefined | validationMessage == "") {
    	        		  deferred.reject(key);
    	        	  } else {
    	        		  value.messageKey = validationMessage;
    	        	  }
  				});
        		  deferred.resolve(key);
        	  } else {
	        	  var LabelValue = data[key];
	        	  if (LabelValue == undefined | LabelValue == "") {
	        		  deferred.reject(key);
	        	  } else {
	                  deferred.resolve(LabelValue);
	        	  }
        	  }
          }).error(function (data) {
        	  deferred.reject(key);
        	  });
        return deferred.promise;
        }
    };
  });

/** This service will call cache service and get territory specific message and pass to notification service */	
app.service('i18nMessageService', ['i18nCacheService', 'widgetsNotificationService', 'i18nConfiguration', '$locale', function (i18nCacheService, widgetsNotificationService, i18nConfiguration, $locale) {
	return {
	   	/** @param {string} bundle the bundle name
	      * @param {string} key the message key
	   	  * @param {string} messageType the notification type like success, error, warning 
	   	  * @returns : return the promise */
		clientMessage : function (bundle, key,messageType) {
			var defaultLanguage = i18nConfiguration.defaultLanguageCode;
			var territoryLanguage =  defaultLanguage;
			if (i18nConfiguration.languageSelection == 'explicit' && i18nConfiguration.languageCode != '') {
				territoryLanguage = i18nConfiguration.languageCode;
			} else {
				territoryLanguage = $locale.id;
			}
			var promise = i18nCacheService.i18n(bundle, key, territoryLanguage);
        	promise.then(function (content) {
        		appendDynaMessage(content, widgetsNotificationService, messageType);
            }, function (key) {
            	var promise = i18nCacheService.i18n(bundle, key, defaultLanguage);
            	promise.then(function (content) {
            		appendDynaMessage(content, widgetsNotificationService, messageType);
                }, function (key){
                	appendDynaMessage(key, widgetsNotificationService, messageType);
                }, null);
            }, null);
		}
	};
}]);

/** This directive will generate the territory specific label on html page
 * @param {service} i18nCacheService the i18n cache service implementation
 * @param {service} $compile the angularJS compile service
 */	
app.directive('i18nText', ['i18nCacheService', '$compile', 'i18nConfiguration', '$locale', function (i18nCacheService, $compile, i18nConfiguration, $locale) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
          scope.$watch(attr.i18nText, function (value) {
			var defaultLanguage = i18nConfiguration.defaultLanguageCode;
			var territoryLanguage =  defaultLanguage;
			if (i18nConfiguration.languageSelection == 'explicit' && i18nConfiguration.languageCode != '') {
				territoryLanguage = i18nConfiguration.languageCode;
			} else {
				territoryLanguage = $locale.id;
				console.log($locale.id);
			}
            if (value && value.bundle && value.key) {
            	var promise = i18nCacheService.i18n(value.bundle, value.key, territoryLanguage);
            	promise.then(function (content) {
            		appendI18nContent(element, content,$compile, scope, value);
                }, function (key) {
                	var promise = i18nCacheService.i18n(value.bundle, value.key, defaultLanguage);
                	promise.then(function (content) {
                		appendI18nContent(element, content,$compile, scope, value);
                    }, function (key){
                    	appendI18nContent(element, key,$compile, scope, value);
                    }, null);
                }, null);
            }
          }, true);
        }
      };
}]);

/** This directive will generate the territory specific tooltip or title for button or image on html page
 * @param {service} i18nCacheService the i18n cache service implementation
 */	
app.directive('i18nToolTip', ['i18nCacheService', 'i18nConfiguration', '$locale', function (i18nCacheService, i18nConfiguration, $locale) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
        	scope.$watch(attr.i18nToolTip, function (attributes) {
			var defaultLanguage = i18nConfiguration.defaultLanguageCode;
			var territoryLanguage =  defaultLanguage;
			if (i18nConfiguration.languageSelection == 'explicit' && i18nConfiguration.languageCode != '') {
				territoryLanguage = i18nConfiguration.languageCode;
 			} else {
				territoryLanguage = 'en-gb';
				console.log($locale.id);
			}
                angular.forEach(attributes, function (value, key) {
                  if (value && value.bundle && value.key) {
                  	var promise = i18nCacheService.i18n(value.bundle, value.key, 'en-gb');
                  	promise.then(function (content) {
                  		appendI18nToolTipContent(element, attr, key, content, value);
                      }, function (keyText) {
                      	var promise = i18nCacheService.i18n(value.bundle, value.key, defaultLanguage);
                      	promise.then(function (content) {
                      		appendI18nToolTipContent(element, attr, key, content, value);
                          }, function (keyText){
                        	  appendI18nToolTipContent(element, attr, key, keyText, value);
                          }, null);
                      }, null);
                  }
                });
              }, true);
        }
      };
}]);

/**
 * The notifications controller.
 */
function NotificationsCtrl($scope, widgetsNotificationService) {
	$scope.notifications = widgetsNotificationService.getNotifications();
	$scope.$watch('notifications',function(newValue,oldValue){
		if(newValue){
			$('.widgets-notifications').width($('.right-inner-content').width());
			$('.modal-dialog .widgets-notifications').width($('.modal-dialog .inner-content').width());
			setTimeout(function(){
				if($(".widgets-notifications .alert-success").length != 0){
					$(".widgets-notifications .alert-success").css({'display' : ''}); 
					$(".widgets-notifications .alert-success").fadeOut(4000); 	
				}
				
			}, 1);
			setTimeout(function(){
//				$(".widgets-notifications .alert-success").css('display','block'); 
//				$(".widgets-notifications .alert-success").remove(); 
			}, 20000);
		}
	},true)
	$scope.removeNotification = function (notification) {
		widgetsNotificationService.closeNotification();
	};
}

NotificationsCtrl.$inject = ['$scope', 'widgetsNotificationService'];

/**
 * The directive to render the notifications.
 */
app.directive('widgetsNotifications', [function () {
	return {
		restrict: 'EC',
		replace: true,
		template:function(tElement, tAttrs){
			return "<div ng-show='notifications[0].message && Object.keys(notifications[0].message).length != 0'><span ng-bind='Object.keys(notifications[0].message).length'/>" +
			"<div class=\"alert \" ng-class=\"(notifications[0].type=='success') ? 'alert-success' : (notifications[0].type=='warning') ? 'alert-warning' : 'alert-danger'\" >" +
			"<button type='button' data-ng-click='removeNotification()' class='close' aria-label='Close'>" +
			"<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>" +
			"<h5 id='message'class='message' data-ng-repeat='(key,value) in notifications[0].message track by key'><span ng-if='value.isServerMessage' ng-bind='value.message'/><span ng-if='!value.isServerMessage' data-i18n-text=\"{bundle:'{{value.bundleName}}'!=''?'{{value.bundleName}}':'common', key:'{{value.messageKey}}'," +
			"dynaValue:('{{value.dynaMessage}}'!='')?value.dynaMessage:'[]'"+
			"}\" /></h5><span>{{value.bundleName}}</span></div></div>";
		},
		controller: NotificationsCtrl
	};
}]);

app.service('widgetsNotificationService', ['$sce', function ($sce) {
    var notifications = [];
	var self = this;
    /**
     * Removes all notifications.
	 */
	 this.reset = function () {
	     notifications.length = 0;
	 };
	
	 /**
	  * Returns the notifications.
	  */
	 this.getNotifications = function () {
	     return notifications;
	 };

	 /**
	  * Adds a success notification.
	  * @param msg The msg to display in the notification
	  * @returns The notification
	  */
	  this.addSuccessNotification = function (msg, age) {
	      var result = {type: 'success', message: msg, age: age || 0};
		  notifications.push(result);
		  return result;
	  };
							    
	  /**
	   * Adds an error notification.
	   * @param msg The msg to display in the notification
	   * @returns The notification
	   */
	  this.addErrorNotification = function (msg, age) {
	      var result = {type: 'error', message: msg, age: age || 0};
		  notifications.push(result);
		  return result;
	  };
	  
	  /**
	   * Adds an error notification.
	   * @param msg The msg to display in the notification
	   * @returns The notification
	   */
	  this.addWarningNotification = function (msg, age) {
	      var result = {type: 'warning', message: msg, age: age || 0};
		  notifications.push(result);
		  return result;
	  };
		
								
	  /**
	   * Removes a notification.
	   * @param notification The notification to remove
	   */
	  this.removeNotification = function (notification) {
	      var index = notifications.indexOf(notification);
		  if (index !== -1) {
		      notifications.splice(index, 1)[0].removed = true;
		  }
	  };
	  
	  /**
	   * Removes a notification.
	   * @param notification The notification to remove
	   */
	  this.closeNotification = function () {
		  var notificationArray = self.getNotifications();
			if(!notificationArray)
				notificationArray = [];
			var notification = '';
			angular.forEach(notificationArray, function(value, index) {
				notification = value;
			});
			self.removeNotification(notification);
	  };
	
	  /**
	   * Removes the notifications that are old.
	   */
	  this.tick = function () {
	      var toRemove = [],
		  me = this;
		  angular.forEach(notifications, function (notification) {
		  if (notification.age <= 0) {
		      toRemove.push(notification);
		  } else {
		      notification.age = notification.age - 1;
		  }
	      });
		  angular.forEach(toRemove, function (notification) {
		      me.removeNotification(notification);
		  });
		  };
}]);

app.constant('i18nConfiguration',{
});

}());

