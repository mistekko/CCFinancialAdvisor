var get_best_buildings = function () {

    //note: cpcps = cookies per cookies per second; the number of cookies you will spend divided by the amount by which it will increase your total cpcps

    
    var table_contents = []; //to store human-readable data 

    var building;
    var name, quantity, price_raw, cps, cpcps;

    var best_value = {cpcps:Number.MAX_SAFE_INTEGER,name:"",price:0};

    //create table containing each building an their respective pricese/cpcps value
    for (var i = 0; i <= 19; i++) {
	building = Game.ObjectsById[i]
	
	name = building.name;
	price = building.price;
	quantity = building.amount;
	
	cps = Game.cookiesPsByType[name] * Game.globalCpsMult / quantity; 


	
	if (cps > 0) cpcps = price / cps; 
	else break; //if the cps !> 0, the building doesn't exist. May exit early if the player skips buying some building

    	table_contents.push({name:`${name}`,price:`${Beautify(price)}`,cps:`${Beautify(cps)}`,cpcps:`${Beautify(cpcps)}`});
	
	//print most efficient purchase
	if (cpcps < best_value.cpcps) {
	    best_value = {cpcps:cpcps,name:name,price:price};
	}
    }

    console.table(table_contents);
    console.log(`Best option: ${best_name} w/ ${Beautify(best_cpcps)} (${best_price})`);
}
