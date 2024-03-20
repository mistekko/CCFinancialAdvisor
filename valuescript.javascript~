var table_contents = [];
for (var i = 0; i <= 10; i++) {
    //print out the product name, its price, and its value
    //if an item has not been unlocked, break (their class will be "product unlocked disabled
    var name  = document.getElementById(`productName${i}`).innerHTML;
    if (name.substring(0,1) =='<' ) {
      name = name.split('>')[1].split('<')[0];
    }
    var price_raw = document.getElementById(`productPrice${i}`).innerHTML.split(' ');
    var price_digits = price_raw[0];
    var price_order  = ' ' + price_raw[1];
    var price_real = price_digits * Math.pow(10, (3 * (formatLong.indexOf(price_order) + 1)));

    table_contents.push({name:`${name}`,price:`${price_real}`});

}

console.table(table_contents);
