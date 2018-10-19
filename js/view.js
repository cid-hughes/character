view = Object.create(null);
/******************************************************************************/
/******************************************************************************/
view.left = Object.create(null);
/**************************************/
view.left.root = document.createElement("div");
view.left.root.id = "left";
/******************/
view.left.list = function(list) {
    view.left.root.innerHTML = "";
    view.left.root.appendChild(document.createElement("div"));
    view.left.root.lastChild.classList.add("button");
    view.left.root.lastChild.innerText = "New Character";
    view.left.root.lastChild.addEventListener("click", ()=>{
        view.page.forEach(p=>p.clear());
    });
/********/
    list.sort().forEach(li=>{
        view.left.root.appendChild(document.createElement("div"));
        view.left.root.lastChild.classList.add("button");
        view.left.root.lastChild.innerText = li.name;
        view.left.root.lastChild.addEventListener("click", (id=>()=>{
            controller.load(id);
        })(li.id));
    });
}
/******************************************************************************/
view.right = Object.create(null);
/**************************************/
view.right.root = document.createElement("div");
view.right.root.id = "right";
/******************/
[ "Page 1", "Page 2", "Page 3", "Page 4" ].forEach((label,i)=>{
    view.right.root.appendChild(document.createElement("div"));
    view.right.root.lastChild.classList.add("button");
    view.right.root.lastChild.innerText = label;
    view.right.root.lastChild.addEventListener("click", (idx=>()=>{
        view.page.forEach((p,i)=>{
            p.root.style.zIndex = i==idx?1:0;
        });
    })(i));
});
/******************************************************************************/
view.panel = Object.create(null);
/**************************************/
view.panel.root = document.createElement("div");
view.panel.root.classList.add("panel");
/**************************************/
view.panel.root.appendChild(document.createElement("div"));
view.panel.root.lastChild.classList.add("save");
view.panel.root.lastChild.innerText = "save";
view.panel.root.lastChild.addEventListener("click", ()=>{
    controller.save();
});
/**************************************/
view.panel.root.appendChild(document.createElement("div"));
view.panel.root.lastChild.classList.add("delete");
view.panel.root.lastChild.innerText = "delete";
view.panel.root.lastChild.addEventListener("click", ()=>{
    localStorage.clear();
    model.data.init();
    controller.list();
});
/**************************************/
//view.panel.root.appendChild(document.createElement("div"));
//view.panel.root.lastChild.classList.add("options");
//view.panel.root.lastChild.innerText = "options";
//view.panel.root.lastChild.addEventListener("click", ()=>{});
/******************************************************************************/
view.modal = Object.create(null);
/**************************************/
//view.modal.[modal] = new Modal({});
/******************************************************************************/
view.func = Object.create(null);
view.func.ppuf = (f,n,v)=>{
    if (f.cur.cb === undefined)
        f.cur.mod = f.cur.adj = f.cur.pb = f.cur.cb = 0;
    switch (n) {
        case "wis":
            if (f.cur.mod !== v.mod)
                f.cur.mod = parseInt(v.mod);
            break;
        case "prof-bonus":
            if (f.cur.pb !== v)
                f.cur.pb = parseInt(v);
            break;
        case "perc":
            if (f.cur.cb !== v.chkbx)
                f.cur.cb = v.chkbx;
            if ((f.cur.mod + f.cur.adj + f.cur.pb * f.cur.cb) !== v.mod)
                f.cur.adj = parseInt(v.mod) - (f.cur.mod + f.cur.pb * f.cur.cb);
            break;
        default:
            return;
    }
    f.setValue(10 + f.cur.mod + f.cur.adj + f.cur.pb * f.cur.cb);
}
/******************************************************************************/
view.page = [];
/**************************************/
[   { name: "name", label: "Character Name", fontSize: "1.2em" },
    { name: "name", label: "Character Name", fontSize: "1.2em" },
    { name: "s-class", label: "Spellcasting Class", fontSize: "1.2em" },
    { name: "name", label: "Character Name", fontSize: "1.2em" }
].forEach((f,i)=>{
    view.page[i] = new Page({ name: "page" + (i + 1), handler: (f,v)=>controller.handleUpdate(f,v) });
    view.page[i].addContainer(new Container({ name: "t-pg" }));
    view.page[i].lastElement.addHTML(document.createElement("div"));
    view.page[i].lastElement.lastElement.classList.add("h-pg");
    view.page[i].lastElement.lastElement.innerText = "D & D 5e";
    view.page[i].lastElement.addField(new BasicField(f));
    view.page[i].lastElement.addContainer(new Container({ name: "misc" }));
});
/******************/
for (let field of [
    { name: "class", label: "Class & Level" },
    { name: "background", label: "Background" },
    { name: "player", label: "Player Name" },
    { name: "race", label: "Race" }
]) view.page[0].lastElement.lastElement.addField(new BasicField(field).changeOrder());
view.page[0].lastElement.lastElement.addField(new DropdownField({ name: "alignment", label: "Alignment", list: [
    { label: "LG" }, { label: "NG" }, { label: "CG" },
    { label: "LN" }, { label:  "N" }, { label: "CN" },
    { label: "LE" }, { label: "NE" }, { label: "CE" }
], classes: [ "ctr" ] }).changeOrder());
view.page[0].lastElement.lastElement.addField(new NumberField({ name: "experience", label: "Experience" }).changeOrder());
/******************/
for (let field of [
    { name: "gender", label: "Gender", classes: [ "ctr" ] },
    { name: "age", label: "Age", classes: [ "ctr" ] },
    { name: "htwt", label: "Height & Weight", classes: [ "ctr" ] },
    { name: "eyes", label: "Eyes", classes: [ "ctr" ] },
    { name: "skin", label: "Skin", classes: [ "ctr" ] },
    { name: "hair", label: "Hair", classes: [ "ctr" ] }
]) view.page[1].lastElement.lastElement.addField(new BasicField(field).changeOrder());
/******************/
view.page[2].lastElement.lastElement.addField(new BasicField({ name: "s-ability", label: "Spellcasting Ability", fontSize: "1.5em", classes: [ "ctr" ] }).changeOrder());
view.page[2].lastElement.lastElement.addField(new StatField({ name: "s-save", label: "Spell Save DC", fontSize: "1.5em" }).changeOrder());
view.page[2].lastElement.lastElement.addField(new ModField({ name: "s-attack", label: "Spell Attack Bonus", fontSize: "1.5em" }).changeOrder());
/******************/
for (let field of [
    { name: "p-hero", label: "Hero Points", fontSize: "1.5em" },
    { name: "p-faith", label: "Faith Points", fontSize: "1.5em" },
    { name: "p-reputation", label: "Reputation", fontSize: "1.5em" }
]) view.page[3].lastElement.lastElement.addField(new StatField(field).changeOrder());
/**************************************/
view.page[0].addContainer(new Container({ name: "b-pg" }));
view.page[0].lastElement.addContainer(new Container({ name: "c-pg" }));
view.page[0].lastElement.lastElement.addContainer(new Container({ name: "sipss" }));
view.page[0].lastElement.lastElement.lastElement.addContainer(new Container({ name: "stats" }));
for (let field of [
    { name: "str", label: "Strength", fontSize: "1.2em" },
    { name: "dex", label: "Dexterity", fontSize: "1.2em" },
    { name: "con", label: "Constitution", fontSize: "1.2em" },
    { name: "int", label: "Intelligence", fontSize: "1.2em" },
    { name: "wis", label: "Wisdom", fontSize: "1.2em" },
    { name: "cha", label: "Charisma", fontSize: "1.2em" }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new StatModField(field));
view.page[0].lastElement.lastElement.lastElement.addContainer(new Container({ name: "ipss" }));
view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new StatField({ name: "inspiration", label: "Inspiration", fontSize: "1.4em" }).changeOrder());
view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new ModField({ name: "prof-bonus", label: "Proficiency Bonus", fontSize: "1.4em" }).changeOrder());
view.page[0].lastElement.lastElement.lastElement.lastElement.addContainer(new Container({ name: "sv" }));
for (let field of [
    { name: "sv-str", label: "Strength", update: "str" },
    { name: "sv-dex", label: "Dexterity", update: "dex" },
    { name: "sv-con", label: "Constitution", update: "con" },
    { name: "sv-int", label: "Intelligence", update: "int" },
    { name: "sv-wis", label: "Wisdom", update: "wis" },
    { name: "sv-cha", label: "Charisma", update: "cha" }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.lastElement.addField(new CheckboxModField(field).changeOrder());
view.page[0].lastElement.lastElement.lastElement.lastElement.addContainer(new Container({ name: "sk" }));
for (let field of [
    { name: "acro", label: "Acrobatics", update: "dex", canDouble: true },
    { name: "anim", label: "Animal Handling", update: "wis", canDouble: true },
    { name: "arca", label: "Arcana", update: "int", canDouble: true },
    { name: "athl", label: "Athletics", update: "str", canDouble: true },
    { name: "dece", label: "Deception", update: "cha", canDouble: true },
    { name: "hist", label: "History", update: "int", canDouble: true },
    { name: "insi", label: "Insight", update: "wis", canDouble: true },
    { name: "inti", label: "Intimidate", update: "cha", canDouble: true },
    { name: "inve", label: "Investigation", update: "int", canDouble: true },
    { name: "medi", label: "Medicine", update: "wis", canDouble: true },
    { name: "natu", label: "Nature", update: "int", canDouble: true },
    { name: "perc", label: "Perception", update: "wis", canDouble: true },
    { name: "perf", label: "Performance", update: "cha", canDouble: true },
    { name: "pers", label: "Persuasion", update: "cha", canDouble: true },
    { name: "reli", label: "Religion", update: "int", canDouble: true },
    { name: "slei", label: "Sleight of Hand", update: "dex", canDouble: true },
    { name: "stea", label: "Stealth", update: "dex", canDouble: true },
    { name: "surv", label: "Survival", update: "wis", canDouble: true }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.lastElement.addField(new CheckboxModField(field).changeOrder());
view.page[0].lastElement.lastElement.addField(new StatField({ name: "pass-perc", label: "Passive Perception", fontSize: "1.4em", update: view.func.ppuf }).changeOrder());
view.page[0].lastElement.lastElement.addField(new TextboxField({ name: "proficiencies", label: "Proficiencies & Languages" }).changeOrder());
/******************/
view.page[0].lastElement.addContainer(new Container({ name: "c-pg" }));
view.page[0].lastElement.lastElement.addContainer(new Container({ name: "de" }));
view.page[0].lastElement.lastElement.lastElement.addField(new StatField({ name: "ac", label: "Armor Class", fontSize: "2em" }));
view.page[0].lastElement.lastElement.lastElement.addField(new ModField({ name: "init", label: "Inititive", fontSize: "2em" }).changeOrder());
view.page[0].lastElement.lastElement.lastElement.addField(new StatField({ name: "spd", label: "Speed", fontSize: "2em" }).changeOrder());
view.page[0].lastElement.lastElement.lastElement.addContainer(new Container({ name: "hp" }));
view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new StatField({ name: "hp-max", label: "Hit Point Maximum" }));
for (let field of [
    { name: "hp-cur", label: "Current Hit Points" },
    { name: "hp-tmp", label: "Temporary Hit Points" }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new TextboxField(field).changeOrder());
view.page[0].lastElement.lastElement.lastElement.addContainer(new Container({ name: "ht" }));
view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new BasicField({ name: "ht-total", label: "Total", classes: [ "ctr" ] }));
view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new BasicField({ name: "ht-dice", label: "Hit Dice", fontSize: "1.2em", classes: [ "ctr" ] }).changeOrder());
view.page[0].lastElement.lastElement.lastElement.addContainer(new Container({ name: "ds" }));
for (let field of [
    { name: "ds-succ", label: "Successes", length: 3 },
    { name: "ds-fail", label: "Failures", length: 3 }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new CheckboxCountField(field));
view.page[0].lastElement.lastElement.lastElement.lastElement.addHTML(document.createElement("label"));
view.page[0].lastElement.lastElement.lastElement.lastElement.lastElement.innerText = "Death Saves";
view.page[0].lastElement.lastElement.addField(new AtField());
view.page[0].lastElement.lastElement.addContainer(new Container({ name: "eq" }));
view.page[0].lastElement.lastElement.lastElement.addField(new TextboxField({ name: "equip", label: "Equipment" }).changeOrder());
view.page[0].lastElement.lastElement.lastElement.addContainer(new Container({ name: "money" }));
for (let field of [
    { name: "cp", label: "cp" },
    { name: "sp", label: "sp" },
    { name: "ep", label: "ep" },
    { name: "gp", label: "gp" },
    { name: "pp", label: "pp" }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.addField(new NumberField(field).changeOrder());
/******************/
view.page[0].lastElement.addContainer(new Container({ name: "c-pg" }));
view.page[0].lastElement.lastElement.addContainer(new Container({ name: "tr" }));
for (let field of [
    { name: "tr-personality", label: "Personality Traits" },
    { name: "tr-ideals", label: "Ideals" },
    { name: "tr-bonds", label: "Bonds" },
    { name: "tr-flaws", label: "Flaws" }
]) view.page[0].lastElement.lastElement.lastElement.addField(new TextboxField(field).changeOrder());
view.page[0].lastElement.lastElement.addField(new TextboxField({ name: "features", label: "Features & Traits" }).changeOrder());
/**************************************/
view.page[1].addContainer(new Container({ name: "b-pg" }));
view.page[1].lastElement.addContainer(new Container({ name: "c-pg" }));
view.page[1].lastElement.lastElement.addField(new ImageField({ name: "appearance", label: "Appearance" }).changeOrder());
view.page[1].lastElement.lastElement.addField(new TextboxField({ name: "backstory", label: "Backstory" }).changeOrder());
/******************/
view.page[1].lastElement.addContainer(new Container({ name: "c2-pg" }));
view.page[1].lastElement.lastElement.addContainer(new Container({ name: "ao" }));
view.page[1].lastElement.lastElement.lastElement.addField(new TextboxField({ name: "allies", label: "Allies & Organization" }).changeOrder());
view.page[1].lastElement.lastElement.lastElement.addField(new DropdownImageField({ name: "organization", label: "Organization", list: [
    { label: "The Emerald Enclave",       value: "img/factions/the%20emerald%20enclave.png"           },
    { label: "The Harpers",               value: "img/factions/the%20harpers.png"                     },
    { label: "The Lords' Alliance",       value: "img/factions/the%20lords'%20alliance.png"           },
    { label: "The Order of the Gauntlet", value: "img/factions/the%20order%20of%20the%20gauntlet.png" },
    { label: "The Raven Queen",           value: "img/factions/the%20raven%20queen.jpg"               },
    { label: "The Zhentarim",             value: "img/factions/the%20zhentarim.png"                   },
    { label: "House Medani",              value: "img/factions/detection%20medani.jpg"                },
    { label: "House Tharashk",            value: "img/factions/finding%20tharashk.jpg"                },
    { label: "House Vadalis",             value: "img/factions/handling%20vadalis.jpg"                },
    { label: "House Jorasco",             value: "img/factions/healing%20jorasco.jpg"                 },
    { label: "House Ghallanda",           value: "img/factions/hospitality%20ghallanda.jpg"           },
    { label: "House Cannith",             value: "img/factions/making%20cannith.jpg"                  },
    { label: "House Orien",               value: "img/factions/passage%20orien.jpg"                   },
    { label: "House Sivis",               value: "img/factions/scribing%20sivis.jpg"                  },
    { label: "House Deneith",             value: "img/factions/sentinel%20deneith.jpg"                },
    { label: "House Phiarlan",            value: "img/factions/shadow%20phiarlan.jpg"                 },
    { label: "House Thurannil",           value: "img/factions/shadow%20thurannil.jpg"                },
    { label: "House Lyrandar",            value: "img/factions/storm%20lyrandar.jpg"                  },
    { label: "House Kundarak",            value: "img/factions/warding%20kundarak.jpg"                },
    { label: "House Tarkanan",            value: "img/factions/aberrant%20tarkanan.jpg"               }
], classes: [ "ctr" ], editable: true }).changeOrder());
for (let field of [
    { name: "add-feats", label: "Additional Features & Traits" },
    { name: "treasure", label: "Treasure" }
]) view.page[1].lastElement.lastElement.addField(new TextboxField(field).changeOrder());
/**************************************/
view.page[2].addContainer(new Container({ name: "b-pg" }));
for (let column of [
    [   { name: "sp0", label: "0", spells: 11, isCantrip: true },
        { name: "sp1", label: "1", spells: 16 },
        { name: "sp2", label: "2", spells: 16 }
    ], [
        { name: "sp3", label: "3", spells: 16 },
        { name: "sp4", label: "4", spells: 16 },
        { name: "sp5", label: "5", spells: 11 }
    ], [
        { name: "sp6", label: "6", spells: 11 },
        { name: "sp7", label: "7", spells: 11 },
        { name: "sp8", label: "8", spells: 9 },
        { name: "sp9", label: "9", spells: 9 }
    ]
]) {
    view.page[2].lastElement.addContainer(new Container({ name: "c-pg" }));
    for (let field of column)
        view.page[2].lastElement.lastElement.addField(new SpellListField(field));
}
/**************************************/
view.page[3].addContainer(new Container({ name: "b-pg" }));
view.page[3].lastElement.addContainer(new Container({ name: "c2-pg" }));
view.page[3].lastElement.lastElement.addField(new TextboxField({ name: "notes", label: "Notes" }).changeOrder());
/******************/
view.page[3].lastElement.addContainer(new Container({ name: "c-pg" }));
view.page[3].lastElement.lastElement.addField(new TextboxField({ name: "add-notes", label: "Additional Notes" }).changeOrder());
/******************************************************************************/
/******************************************************************************/
window.addEventListener("load", ()=>{
/******************************************************************************/
    document.body.appendChild(view.left.root);
/**************************************/
    for (let element of view.left.root.children)
        checkWidth(element);
/******************************************************************************/
    document.body.appendChild(view.panel.root);
/**************************************/
    view.page.forEach(p=>document.body.appendChild(p.render()));
/******************************************************************************/
    document.body.appendChild(view.right.root);
/******************************************************************************/
});