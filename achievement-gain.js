var specific_kitten_multiplier=[0.1,0.125,0.15,0.175,0.2,0.2,0.2,0.2,0.2,0.175,0.15,0.125,0.115,0.11,0.105,0.1,0.05];

var achievement_bonus = () => {
    var milk_multiplier, kitten_multiplier;
    milk_multiplier = kitten_multiplier = 1;
    //the following code was taken directly from cookie clicker source code
    //start stolen code:
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

    milk_multiplier *= (Game.milkProgress + 1 / 25);

    //we have to recalculate the kitten cookie multiplier since:
    //- it equals Π 1+f1*f2
    //- and there's not reall a way of solving the above for f2 (milk_multiplier)
    for (var j = 0; j < specific_kitten_multiplier.length; j++) 
	if (Game.Has(Game.UpgradesByPool['kitten'][j].name)) 
	    kitten_multiplier *= (1 + specific_kitten_multiplier[j] * milk_multiplier);
    return Beautify(Game.cookiesPs / Game.cookiesMultByType['kittens'] * kitten_multiplier - Game.cookiesPs); //beautify is a function from the cookie clicker source code
}    
