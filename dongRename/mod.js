/** 防具重量 */
const A_SPEED = {
  0: '',// 轻
  5: '',// 中
  10: '',// 重
};
/** 防具类型 */
const A_TYPE = {
  normcode: '',
  ubercode: '',// 扩展
  ultracode: '',// 精华
};
/** 武器类型 */
const W_TYPE = {
  normcode: '',
  ubercode: '',
  ultracode: '',
};
// /** 物等表 */
// const LVL = {};

const DICT = {
  0: '轻',
  5: '中',
  10: '重',
  normcode: '普',
  ubercode: '扩',
  ultracode: 'ÿcL精ÿc0',
};

/** 地图等级 */
const LEVEL_LV = {
  788: "[28/64/81]",
  789: "[28/58/85]",
  791: "[27/57/85]",
  792: "[26/56/82]",
  793: "[26/56/83]",
  794: "[27/57/84]",
  795: "[25/55/83]",
  796: "[25/55/83]",
  797: "[25/55/83]",
  798: "[24/54/85]",
  799: "[24/54/85]",
  800: "[24/54/85]",
  801: "[23/53/85]",
  802: "[23/53/85]",
  803: "[23/53/85]",
  804: "[22/51/83]",
  805: "[22/51/82]",
  806: "[22/51/81]",
  807: "[21/51/85]",
  808: "[21/51/85]",
  809: "[21/51/85]",
  810: "[21/50/85]",
  811: "[21/50/79]",
  812: "[24/54/82]",
  813: "[24/53/81]",
  814: "[23/52/81]",
  815: "[22/52/81]",
  816: "[22/52/80]",
  817: "[22/50/80]",
  818: "[21/50/80]",
  819: "[21/49/79]",
  824: "[14/48/79]",
  825: "[17/49/80]",
  826: "[17/49/80]",
  827: "[17/46/85]",
  828: "[17/46/85]",
  829: "[17/45/84]",
  830: "[17/45/84]",
  831: "[14/47/83]",
  832: "[13/45/82]",
  833: "[12/44/85]",
  834: "[14/47/82]",
  835: "[13/45/81]",
  836: "[12/44/79]",
  837: "[12/44/85]",
  838: "[13/48/78]",
  839: "[13/47/78]",
  840: "[13/47/78]",
  841: "[13/47/78]",
  843: "[14/44/75]",
  844: "[A2:13/43/74|A3:24/53/85]",
  845: "[A2:13/43/74|A3:23/52/85]",
  846: "[16/48/79]",
  847: "[18/46/77]",
  848: "[17/46/77]",
  849: "[16/45/76]",
  850: "[15/44/76]",
  851: "[14/43/75]",
  5018: "[06/39/76]",
  5019: "[12/43/73]",
  5020: "[12/43/73]",
  5021: "[11/42/73]",
  5022: "[11/42/72]",
  5023: "[11/42/72]",
  5024: "[10/41/72]",
  5025: "[10/41/71]",
  5026: "[10/41/71]",
  5027: "[10/41/71]",
  5028: "[09/40/70]",
  5029: "[09/40/70]",
  5030: "[08/40/70]",
  5031: "[07/42/79]",
  5032: "[07/41/78]",
  5033: "[07/40/77]",
  5034: "[07/39/76]",
  5035: "[07/38/75]",
  5037: "[03/37/85]",
  5038: "[03/37/83]",
  5039: "[03/36/80]",
  5040: "[07/40/85]",
  5041: "[05/39/81]",
  5042: "[04/38/85]",
  5043: "[02/37/78]",
  5044: "[07/39/85]",
  5045: "[05/38/80]",
  5046: "[04/37/69]",
  5047: "[02/36/77]",
  5048: "[01/36/79]",
  5049: "[08/39/69]",
  5050: "[06/38/69]",
  5051: "[05/38/68]",
  5052: "[04/37/68]",
  5053: "[02/36/68]",
  5054: "[01/36/67]",
  21865: "[39/60/85]",
  21866: "[39/61/85]",
  21867: "[39/62/85]",
  22647: "[24/58/80]",
  22648: "[25/59/81]",
  22649: "[26/60/81]",
  22650: "[29/61/82]",
  22651: "[29/61/83]",
  22652: "[29/61/83]",
  22653: "[29/61/85]",
  22654: "[27/60/81]",
  22655: "[29/62/82]",
  22656: "[29/62/85]",
  22657: "[37/68/87]",
  22658: "[32/63/83]",
  22659: "[33/63/83]",
  22660: "[34/64/84]",
  22662: "[36/64/84]",
  22663: "[39/65/85]",
  22664: "[40/65/85]",
  22665: "[42/66/85]",
  22666: "[43/66/85]",
  22667: "[43/66/85]"
};

function misc_ilv() {
  if (!config.showILv) return;
  const path_misc = 'global\\excel\\misc.txt';
  const ls_misc = D2RMM.readTsv(path_misc);
  const filter = 'amu rin cm1 cm2 cm3 jew';
  for (const mm of ls_misc.rows) {
    if (filter.includes(mm.code)) {
      mm.ShowLevel = 1;
    }
  }
  D2RMM.writeTsv(path_misc, ls_misc);
}

/** 找出防具【普、扩、精】【轻、中、重】 */
function map_armor() {
  // 读取装备表
  const path_armor = 'global\\excel\\armor.txt';
  const ls_armor = D2RMM.readTsv(path_armor);
  for (const a of ls_armor.rows) {
    if (config.showILv) {
      a.ShowLevel = 1;
    }
    // 记录装备物等，后面要用
    // LVL[a.code] = a.level;
    let pass = true;
    // 每一种装备的 code 是唯一的；但一系装备的【普 扩 精】数据是相同的
    // 将 code 与 normcode，ubercode，ultracode 分别比较，找到这种装备属于哪个品质
    // normcode 普通品质的 code
    // ubercode 扩展
    // ultracode 精华
    for (const col in A_TYPE) {
      if (a.code === a[col]) {
        // 记录下 code 一会用来搜索装备名称
        A_TYPE[col] += a.code + ' ';
        pass = false;
        break;
      }
    }
    // 没找到品质就不用继续检查重量了，看下一件装备
    if (pass) continue;
    // speed 枚举了3个数字代表【轻 中 重】
    // 0=轻  5=中  10=重
    for (let s = 0; s <= 10; s += 5) {
      if (a.speed == s) {
        // 记录下 code 一会用来搜索装备名称
        A_SPEED[s] += a.code + ' ';
        break;
      }
    }// end loop: speed
  }// end loop: all armors
  if (config.showILv) {
    D2RMM.writeTsv(path_armor, ls_armor);
  }
}
/** 找出武器【普、扩、精】 */
function map_weapon() {
  const path_weap = 'global\\excel\\weapons.txt';
  const ls_weap = D2RMM.readTsv(path_weap);
  for (const w of ls_weap.rows) {
    if (config.showILv) {
      w.ShowLevel = 1;
    }
    // LVL[w.code] = w.level;
    for (const col in W_TYPE) {
      if (w.code === w[col]) {
        W_TYPE[col] += w.code + ' ';
        break;
      }
    } // loop field in W_TYPE
  } // loop weapon data
  if (config.showILv) {
    D2RMM.writeTsv(path_weap, ls_weap);
  }
}

/** 重命名符文 */
function rename_rune() {
  const path_runes = 'local\\lng\\strings\\item-runes.json';
  const ls_rune = D2RMM.readJson(path_runes);
  for (const nam of ls_rune) {
    const mm = (/^r([0-9]{2})L*$/).exec(nam.Key);
    if (mm != null) {
      const num = Number(mm[1]);
      if (nam.Key.length == 4) {
        nam.zhTW = num + nam.zhCN;
      } else {
        nam.zhTW = num + '#';
      }
    }
  }
  D2RMM.writeJson(path_runes, ls_rune);
}

/** 重命名词条，染色 */
function rename_affixe() {
  const path_affixe = 'local\\lng\\strings\\item-nameaffixes.json';
  const ls_affixe = D2RMM.readJson(path_affixe);
  let fav_aff = null;
  if (config.favAff.length > 0) {
    fav_aff = RegExp(config.favAff);
  }
  for (const nam of ls_affixe) {
    if (nam.id == 1727) {
      nam.zhTW = 'ÿc8特ÿc0';
    }
    // 将特别关注的词缀标红
    else if (fav_aff != null && fav_aff.test(nam.id)) {
      nam.zhTW = `ÿc1${nam.zhCN}ÿcB`;
    }
    // 金币缩写为 G
    else if (nam.id == 2215) {
      nam.zhTW = 'G';
    }
    // 骷髅,宝石词缀修改
    // else if ((/^gs[bgrw]$/g).test(nam.Key)) {
    //   nam.zhTW = `ÿc1${nam.zhCN}ÿc0`;
    // }
    else {
      // nam.zhTW = nam.zhCN + "_" + nam.enUS;
      nam.zhTW = nam.zhCN;
    }
  }
  D2RMM.writeJson(path_affixe, ls_affixe);
}

/** 获取品质、轻重 */
function get_comment(name) {
  // 物等
  //   let lv = LVL[name.Key];
  //   if (lv == null) {
  //     return null;
  //   }
  // 看是不是武器
  for (const t in W_TYPE) {
    if (W_TYPE[t].includes(name.Key)) {
      // 确定是武器，后面的检查是防具的，跳过
      //   return DICT[t] + lv;
      return DICT[t];
    }
  }

  // 看是不是防具
  let type = '';// 防具品质
  let weight = '';// 防具轻重

  // 找防具品质
  for (const t in A_TYPE) {
    if (A_TYPE[t].includes(name.Key)) {
      type = DICT[t];
      break;
    }
  }
  // 找防具轻重
  for (const s in A_SPEED) {
    if (A_SPEED[s].includes(name.Key)) {
      weight = DICT[s];
      break;
    }
  }
  //   return weight + type + lv;
  return weight + type;
}

/** 重命名物品 */
function rename_item() {
  const SIZE = '小中大';
  const path_items = 'local\\lng\\strings\\item-names.json';
  const ls_item = D2RMM.readJson(path_items);
  for (const nam of ls_item) {
    if (nam.id == 2200) {
      nam.zhTW = 'TP';
    }
    else if (nam.id == 2202) {
      nam.zhTW = 'ID';
    }
    // 咒符
    else if (nam.id >= 20435 && nam.id <= 20437) {
      nam.zhTW = `ÿc;${SIZE[nam.id - 20435]}符ÿc3`;
    }
    // hp1 ~ mp5
    else if (nam.id >= 2266 && nam.id <= 2275) {
      nam.zhTW = nam.Key;
    }
    // 活力药水
    else if (nam.id >= 2209 && nam.id <= 2210) {
      nam.zhTW = '活力' + (nam.id - 2208);
    }
    // 骷髅石
    else if (nam.id >= 2277 && nam.id <= 2281) {
      nam.zhTW = nam.zhCN.substring(0, 2) + '骨';
    }
    // 钻石
    else if (nam.id >= 2261 && nam.id <= 2265) {
      nam.zhTW = nam.zhCN.substring(0, 2) + '白';
    }
    // 彩色宝石
    else if (nam.id >= 2236 && nam.id <= 2260) {
      const mm = nam.zhCN;
      if (mm.length > 3) {
        nam.zhTW = mm.substring(0, 2) + mm[3];
      } else {
        nam.zhTW = mm;
      }
    }
    // 恐惧Terror 憎恨Hate 毁灭Destruction
    else if (nam.id >= 11146 && nam.id <= 11148) {
      let n = 1;
      if (nam.id == 11148) {
        n = 5;
      } else if (nam.id > 11146) {
        n += 1;
      }
      nam.zhTW = nam.zhCN + "A" + n;
    }
    else if (nam.id >= 11164 && nam.id <= 11167) {
      if (nam.id == 11164) {
        nam.zhTW = nam.zhCN + "A1A2";
      } else {
        let n = 5 - (11167 - nam.id);
        nam.zhTW = nam.zhCN + "A" + n;
      }
    }
    else {
      nam.zhTW = nam.zhCN;
    }
    // 装备品质 + 轻重
    if (W_TYPE.normcode.length > 0 || A_TYPE.normcode.length > 0) {
      const sfx = get_comment(nam);
      if (sfx != null) {
        nam.zhTW = `${nam.zhTW} ${sfx}`;
      }
    }
  }
  D2RMM.writeJson(path_items, ls_item);
}

/** 调整地图名称 */
function rename_level() {
  const path_items = 'local\\lng\\strings\\levels.json';
  const ls_level = D2RMM.readJson(path_items);
  for (const nam of ls_level) {
    const lv = LEVEL_LV[nam.id];
    if (lv != null) {
      nam.zhTW = nam.zhCN + lv;
    }
  }
  D2RMM.writeJson(path_items, ls_level);
}

/** 突出显示 */
function recolor_ui() {
  const path_str_ui = 'local\\lng\\strings\\ui.json';
  const ls_sui = D2RMM.readJson(path_str_ui);
  for (const ui of ls_sui) {
    // 后置品质词缀
    if (ui.id == 1711 || ui.id == 1712) {
      ui.zhTW = "%1 %0";
    }
    // MagicFormat
    else if (ui.id == 1714) {
      ui.zhTW = '%0 %2 %1';
    }
    // ItemNameMagicFormatSuffixOnly
    else if (ui.id == 26776) {
      ui.zhTW = 's%1 %0';
    }
    // ItemNameMagicFormatPrefixOnly
    else if (ui.id == 26775) {
      ui.zhTW = 'p%0 %1';
    }
    // 大菠萝 6阶段文本
    else if (ui.id >= 27186 && ui.id <= 27191) {
      let step = ui.id - 27185;
      ui.zhTW = `进入阶段：${step}/6`;
    }
  }
  D2RMM.writeJson(path_str_ui, ls_sui);
}

map_armor();
map_weapon();
rename_rune();
rename_affixe();
rename_item();
rename_level();
recolor_ui();
