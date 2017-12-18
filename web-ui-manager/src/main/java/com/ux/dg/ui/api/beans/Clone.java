package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "clone")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Clone {
	
	public String cloneFromCode;
	public String cloneFromSchemeCode;
	public String cloneFromDescription;
	public String cloneFromFile;
	public String cloneCode;
	public String cloneDescription;
	public String cloneName;
	public String cloneEffectiveFrom;
	public String cloneEffectiveTo;
	public String cloneCurrentRevision;
	public String lifeCycleStatus;
	public String cloneReason;
	public String cloneFile;
	
	@XmlElement(name = "cloneFromCode")
	public String getCloneFromCode() {
		return cloneFromCode;
	}
	public void setCloneFromCode(String cloneFromCode) {
		this.cloneFromCode = cloneFromCode;
	}
	@XmlElement(name = "cloneFromSchemeCode")
	public String getCloneFromSchemeCode() {
		return cloneFromSchemeCode;
	}
	public void setCloneFromSchemeCode(String cloneFromSchemeCode) {
		this.cloneFromSchemeCode = cloneFromSchemeCode;
	}
	@XmlElement(name = "cloneFromDescription")
	public String getCloneFromDescription() {
		return cloneFromDescription;
	}
	public void setCloneFromDescription(String cloneFromDescription) {
		this.cloneFromDescription = cloneFromDescription;
	}
	@XmlElement(name = "cloneFromFile")
	public String getCloneFromFile() {
		return cloneFromFile;
	}
	public void setCloneFromFile(String cloneFromFile) {
		this.cloneFromFile = cloneFromFile;
	}
	@XmlElement(name = "cloneCode")
	public String getCloneCode() {
		return cloneCode;
	}
	public void setCloneCode(String cloneCode) {
		this.cloneCode = cloneCode;
	}
	@XmlElement(name = "cloneDescription")
	public String getCloneDescription() {
		return cloneDescription;
	}
	public void setCloneDescription(String cloneDescription) {
		this.cloneDescription = cloneDescription;
	}
	@XmlElement(name = "cloneName")
	public String getCloneName() {
		return cloneName;
	}
	public void setCloneName(String cloneName) {
		this.cloneName = cloneName;
	}
	@XmlElement(name = "cloneEffectiveFrom")
	public String getCloneEffectiveFrom() {
		return cloneEffectiveFrom;
	}
	public void setCloneEffectiveFrom(String cloneEffectiveFrom) {
		this.cloneEffectiveFrom = cloneEffectiveFrom;
	}
	@XmlElement(name = "cloneEffectiveTo")
	public String getCloneEffectiveTo() {
		return cloneEffectiveTo;
	}
	public void setCloneEffectiveTo(String cloneEffectiveTo) {
		this.cloneEffectiveTo = cloneEffectiveTo;
	}
	@XmlElement(name = "cloneCurrentRevision")
	public String getCloneCurrentRevision() {
		return cloneCurrentRevision;
	}
	public void setCloneCurrentRevision(String cloneCurrentRevision) {
		this.cloneCurrentRevision = cloneCurrentRevision;
	}
	@XmlElement(name = "lifeCycleStatus")
	public String getLifeCycleStatus() {
		return lifeCycleStatus;
	}
	public void setLifeCycleStatus(String lifeCycleStatus) {
		this.lifeCycleStatus = lifeCycleStatus;
	}
	@XmlElement(name = "cloneReason")
	public String getCloneReason() {
		return cloneReason;
	}
	public void setCloneReason(String cloneReason) {
		this.cloneReason = cloneReason;
	}
	@XmlElement(name = "cloneFile")
	public String getCloneFile() {
		return cloneFile;
	}
	public void setCloneFile(String cloneFile) {
		this.cloneFile = cloneFile;
	}
	
	
}
