var upgrade_arr = [];
var unformated_arr = [];

for (var i = 0; i < Game.UpgradesInStore.length; i++) {
    upgrade = Game.UpgradesById[Game.UpgradesInStore[i].id]
    var name  = upgrade.name; //nesting the Game dot expressions may not be necessary: UpgradesInStore may return the whole upgrade
    var price = upgrade.basePrice;

    //if cookie: //buildingTie: 0
    //get cookie mult
    //get current cps
    //current cps * (1 + mult) #cps after buying upgrade
    //ans - current cps #cps gain
    //price / cps gain


    if (upgrade.buildingTie != 0) { //if it's a building upgrade
	var building = Game.UpgradesInStore[i].buildingTie;
	var cps = Game.cookiesPsByType[building.name] * Game.globalCpsMult;
	var cpcps = price / cps;
	upgrade_arr.push({name:`${name}`,target:`${building.name}`,price:`${Beautify(price)}`,cps:`${Beautify(cps)}`,cpcps:`${Beautify(cpcps)}`});
    }
	

    
    
}
console.table(upgrade_arr);
