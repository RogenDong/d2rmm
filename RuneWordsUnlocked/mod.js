const runesFilename = 'global\\excel\\runes.txt';
const runes = D2RMM.readTsv(runesFilename);
const weaponTypes = 'swor axe pole mace hamm h2h club scep miss staf mele wand spea knif';

//unlock individual weapons
for (const row of runes.rows) {
    // enable ladder rune words
    if(config.enableLadder){
         row.firstLadderSeason = '';
         row.lastLadderSeason = '';
         //row['*Patch Release'] = '';
    }

    //unlock weapons
    if(config.weaponsUnlocked){
        for(let i = 1; i <= 3; i++){
            const it = 'itype' + i;
            if(weaponTypes.indexOf(row[it]) >= 0){
                row[it] = 'weap';
            }
        }
    }

    //unlock shields
    if(config.shieldsUnlocked){
        for(let i = 1; i <= 3; i++){
            const it = 'itype' + i;
            if(row[it] === 'pala'){
                row[it] = 'shld';
            }
        }
    }

    //shields to armor
    if(config.shieldsToArmor){
        if( (row.itype1 == 'shld') && (row.itype2 != 'tors') && (row.itype3 != 'tors') && (row.itype4 != 'tors') && (row.itype5 != 'tors') && (row.itype6 != 'tors') ){
            if( (row.itype2) == '' ){row.itype2 = 'tors';}
            else if( (row.itype3) == '' ){row.itype3 = 'tors';}
            else if( (row.itype4) == '' ){row.itype4 = 'tors';}
            else if( (row.itype5) == '' ){row.itype5 = 'tors';}
            else if( (row.itype6) == '' ){row.itype6 = 'tors';}
        }
        if( (row.itype2 == 'shld') && (row.itype1 != 'tors') && (row.itype3 != 'tors') && (row.itype4 != 'tors') && (row.itype5 != 'tors') && (row.itype6 != 'tors') ){
            if( (row.itype3) == '' ){row.itype3 = 'tors';}
            else if( (row.itype4) == '' ){row.itype4 = 'tors';}
            else if( (row.itype5) == '' ){row.itype5 = 'tors';}
            else if( (row.itype6) == '' ){row.itype6 = 'tors';}
        }
        if( (row.itype3 == 'shld') && (row.itype1 != 'tors') && (row.itype2 != 'tors') && (row.itype4 != 'tors') && (row.itype5 != 'tors') && (row.itype6 != 'tors') ){
            if( (row.itype4) == '' ){row.itype4 = 'tors';}
            else if( (row.itype5) == '' ){row.itype5 = 'tors';}
            else if( (row.itype6) == '' ){row.itype6 = 'tors';}
        } 
    }

    //armor to shields
    //now we have to actually check for new additions and changes
    if(config.armorToShields){
        if( (row.itype1 == 'tors') && (row.itype2 != 'shld') && (row.itype3 != 'shld') && (row.itype4 != 'shld') && (row.itype5 != 'shld') && (row.itype6 != 'shld') ){
            if( (row.itype2) == '' ){row.itype2 = 'shld';}
            else if( (row.itype3) == '' ){row.itype3 = 'shld';}
            else if( (row.itype4) == '' ){row.itype4 = 'shld';}
            else if( (row.itype5) == '' ){row.itype5 = 'shld';}
            else if( (row.itype6) == '' ){row.itype6 = 'shld';}
        }
        if( (row.itype2 == 'tors') && (row.itype1 != 'shld') && (row.itype3 != 'shld') && (row.itype4 != 'shld') && (row.itype5 != 'shld') && (row.itype6 != 'shld') ){
            if( (row.itype3) == '' ){row.itype3 = 'shld';}
            else if( (row.itype4) == '' ){row.itype4 = 'shld';}
            else if( (row.itype5) == '' ){row.itype5 = 'shld';}
            else if( (row.itype6) == '' ){row.itype6 = 'shld';}
        }
        if( (row.itype3 == 'tors') && (row.itype1 != 'shld') && (row.itype2 != 'shld') && (row.itype4 != 'shld') && (row.itype5 != 'shld') && (row.itype6 != 'shld') ){
            if( (row.itype4) == '' ){row.itype4 = 'shld';}
            else if( (row.itype5) == '' ){row.itype5 = 'shld';}
            else if( (row.itype6) == '' ){row.itype6 = 'shld';}
        } 
    }

    //helms to shields
    //now we have to actually check for new additions and changes
    if(config.helmsToShields){
        if( (row.itype1 == 'helm') && (row.itype2 != 'shld') && (row.itype3 != 'shld') && (row.itype4 != 'shld') && (row.itype5 != 'shld') && (row.itype6 != 'shld') ){
            if( (row.itype2) == '' ){row.itype2 = 'shld';}
            else if( (row.itype3) == '' ){row.itype3 = 'shld';}
            else if( (row.itype4) == '' ){row.itype4 = 'shld';}
            else if( (row.itype5) == '' ){row.itype5 = 'shld';}
            else if( (row.itype6) == '' ){row.itype6 = 'shld';}
        }
        if( (row.itype2 == 'helm') && (row.itype1 != 'shld') && (row.itype3 != 'shld') && (row.itype4 != 'shld') && (row.itype5 != 'shld') && (row.itype6 != 'shld') ){
            if( (row.itype3) == '' ){row.itype3 = 'shld';}
            else if( (row.itype4) == '' ){row.itype4 = 'shld';}
            else if( (row.itype5) == '' ){row.itype5 = 'shld';}
            else if( (row.itype6) == '' ){row.itype6 = 'shld';}
        }
        if( (row.itype3 == 'helm') && (row.itype1 != 'shld') && (row.itype2 != 'shld') && (row.itype4 != 'shld') && (row.itype5 != 'shld') && (row.itype6 != 'shld') ){
            if( (row.itype4) == '' ){row.itype4 = 'shld';}
            else if( (row.itype5) == '' ){row.itype5 = 'shld';}
            else if( (row.itype6) == '' ){row.itype6 = 'shld';}
        } 
    }

    //unlock armors - the last step
    if(config.armorUnlocked){
        if( (row.itype1 == 'tors') || (row.itype1 == 'helm') ){
            row.itype1 = 'armo';
        }
        if( (row.itype2 == 'tors') || (row.itype2 == 'helm') ){
            row.itype2 = 'armo';
        }
        if( (row.itype3 == 'tors') || (row.itype3 == 'helm') ){
            row.itype3 = 'armo';
        }
        if( (row.itype4 == 'tors') || (row.itype4 == 'helm') ){
            row.itype4 = 'armo';
        }
        if( (row.itype5 == 'tors') || (row.itype5 == 'helm') ){
            row.itype5 = 'armo';
        }
        if( (row.itype6 == 'tors') || (row.itype6 == 'helm') ){
            row.itype6 = 'armo';
        }
        
    }

    
}

// Save changes
D2RMM.writeTsv(runesFilename, runes);


//if enabling all, need to check for runes that have different effect for armor vs weapons - perhaps just go with the weapon version, disable armor version?

/* 
===Changes===
v1.4.2
- Added option for shield runewords to also work in armor.
- Added option for armor runewords to also work in shields.
- Added option for helm runewords to also work in shields.
- Added option for all torso & helm runewords to work in any armor
- Fixed unlocking all weapons to include 'mele' code item type. Some melee rune words were not unlocked for ranged weapons, but now all weapon rune words should work on all weapons.
- Fixed unlocking all weapons to include 'wand' code item type as it was still restricted to wand items, now wand rune words should work on all weapons.
 */