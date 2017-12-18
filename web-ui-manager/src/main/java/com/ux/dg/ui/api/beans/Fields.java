package com.ux.dg.ui.api.beans;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Fields")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Fields {
	public List<Field> Field;

	@XmlElement(name = "Field")
	public List<Field> getField() {
		return Field;
	}

	public void setField(List<Field> field) {
		Field = field;
	}
}
