function Page(options) {
    options = Object.assign({
        name: "",
        handler: ""
    }, options);
/******************/
    this.name = options.name;
    this.handlers = Object.create(null);
    this.handler = options.handler;
    this.fields = Object.create(null);
    this.lastElement = "";
/******************/
    this.root = document.createElement("div");
    if (this.name) this.root.id = this.name;
    this.root.classList.add("page");
    return this;
}
/**************************************/
Page.prototype.setHandlers = function(handlers) {
    for (let fieldName of Object.keys(handlers))
        this.setHandler(fieldName, handlers[fieldName]);
    return this;
}
/**************************************/
Page.prototype.setHandler = function(fieldName, handler) {
    this.handlers[fieldName] = handler;
    return this;
}
/**************************************/
Page.prototype.setUniversalHandler = function(fieldName, handler) {
    this.handler = handler;
    return this;
}
/**************************************/
Page.prototype.addContainer = function(container) {
    container.setParent(this);
    this.root.appendChild(container.render());
    this.addFields(container.getFields(), true);
    this.lastElement = container;
    return this;
}
/**************************************/
Page.prototype.addFields = function(fields, fromContainer) {
    for (let field of fields)
        this.addField(field, fromContainer);
    return this;
}
/**************************************/
Page.prototype.addField = function(field, fromContainer) {
    this.fields[field.name] = field;
    if (!fromContainer) {
        this.root.appendChild(field.render());
        this.lastElement = field;
    }
    field.setParent(this);
    return this;
}
/**************************************/
Page.prototype.addHTML = function(html) {
    this.root.appendChild(html);
    this.lastElement = this.root.lastChild;
    return this;
}
/**************************************/
Page.prototype.updatedField = function(fieldName, value) {
    if (this.handlers[fieldName])
        this.handlers.fieldName(value);
    if (this.handler)
        this.handler(fieldName, value);
    return this;
}
/**************************************/
Page.prototype.getValues = function() {
    let values = Object.create(null);
    for (let fieldName of Object.keys(this.fields))
        values[fieldName] = this.getValue(fieldName);
    return values;
}
/**************************************/
Page.prototype.setValues = function(fieldChanges) {
    for (let fieldName of Object.keys(fieldChanges))
        this.setValue(fieldName, fieldChanges[fieldName]);
    return this;
}
/**************************************/
Page.prototype.getValue = function(fieldName) {
    if (this.fields[fieldName] != undefined)
        return this.fields[fieldName].getValue();
    return "";
}
/**************************************/
Page.prototype.setValue = function(fieldName, value) {
    if (this.fields[fieldName] != undefined)
        this.fields[fieldName].setValue(value);
    return this;
}
/**************************************/
Page.prototype.clear = function() {
    for (let fieldName of Object.keys(this.fields))
        this.fields[fieldName].clear();
    return this;
}
/**************************************/
Page.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
function Container(options) {
    options = Object.assign({
        name: "",
        parent: ""
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.fields = [];
    this.lastElement = "";
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
    return this;
}
/**************************************/
Container.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
Container.prototype.addContainer = function(container) {
    container.setParent(this);
    this.root.appendChild(container.render());
    this.addFields(container.getFields(), true);
    this.lastElement = container;
    return this;
}
/**************************************/
Container.prototype.getFields = function() {
    let fields = this.fields;
    this.fields = [];
    return fields;
}
/**************************************/
Container.prototype.addFields = function(fields, fromContainer) {
    for (let field of fields)
        this.addField(field, fromContainer);
    return this;
}
/**************************************/
Container.prototype.addField = function(field, fromContainer) {
    if (!fromContainer) {
        this.root.appendChild(field.render());
        this.lastElement = field;
    }
    if (this.parent)
        this.parent.addField(field, true);
    else this.fields.push(field);
    return this;
}
/**************************************/
Container.prototype.addHTML = function(html) {
    this.root.appendChild(html);
    this.lastElement = this.root.lastChild;
    return this;
}
/**************************************/
Container.prototype.updatedField = function(fieldName, value) {
    if (this.parent)
        this.parent.updatedField(fieldName, value);
    return this;
}
/**************************************/
Container.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
/******************************************************************************/
function BasicField(options) {
    options = Object.assign({
        name: "",
        classes: [],
        parent: "",
        readOnly: false,
        label: "Field Label",
        beforeEdit: "",
        afterEdit: this.checkWidth,
        fontSize: "1em"
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.defaultFontSize = options.fontSize;
    this.fontSize = "";
    this.value = "";
    this.beforeEdit = options.beforeEdit;
    this.afterEdit = options.afterEdit;
    this.isEditing = false;
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
/******************/
    this.root.appendChild(document.createElement("label"));
    this.root.lastChild.innerHTML = options.label;
    this.root.lastChild.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
/******************/
    this.field = document.createElement("div");
    this.root.appendChild(this.field);
    this.field.classList.add("field");
    for (let className of options.classes)
        this.field.classList.add(className);
    this.field.style.whiteSpace = "nowrap";
    this.field.style.overflow = "hidden";
/******************/
    this.field.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
    this.field.addEventListener("blur", (obj=>()=>obj.stopEdit(obj))(this));
    return this;
}
/**************************************/
BasicField.prototype.setClasses = function(classes) {
    for (let className of classes)
        this.field.classList.add(className);
    return this;
}
/**************************************/
BasicField.prototype.startEdit = function(obj) {
    if (obj.isEditing) return;
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    if (!obj.fontSize)
        obj.fontSize = obj.field.style.fontSize || obj.defaultFontSize;
    obj.field.style.fontSize = obj.fontSize;
    if (obj.beforeEdit)
        obj.beforeEdit(obj.field.innerText);
    obj.field.classList.add("editable");
    obj.isEditing = true;
    obj.field.contentEditable = "true";
    obj.field.focus();
}
/**************************************/
BasicField.prototype.stopEdit = function(obj) {
    if (!obj.isEditing) return;
    obj.isEditing = false;
    obj.field.contentEditable = false;
    obj.field.classList.remove("editable");
    let previousValue = obj.value;
    obj.setValue(obj.field.innerText);
    if (previousValue != obj.value && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
BasicField.prototype.setFieldTest = function(afterEdit, beforeEdit) {
    this.afterEdit = afterEdit;
    if (beforeEdit) this.beforeEdit = beforeEdit;
    return this;
}
/**************************************/
BasicField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
BasicField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
BasicField.prototype.changeOrder = function() {
    let child = this.root.firstChild;
    this.root.removeChild(child);
    this.root.appendChild(child);
    return this;
}
/**************************************/
BasicField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
BasicField.prototype.setValue = function(value) {
    this.field.innerText = value;
    if (this.afterEdit)
        this.afterEdit(value);
    this.value = this.field.innerText;
    return this;
}
/**************************************/
BasicField.prototype.checkWidth = function() {
    if (!this.field.innerText) return;
    let font = this.fontSize.match(/(\d+)(\D{1,2})/);
    while (this.field.clientWidth < this.field.scrollWidth)
        this.field.style.fontSize = (font[1]-= 0.01) + font[2];
}
/**************************************/
BasicField.prototype.clear = function() {
    this.setValue("");
    return this;
}
/**************************************/
BasicField.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
function TextboxField(options) {
    BasicField.call(this, Object.assign({
        afterEdit: v=>{ this.field.innerText = v; this.checkWidth();
    } }, options));
    this.field.classList.add("txtbx");
    this.field.style.whiteSpace = "pre-wrap";
}
TextboxField.prototype = Object.create(BasicField.prototype);
TextboxField.prototype.constructor = TextboxField;
/**************************************/
TextboxField.prototype.checkHeight = function() {
    if (!this.field.innerText) return;
    let font = this.fontSize.match(/(\d+)(\D{1,2})/);
    while (this.field.clientHeight < this.field.scrollHeight)
        this.field.style.fontSize = (font[1]-= 0.01) + font[2];
}
/******************************************************************************/
function CheckboxField(options) {
    options = Object.assign({
        name: "",
        classes: [],
        parent: "",
        readOnly: false,
        label: "Field Label"
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.value = false;
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
    this.root.appendChild(document.createElement("label"));
    this.root.lastChild.innerHTML = options.label;
    this.root.lastChild.addEventListener("click", (obj=>()=>obj.toggleState(obj))(this));
    this.field = document.createElement("div");
    this.root.appendChild(this.field);
    this.field.classList.add("field", "cb");
    for (let className of options.classes)
        this.field.classList.add(className);
    this.field.style.overflow = "hidden";
    this.field.addEventListener("click", (obj=>()=>obj.toggleState(obj))(this));
    return this;
}
/**************************************/
CheckboxField.prototype.setClasses = function(classes) {
    for (let className of classes)
        this.field.classList.add(className);
    return this;
}
/**************************************/
CheckboxField.prototype.toggleState = function(obj) {
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    let previousValue = obj.value;
    obj.field.classList.toggle("check");
    obj.value = obj.field.classList.contains("check");
    if (previousValue != obj.value && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
CheckboxField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
CheckboxField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
CheckboxField.prototype.changeOrder = function() {
    let child = this.root.firstChild;
    this.root.removeChild(child);
    this.root.appendChild(child);
    return this;
}
/**************************************/
CheckboxField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
CheckboxField.prototype.setValue = function(value) {
    if (value) {
        this.value = true;
        this.field.classList.add("check");
    } else {
        this.value = false;
        this.field.classList.remove("check");
    }
    return this;
}
/**************************************/
CheckboxField.prototype.clear = function() {
    this.setValue(false);
    return this;
}
/**************************************/
CheckboxField.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
function DropdownField(options) {
    options = Object.assign({
        list: [],
        timeout: 1000,
        editable: false
    }, options);
    BasicField.call(this, options);
/******************/
    this.editable = options.editable;
    this.timeout = options.timeout;
    this.to = "";
/******************/
    this.root.style.position = "relative";
    this.root.appendChild(this.root.removeChild(this.field).cloneNode(true));
    this.field = this.root.lastChild;
    this.field.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
    this.field.addEventListener("blur", (obj=>()=>obj.to=setTimeout(()=>obj.stopEdit(obj), 200))(this));
/******************/
    this.list = document.createElement("div");
    this.list.classList.add("drpdwn");
    this.list.style.position = "absolute";
    this.createList(options.list);
    if (!this.editable) {
        this.root.addEventListener("mouseout", (obj=>()=>{
            if (!obj.isEditing || obj.to)
                return;
            obj.to = setTimeout(()=>obj.stopEdit(obj));
        })(this));
        this.root.addEventListener("mouseover", (obj=>()=>{
            if (!obj.isEditing ||!obj.to)
                return;
            clearTimeout(obj.to);
            obj.to = "";
        })(this));
    }
}
DropdownField.prototype = Object.create(BasicField.prototype);
DropdownField.prototype.constructor = DropdownField;
/**************************************/
DropdownField.prototype.createList = function(list) {
    this.list.innerHTML = "";
    this.lookup = Object.create(null);
    for (let item of list) {
        this.list.appendChild(document.createElement("div"));
        this.list.lastChild.innerHTML = item.label;
        this.list.lastChild.addEventListener("click", ((obj, li)=>()=>obj.stopEdit(obj, li))(this, item));
        if (item.value != undefined)
            this.lookup[item.label] = item.value;
    }
}
DropdownField.prototype.startEdit = function(obj) {
    if (obj.isEditing) return;
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    obj.root.appendChild(obj.list);
    if (obj.editable) {
        if (!obj.fontSize)
            obj.fontSize = obj.field.style.fontSize || this.defaultFontSize;
        obj.field.style.fontSize = obj.fontSize;
        if (obj.beforeEdit)
            obj.beforeEdit(obj.field.innerText);
        obj.field.classList.add("editable");
        obj.field.contentEditable = "true";
        obj.field.focus();
    }
    obj.isEditing = true;
}
/**************************************/
DropdownField.prototype.stopEdit = function(obj, li) {
    if (!obj.isEditing) return;
    obj.field.contentEditable = false;
    obj.field.classList.remove("editable");
    clearTimeout(obj.to);
    obj.to = "";
    obj.root.removeChild(obj.list);
    let previousValue = obj.value;
    obj.isEditing = false;
    if (li) {
        this.field.innerText = li.label;
        obj.value = li.value != undefined ? li.value : li.label;
    } else {
        if (this.afterEdit)
            this.afterEdit(this.field.innerText);
        if (Object.keys(this.lookup) > 0)
            this.value = this.lookup[this.field.innerText] || "";
        else this.value = this.field.innerText;
    }
    if (previousValue != obj.value && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
DropdownField.prototype.setValue = function(value) {
    this.value = value;
    let keys = Object.keys(this.lookup);
    if (keys.length > 0)
        for (let label of keys) {
            if (this.lookup[label] == value) this.field.innerText = label;
            break;
        }
    else this.field.innerText = value;
    return this;
}
/******************************************************************************/
function ImageField(options) {
    options = Object.assign({
        name: "",
        classes: [],
        parent: "",
        readOnly: false,
        label: "Field Label"
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.value = "";
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
    this.root.appendChild(document.createElement("label"));
    this.root.lastChild.innerHTML = options.label;
    this.root.lastChild.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
    this.field = document.createElement("div");
    this.root.appendChild(this.field);
    this.field.classList.add("field");
    for (let className of options.classes)
        this.field.classList.add(className);
    this.field.style.overflow = "hidden";
    this.field.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
    this.field.appendChild(document.createElement("img"));
/******************/
    this.inputFile = document.createElement("input");
    this.inputFile.type = "file";
    this.inputFile.addEventListener("change", e=>{
        if (!e.target.files.length) return;
        let fr = new FileReader();
        fr.onload = (obj=>e=>obj.setValue(e.target.result))(this);
        fr.readAsDataURL(e.target.files[0]);
    });
    return this;
}
/**************************************/
ImageField.prototype.setClasses = function(classes) {
    for (let className of classes)
        this.field.classList.add(className);
    return this;
}
/**************************************/
ImageField.prototype.startEdit = function(obj) {
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    obj.inputFile.click();
}
/**************************************/
ImageField.prototype.updatedField = function(fieldName, value) {
    let previousValue = this.value;
    this.setValue(value);
    if (previousValue != this.value && this.parent)
        this.parent.updatedField(this.name, this.value);
}
/**************************************/
ImageField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
ImageField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
ImageField.prototype.changeOrder = function() {
    let child = this.root.firstChild;
    this.root.removeChild(child);
    this.root.appendChild(child);
    return this;
}
/**************************************/
ImageField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
ImageField.prototype.setValue = function(value) {
    if (value) this.field.firstChild.src = value;
    else {
        this.field.removeChild(this.field.firstChild);
        this.field.appendChild(document.createElement("img"));
    }
    this.value = value;
    return this;
}
/**************************************/
ImageField.prototype.clear = function() {
    this.setValue("");
    return this;
}
/**************************************/
ImageField.prototype.render = function() {
    return this.root;
}