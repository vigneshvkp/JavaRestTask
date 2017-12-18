package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlElement;

public class Variant {
	public String businessDescription;
	public String productCode;
	public String lifecycleStatus;
	public String effectiveFrom;
	public String file;
	
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
	@XmlElement
	public String getProductCode() {
		return productCode;
	}
	@XmlElement
	public String getLifecycleStatus() {
		return lifecycleStatus;
	}
	@XmlElement
	public String getEffectiveFrom() {
		return effectiveFrom;
	}
	
	public void setBusinessDescription(String businessDescription) {
		this.businessDescription = businessDescription;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	public void setLifecycleStatus(String lifecycleStatus) {
		this.lifecycleStatus = lifecycleStatus;
	}
	public void setEffectiveFrom(String effectiveFrom) {
		this.effectiveFrom = effectiveFrom;
	}
}
