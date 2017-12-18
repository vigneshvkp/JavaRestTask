package com.ux.dg.ui.utility;

import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ErrorMessage {
	
	/** contains the same HTTP Status code returned by the server */
	@XmlElement(name = "status")
	int status;
	
	@XmlElement(name = "type")
	String type;
	
	@XmlElement(name = "messageToDisplay")
	String messageToDisplay;	

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
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

	public ErrorMessage(Exception ex) {
		this.status = Response.Status.NOT_FOUND.getStatusCode();
		this.type = "File Not Found";
	}
	
	public ErrorMessage(AppException ex) {
		try {
			this.status = Response.Status.NOT_FOUND.getStatusCode();
			this.type = ex.getType();
			this.messageToDisplay = ex.getMessageToDisplay();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public ErrorMessage() {}
}
