var specific_kitten_multiplier = [0.1,0.125,0.15,0.175,
				  0.2,0.2,0.2,0.2,0.2,
				  0.175,0.15,0.125,0.115,
				  0.11,0.105,0.1,0.05];


var get_best_upgrades = function () {
    var upgrade_table_contents = [];
    var append = false;
    var current_total_cps = Game.cookiesPs;
    var upgrade;
    var name, price, target, mult, cps_gain, cpcps, building;
    var granny_quantity, gs_per_percent;
    var milk_multiplier;

    var best_upgrade = {
	cpcps: Number.MAX_SAFE_INTEGER,
	name: "",
	price: 0
    };

    for (var i = 0; i < Game.UpgradesInStore.length; i++) {
	upgrade = Game.UpgradesInStore[i];
	name    = upgrade.name;
	price   = upgrade.basePrice;

	// if the upgrade is in the list of upgrades that are kitten
	// upgrades because Orteil couldn't be arsed to actually use
	// the pool prop consistently
	if (Game.UpgradesByPool['kitten'].indexOf(upgrade) > 0) {

	    target = 'kitten efficiency';
	    // the following is taken directly from cc source code
	    // start stolen code:
	    milk_multiplier=1;

	    if (Game.Has('Santa\'s milk and cookies')) milk_multiplier*=1.05;
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

	    mult = 1
		+ specific_kitten_multiplier[Game.UpgradesByPool['kitten'].indexOf(upgrade)]
		* milk_multiplier;
	    cps_gain = current_total_cps * mult - Game.cookiesPs;
	    append = true;
	} else if (Game.GrandmaSynergies.indexOf(name) > -1) {
	    building = upgrade.buildingTie;
	    target = building + ' (grandma synergy)';
	    granny_quantity = Game.Objects["Grandma"].amount;
	    gs_per_percent = (building.id - 1);
	    mult = (granny_quantity / gs_per_percent / 100);
	    console.log(mult)
	    cps_gain = building.storedTotalCps * Game.globalCpsMult * mult;
	    append = true;
	} else if (upgrade.pool=='cookie') {
	    target = 'cookie production';
	    mult = upgrade.power / 100;
	    cps_gain = current_total_cps * mult;
	    append = true;
	} else if (upgrade.buildingTie != 0) {
	    building = upgrade.buildingTie;
	    target = building.name
	    cps_gain = Game.cookiesPsByType[building.name] * Game.globalCpsMult;
	    append = true;
	}

	if (append) {
	    cpcps = price / cps_gain;
	    upgrade_table_contents.push({
		name: `${name}`,
		target: `${target}`,
		price: `${Beautify(price)}`,
		cps: `${Beautify(cps_gain)}`,
		cpcps: `${Beautify(cpcps)}`
	    });
	    append = false;
	}

	if (cpcps < best_upgrade.cpcps) {
	    best_upgrade = {cpcps:cpcps,name:name,price:price};
	}
    }

    console.table(upgrade_table_contents);
    console.log(`Best option: ${best_upgrade.name} ` +
		`w/ ${Beautify(best_upgrade.cpcps)} ` +
		`(${Beautify(best_upgrade.price)})`);
}

var get_best_buildings = function () {
    var table_contents = [];
    var building;
    var name, quantity, price_raw, cps, cpcps;
    var best_value = {
	cpcps: Number.MAX_SAFE_INTEGER,
	name: "",
	price: 0
    };

    for (var i = 0; i <= 19; i++) {
	building = Game.ObjectsById[i]
	name = building.name;
	price = building.price;
	quantity = building.amount;
	cps = Game.cookiesPsByType[name] * Game.globalCpsMult / quantity;
	if (cps > 0) cpcps = price / cps;
	else break; // Exits early if the player skipped a building

	table_contents.push({
	    name: `${name}`,
	    price: `${Beautify(price)}`,
	    cps: `${Beautify(cps)}`,
	    cpcps: `${Beautify(cpcps)}`
	});
	if (cpcps < best_value.cpcps) {
	    best_value = {
		cpcps: cpcps,
		name: name,
		price: price
	    };
	}
    }

    console.table(table_contents);
    console.log(`Best option: ${best_value.name} ` +
		`w/ ${Beautify(best_value.cpcps)}` +
		`(${Beautify(best_value.price)})`);
}

var achievement_bonus = () => {
    var milk_multiplier, kitten_multiplier;
    milk_multiplier = kitten_multiplier = 1;
    // the following is taken from cc source code
    // start stolen code:
    if (Game.Has('Santa\'s milk and cookies')) milk_multiplier*=1.05;
    milk_multiplier*=1+Game.auraMult('Breath of Milk')*0.05;
    if (Game.hasGod) {
	var godLvl=Game.hasGod('mother');
	if (godLvl==1) milk_multiplier*=1.1;
	else if (godLvl==2) milk_multiplier*=1.05;
	else if (godLvl==3) milk_multiplier*=1.03;
    }
    milk_multiplier*=Game.eff('milk');
    // end stolen code

    milk_multiplier *= (Game.milkProgress + 1 / 25);
    //we have to recalculate the kitten cookie multiplier since:
    //- it equals Π 1+f1*f2
    //- there's no way of solving the above for f2 (milk_multiplier)
    for (var j = 0; j < specific_kitten_multiplier.length; j++)
	if (Game.Has(Game.UpgradesByPool['kitten'][j].name))
	    kitten_multiplier *= (1 +
				  specific_kitten_multiplier[j] *
				  milk_multiplier);
    return Beautify(Game.cookiesPs /
		    Game.cookiesMultByType['kittens'] *
		    kitten_multiplier -
		    Game.cookiesPs);
}

setInterval(function() {
    get_best_upgrades();
    get_best_buildings();
    achievement_bonus();
}, 5000)
