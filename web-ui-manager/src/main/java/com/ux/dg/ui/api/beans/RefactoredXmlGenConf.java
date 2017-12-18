package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.PROPERTY)
public class RefactoredXmlGenConf {
	
	public String differenceXmlString;
	public String modifiedXmlString;
	public String fileName;
	
	@XmlElement
	public String getDifferenceXmlString() {
		return differenceXmlString;
	}
	public void setDifferenceXmlString(String differenceXmlString) {
		this.differenceXmlString = differenceXmlString;
	}
	@XmlElement
	public String getModifiedXmlString() {
		return modifiedXmlString;
	}
	public void setModifiedXmlString(String modifiedXmlString) {
		this.modifiedXmlString = modifiedXmlString;
	}
	@XmlElement
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	

	
	
}
