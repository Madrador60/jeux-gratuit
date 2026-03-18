const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ui = {
  appShell: document.querySelector(".app-shell"),
  viewport: document.querySelector(".viewport"),
  levelLabel: document.getElementById("levelLabel"),
  bestLevel: document.getElementById("bestLevel"),
  modeLabel: document.getElementById("modeLabel"),
  weaponLabel: document.getElementById("weaponLabel"),
  coinsLabel: document.getElementById("coinsLabel"),
  powerLabel: document.getElementById("powerLabel"),
  shieldLabel: document.getElementById("shieldLabel"),
  fps: document.getElementById("fps"),
  status: document.getElementById("statusText"),
  playerHp: document.getElementById("playerHp"),
  playerEnergy: document.getElementById("playerEnergy"),
  enemyHp: document.getElementById("enemyHp"),
  allyStat: document.getElementById("allyStat"),
  allyHp: document.getElementById("allyHp"),
  enemyTwoStat: document.getElementById("enemyTwoStat"),
  enemyTwoHp: document.getElementById("enemyTwoHp"),
  menuButton: document.getElementById("menuButton"),
  fullscreenButton: document.getElementById("fullscreenButton"),
  mobileControls: document.getElementById("mobileControls"),
  joystickShell: document.getElementById("joystickShell"),
  joystickStick: document.getElementById("joystickStick"),
  aimPad: document.getElementById("aimPad"),
  aimStick: document.getElementById("aimStick"),
  mobileDashButton: document.getElementById("mobileDashButton"),
  mobileWeaponButton: document.getElementById("mobileWeaponButton"),
  mobileMenuButton: document.getElementById("mobileMenuButton"),
  mobileFullscreenButton: document.getElementById("mobileFullscreenButton"),
  mobileLevelLabel: document.getElementById("mobileLevelLabel"),
  mobileModeLabel: document.getElementById("mobileModeLabel"),
  mobileWeaponLabel: document.getElementById("mobileWeaponLabel"),
  mobileCoinsLabel: document.getElementById("mobileCoinsLabel"),
  upgradeAttack: document.getElementById("upgradeAttack"),
  upgradeVitality: document.getElementById("upgradeVitality"),
  upgradeDash: document.getElementById("upgradeDash"),
  upgradeFire: document.getElementById("upgradeFire"),
  upgradeAttackLevel: document.getElementById("upgradeAttackLevel"),
  upgradeVitalityLevel: document.getElementById("upgradeVitalityLevel"),
  upgradeDashLevel: document.getElementById("upgradeDashLevel"),
  upgradeFireLevel: document.getElementById("upgradeFireLevel"),
  upgradeAttackCost: document.getElementById("upgradeAttackCost"),
  upgradeVitalityCost: document.getElementById("upgradeVitalityCost"),
  upgradeDashCost: document.getElementById("upgradeDashCost"),
  upgradeFireCost: document.getElementById("upgradeFireCost"),
  quickUpgradeAttack: document.getElementById("quickUpgradeAttack"),
  quickUpgradeVitality: document.getElementById("quickUpgradeVitality"),
  quickUpgradeDash: document.getElementById("quickUpgradeDash"),
  quickUpgradeFire: document.getElementById("quickUpgradeFire"),
  quickUpgradeAttackLevel: document.getElementById("quickUpgradeAttackLevel"),
  quickUpgradeVitalityLevel: document.getElementById("quickUpgradeVitalityLevel"),
  quickUpgradeDashLevel: document.getElementById("quickUpgradeDashLevel"),
  quickUpgradeFireLevel: document.getElementById("quickUpgradeFireLevel"),
  quickUpgradeAttackCost: document.getElementById("quickUpgradeAttackCost"),
  quickUpgradeVitalityCost: document.getElementById("quickUpgradeVitalityCost"),
  quickUpgradeDashCost: document.getElementById("quickUpgradeDashCost"),
  quickUpgradeFireCost: document.getElementById("quickUpgradeFireCost"),
  rotateNotice: document.getElementById("rotateNotice"),
  rotateFullscreenButton: document.getElementById("rotateFullscreenButton"),
  rotateDismissButton: document.getElementById("rotateDismissButton"),
  hubOverlay: document.getElementById("hubOverlay"),
  closeHubButton: document.getElementById("closeHubButton"),
  tabButtons: [...document.querySelectorAll(".tab-button")],
  tabPanels: [...document.querySelectorAll(".tab-panel")],
  shortcutTabButtons: [...document.querySelectorAll("[data-open-tab]")],
  interfaceChoices: [...document.querySelectorAll("[data-interface]")],
  modeChoices: [...document.querySelectorAll("[data-mode]")],
  weaponChoices: [...document.querySelectorAll("[data-weapon]")],
  startButton: document.getElementById("startButton"),
  shopGrid: document.getElementById("shopGrid"),
  shopHint: document.getElementById("shopHint"),
  shopCoinsTotal: document.getElementById("shopCoinsTotal"),
  shopPowerTotal: document.getElementById("shopPowerTotal"),
  shopUpgradeTip: document.getElementById("shopUpgradeTip"),
  bulletStyle: document.getElementById("bulletStyle"),
  bulletPreview: document.getElementById("bulletPreview"),
  playerColor: document.getElementById("playerColor"),
  playerColorValue: document.getElementById("playerColorValue"),
  skinPreview: document.getElementById("skinPreview"),
  skinSpotlightName: document.getElementById("skinSpotlightName"),
  skinSpotlightTag: document.getElementById("skinSpotlightTag"),
  masterVolume: document.getElementById("masterVolume"),
  masterVolumeValue: document.getElementById("masterVolumeValue"),
  dashVolume: document.getElementById("dashVolume"),
  dashVolumeValue: document.getElementById("dashVolumeValue"),
  fpsCap: document.getElementById("fpsCap"),
  autoFullscreen: document.getElementById("autoFullscreen"),
  autoRestart: document.getElementById("autoRestart"),
  restartDelay: document.getElementById("restartDelay"),
  restartDelayValue: document.getElementById("restartDelayValue"),
  bindForward: document.getElementById("bindForward"),
  bindBackward: document.getElementById("bindBackward"),
  bindLeft: document.getElementById("bindLeft"),
  bindRight: document.getElementById("bindRight"),
  bindDash: document.getElementById("bindDash"),
  bindPause: document.getElementById("bindPause"),
  bindRestart: document.getElementById("bindRestart"),
  bindingHint: document.getElementById("bindingHint"),
  moveForwardKey: document.getElementById("moveForwardKey"),
  moveBackwardKey: document.getElementById("moveBackwardKey"),
  moveLeftKey: document.getElementById("moveLeftKey"),
  moveRightKey: document.getElementById("moveRightKey"),
  dashKey: document.getElementById("dashKey"),
  pauseKey: document.getElementById("pauseKey"),
  restartKey: document.getElementById("restartKey"),
  recordBestLevel: document.getElementById("recordBestLevel"),
  recordKills: document.getElementById("recordKills"),
  recordShots: document.getElementById("recordShots"),
  recordApples: document.getElementById("recordApples"),
  recordDashes: document.getElementById("recordDashes"),
  recordBosses: document.getElementById("recordBosses"),
  recordCoinsEarned: document.getElementById("recordCoinsEarned"),
  recordTimePlayed: document.getElementById("recordTimePlayed"),
  recordCurrentSkin: document.getElementById("recordCurrentSkin"),
  recordCurrentWeapon: document.getElementById("recordCurrentWeapon"),
  recordCurrentMode: document.getElementById("recordCurrentMode"),
  recordMood: document.getElementById("recordMood"),
  recordFavoriteWeapon: document.getElementById("recordFavoriteWeapon"),
  mobileUltraClean: document.getElementById("mobileUltraClean"),
  mobileAutoFire: document.getElementById("mobileAutoFire"),
  mobileHaptics: document.getElementById("mobileHaptics"),
  touchSensitivity: document.getElementById("touchSensitivity"),
  touchSensitivityValue: document.getElementById("touchSensitivityValue"),
  mobileButtonScale: document.getElementById("mobileButtonScale"),
  mobileButtonScaleValue: document.getElementById("mobileButtonScaleValue")
};

const STORAGE_SETTINGS = "arena_fun_settings_v1";
const STORAGE_RECORD = "arena_fun_record_v1";
const STORAGE_STATS = "arena_fun_stats_v1";
const STORAGE_PROGRESS = "arena_fun_progress_v1";
const STORAGE_AUDIO_BOOST = "arena_fun_audio_boost_v1";
const DPR = Math.min(window.devicePixelRatio || 1, 2);
const arena = { width: 2200, height: 1400 };

const weaponConfigs = {
  rifle: { label: "RIFLE", reload: 0.11, pellets: 1, spread: 0.012, speed: 1160, damageMul: 1, life: 0.92, radiusMul: 1, shake: 2.5, burstFx: 7 },
  shotgun: { label: "SHOTGUN", reload: 0.46, pellets: 7, spread: 0.34, speed: 880, damageMul: 0.54, life: 0.44, radiusMul: 1.18, shake: 6, burstFx: 12 },
  sniper: { label: "SNIPER", reload: 0.94, pellets: 1, spread: 0.0012, speed: 1680, damageMul: 2.6, life: 1.18, radiusMul: 0.96, shake: 9, burstFx: 10 },
  burst: { label: "RAFALE", reload: 0.31, pellets: 3, spread: 0.055, speed: 1220, damageMul: 0.84, life: 0.82, radiusMul: 0.92, shake: 4.5, burstFx: 8 }
};

const bulletStyles = ["dot", "streak", "plasma", "spark", "ring", "comet", "shard", "bolt", "pulse", "nova"];

const skinCatalog = {
  tank: { name: "Tank", price: 0, image: "assets/skins/tank.svg" },
  duck: { name: "Canard", price: 0, image: "assets/skins/duck.svg" },
  poop: { name: "Caca", price: 6, image: "assets/skins/poop.svg" },
  cat: { name: "Chat", price: 8, image: "assets/skins/cat.svg" },
  bear: { name: "Ours", price: 10, image: "assets/skins/bear.svg" },
  fox: { name: "Renard", price: 12, image: "assets/skins/fox.svg" },
  frog: { name: "Grenouille", price: 14, image: "assets/skins/frog.svg" },
  banana: { name: "Banane", price: 16, image: "assets/skins/banana.svg" },
  alien: { name: "Alien", price: 18, image: "assets/skins/alien.svg" },
  panda: { name: "Panda", price: 20, image: "assets/skins/panda.svg" },
  shark: { name: "Requin", price: 22, image: "assets/skins/shark.svg" },
  robot: { name: "Robot", price: 24, image: "assets/skins/robot.svg" },
  ninja: { name: "Ninja", price: 26, image: "assets/skins/ninja.svg" },
  skull: { name: "Skull", price: 28, image: "assets/skins/skull.svg" },
  pig: { name: "Cochon", price: 30, image: "assets/skins/pig.svg" },
  rabbit: { name: "Lapin", price: 32, image: "assets/skins/rabbit.svg" },
  dragon: { name: "Dragon", price: 34, image: "assets/skins/dragon.svg" },
  chicken: { name: "Poulet", price: 36, image: "assets/skins/chicken.svg" },
  monkey: { name: "Singe", price: 38, image: "assets/skins/monkey.svg" },
  tiger: { name: "Tigre", price: 40, image: "assets/skins/tiger.svg" },
  cow: { name: "Vache", price: 42, image: "assets/skins/cow.svg" }
};

let obstacles = [
  { x: 430, y: 300, w: 280, h: 120 },
  { x: 920, y: 180, w: 230, h: 230 },
  { x: 1360, y: 320, w: 330, h: 130 },
  { x: 620, y: 800, w: 150, h: 340 },
  { x: 1040, y: 660, w: 340, h: 120 },
  { x: 1610, y: 760, w: 180, h: 300 }
];

const obstacleLayouts = [
  [
    { x: 430, y: 300, w: 280, h: 120 },
    { x: 920, y: 180, w: 230, h: 230 },
    { x: 1360, y: 320, w: 330, h: 130 },
    { x: 620, y: 800, w: 150, h: 340 },
    { x: 1040, y: 660, w: 340, h: 120 },
    { x: 1610, y: 760, w: 180, h: 300 }
  ],
  [
    { x: 330, y: 250, w: 190, h: 250 },
    { x: 760, y: 420, w: 620, h: 110 },
    { x: 1560, y: 240, w: 180, h: 260 },
    { x: 520, y: 920, w: 250, h: 160 },
    { x: 1300, y: 820, w: 240, h: 220 }
  ],
  [
    { x: 300, y: 360, w: 240, h: 110 },
    { x: 720, y: 220, w: 160, h: 430 },
    { x: 1040, y: 820, w: 420, h: 130 },
    { x: 1540, y: 280, w: 260, h: 150 },
    { x: 1660, y: 760, w: 140, h: 320 }
  ],
  [
    { x: 460, y: 220, w: 520, h: 120 },
    { x: 460, y: 980, w: 520, h: 120 },
    { x: 1280, y: 220, w: 420, h: 120 },
    { x: 1280, y: 980, w: 420, h: 120 },
    { x: 980, y: 500, w: 220, h: 320 }
  ]
];

const keys = new Set();
const pointer = { x: 0, y: 0, down: false, active: false };
const mobile = {
  enabled: false,
  moveTouchId: null,
  moveX: 0,
  moveY: 0,
  aimTouchId: null,
  aimX: 1,
  aimY: 0,
  aiming: false,
  firing: false,
  lastTapTime: 0
};
const skinImages = {};
Object.entries(skinCatalog).forEach(([id, entry]) => {
  if (entry.image) {
    const img = new Image();
    img.src = entry.image;
    skinImages[id] = img;
  }
});

const defaultSettings = {
  interfaceMode: "pc",
  mode: "levels",
  weapon: "rifle",
  skin: "tank",
  playerColor: "#7cf6b8",
  bulletColor: "#63ebff",
  bulletStyle: "dot",
  bulletSize: 3,
  bulletDamage: 11,
  masterVolume: 100,
  dashVolume: 100,
  fpsCap: 120,
  autoFullscreen: true,
  autoRestart: true,
  restartDelay: 2,
  mobileUltraClean: false,
  mobileAutoFire: false,
  mobileHaptics: true,
  touchSensitivity: 100,
  mobileButtonScale: 100,
  bindings: {
    forward: "z",
    backward: "s",
    left: "q",
    right: "d",
    dash: "shift",
    pause: "p",
    restart: "r"
  }
};

let settings = loadSettings();
let bestLevel = loadBestLevel();
let lifetimeStats = loadStats();
let progress = loadProgress();
let listeningAction = null;
let currentTab = "play";
let audioContext = null;
let musicClock = 0;
let ambientNodes = null;
let lastTime = 0;
let accumulator = 0;
let lastRenderTime = 0;
let frameCounter = 0;
let frameTime = 0;
let shownFps = 0;
let gameStarted = false;
let overlayOpen = true;
let paused = false;
let gameOver = false;
let restartTimer = 0;
let impactFlash = 0;
let cameraShake = 0;
let appleTimer = 0;
let levelToast = 0;
let footTimer = 0;
let statsSaveTimer = 3;
let lastPlayerHitKind = "enemy";
let coarseMedia = null;
let rotateNoticeDismissed = false;

let player;
let ally = null;
let enemies = [];

const isiPhone = /iPhone/i.test(navigator.userAgent);
const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const world = {
  bullets: [],
  particles: [],
  pickups: [],
  hazards: [],
  level: 1,
  tier: "Facile",
  theme: "neo",
  bossLevel: false,
  eventType: "standard",
  eventTimer: 0,
  eventPulse: 0,
  session: {
    kills: 0,
    shots: 0,
    apples: 0,
    dashes: 0
  }
};

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_SETTINGS) || "null");
    const merged = {
      ...defaultSettings,
      ...parsed,
      bindings: {
        ...defaultSettings.bindings,
        ...(parsed?.bindings || {})
      }
    };
    return merged;
  } catch {
    return structuredClone(defaultSettings);
  }
}

function saveSettings() {
  localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
}

function loadBestLevel() {
  const value = Number.parseInt(localStorage.getItem(STORAGE_RECORD) || "1", 10);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function loadStats() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_STATS) || "null");
    return {
      kills: Number(parsed?.kills) || 0,
      shots: Number(parsed?.shots) || 0,
      apples: Number(parsed?.apples) || 0,
      dashes: Number(parsed?.dashes) || 0,
      bosses: Number(parsed?.bosses) || 0,
      coinsEarned: Number(parsed?.coinsEarned) || 0,
      timePlayed: Number(parsed?.timePlayed) || 0,
      weaponUsage: parsed?.weaponUsage && typeof parsed.weaponUsage === "object"
        ? parsed.weaponUsage
        : { rifle: 0, shotgun: 0, sniper: 0, burst: 0 }
    };
  } catch {
    return {
      kills: 0,
      shots: 0,
      apples: 0,
      dashes: 0,
      bosses: 0,
      coinsEarned: 0,
      timePlayed: 0,
      weaponUsage: { rifle: 0, shotgun: 0, sniper: 0, burst: 0 }
    };
  }
}

function saveStats() {
  localStorage.setItem(STORAGE_STATS, JSON.stringify(lifetimeStats));
}

function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_PROGRESS) || "null");
    return {
      coins: Number(parsed?.coins) || 0,
      attackTier: Number(parsed?.attackTier) || 0,
      vitalityTier: Number(parsed?.vitalityTier) || 0,
      dashTier: Number(parsed?.dashTier) || 0,
      fireTier: Number(parsed?.fireTier) || 0,
      ownedSkins: Array.isArray(parsed?.ownedSkins) ? parsed.ownedSkins : ["tank", "duck"]
    };
  } catch {
    return { coins: 0, attackTier: 0, vitalityTier: 0, dashTier: 0, fireTier: 0, ownedSkins: ["tank", "duck"] };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(progress));
}

function saveBestLevel(level) {
  bestLevel = Math.max(bestLevel, level);
  localStorage.setItem(STORAGE_RECORD, String(bestLevel));
}

function sanitizeSettings() {
  progress.ownedSkins = [...new Set(["tank", "duck", ...(progress.ownedSkins || [])])];
  if (!["pc", "mobile"].includes(settings.interfaceMode)) settings.interfaceMode = "pc";
  if (!weaponConfigs[settings.weapon]) settings.weapon = "rifle";
  if (!skinCatalog[settings.skin] || !progress.ownedSkins.includes(settings.skin)) settings.skin = "tank";
  if (!["levels", "duo", "chaos", "swarm", "bossrush"].includes(settings.mode)) settings.mode = "levels";
  if (!bulletStyles.includes(settings.bulletStyle)) settings.bulletStyle = "dot";
  settings.bulletSize = 3;
  settings.bulletDamage = 11;
  settings.masterVolume = clamp(Number(settings.masterVolume) || defaultSettings.masterVolume, 0, 100);
  settings.dashVolume = clamp(Number(settings.dashVolume) || defaultSettings.dashVolume, 0, 100);
  settings.restartDelay = clamp(Number(settings.restartDelay) || defaultSettings.restartDelay, 1, 5);
  settings.touchSensitivity = clamp(Number(settings.touchSensitivity) || defaultSettings.touchSensitivity, 60, 180);
  settings.mobileButtonScale = clamp(Number(settings.mobileButtonScale) || defaultSettings.mobileButtonScale, 80, 150);
  settings.fpsCap = [0, 60, 120, 144].includes(Number(settings.fpsCap)) ? Number(settings.fpsCap) : defaultSettings.fpsCap;
  progress.attackTier = clamp(Number(progress.attackTier) || 0, 0, 8);
  progress.vitalityTier = clamp(Number(progress.vitalityTier) || 0, 0, 8);
  progress.dashTier = clamp(Number(progress.dashTier) || 0, 0, 8);
  progress.fireTier = clamp(Number(progress.fireTier) || 0, 0, 8);
}

sanitizeSettings();

if (!localStorage.getItem(STORAGE_AUDIO_BOOST)) {
  settings.masterVolume = 100;
  settings.dashVolume = 100;
  saveSettings();
  localStorage.setItem(STORAGE_AUDIO_BOOST, "1");
}

function createEntity(x, y, options = {}) {
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    radius: options.radius || 30,
    angle: 0,
    hp: options.hp || 100,
    maxHp: options.hp || 100,
    energy: 100,
    maxEnergy: 100,
    shieldTimer: 0,
    reload: 0,
    dashCooldown: 0,
    hitFlash: 0,
    patternCooldown: 0,
    color: options.color || "#7cf6b8",
    skin: options.skin || "tank",
    team: options.team || "ally",
    ai: options.ai || false,
    archetype: options.archetype || "player",
    preferredWeapon: options.preferredWeapon || "rifle",
    reward: options.reward || 0,
    desiredRange: options.desiredRange || 320,
    speedMul: options.speedMul || 1,
    dashChance: options.dashChance || 0.012,
    damageValue: options.damageValue || 8,
    reloadValue: options.reloadValue || weaponConfigs.rifle.reload
  };
}

function currentModeLabel() {
  if (settings.mode === "duo") return "2V2 ASSIST";
  if (settings.mode === "chaos") return "CHAOS";
  if (settings.mode === "swarm") return "SWARM";
  if (settings.mode === "bossrush") return "BOSS RUSH";
  return "NIVEAUX";
}

function currentWeaponLabel() {
  return weaponConfigs[settings.weapon].label;
}

function currentMoodLabel() {
  return "Arena nerveuse deluxe";
}

function resetMobileInputs() {
  mobile.moveTouchId = null;
  mobile.aimTouchId = null;
  mobile.moveX = 0;
  mobile.moveY = 0;
  mobile.aimX = 1;
  mobile.aimY = 0;
  mobile.aiming = false;
  mobile.firing = false;
  mobile.lastTapTime = 0;
  ui.joystickStick.style.transform = "translate(-50%, -50%)";
  ui.aimStick.style.transform = "translate(-50%, -50%)";
}

function playerPowerLabel() {
  return 1 + progress.attackTier + progress.vitalityTier + progress.dashTier + progress.fireTier;
}

function upgradeCost(type) {
  const level = progress[type];
  const base = {
    attackTier: 25,
    vitalityTier: 30,
    dashTier: 35,
    fireTier: 40
  }[type];
  return base + level * 20;
}

function favoriteWeaponId() {
  const usage = lifetimeStats.weaponUsage || {};
  return Object.keys(weaponConfigs).sort((a, b) => (usage[b] || 0) - (usage[a] || 0))[0] || "rifle";
}

function setMapLayout(level) {
  const layout = obstacleLayouts[(level - 1) % obstacleLayouts.length] || obstacleLayouts[0];
  obstacles = layout.map((item) => ({ ...item }));
}

function chooseSpecialEvent(level) {
  if (level % 7 === 0) return "coinrain";
  if (level % 6 === 0) return "bonus";
  if (level % 4 === 0) return "toxic";
  return "standard";
}

function eventLabel(type) {
  return {
    standard: "standard",
    coinrain: "pluie de pieces",
    bonus: "manche bonus",
    toxic: "zone toxique"
  }[type] || "standard";
}

function skinFlavor(id) {
  const flavors = {
    tank: "Vrai tank de guerre",
    duck: "Canard de guerre",
    poop: "Chaos complet",
    cat: "Petit assassin",
    bear: "Gros nounours furieux",
    fox: "Rapide et malin",
    frog: "Sautillant toxique",
    banana: "Banane glissante",
    alien: "Visiteur bizarre",
    panda: "Calme mais brutal",
    shark: "Predateur glacial",
    robot: "Metal futuriste",
    ninja: "Silencieux et sale",
    skull: "Mort stylee",
    pig: "Rose mais violent",
    rabbit: "Rapide et mignon",
    dragon: "Legendary fire",
    chicken: "Poulet de combat",
    monkey: "Singe turbo",
    tiger: "Fauve dangereux",
    cow: "Vache de l'enfer"
  };
  return flavors[id] || "Skin legendaire";
}

function enemyBlueprint(kind, level, diff) {
  const blueprints = {
    grunt: { hp: diff.enemyHp, speed: diff.enemySpeed, weapon: level > 8 ? "burst" : "rifle", skin: "robot", color: "#ff7088", reward: 10, radius: 30, range: 340, dashChance: 0.012, damage: diff.enemyDamage, reload: diff.enemyReload },
    runner: { hp: Math.round(diff.enemyHp * 0.78), speed: diff.enemySpeed * 1.25, weapon: "burst", skin: "fox", color: "#ff9d66", reward: 12, radius: 28, range: 250, dashChance: 0.028, damage: Math.max(7, diff.enemyDamage - 2), reload: Math.max(0.1, diff.enemyReload * 0.78) },
    tank: { hp: Math.round(diff.enemyHp * 1.7), speed: diff.enemySpeed * 0.8, weapon: "shotgun", skin: "tank", color: "#ff8d77", reward: 18, radius: 38, range: 210, dashChance: 0.008, damage: diff.enemyDamage + 3, reload: diff.enemyReload * 1.3 },
    sniper: { hp: Math.round(diff.enemyHp * 0.92), speed: diff.enemySpeed * 0.9, weapon: "sniper", skin: "ninja", color: "#ff6ca8", reward: 16, radius: 28, range: 560, dashChance: 0.006, damage: diff.enemyDamage + 6, reload: Math.max(0.18, diff.enemyReload * 1.4) },
    boss: { hp: Math.round(diff.enemyHp * 3.2), speed: diff.enemySpeed * 0.86, weapon: "burst", skin: "poop", color: "#ffbd59", reward: 42, radius: 50, range: 420, dashChance: 0.012, damage: diff.enemyDamage + 2, reload: Math.max(0.18, diff.enemyReload * 0.95) }
  };
  return blueprints[kind] || blueprints.grunt;
}

function chooseEnemyKinds(level, mode) {
  if (mode === "bossrush") return ["boss", "sniper"];
  if (mode === "swarm") return level > 8 ? ["runner", "runner"] : ["grunt", "runner"];
  if (level % 5 === 0) return mode === "chaos" ? ["boss", "runner"] : ["boss"];
  if (mode === "chaos") return level > 8 ? ["runner", "tank"] : ["grunt", "runner"];
  if (mode === "duo") return level > 6 ? ["tank", "sniper"] : ["grunt", "runner"];
  if (level > 9) return ["sniper"];
  if (level > 5) return ["tank"];
  return ["grunt"];
}

function createEnemy(kind, x, y, level, diff) {
  const spec = enemyBlueprint(kind, level, diff);
  return createEntity(x, y, {
    color: spec.color,
    skin: spec.skin,
    team: "enemy",
    ai: true,
    hp: spec.hp,
    radius: spec.radius,
    archetype: kind,
    preferredWeapon: spec.weapon,
    reward: spec.reward,
    desiredRange: spec.range,
    speedMul: spec.speed / diff.enemySpeed,
    dashChance: spec.dashChance,
    damageValue: spec.damage,
    reloadValue: spec.reload
  });
}

function autoSpendCoins() {
  return;
}

function bindingKey(action) {
  return settings.bindings[action];
}

function labelForKey(key) {
  return key.toUpperCase();
}

function isPressed(action) {
  return keys.has(bindingKey(action));
}

function mobileMoveAxis(axis) {
  return axis === "x" ? mobile.moveX : mobile.moveY;
}

function isFiring() {
  return pointer.down || (mobile.enabled && mobile.aiming);
}

function isMobileViewport() {
  return mobile.enabled;
}

function syncMobileMode() {
  const next = settings.interfaceMode === "mobile";
  mobile.enabled = next;
  ui.mobileControls?.setAttribute("aria-hidden", String(!next));
  document.body.classList.toggle("mobile-ui-active", next);
  document.body.classList.toggle("mobile-settings-visible", next);
  document.body.classList.toggle("iphone-ui", next && isiPhone);
  document.body.classList.toggle("safari-ui", next && isSafariBrowser);
  const showRotateNotice = next && window.innerHeight > window.innerWidth && !rotateNoticeDismissed;
  document.body.classList.toggle("mobile-portrait", showRotateNotice);
  if (ui.rotateNotice) {
    ui.rotateNotice.setAttribute("aria-hidden", String(!showRotateNotice));
  }
  if (!next) {
    resetMobileInputs();
  } else {
    screen.orientation?.lock?.("landscape").catch(() => {});
  }
  requestAnimationFrame(() => resize(true));
}

function isSkinUnlocked(id) {
  return progress.ownedSkins.includes(id);
}

function length(x, y) {
  return Math.hypot(x, y);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalize(x, y) {
  const len = length(x, y) || 1;
  return { x: x / len, y: y / len };
}

function perpendicular(x, y) {
  return { x: -y, y: x };
}

function screenToWorld(x, y) {
  const view = getCamera();
  return { x: x + view.x, y: y + view.y };
}

function viewSize() {
  const rect = canvas.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

function getCamera() {
  const rect = viewSize();
  const shakeX = (Math.random() - 0.5) * cameraShake;
  const shakeY = (Math.random() - 0.5) * cameraShake;
  return {
    width: rect.width,
    height: rect.height,
    x: clamp(player.x - rect.width / 2 + shakeX, 0, arena.width - rect.width),
    y: clamp(player.y - rect.height / 2 + shakeY, 0, arena.height - rect.height)
  };
}

function circleIntersectsRect(circle, rect) {
  const nearestX = clamp(circle.x, rect.x, rect.x + rect.w);
  const nearestY = clamp(circle.y, rect.y, rect.y + rect.h);
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;
  return dx * dx + dy * dy < circle.radius * circle.radius;
}

function resolveCircleRect(entity, rect) {
  if (!circleIntersectsRect(entity, rect)) return;
  const left = entity.x - (rect.x - entity.radius);
  const right = rect.x + rect.w + entity.radius - entity.x;
  const top = entity.y - (rect.y - entity.radius);
  const bottom = rect.y + rect.h + entity.radius - entity.y;
  const overlap = Math.min(left, right, top, bottom);
  if (overlap === left) entity.x = rect.x - entity.radius;
  else if (overlap === right) entity.x = rect.x + rect.w + entity.radius;
  else if (overlap === top) entity.y = rect.y - entity.radius;
  else entity.y = rect.y + rect.h + entity.radius;
}

function canSee(source, target) {
  const steps = 24;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const probe = {
      x: source.x + (target.x - source.x) * t,
      y: source.y + (target.y - source.y) * t,
      radius: 4
    };
    if (obstacles.some((rect) => circleIntersectsRect(probe, rect))) return false;
  }
  return true;
}

function getDifficulty(level) {
  if (level <= 3) {
    return { tier: "Facile", enemyHp: 90 + level * 8, enemySpeed: 235 + level * 8, enemyReload: 0.34 - level * 0.015, enemyDamage: 7 + level };
  }
  if (level <= 7) {
    return { tier: "Moyen", enemyHp: 120 + level * 10, enemySpeed: 280 + level * 9, enemyReload: 0.26 - (level - 3) * 0.01, enemyDamage: 10 + Math.floor(level / 2) };
  }
  return { tier: "Difficile", enemyHp: 168 + level * 12, enemySpeed: 330 + level * 10, enemyReload: Math.max(0.11, 0.22 - (level - 7) * 0.006), enemyDamage: 14 + Math.floor(level / 2) };
}

function livingEnemies() {
  return enemies.filter((entity) => entity.hp > 0);
}

function livingAllies() {
  return [player, ally].filter((entity) => entity && entity.hp > 0);
}

function nearestTarget(source, list) {
  let chosen = null;
  let best = Infinity;
  list.forEach((target) => {
    const dist = length(target.x - source.x, target.y - source.y);
    if (dist < best) {
      best = dist;
      chosen = target;
    }
  });
  return chosen;
}

function resetLevel(level, freshRun = false) {
  const diff = getDifficulty(level);
  setMapLayout(level);
  const enemySpawn = randomSpawn("enemy");
  const enemySpawnTwo = randomSpawn("enemy");
  const enemySpawnThree = randomSpawn("enemy");
  const allySpawn = randomSpawn("ally");
  const enemyKinds = chooseEnemyKinds(level, settings.mode);
  world.level = level;
  world.tier = diff.tier;
  world.theme = level % 3 === 0 ? "ember" : level % 3 === 1 ? "neo" : "toxic";
  world.bossLevel = level % 5 === 0;
  world.eventType = chooseSpecialEvent(level);
  world.eventTimer = 5;
  world.eventPulse = 0;
  gameOver = false;
  restartTimer = 0;
  appleTimer = 2.5;
  levelToast = 1;
  impactFlash = 0;
  cameraShake = 0;
  world.bullets = [];
  world.particles = [];
  world.pickups = [];
  world.hazards = [];

  if (freshRun || !player) {
    player = createEntity(420, 680, { color: settings.playerColor, skin: settings.skin, team: "ally" });
  } else {
    player.x = 420;
    player.y = 680;
    player.vx = 0;
    player.vy = 0;
    player.reload = 0;
    player.dashCooldown = 0;
    player.energy = Math.min(player.maxEnergy, player.energy + 28);
    player.hp = Math.min(player.maxHp, player.hp + 20);
    player.color = settings.playerColor;
    player.skin = settings.skin;
  }
  player.maxHp = 100 + progress.vitalityTier * 20;
  player.hp = Math.min(player.maxHp, Math.max(player.hp, player.maxHp * 0.7));
  player.maxEnergy = 100 + progress.dashTier * 8;
  player.energy = Math.min(player.maxEnergy, player.energy);

  ally = null;
  enemies = [];

  enemies.push(createEnemy(enemyKinds[0], enemySpawn.x, enemySpawn.y, level, diff));

  if (settings.mode === "duo") {
    ally = createEntity(allySpawn.x, allySpawn.y, { color: "#76d8ff", skin: "panda", team: "ally", ai: true, hp: 100 });
    ally.preferredWeapon = "rifle";
    if (enemyKinds[1]) enemies.push(createEnemy(enemyKinds[1], enemySpawnTwo.x, enemySpawnTwo.y, level, diff));
  } else if (settings.mode === "chaos" || settings.mode === "swarm" || settings.mode === "bossrush") {
    if (enemyKinds[1]) enemies.push(createEnemy(enemyKinds[1], enemySpawnTwo.x, enemySpawnTwo.y, level, diff));
    if (settings.mode === "swarm") {
      enemies.push(createEnemy(level > 10 ? "tank" : "grunt", enemySpawnThree.x, enemySpawnThree.y, level, diff));
    }
  }

  saveBestLevel(level);
  ui.status.textContent = world.bossLevel
    ? `Boss du niveau ${world.level} - attention. Event: ${eventLabel(world.eventType)}.`
    : `Niveau ${world.level} - ${world.tier} - ${currentModeLabel()} - ${eventLabel(world.eventType)}.`;
  if (!freshRun && level > 1) {
    playLevelUpSound();
  }
  renderUI();
}

function restartRun() {
  world.session.kills = 0;
  world.session.shots = 0;
  world.session.apples = 0;
  world.session.dashes = 0;
  lastPlayerHitKind = "enemy";
  playRestartManualSound();
  resetLevel(1, true);
}

function openOverlay(tab = currentTab) {
  overlayOpen = true;
  paused = true;
  currentTab = tab;
  ui.hubOverlay.classList.remove("hidden");
  canvas.classList.add("blocked");
  switchTab(tab);
  playUiOpenSound();
}

function closeOverlay() {
  if (!gameStarted) {
    startMatch();
    return;
  }
  overlayOpen = false;
  paused = false;
  ui.hubOverlay.classList.add("hidden");
  canvas.classList.remove("blocked");
  playUiCloseSound();
}

function startMatch() {
  restartRun();
  gameStarted = true;
  overlayOpen = false;
  paused = false;
  ui.hubOverlay.classList.add("hidden");
  canvas.classList.remove("blocked");
  ensureAudio();
  startAmbientMusic();
  tryAutoFullscreen();
  playStartSound();
}

function switchTab(tab) {
  currentTab = tab;
  ui.tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  ui.tabPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab));
  playTabSound();
}

function resize(skipModeSync = false) {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * DPR);
  canvas.height = Math.floor(rect.height * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (!skipModeSync) {
    syncMobileMode();
  }
}

function setBinding(action, key) {
  if (key === "escape") return;
  settings.bindings[action] = key;
  saveSettings();
  renderUI();
}

function renderUI() {
  document.body.classList.toggle("playing", gameStarted && !overlayOpen);
  ui.levelLabel.textContent = String(world.level);
  ui.bestLevel.textContent = String(bestLevel);
  ui.modeLabel.textContent = currentModeLabel();
  ui.weaponLabel.textContent = currentWeaponLabel();
  ui.mobileLevelLabel.textContent = String(world.level);
  ui.mobileModeLabel.textContent = currentModeLabel();
  ui.mobileWeaponLabel.textContent = currentWeaponLabel();
  ui.mobileCoinsLabel.textContent = String(progress.coins);
  ui.coinsLabel.textContent = String(progress.coins);
  ui.powerLabel.textContent = String(playerPowerLabel());
  if (ui.shopCoinsTotal) ui.shopCoinsTotal.textContent = `${progress.coins} pieces`;
  if (ui.shopPowerTotal) ui.shopPowerTotal.textContent = `Niveau ${playerPowerLabel()}`;
  if (ui.shopUpgradeTip) ui.shopUpgradeTip.textContent = "Degats = frappe plus fort, Vie = tank plus, Dash = plus d'energie, Cadence = tire plus vite.";
  ui.shieldLabel.textContent = player && player.shieldTimer > 0 ? `${player.shieldTimer.toFixed(1)}s` : "OFF";
  ui.mobileWeaponButton.textContent = weaponConfigs[settings.weapon].label.replace("SHOTGUN", "POMPE");
  ui.fps.textContent = String(shownFps);
  document.body.style.setProperty("--mobile-scale", `${settings.mobileButtonScale / 100}`);
  document.body.classList.toggle("mobile-ultra-clean-active", mobile.enabled && settings.mobileUltraClean && !overlayOpen);

  if (player) {
    ui.playerHp.style.width = `${(player.hp / player.maxHp) * 100}%`;
    ui.playerEnergy.style.width = `${(player.energy / player.maxEnergy) * 100}%`;
  }
  ui.enemyHp.style.width = enemies[0] ? `${(enemies[0].hp / enemies[0].maxHp) * 100}%` : "0%";
  ui.allyStat.classList.toggle("hidden", !(settings.mode === "duo" && ally));
  ui.enemyTwoStat.classList.toggle("hidden", enemies.length < 2);
  ui.allyHp.style.width = ally ? `${(ally.hp / ally.maxHp) * 100}%` : "0%";
  ui.enemyTwoHp.style.width = enemies[1] ? `${(enemies[1].hp / enemies[1].maxHp) * 100}%` : "0%";

  ui.bulletStyle.value = settings.bulletStyle;
  ui.bulletPreview.dataset.style = settings.bulletStyle;
  ui.bulletPreview.style.setProperty("--bullet-preview-size", `${settings.bulletSize * 5}px`);
  ui.bulletPreview.style.setProperty("--bullet-preview-color", settings.bulletColor);

  ui.playerColor.value = settings.playerColor;
  ui.playerColorValue.textContent = settings.playerColor.toUpperCase();
  ui.skinPreview.style.backgroundImage = skinCatalog[settings.skin].image ? `url('${skinCatalog[settings.skin].image}')` : "none";
  ui.skinPreview.style.backgroundColor = skinCatalog[settings.skin].image ? "rgba(255,255,255,0.04)" : settings.playerColor;
  ui.skinPreview.style.boxShadow = skinCatalog[settings.skin].image ? `0 18px 34px ${hexToRgba(settings.playerColor, 0.22)}` : `0 0 24px ${settings.playerColor}`;
  ui.skinPreview.style.outline = `2px solid ${hexToRgba(settings.playerColor, 0.18)}`;
  ui.skinSpotlightName.textContent = skinCatalog[settings.skin].name;
  ui.skinSpotlightTag.textContent = skinFlavor(settings.skin);

  ui.masterVolume.value = String(settings.masterVolume);
  ui.masterVolumeValue.textContent = `${settings.masterVolume}%`;
  ui.dashVolume.value = String(settings.dashVolume);
  ui.dashVolumeValue.textContent = `${settings.dashVolume}%`;
  ui.fpsCap.value = String(settings.fpsCap);
  ui.autoFullscreen.checked = settings.autoFullscreen;
  ui.autoRestart.checked = settings.autoRestart;
  ui.restartDelay.value = String(settings.restartDelay);
  ui.restartDelayValue.textContent = `${settings.restartDelay} s`;

  ui.interfaceChoices.forEach((button) => button.classList.toggle("active", button.dataset.interface === settings.interfaceMode));
  ui.modeChoices.forEach((button) => button.classList.toggle("active", button.dataset.mode === settings.mode));
  ui.weaponChoices.forEach((button) => button.classList.toggle("active", button.dataset.weapon === settings.weapon));

  ui.bindForward.textContent = labelForKey(settings.bindings.forward);
  ui.bindBackward.textContent = labelForKey(settings.bindings.backward);
  ui.bindLeft.textContent = labelForKey(settings.bindings.left);
  ui.bindRight.textContent = labelForKey(settings.bindings.right);
  ui.bindDash.textContent = labelForKey(settings.bindings.dash);
  ui.bindPause.textContent = labelForKey(settings.bindings.pause);
  ui.bindRestart.textContent = labelForKey(settings.bindings.restart);
  ui.moveForwardKey.textContent = labelForKey(settings.bindings.forward);
  ui.moveBackwardKey.textContent = labelForKey(settings.bindings.backward);
  ui.moveLeftKey.textContent = labelForKey(settings.bindings.left);
  ui.moveRightKey.textContent = labelForKey(settings.bindings.right);
  ui.dashKey.textContent = labelForKey(settings.bindings.dash);
  ui.pauseKey.textContent = labelForKey(settings.bindings.pause);
  ui.restartKey.textContent = labelForKey(settings.bindings.restart);

  ui.recordBestLevel.textContent = String(bestLevel);
  ui.recordKills.textContent = String(lifetimeStats.kills);
  ui.recordShots.textContent = String(lifetimeStats.shots);
  ui.recordApples.textContent = String(lifetimeStats.apples);
  ui.recordDashes.textContent = String(lifetimeStats.dashes);
  ui.recordBosses.textContent = String(lifetimeStats.bosses);
  ui.recordCoinsEarned.textContent = String(lifetimeStats.coinsEarned);
  ui.recordTimePlayed.textContent = `${Math.floor(lifetimeStats.timePlayed / 60)} min`;
  ui.recordCurrentSkin.textContent = skinCatalog[settings.skin].name;
  ui.recordCurrentWeapon.textContent = currentWeaponLabel();
  ui.recordCurrentMode.textContent = currentModeLabel();
  ui.recordMood.textContent = currentMoodLabel();
  ui.recordFavoriteWeapon.textContent = weaponConfigs[favoriteWeaponId()].label;
  ui.mobileUltraClean.checked = settings.mobileUltraClean;
  ui.mobileAutoFire.checked = settings.mobileAutoFire;
  ui.mobileHaptics.checked = settings.mobileHaptics;
  ui.touchSensitivity.value = String(settings.touchSensitivity);
  ui.touchSensitivityValue.textContent = `${settings.touchSensitivity}%`;
  ui.mobileButtonScale.value = String(settings.mobileButtonScale);
  ui.mobileButtonScaleValue.textContent = `${settings.mobileButtonScale}%`;

  [
    ["attackTier", ui.upgradeAttackLevel, ui.upgradeAttackCost, ui.quickUpgradeAttackLevel, ui.quickUpgradeAttackCost, ui.upgradeAttack, ui.quickUpgradeAttack],
    ["vitalityTier", ui.upgradeVitalityLevel, ui.upgradeVitalityCost, ui.quickUpgradeVitalityLevel, ui.quickUpgradeVitalityCost, ui.upgradeVitality, ui.quickUpgradeVitality],
    ["dashTier", ui.upgradeDashLevel, ui.upgradeDashCost, ui.quickUpgradeDashLevel, ui.quickUpgradeDashCost, ui.upgradeDash, ui.quickUpgradeDash],
    ["fireTier", ui.upgradeFireLevel, ui.upgradeFireCost, ui.quickUpgradeFireLevel, ui.quickUpgradeFireCost, ui.upgradeFire, ui.quickUpgradeFire]
  ].forEach(([key, levelNode, costNode, quickLevelNode, quickCostNode, mainButton, quickButton]) => {
    const cost = upgradeCost(key);
    const label = `Niveau ${progress[key]}`;
    const compact = `Nv ${progress[key]}`;
    const maxed = progress[key] >= 8;
    if (levelNode) levelNode.textContent = label;
    if (quickLevelNode) quickLevelNode.textContent = compact;
    if (costNode) costNode.textContent = maxed ? "MAX" : `${cost} pieces`;
    if (quickCostNode) quickCostNode.textContent = maxed ? "MAX" : `${cost}p`;
    [mainButton, quickButton].forEach((button) => {
      if (!button) return;
      button.classList.toggle("affordable", !maxed && progress.coins >= cost);
      button.classList.toggle("maxed", maxed);
    });
  });

  document.querySelectorAll(".bind-button").forEach((button) => {
    button.classList.toggle("listening", button.dataset.action === listeningAction);
  });
  ui.bindingHint.textContent = listeningAction
    ? `Appuyez sur la nouvelle touche pour ${listeningAction}.`
    : "Cliquez sur une touche puis appuyez sur la nouvelle touche.";

  renderShop();
}

function renderShop() {
  ui.shopGrid.innerHTML = "";
  Object.entries(skinCatalog).forEach(([id, info]) => {
    const unlocked = isSkinUnlocked(id);
    const canBuy = progress.coins >= info.price;
    const item = document.createElement("button");
    item.type = "button";
    item.className = `shop-item${settings.skin === id ? " selected" : ""}${unlocked ? "" : " locked"}${!unlocked && canBuy ? " affordable" : ""}`;
    const thumb = info.image
      ? `<div class="shop-thumb" style="background-image:url('${info.image}')"></div>`
      : `<div class="shop-thumb" style="background:${settings.playerColor}; box-shadow:0 0 18px ${settings.playerColor};"></div>`;
    const meta = unlocked ? "Possede" : `${info.price} pieces${canBuy ? " - achetable" : " - pas assez"}`;
    item.innerHTML = `${thumb}<strong>${info.name}</strong><small class="shop-meta">${skinFlavor(id)}</small><small class="shop-meta">${meta}</small>`;
    item.addEventListener("click", () => {
      if (!unlocked) {
        if (progress.coins < info.price) {
          ui.status.textContent = `Pas assez de pieces pour ${info.name}.`;
          playErrorSound();
          return;
        }
        progress.coins -= info.price;
        progress.ownedSkins.push(id);
        saveProgress();
        playPurchaseSound();
      }
      settings.skin = id;
      if (player) player.skin = id;
      saveSettings();
      renderUI();
    });
    ui.shopGrid.appendChild(item);
  });
  ui.shopHint.textContent = `Pieces: ${progress.coins}. Achetez puis equipez vos skins ici.`;
}

function vibrate(pattern) {
  if (!settings.mobileHaptics) return;
  if (!mobile.enabled) return;
  navigator.vibrate?.(pattern);
}

function purchaseUpgrade(key) {
  if (progress[key] >= 8) {
    ui.status.textContent = "Cette amelioration est deja au max.";
    playErrorSound();
    return;
  }
  const cost = upgradeCost(key);
  if (progress.coins < cost) {
    ui.status.textContent = "Pas assez de pieces pour cette amelioration.";
    playErrorSound();
    return;
  }
  progress.coins -= cost;
  progress[key] += 1;
  saveProgress();
  if (key === "vitalityTier" && player) {
    player.maxHp = 100 + progress.vitalityTier * 20;
    player.hp = Math.min(player.maxHp, player.hp + 22);
  }
  if (key === "dashTier" && player) {
    player.maxEnergy = 100 + progress.dashTier * 8;
    player.energy = Math.min(player.maxEnergy, player.energy + 16);
  }
  ui.status.textContent = "Amelioration achetee.";
  playPurchaseSound();
  vibrate([20, 20, 25]);
  renderUI();
}

function addCoins(amount) {
  progress.coins = Math.max(0, progress.coins + amount);
}

function ensureAudio() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

function tone({ frequency, slideTo = null, duration = 0.12, volume = 0.1, type = "triangle" }) {
  const audio = ensureAudio();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const now = audio.currentTime;
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), now + duration);
  const actualVolume = Math.min(1, volume * (settings.masterVolume / 100) * 5.6);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, actualVolume), now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + duration + 0.03);
}

function playShootSound(weaponId = settings.weapon) {
  const shotProfile = {
    rifle: { base: 1, extra: 1 },
    shotgun: { base: 0.75, extra: 0.8 },
    sniper: { base: 0.55, extra: 1.35 },
    burst: { base: 1.15, extra: 0.95 }
  }[weaponId] || { base: 1, extra: 1 };
  tone({ frequency: 240 * shotProfile.base, slideTo: 140, duration: 0.06, volume: 0.08 * shotProfile.extra, type: "square" });
  tone({ frequency: 420 * shotProfile.extra, slideTo: 250, duration: 0.05, volume: 0.05, type: "triangle" });
}

function playDashSound() {
  const mult = settings.dashVolume / 100;
  tone({ frequency: 300, slideTo: 100, duration: 0.14, volume: 0.16 * mult, type: "sawtooth" });
}

function playStepSound(speedRatio) {
  tone({ frequency: 110 + Math.random() * 40, slideTo: 95, duration: 0.035, volume: 0.022 + speedRatio * 0.01, type: "triangle" });
}

function playHitSound() {
  tone({ frequency: 180, slideTo: 100, duration: 0.07, volume: 0.08, type: "square" });
}

function playAppleSound() {
  tone({ frequency: 420, slideTo: 620, duration: 0.1, volume: 0.08, type: "triangle" });
}

function playWinSound() {
  tone({ frequency: 360, slideTo: 540, duration: 0.18, volume: 0.1, type: "triangle" });
  tone({ frequency: 540, slideTo: 760, duration: 0.22, volume: 0.08, type: "triangle" });
}

function playMusicPulse() {
  const notes = [246.94, 293.66, 329.63, 392];
  const note = notes[Math.floor((performance.now() / 360) % notes.length)];
  tone({ frequency: note, slideTo: note * 1.01, duration: 0.16, volume: 0.045, type: "triangle" });
}

function startAmbientMusic() {
  const audio = ensureAudio();
  if (!audio || ambientNodes) return;
  ambientNodes = {
    nextShift: performance.now() + 260,
    chordIndex: 0,
    step: 0
  };
}

function stopAmbientMusic() {
  ambientNodes = null;
}

function updateAmbientMusic() {
  if (!ambientNodes || !audioContext) return;
  const nowPerf = performance.now();
  if (nowPerf < ambientNodes.nextShift) return;

  const chords = [
    [246.94, 311.13, 369.99],
    [220, 293.66, 369.99],
    [261.63, 329.63, 392],
    [196, 293.66, 349.23]
  ];
  const chord = chords[ambientNodes.chordIndex % chords.length];
  const note = chord[ambientNodes.step % chord.length];
  const bass = note / 2;

  tone({ frequency: bass, slideTo: bass * 1.01, duration: 0.18, volume: 0.04, type: "sine" });
  tone({ frequency: note, slideTo: note * 1.005, duration: 0.12, volume: 0.045, type: "triangle" });

  if (ambientNodes.step % 2 === 0) {
    tone({ frequency: note * 2, slideTo: note * 2.01, duration: 0.07, volume: 0.02, type: "square" });
  }

  ambientNodes.step += 1;
  if (ambientNodes.step >= 6) {
    ambientNodes.step = 0;
    ambientNodes.chordIndex += 1;
    ambientNodes.nextShift = nowPerf + 520;
  } else {
    ambientNodes.nextShift = nowPerf + 260;
  }
}

function playUiOpenSound() {
  tone({ frequency: 280, slideTo: 420, duration: 0.08, volume: 0.05, type: "triangle" });
}

function playUiCloseSound() {
  tone({ frequency: 420, slideTo: 240, duration: 0.08, volume: 0.05, type: "triangle" });
}

function playStartSound() {
  tone({ frequency: 240, slideTo: 360, duration: 0.08, volume: 0.06, type: "square" });
  tone({ frequency: 360, slideTo: 540, duration: 0.14, volume: 0.05, type: "triangle" });
}

function playPauseSound() {
  tone({ frequency: 320, slideTo: 260, duration: 0.06, volume: 0.045, type: "square" });
}

function playResumeSound() {
  tone({ frequency: 260, slideTo: 340, duration: 0.06, volume: 0.045, type: "square" });
}

function playCoinSound() {
  tone({ frequency: 680, slideTo: 980, duration: 0.07, volume: 0.06, type: "triangle" });
}

function playShieldSound() {
  tone({ frequency: 320, slideTo: 760, duration: 0.14, volume: 0.08, type: "triangle" });
}

function playPurchaseSound() {
  tone({ frequency: 420, slideTo: 620, duration: 0.08, volume: 0.06, type: "triangle" });
  tone({ frequency: 620, slideTo: 860, duration: 0.12, volume: 0.04, type: "triangle" });
}

function playErrorSound() {
  tone({ frequency: 190, slideTo: 120, duration: 0.09, volume: 0.055, type: "square" });
}

function playTabSound() {
  tone({ frequency: 300, slideTo: 420, duration: 0.05, volume: 0.035, type: "triangle" });
}

function playBossBurstSound() {
  tone({ frequency: 150, slideTo: 90, duration: 0.18, volume: 0.08, type: "sawtooth" });
  tone({ frequency: 420, slideTo: 220, duration: 0.12, volume: 0.05, type: "square" });
}

function playBossJumpSound() {
  tone({ frequency: 220, slideTo: 640, duration: 0.12, volume: 0.07, type: "triangle" });
}

function playHazardSound() {
  tone({ frequency: 260, slideTo: 180, duration: 0.18, volume: 0.05, type: "sawtooth" });
}

function playGameOverSound() {
  tone({ frequency: 260, slideTo: 120, duration: 0.2, volume: 0.08, type: "square" });
  tone({ frequency: 180, slideTo: 90, duration: 0.26, volume: 0.06, type: "triangle" });
}

function playRestartSound() {
  tone({ frequency: 220, slideTo: 440, duration: 0.12, volume: 0.05, type: "triangle" });
}

function playFullscreenSound() {
  tone({ frequency: 360, slideTo: 720, duration: 0.1, volume: 0.05, type: "triangle" });
}

function playFullscreenFailSound() {
  tone({ frequency: 210, slideTo: 150, duration: 0.08, volume: 0.05, type: "square" });
}

function playWeaponSwitchSound() {
  tone({ frequency: 340, slideTo: 520, duration: 0.06, volume: 0.05, type: "triangle" });
}

function playModeSelectSound() {
  tone({ frequency: 260, slideTo: 390, duration: 0.07, volume: 0.045, type: "triangle" });
}

function playInterfaceSelectSound() {
  tone({ frequency: 300, slideTo: 470, duration: 0.07, volume: 0.04, type: "triangle" });
}

function playColorPickSound() {
  tone({ frequency: 480, slideTo: 620, duration: 0.05, volume: 0.035, type: "sine" });
}

function playBindListenSound() {
  tone({ frequency: 520, slideTo: 760, duration: 0.06, volume: 0.04, type: "triangle" });
}

function playBindSetSound() {
  tone({ frequency: 640, slideTo: 820, duration: 0.08, volume: 0.045, type: "triangle" });
}

function playRotateDismissSound() {
  tone({ frequency: 280, slideTo: 180, duration: 0.08, volume: 0.04, type: "triangle" });
}

function playHealSound() {
  tone({ frequency: 500, slideTo: 700, duration: 0.09, volume: 0.05, type: "triangle" });
}

function playLevelUpSound() {
  tone({ frequency: 340, slideTo: 560, duration: 0.11, volume: 0.06, type: "triangle" });
  tone({ frequency: 560, slideTo: 820, duration: 0.14, volume: 0.05, type: "triangle" });
}

function playRestartManualSound() {
  tone({ frequency: 260, slideTo: 520, duration: 0.1, volume: 0.05, type: "triangle" });
}

function spawnBurst(x, y, color, count = 8, speed = 220) {
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const power = speed * (0.4 + Math.random() * 0.8);
    world.particles.push({
      x,
      y,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power,
      life: 0.25 + Math.random() * 0.35,
      maxLife: 0.25 + Math.random() * 0.35,
      size: 2 + Math.random() * 4,
      color
    });
  }
}

function randomSpawn(side = "enemy") {
  const fromLeft = side === "ally";
  for (let tries = 0; tries < 100; tries += 1) {
    const x = fromLeft ? 220 + Math.random() * 380 : arena.width - 220 - Math.random() * 380;
    const y = 180 + Math.random() * (arena.height - 360);
    const probe = { x, y, radius: 48 };
    const blocked = obstacles.some((rect) => circleIntersectsRect(probe, rect));
    const tooNearPlayer = player && length(player.x - x, player.y - y) < 220;
    if (!blocked && !tooNearPlayer) {
      return { x, y };
    }
  }
  return fromLeft ? { x: 420, y: 680 } : { x: 1780, y: 700 };
}

function spawnApple() {
  if (world.pickups.length >= 5) return;
  for (let tries = 0; tries < 60; tries += 1) {
    const x = 220 + Math.random() * (arena.width - 440);
    const y = 220 + Math.random() * (arena.height - 440);
    const probe = { x, y, radius: 28 };
    const blocked = obstacles.some((rect) => circleIntersectsRect(probe, rect));
    const tooNearActor = [player, ally, ...enemies].some((entity) => entity && entity.hp > 0 && length(entity.x - x, entity.y - y) < 160);
    if (!blocked && !tooNearActor) {
      const roll = Math.random();
      const kind = roll < 0.48 ? "apple" : roll < 0.84 ? "coin" : "shield";
      spawnPickup(kind, x, y);
      return;
    }
  }
}

function spawnPickup(kind, x, y) {
  const radius = kind === "coin" ? 16 : kind === "shield" ? 22 : 20;
  world.pickups.push({ x, y, radius, pulse: Math.random() * Math.PI * 2, kind });
}

function collectApple(entity, appleIndex) {
  const pickup = world.pickups[appleIndex];
  if (!pickup) return;

  if (pickup.kind === "apple") {
    entity.hp = clamp(entity.hp + 28, 0, entity.maxHp);
    entity.energy = clamp(entity.energy + 24, 0, entity.maxEnergy);
    spawnBurst(pickup.x, pickup.y, "#9cff88", 10, 180);
    if (entity === player) {
      world.session.apples += 1;
      lifetimeStats.apples += 1;
      saveStats();
    }
    playAppleSound();
    if (entity === player) playHealSound();
  } else if (pickup.kind === "coin") {
    spawnBurst(pickup.x, pickup.y, "#ffd166", 10, 190);
    if (entity === player) {
      addCoins(2);
      lifetimeStats.coinsEarned += 2;
      saveProgress();
      saveStats();
      playCoinSound();
    }
  } else if (pickup.kind === "shield") {
    spawnBurst(pickup.x, pickup.y, "#63ebff", 14, 220);
    entity.shieldTimer = Math.max(entity.shieldTimer, 10);
    if (entity === player) {
      playShieldSound();
    }
  }

  world.pickups.splice(appleIndex, 1);
}

function fireWeapon(entity, targetX, targetY, options = {}) {
  if (entity.reload > 0 || entity.hp <= 0) return;
  const weaponId = options.weapon || settings.weapon;
  const config = weaponConfigs[weaponId];
  const dx = targetX - entity.x;
  const dy = targetY - entity.y;
  const baseAngle = Math.atan2(dy, dx);
  entity.angle = baseAngle;

  for (let i = 0; i < config.pellets; i += 1) {
    const spread = (Math.random() - 0.5) * config.spread;
    const angle = baseAngle + spread;
    world.bullets.push({
      x: entity.x + Math.cos(angle) * (entity.radius + 8),
      y: entity.y + Math.sin(angle) * (entity.radius + 8),
      vx: Math.cos(angle) * config.speed,
      vy: Math.sin(angle) * config.speed,
      radius: (options.radius || settings.bulletSize) * config.radiusMul * (config.pellets > 1 ? 0.9 : 1),
      damage: (options.damage || (settings.bulletDamage + progress.attackTier * 2.5)) * config.damageMul,
      color: options.color || (entity.team === "ally" ? settings.bulletColor : "#ff7f98"),
      life: config.life,
      team: entity.team,
      sourceArchetype: entity.archetype,
      style: entity.team === "ally" ? settings.bulletStyle : (entity.archetype === "boss" ? "plasma" : entity.preferredWeapon === "sniper" ? "streak" : "dot")
    });
  }

  const playerReloadBoost = entity === player ? Math.max(0.56, 1 - progress.fireTier * 0.06) : 1;
  entity.reload = (options.reload ?? config.reload) * playerReloadBoost;
  if (entity === player) {
    world.session.shots += config.pellets;
    lifetimeStats.shots += config.pellets;
    lifetimeStats.weaponUsage[weaponId] = (lifetimeStats.weaponUsage[weaponId] || 0) + config.pellets;
    saveStats();
  }
  spawnBurst(entity.x + Math.cos(baseAngle) * entity.radius, entity.y + Math.sin(baseAngle) * entity.radius, options.color || settings.bulletColor, config.burstFx, 90 + config.shake * 8);
  if (entity === player) {
    cameraShake = Math.max(cameraShake, config.shake);
    playShootSound(weaponId);
    vibrate(12);
  }
}

function dash(entity, dirX, dirY) {
  if (entity.dashCooldown > 0 || entity.energy < 18 || entity.hp <= 0) return;
  const dir = normalize(dirX, dirY);
  const power = entity === player ? 3420 + progress.dashTier * 312 : 1180;
  entity.vx += dir.x * power;
  entity.vy += dir.y * power;
  entity.energy = clamp(entity.energy - (entity === player ? Math.max(8, 18 - progress.dashTier * 2) : 18), 0, entity.maxEnergy);
  entity.dashCooldown = entity === player ? 0.22 : 1;
  spawnBurst(entity.x, entity.y, entity.color, 14, 260);
  if (entity === player) {
    world.session.dashes += 1;
    lifetimeStats.dashes += 1;
    saveStats();
    cameraShake = 10;
    playDashSound();
    vibrate([18, 12, 18]);
  }
}

function damageEntity(entity, amount, fromColor, sourceArchetype = "enemy") {
  if (!entity || entity.hp <= 0) return;
  if (entity.shieldTimer > 0) {
    spawnBurst(entity.x, entity.y, "#63ebff", 8, 160);
    if (entity === player) {
      tone({ frequency: 420, slideTo: 220, duration: 0.06, volume: 0.08, type: "square" });
    }
    return;
  }
  entity.hp = clamp(entity.hp - amount, 0, entity.maxHp);
  if (entity === player) {
    lastPlayerHitKind = sourceArchetype === "boss" ? "boss" : "enemy";
  }
  entity.hitFlash = 0.14;
  impactFlash = 0.14;
  spawnBurst(entity.x, entity.y, fromColor, 10, 220);
  playHitSound();

  if (entity.hp <= 0) {
    spawnBurst(entity.x, entity.y, fromColor, 18, 320);
    cameraShake = Math.max(cameraShake, 14);
    if (entity.team === "enemy") {
      world.session.kills += 1;
      lifetimeStats.kills += 1;
      const coinReward = entity.archetype === "boss" ? 10 : 5;
      addCoins(coinReward);
      lifetimeStats.coinsEarned += coinReward;
      if (entity.archetype === "boss") lifetimeStats.bosses += 1;
      saveStats();
      saveProgress();
    }
  }
}

function updateEntityCooldowns(entity, dt) {
  entity.reload = Math.max(0, entity.reload - dt);
  entity.dashCooldown = Math.max(0, entity.dashCooldown - dt);
  entity.hitFlash = Math.max(0, entity.hitFlash - dt);
  entity.shieldTimer = Math.max(0, entity.shieldTimer - dt);
  entity.patternCooldown = Math.max(0, entity.patternCooldown - dt);
  entity.energy = clamp(entity.energy + dt * 14, 0, entity.maxEnergy);
}

function updatePlayer(dt) {
  if (!player || player.hp <= 0) return;
  const moveX = ((isPressed("right") ? 1 : 0) - (isPressed("left") ? 1 : 0)) + mobileMoveAxis("x");
  const moveY = ((isPressed("backward") ? 1 : 0) - (isPressed("forward") ? 1 : 0)) + mobileMoveAxis("y");
  const move = normalize(moveX, moveY);
  const moving = moveX !== 0 || moveY !== 0;
  const accel = moving ? 1750 : 1150;
  const drag = moving ? 7.4 : 10.6;
  const speed = 430;

  player.vx += move.x * accel * dt;
  player.vy += move.y * accel * dt;
  player.vx *= Math.exp(-drag * dt);
  player.vy *= Math.exp(-drag * dt);

  const velocity = length(player.vx, player.vy);
  if (velocity > speed) {
    const n = normalize(player.vx, player.vy);
    player.vx = n.x * speed;
    player.vy = n.y * speed;
  }

  if (moving) {
    footTimer -= dt;
    if (footTimer <= 0) {
      playStepSound(velocity / speed);
      footTimer = 0.16;
    }
  } else {
    footTimer = 0;
  }

  player.x = clamp(player.x + player.vx * dt, player.radius, arena.width - player.radius);
  player.y = clamp(player.y + player.vy * dt, player.radius, arena.height - player.radius);
  obstacles.forEach((rect) => resolveCircleRect(player, rect));

  const worldPoint = screenToWorld(pointer.x, pointer.y);
  player.angle = Math.atan2(worldPoint.y - player.y, worldPoint.x - player.x);

  if (isFiring()) {
    fireWeapon(player, worldPoint.x, worldPoint.y);
  }
}

function updateBot(entity, dt) {
  if (!entity || entity.hp <= 0) return;
  const opponents = entity.team === "ally" ? livingEnemies() : livingAllies();
  if (!opponents.length) return;
  const target = nearestTarget(entity, opponents);
  if (!target) return;

  const dx = target.x - entity.x;
  const dy = target.y - entity.y;
  const dist = length(dx, dy);
  const dir = normalize(dx, dy);
  const orbit = entity.team === "enemy" ? 1 : -1;
  const desiredRange = entity.team === "enemy" ? entity.desiredRange : 300;
  const strafe = dist > desiredRange ? 0.26 : 0.92;
  const speed = entity.team === "enemy" ? getDifficulty(world.level).enemySpeed * entity.speedMul : 300;

  entity.vx += (dir.x + -dir.y * strafe * orbit) * speed * dt * 1.2;
  entity.vy += (dir.y + dir.x * strafe * orbit) * speed * dt * 1.2;
  entity.vx *= Math.exp(-6.5 * dt);
  entity.vy *= Math.exp(-6.5 * dt);

  const limit = entity.team === "enemy" ? speed : 320;
  const current = length(entity.vx, entity.vy);
  if (current > limit) {
    const n = normalize(entity.vx, entity.vy);
    entity.vx = n.x * limit;
    entity.vy = n.y * limit;
  }

  entity.x = clamp(entity.x + entity.vx * dt, entity.radius, arena.width - entity.radius);
  entity.y = clamp(entity.y + entity.vy * dt, entity.radius, arena.height - entity.radius);
  obstacles.forEach((rect) => resolveCircleRect(entity, rect));

  entity.angle = Math.atan2(dy, dx);

  if (canSee(entity, target) && dist < 760) {
    const weapon = entity.team === "enemy" ? entity.preferredWeapon : "rifle";
    const diff = getDifficulty(world.level);
    fireWeapon(entity, target.x, target.y, {
      weapon,
      color: entity.team === "enemy" ? "#ff7f98" : "#7ae1ff",
      radius: entity.team === "enemy" ? (entity.archetype === "boss" ? 7 : 5.5) : 5,
      damage: entity.team === "enemy" ? entity.damageValue || diff.enemyDamage : 8,
      reload: entity.team === "enemy" ? entity.reloadValue || diff.enemyReload : weaponConfigs.rifle.reload
    });
  }

  if (dist < 170 && entity.dashCooldown <= 0 && Math.random() < entity.dashChance) {
    dash(entity, dir.x, dir.y);
  }
}

function fireBossRadialBurst(entity) {
  const bullets = 12;
  for (let i = 0; i < bullets; i += 1) {
    const angle = (Math.PI * 2 * i) / bullets;
    world.bullets.push({
      x: entity.x + Math.cos(angle) * (entity.radius + 10),
      y: entity.y + Math.sin(angle) * (entity.radius + 10),
      vx: Math.cos(angle) * 520,
      vy: Math.sin(angle) * 520,
      radius: 8,
      damage: Math.max(7, entity.damageValue - 2),
      color: "#ffbd59",
      life: 1.1,
      team: "enemy",
      sourceArchetype: "boss"
    });
  }
  spawnBurst(entity.x, entity.y, "#ffbd59", 18, 180);
}

function spawnHazard(x, y, radius, life, type = "toxic", sourceArchetype = "enemy") {
  world.hazards.push({ x, y, radius, life, maxLife: life, type, tick: 0, sourceArchetype });
}

function updateBossPatterns(dt) {
  enemies.forEach((enemy) => {
    if (enemy.hp <= 0 || enemy.archetype !== "boss" || enemy.patternCooldown > 0) return;
    const roll = Math.random();
    if (roll < 0.38) {
      fireBossRadialBurst(enemy);
      ui.status.textContent = "Le boss lance une salve circulaire.";
      playBossBurstSound();
    } else if (roll < 0.7) {
      const chargeDir = normalize(player.x - enemy.x, player.y - enemy.y);
      enemy.vx += chargeDir.x * 760;
      enemy.vy += chargeDir.y * 760;
      spawnBurst(enemy.x, enemy.y, "#ff8c66", 16, 180);
      ui.status.textContent = "Le boss fait une charge brutale.";
      playBossJumpSound();
    } else {
      spawnHazard(player.x, player.y, 120, 6, "toxic", "boss");
      ui.status.textContent = "Zone toxique posee par le boss.";
      playHazardSound();
    }
    cameraShake = Math.max(cameraShake, 8);
    enemy.patternCooldown = 2.8;
  });
}

function updateHazards(dt) {
  world.hazards = world.hazards.filter((hazard) => {
    hazard.life -= dt;
    hazard.tick -= dt;
    if (hazard.life <= 0) return false;
    if (hazard.tick <= 0) {
      [player, ally, ...enemies].filter(Boolean).forEach((entity) => {
        if (entity.hp <= 0) return;
        if (length(entity.x - hazard.x, entity.y - hazard.y) <= hazard.radius + entity.radius) {
          damageEntity(entity, hazard.type === "toxic" ? 6 : 4, hazard.type === "toxic" ? "#8bff84" : "#ffd166", hazard.sourceArchetype);
        }
      });
      hazard.tick = 0.55;
    }
    return true;
  });
}

function updateSpecialEvent(dt) {
  world.eventPulse += dt;
  world.eventTimer -= dt;
  if (world.eventType === "coinrain" && world.eventTimer <= 0) {
    for (let i = 0; i < 2; i += 1) {
      const x = 220 + Math.random() * (arena.width - 440);
      const y = 220 + Math.random() * (arena.height - 440);
      spawnPickup("coin", x, y);
    }
    world.eventTimer = 2.2;
  } else if (world.eventType === "toxic" && world.eventTimer <= 0) {
    const x = 280 + Math.random() * (arena.width - 560);
    const y = 220 + Math.random() * (arena.height - 440);
    spawnHazard(x, y, 96, 5.5, "toxic", "enemy");
    world.eventTimer = 4.4;
    playHazardSound();
  } else if (world.eventType === "bonus" && world.eventTimer <= 0) {
    spawnPickup("coin", clamp(player.x + 50, 120, arena.width - 120), clamp(player.y, 120, arena.height - 120));
    world.eventTimer = 3.6;
  }
}

function updateBullets(dt) {
  const actors = [player, ally, ...enemies].filter(Boolean);
  world.bullets = world.bullets.filter((bullet) => {
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    bullet.life -= dt;
    if (bullet.life <= 0) return false;
    if (bullet.x < -60 || bullet.y < -60 || bullet.x > arena.width + 60 || bullet.y > arena.height + 60) return false;

    const probe = { x: bullet.x, y: bullet.y, radius: bullet.radius };
    if (obstacles.some((rect) => circleIntersectsRect(probe, rect))) {
      spawnBurst(bullet.x, bullet.y, bullet.color, 5, 90);
      return false;
    }

    for (const entity of actors) {
      if (!entity || entity.hp <= 0 || entity.team === bullet.team) continue;
      if (length(entity.x - bullet.x, entity.y - bullet.y) <= entity.radius + bullet.radius) {
        damageEntity(entity, bullet.damage, bullet.color, bullet.sourceArchetype);
        return false;
      }
    }

    return true;
  });
}

function updateParticles(dt) {
  world.particles = world.particles.filter((particle) => {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= Math.exp(-4.2 * dt);
    particle.vy *= Math.exp(-4.2 * dt);
    particle.life -= dt;
    return particle.life > 0;
  });
}

function updateApples(dt) {
  appleTimer -= dt;
  if (appleTimer <= 0) {
    spawnApple();
    appleTimer = 4.8 + Math.random() * 3.2;
  }

  world.pickups.forEach((pickup) => {
    pickup.pulse += dt * 4;
  });

  const actors = [player, ally, ...enemies].filter((entity) => entity && entity.hp > 0);
  for (let i = world.pickups.length - 1; i >= 0; i -= 1) {
    const apple = world.pickups[i];
    for (const entity of actors) {
      if (length(entity.x - apple.x, entity.y - apple.y) <= entity.radius + apple.radius) {
        collectApple(entity, i);
        break;
      }
    }
  }
}

function updateGame(dt) {
  if (!player) return;
  if (mobile.enabled && mobile.aiming) updateVirtualPointerFromAim();
  lifetimeStats.timePlayed += dt;
  statsSaveTimer -= dt;
  updateEntityCooldowns(player, dt);
  if (ally) updateEntityCooldowns(ally, dt);
  enemies.forEach((enemy) => updateEntityCooldowns(enemy, dt));

  updatePlayer(dt);
  if (ally) updateBot(ally, dt);
  enemies.forEach((enemy) => updateBot(enemy, dt));
  updateBossPatterns(dt);
  updateBullets(dt);
  updateParticles(dt);
  updateApples(dt);
  updateSpecialEvent(dt);
  updateHazards(dt);

  impactFlash = Math.max(0, impactFlash - dt);
  cameraShake = Math.max(0, cameraShake - dt * 24);
  levelToast = Math.max(0, levelToast - dt);

  enemies = enemies.filter((enemy) => enemy.hp > 0);
  if (ally && ally.hp <= 0) ally = null;

  if (player.hp <= 0 && !gameOver) {
    gameOver = true;
    restartTimer = settings.restartDelay;
    addCoins(lastPlayerHitKind === "boss" ? -20 : -10);
    saveProgress();
    ui.status.textContent = `Vous etes KO. Restart dans ${settings.restartDelay}s.`;
    playGameOverSound();
  }

  if (gameOver) {
    if (settings.autoRestart) {
      restartTimer -= dt;
      ui.status.textContent = `Vous etes KO. Restart dans ${Math.max(0, restartTimer).toFixed(1)}s.`;
      if (restartTimer <= 0) {
        playRestartSound();
        restartRun();
      }
    }
    renderUI();
    if (statsSaveTimer <= 0) {
      saveStats();
      statsSaveTimer = 3;
    }
    return;
  }

  if (enemies.length === 0) {
    playWinSound();
    resetLevel(world.level + 1, false);
    return;
  }

  renderUI();
  if (statsSaveTimer <= 0) {
    saveStats();
    statsSaveTimer = 3;
  }
}

function roundRect(x, y, w, h, radius) {
  const safeRadius = Math.max(0, Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.arcTo(x + w, y, x + w, y + h, safeRadius);
  ctx.arcTo(x + w, y + h, x, y + h, safeRadius);
  ctx.arcTo(x, y + h, x, y, safeRadius);
  ctx.arcTo(x, y, x + w, y, safeRadius);
  ctx.closePath();
}

function drawBackground(camera) {
  const view = viewSize();
  const gradient = ctx.createLinearGradient(0, 0, 0, view.height);
  if (world.theme === "ember") {
    gradient.addColorStop(0, "#2c1610");
    gradient.addColorStop(1, "#110a08");
  } else if (world.theme === "toxic") {
    gradient.addColorStop(0, "#0b2a1d");
    gradient.addColorStop(1, "#08150f");
  } else {
    gradient.addColorStop(0, "#0f2430");
    gradient.addColorStop(1, "#081119");
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, view.width, view.height);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  ctx.strokeStyle = world.theme === "ember"
    ? "rgba(255,167,120,0.05)"
    : world.theme === "toxic"
      ? "rgba(145,255,135,0.05)"
      : "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= arena.width; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, arena.height);
    ctx.stroke();
  }
  for (let y = 0; y <= arena.height; y += 120) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(arena.width, y);
    ctx.stroke();
  }

  roundRect(40, 40, arena.width - 80, arena.height - 80, 120);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.stroke();
  ctx.setLineDash([10, 8]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,255,255,0.24)";
  ctx.stroke();
  ctx.setLineDash([]);

  obstacles.forEach((rect) => {
    const blockGradient = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.w, rect.y + rect.h);
    blockGradient.addColorStop(0, "rgba(29,52,66,0.95)");
    blockGradient.addColorStop(1, "rgba(10,22,30,0.98)");
    ctx.fillStyle = blockGradient;
    roundRect(rect.x, rect.y, rect.w, rect.h, 24);
    ctx.fill();
    ctx.strokeStyle = world.theme === "ember"
      ? "rgba(255,164,84,0.18)"
      : world.theme === "toxic"
        ? "rgba(145,255,135,0.18)"
        : "rgba(84,240,255,0.16)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.restore();
}

function drawApples(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.pickups.forEach((apple) => {
    const bob = Math.sin(apple.pulse) * 4;
    if (apple.kind === "coin") {
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ffd166";
      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.arc(apple.x, apple.y + bob, apple.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#8c5d00";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(apple.x, apple.y + bob, apple.radius - 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#8c5d00";
      ctx.font = "700 16px Rajdhani";
      ctx.textAlign = "center";
      ctx.fillText("$", apple.x, apple.y + bob + 6);
    } else if (apple.kind === "shield") {
      ctx.shadowBlur = 24;
      ctx.shadowColor = "#63ebff";
      ctx.fillStyle = "rgba(99,235,255,0.16)";
      ctx.beginPath();
      ctx.arc(apple.x, apple.y + bob, apple.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#63ebff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(apple.x, apple.y + bob, apple.radius - 3, Math.PI * 0.18, Math.PI * 0.82);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(apple.x - apple.radius * 0.46, apple.y + bob - 1);
      ctx.lineTo(apple.x - apple.radius * 0.26, apple.y + bob + apple.radius * 0.42);
      ctx.lineTo(apple.x + apple.radius * 0.26, apple.y + bob + apple.radius * 0.42);
      ctx.lineTo(apple.x + apple.radius * 0.46, apple.y + bob - 1);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.shadowBlur = 24;
      ctx.shadowColor = "#9cff88";
      ctx.fillStyle = "#a7ff8a";
      ctx.beginPath();
      ctx.arc(apple.x, apple.y + bob, apple.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#5fd159";
      ctx.fillRect(apple.x - 3, apple.y - apple.radius - 8 + bob, 6, 12);
      ctx.fillStyle = "#d2425f";
      ctx.beginPath();
      ctx.arc(apple.x - 6, apple.y + 3 + bob, apple.radius * 0.34, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.restore();
}

function drawHazards(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.hazards.forEach((hazard) => {
    const alpha = Math.min(0.32, hazard.life / Math.max(0.001, hazard.maxLife) * 0.32);
    ctx.fillStyle = hazard.type === "toxic" ? `rgba(125, 255, 120, ${alpha})` : `rgba(255, 209, 102, ${alpha})`;
    ctx.strokeStyle = hazard.type === "toxic" ? "rgba(145,255,135,0.48)" : "rgba(255,209,102,0.48)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}

function drawParticles(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.particles.forEach((particle) => {
    ctx.globalAlpha = particle.life / particle.maxLife;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawBullets(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.bullets.forEach((bullet) => {
    ctx.shadowBlur = 18;
    ctx.shadowColor = bullet.color;
    if (bullet.style === "streak") {
      const dir = normalize(bullet.vx, bullet.vy);
      ctx.strokeStyle = bullet.color;
      ctx.lineWidth = Math.max(2, bullet.radius * 1.4);
      ctx.beginPath();
      ctx.moveTo(bullet.x - dir.x * 12, bullet.y - dir.y * 12);
      ctx.lineTo(bullet.x + dir.x * 8, bullet.y + dir.y * 8);
      ctx.stroke();
    } else if (bullet.style === "plasma") {
      ctx.fillStyle = hexToRgba(bullet.color, 0.35);
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius * 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius * 1.15, 0, Math.PI * 2);
      ctx.fill();
    } else if (bullet.style === "spark") {
      ctx.strokeStyle = bullet.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bullet.x - 7, bullet.y);
      ctx.lineTo(bullet.x + 7, bullet.y);
      ctx.moveTo(bullet.x, bullet.y - 7);
      ctx.lineTo(bullet.x, bullet.y + 7);
      ctx.stroke();
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, Math.max(1.6, bullet.radius * 0.7), 0, Math.PI * 2);
      ctx.fill();
    } else if (bullet.style === "ring") {
      ctx.strokeStyle = bullet.color;
      ctx.lineWidth = Math.max(2, bullet.radius * 0.9);
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius * 1.55, 0, Math.PI * 2);
      ctx.stroke();
    } else if (bullet.style === "comet") {
      const dir = normalize(bullet.vx, bullet.vy);
      const tail = bullet.radius * 7;
      const gradient = ctx.createLinearGradient(
        bullet.x - dir.x * tail,
        bullet.y - dir.y * tail,
        bullet.x + dir.x * bullet.radius,
        bullet.y + dir.y * bullet.radius
      );
      gradient.addColorStop(0, hexToRgba(bullet.color, 0));
      gradient.addColorStop(0.6, hexToRgba(bullet.color, 0.55));
      gradient.addColorStop(1, "#ffffff");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(2, bullet.radius * 1.35);
      ctx.beginPath();
      ctx.moveTo(bullet.x - dir.x * tail, bullet.y - dir.y * tail);
      ctx.lineTo(bullet.x + dir.x * bullet.radius * 1.4, bullet.y + dir.y * bullet.radius * 1.4);
      ctx.stroke();
    } else if (bullet.style === "shard") {
      const dir = normalize(bullet.vx, bullet.vy);
      const side = perpendicular(dir.x, dir.y);
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.moveTo(bullet.x + dir.x * bullet.radius * 2.1, bullet.y + dir.y * bullet.radius * 2.1);
      ctx.lineTo(bullet.x - dir.x * bullet.radius * 1.7 + side.x * bullet.radius, bullet.y - dir.y * bullet.radius * 1.7 + side.y * bullet.radius);
      ctx.lineTo(bullet.x - dir.x * bullet.radius * 1.1 - side.x * bullet.radius, bullet.y - dir.y * bullet.radius * 1.1 - side.y * bullet.radius);
      ctx.closePath();
      ctx.fill();
    } else if (bullet.style === "bolt") {
      const dir = normalize(bullet.vx, bullet.vy);
      const side = perpendicular(dir.x, dir.y);
      ctx.strokeStyle = bullet.color;
      ctx.lineWidth = Math.max(2, bullet.radius);
      ctx.beginPath();
      ctx.moveTo(bullet.x - dir.x * 7, bullet.y - dir.y * 7);
      ctx.lineTo(bullet.x - dir.x * 2 + side.x * 3, bullet.y - dir.y * 2 + side.y * 3);
      ctx.lineTo(bullet.x + dir.x * 2 - side.x * 2, bullet.y + dir.y * 2 - side.y * 2);
      ctx.lineTo(bullet.x + dir.x * 8 + side.x * 2, bullet.y + dir.y * 8 + side.y * 2);
      ctx.stroke();
    } else if (bullet.style === "pulse") {
      ctx.strokeStyle = hexToRgba(bullet.color, 0.42);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius * 2.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius * 0.95, 0, Math.PI * 2);
      ctx.fill();
    } else if (bullet.style === "nova") {
      ctx.strokeStyle = bullet.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bullet.x - 8, bullet.y);
      ctx.lineTo(bullet.x + 8, bullet.y);
      ctx.moveTo(bullet.x, bullet.y - 8);
      ctx.lineTo(bullet.x, bullet.y + 8);
      ctx.moveTo(bullet.x - 5.5, bullet.y - 5.5);
      ctx.lineTo(bullet.x + 5.5, bullet.y + 5.5);
      ctx.moveTo(bullet.x + 5.5, bullet.y - 5.5);
      ctx.lineTo(bullet.x - 5.5, bullet.y + 5.5);
      ctx.stroke();
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, Math.max(1.8, bullet.radius * 0.7), 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawEntity(entity, camera) {
  if (!entity || entity.hp <= 0) return;
  const x = entity.x - camera.x;
  const y = entity.y - camera.y;
  const skin = skinCatalog[entity.skin];
  const glowColor = entity.hitFlash > 0 ? "#ffffff" : entity.color;

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = hexToRgba("#000000", 0.22);
  ctx.beginPath();
  ctx.ellipse(0, entity.radius + 10, entity.radius * 0.95, entity.radius * 0.34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(entity.angle);

  ctx.shadowBlur = 22;
  ctx.shadowColor = glowColor;
  ctx.fillStyle = entity.team === "enemy" ? "rgba(255,95,125,0.18)" : "rgba(84,240,255,0.18)";
  ctx.beginPath();
  ctx.arc(0, 0, entity.radius + 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(entity.color, 0.35);
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  roundRect(entity.radius * 0.2, -7, entity.radius + 18, 14, 8);
  ctx.fill();

  if (skin?.image && skinImages[entity.skin]?.complete) {
    const size = entity.radius * 1.52;
    ctx.save();
    ctx.rotate(-entity.angle);
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius * 0.92, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(skinImages[entity.skin], -size / 2, -size / 2, size, size);
    ctx.lineWidth = 3;
    ctx.strokeStyle = hexToRgba("#ffffff", 0.18);
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius * 0.92, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else if (entity.skin === "tank") {
    ctx.fillStyle = entity.color;
    roundRect(-entity.radius, -entity.radius * 0.78, entity.radius * 2, entity.radius * 1.56, 14);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    roundRect(-entity.radius * 0.4, -entity.radius * 0.4, entity.radius * 0.8, entity.radius * 0.8, 10);
    ctx.fill();
  } else {
    ctx.fillStyle = entity.color;
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius * 0.7, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();

  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRect(entity.x - 34, entity.y - entity.radius - 24, 68, 8, 999);
  ctx.fill();
  ctx.fillStyle = entity.team === "enemy" ? "#ff6f8d" : "#79f5b6";
  roundRect(entity.x - 34, entity.y - entity.radius - 24, 68 * (entity.hp / entity.maxHp), 8, 999);
  ctx.fill();
  ctx.restore();
}

function drawCrosshair() {
  if (!pointer.active || overlayOpen) return;
  ctx.save();
  ctx.translate(pointer.x, pointer.y);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(-6, 0);
  ctx.moveTo(18, 0);
  ctx.lineTo(6, 0);
  ctx.moveTo(0, -18);
  ctx.lineTo(0, -6);
  ctx.moveTo(0, 18);
  ctx.lineTo(0, 6);
  ctx.stroke();
  ctx.restore();
}

function drawToast() {
  if (levelToast <= 0) return;
  const view = viewSize();
  ctx.save();
  ctx.globalAlpha = levelToast;
  ctx.fillStyle = "rgba(7,20,27,0.82)";
  roundRect(view.width / 2 - 180, 34, 360, 72, 20);
  ctx.fill();
  ctx.fillStyle = "#54f0ff";
  ctx.font = "700 22px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillText(`Niveau ${world.level} - ${world.tier}`, view.width / 2, 64);
  ctx.fillStyle = "#e9f5ff";
  ctx.font = "600 16px Rajdhani";
  ctx.fillText(`${currentModeLabel()} / ${currentWeaponLabel()}`, view.width / 2, 88);
  ctx.restore();
}

function drawPause() {
  if (!paused || overlayOpen) return;
  const view = viewSize();
  ctx.save();
  ctx.fillStyle = "rgba(4,10,15,0.58)";
  ctx.fillRect(0, 0, view.width, view.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 40px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillText("PAUSE", view.width / 2, view.height / 2);
  ctx.font = "600 20px Rajdhani";
  ctx.fillText("Appuyez sur P pour reprendre", view.width / 2, view.height / 2 + 36);
  ctx.restore();
}

function drawDeath() {
  if (!gameOver) return;
  const view = viewSize();
  ctx.save();
  ctx.fillStyle = "rgba(4,0,0,0.42)";
  ctx.fillRect(0, 0, view.width, view.height);
  ctx.fillStyle = "#ff91a6";
  ctx.font = "700 42px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillText("VOUS ETES TOMBE", view.width / 2, view.height / 2 - 10);
  ctx.font = "600 22px Rajdhani";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Record: niveau ${bestLevel}`, view.width / 2, view.height / 2 + 24);
  ctx.restore();
}

function drawVignette() {
  const view = viewSize();
  const gradient = ctx.createRadialGradient(
    view.width / 2,
    view.height / 2,
    Math.min(view.width, view.height) * 0.2,
    view.width / 2,
    view.height / 2,
    Math.max(view.width, view.height) * 0.68
  );
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.34)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, view.width, view.height);

  if (impactFlash > 0) {
    ctx.fillStyle = `rgba(255,90,120,${impactFlash * 0.28})`;
    ctx.fillRect(0, 0, view.width, view.height);
  }
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const raw = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateVirtualPointerFromAim() {
  if (!player) return;
  const camera = getCamera();
  const playerScreenX = player.x - camera.x;
  const playerScreenY = player.y - camera.y;
  const aim = normalize(mobile.aimX, mobile.aimY);
  pointer.x = playerScreenX + aim.x * 180;
  pointer.y = playerScreenY + aim.y * 180;
  pointer.active = true;
}

function updateJoystickFromTouch(touch) {
  const rect = ui.joystickShell.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = touch.clientX - centerX;
  const dy = touch.clientY - centerY;
  const maxDistance = rect.width * 0.26;
  const dist = Math.min(maxDistance, Math.hypot(dx, dy));
  const dir = normalize(dx, dy);
  mobile.moveX = dir.x * (dist / maxDistance);
  mobile.moveY = dir.y * (dist / maxDistance);
  ui.joystickStick.style.transform = `translate(calc(-50% + ${mobile.moveX * maxDistance}px), calc(-50% + ${mobile.moveY * maxDistance}px))`;
}

function resetJoystick() {
  mobile.moveX = 0;
  mobile.moveY = 0;
  ui.joystickStick.style.transform = "translate(-50%, -50%)";
}

function updateDirectMoveFromTouch(touch) {
  if (!player) return;
  const rect = canvas.getBoundingClientRect();
  const camera = getCamera();
  const touchX = touch.clientX - rect.left;
  const touchY = touch.clientY - rect.top;
  const playerScreenX = player.x - camera.x;
  const playerScreenY = player.y - camera.y;
  const dx = touchX - playerScreenX;
  const dy = touchY - playerScreenY;
  const distance = Math.hypot(dx, dy);
  const deadZone = 26;
  if (distance <= deadZone) {
    mobile.moveX = 0;
    mobile.moveY = 0;
    return;
  }
  const dir = normalize(dx, dy);
  mobile.moveX = dir.x;
  mobile.moveY = dir.y;
}

function updateAimFromTouch(touch) {
  const rect = ui.aimPad.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const sensitivity = settings.touchSensitivity / 100;
  const rawX = touch.clientX - centerX;
  const rawY = touch.clientY - centerY;
  const maxRadius = rect.width * 0.28;
  const dist = Math.hypot(rawX, rawY) || 1;
  const ratio = dist > maxRadius ? maxRadius / dist : 1;
  const stickX = rawX * ratio;
  const stickY = rawY * ratio;
  mobile.aimX = rawX * sensitivity;
  mobile.aimY = rawY * sensitivity;
  mobile.aiming = true;
  mobile.firing = true;
  ui.aimStick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
  updateVirtualPointerFromAim();
}

function cycleWeapon() {
  const order = ["rifle", "shotgun", "sniper", "burst"];
  const index = order.indexOf(settings.weapon);
  settings.weapon = order[(index + 1) % order.length];
  saveSettings();
  playWeaponSwitchSound();
  renderUI();
}

function render() {
  const view = viewSize();
  ctx.clearRect(0, 0, view.width, view.height);
  if (!player) return;
  const camera = getCamera();
  drawBackground(camera);
  drawHazards(camera);
  drawApples(camera);
  drawParticles(camera);
  drawBullets(camera);
  drawEntity(player, camera);
  if (ally) drawEntity(ally, camera);
  enemies.forEach((enemy) => drawEntity(enemy, camera));
  drawToast();
  drawDeath();
  drawPause();
  drawVignette();
  drawCrosshair();
}

function requestFullscreenSafe() {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
  if (fullscreenElement) {
    const exit = document.exitFullscreen?.bind(document) || document.webkitExitFullscreen?.bind(document);
    if (exit) {
      Promise.resolve(exit()).then(() => {
        ui.status.textContent = "Mode plein ecran desactive.";
        playFullscreenSound();
      }).catch(() => {
        ui.status.textContent = "Impossible de quitter le plein ecran.";
        playFullscreenFailSound();
      });
    }
    return;
  }

  const target = document.documentElement;
  const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone;
  const request =
    target.requestFullscreen?.bind(target)
    || target.webkitRequestFullscreen?.bind(target)
    || ui.appShell?.requestFullscreen?.bind(ui.appShell)
    || ui.appShell?.webkitRequestFullscreen?.bind(ui.appShell);

  if (request) {
    Promise.resolve(request()).then(() => {
      if (mobile.enabled) {
        screen.orientation?.lock?.("landscape").catch(() => {});
      }
      ui.status.textContent = "Mode plein ecran active.";
      playFullscreenSound();
    }).catch(() => {
      if (mobile.enabled && isiPhone && isSafariBrowser && !standalone) {
        window.scrollTo(0, 1);
        settings.mobileUltraClean = true;
        saveSettings();
        renderUI();
        ui.status.textContent = "Sur iPhone Safari, ajoute le jeu a l'ecran d'accueil pour un vrai quasi plein ecran.";
        playFullscreenFailSound();
      }
    });
    return;
  }

  if (mobile.enabled && isiPhone && isSafariBrowser) {
    window.scrollTo(0, 1);
    settings.mobileUltraClean = true;
    saveSettings();
    renderUI();
    ui.status.textContent = standalone
      ? "Mode app iPhone actif."
      : "Safari iPhone bloque le vrai plein ecran web. Utilise 'Sur l'ecran d'accueil'.";
    if (standalone) playFullscreenSound();
    else playFullscreenFailSound();
    return;
  }

  ui.status.textContent = "Le plein ecran n'est pas disponible sur ce navigateur.";
  playFullscreenFailSound();
}

function tryAutoFullscreen() {
  if (!settings.autoFullscreen) return;
  if (document.fullscreenElement) return;
  requestFullscreenSafe();
}

function tick(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const rawDt = Math.min(0.05, (timestamp - lastTime) / 1000);
  lastTime = timestamp;

  const frameLimit = Number(settings.fpsCap);
  if (frameLimit > 0 && timestamp - lastRenderTime < 1000 / frameLimit) {
    requestAnimationFrame(tick);
    return;
  }
  lastRenderTime = timestamp;

  accumulator += rawDt;
  while (accumulator >= 1 / 120) {
    if (gameStarted && !overlayOpen && !paused) {
      updateGame(1 / 120);
    }
    accumulator -= 1 / 120;
  }

  musicClock += rawDt;
  if (musicClock >= 1.4 && gameStarted && !overlayOpen && !gameOver) {
    playMusicPulse();
    musicClock = 0;
  }

  if (gameStarted && !overlayOpen && !gameOver && !paused) {
    startAmbientMusic();
    updateAmbientMusic();
  } else if (ambientNodes && (overlayOpen || gameOver)) {
    stopAmbientMusic();
  }

  frameCounter += 1;
  frameTime += rawDt;
  if (frameTime >= 0.4) {
    shownFps = Math.round(frameCounter / frameTime);
    frameCounter = 0;
    frameTime = 0;
  }

  render();
  requestAnimationFrame(tick);
}

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
  pointer.active = true;
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

canvas.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;
  pointer.down = true;
  ensureAudio();
  tryAutoFullscreen();
});

window.addEventListener("mouseup", (event) => {
  if (event.button !== 0) return;
  pointer.down = false;
});

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const code = event.code;

  if (listeningAction) {
    event.preventDefault();
    setBinding(listeningAction, key);
    playBindSetSound();
    listeningAction = null;
    renderUI();
    return;
  }

  keys.add(key);

  if (key === "escape") {
    event.preventDefault();
    if (overlayOpen) closeOverlay();
    else openOverlay("play");
    return;
  }

  if (key === bindingKey("pause")) {
    event.preventDefault();
    if (overlayOpen) return;
    paused = !paused;
    if (paused) {
      stopAmbientMusic();
      ui.status.textContent = "Jeu en pause. Appuyez sur P pour reprendre.";
      playPauseSound();
    } else {
      startAmbientMusic();
      ui.status.textContent = `Niveau ${world.level} - ${world.tier} - ${currentModeLabel()} - ${eventLabel(world.eventType)}.`;
      playResumeSound();
    }
    return;
  }

  if (overlayOpen) {
    const startKeys = new Set([
      bindingKey("forward"),
      bindingKey("backward"),
      bindingKey("left"),
      bindingKey("right"),
      "enter",
      " "
    ]);
    if (startKeys.has(key)) {
      event.preventDefault();
      startMatch();
    }
    return;
  }

  if (key === bindingKey("restart")) {
    event.preventDefault();
    restartRun();
    return;
  }

  if (key === bindingKey("dash")) {
    event.preventDefault();
    const moveX = (isPressed("right") ? 1 : 0) - (isPressed("left") ? 1 : 0);
    const moveY = (isPressed("backward") ? 1 : 0) - (isPressed("forward") ? 1 : 0);
    const dir = moveX === 0 && moveY === 0
      ? { x: Math.cos(player.angle), y: Math.sin(player.angle) }
      : normalize(moveX, moveY);
    dash(player, dir.x, dir.y);
    return;
  }

  if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(code)) {
    const order = ["rifle", "shotgun", "sniper", "burst"];
    settings.weapon = order[["Digit1", "Digit2", "Digit3", "Digit4"].indexOf(code)];
    saveSettings();
    playWeaponSwitchSound();
    renderUI();
  }
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

window.addEventListener("resize", resize);

ui.menuButton.addEventListener("click", () => {
  ensureAudio();
  openOverlay("play");
});

ui.fullscreenButton.addEventListener("click", () => {
  ensureAudio();
  requestFullscreenSafe();
});

ui.closeHubButton.addEventListener("click", () => {
  closeOverlay();
});

ui.hubOverlay.addEventListener("click", (event) => {
  if (event.target === ui.hubOverlay) {
    closeOverlay();
  }
});

ui.startButton.addEventListener("click", () => {
  startMatch();
});

ui.tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

ui.shortcutTabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.openTab));
});

ui.interfaceChoices.forEach((button) => {
  button.addEventListener("click", () => {
    settings.interfaceMode = button.dataset.interface;
    saveSettings();
    syncMobileMode();
    playInterfaceSelectSound();
    renderUI();
  });
});

ui.modeChoices.forEach((button) => {
  button.addEventListener("click", () => {
    settings.mode = button.dataset.mode;
    saveSettings();
    playModeSelectSound();
    renderUI();
  });
});

ui.weaponChoices.forEach((button) => {
  button.addEventListener("click", () => {
    settings.weapon = button.dataset.weapon;
    saveSettings();
    playWeaponSwitchSound();
    renderUI();
  });
});

ui.bulletStyle.addEventListener("change", () => {
  settings.bulletStyle = ui.bulletStyle.value;
  saveSettings();
  renderUI();
});

ui.playerColor.addEventListener("input", () => {
  settings.playerColor = ui.playerColor.value;
  if (player) player.color = settings.playerColor;
  saveSettings();
  playColorPickSound();
  renderUI();
});

ui.masterVolume.addEventListener("input", () => {
  settings.masterVolume = Number(ui.masterVolume.value);
  saveSettings();
  renderUI();
});

ui.dashVolume.addEventListener("input", () => {
  settings.dashVolume = Number(ui.dashVolume.value);
  saveSettings();
  renderUI();
});

ui.fpsCap.addEventListener("change", () => {
  settings.fpsCap = Number(ui.fpsCap.value);
  saveSettings();
  renderUI();
});

ui.autoFullscreen.addEventListener("change", () => {
  settings.autoFullscreen = ui.autoFullscreen.checked;
  saveSettings();
});

ui.autoRestart.addEventListener("change", () => {
  settings.autoRestart = ui.autoRestart.checked;
  saveSettings();
});

ui.restartDelay.addEventListener("input", () => {
  settings.restartDelay = Number(ui.restartDelay.value);
  saveSettings();
  renderUI();
});

ui.mobileUltraClean.addEventListener("change", () => {
  settings.mobileUltraClean = ui.mobileUltraClean.checked;
  saveSettings();
  renderUI();
});

ui.mobileAutoFire.addEventListener("change", () => {
  settings.mobileAutoFire = ui.mobileAutoFire.checked;
  saveSettings();
  renderUI();
});

ui.mobileHaptics.addEventListener("change", () => {
  settings.mobileHaptics = ui.mobileHaptics.checked;
  saveSettings();
});

ui.touchSensitivity.addEventListener("input", () => {
  settings.touchSensitivity = Number(ui.touchSensitivity.value);
  saveSettings();
  renderUI();
});

ui.mobileButtonScale.addEventListener("input", () => {
  settings.mobileButtonScale = Number(ui.mobileButtonScale.value);
  saveSettings();
  renderUI();
});

[
  [ui.upgradeAttack, ui.quickUpgradeAttack, "attackTier"],
  [ui.upgradeVitality, ui.quickUpgradeVitality, "vitalityTier"],
  [ui.upgradeDash, ui.quickUpgradeDash, "dashTier"],
  [ui.upgradeFire, ui.quickUpgradeFire, "fireTier"]
].forEach(([mainButton, quickButton, key]) => {
  mainButton?.addEventListener("click", () => purchaseUpgrade(key));
  quickButton?.addEventListener("click", () => purchaseUpgrade(key));
});

ui.mobileDashButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  ensureAudio();
  tryAutoFullscreen();
  if (overlayOpen) {
    startMatch();
    return;
  }
  const moveX = mobile.moveX || Math.cos(player.angle);
  const moveY = mobile.moveY || Math.sin(player.angle);
  const dir = normalize(moveX, moveY);
  dash(player, dir.x, dir.y);
});

ui.mobileWeaponButton.addEventListener("click", (event) => {
  event.preventDefault();
  cycleWeapon();
});

ui.mobileMenuButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (overlayOpen) closeOverlay();
  else openOverlay("play");
});

ui.mobileFullscreenButton?.addEventListener("click", (event) => {
  event.preventDefault();
  requestFullscreenSafe();
});

ui.rotateFullscreenButton?.addEventListener("click", () => {
  rotateNoticeDismissed = true;
  requestFullscreenSafe();
  syncMobileMode();
});

ui.rotateDismissButton?.addEventListener("click", () => {
  rotateNoticeDismissed = true;
  playRotateDismissSound();
  syncMobileMode();
});

ui.joystickShell.addEventListener("touchstart", (event) => {
  if (!mobile.enabled) return;
  event.preventDefault();
  const touch = event.changedTouches[0];
  mobile.moveTouchId = touch.identifier;
  updateJoystickFromTouch(touch);
  ensureAudio();
  tryAutoFullscreen();
}, { passive: false });

canvas.addEventListener("touchstart", (event) => {
  if (!mobile.enabled || overlayOpen) return;
  ensureAudio();
  tryAutoFullscreen();
  const touch = event.changedTouches[0];
  const target = event.target;
  if (ui.aimPad.contains(target) || ui.mobileDashButton.contains(target) || ui.mobileWeaponButton.contains(target) || ui.mobileMenuButton.contains(target)) {
    return;
  }
  mobile.moveTouchId = touch.identifier;
  updateDirectMoveFromTouch(touch);
  const now = performance.now();
  if (now - mobile.lastTapTime < 260 && player) {
    const worldPoint = screenToWorld(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    fireWeapon(player, worldPoint.x, worldPoint.y);
  }
  mobile.lastTapTime = now;
}, { passive: true });

canvas.addEventListener("touchmove", (event) => {
  if (!mobile.enabled) return;
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.moveTouchId);
  if (!touch) return;
  event.preventDefault();
  updateDirectMoveFromTouch(touch);
}, { passive: false });

canvas.addEventListener("touchend", (event) => {
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.moveTouchId);
  if (!touch) return;
  mobile.moveTouchId = null;
  mobile.moveX = 0;
  mobile.moveY = 0;
}, { passive: false });

canvas.addEventListener("touchcancel", () => {
  mobile.moveTouchId = null;
  mobile.moveX = 0;
  mobile.moveY = 0;
}, { passive: false });

ui.joystickShell.addEventListener("touchmove", (event) => {
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.moveTouchId);
  if (!touch) return;
  event.preventDefault();
  updateJoystickFromTouch(touch);
}, { passive: false });

ui.joystickShell.addEventListener("touchend", (event) => {
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.moveTouchId);
  if (!touch) return;
  mobile.moveTouchId = null;
  resetJoystick();
}, { passive: false });

ui.joystickShell.addEventListener("touchcancel", () => {
  mobile.moveTouchId = null;
  resetJoystick();
}, { passive: false });

ui.aimPad.addEventListener("touchstart", (event) => {
  if (!mobile.enabled) return;
  event.preventDefault();
  const touch = event.changedTouches[0];
  mobile.aimTouchId = touch.identifier;
  updateAimFromTouch(touch);
  ensureAudio();
  tryAutoFullscreen();
  if (overlayOpen) startMatch();
}, { passive: false });

ui.aimPad.addEventListener("touchmove", (event) => {
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.aimTouchId);
  if (!touch) return;
  event.preventDefault();
  updateAimFromTouch(touch);
}, { passive: false });

ui.aimPad.addEventListener("touchend", (event) => {
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.aimTouchId);
  if (!touch) return;
  mobile.aimTouchId = null;
  mobile.aiming = false;
  mobile.firing = false;
  ui.aimStick.style.transform = "translate(-50%, -50%)";
}, { passive: false });

ui.aimPad.addEventListener("touchcancel", () => {
  mobile.aimTouchId = null;
  mobile.aiming = false;
  mobile.firing = false;
  ui.aimStick.style.transform = "translate(-50%, -50%)";
}, { passive: false });

document.addEventListener("touchmove", (event) => {
  if (!mobile.enabled) return;
  if (event.target === canvas || ui.mobileControls.contains(event.target)) {
    event.preventDefault();
  }
}, { passive: false });

document.addEventListener("gesturestart", (event) => {
  if (!mobile.enabled) return;
  event.preventDefault();
}, { passive: false });

document.addEventListener("gesturechange", (event) => {
  if (!mobile.enabled) return;
  event.preventDefault();
}, { passive: false });

document.addEventListener("gestureend", (event) => {
  if (!mobile.enabled) return;
  event.preventDefault();
}, { passive: false });

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) return;
  resetMobileInputs();
});

window.addEventListener("orientationchange", () => {
  resetMobileInputs();
  setTimeout(resize, 120);
});

window.visualViewport?.addEventListener("resize", () => {
  if (!mobile.enabled) return;
  resize();
});

document.querySelectorAll(".bind-button").forEach((button) => {
  button.addEventListener("click", () => {
    listeningAction = button.dataset.action;
    playBindListenSound();
    renderUI();
  });
});

coarseMedia = window.matchMedia("(pointer: coarse)");
coarseMedia.addEventListener?.("change", syncMobileMode);

resetLevel(1, true);
gameStarted = false;
overlayOpen = true;
paused = true;
canvas.classList.add("blocked");
ui.hubOverlay.classList.remove("hidden");
resize();
renderUI();
requestAnimationFrame(tick);
