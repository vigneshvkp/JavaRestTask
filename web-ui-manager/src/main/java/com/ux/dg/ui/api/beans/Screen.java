package com.ux.dg.ui.api.beans;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Screen")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Screen {
	
	public List<Panel> Panel;
	public String id;
	public String title;
	public PrePhaseRules PrePhaseRules;
	public Heading heading;
	public List<Field> Field;

	@XmlElement(name = "Field")
	public List<Field> getField() {
		return Field;
	}
	public void setField(List<Field> field) {
		Field = field;
	}

	@XmlElement(name = "Heading")
	public Heading getHeading() {
		return heading;
	}

	public void setHeading(Heading heading) {
		this.heading = heading;
	}

	@XmlElement(name = "Panel")
	public List<Panel> getPanel() {
		return Panel;
	}

	public void setPanel(List<Panel> panel) {
		Panel = panel;
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
	
	@XmlElement(name = "PrePhaseRules")
	public PrePhaseRules getPrePhaseRules() {
		return PrePhaseRules;
	}

	public void setPrePhaseRules(PrePhaseRules prePhaseRules) {
		PrePhaseRules = prePhaseRules;
	}

}
