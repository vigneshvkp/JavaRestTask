package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Heading")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Heading {
	public String order;
	public String headerText;
	public String headerLevel;
	public String type;
	
	@XmlAttribute(name = "order")
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	@XmlAttribute(name = "headerText")
	public String getHeaderText() {
		return headerText;
	}
	public void setHeaderText(String headerText) {
		this.headerText = headerText;
	}
	@XmlAttribute(name = "headerLevel")
	public String getHeaderLevel() {
		return headerLevel;
	}
	public void setHeaderLevel(String headerLevel) {
		this.headerLevel = headerLevel;
	}
	@XmlAttribute(name = "type")
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
