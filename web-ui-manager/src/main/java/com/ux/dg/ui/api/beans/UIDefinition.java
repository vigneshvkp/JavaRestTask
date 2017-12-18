package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "UIDefinition")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class UIDefinition {
	
	public Screens Screens;

	@XmlElement(name = "Screens")
	public Screens getScreens() {
		return Screens;
	}

	public void setScreens(Screens screens) {
		Screens = screens;
	}
}
