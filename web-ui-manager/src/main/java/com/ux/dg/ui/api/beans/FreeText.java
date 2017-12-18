package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "FreeText")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class FreeText {
	
	public String id;
	public String text;
	public String sortOrder;
	
	
	@XmlAttribute(name = "sortOrder")
	public String getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}
	@XmlAttribute(name = "id")
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@XmlAttribute(name = "text")
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}

}
