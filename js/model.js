model = Object.create(null);
/******************************************************************************/
/******************************************************************************/
model.data = Object.create(null);
/**************************************/
model.data.init = function(options) {
    let table = Object.assign({
        list: [],
        currentID: 0
    }, JSON.parse(localStorage.getItem("characterTable")));
    localStorage.setItem("characterTable", JSON.stringify(table));
}
/******************/
model.data.getOptions = function() {
    let table = JSON.parse(localStorage.getItem("characterTable"));
    delete table.list;
    delete table.currentID;
    return table;
}
/******************/
model.data.setOptions = function(options) {
    let table = Object.assign(JSON.parse(localStorage.getItem("characterTable")), options);
    localStorage.setItem("characterTable", JSON.stringify(table));
}
/**************************************/
model.data.list = function() {
    return JSON.parse(localStorage.getItem("characterTable")).list;
}
/******************/
model.data.insert = function(entryName, data) {
    let table = JSON.parse(localStorage.getItem("characterTable"));
    let newID = table.currentID++;
    let entry = Object.create(null);
    entry.id = newID;
    entry.name = entryName;
    table.list.push(entry);
    localStorage.setItem("characterTable", JSON.stringify(table));
    localStorage.setItem("characterID" + newID, JSON.stringify(data));
    return newID;
}
/******************/
model.data.select = function(id) {
    return JSON.parse(localStorage.getItem("characterID" + id));
}
/******************/
model.data.update = function(id, data) {
    localStorage.setItem("characterID" + newID, JSON.stringify(data));
}
/******************/
model.data.remove = function(id) {
    let table = JSON.parse(localStorage.getItem("characterTable"));
    delete table.list[id];
    localStorage.removeItem("characterID" + id);
}
/******************************************************************************/
model.character = Object.create(null);
/**************************************/
model.character.update = function(fieldName, value, prevValue) {
    let data = Object.create(null);
    switch(fieldName) {
        case "name":
            data.name = value;
            break;
        case "class":
            break;
        case "background":
            break;
        case "race":
            break;
        case "alignment":
            break;
        case "experience":
            break;
        case "str":
            break;
        case "dex":
            data.ac = 10 + parseInt(value.mod);
            data.init = parseInt(value.mod);
            break;
        case "con":
            break;
        case "int":
            break;
        case "wis":
            break;
        case "cha":
            break;
        case "prof-bonus":
            break;
        case "sv-str": case "sv-dex": case "sv-con": case "sv-int": case "sv-wis": case "sv-cha":
            break;
        case "athl":
            break;
        case "acro": case "slei": case "stea":
            break;
        case "arca": case "hist": case "inve": case "natu": case "reli":
            break;
        case "anim": case "insi": case "medi": case "perc": case "surv":
            break;
        case "dece": case "inti": case "perf": case "pers":
            break;
        case "pass-perc":
            break;
        case "proficiencies":
            break;
        case "attacks":
            break;
        case "equip":
            break;
        case "features":
            break;
        case "add-feats":
            break;
        case "treasure":
            break;
    }
    return data;
}
/******************************************************************************/
/******************************************************************************/
window.addEventListener("load", ()=>{
    model.data.init();
});