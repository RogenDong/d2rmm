const treasureClassFile = 'global\\excel\\treasureclassex.txt';
const treasureClasses = D2RMM.readTsv(treasureClassFile);

treasureClasses.rows.forEach((row) => {
    const treasureClass = row['Treasure Class'];
    
    if (config['strictness'] == 'low' || config['strictness'] == 'med' || config['strictness'] == 'high' || config['strictness'] == 'ult') {
        
        if (treasureClass.match(/^Act 1 Equip [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 1 Melee [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 1 Bow [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act . Magic [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act . \(N\) Magic [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act . \(H\) Magic [A-C]$/) != null) {
            removeTC(row);
        }
    }

    if (config['strictness'] == 'med' || config['strictness'] == 'high' || config['strictness'] == 'ult') {
        
        if (treasureClass.match(/^Act 2 Equip [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 3 Equip [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 4 Equip [A-B]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 2 Melee [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 3 Melee [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 4 Melee [A-B]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 2 Bow [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 3 Bow [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 4 Bow [A-B]$/) != null) {
            removeTC(row);
        }
    }

    if (config['strictness'] == 'high' || config['strictness'] == 'ult') {
        
        if (treasureClass.match(/^Act 5 Equip [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 1 \(N\) Equip [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 5 Melee [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 1 \(N\) Melee [A-B]$/) != null) {
            removeTC(row);
        }

        if (treasureClass.match(/^Act 5 Bow [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 1 \(N\) Bow [A-B]$/) != null) {
            removeTC(row);
        }
    }
    
    if (config['strictness'] == 'ult') {
        
        if (treasureClass.match(/^Act 2 \(N\) Equip [A-C]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 3 \(N\) Equip A$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 2 \(N\) Melee [A-B]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 3 \(N\) Melee A$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 2 \(N\) Bow [A-B]$/) != null) {
            removeTC(row);
        }
        
        if (treasureClass.match(/^Act 3 \(N\) Bow A$/) != null) {
            removeTC(row);
        }
    }
    
    if (config.chip) {
        
        if (treasureClass.match('Chipped Gem') != null) {
            removeTC(row);
        }
    }
    
    if (config.flaw) {
        
        if (treasureClass.match('Flawed Gem') != null) {
            removeTC(row);
        }
    }
    
    if (config.norm) {
        
        if (treasureClass.match('Normal Gem') != null) {
            removeTC(row);
        }
    }
    
    if (config.flawless) {
        
        if (treasureClass.match('Flawless Gem') != null) {
            removeTC(row);
        }
    }
    
    if (config.elThul) {
        
        if (treasureClass.match(/^Runes [1-5]$/) != null) {
            removeTC(row);
        }
    }
    
    if (config.amnIo) {
        
        if (treasureClass.match(/^Runes [6-8]$/) != null) {
            removeTC(row);
        }
    }
    
    if (config.lumKo) {
        
        if (treasureClass.match('Runes 9') != null) {
            removeTC(row);
        }
    }
    
    if (treasureClass.match('Ammo') != null) {
        
        if (config.arrow) {
            row['Item1'] = '';
        }
        if (config.bolt) {
            row['Item2'] = '';
        }
    }
    
    if (treasureClass.match(/^Misc [0-2]$/) != null) {
        
        if (config.key) {
            row['Item1'] = '';
        }
        if (config.tp) {
            row['Item2'] = '';
        }
        if (config.id) {
            row['Item3'] = '';
        }
        if (config.oil) {
            row['Item4'] = '';
        }
        if (config.gas) {
            row['Item5'] = '';
        }
    }
    
    if (treasureClass.match(/^Potion [1-6]$/) != null) {
        
        if (treasureClass.match('Potion 1') != null || treasureClass.match('Potion 6') != null) {
            
            if (config.hp) {
                row['Item1'] = '';
                row['Item2'] = '';
            }
            if (config.mp) {
                row['Item3'] = '';
                row['Item4'] = '';
            }
            if (config.rejuv) {
                row['Item5'] = '';
            }
            if (config.stam) {
                row['Item6'] = '';
            }
            if (config.ant) {
                row['Item7'] = '';
            }
            if (config.thaw) {
                row['Item8'] = '';
            }
        }
        else if (treasureClass.match('Potion 5') != null) {
            
            if (config.hp) {
                row['Item1'] = '';
                row['Item2'] = '';
                row['Item3'] = '';
            }
            if (config.mp) {
                row['Item4'] = '';
            }
            if (config.rejuv) {
                row['Item5'] = '';
            }
            if (config.stam) {
                row['Item6'] = '';
            }
            if (config.ant) {
                row['Item7'] = '';
            }
            if (config.thaw) {
                row['Item8'] = '';
            }
        }
        else {
            
            if (config.hp) {
                row['Item1'] = '';
                row['Item2'] = '';
                row['Item3'] = '';
            }
            if (config.mp) {
                row['Item4'] = '';
                row['Item5'] = '';
            }
            if (config.rejuv) {
                row['Item6'] = '';
            }
            if (config.stam) {
                row['Item7'] = '';
            }
            if (config.ant) {
                row['Item8'] = '';
            }
            if (config.thaw) {
                row['Item9'] = '';
            }
        }
    }
});

D2RMM.writeTsv(treasureClassFile, treasureClasses);

function removeTC(tc) {
    
    for (let i = 1; i <= 10; i++) {
        const itemCol = 'Item' + i;
        const probCol = 'Prob' + i;
    
        tc[itemCol] = '';
        tc[probCol] = '';
    }
    
    tc['NoDrop'] = 100;
}

