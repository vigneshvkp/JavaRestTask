package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Scheme {
	public String businessDescription;
	public String productCode;
	public String lifecycleStatus;
	public String effectiveFrom;
	public String file;
	public String schemeCode;
	
	@XmlElement
	public String getSchemeCode() {
		return schemeCode;
	}
	public void setSchemeCode(String schemeCode) {
		this.schemeCode = schemeCode;
	}
	@XmlElement
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	@XmlElement
	public String getBusinessDescription() {
		return businessDescription;
	}
	public void setBusinessDescription(String businessDescription) {
		this.businessDescription = businessDescription;
	}
	@XmlElement
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	@XmlElement
	public String getLifecycleStatus() {
		return lifecycleStatus;
	}
	public void setLifecycleStatus(String lifecycleStatus) {
		this.lifecycleStatus = lifecycleStatus;
	}
	
	@XmlElement
	public String getEffectiveFrom() {
		return effectiveFrom;
	}
	public void setEffectiveFrom(String effectiveFrom) {
		this.effectiveFrom = effectiveFrom;
	}
}
