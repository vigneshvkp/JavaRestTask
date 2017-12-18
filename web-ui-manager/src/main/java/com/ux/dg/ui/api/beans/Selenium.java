package com.ux.dg.ui.api.beans;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Selenium")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Selenium {
	public List<Screen> Screen;

	@XmlElement(name = "Screen")
	public List<Screen> getScreen() {
		return Screen;
	}

	public void setScreen(List<Screen> screen) {
		Screen = screen;
	}	
}
