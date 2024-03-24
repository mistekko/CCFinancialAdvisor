var get_best_upgrades = function () { //BUG!!! Grandmother upgrades nominally target the building they "benefit" but do not double their cps!!!
    var upgrade_arr = [];
    var unformatted_arr = [];
    var append = false;

    var current_total_cps = Game.cookiesPs;
    
    var upgrade;
    var name, price, target, mult, cps_gain, cpcps, building;

    for (var i = 0; i < Game.UpgradesInStore.length; i++) {
	upgrade = Game.UpgradesInStore[i]
	name  = upgrade.name; 
	price = upgrade.basePrice;

	//if cookie: pool prop == 'cookie'
	if (upgrade.pool=='cookie') {
	    target = 'cookie production';
	    mult = upgrade.power / 100;
	    cps_gain = current_total_cps * mult;
	    append = true;
	}
	
	else if (upgrade.buildingTie != 0) { //if it's a building upgrade
	    building = upgrade.buildingTie; //bug
	    target = building.name
	    cps_gain = Game.cookiesPsByType[building.name] * Game.globalCpsMult;
	    append = true;
	}
	

	if (append) {
	    cpcps = price / cps_gain;
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
    
