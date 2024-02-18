// hd\character\player\*                      去除迷雾
// hd\[objects, roomtiles, vfx]               箭头指向传送点、各种门
// hd\global\ui\panel\hud_02\monsterhealth\*  修改血条
D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);
// global\ui\layouts\*  修改血条
//D2RMM.copyFile(
//  'hd', // <mod folder>\hd
//  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
//  true // overwrite any conflicts
//);