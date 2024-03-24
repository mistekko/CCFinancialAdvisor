# cc-best-value
## Overview
This repo contains a couple of scripts for the [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) browser game: 

 * upgrades.js looks through the upgrades currently in the store and determines which is the most cost-effective choice for increasing CPS (Cookies Per Second)
 * buildings.js looks through the buildings you have unlocked and determines the same
 
 
## Installation

No installation is necessary

## Usage

Load the scripts by copying the code of each script (either by downloading it and opening it or by simply getting it right from Github) and pasting it into the javascript console for the Cookie Clicker tab (opened by navigating to the Cookie Clicker tab and pressing f12). Then, invoke the scripts by running (typing and pressing enter):  

 * `get_best_upgrade()`
 * * to find the most cost-effective building
 * `get_best_building()`
 * * to find the most cost-effective building
 *`'get_best_upgrade(); get_best_building()`
 * * to find both in one fell swoop

## Notes  

 * I have built and tested these scripts only on firefox and currently have no intention to support compatibility on any other platform or browser. If they work there, great; if not, that is not my problem.
 * Do NOT buy any Grandma upgrades based off of upgrades.js' advice. It is buggy and does not currently work.
 
## To-do  

 * Merge the scripts into one single file 
 * Find an output medium other than the console
 * Add support for more upgrade types in upgrades.js
