var table_contents = [];
for (var i = 0; i <= 19; i++) {
    
    var name  = document.getElementById(`productName${i}`).innerHTML;
    if (name.substring(0,1) =='<' ) { //sometimes (but not always!!) productName ID contains an entire div in its innerHTML. What! None of that!
      name = name.split('>')[1].split('<')[0];
    }

    var price_raw = document.getElementById(`productPrice${i}`).innerHTML
    var price_digits = price_raw.split(' ')[0];
    var price_order  = ' ' + price_raw.split(' ')[1]; //millions? billions?
    var price_real = price_digits * Math.pow(10, (3 * (formatLong.indexOf(price_order) + 1))); //computers are much better at using 1000 than 'a thousand'

    var quantity = document.getElementById(`productOwned${i}`).innerHTML;
  
    var cps = Game.cookiesPsByType[name] * Game.globalCpsMult / quantity; 
  		
  
    if (cps > 0) {
	var efficiency = Beautify(price_real / cps);
	cps = Beautify(cps,3);
	
      
    	table_contents.push({name:`${name}`,price:`${price_raw}`,cps:`${cps}`,efficiency:`${efficiency}`});
    } else break; //this improves the efficiency slightly, but causes bugs for any psychos who completely skip any building.
    

}

console.table(table_contents);
