package com.ux.dg.ui.api.beans;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Rules")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Rules {
	
	public List<Rule> Rule;

	@XmlElement(name = "Rule")
	public List<Rule> getRule() {
		return Rule;
	}

	public void setRule(List<Rule> rule) {
		Rule = rule;
	}	
	
}
