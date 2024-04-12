var get_best_upgrades = function () {
    //get pool for kitten upgrades: Check if the first word is kitten. q
    var upgrade_table_contents = [];
    var append = false;

    var current_total_cps = Game.cookiesPs;

    var upgrade;
    var name, price, target, mult, cps_gain, cpcps, building;

    //granny-algorithm-specific variables
    var granny_quantity, gs_per_percent;

    //milk/kitten-argorithm-specific variables
    var milk_multiplier;
    var specific_kitten_multiplier = [0.1,0.125,0.15,0.175,0.2,0.2,0.2,0.2,0.2,0.175,0.15,0.125,0.115,0.11,0.105,0.1,0.05];

    var best_upgrade = {cpcps:Number.MAX_SAFE_INTEGER,name:"",price:0};
    
    for (var i = 0; i < Game.UpgradesInStore.length; i++) { //bug: this is executing... inifinitely... !
	upgrade = Game.UpgradesInStore[i];
	name    = upgrade.name; 
	price   = upgrade.basePrice;

	if (Game.UpgradesByPool['kitten'].indexOf(upgrade) > 0) { //if the upgrade is in the list of upgrades that are kitten upgrades because Orteil couldn't be arsed to actually use the pool prop consistently	    
	    //the following code was taken directly from cookie clicker source code
	    //start stolen code //it would really be nice if milkMult (here milk_multiplier) was accessible from main.js so I wouldn't have to steal code and blaot this program!
	    console.log("kitty found")
	    
	    mult = 1; var milk_multiplier=1;

	    if (Game.Has('Santa\'s milk and cookies')) milk_multiplier*=1.05;
	    //if (Game.hasAura('Breath of Milk')) milkMult*=1.05;
	    milk_multiplier*=1+Game.auraMult('Breath of Milk')*0.05;
	    if (Game.hasGod) {
		var godLvl=Game.hasGod('mother');
		if (godLvl==1) milk_multiplier*=1.1;
		else if (godLvl==2) milk_multiplier*=1.05;
		else if (godLvl==3) milk_multiplier*=1.03;
	    }
	    milk_multiplier*=Game.eff('milk');
	    //end stolen code

	    milk_multiplier *= Game.milkProgress;

	    let a = 1 
	    for (var j = 0; j < specific_kitten_multiplier.length; j++) 
		if (Game.Has(Game.UpgradesByPool['kitten'][j].name)) 
		    mult *= (1 + specific_kitten_multiplier[j] * milk_multiplier);
	    mult *= (1 + specific_kitten_multiplier[Game.UpgradesByPool['kitten'].indexOf(upgrade)] * milk_multiplier);
	    cps_gain = current_total_cps / Game.cookiesMultByType['kittens'] * mult - Game.cookiesPs;
	    append = true
	}
	
	else if (Game.GrandmaSynergies.indexOf(name) > -1) { //if it's a grandma synergy
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

	    
	if (append) { // we need this data for ever upgrade! 
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
    
