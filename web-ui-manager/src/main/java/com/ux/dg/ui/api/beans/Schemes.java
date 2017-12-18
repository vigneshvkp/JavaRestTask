package com.ux.dg.ui.api.beans;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Schemes {

	public List<Scheme> scheme = new ArrayList<>();
	
	@XmlElement
	public List<Scheme> getScheme() {
		return scheme;
	}
	
	public void setScheme(List<Scheme> scheme) {
		this.scheme = scheme;
	}
}
