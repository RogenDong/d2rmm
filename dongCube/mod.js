
function reSocketRecipe(ss) {
  return {
    enabled: 1,
    version: 100,
    numinputs: ss + 1,
    // input 1 defined below
    'input 2': `"${config.reSocketItem2},qty=${ss}"`,
    output: 'useitem',
    '*eol': 0,
    'mod 1': 'sock',
    'mod 1 min': ss,
    'mod 1 max': ss,
  };
}
const path_cubemain = 'global\\excel\\cubemain.txt';
const tsv_cubemain = D2RMM.readTsv(path_cubemain);
for (let ss = 1; ss <= 6; ss++) {
  tsv_cubemain.rows.push({
    ...(reSocketRecipe(ss)),
    description: 'Change Sockets On Weapon',
    'input 1': '"weap,sock"',
  });
  tsv_cubemain.rows.push({
    ...(reSocketRecipe(ss)),
    description: 'Change Sockets On  Armor',
    'input 1': '"armo,sock"',
  });
}
D2RMM.writeTsv(path_cubemain, tsv_cubemain);