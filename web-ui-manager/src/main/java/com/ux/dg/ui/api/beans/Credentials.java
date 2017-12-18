package com.ux.dg.ui.api.beans;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Credentials {
	
	List<Credential> credential = new ArrayList<>();

	@XmlElement
	public List<Credential> getCredential() {
		return credential;
	}

	public void setCredential(List<Credential> credential) {
		this.credential = credential;
	}

}
