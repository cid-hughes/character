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
            data["sv-str"] = { mod: parseInt(value.mod) + (prevValue["sv-str"].chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.athl = { mod: parseInt(value.mod) + (prevValue.athl.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.athl.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "dex":
            data["sv-dex"] = { mod: parseInt(value.mod) + (prevValue["sv-dex"].chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.acro = { mod: parseInt(value.mod) + (prevValue.acro.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.acro.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.slei = { mod: parseInt(value.mod) + (prevValue.slei.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.slei.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.stea = { mod: parseInt(value.mod) + (prevValue.stea.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.stea.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.ac = 10 + parseInt(value.mod);
            data.init = parseInt(value.mod);
            break;
        case "con":
            data["sv-con"] = { mod: parseInt(value.mod) + (prevValue["sv-con"].chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "int":
            data["sv-int"] = { mod: parseInt(value.mod) + (prevValue["sv-int"].chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.arca = { mod: parseInt(value.mod) + (prevValue.arca.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.arca.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.hist = { mod: parseInt(value.mod) + (prevValue.hist.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.hist.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.inve = { mod: parseInt(value.mod) + (prevValue.inve.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.inve.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.natu = { mod: parseInt(value.mod) + (prevValue.natu.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.natu.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.reli = { mod: parseInt(value.mod) + (prevValue.reli.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.reli.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "wis":
            data["sv-wis"] = { mod: parseInt(value.mod) + (prevValue["sv-wis"].chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.anim = { mod: parseInt(value.mod) + (prevValue.anim.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.anim.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.insi = { mod: parseInt(value.mod) + (prevValue.insi.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.insi.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.medi = { mod: parseInt(value.mod) + (prevValue.medi.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.medi.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.perc = { mod: parseInt(value.mod) + (prevValue.perc.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.perc.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data["pass-perc"] = 10 + parseInt(data.perc.mod);
            data.surv = { mod: parseInt(value.mod) + (prevValue.surv.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.surv.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "cha":
            data["sv-cha"] = { mod: parseInt(value.mod) + (prevValue["sv-cha"].chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.dece = { mod: parseInt(value.mod) + (prevValue.dece.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.dece.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.inti = { mod: parseInt(value.mod) + (prevValue.inti.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.inti.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.perf = { mod: parseInt(value.mod) + (prevValue.perf.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.perf.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data.pers = { mod: parseInt(value.mod) + (prevValue.pers.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2: prevValue.pers.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "prof-bonus":
            data["sv-str"] = { mod: parseInt(prevValue.str.mod) + (prevValue["sv-str"].chkbx?parseInt(value):0) };
            data["sv-dex"] = { mod: parseInt(prevValue.dex.mod) + (prevValue["sv-dex"].chkbx?parseInt(value):0) };
            data["sv-con"] = { mod: parseInt(prevValue.con.mod) + (prevValue["sv-con"].chkbx?parseInt(value):0) };
            data["sv-int"] = { mod: parseInt(prevValue.int.mod) + (prevValue["sv-int"].chkbx?parseInt(value):0) };
            data["sv-wis"] = { mod: parseInt(prevValue.wis.mod) + (prevValue["sv-wis"].chkbx?parseInt(value):0) };
            data["sv-cha"] = { mod: parseInt(prevValue.cha.mod) + (prevValue["sv-cha"].chkbx?parseInt(value):0) };
            data.acro = { mod: parseInt(prevValue.dex.mod) + (prevValue.acro.chkbx==2?parseInt(value) * 2: prevValue.acro.chkbx?parseInt(value):0) };
            data.anim = { mod: parseInt(prevValue.wis.mod) + (prevValue.anim.chkbx==2?parseInt(value) * 2: prevValue.anim.chkbx?parseInt(value):0) };
            data.arca = { mod: parseInt(prevValue.int.mod) + (prevValue.arca.chkbx==2?parseInt(value) * 2: prevValue.arca.chkbx?parseInt(value):0) };
            data.athl = { mod: parseInt(prevValue.str.mod) + (prevValue.athl.chkbx==2?parseInt(value) * 2: prevValue.athl.chkbx?parseInt(value):0) };
            data.dece = { mod: parseInt(prevValue.cha.mod) + (prevValue.dece.chkbx==2?parseInt(value) * 2: prevValue.dece.chkbx?parseInt(value):0) };
            data.hist = { mod: parseInt(prevValue.int.mod) + (prevValue.hist.chkbx==2?parseInt(value) * 2: prevValue.hist.chkbx?parseInt(value):0) };
            data.insi = { mod: parseInt(prevValue.wis.mod) + (prevValue.insi.chkbx==2?parseInt(value) * 2: prevValue.insi.chkbx?parseInt(value):0) };
            data.inti = { mod: parseInt(prevValue.cha.mod) + (prevValue.inti.chkbx==2?parseInt(value) * 2: prevValue.inti.chkbx?parseInt(value):0) };
            data.inve = { mod: parseInt(prevValue.int.mod) + (prevValue.inve.chkbx==2?parseInt(value) * 2: prevValue.inve.chkbx?parseInt(value):0) };
            data.medi = { mod: parseInt(prevValue.wis.mod) + (prevValue.medi.chkbx==2?parseInt(value) * 2: prevValue.medi.chkbx?parseInt(value):0) };
            data.natu = { mod: parseInt(prevValue.int.mod) + (prevValue.natu.chkbx==2?parseInt(value) * 2: prevValue.natu.chkbx?parseInt(value):0) };
            data.perc = { mod: parseInt(prevValue.wis.mod) + (prevValue.perc.chkbx==2?parseInt(value) * 2: prevValue.perc.chkbx?parseInt(value):0) };
            data["pass-perc"] = 10 + parseInt(data.perc.mod);
            data.perf = { mod: parseInt(prevValue.cha.mod) + (prevValue.perf.chkbx==2?parseInt(value) * 2: prevValue.perf.chkbx?parseInt(value):0) };
            data.pers = { mod: parseInt(prevValue.cha.mod) + (prevValue.pers.chkbx==2?parseInt(value) * 2: prevValue.pers.chkbx?parseInt(value):0) };
            data.reli = { mod: parseInt(prevValue.int.mod) + (prevValue.reli.chkbx==2?parseInt(value) * 2: prevValue.reli.chkbx?parseInt(value):0) };
            data.slei = { mod: parseInt(prevValue.dex.mod) + (prevValue.slei.chkbx==2?parseInt(value) * 2: prevValue.slei.chkbx?parseInt(value):0) };
            data.stea = { mod: parseInt(prevValue.dex.mod) + (prevValue.stea.chkbx==2?parseInt(value) * 2: prevValue.stea.chkbx?parseInt(value):0) };
            data.surv = { mod: parseInt(prevValue.wis.mod) + (prevValue.surv.chkbx==2?parseInt(value) * 2: prevValue.surv.chkbx?parseInt(prevValue):0) };
            break;
        case "sv-str": case "sv-dex": case "sv-con": case "sv-int": case "sv-wis": case "sv-cha":
            if (prevValue[fieldName].mod == value.mod)
                data[fieldName] = { mod: parseInt(prevValue[fieldName.substr(-3)].mod) + (value.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "athl":
            if (prevValue[fieldName].mod == value.mod)
                data[fieldName] = { mod: parseInt(prevValue.str.mod) + (value.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2:value.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "acro": case "slei": case "stea":
            if (prevValue[fieldName].mod == value.mod)
                data[fieldName] = { mod: parseInt(prevValue.dex.mod) + (value.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2:value.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "arca": case "hist": case "inve": case "natu": case "reli":
            if (prevValue[fieldName].mod == value.mod)
                data[fieldName] = { mod: parseInt(prevValue.int.mod) + (value.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2:value.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            break;
        case "anim": case "insi": case "medi": case "perc": case "surv":
            if (prevValue[fieldName].mod == value.mod)
                data[fieldName] = { mod: parseInt(prevValue.wis.mod) + (value.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2:value.chkbx?parseInt(prevValue["prof-bonus"]):0) };
            data["pass-perc"] = 10 + (data.perc !== undefined?parseInt(data.perc.mod):parseInt(prevValue.perc.mod));
            break;
        case "dece": case "inti": case "perf": case "pers":
            if (prevValue[fieldName].mod == value.mod)
                data[fieldName] = { mod: parseInt(prevValue.cha.mod) + (value.chkbx==2?parseInt(prevValue["prof-bonus"]) * 2:value.chkbx?parseInt(prevValue["prof-bonus"]):0) };
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