const upgrades = function () {
    var upgrade_arr = [];
    var unformatted_arr = [];
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
	    unformatted_arr.push({name:`${name}`,target:`${target}`,price:price,cps:`${cps_gain}`,cpcps:cpcps});
	    append = false;
	}
	
	
    }
    console.table(upgrade_arr);

    var best_cpcps = Number.MAX_SAFE_INTEGER;
    var best_name;
    var best_price;
    for (i in unformatted_arr) {
	if (unformatted_arr[i].cpcps < best_cpcps) {
	    best_cpcps = unformatted_arr[i].cpcps;
	    best_name  = unformatted_arr[i].name;
	    best_price = unformatted_arr[i].price;
	}
    }
    
    console.log(`Best option: ${best_name} w/ ${Beautify(best_cpcps)} (${Beautify(best_price)})`);
}
    
