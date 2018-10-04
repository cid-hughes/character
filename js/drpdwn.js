function Drpdwn(list, options) {
    if (!Array.isArray(list)) list = [
        { label: "Default Option", action: 'console.log("option clicked");drpdwn.close();' }
    ];
    if (typeof options != "object") options = {};
    let defOpt = {
        id: "",
        className: "",
        editable: false,
        timeOut: 1000
    };
    for (let option in defOpt) options[option] = options[option] !== undefined ? options[option] : defOpt[option];
    this.isDown = false;
    this.editable = options.editable;
    this.timeOut = options.timeOut;
/**************************************/
    this.list = document.createElement("div");
    if (options.id) this.list.id = options.id;
    this.list.classList.add("drpdwn");
    if (options.className) this.list.classList.add(options.className);
    let onClick = (drpdwn, item)=>(e)=>{
        e.stopPropagation();
        //e.prefentDefault();
        while (drpdwn.root.childNodes.length>1) drpdwn.root.removeChild(drpdwn.root.childNodes[0]);
        drpdwn.root.insertBefore(document.createTextNode(item.label), drpdwn.list);
        drpdwn.close();
        return false;
    }
    for (let item of list) {
        this.list.appendChild(document.createElement("div"));
        this.list.lastChild.innerHTML = item.label;
        this.list.lastChild.addEventListener("click", onClick(this, item));
        if (item.action) {
            if (typeof item.action == "function")
                this.list.lastChild.addEventListener("click", (drpdwn=>item.action)(this));
            else
                this.list.lastChild.addEventListener("click", ()=>Function("drpdwn", item.action)(this));
        }
    }
}
/**************************************/
Drpdwn.prototype.down = function(e) {
    if (this.isDown) return;
    if (!this.root) this.root = e.target;
    this.root.appendChild(this.list);
    if (this.editable) {
        this.root.insertBefore(document.createTextNode(""), this.list);
        this.root.contentEditable = "true";
        this.list.contentEditable = false;
        this.root.style.backgroundColor = "#FFDDDD";
        this.root.focus();
        this.root.onblur = (drpdwn=>(e)=>drpdwn.close())(this);
    } else {
        this.root.onmouseout = (drpdwn=>(e)=>drpdwn._to = setTimeout(()=>drpdwn.close(), drpdwn.timeOut))(this);
        this.root.onmouseover = (drpdwn=>(e)=>clearTimeout(drpdwn._to))(this);
    }
    this.isDown = true;
}
Drpdwn.prototype.close = function(e) {
    if (!this.isDown) return;
    if (this.editable) {
        this.root.contentEditable = false;
        this.root.style.backgroundColor = "#FFFFFF";
        this.root.onblur = "";
    } else {
        this.root.onmouseout = "";
        this.root.onmouseover = "";
    }
    this.root.removeChild(this.list);
    clearTimeout(this._to);
    this.isDown = false;
}