/** 防具重量 */
const A_SPEED = {
  /** 轻 */
  0: '',
  /** 中 */
  5: '',
  /** 重 */
  10: '',
};
/** 防具类型 */
const A_TYPE = {
  normcode: '',
  /** 扩展 */
  ubercode: '',
  /** 精华 */
  ultracode: '',
};
/** 装备类型 */
const W_TYPE = {
  normcode: '',
  /** 扩展 */
  ubercode: '',
  /** 精华 */
  ultracode: '',
};

const DICT = {
  0: '轻',
  5: '中',
  10: '重',
  normcode: '普',
  ubercode: '扩',
  ultracode: 'ÿcL精ÿc0',
};

/** 找出防具【普、扩、精】【轻、中、重】 */
function map_armor() {
  const ls_armor = D2RMM.readTsv('global\\excel\\armor.txt');
  for (const a of ls_armor.rows) {
    let pass = true;
    for (const col in A_TYPE) {
      if (a.code === a[col]) {
        A_TYPE[col] += a.code + ' ';
        pass = false;
        break;
      }
    }
    if (pass) continue;
    for (let s = 0; s <= 10; s += 5) {
      if (a.speed == s) {
        A_SPEED[s] += a.code + ' ';
        break;
      }
    }
  }
}
/** 找出武器【普、扩、精】 */
function map_weapon() {
  const ls_weap = D2RMM.readTsv('global\\excel\\weapons.txt');
  for (const w of ls_weap.rows) {
    for (const col in W_TYPE) {
      if (w.code === w[col]) {
        W_TYPE[col] += w.code + ' ';
        break;
      }
    } // loop field in W_TYPE
  } // loop weapon data
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
    else if (nam.Key === 'gld') {
      nam.zhTW = 'G';
    }
    else if (nam.Key === 'Skull') {
      nam.zhTW = nam.zhCN;
    }
    else if ((/^gs[bgrw]$/g).test(nam.Key)) {
      nam.zhTW = `ÿc1${nam.zhCN}ÿc0`;
    }
    else {
      // nam.zhTW = nam.zhCN + "_" + nam.enUS;
      nam.zhTW = nam.zhCN;
    }
  }
  D2RMM.writeJson(path_affixe, ls_affixe);
}

/** 重命名物品 */
function rename_item() {
  const SIZE = '小中大';
  const path_items = 'local\\lng\\strings\\item-names.json';
  const ls_item = D2RMM.readJson(path_items);
  for (const nam of ls_item) {
    if (nam.id == 2200) {
      nam.zhTW = '回城';
    }
    else if (nam.id == 2202) {
      nam.zhTW = '鉴定';
    }
    // charms
    else if (nam.id >= 20435 && nam.id <= 20437) {
      nam.zhTW = `ÿc;${SIZE[nam.id - 20435]}符ÿc3`;
    }
    // hp1 ~ mp5
    else if (nam.id >= 2266 && nam.id <= 2275) {
      nam.zhTW = nam.Key;
    }
    // Rejuvenation Potion
    else if (nam.id >= 2209 && nam.id <= 2210) {
      nam.zhTW = '活力' + (nam.id - 2208);
    }
    // skulls
    else if (nam.id >= 2277 && nam.id <= 2281) {
      nam.zhTW = nam.zhCN.substring(0, nam.zhCN.length - 2);
    }
    // diamond
    else if (nam.id >= 2261 && nam.id <= 2265) {
      nam.zhTW = nam.zhCN.substring(0, nam.zhCN.length - 2) + '白';
    }
    // gems
    else if (nam.id >= 2236 && nam.id <= 2260) {
      nam.zhTW = nam.zhCN.substring(0, nam.zhCN.length - 2);
    }
    // key of Terror/Hate/Destruction
    else if (nam.id >= 11146 && nam.id <= 11148) {
      let n = 1;
      if (nam.id == 11148) n = 5;
      else if (nam.id > 11146) n += 1;
      nam.zhTW = nam.zhCN + "_A" + n;
    }
    else if (nam.id >= 11164 && nam.id <= 11167) {
      if (nam.id == 11164)
        nam.zhTW = nam.zhCN + "_A1A2";
      else {
        let n = 5 - (11167 - nam.id);
        nam.zhTW = nam.zhCN + "_A" + n;
      }
    }
    // hide
    // else if (nam.id >= 2182 && nam.id <= 2187) {
    //   nam.zhTW = '';
    // }
    else if (W_TYPE.normcode.length > 0 || A_TYPE.normcode.length > 0) {
      function get_type_sfx(name) {
        for (const t in W_TYPE) {
          if (W_TYPE[t].includes(name.Key)) {
            return "_" + DICT[t];
          }
        }
        let sfx = null;
        for (const s in A_SPEED) {
          if (A_SPEED[s].includes(name.Key)) {
            sfx = "_" + DICT[s];
            break;
          }
        }
        if (sfx == null) return sfx;
        for (const t in A_TYPE) {
          if (A_TYPE[t].includes(name.Key)) {
            return sfx + DICT[t];
          }
        }
      } // fn get_type_sfx
      const sfx = get_type_sfx(nam);
      if (sfx != null) {
        nam.zhTW = nam.zhCN + sfx;
      }
    } else {
      nam.zhTW = nam.zhCN;
    }
  }
  D2RMM.writeJson(path_items, ls_item);
}

/** 突出显示 TODO 测试 */
function recolor_ui() {
  const path_str_ui = 'local\\lng\\strings\\ui.json';
  const ls_sui = D2RMM.readJson(path_str_ui);
  for (const ui of ls_sui) {
    // 后置高品质词缀
    if (ui.id == 1711) {
      ui.zhTW = "%1%0";
      break;// TODO
    }
  }
  D2RMM.writeJson(path_str_ui, ls_sui);
}

map_armor();
map_weapon();
rename_rune();
rename_affixe();
rename_item();
recolor_ui();
