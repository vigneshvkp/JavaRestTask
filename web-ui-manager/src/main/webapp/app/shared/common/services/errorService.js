app.service("ErrorService",['$log','widgetsNotificationService',function($log,widgetsNotificationService) {
	var self = this;
	this.currentNotifications = {};

	this.checkIfKeyEmpty = function(inputString,alternateKey){
		if(inputString && inputString != ''){
			return inputString;
		}else{
			return alternateKey;
		}
	}

	/*
	 * method which is to be invoked to handle server side error messages
	 * @param1: response form server 
	 * @param2 : current list of notifications
	 * @param3:key to be set when no key from response
	 * @returns notifications that are displayed*/
	this.displayServerError = function(response,currentNotifications,customKey){
		try{
			var notifications = {};
			var message = {};
			var messageKey = '';
			var descriptionKey = '';
			var propertykey = '';
			if(currentNotifications && Object.keys(currentNotifications).length != 0){
				notifications = currentNotifications;
			}
			if(response.ks){
				message = response.ks.msg.msg;
				propertykey = '_propName';
				descriptionKey = '_desc';
			}else if(response.KoukiaServlet){
				message = response.KoukiaServlet.Message.Message;
				propertykey = 'propertyName';
				descriptionKey = 'description';
			}
			if(message instanceof Array){
				angular.forEach(message, function(value,key) {
					//messageKey = self.checkIfKeyEmpty(value[propertykey],key); // need to check
					messageKey = value[propertykey] != '' ? value['propertyName'] : value['exceptionType']; // need to change
					notifications[messageKey] = {};
					notifications[messageKey].message = value[descriptionKey];
					notifications[messageKey].isServerMessage = true;
				});
			}else{
				if(customKey){
					messageKey = self.checkIfKeyEmpty(customKey,0);
				}else{
					messageKey = self.checkIfKeyEmpty(message[propertykey],0);
				}
				notifications[messageKey] = {};
				notifications[messageKey].message = message[descriptionKey];
				notifications[messageKey].isServerMessage = true;
			}
			self.displayNotification(notifications);
			return notifications;
		}catch(e){
			$log.error(e);
		}
	}

	/*
	 * method which is to be invoked to display Notifications 
	 * @param1: notification list*/
	this.displayNotification = function(notifications,warningNotification,isWarning,isSuccess){
		try{
			widgetsNotificationService.reset();
			if(isWarning){
				widgetsNotificationService.addWarningNotification(warningNotification);
			}else if(isSuccess){
				widgetsNotificationService.addSuccessNotification(warningNotification);
			}else{
				if( notifications && Object.keys(notifications).length != 0){
					self.currentNotifications = notifications;
					widgetsNotificationService.addErrorNotification(notifications);
				}
			}
			
		}
		catch(e){
			$log.error(e);
		}
	}

	/*
	 * method to generate error 
	 * @param1: key name for the notification
	 * @param2 : message key in bundle file
	 * @return Notification*/
	this.generateCustomError = function(errorKeyname,messageKey,bundle,dynamicParams,currentNotifications){
		var notification = {};
		//if(currentNotifications && Object.keys(currentNotifications).length != 0){
		if(currentNotifications){
			notification = currentNotifications;
		}else{
			notification = self.currentNotifications;
		}
		if(notification[errorKeyname]){
			delete notification[errorKeyname];
			self.currentNotifications = notification; 
		}
		notification[errorKeyname] = {};
		notification[errorKeyname].messageKey = messageKey;
		if(dynamicParams){
			notification[errorKeyname].dynaMessage = dynamicParams;
		}
		notification[errorKeyname].bundleName = bundle;
		return notification;
	}

	/*
	 * method to show warning message
	 * @param1: key name for the notification
	 * @param2: message key in bundle file
	 */
	this.displayWarningMessage = function(keyName,bundleMessageKey,bundle){
		var warningMessage = {};
		warningMessage[keyName] = {};
		warningMessage[keyName].messageKey = bundleMessageKey;
		warningMessage[keyName].bundleName = bundle;
		if(Object.keys(warningMessage).length !=0 ){
			widgetsNotificationService.addWarningNotification(warningMessage);
		}
		return warningMessage;
	}

	/*
	 * method to show success message
	 * @param1: key name for the notification
	 * @param2: message key in bundle file
	 */
	this.displaySuccessMessage = function(keyName,bundleMessageKey,bundle){
		var successMessage = {};
		successMessage[keyName] = {};
		successMessage[keyName].messageKey = bundleMessageKey;
		successMessage[keyName].bundleName = bundle;
		if(Object.keys(successMessage).length !=0 ){
			widgetsNotificationService.addSuccessNotification(successMessage);
		}
		return successMessage;
	}
	
	/*
	 * method to show error message
	 * @param1: key name for the notification
	 * @param2: message key in bundle file
	 */
	this.displayErrorMessage = function(keyName, bundleMessageKey, bundle) {
		var errorMessage = {};
		errorMessage[keyName] = {};
		errorMessage[keyName].messageKey = bundleMessageKey;
		errorMessage[keyName].bundleName = bundle;
		if(Object.keys(errorMessage).length !=0 ){
			widgetsNotificationService.addErrorNotification(errorMessage);
		}
		return errorMessage;
	}

	/*
	 * method to be invoked to remove the notifications if error is resolved
	 * @param1: currentNotificationList
	 * @param2: key of message which is to be removed 
	 **/
	this.removeResolvedError = function(currentNotifications,keyOfMessageToRemove){
		try{
			if(currentNotifications && Object.keys(currentNotifications).length != 0){
				delete this.currentNotifications[keyOfMessageToRemove];
				delete currentNotifications[keyOfMessageToRemove];
				self.displayNotification(currentNotifications);
			}
		}catch(e){
			$log.error(e);
		}
		return currentNotifications;
	}

	/*
	 * method to be invoked to remove all the notifications 
	 * in a page
	 **/
	this.removeAllNotifications = function(){
		try{
			widgetsNotificationService.reset();
			self.currentNotifications = {};
		}catch(e){
			$log.error(e);
		}
	}

	/*
	 * method to invoke on save click event to check required values
	 *  @param1: formObject from controller
	 * @param2: notifications list
	 * @param3: other validation values that are required  */
	this.checkRequiredValueError = function(formObject, currentNotifications, otherValidationParams, domOrder){
		try{
			var notifications = {};
			if(currentNotifications && Object.keys(currentNotifications).length != 0){
				if(domOrder && domOrder.length > 0){
					angular.forEach(Object.keys(currentNotifications),function(value,index){
						angular.forEach(formObject.$error.required,function(formValue,formIndex){
							if(value == formValue.$name){
								delete currentNotifications[value];
							}
						})
					})
				}
				else{
					notifications = currentNotifications;
				}
			}
			if(formObject.$error.required){
				if((formObject.$error.required instanceof Array) && formObject.$error.required.length != 0) {
					if(domOrder && domOrder.length > 0){
						formObject.$error.required = this.changeDomOrder(formObject.$error.required,domOrder);
					}
					
					angular.forEach(formObject.$error.required, function(value, index) {
						if(value.$name){
							if(otherValidationParams.customErrorMessge && otherValidationParams.customErrorMessge[value.$name]) {
								notifications[value.$name] = {'messageKey' : otherValidationParams.customErrorMessge[value.$name]}; 
							}
							else if(otherValidationParams.required && otherValidationParams.required[value.$name]){
								notifications[value.$name] = {'messageKey' : 'required_error', 'dynaMessage' : [otherValidationParams.required[value.$name].displayName]};
							}
						}
					});
					if(otherValidationParams.singleMessage && formObject.$error.required && formObject.$error.required.length > 1){
						notifications['single'] = {'messageKey' : otherValidationParams.singleMessage};
					}
				}else{
					if(otherValidationParams.customErrorMessge && otherValues.customErrorMessge[formObject.$name]) {
						notifications[formObject.$name] = {'messageKey' : otherValues.customErrorMessge[formObject.$name]};
					}
					else {
						notifications[formObject.$name] = {'messageKey' : 'required_error', 'dynaMessage' : [otherValidationParams.required[formObject.$name].displayName]};
					}
				}
			}
			if(domOrder && domOrder.length > 0){
				if(currentNotifications && Object.keys(currentNotifications).length != 0){
					angular.forEach(domOrder,function(domValue,domIndex){
						angular.forEach(Object.keys(currentNotifications),function(value,index){
							if(domValue == value){
								notifications[value] = currentNotifications[value];
							}
						
						})
					})
					
				}
			}
			
			if(Object.keys(notifications).length != 0){
				self.displayNotification(notifications);
			}
			return notifications;
		}catch(e){
			$log.error(e);
		}
	}
	
	this.changeDomOrder = function(requiredArray,fieldOrderArray){
		var required = [];
		angular.forEach(fieldOrderArray,function(fieldOrderValue,index){
			angular.forEach(requiredArray,function(value,index){
				if(fieldOrderValue == value.$name){
					required.push(value);
				}
			})
		})
		return required
	}

	/*
	 * method that is invoked on input field blur event to check maxlength 
	 * @param1: formObject from controller
	 * @param2: notifications list
	 * @param3: other validation values that are required   */
	this.checkMaxLengthError = function(formObject,currentNotifications,otherValidationParams){
		try{
			var notifications = {};
			if(currentNotifications && Object.keys(currentNotifications).length != 0){
				notifications = currentNotifications;
			}
			if(formObject.$error.maxlength) {
				if(formObject.$error.maxlength instanceof Array) {
					angular.forEach(formObject.$error.maxlength, function(value, index) {
						notifications[value.$name] = {'messageKey' : 'max_length_error', 'dynaMessage' : [otherValidationParams.maxlength[value.$name].displayName, otherValidationParams.maxlength[value.$name].length]}; 
					});
				}
				else {
					notifications[formObject.$name] = {'messageKey' : 'max_length_error', 'dynaMessage' : [otherValidationParams.maxlength[formObject.$name].displayName, otherValidationParams.maxlength[formObject.$name].length]};
				}
			}
			if(Object.keys(notifications).length != 0){
				self.displayNotification(notifications);
			}
			return notifications;
		}catch(e){
			$log.error(e);
		}
	}

	/*
	 * method that is invoked on input field blur event to check percentage 
	 * @param1: formObject from controller
	 * @param2: notifications list
	 * @param3: other validation values that are required   */
	this.checkValidPercentage = function(value,keyOfPercentagefield,dynamicValuesInNotifications){
		try{
			var notification = {};
			var parts = value.split(".");
			if (typeof parts[1] == "string" && (parts[1].length == 0 || parts[1].length > 2))
				return false;
			var n = parseFloat(value);
			if (isNaN(n))
				return false;
			if (n < 0 || n > 100)
				return false;
			if(value == "")
				return true;
			return true;
			if(dynamicValuesInNotifications) {
				notification[keyOfPercentagefield] = {'messageKey' : value, 'dynaMessage':dynamicValuesInNotifications};
			}
			else {
				notification[keyOfPercentagefield] = {'messageKey' : value};
			}
			if(Object.keys(notifications).length != 0){
				self.displayNotification(notifications);
			}
			return notifications;
			$log.error(e);
		}catch(e){
			$log.error(e);
		}
	}
	

	/*Validates the number input based on specified length
	 * @param {object} formObject
	 * @param {formValues} object with maximum length and displayName constants 
	 * @param {String} value entered in the input field
	 * returns notification*/
	this.validateNumber = function(form, formValues, inputValue, type) {
		var notification = {};
		try{
			if(inputValue && form) {
				var temp = inputValue.toString().split('.');
				if(!type) {type = form.$name};
				if(temp[0].length > formValues.maxlength[type].intLength) {
					notification[form.$name] = {'messageKey' : 'integer_length_error' , 'dynaMessage' : [formValues.maxlength[type].intLength]};
				}
				else if(temp[1] && temp[1].length > formValues.maxlength[type].precisionLength) {
					notification[form.$name] = {'messageKey' : 'decimal_places_error'};
				}
				if(Object.keys(notification).length != 0){
					self.displayNotification(notification);
				}
			}
			return notification;
		}catch(e){
			$log.error(e);
		}
	};


}]);
