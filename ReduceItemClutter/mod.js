function removeTC(tc) {
    for (let i = 1; i <= 10; i++) {
        const itemCol = 'Item' + i;
        const probCol = 'Prob' + i;

        tc[itemCol] = '';
        tc[probCol] = '';
    }
    tc['NoDrop'] = 100;
}

const STRICTNESS = ['low', 'med', 'high', 'ult'];
const str_cfg = STRICTNESS.indexOf(config['strictness']);

const treasureClassFile = 'global\\excel\\treasureclassex.txt';
const treasureClasses = D2RMM.readTsv(treasureClassFile);
for (let row of treasureClasses.rows) {
    const tt = row['Treasure Class'];

    if (str_cfg >= 0) {
        const reg1 = (function () {
            if (str_cfg >= 2) {
                return /^Act [1-5] (Bow|Equip|Melee) [A-C]$/;
            } else if (str_cfg >= 1) {
                return /^Act [1-3] (Bow|Equip|Melee) [A-C]$/;
            } else {
                return /^Act 1 (Bow|Equip|Melee) [A-C]$/;
            }
        })();
        if (tt.match(reg1) != null) {
            removeTC(row);
        }
        if (tt.match(/^Act . (\([HN]\)[ ])*Magic [A-C]$/g) != null) {
            removeTC(row);
        }
        if (str_cfg >= 1) {
            if (tt.match(/^Act 4 (Bow|Equip|Melee) [A-B]$/g) != null) {
                removeTC(row);
            }
        } // if config.strictness >= med
        if (str_cfg >= 2) {
            if (tt.match(/^Act 1 \(N\) (Bow|Equip) [A-C]$/g) != null) {
                if (tt.includes('Bow') && tt[tt.length - 1] !== 'B') {
                    // nothing
                } else {
                    removeTC(row);
                }
            }
        } // if config.strictness >= high
        if (str_cfg == 3) {
            let m = (/^Act ([23]) \(N\) (Bow|Equip|Melee) ([A-C])$/g).exec(tt);
            if (m != null) {
                if (m[2] === 'Equip') {
                    // /^Act [23] \(N\) Equip A$/g
                    if (m[3] === 'A') {
                        removeTC(row);
                    }
                    // /^Act 2 \(N\) Equip [BC]$/g
                    else if (m[1] === '2') {
                        removeTC(row);
                    }
                } else {
                    // /^Act 2 \(N\) (Bow|Melee) B$/g
                    if (m[3] === 'B' && m[1] === '2') {
                        removeTC(row);
                    }
                    // /^Act [23] \(N\) (Bow|Melee) A$/g
                    else if (m[3] === 'A') {
                        removeTC(row);
                    }
                }
            }
        } // if config.strictness == ult
    } // if config.strictness >= low

    if (config.chip) {
        if (tt.match('Chipped Gem') != null) {
            removeTC(row);
        }
    }
    if (config.flaw) {
        if (tt.match('Flawed Gem') != null) {
            removeTC(row);
        }
    }
    if (config.norm) {
        if (tt.match('Normal Gem') != null) {
            removeTC(row);
        }
    }
    if (config.flawless) {
        if (tt.match('Flawless Gem') != null) {
            removeTC(row);
        }
    }
    if (config.elThul) {
        if (tt.match(/^Runes [1-5]$/g) != null) {
            removeTC(row);
        }
    }
    if (config.amnIo) {
        if (tt.match(/^Runes [6-8]$/g) != null) {
            removeTC(row);
        }
    }
    if (config.lumKo) {
        if (tt.match('Runes 9') != null) {
            removeTC(row);
        }
    }
    if (tt.match('Ammo') != null) {
        if (config.arrow) {
            row['Item1'] = '';
        }
        if (config.bolt) {
            row['Item2'] = '';
        }
    }
    if (tt.match(/^Misc [0-2]$/g) != null) {
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
    const m = (/^Potion ([1-6])$/g).exec(tt);
    if (m != null) {
        if (m[1] == '1' || m[1] == '6') {
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
        else if (m[1] == '5') {
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
    } // if Potion between 1 and 6
}

D2RMM.writeTsv(treasureClassFile, treasureClasses);

