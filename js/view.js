view = Object.create(null);
/******************************************************************************/
/******************************************************************************/
view.left = Object.create(null);
/**************************************/
view.left.root = document.createElement("div");
view.left.root.id = "left";
/******************/
view.left.root.appendChild(document.createElement("div"));
view.left.root.lastChild.classList.add("button");
view.left.root.lastChild.innerText = "New Character";
view.left.root.lastChild.addEventListener("click", ()=>{
    view.page.forEach(p=>p.clear());
});
/******************/
/* character load button code goes here */
saves.forEach((s,i)=>{
    view.left.root.appendChild(document.createElement("div"));
    view.left.root.lastChild.classList.add("button");
    view.left.root.lastChild.innerText = s.name;
    checkWidth(view.left.root.lastChild);
    view.left.root.lastChild.addEventListener("click", (save=>()=>{
        view.page.forEach(p=>p.setValues(save));
    })(s));
});
/* character load button code goes here */
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
//view.panel.root.lastChild.addEventListener("click", ()=>{});
/**************************************/
view.panel.root.appendChild(document.createElement("div"));
view.panel.root.lastChild.classList.add("delete");
view.panel.root.lastChild.innerText = "delete";
//view.panel.root.lastChild.addEventListener("click", ()=>{});
/******************************************************************************/
view.page = [];
/**************************************/
[   { name: "name", label: "Character Name" },
    { name: "name", label: "Character Name" },
    { name: "s-class", label: "Spellcasting Class" },
    { name: "name", label: "Character Name" }
].forEach((f,i)=>{
    view.page[i] = new Page({ name: "page" + (i + 1) });
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
    { name: "sv-str", label: "Strength" },
    { name: "sv-dex", label: "Dexterity" },
    { name: "sv-con", label: "Constitution" },
    { name: "sv-int", label: "Intelligence" },
    { name: "sv-wis", label: "Wisdom" },
    { name: "sv-cha", label: "Charisma" }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.lastElement.addField(new CheckboxModField(field).changeOrder());
view.page[0].lastElement.lastElement.lastElement.lastElement.addContainer(new Container({ name: "sk" }));
for (let field of [
    { name: "acro", label: "Acrobatics" },
    { name: "anim", label: "Animal Handling" },
    { name: "arca", label: "Arcana" },
    { name: "athl", label: "Athletics" },
    { name: "dece", label: "Deception" },
    { name: "hist", label: "History" },
    { name: "insi", label: "Insight" },
    { name: "inti", label: "Intimidate" },
    { name: "inve", label: "Investigation" },
    { name: "medi", label: "Medicine" },
    { name: "natu", label: "Nature" },
    { name: "perc", label: "Perception" },
    { name: "perf", label: "Performance" },
    { name: "pers", label: "Persuasion" },
    { name: "reli", label: "Religion" },
    { name: "slei", label: "Sleight of Hand" },
    { name: "stea", label: "Stealth" },
    { name: "surv", label: "Survival" }
]) view.page[0].lastElement.lastElement.lastElement.lastElement.lastElement.addField(new CheckboxModField(field).changeOrder());
view.page[0].lastElement.lastElement.addField(new StatField({ name: "pass-perc", label: "Passive Perception", fontSize: "1.4em" }).changeOrder());
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
    { label: "The Zhentarim",             value: "img/factions/the%20zhentarim.png"                   }
], classes: [ "ctr" ], editable: true }).changeOrder());
for (let field of [
    { name: "add-feats", label: "Additional Features & Traits" },
    { name: "treasure", label: "Treasure" }
]) view.page[1].lastElement.lastElement.addField(new TextboxField(field).changeOrder());
/**************************************/
view.page[2].addContainer(new Container({ name: "b-pg" }));
for (let column of [
    [
        { name: "sp0", label: "0", spells: 11, isCantrip: true },
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
/******************************************************************************/
    document.body.appendChild(view.panel.root);
/**************************************/
    view.page.forEach(p=>document.body.appendChild(p.render()));
/******************************************************************************/
    document.body.appendChild(view.right.root);
/******************************************************************************/
});