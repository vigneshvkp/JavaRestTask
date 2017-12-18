package com.ux.dg.ui.api.beans;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "clones")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Clones {

	List<Clone> clone = new ArrayList<>();

	@XmlElement(name = "clone")
	public List<Clone> getClone() {
		return clone;
	}

	public void setClone(List<Clone> clone) {
		this.clone = clone;
	}
}
