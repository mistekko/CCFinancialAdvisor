# CCFinancialAdvisor
## Overview
This repo contains a couple of scripts for the [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) browser game: 

 * upgrades.js looks through the upgrades currently in the store and determines which is the most cost-effective choice for increasing CPS (Cookies Per Second)
 * buildings.js looks through the buildings you have unlocked and determines the same
 * achievement-gain.js reports the CPS to be gained from obtaining the next achievement
 
 
## Installation

No installation is necessary

## Usage

Load the scripts by copying the code of each script (either by downloading it and opening it or by simply getting it right from Github) and pasting it into the javascript console for the Cookie Clicker tab. Then, invoke the scripts by running (typing and pressing enter):  

 * `get_best_upgrade()`
 * * to find the most cost-effective building
 * `get_best_building()`
 * * to find the most cost-effective building
 *`'get_best_upgrade(); get_best_building()`
 * * to find both in one fell swoop
 * achievement_bonus()
 * * to get the increase in CPS resulting from achieving another achievement

## Notes  

 * I have built and tested these scripts only on firefox and currently have no intention to support compatibility on any other platform or browser. If they work there, great; if not, that is not my problem.
 
## To-do  

 * Merge the scripts into one single file 
 * Find an output medium other than the console
 * Allow easier integration, i.e. via TamperMonkey or similar
