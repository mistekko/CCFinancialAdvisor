# CCFinancialAdvisor
## Overview
This repo contains a script for the [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) browser game which declares the following functions:

 * `get_best_upgrades`, which prints a table of upgrades and evaluates which one is best.
 * `get_best_buildings`, which does the same thing but with buildings.
 * `achievement_bonus`, which calculates the CPS to be gained from earning an achievement. 
 
## Usage

Just copy the contents of ccfa.js into the cookie clicker browser console. The last function call sets up a timer to call each script every 5000ms. You may find this annoying and pointless late game.

## Notes  

 * I have built and tested these scripts only on firefox and currently have no intention to support compatibility on any other platform or browser. If they work there, great; if not, that is not my problem until you open a pull-request or issue!
 
## To-do  

 * Merge the scripts into one single file 
 * Find an output medium other than the console
 * Allow easier integration, i.e. via TamperMonkey or similar
