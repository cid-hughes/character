function Character() {
    this.name = "";
    this.class = [ { class: "", level: 0 } ];
    this.level = 0;
    this.background = "";
    this.player = "";
    this.race = "";
    this.alignment = "";
    this.experience = "";
    this.abilities = {
        str: { total: 0, base: 0, race: 0, lvl: 0 },
        dex: { total: 0, base: 0, race: 0, lvl: 0 },
        con: { total: 0, base: 0, race: 0, lvl: 0 },
        int: { total: 0, base: 0, race: 0, lvl: 0 },
        wis: { total: 0, base: 0, race: 0, lvl: 0 },
        cha: { total: 0, base: 0, race: 0, lvl: 0 }
    };
    this.inspiration = 0;
    this.saves = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    this.skills = { acro: 0, anim: 0, arca: 0, athl: 0, dece: 0, hist: 0, insi: 0, inti: 0, inve: 0,
                    medi: 0, natu: 0, perc: 0, perf: 0, pers: 0, reli: 0, slei: 0, stea: 0, surv: 0 };
    this.passperc = 0;
    this.proficiencies = "";
    this.ac = 0;
    this.init = 0;
    this.speed = 0;
    this.hp = { max: 0, cur: "", tmp: "" };
    this.hd = { total: "", hitdice: "" };
    this.wpn = [ { name: "", atk: 0, dmg: "" }, { name: "", atk: 0, dmg: "" },
                 { name: "", atk: 0, dmg: "" }, { name: "", atk: 0, dmg: "" } ];
    this.attacks = "";
    this.equipment = "";
    this.money = { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
    this.traits = { personality: "", ideals: "", bonds: "", flaws: "" };
    this.features = "";
    this.age = "";
    this.height = "";
    this.weight = "";
    this.eyes = "";
    this.skin = "";
    this.hair = "";
    this.appearance = "";
    this.backstory = "";
    this.allies = "";
    this.organization = "";
    this.orgimg = "";
    this.addfeatures = "";
    this.treasure = "";
    this.splclass = "";
    this.splsave = "";
    this.splattk = "";
    this.spells = [
        { spells: [ "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "" ] },
        { total: 0, expend: 0, spells: [ "", "", "", "", "", "", "", "", "" ] },
    ];
    this.hero = "";
    this.faith = "";
    this.reputation = "";
    this.notes = "";
    this.addnotes = "";
}
Character.prototype.lvltbl = [,
    {exp:     0,pb:2},{exp:   300,pb:2},{exp:   900,pb:2},{exp:  2700,pb:2},{exp:  6500,pb:3},
    {exp: 14000,pb:3},{exp: 23000,pb:3},{exp: 34000,pb:3},{exp: 48000,pb:4},{exp: 64000,pb:4},
    {exp: 85000,pb:4},{exp:100000,pb:4},{exp:120000,pb:5},{exp:140000,pb:5},{exp:165000,pb:5},
    {exp:195000,pb:5},{exp:225000,pb:6},{exp:265000,pb:6},{exp:305000,pb:6},{exp:355000,pb:6}];
Character.prototype.ablmod = [,-5,-4,-4,-3,-3,-2,-2,-1,-1,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
Character.prototype.setName = function(name) {
    this.name = name;
    return { name: name };
}
Character.prototype.setClass = function(classes) {

}
Character.prototype.setBackground = function(background) {

}
Character.prototype.setPlayer = function(player) {
    this.player = player;
    return { player: player };
}
Character.prototype.setRace = function(race) {

}
Character.prototype.setAlignment = function(alignment) {

}
Character.prototype.setExperience = function(experience) {

}
Character.prototype.setStats = function() {

}
Character.prototype.setInspiration = function(inspiration) {
    this.inspiration = inspiration;
    return { inspiration: inspiration };
}
Character.prototype.toggleSkill = function(skill) {

}
Character.prototype.setProficiencies = function(proficiencies) {
    this.proficiencies = proficiencies;
    return { proficiencies: proficiencies };
}
Character.prototype.setArmor = function(armors) {

}
Character.prototype.setMaxHP = function(hp) {
    this.hp.max = hp;
    return { "hp-max": hp };
}
Character.prototype.setCurHP = function(hp) {
    this.hp.cur = hp;
    return { "hp-cur": hp };
}
Character.prototype.setTmpHP = function(hp) {
    this.hp.tmp = hp;
    return { "hp-tmp": hp };
}
Character.prototype.setWeapon = function(weapons) {

}
Character.prototype.setMoney = function(money) {

}
Character.prototype.setEquip = function(equip) {

}
Character.prototype.setTraits = function(traits) {

}
Character.prototype.setFeatures = function(features) {

}
Character.prototype.setAge = function(age) {
    this.age = age;
    return { age: age };
}
Character.prototype.setHeight = function(height) {
    this.height = height;
    return { height: height };
}
Character.prototype.setWeight = function(weight) {
    this.weight = weight;
    return { weight: weight };
}
Character.prototype.setEyes = function(eyes) {
    this.eyes = eyes;
    return { eyes: eyes };
}
Character.prototype.setSkin = function(skin) {
    this.skin = skin;
    return { skin: skin };
}
Character.prototype.setHair = function(hair) {
    this.hair = hair;
    return { hair: hair };
}
Character.prototype.setAppearance = function(img) {

}
Character.prototype.setBackstory = function(backstory) {
    this.backstory = backstory;
    return { backstory: backstory };
}
Character.prototype.setAllies = function(allies) {
    this.allies = allies;
    return { allies: allies };
}
Character.prototype.setOrganization = function(organization, img) {

}
Character.prototype.setAddFeats = function(addFeats) {
    this.addfeatures = addFeats;
    return { "add-feats": addFeats };
}
Character.prototype.setTreasure = function(treasure) {

}
Character.prototype.setSpells = function(level, spells) {

}
Character.prototype.toggleSpell = function(level, spell) {

}
Character.prototype.setExpend = function(level, expend) {

}
Character.prototype.setHero = function(hero) {
    this.hero = hero;
    return { "p-hero": hero };
}
Character.prototype.setFaith = function(faith) {
    this.faith = faith;
    return { "p-faith": faith };
}
Character.prototype.setReputation = function(reputation) {
    this.reputation = reputation;
    return { "p-reputation": reputation };
}
Character.prototype.setNotes = function(notes) {
    this.notes = notes;
    return { notes: notes };
}
Character.prototype.setAddNotes = function(notes) {
    this.addnotes = notes;
    return { "add-notes": notes };
}
Character.prototype.import = function(character) {

}
Character.prototype.export = function(character) {

}
