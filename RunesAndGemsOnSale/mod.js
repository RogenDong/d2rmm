const miscexFilename = 'global\\excel\\misc.txt';
const miscex = D2RMM.readTsv(miscexFilename);
const gems = ['Topaz', 'Amethyst', 'Sapphire', 'Ruby', 'Emerald', 'Diamond', 'Skull'];
const merchants = ['Akara', 'Drognan', 'Ormus', 'Lysander', 'Jamella', 'Mallah'];
const RLV_L = 23;
const RLV_M = 49;
const RLV_H = 69;
for (let item of miscex.rows) {
  if (item.name.match(/^\w+ Rune$/) != null) {
    const lvl = item.level;
    if (lvl <= RLV_L) {
      if (config.low) applyDiscountAddToMerchants(item);
    } else if (lvl <= RLV_M) {
      if (config.mid) applyDiscountAddToMerchants(item);
    } else if (lvl <= RLV_H) {
      if (config.high) applyDiscountAddToMerchants(item);
    }
  }
  for (let gem of gems) {
    if (config.chipped) {
      findItemAndAddToMerchants(item, `Chipped ${gem}$`);
    }
    if (config.flawed) {
      findItemAndAddToMerchants(item, `Flawed ${gem}$`);
    }
    if (config.regular) {
      findItemAndAddToMerchants(item, `^${gem}$`);
    }
    if (config.flawless) {
      findItemAndAddToMerchants(item, `Flawless ${gem}$`);
    }
    if (config.perfect) {
      findItemAndAddToMerchants(item, `Perfect ${gem}$`);
    }
  }
}
function applyDiscountAddToMerchants(item) {
  if (config.discount) {
    item.cost = item.cost / 10;
  }
  addToMerchants(item);
}
function findItemAndAddToMerchants(item, nameRegex) {
  if (item.name.match(nameRegex) != null) {
    addToMerchants(item);
  }
}
function addToMerchants(item) {
  item.PermStoreItem = 1;
  for (const merchant of merchants) {
    item[merchant + 'Min'] = 1;
    item[merchant + 'Max'] = 1;
  }
}
D2RMM.writeTsv(miscexFilename, miscex);
