package com.ux.dg.ui.api.beans;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Panel")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Panel {
	
	public List<Field> Field;
//	public List<FreeText> FreeText;

	public String id;
	public String title;
	public String name;
	public String hasList;
	public String visibilityMode;
	public String visibilityCondition;
	public Heading heading;

	@XmlElement(name = "Heading")
	public Heading getHeading() {
		return heading;
	}

	public void setHeading(Heading heading) {
		this.heading = heading;
	}
	@XmlElement(name = "Field")
	public List<Field> getField() {
		return Field;
	}

	public void setField(List<Field> field) {
		Field = field;
	}
	@XmlAttribute(name = "id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	@XmlAttribute(name = "title")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	@XmlAttribute(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@XmlAttribute(name = "hasList")
	public String getHasList() {
		return hasList;
	}

	public void setHasList(String hasList) {
		this.hasList = hasList;
	}
	@XmlAttribute(name = "visibilityMode")
	public String getVisibilityMode() {
		return visibilityMode;
	}

	public void setVisibilityMode(String visibilityMode) {
		this.visibilityMode = visibilityMode;
	}
	@XmlAttribute(name = "visibilityCondition")
	public String getVisibilityCondition() {
		return visibilityCondition;
	}

	public void setVisibilityCondition(String visibilityCondition) {
		this.visibilityCondition = visibilityCondition;
	}
	
/*	@XmlElement(name = "FreeText")
	public List<FreeText> getFreeText() {
		return FreeText;
	}

	public void setFreeText(List<FreeText> freeText) {
		FreeText = freeText;
	}
*/	
}
