package com.ux.dg.ui.api.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Field")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class Field {
	
	public Rules Rules;
	public String id;
	public String order;
	public String fieldLabel;
	public String isMandatory;
	public String path;
	public String hasColumn;
	public String readOnly;
	public String widget;
	public String isHidden;
	public String visibilityMode;
	public String visibilityCondition;
	public String defaultValue;
	public String fixedValue;
	public String hideLabel;
	public String labelNewLine;
	public String answerNewLine;
	public String lineAbove;
	public String lineBelow;
	public String helpText;
	public String hintText;
	public String input;
	public String type;
	public String inputType;
	public String length;
	public String valueList;
	public String isChecked;
	public String setCoverageTaken;

	@XmlAttribute(name = "input")
	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	@XmlAttribute(name = "type")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@XmlAttribute(name = "inputType")
	public String getInputType() {
		return inputType;
	}

	public void setInputType(String inputType) {
		this.inputType = inputType;
	}

	@XmlAttribute(name = "length")
	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}

	@XmlAttribute(name = "valueList")
	public String getValueList() {
		return valueList;
	}

	public void setValueList(String valueList) {
		this.valueList = valueList;
	}

	@XmlAttribute(name = "isChecked")
	public String getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(String isChecked) {
		this.isChecked = isChecked;
	}

	@XmlAttribute(name = "order")
	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	@XmlAttribute(name = "setCoverageTaken")
	public String getSetCoverageTaken() {
		return setCoverageTaken;
	}

	public void setSetCoverageTaken(String setCoverageTaken) {
		this.setCoverageTaken = setCoverageTaken;
	}

	
	public String getFixedValue() {
		return fixedValue;
	}

	public void setFixedValue(String fixedValue) {
		this.fixedValue = fixedValue;
	}

	@XmlAttribute(name = "hideLabel")
	public String getHideLabel() {
		return hideLabel;
	}

	public void setHideLabel(String hideLabel) {
		this.hideLabel = hideLabel;
	}

	@XmlAttribute(name = "labelNewLine")
	public String getLabelNewLine() {
		return labelNewLine;
	}

	public void setLabelNewLine(String labelNewLine) {
		this.labelNewLine = labelNewLine;
	}

	@XmlAttribute(name = "answerNewLine")
	public String getAnswerNewLine() {
		return answerNewLine;
	}

	public void setAnswerNewLine(String answerNewLine) {
		this.answerNewLine = answerNewLine;
	}

	@XmlAttribute(name = "lineAbove")
	public String getLineAbove() {
		return lineAbove;
	}

	public void setLineAbove(String lineAbove) {
		this.lineAbove = lineAbove;
	}

	@XmlAttribute(name = "lineBelow")
	public String getLineBelow() {
		return lineBelow;
	}

	public void setLineBelow(String lineBelow) {
		this.lineBelow = lineBelow;
	}

	@XmlAttribute(name = "helpText")
	public String getHelpText() {
		return helpText;
	}

	public void setHelpText(String helpText) {
		this.helpText = helpText;
	}

	@XmlAttribute(name = "hintText")
	public String getHintText() {
		return hintText;
	}

	public void setHintText(String hintText) {
		this.hintText = hintText;
	}

	@XmlElement(name = "Rules")
	public Rules getRules() {
		return Rules;
	}

	public void setRules(Rules rules) {
		Rules = rules;
	}
	
	@XmlAttribute(name = "id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	@XmlAttribute(name = "fieldLabel")
	public String getFieldLabel() {
		return fieldLabel;
	}

	public void setFieldLabel(String fieldLabel) {
		this.fieldLabel = fieldLabel;
	}
	@XmlAttribute(name = "isMandatory")
	public String getIsMandatory() {
		return isMandatory;
	}

	public void setIsMandatory(String isMandatory) {
		this.isMandatory = isMandatory;
	}
	@XmlAttribute(name = "path")
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	@XmlAttribute(name = "hasColumn")
	public String getHasColumn() {
		return hasColumn;
	}

	public void setHasColumn(String hasColumn) {
		this.hasColumn = hasColumn;
	}
	@XmlAttribute(name = "readOnly")
	public String getReadOnly() {
		return readOnly;
	}

	public void setReadOnly(String readOnly) {
		this.readOnly = readOnly;
	}
	@XmlAttribute(name = "widget")
	public String getWidget() {
		return widget;
	}

	public void setWidget(String widget) {
		this.widget = widget;
	}
	@XmlAttribute(name = "isHidden")
	public String getIsHidden() {
		return isHidden;
	}

	public void setIsHidden(String isHidden) {
		this.isHidden = isHidden;
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
	@XmlAttribute(name = "defaultValue")
	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}
	
	
}
