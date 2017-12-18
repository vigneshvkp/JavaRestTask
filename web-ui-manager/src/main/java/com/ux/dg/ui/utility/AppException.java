package com.ux.dg.ui.utility;

/**
 * Class to map application related exceptions
 * 
 * @author amacoder
 *
 */
public class AppException extends Exception {

	private static final long serialVersionUID = 1L;

	Integer status;
		
	/** message type */	
	String type;
	
	/** detailed error description to display*/
	String messageToDisplay;	
	
	/**
	 * 
	 * @param status
	 * @param code
	 * @param message
	 * @param developerMessage
	 * @param link
	 */
	public AppException(int status, String type,
			String messageToDisplay) {
		this.status = status;
		this.type = type;
		this.messageToDisplay = messageToDisplay;
	}

	public AppException() { }

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMessageToDisplay() {
		return messageToDisplay;
	}

	public void setMessageToDisplay(String messageToDisplay) {
		this.messageToDisplay = messageToDisplay;
	}



					
}