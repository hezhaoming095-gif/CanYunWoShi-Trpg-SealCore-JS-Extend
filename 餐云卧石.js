// ==UserScript==
// @name         餐云卧石
// @author       Asa阿沙
// @version      1.0.2
// @description  《餐云卧石》BRP修仙规则插件——制卡投掷、技能检定、战斗伤害、灵气管理、法术施放
// @timestamp    1778824853
// @diceRequireVer 1.4.0
// @license      MIT
// @homepageURL  https://github.com/hezhaoming095-gif/CanYunWoShi-Trpg-SealCore-JS-Extend
// @updateUrl    https://raw.githubusercontent.com/hezhaoming095-gif/CanYunWoShi-Trpg-SealCore-JS-Extend/main/餐云卧石.js
// ==/UserScript==

// =============================================
// 一、模板注册
// =============================================

var template = {
  name: "cyws",
  fullName: "餐云卧石",
  authors: ["Asa阿沙 "],
  version: "1.0.2",
  updatedTime: "20260515",
  templateVer: "1.0",

  setConfig: {
    diceSides: 100,
    enableTip: "🏔️ 已切换至《餐云卧石》规则\n输入 .餐云 help 查看指令帮助。该版本为测试版，有bug/建议请联系2184927226反馈",
    keys: ["cyws", "餐云卧石", "餐云"],
    relatedExt: ["cyws"]
  },

  nameTemplate: {
    cyws: {
      template: "{$t玩家_RAW} {灵根}/{职业}|{境界} HP:{HP}/{最大HP}",
      helpText: "餐云卧石名片"
    }
  },

  attrConfig: {
    top: ["HP", "最大HP", "PP", "最大PP", "灵气", "境界", "灵根", "种族", "职业"],
    sortBy: "name",
    ignores: ["法术点已用", "AHP"],
    showAs: {
      "HP": "{HP}/{最大HP}",
      "PP": "{PP}/{最大PP}",
      "灵气": "{灵气}"
    },
    setter: null,
    itemsPerLine: 4
  },

  defaults: {
    "力量": 0, "体质": 0, "体型": 0, "智力": 0,
    "意志": 0, "敏捷": 0, "外貌": 0,
    "气运": 0, "灵气": 0,
    "HP": 0, "最大HP": 0, "PP": 0, "最大PP": 0,
    "DB": 0, "ADB": 0, "AHP": 0, "护甲": 0, "移动力": 10,
    "职业点": 0, "兴趣点": 0, "法术点": 0,
    "飞行": 5, "卜卦": 1, "炼丹": 30, "炼器": 5, "符道": 10,
    "阵道": 5, "感知": 10, "巫蛊": 1, "杂学": 20, "语言": 0,
    "邪术": 1, "地位": 5, "御兽": 5, "传音": 10, "医术": 5,
    "聆听": 5, "通灵": 1, "灵力控制": 0, "掩护": 10,
    "战斗:体": 30, "战斗:器": 30, "战斗:灵": 20,
    "艺术:乐理": 1, "艺术:丹青": 1, "艺术:其他": 1,
    "庖厨": 5, "幻术": 1, "估价": 15, "谈判": 5, "话术": 5,
    "说服": 5, "伪装": 1, "闪避": 0, "急救": 30, "洞察": 5,
    "知识:草药学": 5, "知识:神话学": 5, "知识:其他": 5,
    "功法": 1, "导航": 5, "表演": 5, "查阅资料": 25,
    "妙手": 5, "侦查": 25, "潜行": 10, "游泳": 25,
    "投掷": 25, "追踪": 10,
    "攀爬": 40, "指挥": 5, "搏斗": 25, "擒抱": 25,
    "躲藏": 10, "跳跃": 25, "精细操作": 5, "礼仪": 5,
    "武术": 1, "医学": 5, "教导": 10, "博弈": 0,
    "议价": 5, "爆破": 1, "精神治疗": 1, "读写能力": 0,
    "战术": 1, "能量放射": 0,
    "知识:历史": 5, "知识:见闻": 5,
    "科学:天文学": 1, "科学:生物学": 1, "科学:物理学": 1,
    "维修:法器维修": 15, "维修:机械维修": 15, "维修:电子维修": 15,
    "骑术:骑马": 1, "骑术:骑龙": 1, "骑术:骑猫头鹰": 1,
    "自定义1": 1, "自定义2": 1, "自定义3": 1
  },

  defaultsComputed: {
    "语言": "{智力}",
    "灵力控制": "floor({意志}/2)",
    "闪避": "floor({敏捷}/5)"
  },

  alias: {
    "力量": ["STR", "str"], "体质": ["CON", "con"], "体型": ["SIZ", "siz"],
    "智力": ["INT", "int"], "意志": ["POW", "pow"], "敏捷": ["DEX", "dex"],
    "外貌": ["APP", "app"], "气运": ["Luck", "luck"], "灵气": ["Qi", "qi"],
    "HP": ["hp", "体力"], "PP": ["pp"], "DB": ["db"], "ADB": ["adb"],
    "护甲": ["Armor", "armor"], "移动力": ["MOV", "mov"],
    "灵根": ["SpiritRoot", "root"], "种族": ["Race", "race"],
    "境界": ["Realm", "realm"], "职业": ["Profession", "prof"],
    "闪避": ["Dodge", "dodge"], "飞行": ["Fly", "fly"],
    "功法": ["MartialArts", "ma"],
    "战斗:体": ["Brawl", "体"], "战斗:器": ["Weapon", "器"],
    "战斗:灵": ["SpiritCombat", "灵"]
  },

  textMap: {},
  textMapHelpInfo: null
};

try {
  seal.gameSystem.newTemplate(JSON.stringify(template));
} catch (e) {
  console.log('加载《餐云卧石》模板时出错:', e);
}

// =============================================
// 二、扩展注册 + 全部代码
// =============================================

if (!seal.ext.find('cyws')) {
  var ext = seal.ext.new('cyws', 'Asa阿沙', '1.0.0');
  // ★ 必须显式设置autoActive=true：Go的bool默认值为false，
  // 不设置则扩展不会自动激活，.set cyws的relatedExt机制也无效
  ext.autoActive = true;
  seal.ext.register(ext);
  ext.storageInit();

  // ──────────────────────────────
  // 数据常量
  // ──────────────────────────────

  var SPIRIT_ROOTS = {
    '金': { stat: '敏捷', bonus: 5, variant: '音' },
    '木': { stat: '体质', bonus: 5, variant: '花' },
    '水': { stat: '智力', bonus: 5, variant: '幻' },
    '火': { stat: '力量', bonus: 5, variant: '电' },
    '土': { stat: '意志', bonus: 5, variant: '幽冥' },
    '音': { stat: null, bonus: 0, isVariant: true, parent: '金', desc: '伤害无视护甲' },
    '花': { stat: null, bonus: 0, isVariant: true, parent: '木', desc: '消耗回合调整行动顺序' },
    '幻': { stat: null, bonus: 0, isVariant: true, parent: '水', desc: '猜测骰子结果获得额外回合' },
    '电': { stat: null, bonus: 0, isVariant: true, parent: '火', desc: '体质检定追加不可闪避攻击' },
    '幽冥': { stat: null, bonus: 0, isVariant: true, parent: '土', desc: '消耗灵气治疗他人' },
    '血': { stat: null, bonus: 0, isDemonic: true, desc: '伤害回血/杀敌回灵气' },
    '毒': { stat: null, bonus: 0, isDemonic: true, desc: '免疫毒/攻击范围体质检定' },
    '气': { stat: null, bonus: 0, isDemonic: true, desc: '分配10属性/吸取意志灵气' }
  };

  var RACES = {
    '人族': { bonuses: { '地位': 5 }, desc: '人丁兴盛' },
    '鲛人': { bonuses: { '游泳': 30 }, desc: '水居如鱼' },
    '羽民': { bonuses: { '飞行': 30 }, desc: '乘风' },
    '半妖': { qiBonus: '1d3*5', desc: '妖力' },
    '鬼魂': { special: '不受未附加灵气实体攻击伤害，火/电双倍伤害', desc: '魂魄' },
    '鬼修': { special: 'HP=0，1/2HP加到灵气上，灵气视为HP', hpToQi: true, desc: '魂体' },
    '妖':   { special: '妖形+n属性(≤20)，妖丹离体全属性+5技能+10%', freePoints: 20, desc: '妖形/妖丹' },
    '怪':   { special: '自由分配25点', freePoints: 25, desc: '天生灵怪' },
    '灵':   { special: '自由分配30点，每日恢复灵气+r3d6', freePoints: 30, desc: '天生灵怪/灵气' }
  };

  var REALMS = {
    '炼气': { adb: '0',    spellPts: 3 },
    '筑基': { adb: '1D4',  spellPts: 4 },
    '金丹': { adb: '2D4',  spellPts: 6 },
    '元婴': { adb: '3D4',  spellPts: 8 },
    '化神': { adb: '3D6',  spellPts: 10 },
    '大乘': { adb: '4D8',  spellPts: 12 }
  };

  var GRADE_COST = { '天': 7, '地': 5, '玄': 3, '黄': 1, '不入流': 0 };

  var PROFESSIONS = {
    '蛊师': { category: '阴', spiritRoots: ['水','土','花','幻','幽冥'], skills: ['巫蛊','杂学','追踪','急救','地位','灵力控制','感知','侦查','战斗:灵'], freeSkill: 1, spell: { name: '蛊术', time: '短时/长时', check: '巫蛊', needGrade: true } },
    '吊魂师': { category: '阴', spiritRoots: ['木','花','土','幽冥'], skills: ['通灵','医术','地位','灵力控制','闪避','卜卦','话术','感知'], freeSkill: 2, spell: { name: '吊魂', time: '即时', check: 'POW对抗(可选)', needGrade: true } },
    '活无常': { category: '阴', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥'], skills: ['通灵','战斗:器','地位','掩护','查阅资料','灵力控制'], extraCombat: 2, freeSkill: 1, spell: { name: '勾魂', time: '即时', check: null, needGrade: true } },
    '医修': { category: '阳', spiritRoots: ['水','木','幻'], skills: ['医术','炼丹','感知','地位','灵力控制','查阅资料','说服','符道','侦查','杂学'], freeSkill: 0, spell: { name: '杏林', time: '即时/短时/长时', check: null, needGrade: true } },
    '偃师': { category: '阳', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥'], skills: ['艺术:其他','灵力控制','炼器','符道','估价','杂学','妙手','地位','战斗:器'], freeSkill: 1, spell: { name: '傀儡法术', time: '即时', check: '灵力控制', needGrade: true } },
    '丹青师': { category: '阳', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥'], skills: ['艺术:乐理','艺术:丹青','通灵','灵力控制','地位','感知','杂学','战斗:灵','洞察'], freeSkill: 1, spell: { name: '附灵', time: '即时/短时/长时', check: null, needGrade: true } },
    '兵修': { category: '兵', spiritRoots: ['金','火','电','幻','水'], skills: ['战斗:器','灵力控制','洞察','功法','飞行','地位','闪避','传音','潜行'], freeSkill: 1, spell: { name: '兵戈', time: '即时', check: null, needGrade: true } },
    '乐师': { category: '兵', spiritRoots: ['音','幻','花'], skills: ['艺术:乐理','灵力控制','地位','感知','查阅资料','幻术','传音','阵道','表演'], freeSkill: 1, spell: { name: '五音', time: '短时', check: null, needGrade: true } },
    '铸器师': { category: '兵', spiritRoots: ['火','电','金','土'], skills: ['炼器','杂学','侦查','聆听','地位','查阅资料','估价'], extraCombat: 1, freeSkill: 2, spell: { name: '铸器', time: '被动/即时', check: null, needGrade: true } },
    '符师': { category: '术', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥'], skills: ['符道','感知','灵力控制','地位','卜卦','飞行','通灵'], extraCombat: 1, freeSkill: 1, spell: { name: '画符', time: '被动', check: null, needGrade: false } },
    '阵师': { category: '术', spiritRoots: ['花','水','幻','土','幽冥'], skills: ['阵道','感知','灵力控制','地位','卜卦','战斗:灵','侦查','查阅资料','掩护','幻术'], freeSkill: 0, spell: { name: '画阵', time: '被动', check: null, needGrade: false } },
    '御兽师': { category: '术', spiritRoots: ['金','木','水','火','土'], skills: ['御兽','灵力控制','地位','战斗:器','查阅资料','侦查','聆听','通灵','炼丹'], freeSkill: 1, spell: { name: '兽心通', time: '被动', check: null, needGrade: false } },
    '蜃师': { category: '术', spiritRoots: ['水','幻','幽冥'], skills: ['幻术','通灵','灵力控制','战斗:灵','地位','话术','潜行','洞察','感知'], freeSkill: 1, spell: { name: '蜃梦', time: '短时/长时', check: null, needGrade: true } },
    '仙商': { category: '非常规', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥'], skills: ['估价','谈判','话术','地位','导航','查阅资料','杂学'], freeSkill: 3, spell: { name: '诱导', time: '被动', check: null, needGrade: false } },
    '灵植师': { category: '非常规', spiritRoots: ['木','土','花'], skills: ['灵力控制','炼丹','感知','急救','杂学','地位','通灵','庖厨'], freeSkill: 2, spell: { name: '草木通', time: '被动', check: null, needGrade: false } },
    '灵厨': { category: '非常规', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥'], skills: ['庖厨','杂学','灵力控制','地位','急救','感知','查阅资料'], freeSkill: 3, spell: { name: '食鲜', time: '被动', check: null, needGrade: false } },
    '游方道人': { category: '非常规', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥'], skills: ['艺术:其他','战斗:灵','灵力控制','感知','地位','飞行','洞察','伪装'], freeSkill: 2, spell: { name: '天问', time: '自定义', check: null, needGrade: true } },
    '合欢道人': { category: '邪道', spiritRoots: ['水','幻','气'], skills: ['邪术','灵力控制','地位','洞察','伪装','幻术','话术','功法'], freeSkill: 2, spell: { name: '暖香', time: '短时/长时', check: null, needGrade: true } },
    '毒修': { category: '邪道', spiritRoots: ['金','木','水','火','土','音','花','幻','电','毒'], skills: ['邪术','医术','蛊术','通灵','感知','卜卦'], extraCombat: 1, freeSkill: 2, spell: { name: '邪祟', time: '即时/短时/长时', check: null, needGrade: true } },
    '血修': { category: '邪道', spiritRoots: ['火','土','幽冥','金','血'], skills: ['邪术','急救'], extraCombat: 2, freeSkill: 2, spell: { name: '心火', time: '即时/短时/长时', check: null, needGrade: true } },
    '摄魂鬼': { category: '邪道', spiritRoots: ['金','木','水','火','土','音','花','幻','电','气'], skills: ['邪术','潜行','追踪','地位','通灵','感知','掩护'], extraCombat: 1, freeSkill: 0, extraSkills: ['伪装','闪避'], spell: { name: '摄魂', time: '短时/长时', check: 'POW', needGrade: true } },
    '告死人': { category: '邪道', spiritRoots: ['金','木','水','火','土','音','花','幻','电','幽冥','血','毒','气'], skills: ['邪术','通灵','灵力控制','功法','地位'], extraCombat: 1, freeSkill: 4, spell: { name: '告死', time: '被动', check: null, needGrade: false } }
  };

  var PRESET_SPELLS = {
    '风卷残云': { grade: '天', cost: '12PP/36HP', time: '长时', limit: '阵修', desc: '消耗巨额灵气刻画阵法，人为制造六个时辰风暴。范围内修仙者每次行动需敏捷判定，失败则无法行动。' },
    '鸣凤在竹': { grade: '天', cost: '10PP+10HP', time: '即时', limit: '木灵根+凤栖竹', desc: '以凤栖竹为媒介召唤凤的残魂，持续一炷香。令百鸟臣服，指定最多两人各免疫一次致死伤害。' },
    '草木皆兵': { grade: '地', cost: '8PP/32灵气', time: '即时', limit: '木/花灵根或灵植师', desc: '弹指间方圆两丈植物皆为眼耳，捕捉一切动作与对话。' },
    '一枕槐安': { grade: '地', cost: '6PP', time: '短时', limit: '蜃师/幻灵根', desc: '引导一人走入幻境，需困难成功感知看破，否则承受2/5最大HP伤害或徘徊1d6回合。可被打断。' },
    '摧枯拉朽': { grade: '玄', cost: '2PP/10灵气', time: '即时', limit: '兵修', desc: '凝聚灵气汇出剑锋，攻击一个敌人，伤害=DB+ADB+r2d4。' },
    '枯木逢春': { grade: '玄', cost: '10灵气', time: '即时', limit: '水/土/木灵根', desc: '高深治疗术，指定一名修仙者恢复DB+ADB+rd4点HP。' },
    '控火诀': { grade: '黄', cost: '5灵气', time: '即时', limit: '火/电灵根', desc: '操纵火灵气运动或攻击，造成DB+ADB伤害。' },
    '凝神诀': { grade: '黄', cost: '5灵气', time: '即时', limit: '无', desc: '提高自身注意力，下次侦察类技能出目-5%。' },
    '净衣术': { grade: '不入流', cost: '1灵气', time: '即时', limit: '无', desc: '清洁衣物的日常法术。' },
    '避水术': { grade: '不入流', cost: '1灵气', time: '即时', limit: '无', desc: '避水的日常法术。' },
    '蛊术':     { grade: '自定义', cost: '按设定', time: '短时/长时', limit: '蛊师', check: '巫蛊', desc: '蛊师的攻击方式，一般为咒术或蛊虫，需进行巫蛊判定。' },
    '吊魂':     { grade: '自定义', cost: '按设定', time: '即时', limit: '吊魂师', desc: '对魂魄受损之人的治疗，使用时需对象无意识或同意，否则需POW对抗。' },
    '勾魂':     { grade: '自定义', cost: '按设定', time: '即时', limit: '活无常', desc: '攻击、拘束魂魄的法术统称，对无肉体鬼魂/鬼修更致命。' },
    '杏林':     { grade: '自定义', cost: '按设定', time: '即时/短时/长时', limit: '医修', desc: '治愈性法术的基本统称，形式因人而异。' },
    '傀儡法术': { grade: '自定义', cost: '按设定', time: '即时', limit: '偃师', check: '灵力控制', desc: '对傀儡下令的法术，困难程度可能需要灵力控制检定。' },
    '附灵':     { grade: '自定义', cost: '按设定', time: '即时/短时/长时', limit: '丹青师', desc: '让灵气短暂聚集到指定物体上，使其生出灵性。' },
    '兵戈':     { grade: '自定义', cost: '按设定', time: '即时', limit: '兵修', desc: '最简单的利用灵气施展招式，有专门名称和招式特性。' },
    '五音':     { grade: '自定义', cost: '按设定', time: '短时', limit: '乐师', desc: '宫商角徵羽，乐师附有灵气的弹奏，可攻击/治疗/幻术。' },
    '铸器':     { grade: '自定义', cost: '按设定', time: '被动/即时', limit: '铸器师', desc: '不进行技能检定了解器物特征，或以天地为炉对敌方展开多段攻击(rnd3)。' },
    '画符':     { grade: '自定义', cost: '按设定', time: '被动', limit: '符师', desc: '创造符、利用符的能力。只有符师能设计符篆。' },
    '画阵':     { grade: '自定义', cost: '按设定', time: '被动', limit: '阵师', desc: '与画符规则一致。阵不需注入灵气启动，自动运行。' },
    '兽心通':   { grade: '自定义', cost: '按设定', time: '被动', limit: '御兽师', desc: '与灵兽建立联系，可不使用传音技能听懂灵兽意思。' },
    '蜃梦':     { grade: '自定义', cost: '按设定', time: '短时/长时', limit: '蜃师', desc: '制造幻觉或干扰梦境，了无痕迹难以察觉。' },
    '诱导':     { grade: '自定义', cost: '按设定', time: '被动', limit: '仙商', desc: '较高口才或吸引力，让他人产生好感。' },
    '草木通':   { grade: '自定义', cost: '按设定', time: '被动', limit: '灵植师', desc: '与植物构建对话方式，读懂植物情绪变化或大致意思。' },
    '食鲜':     { grade: '自定义', cost: '按设定', time: '被动', limit: '灵厨', desc: '保存/搭配食材的独特路数，可利用其他五行灵气（不含变异灵气）。' },
    '天问':     { grade: '自定义', cost: '自定义', time: '自定义', limit: '游方道人', desc: '因得道在特定方面有超乎常人的敏锐性（由PL自定义）。' },
    '暖香':     { grade: '自定义', cost: '按设定', time: '短时/长时', limit: '合欢道人', desc: '引动修仙者欲火，搭配房中术可让人枯死在温柔乡中。' },
    '邪祟':     { grade: '自定义', cost: '按设定', time: '即时/短时/长时', limit: '毒修', desc: '提炼负面灵气作为防身武器，包括致命毒物、恶灵怨念等。' },
    '心火':     { grade: '自定义', cost: '按设定', time: '即时/短时/长时', limit: '血修', desc: '影响他人血气运动，产生愤怒焦躁等负面情绪，甚至诱导心魔。' },
    '摄魂':     { grade: '自定义', cost: '按设定', time: '短时/长时', limit: '摄魂鬼', desc: '摧毁魂魄，不可逆转，需与对象进行POW检定。' },
    '告死':     { grade: '自定义', cost: '按设定', time: '被动', limit: '告死人', desc: '因他人死亡而亢奋，开杀戒后陷入陶醉状态，带来属性强化。' }
  };

  var TRAITS_PERSONAL = [
    '霉运连连：修仙者曾经有一段时间连连倒霉',
    '误会：修仙者被人误会有什么怪癖',
    '走错路：修仙者在参加某个大会的时候走反方向了',
    '人生错觉：修仙者曾经误以为某某暗恋自己',
    '不如不见：修仙者曾经和别人恩断义绝',
    '被骂了：修仙者因为某件事被长辈责骂',
    '走错房间：修仙者晚上睡觉时走错了地方',
    '肚子撑：修仙者辟谷太久，再次尝到鲜香之后吃撑了'
  ];

  var TRAITS_EXPERIENCE = [
    '霉运连连', '误会', '走错路', '人生错觉', '不如不见', '被骂了', '走错房间', '肚子撑',
    '招财进宝：修仙者曾经有一段时间发财运',
    '可遇不可求：修仙者偶然获得了一本功法秘籍（玄阶法术+1）',
    '灵气爆炸：修仙者在修炼时出了差错引起爆炸事件',
    '好学生：修仙者因为修炼勤快被表扬了',
    '遭遇扒手：修仙者在一次出门时被偷走了钱袋',
    '被骗了：修仙者曾经被奸商或骗子哄骗过',
    '大脑空空：修仙者有一次出门打架没带武器',
    '见证神话：修仙者曾经见过龙、凤这类神兽',
    '惨痛记忆：修仙者的同门在自己眼前死去',
    '遍寻忘川：修仙者曾经经历过刻骨铭心、忘不了的事情',
    '话本子：修仙者曾经看过一些奇怪的话本子',
    '逃跑：修仙者曾经试图逃离某个地方'
  ];

  // ──────────────────────────────
  // 技能默认值表（来源：餐云卧石角色卡ver1.3 + BRP修仙者模板）
  // 当角色卡ChVars中无对应技能时，.ra 等命令回退到此表取值
  // ──────────────────────────────

  var SKILL_DEFAULTS = {
    // CYWS核心技能
    '飞行': 5, '卜卦': 1, '炼丹': 30, '炼器': 5, '符道': 10,
    '阵道': 5, '感知': 10, '巫蛊': 1, '杂学': 20, '语言': 0,
    '邪术': 1, '地位': 5, '御兽': 5, '传音': 10, '医术': 5,
    '聆听': 5, '通灵': 1, '灵力控制': 0, '掩护': 10,
    '战斗:体': 30, '战斗:器': 30, '战斗:灵': 20,
    '艺术:乐理': 1, '艺术:丹青': 1, '艺术:其他': 1,
    '庖厨': 5, '幻术': 1, '估价': 15, '谈判': 5, '话术': 5,
    '说服': 5, '伪装': 1, '闪避': 0, '急救': 30, '洞察': 5,
    '知识:草药学': 5, '知识:神话学': 5, '知识:其他': 5,
    '功法': 1, '导航': 5, '表演': 5, '查阅资料': 25,
    '妙手': 5, '侦查': 25, '潜行': 10, '游泳': 25,
    '投掷': 25, '追踪': 10,
    // BRP通用技能（修仙者模板）
    '攀爬': 40, '指挥': 5, '搏斗': 25, '擒抱': 25,
    '躲藏': 10, '跳跃': 25, '精细操作': 5, '礼仪': 5,
    '武术': 1, '医学': 5, '教导': 10, '博弈': 0,
    '议价': 5, '爆破': 1, '精神治疗': 1, '读写能力': 0,
    '战术': 1, '能量放射': 0,
    // 知识/科学类
    '知识:历史': 5, '知识:见闻': 5,
    '科学:天文学': 1, '科学:生物学': 1, '科学:物理学': 1,
    // 维修/骑术类
    '维修:法器维修': 15, '维修:机械维修': 15, '维修:电子维修': 15,
    '骑术:骑马': 1, '骑术:骑龙': 1, '骑术:骑猫头鹰': 1,
    // 自定义
    '自定义1': 1, '自定义2': 1, '自定义3': 1
  };

  // ──────────────────────────────
  // 辅助函数
  // ──────────────────────────────

  // 属性读写
  function getInt(ctx, name, fallback) {
    var r = seal.vars.intGet(ctx, name);
    return r[1] ? r[0] : (fallback || 0);
  }
  function getStr(ctx, name, fallback) {
    var r = seal.vars.strGet(ctx, name);
    return r[1] ? r[0] : (fallback || '');
  }
  function setInt(ctx, name, val) {
    seal.vars.intSet(ctx, name, Number(val));
  }
  function setStr(ctx, name, val) {
    seal.vars.strSet(ctx, name, String(val));
  }
  function modInt(ctx, name, delta) {
    var cur = getInt(ctx, name, 0);
    setInt(ctx, name, cur + delta);
    return cur + delta;
  }

  // 房规守卫：检测当前群是否为餐云卧石规则
  // 使用seal.format读取$t游戏模式临时变量（seal.vars.strGet无法读取$t前缀变量）
  function isCywsMode(ctx) {
    try {
      var mode = seal.format(ctx, '{$t游戏模式}');
      if (mode && mode.indexOf('$t') < 0 && mode.trim() !== '') {
        return mode.trim() === 'cyws';
      }
    } catch(e) {}
    try {
      var r = seal.vars.strGet(ctx, '$t游戏模式');
      if (r[1]) return r[0] === 'cyws';
    } catch(e) {}
    return false;
  }

  // 骰子投掷
  function roll(ctx, expr) {
    try {
      var result = seal.format(ctx, '{' + expr + '}');
      var num = parseInt(result, 10);
      return isNaN(num) ? 0 : num;
    } catch (e) {
      return 0;
    }
  }

  function rollDetailed(ctx, expr) {
    expr = String(expr).replace(/^\+/, '');
    if (!expr || expr === '0') return { total: 0, detail: '0' };
    var tokenRegex = /([+-]?)(\d+)d(\d+)|([+-]?\d+)/gi;
    var total = 0;
    var detailParts = [];
    var match;
    while ((match = tokenRegex.exec(expr)) !== null) {
      if (match[2]) {
        var sign = match[1] === '-' ? -1 : 1;
        var count = parseInt(match[2], 10);
        var sides = parseInt(match[3], 10);
        var rolls = [];
        var sum = 0;
        for (var i = 0; i < count; i++) {
          var r = roll(ctx, '1d' + sides);
          rolls.push(r);
          sum += r;
        }
        var value = sign * sum;
        total += value;
        var rollStr = count === 1 ? String(rolls[0]) : rolls.join('+');
        detailParts.push((sign < 0 ? '-' : '') + rollStr);
      } else if (match[4]) {
        var num = parseInt(match[4], 10);
        total += num;
        detailParts.push(match[4]);
      }
    }
    if (detailParts.length === 0) return { total: 0, detail: expr };
    return { total: total, detail: detailParts.join('+') };
  }

  function maximizeDiceExpr(expr) {
    expr = String(expr).replace(/^\+/, '');
    if (!expr || expr === '0') return { total: 0, detail: '0' };
    var tokenRegex = /([+-]?)(\d+)d(\d+)|([+-]?\d+)/gi;
    var total = 0;
    var detailParts = [];
    var match;
    while ((match = tokenRegex.exec(expr)) !== null) {
      if (match[2]) {
        var sign = match[1] === '-' ? -1 : 1;
        var count = parseInt(match[2], 10);
        var sides = parseInt(match[3], 10);
        var maxRoll = count * sides;
        total += sign * maxRoll;
        detailParts.push((sign < 0 ? '-' : '') + maxRoll);
      } else if (match[4]) {
        total += parseInt(match[4], 10);
        detailParts.push(match[4]);
      }
    }
    return { total: total, detail: detailParts.join('+') || expr };
  }

  // 存储辅助
  function storageGetJSON(key, fallback) {
    try { return JSON.parse(ext.storageGet(key) || 'null') || fallback; }
    catch(e) { return fallback; }
  }
  function storageSetJSON(key, val) {
    ext.storageSet(key, JSON.stringify(val));
  }
  function charKey(ctx, suffix) {
    var gid = ctx.group ? ctx.group.groupId : 'private';
    var uid = ctx.player.userId;
    return suffix + '_' + gid + '_' + uid;
  }
  function getMeta(ctx) {
    return storageGetJSON(charKey(ctx, 'meta'), { weapons: {}, growthMarks: {}, combatActive: false, triggersUsed: {} });
  }
  function setMeta(ctx, meta) {
    storageSetJSON(charKey(ctx, 'meta'), meta);
  }
  function getSpells(ctx) {
    return storageGetJSON(charKey(ctx, 'spells'), { list: [], pointsUsed: 0 });
  }
  function setSpells(ctx, data) {
    storageSetJSON(charKey(ctx, 'spells'), data);
  }
  function getMarkers(ctx) {
    return storageGetJSON(charKey(ctx, 'markers'), []);
  }
  function setMarkers(ctx, arr) {
    storageSetJSON(charKey(ctx, 'markers'), arr);
  }

  // NPC存储辅助（按群隔离，KP共用）
  function getNpcs(ctx) {
    var gid = ctx.group ? ctx.group.groupId : 'private';
    return storageGetJSON('npcs_' + gid, {});
  }
  function setNpcs(ctx, npcs) {
    var gid = ctx.group ? ctx.group.groupId : 'private';
    storageSetJSON('npcs_' + gid, npcs);
  }

  // NPC属性解析：支持 力量50、DB=+1D4、HP10/10 三种格式
  function parseNpcStats(text) {
    var stats = {};
    var tokens = text.split(/\s+/).filter(function(t) { return t.length > 0; });
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      var eqIdx = t.indexOf('=');
      if (eqIdx > 0) {
        var eqKey = t.substring(0, eqIdx);
        var eqVal = t.substring(eqIdx + 1);
        // 处理 HP=10/10 格式
        var eqSlash = eqVal.indexOf('/');
        if (eqSlash > 0) {
          var eqCur = parseInt(eqVal.substring(0, eqSlash), 10);
          var eqMax = parseInt(eqVal.substring(eqSlash + 1), 10);
          if (!isNaN(eqCur) && !isNaN(eqMax) && String(eqCur) === eqVal.substring(0, eqSlash) && String(eqMax) === eqVal.substring(eqSlash + 1)) {
            stats[eqKey] = eqCur;
            stats['最大' + eqKey] = eqMax;
            continue;
          }
        }
        stats[eqKey] = eqVal;
        continue;
      }
      // 处理 HP10/10 格式（当前值/最大值）
      var slashMatch = t.match(/^([^\d]+)(\d+)\/(\d+)$/);
      if (slashMatch && slashMatch[1].length > 0) {
        stats[slashMatch[1]] = parseInt(slashMatch[2], 10);
        stats['最大' + slashMatch[1]] = parseInt(slashMatch[3], 10);
        continue;
      }
      // 处理 力量50 格式（[^\d]+ 确保名称不含数字，避免贪婪匹配问题）
      var numMatch = t.match(/^([^\d]+)(\d+)$/);
      if (numMatch && numMatch[1].length > 0) {
        stats[numMatch[1]] = parseInt(numMatch[2], 10);
        continue;
      }
    }
    return stats;
  }

  // 别名反查
  var ALIAS_TO_CANONICAL = {};
  function buildAliasMap() {
    var aliasConfig = template.alias || {};
    for (var canonical in aliasConfig) {
      if (!aliasConfig.hasOwnProperty(canonical)) continue;
      var aliases = aliasConfig[canonical];
      for (var i = 0; i < aliases.length; i++) {
        ALIAS_TO_CANONICAL[aliases[i].toLowerCase()] = canonical;
        ALIAS_TO_CANONICAL[aliases[i]] = canonical;
      }
    }
  }
  buildAliasMap();

  function resolveAttrName(name) {
    if (template.defaults && template.defaults.hasOwnProperty(name)) return name;
    var lower = name.toLowerCase();
    if (ALIAS_TO_CANONICAL[lower]) return ALIAS_TO_CANONICAL[lower];
    if (ALIAS_TO_CANONICAL[name]) return ALIAS_TO_CANONICAL[name];
    return name;
  }

  // 衍生属性计算
  function calcDB(str, siz) {
    var sum = Number(str) + Number(siz);
    if (sum <= 60)  return '-1D6';
    if (sum <= 80)  return '-1D4';
    if (sum <= 120) return '0';
    if (sum <= 160) return '+1D4';
    if (sum <= 200) return '+1D6';
    if (sum <= 280) return '+2D6';
    return '+3D6';
  }

  function calcHP(con, siz, race, ahp) {
    if (race === '鬼修') return 0;
    return Math.ceil((Number(con) + Number(siz)) / 10) * 5 + (Number(ahp) || 0);
  }

  function calcPP(qi) { return Math.floor(Number(qi) / 5); }
  function calcADB(realm) { return (REALMS[realm] || REALMS['炼气']).adb; }
  function calcSpellPts(realm) { return (REALMS[realm] || REALMS['炼气']).spellPts; }
  function calcSkillPts(qi) { return 260 + Number(qi) - 75; }
  function calcHobbyPts(dex) { return Number(dex) * 2; }

  function calcDerivedFromCard(ctx) {
    var str = getInt(ctx, '力量', 0);
    var con = getInt(ctx, '体质', 0);
    var siz = getInt(ctx, '体型', 0);
    var dex = getInt(ctx, '敏捷', 0);
    var pow = getInt(ctx, '意志', 0);
    var qi  = getInt(ctx, '灵气', 0);
    var ahp = getInt(ctx, 'AHP', 0);
    var race = getStr(ctx, '种族', '人族');
    var realm = getStr(ctx, '境界', '炼气');

    var hp = calcHP(con, siz, race, ahp);
    var pp = calcPP(qi);
    var db = calcDB(str, siz);
    var adb = calcADB(realm);
    var spellPts = calcSpellPts(realm);
    var skillPts = calcSkillPts(qi);
    var hobbyPts = calcHobbyPts(dex);

    return {
      'HP': hp, '最大HP': hp, 'PP': pp, '最大PP': pp,
      'DB': db, 'ADB': adb, '职业点': skillPts, '兴趣点': hobbyPts,
      '法术点': spellPts
    };
  }

  function writeDerived(ctx, derived) {
    for (var key in derived) {
      if (!derived.hasOwnProperty(key)) continue;
      var val = derived[key];
      if (key === 'DB' || key === 'ADB') {
        setStr(ctx, key, String(val));
      } else {
        setInt(ctx, key, Number(val));
      }
    }
  }

  // 成功等级判定
  function judgeSuccess(rollVal, skillValue) {
    skillValue = Number(skillValue);
    rollVal = Number(rollVal);
    if (rollVal === 1)   return { level: '大成功', canGrow: true };
    if (rollVal === 100) return { level: '大失败', canGrow: false };
    if (skillValue > 0 && rollVal <= Math.floor(skillValue / 5)) return { level: '特殊成功', canGrow: true };
    if (skillValue > 0 && rollVal <= Math.floor(skillValue / 2)) return { level: '困难成功', canGrow: false };
    if (rollVal <= skillValue) return { level: '成功', canGrow: false };
    return { level: '失败', canGrow: false };
  }

  // 输入解析 v3
  function parseStInput(text) {
    var result = { attrs: {}, increments: {}, spiritRoot: null, race: null, realm: null, profession: null, weapon: null };
    var tokens = text.split(/\s+/).filter(function(t) { return t.length > 0; });
    if (tokens.length === 0) return result;

    var spiritRoots = new Set(['金','木','水','火','土','音','花','幻','电','幽冥','血','毒','气']);
    var races = new Set(['人族','鲛人','羽民','半妖','鬼魂','鬼修','妖','怪','灵']);
    var realms = new Set(['炼气','筑基','金丹','元婴','化神','大乘']);

    var defaultsKeys = Object.keys(template.defaults || {});
    defaultsKeys.sort(function(a, b) { return b.length - a.length; });

    var aliasEntries = [];
    for (var canonical in template.alias) {
      if (!template.alias.hasOwnProperty(canonical)) continue;
      var aliases = template.alias[canonical];
      for (var i = 0; i < aliases.length; i++) {
        aliasEntries.push({ alias: aliases[i], canonical: canonical });
      }
    }
    aliasEntries.sort(function(a, b) { return b.alias.length - a.alias.length; });

    var idx = 0;
    while (idx < tokens.length) {
      var token = tokens[idx];

      // 武器冒号格式
      var weaponColonMatch = token.match(/^武器[：:](.+?)[：:](.+)$/);
      if (weaponColonMatch) {
        result.weapon = { name: weaponColonMatch[1], formula: weaponColonMatch[2] };
        idx++; continue;
      }

      // 武器空格格式
      if (token === '武器' && idx + 2 < tokens.length) {
        result.weapon = { name: tokens[idx+1], formula: tokens[idx+2] };
        idx += 3; continue;
      }

      // 元数据精确匹配
      if (spiritRoots.has(token)) { result.spiritRoot = token; idx++; continue; }
      if (races.has(token))       { result.race = token; idx++; continue; }
      if (realms.has(token))      { result.realm = token; idx++; continue; }
      if (PROFESSIONS[token])     { result.profession = token; idx++; continue; }

      // defaults键匹配（按长度降序，优先匹配长名如"自定义1"）
      var matched = false;
      for (var di = 0; di < defaultsKeys.length; di++) {
        var key = defaultsKeys[di];
        if (token.startsWith(key) && token.length > key.length) {
          var rest = token.substring(key.length);
          // 增量格式：灵气+30
          if (rest.startsWith('+')) {
            var incVal = parseInt(rest.substring(1), 10);
            if (!isNaN(incVal) && String(incVal) === rest.substring(1)) {
              result.increments[resolveAttrName(key)] = incVal;
              matched = true; break;
            }
          }
          // 绝对值格式：灵气80
          var val = parseInt(rest, 10);
          if (!isNaN(val) && String(val) === rest) {
            result.attrs[resolveAttrName(key)] = val;
            matched = true; break;
          }
        }
      }
      if (matched) { idx++; continue; }

      // alias匹配
      for (var ai = 0; ai < aliasEntries.length; ai++) {
        var entry = aliasEntries[ai];
        if (token.toLowerCase().startsWith(entry.alias.toLowerCase()) && token.length > entry.alias.length) {
          var arest = token.substring(entry.alias.length);
          // 增量格式：qi+30
          if (arest.startsWith('+')) {
            var aincVal = parseInt(arest.substring(1), 10);
            if (!isNaN(aincVal) && String(aincVal) === arest.substring(1)) {
              result.increments[entry.canonical] = aincVal;
              matched = true; break;
            }
          }
          var aval = parseInt(arest, 10);
          if (!isNaN(aval) && String(aval) === arest) {
            result.attrs[entry.canonical] = aval;
            matched = true; break;
          }
        }
      }
      if (matched) { idx++; continue; }

      // 冒号属性名紧凑格式
      var colonMatch = token.match(/^(.+[:：].+?)[+]?(\d+)$/);
      if (colonMatch) {
        var cname = colonMatch[1].replace(/：/g, ':');
        var cval = parseInt(colonMatch[2], 10);
        var cIsInc = token.charAt(colonMatch[1].length) === '+';
        if (!spiritRoots.has(cname) && !races.has(cname) && !realms.has(cname)) {
          if (cIsInc) { result.increments[resolveAttrName(cname)] = cval; }
          else { result.attrs[resolveAttrName(cname)] = cval; }
          idx++; continue;
        }
      }

      // 空格分离 name value 格式（支持 name +value 增量）
      if (defaultsKeys.indexOf(token) >= 0 && idx + 1 < tokens.length) {
        var nextRaw = tokens[idx+1];
        var nextIsInc = nextRaw.startsWith('+');
        var nextVal = parseInt(nextIsInc ? nextRaw.substring(1) : nextRaw, 10);
        if (!isNaN(nextVal) && !spiritRoots.has(nextRaw) && !races.has(nextRaw) && !realms.has(nextRaw)) {
          if (nextIsInc) { result.increments[resolveAttrName(token)] = nextVal; }
          else { result.attrs[resolveAttrName(token)] = nextVal; }
          idx += 2; continue;
        }
      }

      // alias空格格式（支持 +value 增量）
      var aliasLookup = ALIAS_TO_CANONICAL[token.toLowerCase()] || ALIAS_TO_CANONICAL[token];
      if (aliasLookup && idx + 1 < tokens.length) {
        var anextRaw = tokens[idx+1];
        var anextIsInc = anextRaw.startsWith('+');
        var anextVal = parseInt(anextIsInc ? anextRaw.substring(1) : anextRaw, 10);
        if (!isNaN(anextVal)) {
          if (anextIsInc) { result.increments[aliasLookup] = anextVal; }
          else { result.attrs[aliasLookup] = anextVal; }
          idx += 2; continue;
        }
      }

      // 兜底正则（支持 +增量）
      var simpleMatch = token.match(/^([^\d\s+]+?)[+]?(\d+)$/);
      if (simpleMatch) {
        var sname = simpleMatch[1];
        var sval = parseInt(simpleMatch[2], 10);
        var sIsInc = token.charAt(sname.length) === '+';
        if (!spiritRoots.has(sname) && !races.has(sname) && !realms.has(sname)) {
          if (sIsInc) { result.increments[resolveAttrName(sname)] = sval; }
          else { result.attrs[resolveAttrName(sname)] = sval; }
          idx++; continue;
        }
      }

      idx++;
    }
    return result;
  }

  // ──────────────────────────────
  // 命令实现
  // ──────────────────────────────

  // 帮助文本
  var HELP_TEXT = ''
    + '🏔️ 餐云卧石 — BRP修仙规则插件 帮助\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '\n'
    + '《餐云卧石》是一款基于BRP规则的修仙题材TRPG。\n'
    + '本插件自动化了制卡投掷、技能检定、战斗伤害、灵气管理、法术施放等流程。\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '🚀 快速开始\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '① .set cyws          切换房规为餐云卧石\n'
    + '② .餐云 或 .制卡       投掷属性\n'
    + '③ 在Excel角色卡中完成灵根/种族/技能等选择\n'
    + '④ .pc new <角色名>    创建角色卡\n'
    + '⑤ .st <属性值...>      一键录入（自动计算HP/PP/DB/ADB等）\n'
    + '⑥ .sn 或 .sn auto     同步群名片\n'
    + '⑦ .ra <技能名>        开始技能检定！\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '🎲 制卡与录入\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.餐云 [数量]           批量投掷属性（默认1组，最多10组）\n'
    + '  → 投出STR/CON/SIZ/INT/POW/DEX/APP/气运/灵气\n'
    + '  → 例：.餐云 3  一次投3组供选择\n'
    + '\n'
    + '.制卡                  引导式制卡（投属性+掷特质表）\n'
    + '  → 自动掷出1D8个人特点+1D20额外经历\n'
    + '\n'
    + '.st <属性值...>         录入角色卡（核心命令）\n'
    + '  → 自动识别灵根/种族/境界/职业四个元数据\n'
    + '  → 自动计算HP/PP/DB/ADB/职业点/兴趣点/法术点\n'
    + '  → 自动计算闪避/灵力控制/语言初始值\n'
    + '  → 支持中英文属性名（力量60 或 STR60）\n'
    + '  → 支持冒号属性名（战斗:器60）\n'
    + '  → 支持武器录入：武器:本命剑:1d8+1d4\n'
    + '  → 支持增量修改：灵气+30（在当前值基础上加30）\n'
    + '  → .st show/clear/del 等子命令自动穿透给核心处理\n'
    + '  → 例：.st 力量60体质55体型65智力70意志60敏捷75外貌45 灵气70 金 人族 炼气 兵修 战斗:器60 武器:本命剑:1d8+1d4\n'
    + '  → 增量例：.st 灵气+30 HP-5\n'
    + '\n'
    + '.录入 <灵根> <种族> <境界> <职业>\n'
    + '  → 单独修改元数据，不需重新录入全部属性\n'
    + '  → 例：.录入 金 人族 筑基 兵修\n'
    + '\n'
    + '.重算                  重新计算所有衍生属性\n'
    + '  → 修改基础属性后使用，自动重算HP/PP/DB/ADB等\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '🎲 检定系统\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.ra <技能名>           技能检定（D100）\n'
    + '  → 大成功=1 / 特殊成功≤技能/5 / 困难成功≤技能/2\n'
    + '  → 成功≤技能 / 失败>技能 / 大失败=100\n'
    + '  → 特殊成功和大成功自动标记成长\n'
    + '  → 手动指定技能值：.ra <技能名> <数值> 或 .ra <数值> <技能名>\n'
    + '  → 例：.ra 闪避  .ra 战斗:器  .ra 闪避 50  .ra 50 闪避\n'
    + '\n'
    + '.rc <属性名>           属性检定\n'
    + '  → 用属性值作为成功率（力量80即80%）\n'
    + '  → 手动指定属性值：.rc <属性名> <数值> 或 .rc <数值> <属性名>\n'
    + '  → 例：.rc 力量  .rc 意志  .rc 力量 80\n'
    + '\n'
    + '.功法 <模式> <技能名>   功法检定\n'
    + '  → 模式：攻击（武器骰翻倍）/ 防御（抵消15伤害）/ 干扰（附带攻击）\n'
    + '  → 先做技能检定，成功后再做功法检定\n'
    + '  → 例：.功法 攻击 战斗:器\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '⚔️ 战斗系统\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.战斗 on               开启战斗状态\n'
    + '.战斗 off              结束战斗状态\n'
    + '\n'
    + '.攻击 [技能名]         攻击检定+伤害计算\n'
    + '  → 默认技能：战斗:器\n'
    + '  → 自动读取武器伤害+DB+ADB\n'
    + '  → 灵气>HP时自动附加ADB\n'
    + '  → 大成功时武器伤害骰取最大值（DB/ADB不翻倍）\n'
    + '  → 手动指定技能值：.攻击 <技能名> <数值> 或 .攻击 <数值>\n'
    + '  → 例：.攻击  .攻击 战斗:器  .攻击 战斗:器 60\n'
    + '\n'
    + '.受伤 <数值>           扣减HP\n'
    + '  → 自动减去护甲值\n'
    + '  → 音灵根攻击时无视护甲\n'
    + '  → 鬼修特殊处理（HP始终为0，扣灵气代替）\n'
    + '  → HP≤0时提示昏迷，HP≤-体质时提示死亡\n'
    + '  → 例：.受伤 12\n'
    + '\n'
    + '.施法 <法术名> [pp/灵]  施放法术\n'
    + '  → 不选消耗方式时显示法术信息和选项\n'
    + '  → pp：消耗PP施放 | 灵：消耗灵气施放\n'
    + '  → 例：.施法 摧枯拉朽  → .施法 摧枯拉朽 pp\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '💓 状态管理\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.状态                  查看角色状态\n'
    + '  → 显示HP/PP/灵气血条 + DB/ADB/护甲 + 状态标记\n'
    + '\n'
    + '.hp <+/-数值>          HP增减\n'
    + '  → 例：.hp -5  .hp +10\n'
    + '\n'
    + '.灵气 <+/-数值>        灵气增减\n'
    + '  → 灵气低于HP时提醒ADB失效\n'
    + '  → 灵气归零时提醒需意志检定\n'
    + '  → 例：.灵气 -5  .灵气 +10\n'
    + '\n'
    + '.标记 <+名称/-名称>    状态标记管理\n'
    + '  → 例：.标记 +中毒  .标记 -中毒\n'
    + '\n'
    + '.回复 <休息/行动/修炼>  灵气回复规则查询\n'
    + '  → 休息：每半个时辰+1PP\n'
    + '  → 行动：每时辰+2PP\n'
    + '  → 修炼：不回复PP\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '📈 成长系统\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.成长标记              查看可成长技能列表\n'
    + '  → 特殊成功和大成功自动获得成长标记\n'
    + '.成长标记 清空          清空所有成长标记\n'
    + '\n'
    + '.成长 <技能名>         成长检定\n'
    + '  → 掷1D100，出目>技能值则成长成功，+1D10\n'
    + '  → 例：.成长 闪避\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '📜 法术系统\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.法术学习 <法术名> [品阶]\n'
    + '  → 学习预置法术或职业法术\n'
    + '  → 职业法术品阶由玩家指定（天/地/玄/黄）\n'
    + '  → 自动扣除法术点（被动法术不占用）\n'
    + '  → 例：.法术学习 摧枯拉朽  .法术学习 兵戈 黄\n'
    + '\n'
    + '.法术创建 <名称> <品阶> [消耗] [时间] [效果]\n'
    + '  → 创建自创法术\n'
    + '  → 品阶必填：天/地/玄/黄/不入流\n'
    + '  → 消耗可选：5PP / 10灵气 / 5PP/20灵气（默认按设定）\n'
    + '  → 时间可选：即时/短时/长时/被动（默认即时）\n'
    + '  → 例：.法术创建 火球术 玄 5PP 即时 向目标投掷火球\n'
    + '\n'
    + '.法术列表              查看已学法术\n'
    + '  → 显示品阶/消耗/施放时间 + 法术点使用情况\n'
    + '\n'
    + '.法术删除 <法术名>     遗忘已学法术并退还法术点\n'
    + '  → 被动法术不退还法术点\n'
    + '  → 例：.法术删除 火球术（别名：.法术遗忘）\n'
    + '\n'
    + '.武器删除 <武器名>     删除角色武器\n'
    + '  → 例：.武器删除 本命剑（别名：.武器移除）\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '📖 速查指令\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.灵根查询 <名称>       查询灵根属性加成和特殊能力\n'
    + '.种族查询 <名称>       查询种族加成和特殊规则\n'
    + '.职业查询 <名称>       查询职业适配灵根、技能和法术\n'
    + '.境界查询 <名称>       查询境界ADB和法术点\n'
    + '  → 例：.灵根查询 金  .种族查询 鬼修  .职业查询 兵修\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '🎭 NPC管理（KP专用）\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '.npc add <名称> <属性值...>  创建NPC\n'
    + '  → 例：.npc add 小兵A 力量50 体质40 闪避30 HP10 护甲2\n'
    + '  → DB/ADB用=号：.npc add BossA 力量80 HP20 DB=+1D6\n'
    + '.npc <名称> ra <技能> [数值]  NPC技能检定\n'
    + '.npc <名称> 攻击 [技能] [数值] NPC攻击\n'
    + '.npc <名称> 受伤 <数值>        NPC受伤\n'
    + '.npc <名称> hp <+/-数值>       NPC HP增减\n'
    + '.npc <名称> 灵气 <+/-数值>     NPC灵气增减\n'
    + '.npc <名称> 武器 <名> <公式>   NPC武器添加\n'
    + '.npc <名称> 武器 del <名>      NPC武器删除\n'
    + '.npc <名称> st                  查看NPC属性\n'
    + '.npc <名称> 标记 <+名/-名>     NPC状态标记\n'
    + '.npc <名称> del                 删除NPC\n'
    + '.npc list                       列出所有NPC\n'
    + '.npc clear                      清空所有NPC\n'
    + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '💡 提示\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '· 技能检定用 .ra 而非 .r（.r是核心命令，无法覆盖）\n'
    + '· KP可使用 .npc 管理NPC，无需切换角色卡\n'
    + '· 所有检定命令支持手动指定数值：.ra 闪避 50 / .攻击 60\n'
    + '· 切换房规：.set cyws  |  切回COC：.set coc\n'
    + '· 名片同步：.sn（一次性）或 .sn auto（自动同步）\n'
    + '· 任何指令加 help 可查看帮助，如 .st help';

  // 5.1 .st 命令
  var cmdSt = seal.ext.newCmdItemInfo();
  cmdSt.name = 'st';
  cmdSt.help = '📋 .st <属性值...> — 录入角色卡\n\n自动识别灵根/种族/境界/职业，并计算HP/PP/DB/ADB等衍生值。\n\n格式：属性名+数值 紧凑排列，元数据关键词自动识别\n例：.st 力量60体质55体型65智力70意志60敏捷75外貌45 灵气70 金 人族 炼气 兵修 战斗:器60\n\n支持的格式：\n· 紧凑：力量60体质55\n· 空格：力量 60 体质 55\n· 英文别名：STR60 DEX75\n· 冒号属性：战斗:器60 知识:草药学5\n· 增量修改：灵气+30（在当前值基础上加30）\n· 武器录入：武器:本命剑:1d8+1d4\n· 元数据关键词：金/木/水/火/土 等13种灵根、人族等9种种族、炼气等6种境界、22种职业\n\n子命令穿透：.st show / .st clear / .st del 等交给核心处理';
  cmdSt.solve = function(ctx, msg, cmdArgs) {
    if (!isCywsMode(ctx)) { return seal.ext.newCmdExecuteResult(false); }
    var text = cmdArgs.getRestArgsFrom(1);
    if (!text || text.trim() === '') {
      return seal.ext.newCmdExecuteResult(false);
    }
    var sub = text.trim().split(/\s+/)[0];
    if (['show', 'clear', 'del', 'rm', 'export', 'help'].indexOf(sub.toLowerCase()) >= 0) {
      return seal.ext.newCmdExecuteResult(false);
    }

    var parsed = parseStInput(text);
    if (Object.keys(parsed.attrs).length === 0 && Object.keys(parsed.increments).length === 0 && !parsed.spiritRoot && !parsed.race && !parsed.realm && !parsed.profession && !parsed.weapon) {
      return seal.ext.newCmdExecuteResult(false);
    }

    // 绝对值写入
    for (var key in parsed.attrs) {
      if (!parsed.attrs.hasOwnProperty(key)) continue;
      setInt(ctx, key, parsed.attrs[key]);
    }

    // 增量写入
    var incResults = [];
    for (var ikey in parsed.increments) {
      if (!parsed.increments.hasOwnProperty(ikey)) continue;
      var oldVal = getInt(ctx, ikey, 0);
      var delta = parsed.increments[ikey];
      setInt(ctx, ikey, oldVal + delta);
      incResults.push(ikey + ':' + oldVal + '→' + (oldVal + delta));
    }

    if (parsed.spiritRoot) setStr(ctx, '灵根', parsed.spiritRoot);
    if (parsed.race)       setStr(ctx, '种族', parsed.race);
    if (parsed.realm)      setStr(ctx, '境界', parsed.realm);
    if (parsed.profession) setStr(ctx, '职业', parsed.profession);

    var meta = getMeta(ctx);
    if (parsed.spiritRoot) meta.lastSpiritRoot = parsed.spiritRoot;
    if (parsed.race)       meta.lastRace = parsed.race;
    if (parsed.realm)      meta.lastRealm = parsed.realm;
    if (parsed.profession) meta.lastProfession = parsed.profession;
    if (parsed.weapon) {
      meta.weapons = meta.weapons || {};
      meta.weapons[parsed.weapon.name] = parsed.weapon.formula;
    }
    setMeta(ctx, meta);

    var derived = calcDerivedFromCard(ctx);
    writeDerived(ctx, derived);

    // defaultsComputed 自动写入（仅用户未手动录入时覆盖）
    var r1 = seal.vars.intGet(ctx, '闪避');
    if (!r1[1]) setInt(ctx, '闪避', Math.floor(getInt(ctx, '敏捷', 0) / 5));
    var r2 = seal.vars.intGet(ctx, '灵力控制');
    if (!r2[1]) setInt(ctx, '灵力控制', Math.floor(getInt(ctx, '意志', 0) / 2));
    var r3 = seal.vars.intGet(ctx, '语言');
    if (!r3[1]) setInt(ctx, '语言', getInt(ctx, '智力', 0));

    // 写入技能默认初始值（仅角色卡中不存在的技能）
    var defaultWritten = [];
    for (var sk in SKILL_DEFAULTS) {
      if (!SKILL_DEFAULTS.hasOwnProperty(sk)) continue;
      var chk = seal.vars.intGet(ctx, sk);
      if (!chk[1]) {
        setInt(ctx, sk, SKILL_DEFAULTS[sk]);
        defaultWritten.push(sk);
      }
    }

    // 鬼修特殊处理
    var race = getStr(ctx, '种族', '人族');
    if (race === '鬼修') {
      var normalHP = calcHP(getInt(ctx, '体质', 0), getInt(ctx, '体型', 0), '人族', getInt(ctx, 'AHP', 0));
      var qiBonus = Math.floor(normalHP / 2);
      setInt(ctx, 'HP', 0);
      setInt(ctx, '最大HP', 0);
      modInt(ctx, '灵气', qiBonus);
    }

    var output = '✓ 餐云卧石角色卡录入完成\n━━━━━━━━━━━━━━━━━━━━━━\n';
    output += '自动计算衍生值：\n';
    output += '· HP = ' + getInt(ctx, 'HP', 0) + ' | PP = ' + getInt(ctx, 'PP', 0);
    output += ' | DB = ' + getStr(ctx, 'DB', '0') + ' | ADB = ' + getStr(ctx, 'ADB', '0') + '\n';
    output += '· 职业点 = ' + derived['职业点'] + ' | 兴趣点 = ' + derived['兴趣点'];
    output += ' | 法术点 = ' + derived['法术点'] + '\n';
    output += '━━━━━━━━━━━━━━━━━━━━━━\n';
    output += '已识别元数据：\n';
    output += '灵根：' + getStr(ctx, '灵根', '无') + ' | 种族：' + getStr(ctx, '种族', '人族');
    output += ' | 境界：' + getStr(ctx, '境界', '炼气') + ' | 职业：' + getStr(ctx, '职业', '无');

    var rootInfo = SPIRIT_ROOTS[getStr(ctx, '灵根', '')];
    if (rootInfo && rootInfo.stat && rootInfo.bonus) {
      output += '\n⚠️ ' + getStr(ctx, '灵根', '') + '灵根' + rootInfo.stat + '应+' + rootInfo.bonus + '，请确认是否已在角色卡中计入';
    }

    var raceInfo = RACES[getStr(ctx, '种族', '')];
    if (raceInfo && raceInfo.bonuses) {
      var bonusList = [];
      for (var bk in raceInfo.bonuses) { if (raceInfo.bonuses.hasOwnProperty(bk)) bonusList.push(bk + '+' + raceInfo.bonuses[bk]); }
      output += '\n⚠️ ' + getStr(ctx, '种族', '') + '种族加成：' + bonusList.join('、') + '，请确认是否已计入';
    }

    var armor = getInt(ctx, '护甲', 0);
    if (armor === 0) {
      output += '\n💡 当前护甲值为0，若有护甲请录入：.st 护甲<数值>';
    }

    if (parsed.weapon) {
      output += '\n⚔️ 已录入武器：' + parsed.weapon.name + ' (' + parsed.weapon.formula + ')';
    }

    output += '\n━━━━━━━━━━━━━━━━━━━━━━\n自动计算技能初始值：';
    output += '\n· 闪避 = ⌊敏捷/5⌋ = ' + getInt(ctx, '闪避', 0);
    output += '\n· 灵力控制 = ⌊意志/2⌋ = ' + getInt(ctx, '灵力控制', 0);
    output += '\n· 语言 = 智力 = ' + getInt(ctx, '语言', 0);
    if (defaultWritten.length > 0) {
      output += '\n· 已写入' + defaultWritten.length + '项技能默认初始值（未加点技能也可用.ra检定）';
    }

    if (incResults.length > 0) {
      output += '\n━━━━━━━━━━━━━━━━━━━━━━\n增量修改：\n· ' + incResults.join(' | ');
    }

    if (parsed.profession && PROFESSIONS[parsed.profession] && PROFESSIONS[parsed.profession].spell) {
      var profData = PROFESSIONS[parsed.profession];
      output += '\n━━━━━━━━━━━━━━━━━━━━━━\n📜 检测到职业：' + parsed.profession;
      output += '\n推荐学习职业法术：' + profData.spell.name;
      output += '\n使用 .法术学习 ' + profData.spell.name + ' <品阶> 来学习';
    }

    output += '\n━━━━━━━━━━━━━━━━━━━━━━\n💡 录入完成后同步名片：.sn（一次性）或 .sn auto（自动同步）';

    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['st'] = cmdSt;

  // 5.2 .ra 命令
  var cmdRa = seal.ext.newCmdItemInfo();
  cmdRa.name = 'ra';
  cmdRa.help = '🎲 .ra <技能名> — 技能检定\n\n掷1D100，与技能值比较判定成功等级：\n· 大成功=1 / 特殊成功≤技能/5 / 困难成功≤技能/2\n· 成功≤技能 / 失败>技能 / 大失败=100\n\n特殊成功和大成功自动获得成长标记。\n支持手动指定技能值：.ra <技能名> <数值> 或 .ra <数值> <技能名>\n\n例：.ra 闪避  .ra 战斗:器  .ra 闪避 50  .ra 50 闪避';
  cmdRa.solve = function(ctx, msg, cmdArgs) {
    if (!isCywsMode(ctx)) { return seal.ext.newCmdExecuteResult(false); }
    var arg1 = cmdArgs.getArgN(1);
    if (!arg1) {
      seal.replyToSender(ctx, msg, '用法: .ra <技能名> [数值]  或  .ra <数值> <技能名>');
      return seal.ext.newCmdExecuteResult(true);
    }
    var arg2 = cmdArgs.getArgN(2);
    var skillName, manualValue;
    var arg1IsNum = !isNaN(parseInt(arg1, 10)) && String(parseInt(arg1, 10)) === arg1;

    if (arg1IsNum && arg2) {
      manualValue = parseInt(arg1, 10);
      skillName = arg2;
    } else if (arg2 && !isNaN(parseInt(arg2, 10)) && String(parseInt(arg2, 10)) === arg2) {
      skillName = arg1;
      manualValue = parseInt(arg2, 10);
    } else {
      skillName = arg1;
      manualValue = null;
    }

    var resolved = resolveAttrName(skillName);
    var lookupName = (resolved !== skillName) ? resolved : skillName;
    var skillValue;
    var isManual = false;

    if (manualValue !== null) {
      skillValue = manualValue;
      skillName = lookupName;
      isManual = true;
    } else {
      skillValue = getInt(ctx, lookupName, -1);
      if (skillValue < 0 && SKILL_DEFAULTS.hasOwnProperty(lookupName)) {
        skillValue = SKILL_DEFAULTS[lookupName];
      }
      if (skillValue < 0) {
        seal.replyToSender(ctx, msg, '⚠️ 未找到技能: ' + skillName + '\n可手动指定数值: .ra ' + skillName + ' <数值>');
        return seal.ext.newCmdExecuteResult(true);
      }
      skillName = lookupName;
    }

    var rollResult = roll(ctx, '1d100');
    var judge = judgeSuccess(rollResult, skillValue);
    var hardVal = Math.floor(skillValue / 2);
    var specialVal = Math.floor(skillValue / 5);
    var levelEmoji = { '大成功': '✨', '特殊成功': '✨', '困难成功': '✅', '成功': '✅', '失败': '❌', '大失败': '💀' };

    var output = '🎲 餐云卧石技能检定\n━━━━━━━━━━━━━━━\n';
    output += '角色：' + ctx.player.name + '\n';
    output += '技能：' + skillName + ' (' + skillValue + '%)' + (isManual ? ' [手动]' : '') + '\n';
    output += '成功/困难/特殊：' + skillValue + '/' + hardVal + '/' + specialVal + '\n';
    output += '━━━━━━━━━━━━━━━\n';
    output += '🎲 1D100 = ' + rollResult + '\n';
    output += (levelEmoji[judge.level] || '') + ' ' + judge.level;

    if (judge.canGrow && !isManual) {
      output += '\n[成长标记 ✓]';
      var meta = getMeta(ctx);
      if (!meta.growthMarks) meta.growthMarks = {};
      meta.growthMarks[skillName] = judge.level;
      setMeta(ctx, meta);
    }

    // 幻灵根猜测检查
    var guessKey = charKey(ctx, 'pending_guess');
    var pendingGuess = storageGetJSON(guessKey, null);
    if (pendingGuess) {
      ext.storageSet(guessKey, '');
      if (pendingGuess.guess === judge.level) {
        output += '\n🔮 幻灵根猜测正确！获得一个额外回合';
      } else {
        output += '\n🔮 幻灵根猜测错误（猜测：' + pendingGuess.guess + '，实际：' + judge.level + '）';
      }
    }

    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['ra'] = cmdRa;

  // 5.3 .rc 命令
  var cmdRc = seal.ext.newCmdItemInfo();
  cmdRc.name = 'rc';
  cmdRc.help = '🎲 .rc <属性名> — 属性检定\n\n用属性值作为成功率进行D100检定（力量80即80%成功率）。\n成功等级与.ra相同。\n支持手动指定属性值：.rc <属性名> <数值> 或 .rc <数值> <属性名>\n\n例：.rc 力量  .rc 意志  .rc 力量 80  .rc 80 力量';
  cmdRc.solve = function(ctx, msg, cmdArgs) {
    if (!isCywsMode(ctx)) { return seal.ext.newCmdExecuteResult(false); }
    var arg1 = cmdArgs.getArgN(1);
    if (!arg1) {
      seal.replyToSender(ctx, msg, '用法: .rc <属性名> [数值]  或  .rc <数值> <属性名>');
      return seal.ext.newCmdExecuteResult(true);
    }
    var arg2 = cmdArgs.getArgN(2);
    var attrName, attrValue, isManual;
    var arg1IsNum = !isNaN(parseInt(arg1, 10)) && String(parseInt(arg1, 10)) === arg1;

    if (arg1IsNum && arg2) {
      attrValue = parseInt(arg1, 10);
      attrName = arg2;
      isManual = true;
    } else if (arg2 && !isNaN(parseInt(arg2, 10)) && String(parseInt(arg2, 10)) === arg2) {
      attrName = arg1;
      attrValue = parseInt(arg2, 10);
      isManual = true;
    } else {
      attrName = arg1;
      attrValue = null;
      isManual = false;
    }

    var resolved = resolveAttrName(attrName);
    if (attrValue === null) attrValue = getInt(ctx, resolved, 0);
    var rollResult = roll(ctx, '1d100');
    var judge = judgeSuccess(rollResult, attrValue);
    var levelEmoji = { '大成功': '✨', '特殊成功': '✨', '困难成功': '✅', '成功': '✅', '失败': '❌', '大失败': '💀' };

    var output = '🎲 属性检定：' + resolved + ' (' + attrValue + '%)' + (isManual ? ' [手动]' : '') + '\n';
    output += '🎲 1D100 = ' + rollResult + ' → ' + (levelEmoji[judge.level] || '') + ' ' + judge.level;
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['rc'] = cmdRc;

  // 5.4 .餐云 + .cyws 命令
  var cmdCyws = seal.ext.newCmdItemInfo();
  cmdCyws.name = '餐云';
  cmdCyws.help = '🏔️ .餐云 [数量] — 批量投掷属性\n\n投掷7项基础属性(3d6×5)+气运(3d6×5)+灵气(2d6×5+30)。\n可选参数：数量(1-10)，默认1组。\n\n.餐云 help — 查看完整帮助\n.cyws — .餐云的别名';
  cmdCyws.solve = function(ctx, msg, cmdArgs) {
    var subCmd = cmdArgs.getArgN(1);
    // help 不受房规守卫限制——用户需要先看到帮助才知道怎么 .set cyws
    if (subCmd === 'help' || subCmd === '帮助') {
      seal.replyToSender(ctx, msg, HELP_TEXT);
      return seal.ext.newCmdExecuteResult(true);
    }
    var count = Math.min(Math.max(Number(subCmd) || 1, 1), 10);
    var output = '🎲 餐云卧石属性投掷 (×' + count + ')\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    for (var i = 0; i < count; i++) {
      var str = roll(ctx, '3d6*5');
      var con = roll(ctx, '3d6*5');
      var siz = roll(ctx, '2d6*5+30');
      var int_ = roll(ctx, '2d6*5+30');
      var pow = roll(ctx, '3d6*5');
      var dex = roll(ctx, '3d6*5');
      var app = roll(ctx, '3d6*5');
      var luck = roll(ctx, '3d6*5');
      var qi = roll(ctx, '2d6*5+30');
      var total = str + con + siz + int_ + pow + dex + app;
      output += '[' + (i+1) + '] STR:' + str + ' CON:' + con + ' SIZ:' + siz + ' INT:' + int_ + ' POW:' + pow + ' DEX:' + dex + ' APP:' + app + '\n';
      output += '    气运:' + luck + ' 灵气:' + qi + ' 总值:' + total + '\n\n';
    }
    output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n请选择一组，在Excel角色卡中填入后使用 .st 录入';
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['餐云'] = cmdCyws;

  var cmdCywsAlias = seal.ext.newCmdItemInfo();
  cmdCywsAlias.name = 'cyws';
  cmdCywsAlias.help = '🏔️ .cyws [数量] — 批量投掷属性（.餐云的别名）\n\n与.餐云完全相同，投掷7项基础属性+气运+灵气。\n.cyws help — 查看完整帮助';
  cmdCywsAlias.solve = cmdCyws.solve;
  ext.cmdMap['cyws'] = cmdCywsAlias;

  // 5.5 .录入 命令
  var cmdInput = seal.ext.newCmdItemInfo();
  cmdInput.name = '录入';
  cmdInput.help = '📝 .录入 <灵根> <种族> <境界> <职业> — 元数据录入\n\n单独修改灵根/种族/境界/职业，不需重新录入全部属性。\n修改后自动重算衍生值。\n\n例：.录入 金 人族 筑基 兵修\n例：.录入 筑基（只改境界）';
  cmdInput.solve = function(ctx, msg, cmdArgs) {
    var text = cmdArgs.getRestArgsFrom(1);
    if (!text) {
      seal.replyToSender(ctx, msg, '用法: .录入 <灵根> <种族> <境界> <职业>\n示例: .录入 金 人族 炼气 蛊师');
      return seal.ext.newCmdExecuteResult(true);
    }
    var tokens = text.split(/\s+/);
    var spiritRoots = new Set(['金','木','水','火','土','音','花','幻','电','幽冥','血','毒','气']);
    var races = new Set(['人族','鲛人','羽民','半妖','鬼魂','鬼修','妖','怪','灵']);
    var realms = new Set(['炼气','筑基','金丹','元婴','化神','大乘']);
    var metaChanged = false;
    for (var i = 0; i < tokens.length; i++) {
      if (spiritRoots.has(tokens[i])) { setStr(ctx, '灵根', tokens[i]); metaChanged = true; }
      else if (races.has(tokens[i])) { setStr(ctx, '种族', tokens[i]); metaChanged = true; }
      else if (realms.has(tokens[i])) { setStr(ctx, '境界', tokens[i]); metaChanged = true; }
      else if (PROFESSIONS[tokens[i]]) { setStr(ctx, '职业', tokens[i]); metaChanged = true; }
    }
    if (metaChanged) {
      var derived = calcDerivedFromCard(ctx);
      writeDerived(ctx, derived);
    }
    var output = '✓ 元数据录入完成\n';
    output += '灵根：' + getStr(ctx, '灵根', '无') + ' | 种族：' + getStr(ctx, '种族', '人族');
    output += ' | 境界：' + getStr(ctx, '境界', '炼气') + ' | 职业：' + getStr(ctx, '职业', '无');
    var rootInfo = SPIRIT_ROOTS[getStr(ctx, '灵根', '')];
    if (rootInfo && rootInfo.stat && rootInfo.bonus) {
      output += '\n⚠️ ' + getStr(ctx, '灵根', '') + '灵根' + rootInfo.stat + '应+' + rootInfo.bonus + '，请确认是否已计入';
    }
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['录入'] = cmdInput;

  // 5.6 .重算 命令
  var cmdRecalc = seal.ext.newCmdItemInfo();
  cmdRecalc.name = '重算';
  cmdRecalc.help = '🔄 .重算 — 重新计算所有衍生属性\n\n根据当前力量/体质/体型/敏捷/意志/灵气/种族/境界，重算HP/PP/DB/ADB/职业点/兴趣点/法术点。\n修改基础属性后使用此命令。';
  cmdRecalc.solve = function(ctx, msg, cmdArgs) {
    var derived = calcDerivedFromCard(ctx);
    writeDerived(ctx, derived);
    var output = '✓ 衍生属性已重算\n';
    output += 'HP=' + derived['HP'] + ' PP=' + derived['PP'];
    output += ' DB=' + derived['DB'] + ' ADB=' + derived['ADB'];
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['重算'] = cmdRecalc;

  // 5.7 .攻击 命令
  var cmdAttack = seal.ext.newCmdItemInfo();
  cmdAttack.name = '攻击';
  cmdAttack.help = '⚔️ .攻击 [技能名] — 攻击检定+伤害计算\n\n先做技能检定(1D100)，命中后自动计算伤害：\n· 武器伤害骰（从.st录入的武器读取）\n· + DB（力量+体型查表）\n· + ADB（仅灵气>HP时附加）\n\n大成功：武器伤害骰取最大值（DB/ADB不翻倍）\n大失败：提示由KP裁定意外效果\n\n默认技能：战斗:器\n支持手动指定技能值：.攻击 <技能名> <数值>\n例：.攻击  .攻击 战斗:体  .攻击 战斗:器 60  .攻击 60';
  cmdAttack.solve = function(ctx, msg, cmdArgs) {
    var arg1 = cmdArgs.getArgN(1) || '';
    var arg2 = cmdArgs.getArgN(2) || '';
    var skillName, manualValue, isManual;
    var arg1IsNum = !isNaN(parseInt(arg1, 10)) && String(parseInt(arg1, 10)) === arg1 && arg1 !== '';

    if (arg1IsNum && !arg2) {
      // .攻击 60 → 默认技能+手动值
      skillName = '战斗:器';
      manualValue = parseInt(arg1, 10);
      isManual = true;
    } else if (arg1IsNum && arg2) {
      // .攻击 60 战斗:器 → value=60, skill=战斗:器
      manualValue = parseInt(arg1, 10);
      skillName = arg2;
      isManual = true;
    } else if (arg2 && !isNaN(parseInt(arg2, 10)) && String(parseInt(arg2, 10)) === arg2) {
      // .攻击 战斗:器 60 → skill=战斗:器, value=60
      skillName = arg1;
      manualValue = parseInt(arg2, 10);
      isManual = true;
    } else {
      skillName = arg1 || '战斗:器';
      manualValue = null;
      isManual = false;
    }

    var resolvedSkill = resolveAttrName(skillName);
    var skillValue;
    if (manualValue !== null) {
      skillValue = manualValue;
    } else {
      skillValue = getInt(ctx, resolvedSkill, -1);
      if (skillValue < 0 && SKILL_DEFAULTS.hasOwnProperty(resolvedSkill)) {
        skillValue = SKILL_DEFAULTS[resolvedSkill];
      }
      if (skillValue < 0) skillValue = 0;
    }
    var rollResult = roll(ctx, '1d100');
    var judge = judgeSuccess(rollResult, skillValue);

    var output = '⚔️ 攻击检定\n━━━━━━━━━━━━━━━\n';
    output += '角色：' + ctx.player.name + ' | 技能：' + resolvedSkill + ' (' + skillValue + '%)' + (isManual ? ' [手动]' : '') + '\n';
    output += '🎲 1D100 = ' + rollResult + ' → ' + judge.level + '\n';

    if (judge.level === '失败' || judge.level === '大失败') {
      output += '━━━━━━━━━━━━━━━\n攻击未命中';
      if (judge.level === '大失败') output += '\n💀 大失败！由KP裁定意外效果';
      seal.replyToSender(ctx, msg, output);
      return seal.ext.newCmdExecuteResult(true);
    }

    output += '━━━━━━━━━━━━━━━\n伤害计算：\n';
    var weaponDmg = 0;
    var weaponDetail = '';
    var meta = getMeta(ctx);
    var weapons = meta.weapons || {};
    var weaponKeys = Object.keys(weapons);
    var isMaximized = (judge.level === '大成功');

    if (weaponKeys.length > 0) {
      var wName = weaponKeys[0];
      var wFormula = weapons[wName];
      if (isMaximized) {
        var maxResult = maximizeDiceExpr(wFormula);
        weaponDmg = maxResult.total;
        weaponDetail = '武器[' + wName + ']: ' + wFormula + ' → MAX ' + maxResult.detail + ' = ' + weaponDmg;
      } else {
        var wResult = rollDetailed(ctx, wFormula);
        weaponDmg = wResult.total;
        weaponDetail = '武器[' + wName + ']: ' + wFormula + ' → ' + wResult.detail + ' = ' + weaponDmg;
      }
    }

    var dbStr = getStr(ctx, 'DB', '0');
    var dbDmg = 0, dbDetail = '';
    if (dbStr === '0') {
      dbDmg = 0; dbDetail = '0';
    } else if (isMaximized) {
      var maxDB = maximizeDiceExpr(dbStr);
      dbDmg = maxDB.total; dbDetail = 'MAX ' + maxDB.detail;
    } else {
      var dbResult = rollDetailed(ctx, dbStr);
      dbDmg = dbResult.total; dbDetail = dbResult.detail;
    }

    var qi = getInt(ctx, '灵气', 0);
    var hp = getInt(ctx, 'HP', 0);
    var adbDmg = 0, adbDetail = '';
    var adbAttached = qi > hp;

    if (adbAttached) {
      var adbStr = getStr(ctx, 'ADB', '0');
      if (adbStr === '0') {
        adbDmg = 0; adbDetail = '0';
      } else {
        var adbResult = rollDetailed(ctx, adbStr);
        adbDmg = adbResult.total; adbDetail = adbResult.detail;
      }
    }

    if (weaponDetail) output += weaponDetail + '\n';
    output += 'DB: ' + dbStr + ' → ' + dbDetail + ' = ' + dbDmg + '\n';
    if (adbAttached) {
      output += 'ADB: ' + getStr(ctx, 'ADB', '0') + ' → ' + adbDetail + ' = ' + adbDmg + '\n';
    } else {
      output += 'ADB: ⚠️灵气(' + qi + ')≤HP(' + hp + ')，不附加ADB\n';
    }

    var totalDmg = weaponDmg + dbDmg + adbDmg;
    output += '━━━━━━━━━━━━━━━\n总伤害：' + totalDmg;
    if (isMaximized) output += '\n✨ 大成功！武器伤害骰已取最大值（DB/ADB不翻倍）';

    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['攻击'] = cmdAttack;

  // 5.8 .受伤 命令
  var cmdHurt = seal.ext.newCmdItemInfo();
  cmdHurt.name = '受伤';
  cmdHurt.help = '💔 .受伤 <数值> — 扣减HP\n\n自动减去护甲值（音灵根攻击时无视护甲）。\n鬼修HP始终为0，提示扣减灵气代替。\n\nHP≤0：提示昏迷(1D6轮)\nHP≤-体质：提示角色死亡\n\n例：.受伤 12';
  cmdHurt.solve = function(ctx, msg, cmdArgs) {
    var dmg = Number(cmdArgs.getArgN(1));
    if (!dmg) {
      seal.replyToSender(ctx, msg, '用法: .受伤 <数值>');
      return seal.ext.newCmdExecuteResult(true);
    }
    var armor = getInt(ctx, '护甲', 0);
    var race = getStr(ctx, '种族', '人族');
    var spiritRoot = getStr(ctx, '灵根', '无');

    if (race === '鬼修') {
      seal.replyToSender(ctx, msg, '⚠️ 鬼修HP始终为0，请手动扣减灵气代替：.灵气 -' + dmg);
      return seal.ext.newCmdExecuteResult(true);
    }

    var rootInfo = SPIRIT_ROOTS[spiritRoot];
    var ignoreArmor = rootInfo && rootInfo.isVariant && rootInfo.parent === '金';
    var actualArmor = ignoreArmor ? 0 : armor;
    var actualDmg = Math.max(dmg - actualArmor, 0);

    var output = '💔 受伤处理\n━━━━━━━━━━━━━━━\n';
    output += '角色：' + ctx.player.name + '\n原始伤害：' + dmg + '\n';
    if (ignoreArmor) {
      output += '护甲：0（音灵根无视护甲）\n';
    } else if (armor > 0) {
      output += '护甲值：' + armor + '\n';
    }
    output += '实际伤害：' + dmg + ' - ' + actualArmor + ' = ' + actualDmg + '\n';

    var newHp = modInt(ctx, 'HP', -actualDmg);
    var con = getInt(ctx, '体质', 0);
    output += '━━━━━━━━━━━━━━━\nHP：' + newHp;
    if (newHp <= 0 && newHp > -con) output += '\n⚠️ 角色昏迷，持续1D6轮';
    if (newHp <= -con) output += '\n💀 角色死亡';

    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['受伤'] = cmdHurt;

  // 5.9 .施法 命令
  var cmdCast = seal.ext.newCmdItemInfo();
  cmdCast.name = '施法';
  cmdCast.help = '🔮 .施法 <法术名> [pp/灵] — 施放法术\n\n第一步：.施法 <法术名> 查看法术信息和消耗选项\n第二步：选择消耗方式\n  pp — 消耗PP施放\n  灵 — 消耗灵气施放\n\n长时法术战斗中无法使用。\n\n例：.施法 摧枯拉朽 → .施法 摧枯拉朽 pp\n例：.施法 兵戈 → .施法 兵戈 灵';
  cmdCast.solve = function(ctx, msg, cmdArgs) {
    var spellName = cmdArgs.getArgN(1);
    var costType = cmdArgs.getArgN(2);
    if (!spellName) {
      seal.replyToSender(ctx, msg, '用法: .施法 <法术名> [pp/灵]');
      return seal.ext.newCmdExecuteResult(true);
    }

    var spellData = getSpells(ctx);
    var spell = null;
    for (var i = 0; i < spellData.list.length; i++) {
      if (spellData.list[i].name === spellName) { spell = spellData.list[i]; break; }
    }
    if (!spell && PRESET_SPELLS[spellName]) spell = PRESET_SPELLS[spellName];

    if (!spell) {
      seal.replyToSender(ctx, msg, '⚠️ 未找到法术: ' + spellName);
      return seal.ext.newCmdExecuteResult(true);
    }

    if (spell.time === '长时') {
      seal.replyToSender(ctx, msg, '⚠️ ' + spellName + '为长时法术，战斗中无法使用');
      return seal.ext.newCmdExecuteResult(true);
    }

    if (!costType) {
      var output = '🔮 ' + spellName + '（' + spell.grade + '阶·' + spell.time + '）\n';
      output += '效果：' + (spell.desc || '无') + '\n';
      output += '消耗：' + (spell.cost || '按设定') + '\n';
      if (spell.limit && spell.limit !== '无') output += '限制：' + spell.limit + '\n';
      output += '━━━━━━━━━━━━━━━\n';
      output += '请选择消耗方式：\n';
      output += '① .施法 ' + spellName + ' pp\n';
      output += '② .施法 ' + spellName + ' 灵\n';
      seal.replyToSender(ctx, msg, output);
      return seal.ext.newCmdExecuteResult(true);
    }

    if (costType === 'pp') {
      var ppCost = parseInt(spell.cost) || 1;
      var newPP = modInt(ctx, 'PP', -ppCost);
      var output2 = '🔮 法术施放：' + spellName + '\n';
      output2 += '消耗：' + ppCost + 'PP → PP:' + newPP + '\n';
      output2 += '效果：' + (spell.desc || '无');
      seal.replyToSender(ctx, msg, output2);
    } else if (costType === '灵') {
      var qiCost = parseInt(spell.cost) || 5;
      var newQi = modInt(ctx, '灵气', -qiCost);
      var output3 = '🔮 法术施放：' + spellName + '\n';
      output3 += '消耗：' + qiCost + '灵气 → 灵气:' + newQi + '\n';
      output3 += '效果：' + (spell.desc || '无');
      seal.replyToSender(ctx, msg, output3);
    } else {
      seal.replyToSender(ctx, msg, '⚠️ 未知消耗方式: ' + costType + '，请使用 pp 或 灵');
    }
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['施法'] = cmdCast;

  // 5.10 .功法 命令
  var cmdMartial = seal.ext.newCmdItemInfo();
  cmdMartial.name = '功法';
  cmdMartial.help = '🥋 .功法 <模式> <技能名> — 功法检定\n\n三种模式：\n· 攻击 — 功法成功时武器数值骰翻倍（DB/ADB不翻倍）\n· 防御 — 功法成功时抵消15点伤害\n· 干扰 — 功法成功时附带攻击效果（不含DB/ADB）\n\n先做技能检定，成功后再做功法检定(功法值%)。\n\n例：.功法 攻击 战斗:器\n例：.功法 防御 闪避\n例：.功法 干扰 灵力控制';
  cmdMartial.solve = function(ctx, msg, cmdArgs) {
    var mode = cmdArgs.getArgN(1);
    var skillName = cmdArgs.getArgN(2);
    if (['攻击','防御','干扰'].indexOf(mode) < 0 || !skillName) {
      seal.replyToSender(ctx, msg, '用法: .功法 <攻击/防御/干扰> <技能名>');
      return seal.ext.newCmdExecuteResult(true);
    }
    var resolvedSkill = resolveAttrName(skillName);
    var skillValue = getInt(ctx, resolvedSkill, -1);
    if (skillValue < 0 && SKILL_DEFAULTS.hasOwnProperty(resolvedSkill)) {
      skillValue = SKILL_DEFAULTS[resolvedSkill];
    }
    if (skillValue < 0) skillValue = 0;
    var maValue = getInt(ctx, '功法', 0);
    if (maValue === 0 && SKILL_DEFAULTS.hasOwnProperty('功法')) {
      maValue = SKILL_DEFAULTS['功法'];
    }
    var rollResult = roll(ctx, '1d100');
    var judge = judgeSuccess(rollResult, skillValue);

    var output = '🥋 功法检定（' + mode + '）\n━━━━━━━━━━━━━━━\n';
    output += '技能：' + resolvedSkill + ' (' + skillValue + '%)\n';
    output += '🎲 1D100 = ' + rollResult + ' → ' + judge.level + '\n';

    if (judge.level === '失败' || judge.level === '大失败') {
      output += '━━━━━━━━━━━━━━━\n检定失败，功法不生效';
      seal.replyToSender(ctx, msg, output);
      return seal.ext.newCmdExecuteResult(true);
    }

    var maRoll = roll(ctx, '1d100');
    var maSuccess = maRoll <= maValue;
    output += '━━━━━━━━━━━━━━━\n功法判定（功法值：' + maValue + '%）\n';
    output += '🎲 1D100 = ' + maRoll + (maSuccess ? ' ≤ ' : ' > ') + maValue + ' → ' + (maSuccess ? '功法成功！' : '功法失败') + '\n';

    if (maSuccess) {
      if (mode === '攻击') output += '⚡ 武器数值骰翻倍！（DB/ADB不翻倍）';
      else if (mode === '防御') output += '🛡️ 抵消15点伤害';
      else if (mode === '干扰') output += '🌀 干扰附带攻击效果（不含DB/ADB）';
    }
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['功法'] = cmdMartial;

  // 5.11 .战斗 命令
  var cmdBattle = seal.ext.newCmdItemInfo();
  cmdBattle.name = '战斗';
  cmdBattle.help = '⚔️ .战斗 on/off — 战斗状态管理\n\n.战斗 on  — 开启战斗，显示DEX供KP排列行动顺序\n.战斗 off — 结束战斗';
  cmdBattle.solve = function(ctx, msg, cmdArgs) {
    var action = cmdArgs.getArgN(1);
    if (action === 'on') {
      var meta = getMeta(ctx);
      meta.combatActive = true;
      setMeta(ctx, meta);
      var output = '⚔️ 战斗开始\n━━━━━━━━━━━━━━━\n';
      output += '行动顺序请KP根据DEX手动排列\n';
      output += ctx.player.name + ' DEX:' + getInt(ctx, '敏捷', 0) + '\n';
      output += '━━━━━━━━━━━━━━━\n提示：使用 .攻击 <技能> 发起攻击';
      seal.replyToSender(ctx, msg, output);
    } else if (action === 'off') {
      var meta2 = getMeta(ctx);
      meta2.combatActive = false;
      setMeta(ctx, meta2);
      seal.replyToSender(ctx, msg, '⚔️ 战斗结束');
    } else {
      seal.replyToSender(ctx, msg, '用法: .战斗 on/off');
    }
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['战斗'] = cmdBattle;

  // 5.12 .状态 命令
  var cmdStatus = seal.ext.newCmdItemInfo();
  cmdStatus.name = '状态';
  cmdStatus.help = '📊 .状态 — 查看角色状态\n\n显示：灵根/职业/境界 + HP/PP血条 + 灵气 + DB/ADB/护甲 + 状态标记';
  cmdStatus.solve = function(ctx, msg, cmdArgs) {
    var hp = getInt(ctx, 'HP', 0);
    var maxHp = getInt(ctx, '最大HP', 0);
    var pp = getInt(ctx, 'PP', 0);
    var maxPp = getInt(ctx, '最大PP', 0);
    var qi = getInt(ctx, '灵气', 0);
    var db = getStr(ctx, 'DB', '0');
    var adb = getStr(ctx, 'ADB', '0');
    var armor = getInt(ctx, '护甲', 0);
    var markers = getMarkers(ctx);

    function bar(cur, max, len) {
      len = len || 10;
      var filled = max > 0 ? Math.round(cur / max * len) : 0;
      filled = Math.max(0, Math.min(filled, len));
      var result = '';
      for (var i = 0; i < filled; i++) result += '█';
      for (var j = filled; j < len; j++) result += '░';
      return result;
    }

    var output = '📊 角色状态\n━━━━━━━━━━━━━━━\n';
    output += ctx.player.name + ' | ' + getStr(ctx, '灵根', '无') + '灵根 | ';
    output += getStr(ctx, '职业', '无') + ' | ' + getStr(ctx, '境界', '炼气') + '\n';
    output += '━━━━━━━━━━━━━━━\n';
    output += 'HP:  ' + hp + '/' + maxHp + '  ' + bar(hp, maxHp) + '\n';
    output += 'PP:  ' + pp + '/' + maxPp + '  ' + bar(pp, maxPp) + '\n';
    output += '灵气: ' + qi + '\n';
    output += '━━━━━━━━━━━━━━━\n';
    output += 'DB: ' + db + ' | ADB: ' + adb + ' | 护甲: ' + armor;
    if (markers.length > 0) {
      var markerStr = '';
      for (var mi = 0; mi < markers.length; mi++) markerStr += '<' + markers[mi] + '> ';
      output += '\n━━━━━━━━━━━━━━━\n状态标记：' + markerStr.trim();
    }
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['状态'] = cmdStatus;

  // 5.13 .灵气 命令
  var cmdQi = seal.ext.newCmdItemInfo();
  cmdQi.name = '灵气';
  cmdQi.help = '💨 .灵气 <+/-数值> — 灵气增减\n\n灵气影响：ADB附加（灵气>HP时才能加ADB）、PP上限(PP=灵气/5)。\n灵气低于HP：攻击不再附加ADB\n灵气归零：需意志检定判断是否昏迷\n\n例：.灵气 -5  .灵气 +10';
  cmdQi.solve = function(ctx, msg, cmdArgs) {
    var val = cmdArgs.getArgN(1);
    if (!val) {
      seal.replyToSender(ctx, msg, '用法: .灵气 <+/-数值>');
      return seal.ext.newCmdExecuteResult(true);
    }
    var num = Number(val);
    if (isNaN(num)) {
      seal.replyToSender(ctx, msg, '⚠️ 请输入数值');
      return seal.ext.newCmdExecuteResult(true);
    }
    var newQi = modInt(ctx, '灵气', num);
    var hp = getInt(ctx, 'HP', 0);
    var output = '灵气：' + newQi;
    if (newQi < hp) output += '\n⚠️ 灵气低于HP，攻击不再附加ADB';
    if (newQi <= 0) output += '\n⚠️ 灵气耗尽，需进行意志检定判断是否昏迷';
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['灵气'] = cmdQi;

  // 5.14 .hp 命令
  var cmdHp = seal.ext.newCmdItemInfo();
  cmdHp.name = 'hp';
  cmdHp.help = '💓 .hp <+/-数值> — HP增减\n\nHP≤0：昏迷(1D6轮)\nHP≤-体质：角色死亡\n\n例：.hp -12  .hp +5';
  cmdHp.solve = function(ctx, msg, cmdArgs) {
    var val = cmdArgs.getArgN(1) || '0';
    var num = Number(val);
    var newHp = modInt(ctx, 'HP', num);
    var con = getInt(ctx, '体质', 0);
    var output = 'HP：' + newHp;
    if (newHp <= 0 && newHp > -con) output += '\n⚠️ 角色昏迷，持续1D6轮';
    if (newHp <= -con) output += '\n💀 角色死亡';
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['hp'] = cmdHp;

  // 5.15 .标记 / .成长标记 / .成长
  var cmdMarker = seal.ext.newCmdItemInfo();
  cmdMarker.name = '标记';
  cmdMarker.help = '🏷️ .标记 <+名称/-名称> — 状态标记管理\n\n添加或移除状态标记（中毒、流血、眩晕等）。\n操作后显示当前全部标记。\n\n例：.标记 +中毒  .标记 -中毒';
  cmdMarker.solve = function(ctx, msg, cmdArgs) {
    var action = cmdArgs.getArgN(1);
    if (!action) {
      seal.replyToSender(ctx, msg, '用法: .标记 <+名称> 或 .标记 -名称');
      return seal.ext.newCmdExecuteResult(true);
    }
    var markers = getMarkers(ctx);
    if (action.startsWith('+')) {
      markers.push(action.substring(1));
    } else if (action.startsWith('-')) {
      var removeName = action.substring(1);
      markers = markers.filter(function(m) { return m !== removeName; });
    }
    setMarkers(ctx, markers);
    var markerStr = markers.length > 0 ? markers.map(function(m) { return '<' + m + '>'; }).join(' | ') : '无';
    seal.replyToSender(ctx, msg, '当前状态标记：' + markerStr);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['标记'] = cmdMarker;

  var cmdGrowthMark = seal.ext.newCmdItemInfo();
  cmdGrowthMark.name = '成长标记';
  cmdGrowthMark.help = '📈 .成长标记 — 查看可成长技能\n.成长标记 清空 — 清空所有成长标记\n\n特殊成功和大成功会自动获得成长标记，标记后可用.成长检定提升技能。';
  cmdGrowthMark.solve = function(ctx, msg, cmdArgs) {
    var subCmd = cmdArgs.getArgN(1);
    var meta = getMeta(ctx);
    if (subCmd === '清空') {
      meta.growthMarks = {};
      setMeta(ctx, meta);
      seal.replyToSender(ctx, msg, '✓ 成长标记已清空');
      return seal.ext.newCmdExecuteResult(true);
    }
    var marks = meta.growthMarks || {};
    var keys = Object.keys(marks);
    if (keys.length === 0) {
      seal.replyToSender(ctx, msg, '当前无可成长技能');
    } else {
      var output = '📈 可成长技能\n━━━━━━━━━━━━━━━\n';
      for (var i = 0; i < keys.length; i++) {
        output += '✓ ' + keys[i] + ' — ' + marks[keys[i]] + '\n';
      }
      output += '━━━━━━━━━━━━━━━\n使用 .成长 <技能名> 进行成长检定';
      seal.replyToSender(ctx, msg, output);
    }
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['成长标记'] = cmdGrowthMark;

  var cmdGrow = seal.ext.newCmdItemInfo();
  cmdGrow.name = '成长';
  cmdGrow.help = '📈 .成长 <技能名> — 成长检定\n\n掷1D100，出目>技能值则成长成功，技能+1D10。\n仅标记了成长标记的技能建议进行成长检定。\n\n例：.成长 闪避  .成长 战斗:器';
  cmdGrow.solve = function(ctx, msg, cmdArgs) {
    var skillName = cmdArgs.getArgN(1);
    if (!skillName) {
      seal.replyToSender(ctx, msg, '用法: .成长 <技能名>');
      return seal.ext.newCmdExecuteResult(true);
    }
    var resolvedSkill = resolveAttrName(skillName);
    var skillValue = getInt(ctx, resolvedSkill, -1);
    if (skillValue < 0 && SKILL_DEFAULTS.hasOwnProperty(resolvedSkill)) {
      skillValue = SKILL_DEFAULTS[resolvedSkill];
    }
    if (skillValue < 0) skillValue = 0;
    var rollResult = roll(ctx, '1d100');
    var bonus = roll(ctx, '1d10');
    var success = rollResult > skillValue;

    var output = '📈 成长检定\n━━━━━━━━━━━━━━━\n';
    output += '技能：' + resolvedSkill + ' (当前' + skillValue + '%)\n';
    output += '🎲 1D100 = ' + rollResult + '\n';
    output += rollResult + (success ? ' > ' : ' ≤ ') + skillValue + ' → ' + (success ? '成长成功！' : '成长失败');

    if (success) {
      var newSkill = skillValue + bonus;
      output += '\n' + resolvedSkill + ' +' + bonus + ' → ' + newSkill + '%';
      setInt(ctx, resolvedSkill, newSkill);
      var meta = getMeta(ctx);
      if (meta.growthMarks) delete meta.growthMarks[resolvedSkill];
      setMeta(ctx, meta);
    }
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['成长'] = cmdGrow;

  // .武器删除 命令
  var cmdWeaponDel = seal.ext.newCmdItemInfo();
  cmdWeaponDel.name = '武器删除';
  cmdWeaponDel.help = '⚔️ .武器删除 <武器名> — 删除角色武器\n\n从角色卡中移除指定武器。\n\n例：.武器删除 本命剑\n别名：.武器移除';
  cmdWeaponDel.solve = function(ctx, msg, cmdArgs) {
    var wName = cmdArgs.getArgN(1);
    if (!wName) {
      seal.replyToSender(ctx, msg, '用法: .武器删除 <武器名>\n使用 .st 查看 当前武器列表');
      return seal.ext.newCmdExecuteResult(true);
    }
    var meta = getMeta(ctx);
    if (!meta.weapons || !meta.weapons[wName]) {
      var wKeys = meta.weapons ? Object.keys(meta.weapons) : [];
      if (wKeys.length === 0) {
        seal.replyToSender(ctx, msg, '⚠️ 当前没有录入任何武器');
      } else {
        seal.replyToSender(ctx, msg, '⚠️ 未找到武器: ' + wName + '\n已有武器：' + wKeys.join('、'));
      }
      return seal.ext.newCmdExecuteResult(true);
    }
    var removedFormula = meta.weapons[wName];
    delete meta.weapons[wName];
    setMeta(ctx, meta);
    seal.replyToSender(ctx, msg, '✓ 已删除武器：' + wName + ' (' + removedFormula + ')');
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['武器删除'] = cmdWeaponDel;
  ext.cmdMap['武器移除'] = cmdWeaponDel;

  // 5.16 .法术学习 / .法术列表
  var cmdLearnSpell = seal.ext.newCmdItemInfo();
  cmdLearnSpell.name = '法术学习';
  cmdLearnSpell.help = '📜 .法术学习 <法术名> [品阶] — 学习法术\n\n学习预置法术或22种职业法术。\n职业法术品阶需指定：天(7点)/地(5点)/玄(3点)/黄(1点)\n被动法术不占用法术点。\n\n例：.法术学习 摧枯拉朽\n例：.法术学习 兵戈 黄\n例：.法术学习 蛊术 玄';
  cmdLearnSpell.solve = function(ctx, msg, cmdArgs) {
    var spellName = cmdArgs.getArgN(1);
    var grade = cmdArgs.getArgN(2);
    if (!spellName) {
      seal.replyToSender(ctx, msg, '用法: .法术学习 <法术名> [品阶]');
      return seal.ext.newCmdExecuteResult(true);
    }
    if (!PRESET_SPELLS[spellName]) {
      seal.replyToSender(ctx, msg, '⚠️ 未找到法术: ' + spellName + '\n自创法术请使用 .法术创建');
      return seal.ext.newCmdExecuteResult(true);
    }

    var preset = PRESET_SPELLS[spellName];
    var spellData = getSpells(ctx);

    var finalGrade = preset.grade;
    if (finalGrade === '自定义') {
      if (!grade || !GRADE_COST[grade]) {
        seal.replyToSender(ctx, msg, '请指定品阶：.法术学习 ' + spellName + ' <天/地/玄/黄>');
        return seal.ext.newCmdExecuteResult(true);
      }
      finalGrade = grade;
    }

    var cost = GRADE_COST[finalGrade] || 0;
    var isPassive = preset.time === '被动';

    if (!isPassive) {
      var totalPts = calcSpellPts(getStr(ctx, '境界', '炼气'));
      if (spellData.pointsUsed + cost > totalPts) {
        seal.replyToSender(ctx, msg, '⚠️ 法术点不足（当前已用' + spellData.pointsUsed + '/' + totalPts + '，需要' + cost + '点）');
        return seal.ext.newCmdExecuteResult(true);
      }
      spellData.pointsUsed += cost;
    }

    spellData.list.push({ name: spellName, grade: finalGrade, cost: preset.cost, time: preset.time, limit: preset.limit, desc: preset.desc });
    setSpells(ctx, spellData);

    var output = '✓ 学习法术：' + spellName + '（' + finalGrade + '阶）\n';
    output += '消耗：' + preset.cost + ' | 时间：' + preset.time + '\n';
    output += '效果：' + (preset.desc || '无') + '\n';
    if (!isPassive) {
      output += '法术点：' + spellData.pointsUsed + '/' + calcSpellPts(getStr(ctx, '境界', '炼气'));
    } else {
      output += '（被动法术，不占用法术点）';
    }
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['法术学习'] = cmdLearnSpell;

  var cmdSpellList = seal.ext.newCmdItemInfo();
  cmdSpellList.name = '法术列表';
  cmdSpellList.help = '📜 .法术列表 — 查看已学法术\n\n显示每个法术的品阶、消耗、施放时间，以及法术点使用情况。';
  cmdSpellList.solve = function(ctx, msg, cmdArgs) {
    var spellData = getSpells(ctx);
    if (spellData.list.length === 0) {
      seal.replyToSender(ctx, msg, '尚未学习任何法术');
      return seal.ext.newCmdExecuteResult(true);
    }
    var output = '📜 已学法术\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    for (var i = 0; i < spellData.list.length; i++) {
      var s = spellData.list[i];
      output += '[' + s.grade + '] ' + s.name + ' | ' + s.cost + ' | ' + s.time + '\n';
    }
    var totalPts = calcSpellPts(getStr(ctx, '境界', '炼气'));
    output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n法术点：' + totalPts + '中已用' + spellData.pointsUsed + '，剩余' + (totalPts - spellData.pointsUsed);
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['法术列表'] = cmdSpellList;

  // .法术创建 命令
  var cmdCreateSpell = seal.ext.newCmdItemInfo();
  cmdCreateSpell.name = '法术创建';
  cmdCreateSpell.help = '📜 .法术创建 <名称> <品阶> [消耗] [时间] [效果] — 创建自创法术\n\n品阶必填：天(7点)/地(5点)/玄(3点)/黄(1点)/不入流(0点)\n消耗可选：如 5PP / 10灵气 / 5PP/20灵气（默认"按设定"）\n时间可选：即时/短时/长时/被动（默认"即时"）\n效果可选：剩余文本作为效果描述（默认"自定义法术"）\n\n例：.法术创建 火球术 玄 5PP 即时 向目标投掷火球\n例：.法术创建 护盾 黄 3PP 短时 形成灵气护盾\n例：.法术创建 被动天赋 不入流 被动 某种被动效果';
  cmdCreateSpell.solve = function(ctx, msg, cmdArgs) {
    var spellName = cmdArgs.getArgN(1);
    var grade = cmdArgs.getArgN(2);
    if (!spellName || !grade) {
      seal.replyToSender(ctx, msg, '用法: .法术创建 <名称> <品阶> [消耗] [时间] [效果]\n品阶：天/地/玄/黄/不入流\n例：.法术创建 火球术 玄 5PP 即时 向目标投掷火球');
      return seal.ext.newCmdExecuteResult(true);
    }
    if (!GRADE_COST.hasOwnProperty(grade)) {
      seal.replyToSender(ctx, msg, '⚠️ 无效品阶: ' + grade + '\n可选：天(7点)/地(5点)/玄(3点)/黄(1点)/不入流(0点)');
      return seal.ext.newCmdExecuteResult(true);
    }

    var spellData = getSpells(ctx);
    for (var ci = 0; ci < spellData.list.length; ci++) {
      if (spellData.list[ci].name === spellName) {
        seal.replyToSender(ctx, msg, '⚠️ 已存在同名法术: ' + spellName);
        return seal.ext.newCmdExecuteResult(true);
      }
    }

    var cost = cmdArgs.getArgN(3) || '按设定';
    var time = cmdArgs.getArgN(4) || '即时';
    var validTimes = ['即时', '短时', '长时', '被动'];
    // 如果第4个参数不是有效时间，可能是效果描述的一部分
    if (validTimes.indexOf(time) < 0) {
      time = '即时';
      cost = cmdArgs.getArgN(3) || '按设定';
    }
    // 效果描述：取剩余文本
    var restArgs = cmdArgs.getRestArgsFrom(1).split(/\s+/);
    var descStart = 2; // 跳过名称和品阶
    if (restArgs.length > 2 && restArgs[2] && restArgs[2] !== '按设定') descStart = 3; // 跳过消耗
    if (time !== '即时' || restArgs.length > 3) {
      if (restArgs.length > 3 && validTimes.indexOf(restArgs[3]) >= 0) descStart = 4; // 跳过时间
    }
    var desc = restArgs.slice(descStart).join(' ') || '自定义法术';

    var isPassive = time === '被动';
    var gradeCost = GRADE_COST[grade] || 0;
    if (!isPassive) {
      var totalPts = calcSpellPts(getStr(ctx, '境界', '炼气'));
      if (spellData.pointsUsed + gradeCost > totalPts) {
        seal.replyToSender(ctx, msg, '⚠️ 法术点不足（当前已用' + spellData.pointsUsed + '/' + totalPts + '，需要' + gradeCost + '点）');
        return seal.ext.newCmdExecuteResult(true);
      }
      spellData.pointsUsed += gradeCost;
    }

    spellData.list.push({ name: spellName, grade: grade, cost: cost, time: time, desc: desc, custom: true });
    setSpells(ctx, spellData);

    var output = '✓ 创建法术：' + spellName + '（' + grade + '阶·' + time + '）\n';
    output += '消耗：' + cost + '\n';
    output += '效果：' + desc + '\n';
    if (!isPassive) {
      output += '法术点：' + spellData.pointsUsed + '/' + calcSpellPts(getStr(ctx, '境界', '炼气'));
    } else {
      output += '（被动法术，不占用法术点）';
    }
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['法术创建'] = cmdCreateSpell;

  // .法术删除 命令
  var cmdDeleteSpell = seal.ext.newCmdItemInfo();
  cmdDeleteSpell.name = '法术删除';
  cmdDeleteSpell.help = '📜 .法术删除 <法术名> — 遗忘已学法术\n\n删除指定法术并退还法术点（被动法术不退还）。\n\n例：.法术删除 火球术\n别名：.法术遗忘';
  cmdDeleteSpell.solve = function(ctx, msg, cmdArgs) {
    var spellName = cmdArgs.getArgN(1);
    if (!spellName) {
      seal.replyToSender(ctx, msg, '用法: .法术删除 <法术名>');
      return seal.ext.newCmdExecuteResult(true);
    }
    var spellData = getSpells(ctx);
    var foundIdx = -1;
    for (var di = 0; di < spellData.list.length; di++) {
      if (spellData.list[di].name === spellName) {
        foundIdx = di;
        break;
      }
    }
    if (foundIdx < 0) {
      seal.replyToSender(ctx, msg, '⚠️ 未学会此法术: ' + spellName);
      return seal.ext.newCmdExecuteResult(true);
    }
    var removed = spellData.list.splice(foundIdx, 1)[0];
    var isPassive = removed.time === '被动';
    if (!isPassive) {
      var refund = GRADE_COST[removed.grade] || 0;
      spellData.pointsUsed = Math.max(spellData.pointsUsed - refund, 0);
    }
    setSpells(ctx, spellData);
    var totalPts = calcSpellPts(getStr(ctx, '境界', '炼气'));
    var outDel = '✓ 遗忘法术：' + removed.name + '（' + removed.grade + '阶）\n';
    if (isPassive) {
      outDel += '（被动法术，不退还法术点）\n';
    } else {
      outDel += '已退还 ' + (GRADE_COST[removed.grade] || 0) + ' 点法术点\n';
    }
    outDel += '法术点：' + totalPts + '中已用' + spellData.pointsUsed + '，剩余' + (totalPts - spellData.pointsUsed);
    seal.replyToSender(ctx, msg, outDel);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['法术删除'] = cmdDeleteSpell;
  ext.cmdMap['法术遗忘'] = cmdDeleteSpell;

  // 5.17 .回复 / .制卡 / 速查命令
  var cmdRecover = seal.ext.newCmdItemInfo();
  cmdRecover.name = '回复';
  cmdRecover.help = '💨 .回复 [休息/行动/修炼] — 灵气回复规则查询\n\n· 休息：每半个时辰回复1点PP\n· 行动：每时辰回复2点PP\n· 修炼：不回复PP\n\n查询后需手动执行 .灵气 +<数值>';
  cmdRecover.solve = function(ctx, msg, cmdArgs) {
    var mode = cmdArgs.getArgN(1);
    var pp = getInt(ctx, 'PP', 0);
    var maxPp = getInt(ctx, '最大PP', 0);
    var output = '📖 灵气回复规则（' + (mode || '总览') + '）\n━━━━━━━━━━━━━━━\n';
    if (mode === '休息') output += '· 休息时每半个时辰回复1点PP\n· 当前PP：' + pp + '/' + maxPp;
    else if (mode === '行动') output += '· 行动时每时辰回复2点PP\n· 当前PP：' + pp + '/' + maxPp;
    else if (mode === '修炼') output += '· 修炼时不回复PP';
    else output += '· 休息：每半个时辰+1PP\n· 行动：每时辰+2PP\n· 修炼：不回复PP';
    output += '\n━━━━━━━━━━━━━━━\n请手动执行：.灵气 +<数值>';
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['回复'] = cmdRecover;

  var cmdCreate = seal.ext.newCmdItemInfo();
  cmdCreate.name = '制卡';
  cmdCreate.help = '🎲 .制卡 — 引导式制卡\n\n一次完成：投掷7项属性+气运+灵气 + 掷1D8个人特点+1D20额外经历。\n完成后请在Excel角色卡中选择灵根/种族/境界/职业/技能/法术，再用.st录入。';
  cmdCreate.solve = function(ctx, msg, cmdArgs) {
    var output = '🎲 餐云卧石制卡\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    var attrExprs = [['力量','3d6*5'],['体质','3d6*5'],['体型','2d6*5+30'],['智力','2d6*5+30'],['意志','3d6*5'],['敏捷','3d6*5'],['外貌','3d6*5']];
    for (var i = 0; i < attrExprs.length; i++) {
      output += attrExprs[i][0] + ':' + roll(ctx, attrExprs[i][1]) + ' ';
    }
    output += '\n气运:' + roll(ctx, '3d6*5') + ' 灵气:' + roll(ctx, '2d6*5+30') + '\n';
    var trait1 = roll(ctx, '1d8');
    var trait2 = roll(ctx, '1d20');
    output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    output += '🎲 个人特点 (1D8 = ' + trait1 + ')\n→ ' + TRAITS_PERSONAL[trait1 - 1] + '\n';
    output += '🎲 额外经历 (1D20 = ' + trait2 + ')\n→ ' + TRAITS_EXPERIENCE[trait2 - 1] + '\n';
    output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n请在Excel角色卡中完成灵根/种族/境界/职业/技能/法术的选择\n完成后用 .st 录入';
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['制卡'] = cmdCreate;

  // 速查命令工厂
  function makeQueryCmd(name, helpText, solveFn) {
    var cmd = seal.ext.newCmdItemInfo();
    cmd.name = name;
    cmd.help = helpText;
    cmd.solve = function(ctx, msg, cmdArgs) {
      return solveFn(ctx, msg, cmdArgs);
    };
    ext.cmdMap[name] = cmd;
  }

  makeQueryCmd('灵根查询', '📖 .灵根查询 <名称> — 查询灵根属性加成和特殊能力\n\n13种灵根：金/木/水/火/土（五行）\n音/花/幻/电/幽冥（变异灵根）\n血/毒/气（魔修灵根）\n\n例：.灵根查询 金  .灵根查询 音  .灵根查询 血', function(ctx, msg, cmdArgs) {
    var qname = cmdArgs.getArgN(1);
    var info = SPIRIT_ROOTS[qname];
    if (!info) {
      seal.replyToSender(ctx, msg, '未找到灵根: ' + qname + '\n可选：金/木/水/火/土/音/花/幻/电/幽冥/血/毒/气');
      return seal.ext.newCmdExecuteResult(true);
    }
    var output = '灵根：' + qname + '\n━━━━━━━━━━━━━━━\n';
    if (info.stat) output += '属性加成：' + info.stat + '+' + info.bonus + '\n';
    if (info.isVariant) output += '变异灵根（' + info.parent + '之变异）\n';
    if (info.isDemonic) output += '魔修灵根\n';
    output += '能力：' + info.desc;
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  });

  makeQueryCmd('境界查询', '📖 .境界查询 <名称> — 查询境界ADB和法术点\n\n6种境界：炼气/筑基/金丹/元婴/化神/大乘\n\n例：.境界查询 筑基  .境界查询 金丹', function(ctx, msg, cmdArgs) {
    var qname = cmdArgs.getArgN(1);
    var info = REALMS[qname];
    if (!info) {
      seal.replyToSender(ctx, msg, '未找到境界: ' + qname + '\n可选：炼气/筑基/金丹/元婴/化神/大乘');
      return seal.ext.newCmdExecuteResult(true);
    }
    seal.replyToSender(ctx, msg, '境界：' + qname + '\nADB：+' + info.adb + '\n法术点：' + info.spellPts);
    return seal.ext.newCmdExecuteResult(true);
  });

  makeQueryCmd('种族查询', '📖 .种族查询 <名称> — 查询种族加成和特殊规则\n\n9种种族：人族/鲛人/羽民/半妖/鬼魂/鬼修/妖/怪/灵\n\n例：.种族查询 鬼修  .种族查询 妖', function(ctx, msg, cmdArgs) {
    var qname = cmdArgs.getArgN(1);
    var info = RACES[qname];
    if (!info) {
      seal.replyToSender(ctx, msg, '未找到种族: ' + qname + '\n可选：人族/鲛人/羽民/半妖/鬼魂/鬼修/妖/怪/灵');
      return seal.ext.newCmdExecuteResult(true);
    }
    var output = '种族：' + qname + '\n━━━━━━━━━━━━━━━\n';
    if (info.bonuses) {
      for (var k in info.bonuses) {
        if (info.bonuses.hasOwnProperty(k)) output += k + '+' + info.bonuses[k] + '\n';
      }
    }
    if (info.special) output += '特殊：' + info.special;
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  });

  makeQueryCmd('职业查询', '📖 .职业查询 <名称> — 查询职业适配灵根、技能和法术\n\n22种职业：蛊师/吊魂师/活无常/医修/偃师/丹青师/兵修/乐师/铸器师/符师/阵师/御兽师/蜃师/仙商/灵植师/灵厨/游方道人/合欢道人/毒修/血修/摄魂鬼/告死人\n\n例：.职业查询 兵修  .职业查询 蛊师', function(ctx, msg, cmdArgs) {
    var qname = cmdArgs.getArgN(1);
    var info = PROFESSIONS[qname];
    if (!info) {
      var profList = Object.keys(PROFESSIONS).join('、');
      seal.replyToSender(ctx, msg, '未找到职业: ' + qname + '\n可选：' + profList);
      return seal.ext.newCmdExecuteResult(true);
    }
    var output = '职业：' + qname + '（' + info.category + '属）\n━━━━━━━━━━━━━━━\n';
    output += '适配灵根：' + info.spiritRoots.join('/') + '\n';
    output += '职业技能：' + info.skills.join('、') + '\n';
    if (info.extraCombat) output += '额外战斗技能：' + info.extraCombat + '项\n';
    if (info.freeSkill) output += '自由技能点：' + info.freeSkill + '\n';
    output += '职业法术：' + info.spell.name + '（' + info.spell.time + '）';
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
  });

  // 5.19 .npc 命令（KP NPC管理）
  var cmdNpc = seal.ext.newCmdItemInfo();
  cmdNpc.name = 'npc';
  cmdNpc.help = '🎭 .npc — NPC管理（KP专用）\n\n创建和管理NPC，无需切换角色卡即可为NPC检定/攻击/受伤。\n\n创建/更新：.npc add <名称> <属性值...>\n  例：.npc add 小兵A 力量50 体质40 闪避30 HP10 最大HP10 护甲2\n  DB/ADB等用=号：.npc add BossA 力量80 体型70 HP20 DB=+1D6 ADB=2D4\n\n检定：.npc <名称> ra <技能> [数值]\n  例：.npc 小兵A ra 闪避\n  例：.npc 小兵A ra 闪避 30（手动指定技能值）\n\n攻击：.npc <名称> 攻击 [技能] [数值]\n  例：.npc 小兵A 攻击 战斗:体\n\n受伤：.npc <名称> 受伤 <数值>\n  例：.npc 小兵A 受伤 8\n\nHP：.npc <名称> hp <+/-数值>\n灵气：.npc <名称> 灵气 <+/-数值>\n武器添加：.npc <名称> 武器 <武器名> <公式>\n  例：.npc 小兵A 武器 大刀 1d8+1d4\n武器删除：.npc <名称> 武器 del <武器名>\n  例：.npc 小兵A 武器 del 大刀\n\n查看：.npc <名称> st\n标记：.npc <名称> 标记 <+名称/-名称>\n删除：.npc <名称> del\n列表：.npc list\n清空：.npc clear\n帮助：.npc help';
  cmdNpc.solve = function(ctx, msg, cmdArgs) {
    var text = cmdArgs.getRestArgsFrom(1);
    if (!text || text.trim() === '') {
      seal.replyToSender(ctx, msg, cmdNpc.help);
      return seal.ext.newCmdExecuteResult(true);
    }

    var tokens = text.trim().split(/\s+/);
    var first = tokens[0];

    // 全局子命令
    if (first === 'help' || first === '帮助') {
      seal.replyToSender(ctx, msg, cmdNpc.help);
      return seal.ext.newCmdExecuteResult(true);
    }

    if (first === 'list' || first === '列表') {
      var npcsL = getNpcs(ctx);
      var namesL = Object.keys(npcsL);
      if (namesL.length === 0) {
        seal.replyToSender(ctx, msg, '🎭 当前群无NPC');
      } else {
        var outL = '🎭 NPC列表\n━━━━━━━━━━━━━━━\n';
        for (var li = 0; li < namesL.length; li++) {
          var npcL = npcsL[namesL[li]];
          var hpL = npcL.stats['HP'] || 0;
          var maxHpL = npcL.stats['最大HP'] || hpL;
          outL += namesL[li] + ' HP:' + hpL + '/' + maxHpL;
          if (npcL.markers && npcL.markers.length > 0) {
            outL += ' ' + npcL.markers.map(function(m) { return '<' + m + '>'; }).join('');
          }
          outL += '\n';
        }
        seal.replyToSender(ctx, msg, outL);
      }
      return seal.ext.newCmdExecuteResult(true);
    }

    if (first === 'clear' || first === '清空') {
      setNpcs(ctx, {});
      seal.replyToSender(ctx, msg, '✓ 已清空所有NPC');
      return seal.ext.newCmdExecuteResult(true);
    }

    // add 子命令
    if (first === 'add' || first === '添加') {
      if (tokens.length < 2) {
        seal.replyToSender(ctx, msg, '用法: .npc add <名称> <属性值...>\n例: .npc add 小兵A 力量50 体质40 闪避30 HP10 护甲2');
        return seal.ext.newCmdExecuteResult(true);
      }
      var addName = tokens[1];
      var statText = tokens.slice(2).join(' ');
      var addStats = parseNpcStats(statText);
      var npcsA = getNpcs(ctx);
      if (npcsA[addName]) {
        for (var ak in addStats) { if (addStats.hasOwnProperty(ak)) npcsA[addName].stats[ak] = addStats[ak]; }
      } else {
        npcsA[addName] = { stats: addStats, weapons: {}, markers: [] };
      }
      setNpcs(ctx, npcsA);
      var outA = '✓ NPC已' + (npcsA[addName] ? '更新' : '创建') + '：' + addName + '\n━━━━━━━━━━━━━━━\n';
      var statKeys = Object.keys(addStats);
      for (var si = 0; si < statKeys.length; si++) {
        outA += statKeys[si] + ':' + addStats[statKeys[si]] + ' ';
        if ((si + 1) % 5 === 0) outA += '\n';
      }
      seal.replyToSender(ctx, msg, outA);
      return seal.ext.newCmdExecuteResult(true);
    }

    // NPC名称 + 动作
    var npcName = first;
    var action = tokens[1];
    var npcs = getNpcs(ctx);
    var npc = npcs[npcName];

    if (!npc) {
      seal.replyToSender(ctx, msg, '⚠️ 未找到NPC: ' + npcName + '\n使用 .npc add ' + npcName + ' <属性值...> 创建');
      return seal.ext.newCmdExecuteResult(true);
    }

    if (!action) action = 'st';

    // --- NPC技能检定 ---
    if (action === 'ra') {
      var raSkill = tokens[2] || '';
      var raManual = tokens[3] ? parseInt(tokens[3], 10) : NaN;
      if (!raSkill) {
        seal.replyToSender(ctx, msg, '用法: .npc ' + npcName + ' ra <技能> [数值]');
        return seal.ext.newCmdExecuteResult(true);
      }
      var raResolved = resolveAttrName(raSkill);
      var raValue = raManual;
      var raIsManual = false;
      if (isNaN(raValue)) {
        raValue = npc.stats[raResolved];
        if (raValue === undefined) raValue = npc.stats[raSkill];
        if (raValue === undefined && SKILL_DEFAULTS.hasOwnProperty(raResolved)) raValue = SKILL_DEFAULTS[raResolved];
        if (raValue === undefined) raValue = 0;
      } else {
        raIsManual = true;
      }
      var raRoll = roll(ctx, '1d100');
      var raJudge = judgeSuccess(raRoll, raValue);
      var raHard = Math.floor(raValue / 2);
      var raSpecial = Math.floor(raValue / 5);
      var raEmoji = { '大成功': '✨', '特殊成功': '✨', '困难成功': '✅', '成功': '✅', '失败': '❌', '大失败': '💀' };
      var outRa = '🎲 NPC技能检定\n━━━━━━━━━━━━━━━\n';
      outRa += 'NPC：' + npcName + '\n';
      outRa += '技能：' + raResolved + ' (' + raValue + '%)' + (raIsManual ? ' [手动]' : '') + '\n';
      outRa += '成功/困难/特殊：' + raValue + '/' + raHard + '/' + raSpecial + '\n';
      outRa += '━━━━━━━━━━━━━━━\n';
      outRa += '🎲 1D100 = ' + raRoll + '\n';
      outRa += (raEmoji[raJudge.level] || '') + ' ' + raJudge.level;
      seal.replyToSender(ctx, msg, outRa);
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC攻击 ---
    if (action === '攻击') {
      var atkSkill = tokens[2] || '战斗:体';
      var atkManual = tokens[3] ? parseInt(tokens[3], 10) : NaN;
      var atkResolved = resolveAttrName(atkSkill);
      var atkValue, atkIsManual;
      if (!isNaN(atkManual)) {
        atkValue = atkManual;
        atkIsManual = true;
      } else {
        atkValue = npc.stats[atkResolved];
        if (atkValue === undefined) atkValue = npc.stats[atkSkill];
        if (atkValue === undefined && SKILL_DEFAULTS.hasOwnProperty(atkResolved)) atkValue = SKILL_DEFAULTS[atkResolved];
        if (atkValue === undefined) atkValue = 0;
        atkIsManual = false;
      }
      var atkRoll = roll(ctx, '1d100');
      var atkJudge = judgeSuccess(atkRoll, atkValue);
      var outAtk = '⚔️ NPC攻击检定\n━━━━━━━━━━━━━━━\n';
      outAtk += 'NPC：' + npcName + ' | 技能：' + atkResolved + ' (' + atkValue + '%)' + (atkIsManual ? ' [手动]' : '') + '\n';
      outAtk += '🎲 1D100 = ' + atkRoll + ' → ' + atkJudge.level + '\n';

      if (atkJudge.level === '失败' || atkJudge.level === '大失败') {
        outAtk += '━━━━━━━━━━━━━━━\n攻击未命中';
        if (atkJudge.level === '大失败') outAtk += '\n💀 大失败！';
        seal.replyToSender(ctx, msg, outAtk);
        return seal.ext.newCmdExecuteResult(true);
      }

      outAtk += '━━━━━━━━━━━━━━━\n伤害计算：\n';
      var npcWeaponDmg = 0, npcWeaponDetail = '';
      var npcWeaponKeys = Object.keys(npc.weapons || {});
      var npcIsMax = (atkJudge.level === '大成功');

      if (npcWeaponKeys.length > 0) {
        var nwName = npcWeaponKeys[0];
        var nwFormula = npc.weapons[nwName];
        if (npcIsMax) {
          var nwMax = maximizeDiceExpr(nwFormula);
          npcWeaponDmg = nwMax.total;
          npcWeaponDetail = '武器[' + nwName + ']: ' + nwFormula + ' → MAX ' + nwMax.detail + ' = ' + npcWeaponDmg;
        } else {
          var nwResult = rollDetailed(ctx, nwFormula);
          npcWeaponDmg = nwResult.total;
          npcWeaponDetail = '武器[' + nwName + ']: ' + nwFormula + ' → ' + nwResult.detail + ' = ' + npcWeaponDmg;
        }
      }

      var npcDbStr = String(npc.stats['DB'] || '0');
      var npcDbDmg = 0, npcDbDetail = '';
      if (npcDbStr === '0') {
        npcDbDmg = 0; npcDbDetail = '0';
      } else if (npcIsMax) {
        var npcMaxDb = maximizeDiceExpr(npcDbStr);
        npcDbDmg = npcMaxDb.total; npcDbDetail = 'MAX ' + npcMaxDb.detail;
      } else {
        var npcDbResult = rollDetailed(ctx, npcDbStr);
        npcDbDmg = npcDbResult.total; npcDbDetail = npcDbResult.detail;
      }

      var npcQi = Number(npc.stats['灵气'] || 0);
      var npcHp = Number(npc.stats['HP'] || 0);
      var npcAdbDmg = 0, npcAdbDetail = '';
      var npcAdbOn = npcQi > npcHp;

      if (npcAdbOn) {
        var npcAdbStr = String(npc.stats['ADB'] || '0');
        if (npcAdbStr === '0') {
          npcAdbDmg = 0; npcAdbDetail = '0';
        } else {
          var npcAdbResult = rollDetailed(ctx, npcAdbStr);
          npcAdbDmg = npcAdbResult.total; npcAdbDetail = npcAdbResult.detail;
        }
      }

      if (npcWeaponDetail) outAtk += npcWeaponDetail + '\n';
      outAtk += 'DB: ' + npcDbStr + ' → ' + npcDbDetail + ' = ' + npcDbDmg + '\n';
      if (npcAdbOn) {
        outAtk += 'ADB: ' + String(npc.stats['ADB'] || '0') + ' → ' + npcAdbDetail + ' = ' + npcAdbDmg + '\n';
      }
      var npcTotalDmg = npcWeaponDmg + npcDbDmg + npcAdbDmg;
      outAtk += '━━━━━━━━━━━━━━━\n总伤害：' + npcTotalDmg;
      if (npcIsMax) outAtk += '\n✨ 大成功！武器伤害骰已取最大值';
      seal.replyToSender(ctx, msg, outAtk);
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC受伤 ---
    if (action === '受伤') {
      var hurtDmg = Number(tokens[2]);
      if (!hurtDmg) {
        seal.replyToSender(ctx, msg, '用法: .npc ' + npcName + ' 受伤 <数值>');
        return seal.ext.newCmdExecuteResult(true);
      }
      var hurtArmor = Number(npc.stats['护甲'] || 0);
      var hurtActual = Math.max(hurtDmg - hurtArmor, 0);
      var hurtOldHp = Number(npc.stats['HP'] || 0);
      npc.stats['HP'] = hurtOldHp - hurtActual;
      setNpcs(ctx, npcs);
      var outHurt = '💔 NPC受伤处理\n━━━━━━━━━━━━━━━\n';
      outHurt += 'NPC：' + npcName + '\n';
      outHurt += '原始伤害：' + hurtDmg + ' | 护甲：' + hurtArmor + ' | 实际伤害：' + hurtActual + '\n';
      outHurt += 'HP：' + hurtOldHp + ' → ' + npc.stats['HP'];
      if (npc.stats['HP'] <= 0) outHurt += '\n⚠️ NPC已倒下';
      seal.replyToSender(ctx, msg, outHurt);
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC HP增减 ---
    if (action === 'hp') {
      var hpVal = Number(tokens[2]);
      if (isNaN(hpVal)) {
        seal.replyToSender(ctx, msg, '用法: .npc ' + npcName + ' hp <+/-数值>');
        return seal.ext.newCmdExecuteResult(true);
      }
      var hpOld = Number(npc.stats['HP'] || 0);
      npc.stats['HP'] = hpOld + hpVal;
      setNpcs(ctx, npcs);
      seal.replyToSender(ctx, msg, npcName + ' HP：' + hpOld + ' → ' + npc.stats['HP']);
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC灵气增减 ---
    if (action === '灵气') {
      var qiVal = Number(tokens[2]);
      if (isNaN(qiVal)) {
        seal.replyToSender(ctx, msg, '用法: .npc ' + npcName + ' 灵气 <+/-数值>');
        return seal.ext.newCmdExecuteResult(true);
      }
      var qiOld = Number(npc.stats['灵气'] || 0);
      npc.stats['灵气'] = qiOld + qiVal;
      setNpcs(ctx, npcs);
      seal.replyToSender(ctx, msg, npcName + ' 灵气：' + qiOld + ' → ' + npc.stats['灵气']);
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC武器 ---
    if (action === '武器') {
      var wSubAction = tokens[2];
      // 武器删除
      if (wSubAction === 'del' || wSubAction === '删除') {
        var wDelName = tokens[3];
        if (!wDelName) {
          var wListNpc = npc.weapons ? Object.keys(npc.weapons) : [];
          if (wListNpc.length === 0) {
            seal.replyToSender(ctx, msg, npcName + ' 没有武器');
          } else {
            seal.replyToSender(ctx, msg, '用法: .npc ' + npcName + ' 武器 del <武器名>\n已有武器：' + wListNpc.join('、'));
          }
          return seal.ext.newCmdExecuteResult(true);
        }
        if (!npc.weapons || !npc.weapons[wDelName]) {
          var wKeysNpc = npc.weapons ? Object.keys(npc.weapons) : [];
          seal.replyToSender(ctx, msg, '⚠️ 未找到武器: ' + wDelName + '\n已有武器：' + (wKeysNpc.length > 0 ? wKeysNpc.join('、') : '无'));
          return seal.ext.newCmdExecuteResult(true);
        }
        var wRemovedFormula = npc.weapons[wDelName];
        delete npc.weapons[wDelName];
        setNpcs(ctx, npcs);
        seal.replyToSender(ctx, msg, '✓ ' + npcName + ' 已删除武器：' + wDelName + ' (' + wRemovedFormula + ')');
        return seal.ext.newCmdExecuteResult(true);
      }
      // 武器添加
      var wName = tokens[2];
      var wFormula = tokens.slice(3).join(' ');
      if (!wName || !wFormula) {
        seal.replyToSender(ctx, msg, '用法: .npc ' + npcName + ' 武器 <名称> <公式>\n删除: .npc ' + npcName + ' 武器 del <名称>\n例: .npc ' + npcName + ' 武器 大刀 1d8+1d4');
        return seal.ext.newCmdExecuteResult(true);
      }
      npc.weapons = npc.weapons || {};
      npc.weapons[wName] = wFormula;
      setNpcs(ctx, npcs);
      seal.replyToSender(ctx, msg, '✓ ' + npcName + ' 武器已设置：' + wName + ' (' + wFormula + ')');
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC查看属性 ---
    if (action === 'st' || action === '状态') {
      var outSt = '🎭 NPC：' + npcName + '\n━━━━━━━━━━━━━━━\n';
      var stKeys = Object.keys(npc.stats);
      for (var sti = 0; sti < stKeys.length; sti++) {
        outSt += stKeys[sti] + ':' + npc.stats[stKeys[sti]] + ' ';
        if ((sti + 1) % 5 === 0) outSt += '\n';
      }
      if (npc.weapons && Object.keys(npc.weapons).length > 0) {
        outSt += '\n━━━━━━━━━━━━━━━\n武器：';
        var stWKeys = Object.keys(npc.weapons);
        for (var swi = 0; swi < stWKeys.length; swi++) {
          outSt += stWKeys[swi] + '(' + npc.weapons[stWKeys[swi]] + ') ';
        }
      }
      if (npc.markers && npc.markers.length > 0) {
        outSt += '\n状态标记：' + npc.markers.map(function(m) { return '<' + m + '>'; }).join(' ');
      }
      seal.replyToSender(ctx, msg, outSt);
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC删除 ---
    if (action === 'del' || action === '删除') {
      delete npcs[npcName];
      setNpcs(ctx, npcs);
      seal.replyToSender(ctx, msg, '✓ NPC已删除：' + npcName);
      return seal.ext.newCmdExecuteResult(true);
    }

    // --- NPC标记 ---
    if (action === '标记') {
      var mkAction = tokens[2];
      if (!mkAction) {
        var mkList = npc.markers || [];
        var mkStr = mkList.length > 0 ? mkList.map(function(m) { return '<' + m + '>'; }).join(' ') : '无';
        seal.replyToSender(ctx, msg, npcName + ' 状态标记：' + mkStr);
        return seal.ext.newCmdExecuteResult(true);
      }
      npc.markers = npc.markers || [];
      if (mkAction.startsWith('+')) {
        npc.markers.push(mkAction.substring(1));
      } else if (mkAction.startsWith('-')) {
        var mkRemove = mkAction.substring(1);
        npc.markers = npc.markers.filter(function(m) { return m !== mkRemove; });
      }
      setNpcs(ctx, npcs);
      var mkStr2 = npc.markers.length > 0 ? npc.markers.map(function(m) { return '<' + m + '>'; }).join(' ') : '无';
      seal.replyToSender(ctx, msg, npcName + ' 状态标记：' + mkStr2);
      return seal.ext.newCmdExecuteResult(true);
    }

    seal.replyToSender(ctx, msg, '⚠️ 未知NPC操作: ' + action + '\n输入 .npc help 查看帮助');
    return seal.ext.newCmdExecuteResult(true);
  };
  ext.cmdMap['npc'] = cmdNpc;

} // end if (!seal.ext.find('cyws'))
