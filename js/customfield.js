function ModField(options) {
    options = Object.assign({
        beforeEdit: v=>{ this.field.innerText = String(v).replace(/[^0-9-]/g, ""); },
        afterEdit: v=>{
            v = String(v).replace(/[^0-9-]/g, "");
            this.field.innerText = (v.length && v.indexOf("-") == -1 ? "+" : "") + v;
        }
    }, options);
    BasicField.call(this, options);
    this.field.classList.add("mod");
}
ModField.prototype = Object.create(BasicField.prototype);
ModField.prototype.constructor = ModField;
/******************************************************************************/
function NumberField(options) {
    options = Object.assign({
        beforeEdit: v=>{ this.field.innerText = String(v).replace(/\D/g, ""); },
        afterEdit: v=>{
            this.field.innerText = String(v).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.checkWidth();
        }
    }, options);
    BasicField.call(this, options);
    this.field.classList.add("num");
}
NumberField.prototype = Object.create(BasicField.prototype);
NumberField.prototype.constructor = NumberField;
/******************************************************************************/
function StatField(options) {
    options = Object.assign({
        beforeEdit: v=>{ this.field.innerText = String(v).replace(/[^0-9\/]/g, ""); },
        afterEdit: v=>{ this.field.innerText = String(v).replace(/[^0-9\/]/g, ""); this.checkWidth(); }
    }, options);
    BasicField.call(this, options);
    this.field.classList.add("ctr");
}
StatField.prototype = Object.create(BasicField.prototype);
StatField.prototype.constructor = StatField;
/******************************************************************************/
function StatModField(options) {
    options = Object.assign({
        beforeEdit: v=>{ this.field.stat.innerText = String(v).replace(/[^0-9\/]/g, ""); },
        afterEdit: v=>{ this.field.stat.innerText = String(v).replace(/[^0-9\/]/g, ""); this.checkWidth(); },
        modClasses: [],
        modBeforeEdit: v=>{ this.field.mod.innerText = String(v).replace(/[^0-9-]/g, ""); },
        modAfterEdit: v=>{
            v = String(v).replace(/[^0-9-]/g, "");
            this.field.mod.innerText = (v.length && v.indexOf("-") == -1 ? "+" : "") + v;
        }
    }, options);
    StatField.call(this, options);
/******************/
    this.value = { stat: "", mod: "" };
    this.beforeEdit = { stat: options.beforeEdit, mod: options.modBeforeEdit };
    this.afterEdit = { stat: options.afterEdit, mod: options.modAfterEdit };
/******************/
    this.field = { stat: this.field };
    this.field.mod = document.createElement("div");
    this.root.insertBefore(this.field.mod, this.field.stat);
    this.field.mod.classList.add("field", "mod");
    for (let className of options.modClasses)
        this.field.mod.classList.add(className);
    this.field.mod.style.whiteSpace = "nowrap";
    this.field.mod.style.overflow = "hidden";
/******************/
    this.field.mod.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
    this.field.mod.addEventListener("blur", (obj=>()=>obj.stopEdit(obj))(this));
}
StatModField.prototype = Object.create(StatField.prototype);
StatModField.prototype.constructor = StatModField;
/**************************************/
StatModField.prototype.startEdit = function(obj) {
    if (obj.isEditing) return;
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    if (!obj.fontSize)
        obj.fontSize = obj.field.stat.style.fontSize || this.defaultFontSize;
    obj.field.stat.style.fontSize = obj.fontSize;
    if (obj.beforeEdit.stat)
        obj.beforeEdit.stat(obj.field.stat.innerText);
    obj.field.stat.classList.add("editable");
    obj.isEditing = true;
    obj.field.stat.contentEditable = "true";
    obj.field.stat.focus();
}
/**************************************/
StatModField.prototype.stopEdit = function(obj) {
    if (!obj.isEditing) return;
    obj.isEditing = false;
    obj.field.stat.contentEditable = false;
    obj.field.stat.classList.remove("editable");
    let previousValue = obj.value.stat;
    obj.setValue({ stat: obj.field.stat.innerText });
    if (previousValue != obj.value.stat && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
StatModField.prototype.checkWidth = function() {
    if (!this.field.stat.innerText) return;
    let font = this.fontSize.match(/(\d+)(\D{1,2})/);
    while (this.field.stat.clientWidth < this.field.stat.scrollWidth)
        this.field.stat.style.fontSize = (font[1]-= 0.01) + font[2];
}
/**************************************/
StatModField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
StatModField.prototype.setValue = function(value) {
    if (value.stat !== undefined) {
        value.stat = value.stat.replace(/^\s+|\s+$/g, "");
        this.field.stat.innerText = value.stat;
        if (this.afterEdit.stat)
            this.afterEdit.stat(value.stat);
        this.value.stat = this.field.stat.innerText;
        if (value.mod === undefined)
            value.mod = Math.floor(parseInt(this.value.stat)/2)-5;
    }
    if (value.mod !== undefined) {
        this.field.mod.innerText = value.mod;
        if (this.afterEdit.mod)
            this.afterEdit.mod(String(value.mod));
        this.value.mod = this.field.mod.innerText;
    }
    return this;
}
/**************************************/
StatModField.prototype.clear = function() {
    this.setValue({ stat: "", mod: "" });
    return this;
}
/******************************************************************************/
function CheckboxModField(options) {
    options = Object.assign({
        name: "",
        classes: [],
        parent: "",
        readOnly: false,
        label: "Field Label",
        beforeEdit: v=>{ this.field.mod.innerText = String(v).replace(/[^0-9-]/g, ""); },
        afterEdit: v=>{
            v = String(v).replace(/[^0-9-]/g, "");
            this.field.mod.innerText = (v.length && v.indexOf("-") == -1 ? "+" : "") + v;
        },
        fontSize: "1em",
        canDouble: false
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.defaultFontSize = options.fontSize;
    this.fontSize = "";
    this.value = { chkbx: false, mod: "" };
    this.beforeEdit = options.beforeEdit;
    this.afterEdit = options.afterEdit;
    this.isEditing = false;
    this.canDouble = options.canDouble;
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
/******************/
    this.root.appendChild(document.createElement("label"));
    this.root.lastChild.innerHTML = options.label;
    this.root.lastChild.addEventListener("click", (obj=>()=>obj.toggleState(obj))(this));
/******************/
    this.field = Object.create(null);
    this.field.chkbx = document.createElement("div");
    this.root.appendChild(this.field.chkbx);
    this.field.chkbx.classList.add("field", "cb");
    this.field.chkbx.style.overflow = "hidden";
    this.field.chkbx.addEventListener("click", (obj=>()=>obj.toggleState(obj))(this));
/******************/
    this.field.mod = document.createElement("div");
    this.root.appendChild(this.field.mod);
    this.field.mod.classList.add("field", "mod");
    for (let className of options.classes)
        this.field.mod.classList.add(className);
    this.field.mod.style.whiteSpace = "nowrap";
    this.field.mod.style.overflow = "hidden";
    this.field.mod.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
    this.field.mod.addEventListener("blur", (obj=>()=>obj.stopEdit(obj))(this));
/******************/
    return this;
}
/**************************************/
CheckboxModField.prototype.setClasses = function(classes) {
    for (let className of classes)
        this.field.mod.classList.add(className);
    return this;
}
/**************************************/
CheckboxModField.prototype.toggleState = function(obj) {
    let previousValue = obj.value.chkbx;
    if (this.canDouble) {
        switch(obj.value.chkbx) {
            case false:
                obj.field.chkbx.classList.add("check");
                obj.value.chkbx = true;
                break;
            case true:
                obj.field.chkbx.classList.add("check");
                obj.value.chkbx = 2;
                break;
            case 2:
                obj.field.chkbx.classList.remove("check");
                obj.value.chkbx = false;
                break;
        }
    } else {
        obj.field.chkbx.classList.toggle("check");
        obj.value.chkbx = obj.field.chkbx.classList.contains("check");
    }
    if (previousValue != obj.value.chkbx && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
CheckboxModField.prototype.startEdit = function(obj) {
    if (obj.isEditing) return;
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    if (!obj.fontSize)
        obj.fontSize = obj.field.mod.style.fontSize || obj.defaultFontSize;
    obj.field.mod.style.fontSize = obj.fontSize;
    if (obj.beforeEdit)
        obj.beforeEdit(obj.field.mod.innerText);
    obj.field.mod.classList.add("editable");
    obj.isEditing = true;
    obj.field.mod.contentEditable = "true";
    obj.field.mod.focus();
}
/**************************************/
CheckboxModField.prototype.stopEdit = function(obj) {
    if (!obj.isEditing) return;
    obj.isEditing = false;
    obj.field.mod.contentEditable = false;
    obj.field.mod.classList.remove("editable");
    let previousValue = obj.value.mod;
    obj.setValue({ mod: obj.field.mod.innerText });
    if (previousValue !== obj.value.mod && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
CheckboxModField.prototype.setFieldTest = function(afterEdit, beforeEdit) {
    this.afterEdit = afterEdit;
    if (beforeEdit) this.beforeEdit = beforeEdit;
    return this;
}
/**************************************/
CheckboxModField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
CheckboxModField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
CheckboxModField.prototype.changeOrder = function() {
    let child = this.root.firstChild;
    this.root.removeChild(child);
    this.root.appendChild(child);
    return this;
}
/**************************************/
CheckboxModField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
CheckboxModField.prototype.setValue = function(value) {
    if (value.chkbx !== undefined) {
        if (value.chkbx) {
            this.value.chkbx = value.chkbx;
            this.field.chkbx.classList.add("check");
        } else {
            this.value.chkbx = false;
            this.field.chkbx.classList.remove("check");
        }
    }
    if (value.mod !== undefined) {
        this.field.mod.innerText = value.mod;
        if (this.afterEdit)
            this.afterEdit(value.mod);
        this.value.mod = this.field.mod.innerText;
        }
    return this;
}
/**************************************/
CheckboxModField.prototype.clear = function() {
    this.setValue({ chkbx: false, mod: "" });
    return this;
}
/**************************************/
CheckboxModField.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
function CheckboxCountField(options) {
    options = Object.assign({
        name: "",
        classes: [],
        parent: "",
        readOnly: false,
        label: "Field Label",
        length: 2
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.value = 0;
    this.length = options.length;
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
/******************/
    this.root.appendChild(document.createElement("label"));
    this.root.lastChild.innerHTML = options.label;
    this.root.lastChild.addEventListener("click", (obj=>()=>obj.toggleState(obj))(this));
/******************/
    this.field = [];
    for (let i=0; i<this.length; i++) {
        this.field[i] = document.createElement("div");
        this.root.appendChild(this.field[i]);
        this.field[i].classList.add("field", "cb");
        for (let className of options.classes)
            this.field[i].classList.add(className);
        this.field[i].style.overflow = "hidden";
        this.field[i].addEventListener("click", (obj=>()=>obj.toggleState(obj))(this));
    }
/******************/
    return this;
}
/**************************************/
CheckboxCountField.prototype.setClasses = function(classes, fieldIndex) {
    if (fieldIndex === undefined)
        for (let i=0; i<this.length; i++)
            for (let className of classes)
                this.field[i].classList.add(className);
    else for (let className of classes)
        this.field[fieldIndex].classList.add(className);
    return this;
}
/**************************************/
CheckboxCountField.prototype.toggleState = function(obj) {
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    obj.setValue(++obj.value);
    obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
CheckboxCountField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
CheckboxCountField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
CheckboxCountField.prototype.changeOrder = function() {
    let child = this.root.firstChild;
    this.root.removeChild(child);
    this.root.appendChild(child);
    return this;
}
/**************************************/
CheckboxCountField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
CheckboxCountField.prototype.setValue = function(value) {
    if (this.length < value) value = 0;
    this.value = value;
    for (let i=0; i<this.length; i++)
        if (i < this.value)
            this.field[i].classList.add("check");
        else this.field[i].classList.remove("check");
    return this;
}
/**************************************/
CheckboxCountField.prototype.clear = function() {
    this.setValue(0);
    return this;
}
/**************************************/
CheckboxCountField.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
function AtField(options) {
    options = Object.assign({
        parent: "",
        readOnly: false,
        fontSize: "1em"
    }, options);
/******************/
    this.name = "at";
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.fontSize = options.fontSize;
    this.value = { wpn: [
        { name: "", atk: "", damage: "" },
        { name: "", atk: "", damage: "" },
        { name: "", atk: "", damage: "" },
        { name: "", atk: "", damage: "" }
    ], attacks: "" };
    this.isEditing = [
        { name: false, atk: false, damage: false },
        { name: false, atk: false, damage: false },
        { name: false, atk: false, damage: false },
        { name: false, atk: false, damage: false }
    ];
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
/******************/
    this.root.appendChild(document.createElement("div"));
    this.root.lastChild.classList.add("wpn-hd");
    this.root.lastChild.appendChild(document.createElement("label"));
    this.root.lastChild.lastChild.innerText = "Name";
    this.root.lastChild.appendChild(document.createElement("label"));
    this.root.lastChild.lastChild.innerText = "Atk";
    this.root.lastChild.appendChild(document.createElement("label"));
    this.root.lastChild.lastChild.innerText = "Damage";
/******************/
    let fieldMap = [
        {name: "name", classes: ["field"]},
        {name: "atk", classes: ["field", "mod"]},
        {name: "damage", classes: ["field", "ctr"]}
    ];
    this.field = Object.create(null);
    this.field.wpn = [];
    for (let i=0; i<4; i++) {
        this.root.appendChild(document.createElement("div"));
        this.root.lastChild.classList.add("wpn");
        this.field.wpn[i] = Object.create(null);
/********/
        for (let field of fieldMap) {
            this.field.wpn[i][field.name] = document.createElement("div");
            this.root.lastChild.appendChild(this.field.wpn[i][field.name]);
            for (let className of field.classes)
                this.field.wpn[i][field.name].classList.add(className);
            this.field.wpn[i][field.name].whiteSpace = "nowrap";
            this.field.wpn[i][field.name].overflow = "hidden";
            this.field.wpn[i][field.name].addEventListener("click", ((obj, row, fld)=>()=>obj.startEdit(obj, row, fld))(this, i, field.name));
            this.field.wpn[i][field.name].addEventListener("blur", ((obj, row, fld)=>()=>obj.stopEdit(obj, row, fld))(this, i, field.name));
        }
    }
/******************/
    this.attacks = new TextboxField({ name: "attacks", label: "Attacks & Spellcasting", parent: this }).changeOrder();
    this.root.appendChild(this.attacks.render());
/******************/
    return this;
}
/**************************************/
AtField.prototype.startEdit = function(obj, row, fld) {
    if (obj.isEditing[row][fld]) return;
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    obj.field.wpn[row][fld].style.fontSize = obj.fontSize;
    if (fld == "atk")
        this.field.wpn[row][fld].innerText = this.field.wpn[row][fld].innerText.replace(/[^0-9-]/g, "");
    obj.field.wpn[row][fld].classList.add("editable");
    obj.isEditing[row][fld] = true;
    obj.field.wpn[row][fld].contentEditable = "true";
    obj.field.wpn[row][fld].focus();
}
/**************************************/
AtField.prototype.stopEdit = function(obj, row, fld) {
    if (!obj.isEditing[row][fld]) return;
    obj.isEditing[row][fld] = false;
    obj.field.wpn[row][fld].contentEditable = false;
    obj.field.wpn[row][fld].classList.remove("editable");
    let previousValue = obj.value.wpn[row][fld];
    let value = { wpn: [] };
    value.wpn[row] = {};
    value.wpn[row][fld] = obj.field.wpn[row][fld].innerText;
    obj.setValue(value);
    if (previousValue != obj.value.wpn[row][fld] && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
AtField.prototype.updatedField = function(fieldName, value) {
    this.value.attacks = value;
    this.parent.updatedField(this.name, this.value);
}
/**************************************/
AtField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
AtField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
AtField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
AtField.prototype.setValue = function(value) {
    let v;
    if (value.wpn !== undefined)
        for (let i=0; i<4; i++)
            if (value.wpn[i] !== undefined)
                for (let field of Object.keys(value.wpn[i])) {
                    if (field == "atk") {
                        v = value.wpn[i][field].replace(/[^0-9-]/g, "");
                        this.field.wpn[i][field].innerText = (v.length && v.indexOf("-") == -1 ? "+" : "") + v;
                    } else this.field.wpn[i][field].innerText = value.wpn[i][field];
                    this.value.wpn[i][field] = this.field.wpn[i][field].innerText;
                }
    if (value.attacks !== undefined) {
        this.attacks.setValue(value.attacks);
        this.value.attacks = value.attacks;
    }
    return this;
}
/**************************************/
AtField.prototype.checkWidth = function(row, fld) {
    if (!this.field.innerText) return;
    let font = this.fontSize.match(/(\d+)(\D{1,2})/);
    while (this.field.clientWidth < this.field.scrollWidth)
        this.field.style.fontSize = (font[1]-= 0.01) + font[2];
}
/**************************************/
AtField.prototype.clear = function() {
    this.setValue({ wpn: [
        { name: "", atk: "", damage: "" },
        { name: "", atk: "", damage: "" },
        { name: "", atk: "", damage: "" },
        { name: "", atk: "", damage: "" }
    ], attacks: "" });
    return this;
}
/**************************************/
AtField.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
function DropdownImageField(options) {
    options = Object.assign({
        name: "",
        classes: [],
        parent: "",
        readOnly: false,
        label: "Field Label",
        beforeEdit: "",
        afterEdit: this.checkWidth,
        fontSize: "1em",
        list: [],
        timeout: 1000,
        editable: false
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.defaultFontSize = options.fontSize;
    this.fontSize = "";
    this.value = { value: "", image: "" };
    this.beforeEdit = options.beforeEdit;
    this.afterEdit = options.afterEdit;
    this.isEditing = false;
    this.editable = options.editable;
    this.timeout = options.timeout;
    this.to = ""
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
    this.root.style.position = "relative";
/******************/
    this.root.appendChild(document.createElement("label"));
    this.root.lastChild.innerHTML = options.label;
/******************/
    this.field = Object.create(null);
    this.field.field = document.createElement("div");
    this.root.appendChild(this.field.field);
    this.field.field.classList.add("field");
    for (let className of options.classes)
        this.field.field.classList.add(className);
    this.field.field.style.whiteSpace = "nowrap";
    this.field.field.style.overflow = "hidden";
/******************/
    this.field.image = document.createElement("div");
    this.root.appendChild(this.field.image);
    this.field.image.classList.add("field");
    this.field.image.style.overflow = "hidden";
    this.field.image.appendChild(document.createElement("img"));
/******************/
    this.field.field.addEventListener("click", (obj=>()=>obj.startEdit(obj))(this));
    this.field.field.addEventListener("blur", (obj=>()=>obj.to=setTimeout(()=>obj.stopEdit(obj), 200))(this));
    this.field.image.addEventListener("click", (obj=>()=>obj.imageEdit(obj))(this));
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
/******************/
    this.inputFile = document.createElement("input");
    this.inputFile.type = "file";
    this.inputFile.addEventListener("change", e=>{
        if (!e.target.files.length) return;
        let fr = new FileReader();
        fr.onload = (obj=>e=>obj.setValue({ image: e.target.result }))(this);
        fr.readAsDataURL(e.target.files[0]);
    });
/******************/
    return this;
}
/**************************************/
DropdownImageField.prototype.setClasses = function(classes) {
    for (let className of classes)
        this.field.field.classList.add(className);
    return this;
}
/**************************************/
DropdownImageField.prototype.createList = function(list) {
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
/**************************************/
DropdownImageField.prototype.startEdit = function(obj) {
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
            obj.fontSize = obj.field.field.style.fontSize || this.defaultFontSize;
        obj.field.field.style.fontSize = obj.fontSize;
        if (obj.beforeEdit)
            obj.beforeEdit(obj.field.field.innerText);
        obj.field.field.classList.add("editable");
        obj.field.field.contentEditable = "true";
        obj.field.field.focus();
    }
    obj.isEditing = true;
}
/**************************************/
DropdownImageField.prototype.stopEdit = function(obj, li) {
    if (!obj.isEditing) return;
    obj.field.field.contentEditable = false;
    obj.field.field.classList.remove("editable");
    clearTimeout(obj.to);
    obj.to = "";
    obj.root.removeChild(obj.list);
    let previousValue = obj.value.value;
    let previousImage = obj.value.image;
    obj.isEditing = false;
    if (li) {
        if (li.value !== undefined)
            this.setValue({ value: li.label, image: li.value });
        else this.setValue({ value: li.label });
    } else {
        obj.field.field.innerText = obj.field.field.innerText.replace(/^\s+|\s+$/g, "");
        if (obj.afterEdit)
            obj.afterEdit(obj.field.field.innerText);
        obj.setValue({ value: obj.field.field.innerText });
    }
    if ((previousValue !== obj.value.value || previousImage !== obj.value.image) && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
DropdownImageField.prototype.imageEdit = function(obj) {
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    obj.inputFile.click();
}
/**************************************/
DropdownImageField.prototype.setFieldTest = function(afterEdit, beforeEdit) {
    this.afterEdit = afterEdit;
    if (beforeEdit) this.beforeEdit = beforeEdit;
    return this;
}
/**************************************/
DropdownImageField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
DropdownImageField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
DropdownImageField.prototype.changeOrder = function() {
    let child = this.root.firstChild;
    this.root.removeChild(child);
    this.root.appendChild(child);
    return this;
}
/**************************************/
DropdownImageField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
DropdownImageField.prototype.setValue = function(value) {
    if (value.value !== undefined) {
        if (!this.fontSize)
            this.fontSize = this.field.field.style.fontSize || this.defaultFontSize;
        this.field.field.style.fontSize = this.fontSize;
        this.field.field.innerText = value.value;
        if (this.afterEdit)
            this.afterEdit(value.value);
        this.value.value = this.field.field.innerText;
        if (value.image === undefined && Object.keys(this.lookup).length > 0)
            value.image = this.lookup[this.value.value];
    }
    if (value.image !== undefined) {
        if (value.image)
            this.field.image.firstChild.src = value.image;
        else {
            this.field.image.removeChild(this.field.image.firstChild);
            this.field.image.appendChild(document.createElement("img"));
        }
        this.value.image = value.image;
    }
    return this;
}
/**************************************/
DropdownImageField.prototype.checkWidth = function() {
    if (!this.field.field.innerText) return;
    let font = this.fontSize.match(/(\d+)(\D{1,2})/);
    while (this.field.field.clientWidth < this.field.field.scrollWidth)
        this.field.field.style.fontSize = (font[1]-= 0.01) + font[2];
}
/**************************************/
DropdownImageField.prototype.clear = function() {
    this.setValue({ value: "", image: "" });
    return this;
}
/**************************************/
DropdownImageField.prototype.render = function() {
    return this.root;
}
/******************************************************************************/
function SpellListField(options) {
    options = Object.assign({
        name: "",
        parent: "",
        readOnly: false,
        label: "0",
        fontSize: "1em",
        isCantrip: false,
        spells: 9
    }, options);
/******************/
    this.name = options.name;
    this.parent = options.parent;
    this.readOnly = options.readOnly;
    this.fontSize = options.fontSize;
    if (options.isCantrip) this.value = { spells: [] };
    else this.value = { total: "", expend: "", selected: [], spells: [] };
    this.isEditing = [];
/******************/
    this.root = document.createElement("div");
    this.root.classList.add(this.name);
/******************/
    this.root.appendChild(document.createElement("div"));
    this.root.lastChild.classList.add("sph");
    this.root.lastChild.appendChild(document.createElement("label"));
    this.root.lastChild.lastChild.innerText = options.label;
/******************/
    if (options.isCantrip) {
        this.root.lastChild.appendChild(document.createElement("label"));
        this.root.lastChild.lastChild.innerText = "Cantrips";
        this.root.appendChild(document.createElement("div"));
        this.root.lastChild.classList.add("spl");
        this.field = { spells: [] };
        for (let i=0; i<options.spells; i++) {
            this.isEditing[i] = false;
            this.value.spells[i] = "";
            this.root.lastChild.appendChild(document.createElement("div"));
            this.root.lastChild.lastChild.classList.add("spell");
/******************/
            this.field.spells[i] = document.createElement("div");
            this.root.lastChild.lastChild.appendChild(this.field.spells[i]);
            this.field.spells[i].classList.add("field");
            this.field.spells[i].style.whiteSpace = "nowrap";
            this.field.spells[i].style.overflow = "hidden";
/******************/
            this.field.spells[i].addEventListener("click", ((obj, row)=>()=>obj.startEdit(obj, row))(this, i));
            this.field.spells[i].addEventListener("blur", ((obj, row)=>()=>obj.stopEdit(obj, row))(this, i));
        }
    } else {
        this.total = new StatField({ name: "sp-total", label: "Slots Total", parent: this });
        this.root.lastChild.appendChild(this.total.render());
        this.expend = new BasicField({ name: "sp-expend", label: "Slots Expended", parent: this });
        this.root.lastChild.appendChild(this.expend.render());
        this.root.appendChild(document.createElement("div"));
        this.root.lastChild.classList.add("spl");
        this.field = { spells: [], selected: [] };
        for (let i=0; i<options.spells; i++) {
            this.isEditing[i] = false;
            this.value.selected[i] = false;
            this.value.spells[i] = "";
            this.root.lastChild.appendChild(document.createElement("div"));
            this.root.lastChild.lastChild.classList.add("spell");
/******************/
            this.field.selected[i] = document.createElement("div");
            this.root.lastChild.lastChild.appendChild(this.field.selected[i]);
            this.field.selected[i].classList.add("field", "cb");
            this.field.selected[i].style.overflow = "hidden";
/******************/
            this.field.selected[i].addEventListener("click", ((obj, row)=>()=>obj.toggleState(obj, row))(this, i));
/******************/
            this.field.spells[i] = document.createElement("div");
            this.root.lastChild.lastChild.appendChild(this.field.spells[i]);
            this.field.spells[i].classList.add("field");
            this.field.spells[i].style.whiteSpace = "nowrap";
            this.field.spells[i].style.overflow = "hidden";
/******************/
            this.field.spells[i].addEventListener("click", ((obj, row)=>()=>obj.startEdit(obj, row))(this, i));
            this.field.spells[i].addEventListener("blur", ((obj, row)=>()=>obj.stopEdit(obj, row))(this, i));
        }
    }
/******************/
    return this;
}
/**************************************/
SpellListField.prototype.startEdit = function(obj, row) {
    if (obj.isEditing[row]) return;
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    obj.field.spells[row].style.fontSize = obj.fontSize;
    obj.field.spells[row].classList.add("editable");
    obj.isEditing[row] = true;
    obj.field.spells[row].contentEditable = "true";
    obj.field.spells[row].focus();
}
/**************************************/
SpellListField.prototype.stopEdit = function(obj, row) {
    if (!obj.isEditing[row]) return;
    obj.isEditing[row] = false;
    obj.field.spells[row].contentEditable = false;
    obj.field.spells[row].classList.remove("editable");
    let previousValue = obj.value.spells[row];
    let value = { spells: [] };
    value.spells[row] = obj.field.spells[row].innerText;
    obj.setValue(value);
    if (previousValue != obj.value.spells[row] && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
SpellListField.prototype.toggleState = function(obj, row) {
    if (obj.readOnly && obj.parent) {
        let value = Object.create(obj.value);
        value.click = true;
        obj.parent.updatedField(obj.name, value);
        return;
    }
    let previousValue = obj.value.selected[row];
    obj.field.selected[row].classList.toggle("check");
    obj.value.selected[row] = obj.field.selected[row].classList.contains("check");
    if (previousValue != obj.value.selected[row] && obj.parent)
        obj.parent.updatedField(obj.name, obj.value);
}
/**************************************/
SpellListField.prototype.updatedField = function(fieldName, value) {
    if (fieldName == "sp-total") {
        this.value.total = value;
        this.parent.updatedField(this.name, this.value);
    } else if (fieldName == "sp-expend") {
        this.value.expend = value;
        this.parent.updatedField(this.name, this.value);
    }
    return this;
}
/**************************************/
SpellListField.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
}
/**************************************/
SpellListField.prototype.setReadOnly = function(readOnly) {
    this.readOnly = readOnly;
    return this;
}
/**************************************/
SpellListField.prototype.getValue = function() {
    return this.value;
}
/**************************************/
SpellListField.prototype.setValue = function(value) {
    if (value.total !== undefined) {
        this.value.total = value.total;
        this.total.setValue(value.total);
    }
    if (value.expend !== undefined) {
        this.value.expend = value.expend;
        this.expend.setValue(value.expend);
    }
    if (value.selected !== undefined)
        for (let i=0; i<this.value.selected.length; i++)
            if (value.selected[i] !== undefined) {
                if (value.selected[i]) {
                    this.value.selected[i] = true;
                    this.field.selected[i].classList.add("check");
                } else {
                    this.value.selected[i] = false;
                    this.field.selected[i].classList.remove("check");
                }
            }
    if (value.spells !== undefined)
        for (let i=0; i<this.value.spells.length; i++)
            if (value.spells[i] !== undefined) {
                this.value.spells[i] = value.spells[i];
                this.field.spells[i].innerText = value.spells[i];
                this.checkWidth(i);
            }
    return this;
}
/**************************************/
SpellListField.prototype.checkWidth = function(row) {
    if (!this.field.spells[row].innerText) return;
    let font = this.fontSize.match(/(\d+)(\D{1,2})/);
    while (this.field.spells[row].clientWidth < this.field.spells[row].scrollWidth)
        this.field.spells[row].style.fontSize = (font[1]-= 0.01) + font[2];
}
/**************************************/
SpellListField.prototype.clear = function() {
    if (typeof this.total === "object") {
        this.value.total = "";
        this.total.clear();
    }
    if (typeof this.expend === "object") {
        this.value.expend = "";
        this.expend.clear();
    }
    if (Array.isArray(this.value.selected) && this.value.selected.length)
        for (let i=0; i<this.value.selected.length; i++) {
            this.value.selected[i] = false;
            this.field.selected[i].classList.remove("check");
        }
    for (let i=0; i<this.value.spells.length; i++) {
        this.value.spells[i] = "";
        this.field.spells[i].innerText = "";
    }
    return this;
}
/**************************************/
SpellListField.prototype.render = function() {
    return this.root;
}