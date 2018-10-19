controller = Object.create(null);
/******************************************************************************/
/******************************************************************************/
controller.modified = false;
controller.id = "";
controller.currentData;
controller.list = function() {
    view.left.list(model.data.list());
}
controller.load = function(id) {
    controller.id = id;
    let save = model.data.select(id);
    view.page.forEach(p=>p.setValues(save));
    controller.currentData = JSON.parse(JSON.stringify(view.page.reduce((a, p)=>Object.assign(a, p.getValues()), {})));
}
controller.save = function() {
    if (controller.id !== "")
        model.data.update(controller.id, view.page.reduce((a, p)=>Object.assign(a, p.getValues()), {}));
    else controller.id = model.data.insert(view.page[0].getValue("name"), view.page.reduce((a, p)=>Object.assign(a, p.getValues()), {}));
    controller.list();
}
controller.handleUpdate = function(fieldName, value) {
    view.page.forEach(p=>p.updateFields(fieldName, value));
    value = model.character.update(fieldName, value, controller.currentData);
    view.page.forEach(p=>p.setValues(value));
    controller.currentData = JSON.parse(JSON.stringify(view.page.reduce((a, p)=>Object.assign(a, p.getValues()), {})));
}
/******************************************************************************/
/******************************************************************************/
window.addEventListener("load", ()=>{
    controller.list();
    controller.currentData = JSON.parse(JSON.stringify(view.page.reduce((a, p)=>Object.assign(a, p.getValues()), {})));

//console.log(JSON.stringify(controller.currentData));

});