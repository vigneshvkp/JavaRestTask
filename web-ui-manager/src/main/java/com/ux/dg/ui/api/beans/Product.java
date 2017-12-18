package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Product {
	
	public String businessDescription;
	public String productCode;
	public String lifecycleStatus;
	public String effectiveFrom;
	public String file;
	public Schemes schemes;
	
	@XmlElement
	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	@XmlElement
	public Schemes getSchemes() {
		return schemes;
	}

	public void setSchemes(Schemes schemes) {
		this.schemes = schemes;
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

	@XmlElement
	public String getProductCode() {
		return productCode;
	}

	@XmlElement
	public String getBusinessDescription() {
		return businessDescription;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	public void setBusinessDescription(String businessDescription) {
		this.businessDescription = businessDescription;
	}

}
