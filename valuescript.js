const bV = function () {
    var table_contents = []; //to store human-readable data
    var cpcps_array = []; //to store unformated data

    var building;
    var name, quantity, price_raw, cps, cpcps;
    
    for (var i = 0; i <= 19; i++) {
	building = Game.ObjectsById[i]
	
	name = building.name;
	price_raw = building.price;
	quantity = building.amount;
	
	cps = Game.cookiesPsByType[name] * Game.globalCpsMult / quantity; 
  		
	if (cps > 0) {
	    cpcps = price_raw / cps;
	    cpcps_array.push(cpcps);	    
    	    table_contents.push({name:`${name}`,price:`${Beautify(price_raw)}`,cps:`${Beautify(cps)}`,cpcps:`${Beautify(cpcps)}`});
	} else break; //this improves the efficiency slightly, but causes bugs for any psychos who completely skip any building.
    }

    console.table(table_contents);


    //print what purchase would be the best so that the user doesn't have to go through the entire table, potentially making mistakes
    var best_cpcps = Number.MAX_SAFE_INTEGER;
    var best_name, best_price
    for (i in table_contents) {
	if (cpcps_array[i] < best_cpcps) {
	    best_cpcps = cpcps_array[i];
	    best_name  = table_contents[i].name;
	    best_price = table_contents[i].price;
	}
    }

    console.log(`Best option: ${best_name} w/ ${Beautify(best_cpcps)} (${best_price})`);
}
