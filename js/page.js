function Page(title) {
    this.title = title;
}
Page.prototype.page = function(field, misc, columns) {
    let root = document.createElement("div");
    root.classList.add("page");
    root.appendChild(document.createElement("div"));
    root.lastChild.classList.add("t-pg");
    root.lastChild.appendChild(document.createElement("div"));
    root.lastChild.lastChild.classList.add("h-pg");
    root.lastChild.lastChild.innerText = this.title;
    root.lastChild.appendChild(field);
    root.lastChild.appendChild(document.createElement("div"));
    root.lastChild.lastChild.classList.add("misc");
    for (field of misc)
        root.lastChild.lastChild.appendChild(field);
    root.appendChild(document.createElement("div"));
    root.lastChild.classList.add("b-pg");
    for (let column of columns)
        root.lastChild.appendChild(column);
    return root;
}
Page.prototype.container = function(className, elements) {
    let root = document.createElement("div");
    root.classList.add(className);
    for (let element of elements)
        if (typeof element == "object") root.appendChild(element);
    return root;
}
Page.prototype.fldlbl = function(className, label, fieldClasses) {
    let root = document.createElement("div");
    root.classList.add(className);
    let field = document.createElement("div");
    field.classList.add("field");
    if (Array.isArray(fieldClasses))
        for (className of fieldClasses)
            field.classList.add(className);
    root.appendChild(field);
    root.appendChild(document.createElement("label"));
    root.lastChild.innerText = label;
    return { root: root, field: field };
}
Page.prototype.lblfld = function(className, label, fieldClasses) {
    let root = document.createElement("div");
    root.classList.add(className);
    root.appendChild(document.createElement("label"));
    root.lastChild.innerText = label;
    let field = document.createElement("div");
    field.classList.add("field");
    if (Array.isArray(fieldClasses))
        for (className of fieldClasses)
            field.classList.add(className);
    root.appendChild(field);
    return { root: root, field: field };
}
/**************************************/
Page.prototype.setTxtbxEvnt = function(field) {
    field.fontsize = field.style.fontSize;
    checkHeight(field);
    field.addEventListener("click", e=>{
        e.target.contentEditable = "true";
        e.target.style.backgroundColor = "#FFDDDD";
        e.target.focus();
    });
    field.addEventListener("blur", e=>{
        e.target.contentEditable = false;
        e.target.style.backgroundColor = "#FFFFFF";
        e.target.style.fontSize = e.target.fontsize;
        checkHeight(e.target);
    });
}
Page.prototype.setFldEvnt = function(field) {
    field.fontsize = field.style.fontSize;
    checkWidth(field);
    field.addEventListener("click", e=>{
        e.target.contentEditable = "true";
        e.target.style.backgroundColor = "#FFDDDD";
        e.target.focus();
    });
    field.addEventListener("blur", e=>{
        e.target.contentEditable = false;
        e.target.style.backgroundColor = "#FFFFFF";
        e.target.style.fontSize = e.target.fontsize;
        checkHeight(e.target);
    });
}
Page.prototype.setModEvnt = function(field) {
    //field.fontsize = field.style.fontSize;
    //checkWidth(field);
    field.addEventListener("click", e=>{
        e.target.innerText = e.target.innerText.replace(/[^0-9-]/g, "");
        e.target.contentEditable = "true";
        e.target.style.backgroundColor = "#FFDDDD";
        e.target.focus();
    });
    field.addEventListener("blur", e=>{
        e.target.contentEditable = false;
        let v = (e.target.innerText.replace(/\D/g, "") || "0");
        if (v.indexOf("-")==-1) v = "+" + v;
        e.target.innerText = v;
        e.target.style.backgroundColor = "#FFFFFF";
        e.target.style.fontSize = e.target.fontsize;
        //checkHeight(e.target);
    });
}
Page.prototype.setNumEvnt = function(field) {
    field.fontsize = field.style.fontSize;
    checkWidth(field);
    field.addEventListener("click", e=>{
        e.target.innerText = e.target.innerText.replace(/\D/g, "");
        e.target.contentEditable = "true";
        e.target.style.backgroundColor = "#FFDDDD";
        e.target.focus();
    });
    field.addEventListener("blur", e=>{
        e.target.contentEditable = false;
        let v = (e.target.innerText.replace(/\D/g, "") || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        e.target.innerText = v;
        e.target.style.backgroundColor = "#FFFFFF";
        e.target.style.fontSize = e.target.fontsize;
        checkHeight(e.target);
    });
}
Page.prototype.setImgEvnt = function(field, heading, content, imgList) {
    let imgSelect = new Modal({
        className: "default",
        heading: heading,
        content: '<p>'+content+'</p><input type="file" accept=".jpg, .jpeg, .png"><div></div>'
    });
    imgSelect.e.children[0].children[1].children[1].addEventListener("change", (img=>e=>{
        if (!e.target.files.length) return;
        let fr = new FileReader();
        fr.onload = e=>img.src = e.target.result;
        fr.readAsDataURL(e.target.files[0]);
    })(field));
    let list = [];
    for (let label of Object.keys(imgList))
        list.push({ label: label, action: ((img, src)=>()=>img.src = src)(field, imgList[label]) });
    this.setDrpdwnEvnt({ field: imgSelect.e.children[0].children[1].children[2], list: list });
    field.addEventListener("load", ((field, list)=>e=>{
        for (let label of Object.keys(list))
            if (e.target.src.toLowerCase().indexOf(list[label].toLowerCase()) != -1) {
                while (field.childNodes.length>0) field.removeChild(field.childNodes[0]);
                field.appendChild(document.createTextNode(label));
            }
    })(imgSelect.e.children[0].children[1].children[2], imgList));
    field.parentNode.addEventListener("click", ()=>imgSelect.render());
}
Page.prototype.setDrpdwnEvnt = function(field) {
    let drpdwn = field.options ? new Drpdwn(field.list, field.options) : new Drpdwn(field.list);
    field.field.addEventListener("click", (drpdwn=>e=>drpdwn.down(e))(drpdwn));
}
/******************************************************************************/
/******************************************************************************/
function DnD5ePage1() {
    Page.call(this, "D & D 5e");
    this.fields = Object.create(null);
}
DnD5ePage1.prototype = Object.create(Page.prototype);
DnD5ePage1.prototype.constructor = DnD5ePage1;
DnD5ePage1.prototype.stat = function(className, label) {
    let root = document.createElement("div");
    root.classList.add(className);
    root.appendChild(document.createElement("label"));
    root.lastChild.innerText = label;
    let mod = document.createElement("div");
    mod.classList.add("field", "mod");
    root.appendChild(mod);
    let ability = document.createElement("div");
    ability.classList.add("field", "ctr");
    root.appendChild(ability);
    return { root: root, mod: mod, ability: ability };
}
DnD5ePage1.prototype.svsk = function(className, label) {
    let root = document.createElement("div");
    root.classList.add(className);
    let checkbox = document.createElement("div");
    checkbox.classList.add("field", "cb");
    root.appendChild(checkbox);
    let mod = document.createElement("div");
    mod.classList.add("field", "mod");
    root.appendChild(mod);
    root.appendChild(document.createElement("label"));
    root.lastChild.innerText = label;
    return { root: root, checkbox: checkbox, mod: mod };
}
DnD5ePage1.prototype.dthsv = function() {
    let root = document.createElement("div");
    root.classList.add("ds");
    let saves = [];
    for (let row of [ { className: "ds-succ", label: "Successes" },
                { className: "ds-fail", label: "Failures" } ]) {
        root.appendChild(document.createElement("div"));
        root.lastChild.classList.add(row.className);
        root.lastChild.appendChild(document.createElement("label"));
        root.lastChild.lastChild.innerText = row.label;
        saves.push([0,0,0].map(()=>{
            root.lastChild.appendChild(document.createElement("div"));
            root.lastChild.lastChild.classList.add("field", "cb");
            return root.lastChild.lastChild;
        }));
    }
    root.appendChild(document.createElement("label"));
    root.lastChild.innerText = "Death Saves";
    return { root: root, success: saves[0], failure: saves[1] };
}
DnD5ePage1.prototype.attck = function() {
    let root = document.createElement("div");
    root.classList.add("at");
    root.appendChild(document.createElement("div"));
    root.lastChild.classList.add("wpn-hd");
    for (let label of ["Name", "Atk", "Damage"]) {
        root.lastChild.appendChild(document.createElement("label"));
        root.lastChild.lastChild.innerText = label;
    }
    let weapons = [];
    for (let i=0, row, weapon; i<4; i++) {
        root.appendChild(document.createElement("div"));
        root.lastChild.classList.add("wpn");
        weapon = {};
        for (row of [ { name: "name"  , className: "" },
                      { name: "atk"   , className: "mod" },
                      { name: "damage", className: "ctr" } ]) {
            root.lastChild.appendChild(document.createElement("div"))
            root.lastChild.lastChild.classList.add("field");
            if (row.className) root.lastChild.lastChild.classList.add(row.className);
            weapon[row.name] = root.lastChild.lastChild;
        }
        weapons.push(weapon);
    }
    let attacks = this.fldlbl("attacks", "Attacks & Spellcasting", ["txtbx"])
    root.appendChild(attacks.root);
    return { root: root, weapons: weapons, attacks: attacks.field };
}
/******************************************************************************/
DnD5ePage1.prototype.export = function() {
    let obj = Object.create(null);
    for (let n0 of Object.keys(this.fields)) {
        if (n0 == "dthsv") continue;
        if (this.fields[n0].tagName) obj[n0] = this.fields[n0].innerText;
        else {
            obj[n0] = Object.create(null);
            for (let n1 of Object.keys(this.fields[n0])) {
                if (n1 == "checkbox") obj[n0][n1] = this.fields[n0][n1].classList.contains("check");
                else if (n1 == "weapons") {
                    obj[n0][n1] = [];
                    for (let i=0; i<4; i++) {
                        obj[n0][n1][i] = {
                            name: this.fields[n0][n1][i].name.innerText,
                            atk: this.fields[n0][n1][i].atk.innerText,
                            damage: this.fields[n0][n1][i].damage.innerText
                        }
                    }
                } else obj[n0][n1] = this.fields[n0][n1].innerText;
            }
        }
    }
    return obj;
}
DnD5ePage1.prototype.import = function(obj) {
    for (let n0 of Object.keys(obj)) {
        if (typeof obj[n0] == "string") {
            this.fields[n0].innerText = obj[n0];
            checkField(this.fields[n0]);
        } else for (let n1 of Object.keys(obj[n0])) {
            if (typeof obj[n0][n1] == "string") {
                this.fields[n0][n1].innerText = obj[n0][n1];
                checkField(this.fields[n0][n1]);
            } else if (obj[n0][n1] === true) this.fields[n0][n1].classList.add("check");
            else if (obj[n0][n1] === false) this.fields[n0][n1].classList.remove("check");
            else for (let i=0; i<4; i++) {
                this.fields[n0][n1][i].name.innerText = obj[n0][n1][i].name;
                this.fields[n0][n1][i].atk.innerText = obj[n0][n1][i].atk;
                this.fields[n0][n1][i].damage.innerText = obj[n0][n1][i].damage;
                checkField(this.fields[n0][n1][i].name);
                checkField(this.fields[n0][n1][i].atk);
                checkField(this.fields[n0][n1][i].damage);
            }
        }
    }
}
/******************************************************************************/
DnD5ePage1.prototype.render = function(insertBefore) {
    let field, roots = Object.create(null), params;
    /******************/
    for (params of [
        [ "name", "Character Name" ],
        [ "class", "Class & Level" ], [ "background", "Background" ], [ "player", "Player Name" ],
        [ "race", "Race" ], [ "alignment", "Alignment", ["ctr"] ], [ "experience", "Experience", ["num"] ],
        [ "inspiration", "Inspiration", ["mod"] ], [ "prof-bonus", "Proficiency Bonus", ["mod"] ],
        [ "pass-perc", "Passive Perception", ["mod"] ], [ "proficiencies", "Proficiencies & Languages", ["txtbx"] ],
        [ "init", "Inititive", ["mod"] ], [ "spd", "Speed", ["mod"] ],
        [ "hp-cur", "Current Hit Points", ["txtbx"] ], [ "hp-tmp", "Temporary Hit Points", ["txtbx"] ],
        [ "ht-dice", "Hit Dice", ["ctr"] ], [ "equip", "Equipment", ["txtbx"] ], [ "cp", "cp", ["num"] ],
        [ "sp", "sp", ["num"] ], [ "ep", "ep", ["num"] ], [ "gp", "gp", ["num"] ], [ "pp", "pp", ["num"] ],
        [ "tr-personality", "Personality Traits", ["txtbx"] ], [ "tr-ideals", "Ideals", ["txtbx"] ],
        [ "tr-bonds", "Bonds", ["txtbx"] ], [ "tr-flaws", "Flaws", ["txtbx"] ],
        [ "features", "Features & Traits", ["txtbx"] ]
    ]) {
        if (params[2]) field = this.fldlbl(params[0], params[1], params[2]);
        else field = this.fldlbl(params[0], params[1]);
        this.fields[params[0]] = field.field;
        roots[params[0]] = field.root;
    }
    /******************/
    for (params of [
        [ "ac", "Armor Class", ["mod"] ], [ "hp-max", "Hit Point Maximum", ["ctr"] ], [ "ht-total", "Total", ["ctr"] ]
    ]) {
        if (params[2]) field = this.lblfld(params[0], params[1], params[2]);
        else field = this.fldlbl(params[0], params[1]);
        this.fields[params[0]] = field.field;
        roots[params[0]] = field.root;
    }
    /******************/
    for (params of [
        [ "str", "Strength" ], [ "dex", "Dexterity" ], [ "con", "Constitution" ],
        [ "int", "Intelligence" ], [ "wis", "Wisdom" ], [ "cha", "Charisma" ]
    ]) {
        field = this.stat(params[0], params[1]);
        this.fields[params[0]] = { mod: field.mod, ability: field.ability };
        roots[params[0]] = field.root;
    }
    /******************/
    for (params of [
        [ "sv-str", "Strength" ], [ "sv-dex", "Dexterity" ], [ "sv-con", "Constitution" ],
        [ "sv-int", "Intelligence" ], [ "sv-wis", "Wisdom" ], [ "sv-cha", "Charisma" ],
        [ "acro", "Acrobatics" ], [ "anim", "Animal Handling" ], [ "arca", "Arcana" ],
        [ "athl", "Athletics" ], [ "dece", "Deception" ], [ "hist", "History" ],
        [ "insi", "Insight" ], [ "inti", "Intimidate" ], [ "inve", "Investigation" ],
        [ "medi", "Medicine" ], [ "natu", "Nature" ], [ "perc", "Perception" ],
        [ "perf", "Performance" ], [ "pers", "Persuasion" ], [ "reli", "Religion" ],
        [ "slei", "Sleight of Hand" ], [ "stea", "Stealth" ], [ "surv", "Survival" ]
    ]) {
        field = this.svsk(params[0], params[1]);
        this.fields[params[0]] = { checkbox: field.checkbox, mod: field.mod };
        roots[params[0]] = field.root;
    }
    /******************/
    field = this.dthsv();
    this.fields.dthsv = { success: field.success, failure: field.failure };
    roots.dthsv = field.root;
    /******************/
    field = this.attck();
    this.fields.attck = { weapons: field.weapons, attacks: field.attacks };
    roots.attck = field.root;
    /******************/
    roots = this.page(roots.name, [
        roots["class"], roots.background, roots.player,
        roots.race, roots.alignment, roots.experience
    ], [
        this.container("c-pg", [
            this.container("sipss", [
                this.container("stats", [ roots.str, roots.dex, roots.con, roots.int, roots.wis, roots.cha ]),
                this.container("ipss", [
                    roots.inspiration,
                    roots["prof-bonus"],
                    this.container("sv", [ roots["sv-str"], roots["sv-dex"], roots["sv-con"],
                                           roots["sv-int"], roots["sv-wis"], roots["sv-cha"] ]),
                    this.container("sk", [ roots.acro, roots.anim, roots.arca, roots.athl,
                               roots.dece, roots.hist, roots.insi, roots.inti, roots.inve,
                               roots.medi, roots.natu, roots.perc, roots.perf, roots.pers,
                               roots.reli, roots.slei, roots.stea, roots.surv ])
                ])
            ]),
            roots["pass-perc"],
            roots.proficiencies
        ]),
        this.container("c-pg", [
            this.container("de", [
                roots.ac, roots.init, roots.spd,
                this.container("hp", [ roots["hp-max"], roots["hp-cur"], roots["hp-tmp"] ]),
                this.container("ht", [ roots["ht-total"], roots["ht-dice"] ]), roots.dthsv
            ]),
            roots.attck,
            this.container("eq", [
                roots.equip,
                this.container("money", [ roots.cp, roots.sp, roots.ep, roots.gp, roots.pp ])
            ])
        ]),
        this.container("c-pg", [
            this.container("tr", [
                roots["tr-personality"], roots["tr-ideals"], roots["tr-bonds"], roots["tr-flaws"]
            ]),
            roots.features
        ])
    ]);
    roots.id = "page1";
    if (insertBefore) document.body.insertBefore(roots, insertBefore);
    else document.body.appendChild(roots);
    /**************************************/
    [ this.fields.proficiencies, this.fields["hp-cur"], this.fields["hp-tmp"], this.fields.equip,
        this.fields["tr-personality"], this.fields["tr-ideals"], this.fields["tr-bonds"],
        this.fields["tr-flaws"], this.fields.features, this.fields.attck.attacks ].forEach(this.setTxtbxEvnt);
    /******************/
    [ this.fields.name, this.fields.class, this.fields.background, this.fields.player,  this.fields.race,
        this.fields["ht-dice"], this.fields["hp-max"], this.fields["ht-total"],
        this.fields.attck.weapons[0].name, this.fields.attck.weapons[0].damage,
        this.fields.attck.weapons[1].name, this.fields.attck.weapons[1].damage,
        this.fields.attck.weapons[2].name, this.fields.attck.weapons[2].damage,
        this.fields.attck.weapons[3].name, this.fields.attck.weapons[3].damage ].forEach(this.setFldEvnt);
    /******************/
    [ this.fields.inspiration, this.fields["prof-bonus"], this.fields["pass-perc"], this.fields.init,
        this.fields["sv-str"].mod, this.fields["sv-dex"].mod, this.fields["sv-con"].mod,
        this.fields["sv-int"].mod, this.fields["sv-wis"].mod, this.fields["sv-cha"].mod,
        this.fields.acro.mod, this.fields.anim.mod, this.fields.arca.mod,
        this.fields.athl.mod, this.fields.dece.mod, this.fields.hist.mod,
        this.fields.insi.mod, this.fields.inti.mod, this.fields.inve.mod,
        this.fields.medi.mod, this.fields.natu.mod, this.fields.perc.mod,
        this.fields.perf.mod, this.fields.pers.mod, this.fields.reli.mod,
        this.fields.slei.mod, this.fields.stea.mod, this.fields.surv.mod,
        this.fields.attck.weapons[0].atk, this.fields.attck.weapons[1].atk,
        this.fields.attck.weapons[2].atk, this.fields.attck.weapons[3].atk ].forEach(this.setModEvnt);
    /******************/
    [ this.fields.experience, this.fields.ac, this.fields.spd, this.fields.cp,
        this.fields.sp, this.fields.ep, this.fields.gp, this.fields.pp ].forEach(this.setNumEvnt);
    /******************/
    [ { field: this.fields.alignment, list: [
        { label: "LG" }, { label: "NG" }, { label: "CG" },
        { label: "LN" }, { label:  "N" }, { label: "CN" },
        { label: "LE" }, { label: "NE" }, { label: "CE" }
    ] } ].forEach(this.setDrpdwnEvnt);
    /******************/
    for (field of [ this.fields.str.ability, this.fields.dex.ability, this.fields.con.ability,
        this.fields.int.ability, this.fields.wis.ability, this.fields.cha.ability ]) {
        //field.fontsize = field.style.fontSize;
        //checkWidth(field);
        field.addEventListener("click", e=>{
            e.target.contentEditable = "true";
            e.target.style.backgroundColor = "#FFDDDD";
            e.target.focus();
        });
        field.addEventListener("blur", e=>{
            e.target.contentEditable = false;
            e.target.innerText = e.target.innerText.replace(/\D/g, "");
            let v = [,-5,-4,-4,-3,-3,-2,-2,-1,-1,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10][e.target.innerText];
            if (v!="" && String(v).indexOf("-")==-1) v = "+" + v;
            e.target.parentNode.children[1].innerText = v;
            e.target.style.backgroundColor = "#FFFFFF";
            //e.target.style.fontSize = e.target.fontsize;
            //checkHeight(e.target);
        });
    }
    /******************/
    for (field of [ 
        this.fields["sv-str"].checkbox, this.fields["sv-dex"].checkbox, this.fields["sv-con"].checkbox,
        this.fields["sv-int"].checkbox, this.fields["sv-wis"].checkbox, this.fields["sv-cha"].checkbox,
        this.fields.acro.checkbox, this.fields.anim.checkbox, this.fields.arca.checkbox,
        this.fields.athl.checkbox, this.fields.dece.checkbox, this.fields.hist.checkbox,
        this.fields.insi.checkbox, this.fields.inti.checkbox, this.fields.inve.checkbox,
        this.fields.medi.checkbox, this.fields.natu.checkbox, this.fields.perc.checkbox,
        this.fields.perf.checkbox, this.fields.pers.checkbox, this.fields.reli.checkbox,
        this.fields.slei.checkbox, this.fields.stea.checkbox, this.fields.surv.checkbox,
        this.fields.dthsv.success[0], this.fields.dthsv.success[1], this.fields.dthsv.success[2],
        this.fields.dthsv.failure[0], this.fields.dthsv.failure[1], this.fields.dthsv.failure[2]
    ]) {
        field.addEventListener("click", e=>e.target.classList.toggle("check"));
    }
}
/******************************************************************************/
/******************************************************************************/
function DnD5ePage2() {
    Page.call(this, "D & D 5e");
    this.fields = Object.create(null);
}
DnD5ePage2.prototype = Object.create(Page.prototype);
DnD5ePage2.prototype.constructor = DnD5ePage2;
DnD5ePage2.prototype.portaitList = {
    "Aasimar":             "img/Aasimar.png",              "Augrek Brighthelm":   "img/Augrek_Brighthelm.png",
    "Beldora":             "img/Beldora.png",              "Darathra Shendrel":   "img/Darathra_Shendrel.png",
    "Darz Helgar":         "img/Darz_Helgar.png",          "Duvessa Shane":       "img/Duvessa_Shane.png",
    "Fiona Gamwich":       "img/Fiona%20Gamwich.jpg",      "Firbolg":             "img/Firbolg.png",
    "Ghelryn Foehammer":   "img/Ghelryn_Foehammer.png",    "Hobgoblin 1":         "img/Hobgoblin1.png",
    "Hobgoblin 2":         "img/Hobgoblin2.png",           "Jaleh Mithrirmae":    "img/Jaleh%20Mithrirmae.jpg",
    "Kazimil Paviyara":    "img/Kazimil%20Paviyara.png",   "Kenku":               "img/Kenku.png",
    "Kissare Gadatas":     "img/Kissare%20Gadatas.jpg",    "Kobold 1":            "img/Kobold1.png",
    "Kobold 2":            "img/Kobold2.png",              "Kobold 3":            "img/Kobold3.png",
    "Krithra Gorunn":      "img/Krithra%20Gorunn.jpg",     "Lifferlas":           "img/Lifferlas.png",
    "Lizardfolk":          "img/Lizardfolk.png",           "Markham Southwell":   "img/Markham_Southwell.png",
    "Marro Calalando":     "img/Marro%20Calalando.jpg",    "Miros Xelbrin":       "img/Miros_Xelbrin.png",
    "Narth Tezrin":        "img/Narth_Tezrin.png",         "Naxene Drathkala":    "img/Naxene_Drathkala.png",
    "Nazanin Turani":      "img/Nazanin%20Turani.jpg",     "Neurion Silverfrond": "img/Neurion%20Silverfrond.jpg",
    "Odran Swiftshield":   "img/Odran%20Swiftshield.jpg",  "Orc":                 "img/Orc.png",
    "Oren Yogilvy":        "img/Oren_Yogilvy.png",         "Othovir":             "img/Othovir.png",
    "Paeran Mithaviel":    "img/Paeran%20Mithaviel.jpg",   "Quickling":           "img/Quickling.png",
    "Sarianna Ondaiseer":  "img/Sarianna%20Ondaiseer.jpg", "Shalvus Martholio":   "img/Shalvus_Martholio.png",
    "Sir Baric Nylef":     "img/Sir_Baric_Nylef.png",      "Sirac of Suzail":     "img/Sirac_of_Suzail.png",
    "Tabaxi":              "img/Tabaxi.png",               "Triton":              "img/Triton.png",
    "Urgala Meltimer":     "img/Urgala_Meltimer.png",      "Yuan-ti":             "img/Yuan-ti.png",
    "Zanna Raulnor":       "img/Zanna%20Raulnor.png",      "Zi Liang":            "img/Zi_Liang.png"
};
DnD5ePage2.prototype.factionList = {
    "The Emerald Enclave":       "img/factions/The%20Emerald%20Enclave.png",
    "The Harpers":               "img/factions/The%20Harpers.png",
    "The Lords' Alliance":       "img/factions/The%20Lords'%20Alliance.png",
    "The Order of the Gauntlet": "img/factions/The%20Order%20of%20the%20Gauntlet.png",
    "The Raven Queen":           "img/factions/The%20Raven%20Queen.jpg",
    "The Zhentarim":             "img/factions/The%20Zhentarim.png"
};
DnD5ePage2.prototype.imglbl = function(className, label) {
    let root = document.createElement("div");
    root.classList.add(className);
    root.appendChild(document.createElement("div"));
    let img = document.createElement("img");
    root.lastChild.appendChild(img);
    root.appendChild(document.createElement("label"));
    root.lastChild.innerText = label;
    return { root: root, img: img };
}
DnD5ePage2.prototype.fldimglbl = function(className, label, fieldClasses) {
    let root = document.createElement("div");
    root.classList.add(className);
    let field = document.createElement("div");
    field.classList.add("field");
    if (Array.isArray(fieldClasses))
        for (className of fieldClasses)
            field.classList.add(className);
    root.appendChild(field);
    root.appendChild(document.createElement("div"));
    let img = document.createElement("img");
    root.lastChild.appendChild(img);
    root.appendChild(document.createElement("label"));
    root.lastChild.innerText = label;
    return { root: root, field: field, img: img };
}
/******************************************************************************/
DnD5ePage2.prototype.export = function() {
    let obj = Object.create(null);
    for (let n0 of Object.keys(this.fields)) {
        if (n0 == "appearance") obj[n0] = this.fields[n0].src;
        else if (this.fields[n0].tagName) obj[n0] = this.fields[n0].innerText;
        else obj[n0] = {
            field: this.fields[n0].field.innerText,
            img: this.fields[n0].img.src
        }
    }
    return obj;
}
DnD5ePage2.prototype.import = function(obj) {
    for (let n0 of Object.keys(obj)) {
        if (n0 == "appearance") this.fields[n0].src = obj[n0];
        else if (typeof obj[n0] == "string") {
            this.fields[n0].innerText = obj[n0];
            checkField(this.fields[n0]);
        } else {
            this.fields[n0].field.innerText = obj[n0].field;
            this.fields[n0].img.src = obj[n0].img;
            checkField(this.fields[n0].field);
        }
    }
}
/******************************************************************************/
DnD5ePage2.prototype.render = function(insertBefore) {
    let field, roots = Object.create(null), params;
    /******************/
    for (params of [
        [ "name", "Character Name" ],
        [ "age", "Age", ["ctr"] ], [ "height", "Height", ["ctr"] ], [ "weight", "Weight", ["ctr"] ],
        [ "eyes", "Eyes", ["ctr"] ], [ "skin", "Skin", ["ctr"] ], [ "hair", "Hair", ["ctr"] ],
        [ "backstory", "Backstory", ["txtbx"] ], [ "allies", "Allies & Organizations", ["txtbx"] ],
        [ "add-feats", "Additional Features & Traits", ["txtbx"] ], [ "treasure", "Treasure", ["txtbx"] ]
    ]) {
        if (params[2]) field = this.fldlbl(params[0], params[1], params[2]);
        else field = this.fldlbl(params[0], params[1]);
        this.fields[params[0]] = field.field;
        roots[params[0]] = field.root;
    }
    /******************/
    field = this.imglbl("appearance", "Character Appearance");
    this.fields.appearance = field.img;
    roots.appearance = field.root;
    /******************/
    field = this.fldimglbl("organization", "Organization", ["ctr"]);
    this.fields.organization = { field: field.field, img: field.img };
    roots.organization = field.root;
    /******************/
    roots = this.page(roots.name, [
        roots.age, roots.height, roots.weight,
        roots.eyes, roots.skin, roots.hair
    ], [
        this.container("c-pg", [ roots.appearance, roots.backstory ]),
        this.container("c2-pg", [
            this.container("ao", [ roots.allies, roots.organization ]),
            roots["add-feats"], roots.treasure
        ])
    ]);
    roots.id = "page2";
    if (insertBefore) document.body.insertBefore(roots, insertBefore);
    else document.body.appendChild(roots);
    /**************************************/
    [ this.fields.backstory, this.fields.allies, this.fields["add-feats"],
        this.fields.treasure ].forEach(this.setTxtbxEvnt);
    /******************/
    [ this.fields.name, this.fields.age, this.fields.height, this.fields.weight, this.fields.eyes,
        this.fields.skin, this.fields.hair ].forEach(this.setFldEvnt);
    /******************/
    [ { field: this.fields.organization.field, list: [
        { label: "The Emerald Enclave" }, { label: "The Harpers" }, { label: "The Lords' Alliance" },
        { label: "The Order of the Gauntlet" }, { label:  "The Raven Queen" }, { label: "The Zhentarim" }
    ], options: { editable: true } } ].forEach(this.setDrpdwnEvnt);
    /******************/
    this.setImgEvnt(this.fields.appearance, "Character Appearance", "Choose a character appearance.", this.portaitList);
    /******************/
    this.setImgEvnt(this.fields.organization.img, "Organization Symbol", "Choose an organization symbol.", this.factionList);
}
/******************************************************************************/
/******************************************************************************/
function DnD5ePage3() {
    Page.call(this, "D & D 5e");
    this.fields = Object.create(null);
}
DnD5ePage3.prototype = Object.create(Page.prototype);
DnD5ePage3.prototype.constructor = DnD5ePage3;
DnD5ePage3.prototype.spllst = function(className, spellCount, cantrip) {
    let root = document.createElement("div");
    root.classList.add(className);
    root.appendChild(document.createElement("div"));
    root.lastChild.classList.add("sph");
    root.lastChild.appendChild(document.createElement("label"));
    root.lastChild.lastChild.innerText = className.slice(-1);
    let spTotal, spExpend, selected = [], spells = [];
    if (cantrip) {
        root.lastChild.appendChild(document.createElement("label"));
        root.lastChild.lastChild.innerText = "Cantrips";
        root.appendChild(document.createElement("div"));
        root.lastChild.classList.add("spl");
        for (let i=0; i<spellCount; i++) {
            root.lastChild.appendChild(document.createElement("div"));
            root.lastChild.lastChild.classList.add("spell");
            root.lastChild.lastChild.appendChild(document.createElement("div"));
            root.lastChild.lastChild.lastChild.classList.add("field");
            spells.push(root.lastChild.lastChild.lastChild);
        }
        return { root: root, spells: spells };
    }
    spTotal = this.lblfld("sp-total", "Slots Total", ["ctr"]);
    root.lastChild.appendChild(spTotal.root);
    spExpend = this.lblfld("sp-expend", "Slots Expended");
    root.lastChild.appendChild(spExpend.root);
    root.appendChild(document.createElement("div"));
    root.lastChild.classList.add("spl");
    for (let i=0; i<spellCount; i++) {
        root.lastChild.appendChild(document.createElement("div"));
        root.lastChild.lastChild.classList.add("spell");
        root.lastChild.lastChild.appendChild(document.createElement("div"));
        root.lastChild.lastChild.lastChild.classList.add("field", "cb");
        selected.push(root.lastChild.lastChild.lastChild);
        root.lastChild.lastChild.appendChild(document.createElement("div"));
        root.lastChild.lastChild.lastChild.classList.add("field");
        spells.push(root.lastChild.lastChild.lastChild);
    }
    return { root: root, total: spTotal.field, expend: spExpend.field, selected: selected, spells: spells };
}
/******************************************************************************/
DnD5ePage3.prototype.export = function() {
    let obj = Object.create(null), i;
    for (let n0 of Object.keys(this.fields)) {
        if (this.fields[n0].tagName) obj[n0] = this.fields[n0].innerText;
        else {
            obj[n0] = Object.create(null);
            if (n0 != "sp0") {
                obj[n0].total = this.fields[n0].total.innerText;
                obj[n0].expend = this.fields[n0].expend.innerText;
                for (i=0, obj[n0].selected=[]; i<this.fields[n0].selected.length; i++)
                    obj[n0].selected[i] = this.fields[n0].selected[i].classList.contains("check");
            }
            for (i=0, obj[n0].spells=[]; i<this.fields[n0].spells.length; i++)
                obj[n0].spells[i] = this.fields[n0].spells[i].innerText;
        }
    }
    return obj;
}
DnD5ePage3.prototype.import = function(obj) {
    for (let n0 of Object.keys(obj)) {
        if (typeof obj[n0] == "string") {
            this.fields[n0].innerText = obj[n0];
            checkField(this.fields[n0]);
        } else {
            if (n0 != "sp0") {
                this.fields[n0].total.innerText = obj[n0].total;
                this.fields[n0].expend.innerText = obj[n0].expend;
                checkField(this.fields[n0].total);
                checkField(this.fields[n0].expend);
                for (i=0; i<this.fields[n0].selected.length; i++) {
                    if (obj[n0].selected[i]) this.fields[n0].selected[i].classList.add("check");
                    else this.fields[n0].selected[i].classList.remove("check");
                }
            }
            for (i=0; i<this.fields[n0].spells.length; i++) {
                this.fields[n0].spells[i].innerText = obj[n0].spells[i];
                checkField(this.fields[n0].spells[i]);
            }
        }
    }
}
/******************************************************************************/
DnD5ePage3.prototype.render = function(insertBefore) {
    let field, roots = Object.create(null), params;
    /******************/
    for (params of [
        [ "s-class", "Spellcasting Class" ],
        [ "s-ability", "Spellcasting Ability", ["ctr"] ],
        [ "s-save", "Spell Save DC", ["ctr"] ],
        [ "s-attack", "Spell Attack Bonus", ["mod"] ]
    ]) {
        if (params[2]) field = this.fldlbl(params[0], params[1], params[2]);
        else field = this.fldlbl(params[0], params[1]);
        this.fields[params[0]] = field.field;
        roots[params[0]] = field.root;
    }
    /******************/
    for (params of [
        [ "sp0", 11, true ], [ "sp1", 16 ], [ "sp2", 16 ], [ "sp3", 16 ], [ "sp4", 16 ],
        [ "sp5", 11 ], [ "sp6", 11 ], [ "sp7", 11 ], [ "sp8", 9 ], [ "sp9", 9 ]
    ]) {
        if (params[2]) {
            field = this.spllst(params[0], params[1], params[2]);
            this.fields[params[0]] = { spells: field.spells };
        } else {
            field = this.spllst(params[0], params[1]);
            this.fields[params[0]] = { total: field.total, expend: field.expend,
                selected: field.selected, spells: field.spells };
        }
        roots[params[0]] = field.root;
    }
    /******************/
    roots = this.page(roots["s-class"], [
        roots["s-ability"], roots["s-save"], roots["s-attack"]
    ], [
        this.container("c-pg", [ roots.sp0, roots.sp1, roots.sp2 ]),
        this.container("c-pg", [ roots.sp3, roots.sp4, roots.sp5 ]),
        this.container("c-pg", [ roots.sp6, roots.sp7, roots.sp8, roots.sp9 ])
    ]);
    roots.id = "page3";
    if (insertBefore) document.body.insertBefore(roots, insertBefore);
    else document.body.appendChild(roots);
    /**************************************/
    [ this.fields["s-class"], this.fields["s-ability"] ].forEach(this.setFldEvnt);
    this.fields.sp0.spells.forEach(this.setFldEvnt);
    this.fields.sp1.spells.forEach(this.setFldEvnt);
    this.fields.sp2.spells.forEach(this.setFldEvnt);
    this.fields.sp3.spells.forEach(this.setFldEvnt);
    this.fields.sp4.spells.forEach(this.setFldEvnt);
    this.fields.sp5.spells.forEach(this.setFldEvnt);
    this.fields.sp6.spells.forEach(this.setFldEvnt);
    this.fields.sp7.spells.forEach(this.setFldEvnt);
    this.fields.sp8.spells.forEach(this.setFldEvnt);
    this.fields.sp9.spells.forEach(this.setFldEvnt);
    /******************/
    [ this.fields["s-save"], this.fields.sp1.total, this.fields.sp1.expend,
        this.fields.sp2.total, this.fields.sp2.expend, this.fields.sp3.total, this.fields.sp3.expend,
        this.fields.sp4.total, this.fields.sp4.expend, this.fields.sp5.total, this.fields.sp5.expend,
        this.fields.sp6.total, this.fields.sp6.expend, this.fields.sp7.total, this.fields.sp7.expend,
        this.fields.sp8.total, this.fields.sp8.expend, this.fields.sp9.total, this.fields.sp9.expend
    ].forEach(this.setNumEvnt);
    /******************/
    this.setModEvnt(this.fields["s-attack"]);
}
/******************************************************************************/
/******************************************************************************/
function DnD5ePage4() {
    Page.call(this, "D & D 5e");
    this.fields = Object.create(null);
}
DnD5ePage4.prototype = Object.create(Page.prototype);
DnD5ePage4.prototype.constructor = DnD5ePage4;
/******************************************************************************/
DnD5ePage4.prototype.export = function() {
    let obj = Object.create(null), i;
    for (let n0 of Object.keys(this.fields))
        obj[n0] = this.fields[n0].innerText;
    return obj;
}
DnD5ePage4.prototype.import = function(obj) {
    for (let n0 of Object.keys(obj)) {
        this.fields[n0].innerText = obj[n0];
        checkField(this.fields[n0]);
    }
}
/******************************************************************************/
DnD5ePage4.prototype.render = function(insertBefore) {
    let field, roots = Object.create(null), params;
    /******************/
    for (params of [
        [ "name", "Character Name" ],
        [ "p-hero", "Hero Points", ["ctr"] ],
        [ "p-faith", "Faith Points", ["ctr"] ],
        [ "p-reputation", "Reputation", ["ctr"] ],
        [ "notes", "Notes", ["txtbx"] ],
        [ "add-notes", "Additional Notes", ["txtbx"] ]
    ]) {
        if (params[2]) field = this.fldlbl(params[0], params[1], params[2]);
        else field = this.fldlbl(params[0], params[1]);
        this.fields[params[0]] = field.field;
        roots[params[0]] = field.root;
    }
    /******************/
    roots = this.page(roots.name, [
        roots["p-hero"], roots["p-faith"], roots["p-reputation"]
    ], [
        this.container("c2-pg", [ roots.notes ]),
        this.container("c-pg", [ roots["add-notes"] ])
    ]);
    roots.id = "page4";
    if (insertBefore) document.body.insertBefore(roots, insertBefore);
    else document.body.appendChild(roots);
    /**************************************/
    [ this.fields.notes, this.fields["add-notes"] ].forEach(this.setTxtbxEvnt);
    /******************/
    this.setFldEvnt(this.fields.name);
    /******************/
    [ this.fields["p-hero"], this.fields["p-faith"], this.fields["p-reputation"] ].forEach(this.setNumEvnt);
}