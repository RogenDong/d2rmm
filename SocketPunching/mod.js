const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

// add unsocket recipe
if (config.unsocket) {
  const tpl_unsocket = {
    enabled: 1,
    version: 100,
    numinputs: 2,
    // input 1 defined below
    'input 2': config.item,
    output: '"useitem,rem"',
    '*eol': 0,
  };
  cubemain.rows.push({
    ...tpl_unsocket,
    description: 'Empty Sockets On  Armor',
    'input 1': '"armo,sock"',
  });

  cubemain.rows.push({
    ...tpl_unsocket,
    description: 'Empty Sockets On Weapon',
    'input 1': '"weap,sock"',
  });
}

// add socket recipe
if (config.socket) {
  for (let s = 1; s <= 6; s++) {
    const tpl_socket = {
      enabled: 1,
      version: 100,
      numinputs: s + 1,
      // input 1 defined below
      'input 2': `"${config.item},qty=${s}"`,
      output: 'useitem',
      'mod 1': 'sock',
      'mod 1 min': s,
      'mod 1 max': s,
      '*eol': 0,
    };
    cubemain.rows.push({
      ...tpl_socket,
      description: `Add ${s} Sockets To  Armor`,
      'input 1': '"armo,nos"',
    });
    cubemain.rows.push({
      ...tpl_socket,
      description: `Add ${s} Sockets To Weapon`,
      'input 1': '"weap,nos"',
    });

    if (s > 1) continue;
    cubemain.rows.push({
      ...tpl_socket,
      description: `Add Sockets To Ring`,
      'input 1': 'ring',
    });
    cubemain.rows.push({
      ...tpl_socket,
      description: `Add Sockets To Amulet`,
      'input 1': 'amul',
    });
  }
}
D2RMM.writeTsv(cubemainFilename, cubemain);
