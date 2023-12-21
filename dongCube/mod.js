const path_cube = 'global\\excel\\cubemain.txt';
const tsv_cube = D2RMM.readTsv(path_cube);
for (let ss = 1; ss <= 6; ss++) {
  const base = {
    enabled: 1,
    version: 100,
    numinputs: ss + 2,
    // input 1 defined below
    'input 2': 'isc',
    'input 3': `"${config.reSocketItem},qty=${ss}"`,
    output: 'useitem',
    '*eol': 0,
    'mod 1': 'sock',
    'mod 1 min': ss,
    'mod 1 max': ss,
  };
  tsv_cube.rows.push({
    ...base,
    description: 'Change Sockets On Weapon',
    'input 1': '"weap,sock"',
  });
  tsv_cube.rows.push({
    ...base,
    description: 'Change Sockets On  Armor',
    'input 1': '"armo,sock"',
  });
}
// 骷髅石 + 活力药剂合成死灵盾
const inp_skull = ['skc', 'skf', 'sku', 'skl', 'skz'];
for (let x = 0; x < inp_skull.length; x++) {
  const ss = inp_skull[x];
  tsv_cube.rows.push({
    description: 'Making specimens ' + ss,
    enabled: 1,
    version: 100,
    numinputs: 2,
    'input 1': ss,
    'input 2': 'rvs',
    output: 'ne' + (x + 1),
    '*eol': 0,
  });
}
D2RMM.writeTsv(path_cube, tsv_cube);
