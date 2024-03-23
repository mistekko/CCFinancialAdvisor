var upgrade_arr = [];
var unformated_arr = [];
var append = false;

for (var i = 0; i < Game.UpgradesInStore.length; i++) {
    upgrade = Game.UpgradesInStore[i]
    var name  = upgrade.name; 
    var price = upgrade.basePrice;

    //if cookie: pool prop == 'cookie'
    if (upgrade.pool=='cookie') {
	var target = 'cookie production';
	var mult = upgrade.power / 100;
	var cps_current = Game.cookiesPs;
	append = true;
	var cps_gain = cps_current * mult;
	var cpcps = price / cps_gain
    }
    
    else if (upgrade.buildingTie != 0) { //if it's a building upgrade
	var building = Game.UpgradesInStore[i].buildingTie;
	var target = building.name
	var cps_gain = Game.cookiesPsByType[building.name] * Game.globalCpsMult;
	append = true;
    }
	

    if (append) {
	var cpcps = price / cps_gain;
	upgrade_arr.push({name:`${name}`,target:`${target}`,price:`${Beautify(price)}`,cps:`${Beautify(cps_gain)}`,cpcps:`${Beautify(cpcps)}`});
	append = false;
    }
    
    
}
console.table(upgrade_arr);
