const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);
if (config.unsocket) {
  function unsocketRecipe() {
    return {
      enabled: 1,
      version: 100,
      numinputs: 2,
      // input 1 defined below
      'input 2': config.item,
      output: '"useitem,rem"',
      '*eol': 0,
    };
  }

  cubemain.rows.push({
    ...(unsocketRecipe()),
    description: 'Empty Sockets On  Armor',
    'input 1': '"armo,sock"',
  });

  cubemain.rows.push({
    ...(unsocketRecipe()),
    description: 'Empty Sockets On Weapon',
    'input 1': '"weap,sock"',
  });
}

function socketRecipe(sockets) {
  return {
    enabled: 1,
    version: 100,
    numinputs: sockets + 1,
    // input 1 defined below
    'input 2': `"${config.item},qty=${sockets}"`,
    output: 'useitem',
    'mod 1': 'sock',
    'mod 1 min': sockets,
    'mod 1 max': sockets,
    '*eol': 0,
  };
}
for (let sockets = 1; sockets <= 6; sockets++) {
  if (config.socket) {
    cubemain.rows.push({
      ...(socketRecipe(sockets)),
      description: `Add ${sockets} Sockets To  Armor`,
      'input 1': '"armo,nos"',
    });
    cubemain.rows.push({
      ...(socketRecipe(sockets)),
      description: `Add ${sockets} Sockets To Weapon`,
      'input 1': '"weap,nos"',
    });
  }
}
D2RMM.writeTsv(cubemainFilename, cubemain);
