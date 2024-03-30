var get_best_upgrades = function () {
    //get pool for kitten upgrades: Check if the first word is kitten. q
    var upgrade_table_contents = [];
    var append = false;

    var current_total_cps = Game.cookiesPs;

    var upgrade;
    var name, price, target, mult, cps_gain, cpcps, building;

    var granny_quantity, gs_per_percent;

    var best_upgrade = {cpcps:Number.MAX_SAFE_INTEGER,name:"",price:0};

    for (var i = 0; i < Game.UpgradesInStore.length; i++) {
	upgrade = Game.UpgradesInStore[i];
	name  = upgrade.name; 
	price = upgrade.basePrice;

	if (Game.GrandmaSynergies.indexOf(name) > -1) { //if it's a grandma synergy
	    building = upgrade.buildingTie;
	    granny_quantity = Game.Objects["Grandma"].amount;
	    gs_per_percent = (building.id - 1);
	    mult = (granny_quantity / gs_per_percent / 100);
	    console.log(mult)
	    cps_gain = building.storedTotalCps * Game.globalCpsMult * mult;
	    append = true;
	}
	    	
	else if (upgrade.pool=='cookie') { //if it's a cookie production multiplier
	    target = 'cookie production';
	    mult = upgrade.power / 100;
	    cps_gain = current_total_cps * mult;
	    append = true;
	}
	
	else if (upgrade.buildingTie != 0) { //if it's a building upgrade
	    building = upgrade.buildingTie;
	    target = building.name
	    cps_gain = Game.cookiesPsByType[building.name] * Game.globalCpsMult;
	    append = true;
	}

	
	if (append) {
	    cpcps = price / cps_gain;
	    upgrade_table_contents.push({name:`${name}`,target:`${target}`,price:`${Beautify(price)}`,cps:`${Beautify(cps_gain)}`,cpcps:`${Beautify(cpcps)}`});
	    append = false;
	}


	if (cpcps < best_upgrade.cpcps) {
	    best_upgrade = {cpcps:cpcps,name:name,price:price};
	}	
    }

    
    console.table(upgrade_table_contents);
    console.log(`Best option: ${best_upgrade.name} w/ ${Beautify(best_upgrade.cpcps)} (${Beautify(best_upgrade.price)})`);
}
    
