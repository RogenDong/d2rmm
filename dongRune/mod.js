
const path_runes_json = 'local\\lng\\strings\\item-runes.json';
const runes = D2RMM.readJson(path_runes_json);
runes.push({
  id: 27369,
  Key: "Runeword180",
  zhTW: "TP盾"
});
D2RMM.writeJson(path_runes_json, runes);

const path_runes_tsv = 'global\\excel\\runes.txt';
const tsv_runes = D2RMM.readTsv(path_runes_tsv);
tsv_runes.rows.push({
  Name: 'Runeword180',
  '*Rune Name': 'TPSh',
  complete: 1,
  '*Patch Release': 110,
  itype1: 'armo',
  itype2: 'shld',
  '*RunesUsed': 'TalRalOrtThul',
  Rune1: 'r07',
  Rune2: 'r08',
  Rune3: 'r09',
  Rune4: 'r10',
  T1Code1: 'oskill',
  T1Param1: 'Teleport',
  T1Min1: 1,
  T1Max1: 1,
  T1Code2: 'res-all',
  T1Min2: 13,
  T1Max2: 13,
  '*eol': 0,
});
D2RMM.writeTsv(path_runes_tsv, tsv_runes);
