const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");

const ui = {
  appShell: document.querySelector(".app-shell"),
  viewport: document.querySelector(".viewport"),
  minimapShell: document.querySelector(".minimap-shell"),
  platformGate: document.getElementById("platformGate"),
  platformHint: document.getElementById("platformHint"),
  platformPcButton: document.getElementById("platformPcButton"),
  platformMobileButton: document.getElementById("platformMobileButton"),
  tutorialBanner: document.getElementById("tutorialBanner"),
  tutorialDismissButton: document.getElementById("tutorialDismissButton"),
  combatBanner: document.getElementById("combatBanner"),
  combatBannerTag: document.getElementById("combatBannerTag"),
  combatBannerTitle: document.getElementById("combatBannerTitle"),
  combatBannerText: document.getElementById("combatBannerText"),
  levelLabel: document.getElementById("levelLabel"),
  bestLevel: document.getElementById("bestLevel"),
  modeLabel: document.getElementById("modeLabel"),
  platformLabel: document.getElementById("platformLabel"),
  weaponLabel: document.getElementById("weaponLabel"),
  coinsLabel: document.getElementById("coinsLabel"),
  powerLabel: document.getElementById("powerLabel"),
  comboLabel: document.getElementById("comboLabel"),
  objectiveLabel: document.getElementById("objectiveLabel"),
  bonusLabel: document.getElementById("bonusLabel"),
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
  mobileComboLabel: document.getElementById("mobileComboLabel"),
  mobileObjectiveLabel: document.getElementById("mobileObjectiveLabel"),
  mobileBonusLabel: document.getElementById("mobileBonusLabel"),
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
  rotateNotice: document.getElementById("rotateNotice"),
  rotateFullscreenButton: document.getElementById("rotateFullscreenButton"),
  rotateDismissButton: document.getElementById("rotateDismissButton"),
  hubOverlay: document.getElementById("hubOverlay"),
  closeHubButton: document.getElementById("closeHubButton"),
  reopenPlatformButton: document.getElementById("reopenPlatformButton"),
  tabButtons: [...document.querySelectorAll(".tab-button")],
  tabPanels: [...document.querySelectorAll(".tab-panel")],
  shortcutTabButtons: [...document.querySelectorAll("[data-open-tab]")],
  interfaceChoices: [...document.querySelectorAll("[data-interface]")],
  modeChoices: [...document.querySelectorAll("[data-mode]")],
  weaponChoices: [...document.querySelectorAll("[data-weapon]")],
  weaponPanel: document.getElementById("weaponPanel"),
  weaponPerkTag: document.getElementById("weaponPerkTag"),
  weaponPerkTitle: document.getElementById("weaponPerkTitle"),
  weaponPerkDesc: document.getElementById("weaponPerkDesc"),
  weaponStatOne: document.getElementById("weaponStatOne"),
  weaponStatTwo: document.getElementById("weaponStatTwo"),
  weaponStatThree: document.getElementById("weaponStatThree"),
  startButton: document.getElementById("startButton"),
  heroPlatformBadge: document.getElementById("heroPlatformBadge"),
  heroModeBadge: document.getElementById("heroModeBadge"),
  heroWeaponBadge: document.getElementById("heroWeaponBadge"),
  heroSkinBadge: document.getElementById("heroSkinBadge"),
  heroPlatformValue: document.getElementById("heroPlatformValue"),
  heroPlatformText: document.getElementById("heroPlatformText"),
  heroRecordValue: document.getElementById("heroRecordValue"),
  heroCoinsValue: document.getElementById("heroCoinsValue"),
  platformMemoryLabel: document.getElementById("platformMemoryLabel"),
  platformMemoryText: document.getElementById("platformMemoryText"),
  shopGrid: document.getElementById("shopGrid"),
  shopHint: document.getElementById("shopHint"),
  shopCoinsTotal: document.getElementById("shopCoinsTotal"),
  shopPowerTotal: document.getElementById("shopPowerTotal"),
  shopUpgradeTip: document.getElementById("shopUpgradeTip"),
  weaponShopGrid: document.getElementById("weaponShopGrid"),
  weaponShopHint: document.getElementById("weaponShopHint"),
  weaponShopCoinsTotal: document.getElementById("weaponShopCoinsTotal"),
  weaponShopEquipped: document.getElementById("weaponShopEquipped"),
  weaponShopOwnedCount: document.getElementById("weaponShopOwnedCount"),
  bulletStyle: document.getElementById("bulletStyle"),
  bulletPreview: document.getElementById("bulletPreview"),
  playerColor: document.getElementById("playerColor"),
  playerColorValue: document.getElementById("playerColorValue"),
  skinPreview: document.getElementById("skinPreview"),
  skinSpotlightName: document.getElementById("skinSpotlightName"),
  skinSpotlightTag: document.getElementById("skinSpotlightTag"),
  skinWeaponMiniGrid: document.getElementById("skinWeaponMiniGrid"),
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
  mobileHaptics: document.getElementById("mobileHaptics"),
  mobileButtonScale: document.getElementById("mobileButtonScale"),
  mobileButtonScaleValue: document.getElementById("mobileButtonScaleValue"),
  mobileAimSensitivity: document.getElementById("mobileAimSensitivity"),
  mobileAimSensitivityValue: document.getElementById("mobileAimSensitivityValue"),
  enemyLabel: document.getElementById("enemyLabel"),
  allyLabel: document.getElementById("allyLabel"),
  enemyTwoLabel: document.getElementById("enemyTwoLabel")
};

const {
  arena,
  weaponConfigs,
  weaponProfiles,
  weaponCatalog,
  starterWeaponIds,
  modeLabels,
  weaponCycleOrder,
  bulletStyles,
  skinCatalog,
  obstacleLayouts,
  mapCatalog,
  enemyArchetypeMeta
} = window.ARENA_DATA;
const {
  STORAGE_KEYS,
  defaultSettings,
  loadSettings,
  loadBestLevel,
  loadStats,
  loadProgress,
  loadHints,
  saveSettings: persistSettings,
  saveBestLevel: persistBestLevel,
  saveStats: persistStats,
  saveProgress: persistProgress,
  saveHints: persistHints
} = window.ARENA_STORAGE;
const STORAGE_AUDIO_BOOST = STORAGE_KEYS.audioBoost;

let obstacles = obstacleLayouts[0].map((rect) => ({ ...rect }));

const textureTileCache = {};

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function makeSeededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function getMapTextureTile(map) {
  const key = map.id;
  if (textureTileCache[key]) return textureTileCache[key];

  const tile = document.createElement("canvas");
  tile.width = 320;
  tile.height = 320;
  const g = tile.getContext("2d");
  const rand = makeSeededRandom(hashString(map.id));

  g.clearRect(0, 0, tile.width, tile.height);

  g.strokeStyle = "rgba(255,255,255,0.025)";
  g.lineWidth = 1;
  for (let x = 0; x <= tile.width; x += 32) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, tile.height);
    g.stroke();
  }
  for (let y = 0; y <= tile.height; y += 32) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(tile.width, y);
    g.stroke();
  }

  for (let i = 0; i < 26; i += 1) {
    const x = rand() * tile.width;
    const y = rand() * tile.height;
    const w = 24 + rand() * 86;
    const h = 12 + rand() * 48;
    g.fillStyle = `rgba(255,255,255,${0.015 + rand() * 0.02})`;
    roundRectOn(g, x, y, w, h, 10);
    g.fill();
  }

  if (map.theme === "neo") {
    g.strokeStyle = "rgba(84,240,255,0.12)";
    g.lineWidth = 1.5;
    for (let i = 0; i < 12; i += 1) {
      const y = 18 + i * 24;
      g.beginPath();
      g.moveTo(18, y);
      g.lineTo(tile.width - 18, y + ((i % 2 === 0) ? 12 : -12));
      g.stroke();
    }
    for (let i = 0; i < 28; i += 1) {
      g.fillStyle = `rgba(84,240,255,${0.06 + rand() * 0.08})`;
      g.beginPath();
      g.arc(rand() * tile.width, rand() * tile.height, 1.2 + rand() * 2.1, 0, Math.PI * 2);
      g.fill();
    }
    for (let i = 0; i < 16; i += 1) {
      g.fillStyle = `rgba(90,215,255,${0.02 + rand() * 0.03})`;
      roundRectOn(g, rand() * tile.width, rand() * tile.height, 34 + rand() * 74, 16 + rand() * 32, 10);
      g.fill();
    }
    for (let i = 0; i < 12; i += 1) {
      const startX = rand() * tile.width;
      const startY = rand() * tile.height;
      g.strokeStyle = `rgba(180,245,255,${0.05 + rand() * 0.06})`;
      g.lineWidth = 1.2;
      g.beginPath();
      g.moveTo(startX, startY);
      for (let j = 0; j < 4; j += 1) {
        g.lineTo(startX + 24 + j * 22, startY + (rand() - 0.5) * 26 + j * 8);
      }
      g.stroke();
    }
  } else if (map.theme === "ember") {
    g.strokeStyle = "rgba(255,164,84,0.1)";
    g.lineWidth = 2;
    for (let i = 0; i < 10; i += 1) {
      const x = 20 + i * 30;
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + 54, tile.height);
      g.stroke();
    }
    for (let i = 0; i < 18; i += 1) {
      g.fillStyle = `rgba(255,120,70,${0.035 + rand() * 0.05})`;
      roundRectOn(g, rand() * tile.width, rand() * tile.height, 18 + rand() * 42, 6 + rand() * 12, 6);
      g.fill();
    }
    for (let i = 0; i < 20; i += 1) {
      const startX = rand() * tile.width;
      const startY = rand() * tile.height;
      g.strokeStyle = `rgba(255,210,138,${0.08 + rand() * 0.08})`;
      g.lineWidth = 1.5 + rand() * 2;
      g.beginPath();
      g.moveTo(startX, startY);
      for (let j = 0; j < 4; j += 1) {
        g.lineTo(startX + (rand() - 0.5) * 90 + j * 26, startY + (rand() - 0.5) * 70 + j * 20);
      }
      g.stroke();
    }
    for (let i = 0; i < 26; i += 1) {
      g.fillStyle = `rgba(255,92,54,${0.02 + rand() * 0.035})`;
      g.beginPath();
      g.arc(rand() * tile.width, rand() * tile.height, 6 + rand() * 18, 0, Math.PI * 2);
      g.fill();
    }
  } else if (map.theme === "toxic") {
    g.strokeStyle = "rgba(145,255,135,0.12)";
    g.lineWidth = 1.5;
    for (let i = 0; i < 18; i += 1) {
      const x = rand() * tile.width;
      const y = rand() * tile.height;
      g.beginPath();
      g.arc(x, y, 8 + rand() * 26, 0, Math.PI * 2);
      g.stroke();
    }
    for (let i = 0; i < 20; i += 1) {
      g.fillStyle = `rgba(145,255,135,${0.03 + rand() * 0.04})`;
      g.beginPath();
      g.arc(rand() * tile.width, rand() * tile.height, 6 + rand() * 18, 0, Math.PI * 2);
      g.fill();
    }
    for (let i = 0; i < 26; i += 1) {
      g.fillStyle = `rgba(56,122,48,${0.03 + rand() * 0.04})`;
      roundRectOn(g, rand() * tile.width, rand() * tile.height, 20 + rand() * 42, 8 + rand() * 18, 10);
      g.fill();
    }
    for (let i = 0; i < 14; i += 1) {
      const x = rand() * tile.width;
      const y = rand() * tile.height;
      g.strokeStyle = `rgba(196,255,170,${0.04 + rand() * 0.06})`;
      g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(x, y);
      g.bezierCurveTo(x + 18, y - 20, x + 34, y + 18, x + 52, y - 8);
      g.stroke();
    }
  } else if (map.theme === "mirror") {
    g.strokeStyle = "rgba(141,212,255,0.11)";
    g.lineWidth = 1.4;
    for (let i = 0; i < 14; i += 1) {
      const x = 22 + i * 20;
      g.beginPath();
      g.moveTo(x, 18);
      g.lineTo(x + 22, tile.height - 18);
      g.stroke();
    }
    g.strokeStyle = "rgba(255,255,255,0.05)";
    for (let i = 0; i < 8; i += 1) {
      const y = 34 + i * 36;
      g.beginPath();
      g.moveTo(18, y);
      g.lineTo(tile.width - 18, y);
      g.stroke();
    }
    for (let i = 0; i < 18; i += 1) {
      g.fillStyle = `rgba(164,228,255,${0.025 + rand() * 0.04})`;
      roundRectOn(g, rand() * tile.width, rand() * tile.height, 28 + rand() * 60, 14 + rand() * 28, 8);
      g.fill();
    }
    for (let i = 0; i < 18; i += 1) {
      g.strokeStyle = `rgba(255,255,255,${0.03 + rand() * 0.03})`;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(rand() * tile.width, rand() * tile.height);
      g.lineTo(rand() * tile.width, rand() * tile.height);
      g.stroke();
    }
  }

  textureTileCache[key] = tile;
  return tile;
}

function roundRectOn(context, x, y, w, h, radius) {
  const safeRadius = Math.max(0, Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2));
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + w, y, x + w, y + h, safeRadius);
  context.arcTo(x + w, y + h, x, y + h, safeRadius);
  context.arcTo(x, y + h, x, y, safeRadius);
  context.arcTo(x, y, x + w, y, safeRadius);
  context.closePath();
}

const keys = new Set();
const pointer = { x: 0, y: 0, down: false, active: false };
const mobile = {
  enabled: false,
  moveTouchId: null,
  fireTouchId: null,
  aimTouchId: null,
  moveX: 0,
  moveY: 0,
  aimX: 1,
  aimY: 0
};
const skinImages = {};
Object.entries(skinCatalog).forEach(([id, entry]) => {
  if (entry.image) {
    const img = new Image();
    img.src = entry.image;
    skinImages[id] = img;
  }
});
const audioCatalog = {
  rifle: ["assets/audio/rifle.wav"],
  shotgun: ["assets/audio/shotgun.wav"],
  sniper: ["assets/audio/sniper.wav"],
  burst: ["assets/audio/burst.wav"],
  dash: ["assets/audio/dash.wav"],
  hit: ["assets/audio/hit.wav"],
  coin: ["assets/audio/coin.wav"],
  shield: ["assets/audio/shield.wav"],
  purchase: ["assets/audio/purchase.wav"],
  boss: ["assets/audio/boss.wav"],
  level: ["assets/audio/level.wav"],
  ambientLoop: ["assets/audio/ambient_loop.wav"]
};
const audioPools = {};
Object.entries(audioCatalog).forEach(([key, sources]) => {
  audioPools[key] = sources.map((src) => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.loop = key === "ambientLoop";
    return audio;
  });
});

let settings = loadSettings();
let bestLevel = loadBestLevel();
let lifetimeStats = loadStats();
let progress = loadProgress();
let hints = loadHints();
let listeningAction = null;
let currentTab = "play";
let audioContext = null;
let audioAssetsPrimed = false;
let musicClock = 0;
let ambientNodes = null;
let ambientLoopTrack = null;
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
let hitMarkerTimer = 0;
let hitMarkerColor = "#ffffff";
let minimapVisible = true;
let combatBannerTimer = 0;
let uiRefreshTimer = 0;
let weaponShopRenderSignature = "";
let recoilKick = 0;
let hitPulse = 0;
let comboValue = 0;
let comboTimer = 0;
let comboReadyFx = 0;
let statsDirty = false;
let progressDirty = false;

const MAX_PARTICLES_DESKTOP = 440;
const MAX_PARTICLES_MOBILE = 220;
const MAX_RIPPLES = 24;

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
  telegraphs: [],
  damageTexts: [],
  ripples: [],
  drones: [],
  level: 1,
  tier: "Facile",
  theme: "neo",
  mapId: "neon-docks",
  mapName: "Quais neon",
  bossLevel: false,
  eventType: "standard",
  eventTimer: 0,
  eventPulse: 0,
  objectiveType: "purge",
  objectiveLabel: "PURGE",
  objectiveText: "Eliminez la vague.",
  objectiveTarget: 0,
  objectiveProgress: 0,
  contractDone: false,
  session: {
    kills: 0,
    shots: 0,
    apples: 0,
    dashes: 0
  }
};

const saveSettings = () => persistSettings(settings);
const saveStats = () => {
  statsDirty = true;
};
const saveProgress = () => {
  progressDirty = true;
};
const saveHints = () => persistHints(hints);

function flushDirtyPersistence(force = false) {
  if (force || statsDirty) {
    persistStats(lifetimeStats);
    statsDirty = false;
  }
  if (force || progressDirty) {
    persistProgress(progress);
    progressDirty = false;
  }
}

function currentMapSpec() {
  return mapCatalog.find((item) => item.id === world.mapId) || mapCatalog[0];
}

function weaponAccent(weaponId) {
  return weaponProfiles[weaponId]?.accent || weaponProfiles.rifle.accent;
}

function primeAudioAssets() {
  if (audioAssetsPrimed) return;
  audioAssetsPrimed = true;
  Object.values(audioPools).flat().forEach((audio) => {
    audio.volume = 0;
    audio.load?.();
  });
}

function pickAudioInstance(key) {
  const pool = audioPools[key];
  if (!pool?.length) return null;
  let audio = pool.find((candidate) => candidate.paused || candidate.ended);
  if (!audio) {
    audio = pool[0].cloneNode();
    audio.preload = "auto";
    audio.loop = key === "ambientLoop";
    pool.push(audio);
  }
  return audio;
}

function playSample(key, options = {}) {
  const audio = pickAudioInstance(key);
  if (!audio) return false;
  const {
    volume = 0.3,
    playbackRate = 1,
    restart = true
  } = options;
  audio.volume = clamp(volume * (settings.masterVolume / 100), 0, 1);
  audio.playbackRate = playbackRate;
  if (restart) {
    audio.currentTime = 0;
  }
  const playPromise = audio.play();
  playPromise?.catch?.(() => {});
  return true;
}

function pushDamageText(x, y, text, color = "#ffffff", scale = 1) {
  world.damageTexts.push({
    x,
    y,
    text,
    color,
    scale,
    life: 0.58,
    maxLife: 0.58,
    vy: -44
  });
}

function saveBestLevel(level) {
  bestLevel = persistBestLevel(bestLevel, level);
}

function sanitizeSettings() {
  progress.ownedSkins = [...new Set(["tank", "duck", ...(progress.ownedSkins || [])])];
  progress.ownedWeapons = [...new Set([...(starterWeaponIds || ["rifle", "shotgun", "sniper", "burst"]), ...(progress.ownedWeapons || [])])];
  if (!["pc", "mobile"].includes(settings.platformChoice)) {
    settings.platformChoice = ["pc", "mobile"].includes(settings.interfaceMode) ? settings.interfaceMode : "";
  }
  if (!["pc", "mobile"].includes(settings.interfaceMode)) settings.interfaceMode = "pc";
  if (!weaponConfigs[settings.weapon]) settings.weapon = "rifle";
  if (!isWeaponUnlocked(settings.weapon)) settings.weapon = "rifle";
  if (!skinCatalog[settings.skin] || !progress.ownedSkins.includes(settings.skin)) settings.skin = "tank";
  if (!["levels", "duo", "chaos", "swarm", "bossrush"].includes(settings.mode)) settings.mode = "levels";
  if (!bulletStyles.includes(settings.bulletStyle)) settings.bulletStyle = "dot";
  settings.bulletSize = 3;
  settings.bulletDamage = 11;
  settings.masterVolume = clamp(Number(settings.masterVolume) || defaultSettings.masterVolume, 0, 100);
  settings.dashVolume = clamp(Number(settings.dashVolume) || defaultSettings.dashVolume, 0, 100);
  settings.restartDelay = clamp(Number(settings.restartDelay) || defaultSettings.restartDelay, 1, 5);
  settings.mobileButtonScale = clamp(Number(settings.mobileButtonScale) || defaultSettings.mobileButtonScale, 80, 150);
  settings.mobileAimSensitivity = clamp(Number(settings.mobileAimSensitivity) || defaultSettings.mobileAimSensitivity, 60, 160);
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
  const baseRadius = options.radius || 30;
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    radius: baseRadius,
    hurtRadius: options.hurtRadius || baseRadius,
    angle: 0,
    hp: options.hp || 100,
    maxHp: options.hp || 100,
    energy: 100,
    maxEnergy: 100,
    shieldTimer: 0,
    reload: 0,
    dashCooldown: 0,
    hitFlash: 0,
    slowTimer: 0,
    burnTimer: 0,
    burnTick: 0,
    poisonTimer: 0,
    poisonTick: 0,
    virusTimer: 0,
    virusTick: 0,
    patternCooldown: 0,
    recoil: 0,
    overdriveTimer: 0,
    droneCooldown: 0,
    furyTimer: 0,
    hasteTimer: 0,
    chronoTimer: 0,
    regenTimer: 0,
    overclockTimer: 0,
    color: options.color || "#7cf6b8",
    skin: options.skin || "tank",
    team: options.team || "ally",
    ai: options.ai || false,
    archetype: options.archetype || "player",
    preferredWeapon: options.preferredWeapon || "rifle",
    reward: options.reward || 0,
    desiredRange: options.desiredRange || 320,
    speedMul: options.speedMul || 1,
    spinDir: options.spinDir || 1,
    dashChance: options.dashChance || 0.012,
    damageValue: options.damageValue || 8,
    reloadValue: options.reloadValue || weaponConfigs.rifle.reload
  };
}

function getHurtRadius(entity) {
  return entity?.hurtRadius || entity?.radius || 0;
}

function currentModeLabel() {
  return modeLabels[settings.mode] || modeLabels.levels;
}

function currentWeaponLabel() {
  return weaponConfigs[settings.weapon].label;
}

function currentBonusLabel() {
  if (!player) return "AUCUN";
  if (player.furyTimer > 0) return `DMG ${Math.ceil(player.furyTimer)}s`;
  if (player.hasteTimer > 0) return `VIT ${Math.ceil(player.hasteTimer)}s`;
  if (player.chronoTimer > 0) return `CHRONO ${Math.ceil(player.chronoTimer)}s`;
  if (player.regenTimer > 0) return `REGEN ${Math.ceil(player.regenTimer)}s`;
  if (player.overclockTimer > 0) return `SURCHARGE ${Math.ceil(player.overclockTimer)}s`;
  if (player.shieldTimer > 0) return `SHIELD ${Math.ceil(player.shieldTimer)}s`;
  return "AUCUN";
}

function chooseObjective(level, mode, eventType) {
  if (level % 5 === 0 || mode === "bossrush") {
    return { type: "boss", label: "BOSS", text: "Ecrasez le boss pour toucher la prime.", target: 1 };
  }
  if (eventType === "bonus") {
    return { type: "collector", label: "BONUS", text: "Ramassez un boost ou un soin pendant la manche.", target: 1 };
  }
  if (mode === "chaos" || mode === "swarm") {
    return { type: "dash", label: "MOUVEMENT", text: "Executez 2 dashs pour prendre l'avantage.", target: 2 };
  }
  if (level % 3 === 0) {
    return { type: "tempo", label: "TEMPO", text: "Tombez 4 ennemis sur cette manche pour empocher le bonus.", target: 4 };
  }
  return { type: "purge", label: "PURGE", text: "Nettoyez la vague sans relacher la pression.", target: 1 };
}

function completeObjective(reason = "Objectif") {
  if (world.contractDone) return;
  world.contractDone = true;
  addCoins(6);
  lifetimeStats.coinsEarned += 6;
  lifetimeStats.contractsCompleted += 1;
  showCombatBanner(reason, "+6 pieces et pression maintenue.", "gold", "Prime", 1.45);
  saveStats();
  saveProgress();
}

function registerObjectiveProgress(kind, amount = 1) {
  if (world.contractDone || world.objectiveType !== kind) return;
  world.objectiveProgress += amount;
  if (world.objectiveProgress >= world.objectiveTarget) {
    completeObjective("Contrat rempli");
  }
}

function applyPlayerBoost(kind) {
  if (!player) return;
  if (kind === "fury") {
    player.furyTimer = Math.max(player.furyTimer, 8);
  } else if (kind === "haste") {
    player.hasteTimer = Math.max(player.hasteTimer, 8);
  } else if (kind === "chrono") {
    player.chronoTimer = Math.max(player.chronoTimer, 5.5);
  } else if (kind === "regen") {
    player.regenTimer = Math.max(player.regenTimer, 7);
  } else if (kind === "overclock") {
    player.overclockTimer = Math.max(player.overclockTimer, 6);
  }
  registerObjectiveProgress("collector", 1);
}

function currentMoodLabel() {
  return "Arena nerveuse deluxe";
}

function currentPlatformChoice() {
  return settings.platformChoice === "mobile" ? "mobile" : "pc";
}

function platformDisplayLabel(choice = currentPlatformChoice()) {
  return choice === "mobile" ? "MOBILE" : "PC";
}

function platformFlavor(choice = currentPlatformChoice()) {
  return choice === "mobile"
    ? "Interface tactile, joysticks et lisibilite renforcee."
    : "HUD large, clavier / souris et reactivite maximale.";
}

function rarityMeta(rarity = "common") {
  return {
    common: { label: "Commun", className: "common" },
    rare: { label: "Rare", className: "rare" },
    epic: { label: "Epique", className: "epic" },
    legendary: { label: "Legendaire", className: "legendary" }
  }[rarity] || { label: "Commun", className: "common" };
}

function itemBadgesMarkup({ rarity = "common", tags = [] } = {}) {
  const rarityInfo = rarityMeta(rarity);
  const badges = [`<span class="item-rarity item-rarity-${rarityInfo.className}">${rarityInfo.label}</span>`];
  tags.filter(Boolean).forEach((tag) => {
    badges.push(`<span class="item-tag">${tag}</span>`);
  });
  return `<div class="item-badges">${badges.join("")}</div>`;
}

function currentWeaponProfile() {
  return weaponProfiles[settings.weapon] || weaponProfiles.rifle;
}

function weaponDisplayName(id) {
  return weaponCatalog[id]?.name || weaponConfigs[id]?.label || id.toUpperCase();
}

function isWeaponUnlocked(id) {
  return (starterWeaponIds || []).includes(id) || progress.ownedWeapons.includes(id);
}

function ownedWeaponIds() {
  return weaponCycleOrder.filter((id) => isWeaponUnlocked(id));
}

function weaponThumbMarkup(id) {
  const mark = weaponCatalog[id]?.mark || weaponDisplayName(id).slice(0, 1).toUpperCase();
  return `<div class="weapon-thumb weapon-thumb-${id}"><span>${mark}</span></div>`;
}

function showWeaponLockedMessage(weaponId) {
  const weaponName = weaponDisplayName(weaponId);
  ui.status.textContent = `${weaponName} n'est pas encore achetee.`;
  switchTab("weapons");
  playErrorSound();
  showCombatBanner("Arme verrouillee", `Achetez ${weaponName} dans l'onglet Armes.`, "gold", "Arsenal", 1.6);
  renderUI();
}

function enemyProfile(entity) {
  return enemyArchetypeMeta[entity?.archetype] || enemyArchetypeMeta.grunt;
}

function enemyHudLabel(entity, slot) {
  if (!entity || entity.hp <= 0) return `Ennemi ${slot}`;
  return `${enemyProfile(entity).name} ${slot}`;
}

function showCombatBanner(title, text = "", tone = "cyan", tag = "Arene", duration = 2.2) {
  combatBannerTimer = duration;
  if (!ui.combatBanner) return;
  ui.combatBannerTag.textContent = tag;
  ui.combatBannerTitle.textContent = title;
  ui.combatBannerText.textContent = text;
  ui.combatBanner.classList.remove("hidden", "tone-gold", "tone-hot", "tone-lime");
  if (tone === "gold") ui.combatBanner.classList.add("tone-gold");
  else if (tone === "hot") ui.combatBanner.classList.add("tone-hot");
  else if (tone === "lime") ui.combatBanner.classList.add("tone-lime");
  ui.combatBanner.setAttribute("aria-hidden", "false");
}

function updateCombatBanner(dt) {
  if (combatBannerTimer <= 0) return;
  combatBannerTimer = Math.max(0, combatBannerTimer - dt);
  if (combatBannerTimer > 0 || !ui.combatBanner) return;
  ui.combatBanner.classList.add("hidden");
  ui.combatBanner.classList.remove("tone-gold", "tone-hot", "tone-lime");
  ui.combatBanner.setAttribute("aria-hidden", "true");
}

function resetMobileInputs() {
  mobile.moveTouchId = null;
  mobile.fireTouchId = null;
  mobile.aimTouchId = null;
  mobile.moveX = 0;
  mobile.moveY = 0;
  mobile.aimX = 1;
  mobile.aimY = 0;
  pointer.down = false;
  pointer.active = false;
  ui.joystickStick.style.transform = "translate(-50%, -50%)";
  if (ui.aimStick) {
    ui.aimStick.style.transform = "translate(-50%, -50%)";
  }
}

function playerPowerLabel() {
  return 1 + progress.attackTier + progress.vitalityTier + progress.dashTier + progress.fireTier;
}

function comboTier() {
  if (comboValue >= 100) return 3;
  if (comboValue >= 65) return 2;
  if (comboValue >= 30) return 1;
  return 0;
}

function comboLabelText() {
  return comboValue >= 100 ? "SURGE" : `x${Math.round(comboValue)}`;
}

function comboCritChance(weaponId) {
  const base = {
    rifle: 0.08,
    shotgun: 0.06,
    sniper: 0.16,
    burst: 0.1
  }[weaponId] || 0.08;
  return base + comboTier() * 0.035 + (player?.overdriveTimer > 0 ? 0.08 : 0);
}

function registerPlayerHit({ amount = 0, killed = false, crit = false }) {
  const previous = comboValue;
  const gain = (killed ? 20 : 7) + Math.min(8, amount * 0.08) + (crit ? 10 : 0);
  comboValue = clamp(comboValue + gain, 0, 100);
  comboTimer = 2.8;
  hitPulse = Math.max(hitPulse, crit ? 1.2 : 0.7);
  if (previous < 100 && comboValue >= 100) {
    comboReadyFx = 1.6;
    showCombatBanner("SURGE pret", "Votre prochain dash declenche une onde de choc.", "lime", "Combo", 1.6);
  }
}

function updateCombatFlow(dt) {
  if (comboTimer > 0) {
    comboTimer = Math.max(0, comboTimer - dt);
  } else if (comboValue > 0) {
    comboValue = Math.max(0, comboValue - dt * 16);
  }
  comboReadyFx = Math.max(0, comboReadyFx - dt);
  recoilKick = Math.max(0, recoilKick - dt * 56);
  hitPulse = Math.max(0, hitPulse - dt * 8);
}

function spawnRipple(x, y, color, radius = 120, width = 4, life = 0.32) {
  if (world.ripples.length >= MAX_RIPPLES) {
    world.ripples.shift();
  }
  world.ripples.push({
    x,
    y,
    color,
    radius,
    lineWidth: width,
    life,
    maxLife: life
  });
}

function pulseShockwave(x, y, radius, damage, color) {
  spawnRipple(x, y, color, radius, 6, 0.44);
  spawnBurst(x, y, color, 18, 260);
  enemies.forEach((enemy) => {
    if (!enemy || enemy.hp <= 0) return;
    const dist = length(enemy.x - x, enemy.y - y);
    if (dist <= radius + enemy.radius) {
      enemy.slowTimer = Math.max(enemy.slowTimer, 0.7);
      damageEntity(enemy, damage, color, "player", "ally", "burst", { comboShock: true });
    }
  });
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

function mapForLevel(level) {
  return mapCatalog[(level - 1) % mapCatalog.length] || mapCatalog[0];
}

function setMapLayout(level) {
  const map = mapForLevel(level);
  const layout = obstacleLayouts[map.layoutIndex] || obstacleLayouts[0];
  obstacles = layout.map((item) => ({ ...item }));
  world.mapId = map.id;
  world.mapName = map.name;
  world.theme = map.theme;
}

function chooseSpecialEvent(level) {
  if (level % 9 === 0) return "armory";
  if (level % 8 === 0) return "frenzy";
  if (level % 7 === 0) return "coinrain";
  if (level % 6 === 0) return "bonus";
  if (level % 4 === 0) return "toxic";
  return "standard";
}

function eventLabel(type) {
  return {
    standard: "standard",
    armory: "arsenal",
    frenzy: "surge",
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
    dragon: "Feu legendaire",
    chicken: "Poulet de combat",
    monkey: "Singe turbo",
    tiger: "Fauve dangereux",
    cow: "Vache de l'enfer"
  };
  return flavors[id] || "Legende d'arene";
}

function enemyBlueprint(kind, level, diff) {
  const blueprints = {
    grunt: { hp: diff.enemyHp, speed: diff.enemySpeed, weapon: level > 8 ? "burst" : "rifle", skin: "robot", color: "#ff7088", reward: 10, radius: 30, range: 340, dashChance: 0.012, damage: diff.enemyDamage, reload: diff.enemyReload },
    runner: { hp: Math.round(diff.enemyHp * 0.78), speed: diff.enemySpeed * 1.25, weapon: "burst", skin: "fox", color: "#ff9d66", reward: 12, radius: 28, range: 250, dashChance: 0.028, damage: Math.max(7, diff.enemyDamage - 2), reload: Math.max(0.1, diff.enemyReload * 0.78) },
    tank: { hp: Math.round(diff.enemyHp * 1.7), speed: diff.enemySpeed * 0.8, weapon: "shotgun", skin: "tank", color: "#ff8d77", reward: 18, radius: 38, range: 210, dashChance: 0.008, damage: diff.enemyDamage + 3, reload: diff.enemyReload * 1.3 },
    sniper: { hp: Math.round(diff.enemyHp * 0.92), speed: diff.enemySpeed * 0.9, weapon: "sniper", skin: "ninja", color: "#ff6ca8", reward: 16, radius: 28, range: 560, dashChance: 0.006, damage: diff.enemyDamage + 6, reload: Math.max(0.18, diff.enemyReload * 1.4) },
    charger: { hp: Math.round(diff.enemyHp * 1.08), speed: diff.enemySpeed * 1.14, weapon: "shotgun", skin: "tiger", color: "#ffb36b", reward: 16, radius: 34, range: 220, dashChance: 0.034, damage: diff.enemyDamage + 1, reload: Math.max(0.16, diff.enemyReload * 0.92), hurtRadius: 22 },
    orbiter: { hp: Math.round(diff.enemyHp * 0.88), speed: diff.enemySpeed * 1.02, weapon: "rifle", skin: "alien", color: "#8fdcff", reward: 15, radius: 27, range: 360, dashChance: 0.012, damage: Math.max(6, diff.enemyDamage - 1), reload: Math.max(0.08, diff.enemyReload * 0.82), hurtRadius: 17 },
    skirmisher: { hp: Math.round(diff.enemyHp * 0.94), speed: diff.enemySpeed * 1.08, weapon: "laser", skin: "robot", color: "#63ebff", reward: 18, radius: 28, range: 460, dashChance: 0.016, damage: diff.enemyDamage + 2, reload: Math.max(0.07, diff.enemyReload * 0.7), hurtRadius: 18 },
    engineer: { hp: Math.round(diff.enemyHp * 1.1), speed: diff.enemySpeed * 0.82, weapon: "mine", skin: "monkey", color: "#d0b5ff", reward: 20, radius: 32, range: 400, dashChance: 0.004, damage: diff.enemyDamage + 1, reload: Math.max(0.18, diff.enemyReload * 1.25), hurtRadius: 20 },
    boss: { hp: Math.round(diff.enemyHp * 3.2), speed: diff.enemySpeed * 0.86, weapon: "burst", skin: "dragon", color: "#ffbd59", reward: 42, radius: 50, range: 420, dashChance: 0.012, damage: diff.enemyDamage + 2, reload: Math.max(0.18, diff.enemyReload * 0.95) }
  };
  return blueprints[kind] || blueprints.grunt;
}

function chooseEnemyKinds(level, mode) {
  if (mode === "bossrush") return level > 9 ? ["boss", "orbiter"] : ["boss", "sniper"];
  if (mode === "swarm") return level > 10 ? ["runner", "orbiter", "skirmisher"] : level > 6 ? ["runner", "runner", "engineer"] : ["grunt", "runner"];
  if (level % 5 === 0) return mode === "chaos" ? ["boss", level > 9 ? "charger" : "runner", "engineer"] : ["boss"];
  if (mode === "chaos") return level > 10 ? ["charger", "orbiter", "skirmisher"] : level > 7 ? ["runner", "tank", "engineer"] : ["grunt", "runner", "skirmisher"];
  if (mode === "duo") return level > 9 ? ["charger", "sniper", "engineer"] : level > 6 ? ["tank", "sniper", "skirmisher"] : ["grunt", "runner"];
  if (level > 12) return ["charger", "engineer"];
  if (level > 10) return ["skirmisher"];
  if (level > 8) return ["orbiter", "skirmisher"];
  if (level > 5) return ["tank", "engineer"];
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
    hurtRadius: spec.hurtRadius,
    dashChance: spec.dashChance,
    damageValue: spec.damage,
    reloadValue: spec.reload,
    spinDir: Math.random() < 0.5 ? -1 : 1
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
  return pointer.down;
}

function isMobileViewport() {
  return mobile.enabled;
}

function syncMobileMode() {
  const canUseTouchUi = coarseMedia?.matches ?? window.matchMedia("(pointer: coarse)").matches;
  const next = settings.interfaceMode === "mobile" && canUseTouchUi;
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

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
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

function getRenderScale() {
  const base = window.devicePixelRatio || 1;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const largeDesktop = !coarse && window.innerWidth >= 1500;
  return Math.min(base, largeDesktop ? 2.75 : 2);
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
  const enemyLine = enemyKinds.map((kind) => enemyArchetypeMeta[kind]?.shortName || kind).join(" + ");
  world.level = level;
  world.tier = diff.tier;
  world.bossLevel = level % 5 === 0;
  world.eventType = chooseSpecialEvent(level);
  world.eventTimer = 5;
  world.eventPulse = 0;
  const objective = chooseObjective(level, settings.mode, world.eventType);
  world.objectiveType = objective.type;
  world.objectiveLabel = objective.label;
  world.objectiveText = objective.text;
  world.objectiveTarget = objective.target;
  world.objectiveProgress = 0;
  world.contractDone = false;
  gameOver = false;
  restartTimer = 0;
  appleTimer = 2.5;
  levelToast = 1;
  impactFlash = 0;
  cameraShake = 0;
  hitMarkerTimer = 0;
  comboReadyFx = 0;
  world.bullets = [];
  world.particles = [];
  world.pickups = [];
  world.hazards = [];
  world.telegraphs = [];
  world.damageTexts = [];
  world.ripples = [];

  if (freshRun || !player) {
    player = createEntity(420, 680, { color: settings.playerColor, skin: settings.skin, team: "ally", hurtRadius: 20 });
    comboValue = 0;
    comboTimer = 0;
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
    comboValue = Math.max(0, comboValue - 18);
    comboTimer = Math.min(comboTimer, 1.4);
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
    ? `Boss du niveau ${world.level} sur ${world.mapName}. Rencontre: ${enemyLine}. Event: ${eventLabel(world.eventType)}.`
    : `Niveau ${world.level} - ${world.tier} - ${world.mapName} - ${enemyLine} - ${eventLabel(world.eventType)}.`;
  ui.status.textContent += ` Objectif: ${world.objectiveText}`;
  showCombatBanner(
    world.bossLevel ? `Boss niveau ${world.level}` : `Niveau ${world.level}`,
    `${world.mapName} · ${eventLabel(world.eventType)} · ${world.objectiveLabel}`,
    world.bossLevel ? "gold" : "cyan",
    world.bossLevel ? "Boss" : "Manche",
    world.bossLevel ? 2.7 : 2.1
  );
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

function platformChoiceMissing() {
  return !["pc", "mobile"].includes(settings.platformChoice);
}

function syncPlatformGate() {
  const needsChoice = platformChoiceMissing();
  ui.platformGate?.classList.toggle("hidden", !needsChoice);
  ui.platformGate?.setAttribute("aria-hidden", String(!needsChoice));
  document.body.classList.toggle("platform-gate-open", needsChoice);
  if (needsChoice) {
    ui.hubOverlay?.classList.add("hidden");
    canvas.classList.add("blocked");
  } else if (!gameStarted && overlayOpen) {
    ui.hubOverlay?.classList.remove("hidden");
  }
}

function applyPlatformChoice(choice, announce = true) {
  if (!["pc", "mobile"].includes(choice)) return;
  settings.platformChoice = choice;
  settings.interfaceMode = choice;
  saveSettings();
  syncMobileMode();
  syncPlatformGate();
  playInterfaceSelectSound();
  if (ui.platformHint) {
    setText(ui.platformHint, choice === "mobile"
      ? "Profil tactile memorise. L'interface mobile sera privilegiee au demarrage."
      : "Profil PC memorise. L'interface clavier / souris sera privilegiee au demarrage.");
  }
  if (announce) {
    showCombatBanner(
      choice === "mobile" ? "Profil mobile actif" : "Profil PC actif",
      platformFlavor(choice),
      "cyan",
      "Plateforme",
      1.6
    );
  }
  renderUI();
}

function openPlatformGate() {
  overlayOpen = true;
  paused = true;
  ui.hubOverlay?.classList.add("hidden");
  ui.platformGate?.classList.remove("hidden");
  ui.platformGate?.setAttribute("aria-hidden", "false");
  canvas.classList.add("blocked");
  document.body.classList.add("platform-gate-open");
}

function openOverlay(tab = currentTab) {
  if (platformChoiceMissing()) {
    openPlatformGate();
    return;
  }
  overlayOpen = true;
  paused = true;
  currentTab = tab;
  ui.hubOverlay.classList.remove("hidden");
  canvas.classList.add("blocked");
  switchTab(tab);
  playUiOpenSound();
}

function closeOverlay() {
  if (platformChoiceMissing()) {
    openPlatformGate();
    return;
  }
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
  if (platformChoiceMissing()) {
    openPlatformGate();
    return;
  }
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
  showCombatBanner("Arene en direct", `${currentWeaponLabel()} - ${currentModeLabel()}`, "cyan", "Depart", 1.9);
}

function switchTab(tab) {
  currentTab = tab;
  ui.tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  ui.tabPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab));
  playTabSound();
}

function resize(skipModeSync = false) {
  const rect = canvas.getBoundingClientRect();
  const renderScale = getRenderScale();
  canvas.width = Math.floor(rect.width * renderScale);
  canvas.height = Math.floor(rect.height * renderScale);
  ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
  const minimapRect = minimapCanvas.getBoundingClientRect();
  minimapCanvas.width = Math.floor(minimapRect.width * renderScale);
  minimapCanvas.height = Math.floor(minimapRect.height * renderScale);
  minimapCtx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
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

let shopRenderSignature = "";

function setText(node, value) {
  if (!node) return;
  const next = String(value);
  if (node.textContent !== next) node.textContent = next;
}

function setWidth(node, value) {
  if (!node) return;
  if (node.style.width !== value) node.style.width = value;
}

function setChecked(node, value) {
  if (!node) return;
  if (node.checked !== value) node.checked = value;
}

function setValue(node, value) {
  if (!node) return;
  const next = String(value);
  if (node.value !== next) node.value = next;
}

function bindingActionLabel(action) {
  return {
    forward: "avancer",
    backward: "reculer",
    left: "aller a gauche",
    right: "aller a droite",
    dash: "faire un dash",
    pause: "mettre en pause",
    restart: "recommencer"
  }[action] || action;
}

function renderLiveUI() {
  const modeLabel = currentModeLabel();
  const weaponLabel = currentWeaponLabel();
  const platformLabel = platformDisplayLabel();
  const powerLabel = String(playerPowerLabel());
  const coinLabel = String(progress.coins);
  const comboText = comboLabelText();
  const objectiveText = world.contractDone
    ? "PRIME"
    : world.objectiveType === "tempo" || world.objectiveType === "dash" || world.objectiveType === "collector"
      ? `${world.objectiveLabel} ${Math.min(world.objectiveProgress, world.objectiveTarget)}/${world.objectiveTarget}`
      : world.objectiveLabel;
  const bonusText = currentBonusLabel();
  const shieldText = player && player.shieldTimer > 0 ? `${player.shieldTimer.toFixed(1)}s` : "AUCUN";
  const allyVisible = settings.mode === "duo" && ally;
  const enemyTwoVisible = enemies.length >= 2;

  document.body.classList.toggle("playing", gameStarted && !overlayOpen);
  document.body.classList.toggle("mobile-ultra-clean-active", mobile.enabled && settings.mobileUltraClean && !overlayOpen);
  document.body.style.setProperty("--mobile-scale", `${settings.mobileButtonScale / 100}`);
  ui.minimapShell?.classList.toggle("hidden", !minimapVisible);

  setText(ui.levelLabel, world.level);
  setText(ui.bestLevel, bestLevel);
  setText(ui.modeLabel, modeLabel);
  setText(ui.platformLabel, platformLabel);
  setText(ui.weaponLabel, weaponLabel);
  setText(ui.mobileLevelLabel, world.level);
  setText(ui.mobileModeLabel, modeLabel);
  setText(ui.mobileWeaponLabel, weaponLabel);
  setText(ui.mobileCoinsLabel, coinLabel);
  setText(ui.mobileComboLabel, comboText);
  setText(ui.mobileObjectiveLabel, objectiveText);
  setText(ui.mobileBonusLabel, bonusText);
  setText(ui.coinsLabel, coinLabel);
  setText(ui.powerLabel, powerLabel);
  setText(ui.comboLabel, comboText);
  setText(ui.objectiveLabel, objectiveText);
  setText(ui.bonusLabel, bonusText);
  setText(ui.shieldLabel, shieldText);
  setText(ui.fps, shownFps);
  setText(ui.enemyLabel, enemyHudLabel(enemies[0], 1));
  setText(ui.allyLabel, ally ? "Allie support" : "Allie");
  setText(ui.enemyTwoLabel, enemyHudLabel(enemies[1], 2));
  setText(ui.shopCoinsTotal, `${progress.coins} pieces`);
  setText(ui.weaponShopCoinsTotal, `${progress.coins} pieces`);
  setText(ui.weaponShopEquipped, weaponDisplayName(settings.weapon));
  setText(ui.weaponShopOwnedCount, ownedWeaponIds().length);
  setText(ui.shopPowerTotal, `Niveau ${playerPowerLabel()}`);
  setText(ui.shopUpgradeTip, "Degats = plus fort, Vie = plus solide, Dash = plus nerveux, Cadence = plus rapide.");
  setText(ui.mobileWeaponButton, weaponLabel);

  const showTutorial = mobile.enabled && !hints.mobileTwinStick && !overlayOpen;
  ui.tutorialBanner.classList.toggle("hidden", !showTutorial);
  ui.tutorialBanner.setAttribute("aria-hidden", String(!showTutorial));

  if (player) {
    setWidth(ui.playerHp, `${(player.hp / player.maxHp) * 100}%`);
    setWidth(ui.playerEnergy, `${(player.energy / player.maxEnergy) * 100}%`);
  }
  setWidth(ui.enemyHp, enemies[0] ? `${(enemies[0].hp / enemies[0].maxHp) * 100}%` : "0%");
  setWidth(ui.allyHp, ally ? `${(ally.hp / ally.maxHp) * 100}%` : "0%");
  setWidth(ui.enemyTwoHp, enemies[1] ? `${(enemies[1].hp / enemies[1].maxHp) * 100}%` : "0%");
  ui.allyStat.classList.toggle("hidden", !allyVisible);
  ui.enemyTwoStat.classList.toggle("hidden", !enemyTwoVisible);

  if (ui.combatBanner) {
    ui.combatBanner.classList.toggle("hidden", combatBannerTimer <= 0);
    ui.combatBanner.setAttribute("aria-hidden", String(combatBannerTimer <= 0));
  }

  const comboColor = comboValue >= 100
    ? "#c8ff75"
    : comboValue >= 65
      ? "#ffd166"
      : comboValue >= 30
        ? "#7cf6b8"
        : "";
  if (ui.comboLabel) ui.comboLabel.style.color = comboColor;
  if (ui.mobileComboLabel) ui.mobileComboLabel.style.color = comboColor;
}

function renderMenuUI() {
  const weaponProfile = currentWeaponProfile();
  const platformChoice = currentPlatformChoice();
  const platformText = platformFlavor(platformChoice);
  const selectedSkin = skinCatalog[settings.skin];
  const selectedSkinRarity = rarityMeta(selectedSkin.rarity);

  if (ui.weaponPanel) ui.weaponPanel.style.setProperty("--weapon-accent", weaponProfile.accent);
  setText(ui.weaponPerkTag, weaponProfile.tag);
  setText(ui.weaponPerkTitle, weaponConfigs[settings.weapon].label);
  setText(ui.weaponPerkDesc, weaponProfile.desc);
  setText(ui.weaponStatOne, weaponProfile.stats[0]);
  setText(ui.weaponStatTwo, weaponProfile.stats[1]);
  setText(ui.weaponStatThree, weaponProfile.stats[2]);

  setValue(ui.bulletStyle, settings.bulletStyle);
  ui.bulletPreview.dataset.style = settings.bulletStyle;
  ui.bulletPreview.style.setProperty("--bullet-preview-size", `${settings.bulletSize * 5}px`);
  ui.bulletPreview.style.setProperty("--bullet-preview-color", settings.bulletColor);

  setValue(ui.playerColor, settings.playerColor);
  setText(ui.playerColorValue, settings.playerColor.toUpperCase());
  ui.skinPreview.style.backgroundImage = skinCatalog[settings.skin].image ? `url('${skinCatalog[settings.skin].image}')` : "none";
  ui.skinPreview.style.backgroundColor = skinCatalog[settings.skin].image ? "rgba(255,255,255,0.04)" : settings.playerColor;
  ui.skinPreview.style.boxShadow = skinCatalog[settings.skin].image ? `0 18px 34px ${hexToRgba(settings.playerColor, 0.22)}` : `0 0 24px ${settings.playerColor}`;
  ui.skinPreview.style.outline = `2px solid ${hexToRgba(settings.playerColor, 0.18)}`;
  setText(ui.skinSpotlightName, selectedSkin.name);
  setText(ui.skinSpotlightTag, `${selectedSkinRarity.label} - ${skinFlavor(settings.skin)}`);
  setValue(ui.masterVolume, settings.masterVolume);
  setText(ui.masterVolumeValue, `${settings.masterVolume}%`);
  setValue(ui.dashVolume, settings.dashVolume);
  setText(ui.dashVolumeValue, `${settings.dashVolume}%`);
  setValue(ui.fpsCap, settings.fpsCap);
  setChecked(ui.autoFullscreen, settings.autoFullscreen);
  setChecked(ui.autoRestart, settings.autoRestart);
  setValue(ui.restartDelay, settings.restartDelay);
  setText(ui.restartDelayValue, `${settings.restartDelay} s`);

  ui.interfaceChoices.forEach((button) => {
    const interfaceId = button.dataset.interface;
    const isSelectable2dMode = interfaceId === "pc" || interfaceId === "mobile";
    button.classList.toggle("active", isSelectable2dMode && interfaceId === settings.interfaceMode);
  });
  ui.platformPcButton?.classList.toggle("active", platformChoice === "pc");
  ui.platformMobileButton?.classList.toggle("active", platformChoice === "mobile");
  ui.modeChoices.forEach((button) => button.classList.toggle("active", button.dataset.mode === settings.mode));
  ui.weaponChoices.forEach((button) => {
    const weaponId = button.dataset.weapon;
    button.classList.toggle("active", weaponId === settings.weapon);
    button.classList.toggle("locked-choice", !isWeaponUnlocked(weaponId));
  });

  setText(ui.bindForward, labelForKey(settings.bindings.forward));
  setText(ui.bindBackward, labelForKey(settings.bindings.backward));
  setText(ui.bindLeft, labelForKey(settings.bindings.left));
  setText(ui.bindRight, labelForKey(settings.bindings.right));
  setText(ui.bindDash, labelForKey(settings.bindings.dash));
  setText(ui.bindPause, labelForKey(settings.bindings.pause));
  setText(ui.bindRestart, labelForKey(settings.bindings.restart));
  setText(ui.moveForwardKey, labelForKey(settings.bindings.forward));
  setText(ui.moveBackwardKey, labelForKey(settings.bindings.backward));
  setText(ui.moveLeftKey, labelForKey(settings.bindings.left));
  setText(ui.moveRightKey, labelForKey(settings.bindings.right));
  setText(ui.dashKey, labelForKey(settings.bindings.dash));
  setText(ui.pauseKey, labelForKey(settings.bindings.pause));
  setText(ui.restartKey, labelForKey(settings.bindings.restart));

  setText(ui.recordBestLevel, bestLevel);
  setText(ui.recordKills, lifetimeStats.kills);
  setText(ui.recordShots, lifetimeStats.shots);
  setText(ui.recordApples, lifetimeStats.apples);
  setText(ui.recordDashes, lifetimeStats.dashes);
  setText(ui.recordBosses, lifetimeStats.bosses);
  setText(ui.recordCoinsEarned, lifetimeStats.coinsEarned);
  setText(ui.recordTimePlayed, `${Math.floor(lifetimeStats.timePlayed / 60)} min`);
  setText(ui.recordCurrentSkin, skinCatalog[settings.skin].name);
  setText(ui.recordCurrentWeapon, currentWeaponLabel());
  setText(ui.recordCurrentMode, currentModeLabel());
  setText(ui.recordMood, currentMoodLabel());
  setText(ui.recordFavoriteWeapon, weaponConfigs[favoriteWeaponId()].label);
  setText(ui.heroPlatformBadge, `Plateforme ${platformDisplayLabel(platformChoice)}`);
  setText(ui.heroModeBadge, `Mode ${currentModeLabel()}`);
  setText(ui.heroWeaponBadge, `Arme ${weaponDisplayName(settings.weapon)}`);
  setText(ui.heroSkinBadge, `Skin ${selectedSkin.name}`);
  setText(ui.heroPlatformValue, platformDisplayLabel(platformChoice));
  setText(ui.heroPlatformText, platformText);
  setText(ui.heroRecordValue, bestLevel);
  setText(ui.heroCoinsValue, progress.coins);
  setText(ui.platformMemoryLabel, platformDisplayLabel(platformChoice));
  setText(ui.platformMemoryText, platformText);
  setChecked(ui.mobileUltraClean, settings.mobileUltraClean);
  setChecked(ui.mobileHaptics, settings.mobileHaptics);
  setValue(ui.mobileButtonScale, settings.mobileButtonScale);
  setText(ui.mobileButtonScaleValue, `${settings.mobileButtonScale}%`);
  setValue(ui.mobileAimSensitivity, settings.mobileAimSensitivity);
  setText(ui.mobileAimSensitivityValue, `${settings.mobileAimSensitivity}%`);

  [
    ["attackTier", ui.upgradeAttackLevel, ui.upgradeAttackCost, ui.upgradeAttack],
    ["vitalityTier", ui.upgradeVitalityLevel, ui.upgradeVitalityCost, ui.upgradeVitality],
    ["dashTier", ui.upgradeDashLevel, ui.upgradeDashCost, ui.upgradeDash],
    ["fireTier", ui.upgradeFireLevel, ui.upgradeFireCost, ui.upgradeFire]
  ].forEach(([key, levelNode, costNode, mainButton]) => {
    const cost = upgradeCost(key);
    const label = `Niveau ${progress[key]}`;
    const maxed = progress[key] >= 8;
    setText(levelNode, label);
    setText(costNode, maxed ? "MAX" : `${cost} pieces`);
    if (mainButton) {
      mainButton.classList.toggle("affordable", !maxed && progress.coins >= cost);
      mainButton.classList.toggle("maxed", maxed);
    }
  });

  document.querySelectorAll(".bind-button").forEach((button) => {
    button.classList.toggle("listening", button.dataset.action === listeningAction);
  });
  setText(
    ui.bindingHint,
    listeningAction
      ? `Appuyez sur la nouvelle touche pour ${bindingActionLabel(listeningAction)}.`
      : "Cliquez sur une touche puis appuyez sur la nouvelle touche."
  );

  renderShop();
  renderWeaponShop();
  renderWeaponMiniGrid();
  syncPlatformGate();
}

function renderUI(full = true) {
  renderLiveUI();
  if (full) renderMenuUI();
}

function renderShop() {
  const nextSignature = JSON.stringify({
    skin: settings.skin,
    color: settings.playerColor,
    coins: progress.coins,
    owned: [...progress.ownedSkins].sort()
  });
  if (shopRenderSignature === nextSignature) {
    setText(ui.shopHint, `Pieces: ${progress.coins}. Reperez les raretes, achetez puis equipez instantanement votre look prefere.`);
    return;
  }
  shopRenderSignature = nextSignature;
  ui.shopGrid.innerHTML = "";
  const sections = {
    equipped: [],
    owned: [],
    buyable: [],
    locked: []
  };

  Object.entries(skinCatalog).forEach(([id, info]) => {
    const unlocked = isSkinUnlocked(id);
    const canBuy = progress.coins >= info.price;
    const item = document.createElement("button");
    item.type = "button";
    item.className = `shop-item${settings.skin === id ? " selected" : ""}${unlocked ? "" : " locked"}${!unlocked && canBuy ? " affordable" : ""}`;
    const thumb = info.image
      ? `<div class="shop-thumb" style="background-image:url('${info.image}')"></div>`
      : `<div class="shop-thumb" style="background:${settings.playerColor}; box-shadow:0 0 18px ${settings.playerColor};"></div>`;
    const missingCoins = Math.max(0, info.price - progress.coins);
    const meta = unlocked ? "Possede" : canBuy ? "Achetable maintenant" : `Il manque ${missingCoins} pieces`;
    const priceChip = unlocked ? '<small class="shop-item-price">Equipe / possede</small>' : `<small class="shop-item-price">${info.price} pieces</small>`;
    const skinTags = [];
    if (settings.skin === id) skinTags.push("Equipe");
    else if (unlocked) skinTags.push("Possede");
    else if (canBuy) skinTags.push("Achetable");
    item.innerHTML = `${itemBadgesMarkup({ rarity: info.rarity, tags: skinTags })}${thumb}<strong>${info.name}</strong><small class="shop-meta">${skinFlavor(id)}</small><small class="shop-meta">${meta}</small>${priceChip}`;
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
        showCombatBanner("Skin achetee", `${info.name} rejoint votre collection.`, "lime", "Boutique", 1.7);
      }
      settings.skin = id;
      if (player) player.skin = id;
      saveSettings();
      showCombatBanner("Skin equipee", `${info.name} est maintenant active.`, "cyan", "Style", 1.45);
      renderUI();
    });

    if (settings.skin === id) sections.equipped.push(item);
    else if (unlocked) sections.owned.push(item);
    else if (canBuy) sections.buyable.push(item);
    else sections.locked.push(item);
  });

  [
    ["equipped", "Equipe maintenant"],
    ["buyable", "Achetables"],
    ["owned", "Deja possedes"],
    ["locked", "A economiser"]
  ].forEach(([key, label]) => {
    const items = sections[key];
    if (!items.length) return;
    const section = document.createElement("section");
    section.className = "shop-section";
    section.innerHTML = `<div class="shop-section-title"><strong>${label}</strong><span>${items.length}</span></div><div class="shop-section-grid"></div>`;
    const grid = section.querySelector(".shop-section-grid");
    items.forEach((item) => grid.appendChild(item));
    ui.shopGrid.appendChild(section);
  });

  setText(ui.shopHint, `Pieces: ${progress.coins}. Achetez ici, puis equipez instantanement votre skin prefere.`);
}

function renderWeaponShop() {
  if (!ui.weaponShopGrid) return;
  const nextSignature = JSON.stringify({
    weapon: settings.weapon,
    coins: progress.coins,
    owned: [...ownedWeaponIds()]
  });
  if (weaponShopRenderSignature === nextSignature) {
    setText(ui.weaponShopHint, `Pieces: ${progress.coins}. Achetez, comparez les raretes et equipez votre arsenal pour la prochaine run.`);
    return;
  }
  weaponShopRenderSignature = nextSignature;
  ui.weaponShopGrid.innerHTML = "";

  const sections = {
    equipped: [],
    buyable: [],
    owned: [],
    locked: []
  };

  weaponCycleOrder.forEach((weaponId) => {
    const info = weaponCatalog[weaponId];
    const profile = weaponProfiles[weaponId];
    const unlocked = isWeaponUnlocked(weaponId);
    const canBuy = progress.coins >= info.price;
    const item = document.createElement("button");
    item.type = "button";
    item.className = `shop-item weapon-item${settings.weapon === weaponId ? " selected" : ""}${unlocked ? "" : " locked"}${!unlocked && canBuy ? " affordable" : ""}`;
    const missingCoins = Math.max(0, info.price - progress.coins);
    const meta = unlocked ? "Possedee" : canBuy ? "Achetable maintenant" : `Il manque ${missingCoins} pieces`;
    const priceChip = unlocked
      ? '<small class="shop-item-price">Equipe / possedee</small>'
      : `<small class="shop-item-price">${info.price} pieces</small>`;
    const weaponTags = [
      info.tag,
      settings.weapon === weaponId ? "Equipe" : unlocked ? "Possede" : canBuy ? "Nouveau" : "",
      info.badge || ""
    ];
    item.innerHTML = `${itemBadgesMarkup({ rarity: info.rarity, tags: weaponTags })}${weaponThumbMarkup(weaponId)}<strong>${info.name}</strong><small class="shop-meta">${profile.tag} - ${profile.stats.join(" - ")}</small><small class="shop-meta">${meta}</small><small class="shop-meta">${info.blurb}</small>${priceChip}`;
    item.addEventListener("click", () => {
      if (!unlocked) {
        if (progress.coins < info.price) {
          ui.status.textContent = `Pas assez de pieces pour ${info.name}.`;
          playErrorSound();
          return;
        }
        progress.coins -= info.price;
        progress.ownedWeapons = [...new Set([...progress.ownedWeapons, weaponId])];
        saveProgress();
        playPurchaseSound();
        showCombatBanner("Arme achetee", `${info.name} rejoint votre arsenal.`, "lime", "Arsenal", 1.7);
      }
      settings.weapon = weaponId;
      saveSettings();
      playWeaponSwitchSound();
      showCombatBanner(info.name, profile.desc, "hot", "Arme", 1.55);
      renderUI();
    });

    if (settings.weapon === weaponId) sections.equipped.push(item);
    else if (unlocked) sections.owned.push(item);
    else if (canBuy) sections.buyable.push(item);
    else sections.locked.push(item);
  });

  [
    ["equipped", "Equipee maintenant"],
    ["buyable", "Achetables"],
    ["owned", "Deja possedees"],
    ["locked", "A economiser"]
  ].forEach(([key, label]) => {
    const items = sections[key];
    if (!items.length) return;
    const section = document.createElement("section");
    section.className = "shop-section";
    section.innerHTML = `<div class="shop-section-title"><strong>${label}</strong><span>${items.length}</span></div><div class="shop-section-grid"></div>`;
    const grid = section.querySelector(".shop-section-grid");
    items.forEach((item) => grid.appendChild(item));
    ui.weaponShopGrid.appendChild(section);
  });

  setText(ui.weaponShopHint, `Pieces: ${progress.coins}. Achetez vos armes, lisez leur identite et equipez la plus desiree.`);
}

function renderWeaponMiniGrid() {
  if (!ui.skinWeaponMiniGrid) return;
  ui.skinWeaponMiniGrid.innerHTML = "";
  weaponCycleOrder.forEach((weaponId) => {
    const info = weaponCatalog[weaponId];
    const unlocked = isWeaponUnlocked(weaponId);
    const stateLabel = settings.weapon === weaponId ? "Equipee" : unlocked ? "Possedee" : `${info.price} pieces`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `weapon-mini-card${settings.weapon === weaponId ? " selected" : ""}${unlocked ? "" : " locked"}`;
    button.innerHTML = `${weaponThumbMarkup(weaponId)}<span><strong>${weaponDisplayName(weaponId)}</strong><small>${rarityMeta(info.rarity).label} - ${stateLabel}</small></span>`;
    button.addEventListener("click", () => {
      if (!unlocked) {
        showWeaponLockedMessage(weaponId);
        return;
      }
      settings.weapon = weaponId;
      saveSettings();
      playWeaponSwitchSound();
      renderUI();
    });
    ui.skinWeaponMiniGrid.appendChild(button);
  });
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
  showCombatBanner("Boost achete", "Votre build devient encore plus fort.", "lime", "Boost", 1.65);
  playPurchaseSound();
  vibrate([20, 20, 25]);
  renderUI();
}

function addCoins(amount) {
  progress.coins = Math.max(0, progress.coins + amount);
  saveProgress();
}

function ensureAudio() {
  primeAudioAssets();
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
  const sampleKey = {
    rifle: "rifle",
    shotgun: "shotgun",
    sniper: "sniper",
    burst: "burst",
    laser: "rifle",
    grenade: "shotgun",
    arc: "burst",
    flamethrower: "burst",
    railgun: "sniper",
    freeze: "rifle",
    gravity: "shotgun",
    katana: "shotgun",
    chaos: "burst",
    virus: "rifle",
    ricochet: "rifle",
    mine: "shotgun",
    drone: "burst",
    poison: "rifle",
    explosiveburst: "burst"
  }[weaponId] || "rifle";
  const shotProfile = {
    rifle: { base: 1, extra: 1 },
    shotgun: { base: 0.75, extra: 0.8 },
    sniper: { base: 0.55, extra: 1.35 },
    burst: { base: 1.15, extra: 0.95 },
    laser: { base: 1.24, extra: 0.78 },
    grenade: { base: 0.62, extra: 1.1 },
    arc: { base: 1.1, extra: 0.9 },
    flamethrower: { base: 0.92, extra: 0.88 },
    railgun: { base: 0.42, extra: 1.56 },
    freeze: { base: 0.96, extra: 0.92 },
    gravity: { base: 0.7, extra: 1.16 },
    katana: { base: 0.74, extra: 0.82 },
    chaos: { base: 1.02, extra: 1.12 },
    virus: { base: 0.94, extra: 0.94 },
    ricochet: { base: 1.06, extra: 0.9 },
    mine: { base: 0.7, extra: 0.96 },
    drone: { base: 1.08, extra: 0.88 },
    poison: { base: 0.9, extra: 0.9 },
    explosiveburst: { base: 1.18, extra: 1.04 }
  }[weaponId] || { base: 1, extra: 1 };
  const usedSample = playSample(sampleKey, {
    volume: ["sniper", "railgun"].includes(weaponId) ? 0.42 : ["shotgun", "grenade", "gravity", "mine"].includes(weaponId) ? 0.38 : 0.34,
    playbackRate: ["burst", "arc", "explosiveburst"].includes(weaponId) ? 1.08 : ["sniper", "railgun"].includes(weaponId) ? 0.92 : 1
  });
  if (usedSample) return;
  tone({ frequency: 240 * shotProfile.base, slideTo: 140, duration: 0.06, volume: 0.08 * shotProfile.extra, type: "square" });
  tone({ frequency: 420 * shotProfile.extra, slideTo: 250, duration: 0.05, volume: 0.05, type: "triangle" });
}

function playDashSound() {
  const mult = settings.dashVolume / 100;
  if (playSample("dash", { volume: 0.34 * mult, playbackRate: 1 })) return;
  tone({ frequency: 300, slideTo: 100, duration: 0.14, volume: 0.16 * mult, type: "sawtooth" });
}

function playStepSound(speedRatio) {
  tone({ frequency: 110 + Math.random() * 40, slideTo: 95, duration: 0.035, volume: 0.022 + speedRatio * 0.01, type: "triangle" });
}

function playHitSound() {
  if (playSample("hit", { volume: 0.24, playbackRate: 1 })) return;
  tone({ frequency: 180, slideTo: 100, duration: 0.07, volume: 0.08, type: "square" });
}

function playAppleSound() {
  tone({ frequency: 420, slideTo: 620, duration: 0.1, volume: 0.08, type: "triangle" });
}

function playWinSound() {
  if (playSample("level", { volume: 0.28, playbackRate: 1.04 })) return;
  tone({ frequency: 360, slideTo: 540, duration: 0.18, volume: 0.1, type: "triangle" });
  tone({ frequency: 540, slideTo: 760, duration: 0.22, volume: 0.08, type: "triangle" });
}

function playMusicPulse() {
  const notes = [261.63, 329.63, 392, 493.88];
  const note = notes[Math.floor((performance.now() / 360) % notes.length)];
  tone({ frequency: note, slideTo: note * 1.008, duration: 0.14, volume: 0.04, type: "triangle" });
}

function startAmbientMusic() {
  ensureAudio();
  if (ambientLoopTrack) {
    ambientLoopTrack.pause();
    ambientLoopTrack.currentTime = 0;
  }
  ambientLoopTrack = null;
  const audio = audioContext;
  if (!audio || ambientNodes) return;
  ambientNodes = {
    nextShift: performance.now() + 180,
    chordIndex: 0,
    step: 0
  };
}

function stopAmbientMusic() {
  if (ambientLoopTrack) {
    ambientLoopTrack.pause();
    ambientLoopTrack.currentTime = 0;
  }
  ambientNodes = null;
}

function updateAmbientMusic() {
  if (!ambientNodes || !audioContext) return;
  const nowPerf = performance.now();
  if (nowPerf < ambientNodes.nextShift) return;

  const chords = [
    [261.63, 329.63, 392],
    [293.66, 369.99, 440],
    [329.63, 392, 493.88],
    [246.94, 329.63, 392]
  ];
  const chord = chords[ambientNodes.chordIndex % chords.length];
  const note = chord[ambientNodes.step % chord.length];
  const bass = note / 2;

  tone({ frequency: bass, slideTo: bass * 1.008, duration: 0.16, volume: 0.05, type: "sine" });
  tone({ frequency: note, slideTo: note * 1.004, duration: 0.11, volume: 0.038, type: "triangle" });

  if (ambientNodes.step % 2 === 0) {
    tone({ frequency: note * 2, slideTo: note * 2.006, duration: 0.06, volume: 0.018, type: "square" });
  } else {
    tone({ frequency: note * 1.5, slideTo: note * 1.503, duration: 0.045, volume: 0.012, type: "triangle" });
  }

  ambientNodes.step += 1;
  if (ambientNodes.step >= 8) {
    ambientNodes.step = 0;
    ambientNodes.chordIndex += 1;
    ambientNodes.nextShift = nowPerf + 300;
  } else {
    ambientNodes.nextShift = nowPerf + (ambientNodes.step % 2 === 0 ? 180 : 140);
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
  if (playSample("coin", { volume: 0.34, playbackRate: 1 })) return;
  tone({ frequency: 680, slideTo: 980, duration: 0.07, volume: 0.06, type: "triangle" });
}

function playShieldSound() {
  if (playSample("shield", { volume: 0.32, playbackRate: 1 })) return;
  tone({ frequency: 320, slideTo: 760, duration: 0.14, volume: 0.08, type: "triangle" });
}

function playPurchaseSound() {
  if (playSample("purchase", { volume: 0.28, playbackRate: 1 })) return;
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
  if (playSample("boss", { volume: 0.36, playbackRate: 0.92 })) return;
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
  if (playSample("level", { volume: 0.26, playbackRate: 1.08 })) return;
  tone({ frequency: 340, slideTo: 560, duration: 0.11, volume: 0.06, type: "triangle" });
  tone({ frequency: 560, slideTo: 820, duration: 0.14, volume: 0.05, type: "triangle" });
}

function playRestartManualSound() {
  tone({ frequency: 260, slideTo: 520, duration: 0.1, volume: 0.05, type: "triangle" });
}

function spawnBurst(x, y, color, count = 8, speed = 220) {
  const particleCount = mobile.enabled ? Math.max(4, Math.round(count * 0.58)) : count;
  const limit = mobile.enabled ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP;
  if (world.particles.length >= limit) return;
  const finalCount = Math.min(particleCount, Math.max(0, limit - world.particles.length));
  for (let i = 0; i < finalCount; i += 1) {
    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.4;
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

function pickupRadiusFor(kind) {
  return kind === "coin" ? 16 : kind === "shield" ? 22 : kind === "fury" || kind === "chrono" ? 21 : 20;
}

function isPickupSpotFree(x, y, radius) {
  const edgePadding = 96;
  if (
    x < radius + edgePadding
    || y < radius + edgePadding
    || x > arena.width - radius - edgePadding
    || y > arena.height - radius - edgePadding
  ) {
    return false;
  }

  const probe = { x, y, radius: radius + 22 };
  if (obstacles.some((rect) => circleIntersectsRect(probe, rect))) {
    return false;
  }

  if (world.pickups.some((pickup) => length(pickup.x - x, pickup.y - y) < pickup.radius + radius + 42)) {
    return false;
  }

  const tooNearActor = [player, ally, ...enemies].some((entity) => (
    entity
    && entity.hp > 0
    && length(entity.x - x, entity.y - y) < getHurtRadius(entity) + radius + 68
  ));
  if (tooNearActor) return false;

  return true;
}

function findPickupSpot(preferredX, preferredY, radius) {
  const startX = clamp(preferredX, radius + 96, arena.width - radius - 96);
  const startY = clamp(preferredY, radius + 96, arena.height - radius - 96);
  if (isPickupSpotFree(startX, startY, radius)) {
    return { x: startX, y: startY };
  }

  const rings = [64, 110, 160, 220, 290];
  for (const ring of rings) {
    for (let i = 0; i < 12; i += 1) {
      const angle = (Math.PI * 2 * i) / 12;
      const x = clamp(startX + Math.cos(angle) * ring, radius + 96, arena.width - radius - 96);
      const y = clamp(startY + Math.sin(angle) * ring, radius + 96, arena.height - radius - 96);
      if (isPickupSpotFree(x, y, radius)) {
        return { x, y };
      }
    }
  }

  for (let tries = 0; tries < 40; tries += 1) {
    const x = radius + 96 + Math.random() * (arena.width - (radius + 96) * 2);
    const y = radius + 96 + Math.random() * (arena.height - (radius + 96) * 2);
    if (isPickupSpotFree(x, y, radius)) {
      return { x, y };
    }
  }

  return null;
}

function spawnApple() {
  if (world.pickups.length >= 5) return;
  for (let tries = 0; tries < 60; tries += 1) {
    const roll = Math.random();
    const kind = roll < 0.3
      ? "apple"
      : roll < 0.54
        ? "coin"
        : roll < 0.72
          ? "shield"
          : roll < 0.82
            ? "fury"
            : roll < 0.9
              ? "haste"
              : roll < 0.95
                ? "chrono"
                : roll < 0.985
                  ? "regen"
                  : "overclock";
    const radius = pickupRadiusFor(kind);
    const x = radius + 120 + Math.random() * (arena.width - (radius + 120) * 2);
    const y = radius + 120 + Math.random() * (arena.height - (radius + 120) * 2);
    if (spawnPickup(kind, x, y)) return;
  }
}

function spawnPickup(kind, x, y) {
  const radius = pickupRadiusFor(kind);
  const spot = findPickupSpot(x, y, radius);
  if (!spot) return false;
  world.pickups.push({ x: spot.x, y: spot.y, radius, pulse: Math.random() * Math.PI * 2, kind });
  return true;
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
      pushDamageText(pickup.x, pickup.y - 28, "+28", "#91ff87", 1.06);
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
      pushDamageText(pickup.x, pickup.y - 24, "+2$", "#ffd166", 1.02);
      playCoinSound();
    }
  } else if (pickup.kind === "shield") {
    spawnBurst(pickup.x, pickup.y, "#63ebff", 14, 220);
    entity.shieldTimer = Math.max(entity.shieldTimer, 10);
    if (entity === player) {
      pushDamageText(pickup.x, pickup.y - 26, "SHIELD", "#63ebff", 0.96);
      playShieldSound();
    }
  } else if (entity === player && pickup.kind === "fury") {
    spawnBurst(pickup.x, pickup.y, "#ff8b8b", 16, 240);
    applyPlayerBoost("fury");
    pushDamageText(pickup.x, pickup.y - 26, "DMG x2", "#ff8b8b", 1.02);
    lifetimeStats.powerups += 1;
    saveStats();
  } else if (entity === player && pickup.kind === "haste") {
    spawnBurst(pickup.x, pickup.y, "#63ebff", 16, 240);
    applyPlayerBoost("haste");
    pushDamageText(pickup.x, pickup.y - 26, "VITESSE", "#63ebff", 1.02);
    lifetimeStats.powerups += 1;
    saveStats();
  } else if (entity === player && pickup.kind === "chrono") {
    spawnBurst(pickup.x, pickup.y, "#d0b5ff", 16, 240);
    applyPlayerBoost("chrono");
    pushDamageText(pickup.x, pickup.y - 26, "CHRONO", "#d0b5ff", 1.02);
    lifetimeStats.powerups += 1;
    saveStats();
  } else if (entity === player && pickup.kind === "regen") {
    spawnBurst(pickup.x, pickup.y, "#7cff9c", 16, 240);
    applyPlayerBoost("regen");
    pushDamageText(pickup.x, pickup.y - 26, "REGEN", "#7cff9c", 1.02);
    lifetimeStats.powerups += 1;
    saveStats();
  } else if (entity === player && pickup.kind === "overclock") {
    spawnBurst(pickup.x, pickup.y, "#ffd166", 16, 240);
    applyPlayerBoost("overclock");
    pushDamageText(pickup.x, pickup.y - 26, "SURCHARGE", "#ffd166", 1.02);
    lifetimeStats.powerups += 1;
    saveStats();
  }

  world.pickups.splice(appleIndex, 1);
}

function applyTimedStatus(entity, type, duration) {
  if (!entity || entity.hp <= 0) return;
  if (type === "burn") {
    entity.burnTimer = Math.max(entity.burnTimer, duration);
    entity.burnTick = 0;
  } else if (type === "poison") {
    entity.poisonTimer = Math.max(entity.poisonTimer, duration);
    entity.poisonTick = 0;
  } else if (type === "virus") {
    entity.virusTimer = Math.max(entity.virusTimer, duration);
    entity.virusTick = 0;
  }
}

function spreadVirusFrom(entity, duration = 1.8) {
  enemies.forEach((other) => {
    if (!other || other === entity || other.hp <= 0) return;
    if (length(other.x - entity.x, other.y - entity.y) > 180) return;
    applyTimedStatus(other, "virus", duration);
    spawnBurst(other.x, other.y, "#63ff8f", 8, 160);
    pushDamageText(other.x, other.y - other.radius - 8, "VIRUS", "#63ff8f", 0.84);
  });
}

function explodeWeaponImpact(x, y, {
  radius = 72,
  damage = 10,
  color = "#ffd166",
  sourceWeapon = "grenade",
  sourceTeam = "ally",
  sourceArchetype = "player",
  pull = 0,
  freeze = 0,
  burn = 0,
  poison = 0,
  virus = 0
} = {}) {
  spawnRipple(x, y, color, radius, 5, 0.32);
  spawnBurst(x, y, color, 18, 240);
  const targets = sourceTeam === "ally" ? enemies : [player, ally].filter(Boolean);
  targets.forEach((entity) => {
    if (!entity || entity.hp <= 0) return;
    const dist = length(entity.x - x, entity.y - y);
    if (dist > radius + getHurtRadius(entity)) return;
    const falloff = clamp(1 - dist / Math.max(1, radius), 0.4, 1);
    if (pull > 0) {
      const pullDir = normalize(x - entity.x, y - entity.y);
      entity.vx += pullDir.x * pull * falloff;
      entity.vy += pullDir.y * pull * falloff;
    }
    if (freeze > 0) entity.slowTimer = Math.max(entity.slowTimer, freeze);
    if (burn > 0) applyTimedStatus(entity, "burn", burn);
    if (poison > 0) applyTimedStatus(entity, "poison", poison);
    if (virus > 0) applyTimedStatus(entity, "virus", virus);
    damageEntity(entity, damage * falloff, color, sourceArchetype, sourceTeam, sourceWeapon);
  });
}

function triggerArcChain(originX, originY, startEntity, bullet, jumps = 2) {
  let current = startEntity;
  const hitIds = new Set([current]);
  let chainDamage = bullet.damage * (bullet.chainFactor || 0.52);
  for (let i = 0; i < jumps; i += 1) {
    let next = null;
    let best = 260;
    enemies.forEach((enemy) => {
      if (!enemy || enemy.hp <= 0 || hitIds.has(enemy)) return;
      const dist = length(enemy.x - current.x, enemy.y - current.y);
      if (dist < best) {
        best = dist;
        next = enemy;
      }
    });
    if (!next) break;
    hitIds.add(next);
    spawnBurst(next.x, next.y, "#9ce6ff", 8, 170);
    spawnRipple(next.x, next.y, "#9ce6ff", 56, 2, 0.18);
    damageEntity(next, chainDamage, "#9ce6ff", bullet.sourceArchetype, bullet.team, bullet.weaponId);
    current = next;
    chainDamage *= 0.7;
  }
}

function spawnMineTrap(x, y, {
  team = "ally",
  damage = 16,
  radius = 88,
  life = 10,
  color = "#ffcf63",
  sourceWeapon = "mine",
  sourceArchetype = "player"
} = {}) {
  world.hazards.push({
    x,
    y,
    radius,
    life,
    maxLife: life,
    type: "mine",
    tick: 0,
    team,
    damage,
    color,
    armed: 0.28,
    sourceWeapon,
    sourceArchetype
  });
}

function spawnSupportDrone() {
  if (!player || player.hp <= 0) return false;
  if (player.droneCooldown > 0) return false;
  if (world.drones.length >= 2) return false;
  world.drones.push({
    angle: Math.random() * Math.PI * 2,
    orbitRadius: 72 + Math.random() * 18,
    life: 11,
    reload: 0.25,
    color: weaponAccent("drone")
  });
  player.droneCooldown = 6.4;
  showCombatBanner("Drone allie", "Un support leger rejoint le combat.", "lime", "Support", 1.2);
  return true;
}

function fireWeapon(entity, targetX, targetY, options = {}) {
  if (entity.reload > 0 || entity.hp <= 0) return;
  const weaponId = options.weapon || settings.weapon;
  const config = weaponConfigs[weaponId];
  const dx = targetX - entity.x;
  const dy = targetY - entity.y;
  const baseAngle = Math.atan2(dy, dx);
  const fromPlayer = entity === player;
  const playerCritChance = fromPlayer ? comboCritChance(weaponId) : 0;
  const overdriveBonus = fromPlayer && entity.overdriveTimer > 0 ? 1.12 : 1;
  const furyBonus = fromPlayer && entity.furyTimer > 0 ? 2 : 1;
  const playerReloadBoost = entity === player
    ? Math.max(0.42, 1 - progress.fireTier * 0.06 - (entity.hasteTimer > 0 ? 0.18 : 0) - (entity.overclockTimer > 0 ? 0.32 : 0))
    : 1;
  entity.angle = baseAngle;

  if (fromPlayer && weaponId === "katana") {
    const slashX = entity.x + Math.cos(baseAngle) * 92;
    const slashY = entity.y + Math.sin(baseAngle) * 92;
    entity.vx += Math.cos(baseAngle) * 760;
    entity.vy += Math.sin(baseAngle) * 760;
    entity.reload = (options.reload ?? config.reload) * playerReloadBoost;
    entity.recoil = Math.max(entity.recoil, config.shake * 1.1);
    world.session.shots += 1;
    lifetimeStats.shots += 1;
    lifetimeStats.weaponUsage[weaponId] = (lifetimeStats.weaponUsage[weaponId] || 0) + 1;
    saveStats();
    spawnBurst(slashX, slashY, "#ffffff", 18, 240);
    spawnRipple(slashX, slashY, "#ffffff", 92, 4, 0.22);
    enemies.forEach((enemy) => {
      if (!enemy || enemy.hp <= 0) return;
      if (length(enemy.x - slashX, enemy.y - slashY) <= 118 + getHurtRadius(enemy)) {
        damageEntity(enemy, (settings.bulletDamage + progress.attackTier * 2.5) * config.damageMul, "#ffffff", "player", "ally", weaponId);
      }
    });
    recoilKick = Math.max(recoilKick, config.shake * 0.9);
    cameraShake = Math.max(cameraShake, config.shake);
    playShootSound(weaponId);
    vibrate([8, 10, 8]);
    return;
  }

  if (fromPlayer && weaponId === "drone") {
    spawnSupportDrone();
  }

  for (let i = 0; i < config.pellets; i += 1) {
    const spread = (Math.random() - 0.5) * config.spread;
    const angle = baseAngle + spread;
    const crit = fromPlayer && Math.random() < playerCritChance;
    const spawnX = entity.x + Math.cos(angle) * (entity.radius + 8);
    const spawnY = entity.y + Math.sin(angle) * (entity.radius + 8);
    let chaosType = null;
    let bulletColor = crit ? "#fff1a8" : (options.color || (entity.team === "ally" ? settings.bulletColor : "#ff7f98"));
    let bounces = config.bounces || 0;
    let pierce = config.pierce || 0;
    let explosionRadius = config.explosionRadius || 0;
    let explosionDamageMul = config.explosionDamageMul || 0;
    let chainCount = config.chainCount || 0;
    let chainFactor = config.chainFactor || 0;
    let burn = config.burn || 0;
    let freeze = config.freeze || 0;
    let gravityRadius = config.gravityRadius || 0;
    let gravityPull = config.gravityPull || 0;
    let gravityBlast = config.gravityBlast || 0;
    let virus = config.virus || 0;
    let poison = config.poison || 0;
    let mineRadius = config.mineRadius || 0;
    let mineDamageMul = config.mineDamageMul || 0;
    let miniExplosion = config.miniExplosion || 0;

    if (fromPlayer && weaponId === "chaos") {
      const roll = Math.floor(Math.random() * 5);
      chaosType = ["explode", "freeze", "virus", "chain", "ricochet"][roll];
      if (chaosType === "explode") {
        explosionRadius = 74;
        explosionDamageMul = 0.68;
        bulletColor = "#ff946b";
      } else if (chaosType === "freeze") {
        freeze = 1.3;
        bulletColor = "#8fdcff";
      } else if (chaosType === "virus") {
        virus = 2.2;
        bulletColor = "#63ff8f";
      } else if (chaosType === "chain") {
        chainCount = 2;
        chainFactor = 0.48;
        bulletColor = "#c6a3ff";
      } else if (chaosType === "ricochet") {
        bounces = 2;
        bulletColor = "#ffd86f";
      }
    }

    const baseDamage = (options.damage || (settings.bulletDamage + progress.attackTier * 2.5)) * config.damageMul * overdriveBonus * furyBonus;
    world.bullets.push({
      x: spawnX,
      y: spawnY,
      prevX: spawnX,
      prevY: spawnY,
      vx: Math.cos(angle) * config.speed,
      vy: Math.sin(angle) * config.speed,
      radius: (options.radius || settings.bulletSize) * config.radiusMul * (config.pellets > 1 ? 0.9 : 1),
      damage: crit ? baseDamage * 1.6 : baseDamage,
      color: bulletColor,
      life: config.life,
      team: entity.team,
      sourceArchetype: entity.archetype,
      weaponId,
      crit,
      chaosType,
      bounces,
      pierce,
      explosionRadius,
      explosionDamageMul,
      chainCount,
      chainFactor,
      burn,
      freeze,
      gravityRadius,
      gravityPull,
      gravityBlast,
      virus,
      poison,
      mineRadius,
      mineDamageMul,
      miniExplosion,
      style: entity.team === "ally"
        ? (crit ? "pulse" : settings.bulletStyle)
        : (entity.archetype === "boss"
          ? "plasma"
          : entity.preferredWeapon === "shotgun"
            ? "ring"
            : entity.preferredWeapon === "sniper"
              ? "streak"
              : entity.preferredWeapon === "burst"
                ? "spark"
                : "dot")
    });
  }

  entity.reload = (options.reload ?? config.reload) * playerReloadBoost * (fromPlayer && entity.overdriveTimer > 0 ? 0.84 : 1);
  entity.recoil = Math.max(entity.recoil, config.shake * (fromPlayer ? 1.8 : 1));
  if (entity === player) {
    world.session.shots += config.pellets;
    lifetimeStats.shots += config.pellets;
    lifetimeStats.weaponUsage[weaponId] = (lifetimeStats.weaponUsage[weaponId] || 0) + config.pellets;
    saveStats();
  }
  spawnBurst(entity.x + Math.cos(baseAngle) * entity.radius, entity.y + Math.sin(baseAngle) * entity.radius, options.color || settings.bulletColor, config.burstFx, 90 + config.shake * 8);
  if (entity === player) {
    recoilKick = Math.max(recoilKick, config.shake * 1.2);
    cameraShake = Math.max(cameraShake, config.shake + (entity.overdriveTimer > 0 ? 1.4 : 0));
    playShootSound(weaponId);
    vibrate(12);
    if (weaponId === "shotgun") {
      spawnBurst(entity.x + Math.cos(baseAngle) * entity.radius, entity.y + Math.sin(baseAngle) * entity.radius, "#ffd166", 14, 130);
    } else if (weaponId === "sniper") {
      spawnBurst(entity.x + Math.cos(baseAngle) * entity.radius, entity.y + Math.sin(baseAngle) * entity.radius, "#ff8ddb", 10, 180);
    } else if (weaponId === "burst") {
      spawnBurst(entity.x + Math.cos(baseAngle) * entity.radius, entity.y + Math.sin(baseAngle) * entity.radius, "#ff9e6b", 10, 110);
    }
  }
}

function dash(entity, dirX, dirY) {
  if (entity.dashCooldown > 0 || entity.energy < 18 || entity.hp <= 0) return;
  const dir = normalize(dirX, dirY);
  const surgeReady = entity === player && comboValue >= 100;
  const power = entity === player ? 3420 + progress.dashTier * 312 + (surgeReady ? 360 : 0) + (entity.hasteTimer > 0 ? 260 : 0) : 1180;
  entity.vx += dir.x * power;
  entity.vy += dir.y * power;
  entity.energy = clamp(entity.energy - (entity === player ? Math.max(8, 18 - progress.dashTier * 2) : 18), 0, entity.maxEnergy);
  entity.dashCooldown = entity === player ? 0.22 : 1;
  spawnBurst(entity.x, entity.y, entity.color, 14, 260);
  if (entity === player) {
    world.session.dashes += 1;
    lifetimeStats.dashes += 1;
    saveStats();
    registerObjectiveProgress("dash", 1);
    cameraShake = surgeReady ? 16 : 10;
    playDashSound();
    vibrate([18, 12, 18]);
    if (surgeReady) {
      entity.overdriveTimer = Math.max(entity.overdriveTimer, 2.6);
      pulseShockwave(entity.x, entity.y, 220, 14 + progress.attackTier * 1.4, "#c8ff75");
      comboValue = 0;
      comboTimer = 0;
      comboReadyFx = 0;
      showCombatBanner("SURGE", "Dash amplifie, onde de choc et cadence montee.", "lime", "Combo", 1.55);
    }
  }
}

function applyWeaponImpact(entity, sourceWeapon, sourceTeam) {
  if (!entity || entity.hp <= 0 || sourceTeam !== "ally" || entity.team !== "enemy") return;
  const away = normalize(entity.x - player.x, entity.y - player.y);
  if (sourceWeapon === "shotgun") {
    entity.vx += away.x * 360;
    entity.vy += away.y * 360;
    spawnBurst(entity.x, entity.y, "#ffd166", 14, 250);
  } else if (sourceWeapon === "sniper") {
    entity.slowTimer = Math.max(entity.slowTimer, 0.82);
    entity.vx += away.x * 180;
    entity.vy += away.y * 180;
    spawnBurst(entity.x, entity.y, "#ff8ddb", 12, 220);
  } else if (sourceWeapon === "burst") {
    entity.vx += away.x * 140;
    entity.vy += away.y * 140;
    spawnBurst(entity.x, entity.y, "#ff9e6b", 8, 160);
  } else {
    entity.vx += away.x * 90;
    entity.vy += away.y * 90;
  }
}

function damageEntity(entity, amount, fromColor, sourceArchetype = "enemy", sourceTeam = "enemy", sourceWeapon = "rifle", hitMeta = {}) {
  if (!entity || entity.hp <= 0) return;
  if (entity.shieldTimer > 0) {
    spawnBurst(entity.x, entity.y, "#63ebff", 8, 160);
    pushDamageText(entity.x, entity.y - entity.radius - 8, "BLOC", "#63ebff", 0.9);
    if (entity === player) {
      tone({ frequency: 420, slideTo: 220, duration: 0.06, volume: 0.08, type: "square" });
    }
    return;
  }
  entity.hp = clamp(entity.hp - amount, 0, entity.maxHp);
  if (entity === player) {
    lastPlayerHitKind = sourceArchetype === "boss" ? "boss" : "enemy";
  }
  const fromPlayerTeam = sourceTeam === "ally" && entity.team === "enemy";
  const damageTextColor = fromPlayerTeam ? weaponAccent(sourceWeapon) : entity === player ? "#ff8ba1" : fromColor;
  const floatingText = hitMeta.crit ? `CRIT ${Math.round(amount)}` : `-${Math.round(amount)}`;
  pushDamageText(entity.x, entity.y - entity.radius - 10, floatingText, hitMeta.crit ? "#fff1a8" : damageTextColor, fromPlayerTeam ? 1.08 : 0.98);
  applyWeaponImpact(entity, sourceWeapon, sourceTeam);
  if (fromPlayerTeam) {
    hitMarkerTimer = entity.hp <= 0 ? 0.24 : hitMeta.crit ? 0.18 : 0.13;
    hitMarkerColor = hitMeta.crit ? "#fff1a8" : entity.hp <= 0 ? "#ffd166" : damageTextColor;
    hitPulse = Math.max(hitPulse, hitMeta.crit ? 1.4 : 0.8);
    if (sourceArchetype === "player") {
      registerPlayerHit({ amount, killed: entity.hp <= 0, crit: !!hitMeta.crit });
    }
  }
  entity.hitFlash = hitMeta.crit ? 0.2 : 0.14;
  impactFlash = hitMeta.crit ? 0.22 : 0.14;
  spawnBurst(entity.x, entity.y, hitMeta.crit ? "#fff1a8" : fromColor, hitMeta.crit ? 14 : 10, hitMeta.crit ? 280 : 220);
  playHitSound();

  if (entity.hp <= 0) {
    spawnBurst(entity.x, entity.y, hitMeta.crit ? "#fff1a8" : fromColor, 18, 320);
    spawnRipple(entity.x, entity.y, hitMeta.crit ? "#fff1a8" : fromColor, 96, 3, 0.24);
    cameraShake = Math.max(cameraShake, 14);
    if (entity.team === "enemy" && entity.virusTimer > 0) {
      spreadVirusFrom(entity, Math.max(1.4, entity.virusTimer));
    }
    if (entity.team === "enemy") {
      world.session.kills += 1;
      lifetimeStats.kills += 1;
      registerObjectiveProgress(world.objectiveType === "boss" ? (entity.archetype === "boss" ? "boss" : "_") : "tempo", 1);
      const coinReward = entity.archetype === "boss" ? 10 : 5;
      addCoins(coinReward);
      lifetimeStats.coinsEarned += coinReward;
      if (entity.archetype === "boss") {
        lifetimeStats.bosses += 1;
        showCombatBanner("Boss ecrase", `+${coinReward} pieces et arene nettoyee.`, "gold", "Nettoye", 1.95);
      }
      saveStats();
      saveProgress();
    }
  }
}

function updateEntityCooldowns(entity, dt) {
  entity.reload = Math.max(0, entity.reload - dt);
  entity.dashCooldown = Math.max(0, entity.dashCooldown - dt);
  entity.hitFlash = Math.max(0, entity.hitFlash - dt);
  entity.slowTimer = Math.max(0, entity.slowTimer - dt);
  entity.shieldTimer = Math.max(0, entity.shieldTimer - dt);
  entity.patternCooldown = Math.max(0, entity.patternCooldown - dt);
  entity.recoil = Math.max(0, entity.recoil - dt * 12);
  entity.overdriveTimer = Math.max(0, entity.overdriveTimer - dt);
  entity.droneCooldown = Math.max(0, (entity.droneCooldown || 0) - dt);
  entity.furyTimer = Math.max(0, (entity.furyTimer || 0) - dt);
  entity.hasteTimer = Math.max(0, (entity.hasteTimer || 0) - dt);
  entity.chronoTimer = Math.max(0, (entity.chronoTimer || 0) - dt);
  entity.regenTimer = Math.max(0, (entity.regenTimer || 0) - dt);
  entity.overclockTimer = Math.max(0, (entity.overclockTimer || 0) - dt);
  entity.energy = clamp(entity.energy + dt * 14, 0, entity.maxEnergy);
  if (entity.regenTimer > 0) {
    entity.hp = clamp(entity.hp + dt * 7.5, 0, entity.maxHp);
  }
}

function updatePlayer(dt) {
  if (!player || player.hp <= 0) return;
  const moveX = ((isPressed("right") ? 1 : 0) - (isPressed("left") ? 1 : 0)) + mobileMoveAxis("x");
  const moveY = ((isPressed("backward") ? 1 : 0) - (isPressed("forward") ? 1 : 0)) + mobileMoveAxis("y");
  const move = normalize(moveX, moveY);
  const moving = moveX !== 0 || moveY !== 0;
  const slowMul = player.slowTimer > 0 ? 0.8 : 1;
  const overdriveMul = player.overdriveTimer > 0 ? 1.08 : 1;
  const hasteMul = player.hasteTimer > 0 ? 1.18 : 1;
  const accel = (moving ? 1980 : 1220) * overdriveMul * hasteMul;
  const drag = moving ? 6.6 : 9.3;
  const speed = 452 * slowMul * overdriveMul * hasteMul;

  player.vx += move.x * accel * slowMul * dt;
  player.vy += move.y * accel * slowMul * dt;
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

  if (player.chronoTimer > 0) {
    enemies.forEach((enemy) => {
      enemy.slowTimer = Math.max(enemy.slowTimer, 0.08);
    });
  }

  if (isFiring()) {
    fireWeapon(player, worldPoint.x, worldPoint.y);
  }
}

function updateBot(entity, dt, opponentsOverride = null) {
  if (!entity || entity.hp <= 0) return;
  const opponents = opponentsOverride || (entity.team === "ally" ? livingEnemies() : livingAllies());
  if (!opponents.length) return;
  const target = nearestTarget(entity, opponents);
  if (!target) return;

  const dx = target.x - entity.x;
  const dy = target.y - entity.y;
  const dist = length(dx, dy);
  const dir = normalize(dx, dy);
  const orbit = entity.team === "enemy" ? 1 : -1;
  const desiredRange = entity.team === "enemy" ? entity.desiredRange : 300;
  const profile = entity.team === "enemy" ? enemyProfile(entity) : null;
  let strafe = dist > desiredRange ? 0.26 : 0.92;
  let rushBias = dist > desiredRange ? 1 : 0.42;

  if (profile) {
    strafe = dist > desiredRange ? profile.strafeFar : profile.strafeNear;
    if (entity.archetype === "runner") {
      rushBias = dist > desiredRange ? profile.rushBias : 0.76;
    } else if (entity.archetype === "tank") {
      rushBias = profile.rushBias;
    } else if (entity.archetype === "charger") {
      strafe = dist > desiredRange ? 0.08 : 0.18;
      rushBias = dist > desiredRange ? 1.58 : 1.02;
    } else if (entity.archetype === "orbiter") {
      strafe = dist > desiredRange ? 1.1 : 1.58;
      rushBias = dist > desiredRange ? 0.52 : 0.12;
    } else if (entity.archetype === "skirmisher") {
      strafe = dist > desiredRange ? 1.22 : 1.7;
      rushBias = dist > desiredRange ? 0.38 : -0.08;
    } else if (entity.archetype === "engineer") {
      strafe = dist > desiredRange ? 0.42 : 0.86;
      rushBias = dist > desiredRange ? 0.22 : -0.28;
    } else if (entity.archetype === "sniper") {
      rushBias = dist < desiredRange * 0.92 ? profile.rushBias : 0.64;
    } else if (entity.archetype === "boss") {
      rushBias = dist > desiredRange ? profile.rushBias : 0.58;
    }
  }
  const slowMul = entity.slowTimer > 0 ? 0.62 : 1;
  const speed = (entity.team === "enemy" ? getDifficulty(world.level).enemySpeed * entity.speedMul : 300) * slowMul;
  const orbitDir = entity.spinDir || orbit;

  entity.vx += (dir.x * rushBias + -dir.y * strafe * orbitDir) * speed * dt * 1.2;
  entity.vy += (dir.y * rushBias + dir.x * strafe * orbitDir) * speed * dt * 1.2;
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
      color: entity.team === "enemy" ? (profile?.shotColor || "#ff7f98") : "#7ae1ff",
      radius: entity.team === "enemy" ? (entity.archetype === "boss" ? 7 : 5.5) : 5,
      damage: entity.team === "enemy" ? entity.damageValue || diff.enemyDamage : 8,
      reload: entity.team === "enemy" ? entity.reloadValue || diff.enemyReload : weaponConfigs.rifle.reload
    });
  }

  if (entity.archetype === "charger" && dist < 460 && dist > 120 && entity.dashCooldown <= 0 && entity.energy > 24 && Math.random() < 0.05) {
    dash(entity, dir.x, dir.y);
  }

  if (entity.archetype === "engineer" && entity.patternCooldown <= 0 && dist < 480) {
    const trapX = clamp(target.x + rand(-90, 90), 100, arena.width - 100);
    const trapY = clamp(target.y + rand(-90, 90), 100, arena.height - 100);
    spawnMineTrap(trapX, trapY, {
      team: "enemy",
      damage: Math.max(8, entity.damageValue),
      radius: 92,
      color: "#d0b5ff",
      sourceWeapon: "mine",
      sourceArchetype: "engineer"
    });
    entity.patternCooldown = 3.2;
    showCombatBanner("Piege pose", "Un ingenieur verrouille une zone.", "hot", "Danger", 1.1);
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
      sourceArchetype: "boss",
      weaponId: "boss",
      style: "pulse"
    });
  }
  spawnBurst(entity.x, entity.y, "#ffbd59", 18, 180);
}

function addBossTelegraph(type, enemy) {
  if (!enemy || enemy.hp <= 0) return;
  if (type === "burst") {
    world.telegraphs.push({
      type,
      enemy,
      x: enemy.x,
      y: enemy.y,
      radius: 180,
      life: 0.95,
      maxLife: 0.95
    });
    ui.status.textContent = "Le boss charge une salve circulaire.";
    showCombatBanner("Salve du boss", "Eloignez-vous du centre du marquage.", "gold", "Danger", 1.45);
  } else if (type === "charge") {
    world.telegraphs.push({
      type,
      enemy,
      x: enemy.x,
      y: enemy.y,
      targetX: player.x,
      targetY: player.y,
      life: 0.72,
      maxLife: 0.72
    });
    ui.status.textContent = "Le boss verrouille une charge.";
    showCombatBanner("Charge du boss", "Restez mobile pour casser la ligne.", "hot", "Danger", 1.45);
  } else if (type === "hazard") {
    world.telegraphs.push({
      type,
      enemy,
      x: player.x,
      y: player.y,
      radius: 120,
      life: 1,
      maxLife: 1
    });
    ui.status.textContent = "Le boss prepare une zone toxique.";
    showCombatBanner("Zone toxique", "Bougez avant que le marquage explose.", "lime", "Danger", 1.45);
  } else if (type === "nova") {
    world.telegraphs.push({
      type,
      enemy,
      x: enemy.x,
      y: enemy.y,
      radius: 230,
      life: 1.08,
      maxLife: 1.08
    });
    ui.status.textContent = "Le boss prepare une onde nova.";
    showCombatBanner("Onde nova", "Sortez du cercle avant l'impact.", "hot", "Danger", 1.5);
  }
}

function spawnHazard(x, y, radius, life, type = "toxic", sourceArchetype = "enemy") {
  world.hazards.push({ x, y, radius, life, maxLife: life, type, tick: 0, sourceArchetype });
}

function updateBossPatterns(dt) {
  enemies.forEach((enemy) => {
    if (enemy.hp <= 0 || enemy.archetype !== "boss" || enemy.patternCooldown > 0) return;
    const roll = Math.random();
    if (roll < 0.38) {
      addBossTelegraph("burst", enemy);
    } else if (roll < 0.7) {
      addBossTelegraph("charge", enemy);
    } else if (roll < 0.9) {
      addBossTelegraph("hazard", enemy);
    } else {
      addBossTelegraph("nova", enemy);
    }
    cameraShake = Math.max(cameraShake, 8);
    enemy.patternCooldown = 3.55;
  });
}

function updateTelegraphs(dt) {
  world.telegraphs = world.telegraphs.filter((telegraph) => {
    telegraph.life -= dt;
    if (telegraph.enemy && telegraph.enemy.hp <= 0) return false;
    if (telegraph.type === "nova" && telegraph.enemy?.hp > 0) {
      telegraph.x = telegraph.enemy.x;
      telegraph.y = telegraph.enemy.y;
    }
    if (telegraph.life > 0) return true;

    if (telegraph.type === "burst" && telegraph.enemy?.hp > 0) {
      fireBossRadialBurst(telegraph.enemy);
      playBossBurstSound();
    } else if (telegraph.type === "charge" && telegraph.enemy?.hp > 0) {
      const chargeDir = normalize(telegraph.targetX - telegraph.enemy.x, telegraph.targetY - telegraph.enemy.y);
      telegraph.enemy.vx += chargeDir.x * 760;
      telegraph.enemy.vy += chargeDir.y * 760;
      spawnBurst(telegraph.enemy.x, telegraph.enemy.y, "#ff8c66", 16, 180);
      playBossJumpSound();
      ui.status.textContent = "Le boss part en charge.";
    } else if (telegraph.type === "hazard") {
      spawnHazard(telegraph.x, telegraph.y, telegraph.radius, 6, "toxic", "boss");
      playHazardSound();
      ui.status.textContent = "Zone toxique posee par le boss.";
    } else if (telegraph.type === "nova" && telegraph.enemy?.hp > 0) {
      spawnRipple(telegraph.x, telegraph.y, "#ff7d4f", telegraph.radius, 8, 0.48);
      spawnBurst(telegraph.x, telegraph.y, "#ff7d4f", 24, 320);
      [player, ally].filter(Boolean).forEach((entity) => {
        if (entity.hp <= 0) return;
        if (length(entity.x - telegraph.x, entity.y - telegraph.y) <= telegraph.radius + getHurtRadius(entity)) {
          damageEntity(entity, 16, "#ff7d4f", "boss", "enemy", "boss");
        }
      });
      playBossBurstSound();
      ui.status.textContent = "L'onde nova du boss explose.";
    }

    return false;
  });
}

function updateHazards(dt, actors = null) {
  const activeActors = actors || [player, ally, ...enemies].filter(Boolean);
  world.hazards = world.hazards.filter((hazard) => {
    hazard.life -= dt;
    hazard.tick -= dt;
    if (hazard.life <= 0) return false;
    if (hazard.type === "mine") {
      hazard.armed = Math.max(0, (hazard.armed || 0) - dt);
      const pulse = performance.now() / 220 + hazard.x * 0.015;
      hazard.pulse = 1 + Math.sin(pulse) * 0.08;
      if (hazard.armed > 0) return true;
      const triggerTarget = activeActors.find((entity) => {
        if (!entity || entity.hp <= 0 || entity.team === hazard.team) return false;
        return length(entity.x - hazard.x, entity.y - hazard.y) <= hazard.radius + getHurtRadius(entity);
      });
      if (!triggerTarget) return true;
      explodeWeaponImpact(hazard.x, hazard.y, {
        radius: hazard.radius,
        damage: hazard.damage,
        color: hazard.color,
        sourceWeapon: hazard.sourceWeapon,
        sourceTeam: hazard.team,
        sourceArchetype: hazard.sourceArchetype
      });
      spawnBurst(hazard.x, hazard.y, hazard.color, 12, 220);
      spawnRipple(hazard.x, hazard.y, hazard.color, hazard.radius * 1.1, 4, 0.24);
      return false;
    }
    if (hazard.tick <= 0) {
      activeActors.forEach((entity) => {
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

function updateDamageTexts(dt) {
  world.damageTexts = world.damageTexts.filter((item) => {
    item.life -= dt;
    item.y += item.vy * dt;
    item.vy *= Math.exp(-5.2 * dt);
    return item.life > 0;
  });
  hitMarkerTimer = Math.max(0, hitMarkerTimer - dt);
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
  } else if (world.eventType === "armory" && world.eventTimer <= 0) {
    spawnPickup(pick(["fury", "haste", "regen", "overclock"]), clamp(player.x + rand(-120, 120), 120, arena.width - 120), clamp(player.y + rand(-120, 120), 120, arena.height - 120));
    world.eventTimer = 5.2;
  } else if (world.eventType === "frenzy") {
    player.overdriveTimer = Math.max(player.overdriveTimer, 0.18);
  }
}

function updateBullets(dt, actors = null) {
  const activeActors = actors || [player, ally, ...enemies].filter(Boolean);
  world.bullets = world.bullets.filter((bullet) => {
    bullet.prevX = bullet.x;
    bullet.prevY = bullet.y;
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    bullet.life -= dt;
    if (bullet.life <= 0) return false;
    if (bullet.x < -60 || bullet.y < -60 || bullet.x > arena.width + 60 || bullet.y > arena.height + 60) return false;

    const probe = { x: bullet.x, y: bullet.y, radius: bullet.radius };
    const hitRect = obstacles.find((rect) => circleIntersectsRect(probe, rect));
    if (hitRect) {
      if (bullet.bounces > 0) {
        bullet.bounces -= 1;
        const nearestX = clamp(bullet.x, hitRect.x, hitRect.x + hitRect.w);
        const nearestY = clamp(bullet.y, hitRect.y, hitRect.y + hitRect.h);
        const dx = bullet.x - nearestX;
        const dy = bullet.y - nearestY;
        if (Math.abs(dx) > Math.abs(dy)) bullet.vx *= -1;
        else bullet.vy *= -1;
        spawnBurst(bullet.x, bullet.y, bullet.color, 4, 80);
        return true;
      }
      if (bullet.mineRadius) {
        spawnMineTrap(bullet.x, bullet.y, {
          team: bullet.team,
          damage: bullet.damage * (bullet.mineDamageMul || 1.2),
          radius: bullet.mineRadius,
          color: bullet.color,
          sourceWeapon: bullet.weaponId,
          sourceArchetype: bullet.sourceArchetype
        });
      } else if (bullet.explosionRadius || bullet.gravityRadius || bullet.miniExplosion) {
        explodeWeaponImpact(bullet.x, bullet.y, {
          radius: bullet.gravityRadius || bullet.explosionRadius || bullet.miniExplosion,
          damage: bullet.damage * (bullet.gravityBlast || bullet.explosionDamageMul || 0.6),
          color: bullet.color,
          sourceWeapon: bullet.weaponId,
          sourceTeam: bullet.team,
          sourceArchetype: bullet.sourceArchetype,
          pull: bullet.gravityPull || 0
        });
      }
      spawnBurst(bullet.x, bullet.y, bullet.color, 5, 90);
      return false;
    }

    for (const entity of activeActors) {
      if (!entity || entity.hp <= 0 || entity.team === bullet.team) continue;
      if (length(entity.x - bullet.x, entity.y - bullet.y) <= getHurtRadius(entity) + bullet.radius) {
        if (bullet.freeze) entity.slowTimer = Math.max(entity.slowTimer, bullet.freeze);
        if (bullet.burn) applyTimedStatus(entity, "burn", bullet.burn);
        if (bullet.poison) applyTimedStatus(entity, "poison", bullet.poison);
        if (bullet.virus) applyTimedStatus(entity, "virus", bullet.virus);
        if (bullet.chainCount) triggerArcChain(bullet.x, bullet.y, entity, bullet, bullet.chainCount);
        if (bullet.explosionRadius || bullet.gravityRadius || bullet.miniExplosion) {
          explodeWeaponImpact(bullet.x, bullet.y, {
            radius: bullet.gravityRadius || bullet.explosionRadius || bullet.miniExplosion,
            damage: bullet.damage * (bullet.gravityBlast || bullet.explosionDamageMul || 0.55),
            color: bullet.color,
            sourceWeapon: bullet.weaponId,
            sourceTeam: bullet.team,
            sourceArchetype: bullet.sourceArchetype,
            pull: bullet.gravityPull || 0,
            freeze: bullet.freeze || 0,
            burn: bullet.burn || 0,
            poison: bullet.poison || 0,
            virus: bullet.virus || 0
          });
        }
        damageEntity(entity, bullet.damage, bullet.color, bullet.sourceArchetype, bullet.team, bullet.weaponId, { crit: !!bullet.crit });
        if (bullet.pierce > 0) {
          bullet.pierce -= 1;
          bullet.damage *= 0.72;
          spawnBurst(bullet.x, bullet.y, bullet.color, 5, 100);
          return true;
        }
        if (bullet.mineRadius) {
          spawnMineTrap(bullet.x, bullet.y, {
            team: bullet.team,
            damage: bullet.damage * (bullet.mineDamageMul || 1.2),
            radius: bullet.mineRadius,
            color: bullet.color,
            sourceWeapon: bullet.weaponId,
            sourceArchetype: bullet.sourceArchetype
          });
        }
        return false;
      }
    }

    if (bullet.life <= dt * 1.25 && bullet.mineRadius) {
      spawnMineTrap(bullet.x, bullet.y, {
        team: bullet.team,
        damage: bullet.damage * (bullet.mineDamageMul || 1.2),
        radius: bullet.mineRadius,
        color: bullet.color,
        sourceWeapon: bullet.weaponId,
        sourceArchetype: bullet.sourceArchetype
      });
      return false;
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

function updateStatusEffects(dt, actors = null) {
  const activeActors = actors || [player, ally, ...enemies].filter(Boolean);
  activeActors.forEach((entity) => {
    if (!entity || entity.hp <= 0) return;

    if (entity.burnTimer > 0) {
      entity.burnTimer = Math.max(0, entity.burnTimer - dt);
      entity.burnTick -= dt;
      if (entity.burnTick <= 0) {
        entity.burnTick = 0.34;
        damageEntity(entity, 2.4, "#ff8f59", "player", entity.team === "enemy" ? "ally" : "enemy", "flamethrower");
        spawnBurst(entity.x, entity.y, "#ff8f59", 3, 60);
      }
    }

    if (entity.poisonTimer > 0) {
      entity.poisonTimer = Math.max(0, entity.poisonTimer - dt);
      entity.poisonTick -= dt;
      if (entity.poisonTick <= 0) {
        entity.poisonTick = 0.42;
        damageEntity(entity, 2.8, "#9cff88", "player", entity.team === "enemy" ? "ally" : "enemy", "poison");
        spawnBurst(entity.x, entity.y, "#9cff88", 3, 58);
      }
    }

    if (entity.virusTimer > 0) {
      entity.virusTimer = Math.max(0, entity.virusTimer - dt);
      entity.virusTick -= dt;
      if (entity.virusTick <= 0) {
        entity.virusTick = 0.5;
        damageEntity(entity, 3.2, "#63ff8f", "player", entity.team === "enemy" ? "ally" : "enemy", "virus");
        spawnBurst(entity.x, entity.y, "#63ff8f", 4, 72);
      }
    }
  });
}

function updateDrones(dt) {
  if (!player || player.hp <= 0) {
    world.drones = [];
    return;
  }
  world.drones = world.drones.filter((drone) => {
    drone.life -= dt;
    drone.reload -= dt;
    drone.angle += dt * 2.4;
    if (drone.life <= 0) return false;
    drone.x = player.x + Math.cos(drone.angle) * drone.orbitRadius;
    drone.y = player.y + Math.sin(drone.angle) * drone.orbitRadius * 0.8;
    const target = nearestTarget({ x: drone.x, y: drone.y }, enemies.filter((enemy) => enemy.hp > 0));
    if (target && drone.reload <= 0) {
      const aim = normalize(target.x - drone.x, target.y - drone.y);
      world.bullets.push({
        x: drone.x,
        y: drone.y,
        prevX: drone.x,
        prevY: drone.y,
        vx: aim.x * 1120,
        vy: aim.y * 1120,
        radius: 4.2,
        damage: 6 + progress.attackTier * 0.5,
        color: drone.color,
        life: 0.72,
        team: "ally",
        sourceArchetype: "player",
        weaponId: "drone",
        crit: false,
        bounces: 0,
        pierce: 0,
        chainCount: 0,
        chainFactor: 0,
        burn: 0,
        freeze: 0,
        gravityRadius: 0,
        gravityPull: 0,
        gravityBlast: 0,
        virus: 0,
        poison: 0,
        mineRadius: 0,
        mineDamageMul: 0,
        miniExplosion: 0,
        style: "pulse"
      });
      drone.reload = 0.42;
      spawnBurst(drone.x, drone.y, drone.color, 4, 90);
    }
    return true;
  });
}

function updateRipples(dt) {
  world.ripples = world.ripples.filter((ripple) => {
    ripple.life -= dt;
    return ripple.life > 0;
  });
}

function updateApples(dt, actors = null) {
  appleTimer -= dt;
  if (appleTimer <= 0) {
    spawnApple();
    appleTimer = 4.8 + Math.random() * 3.2;
  }

  world.pickups.forEach((pickup) => {
    pickup.pulse += dt * 4;
  });

  const activeActors = actors || [player, ally, ...enemies].filter((entity) => entity && entity.hp > 0);
  for (let i = world.pickups.length - 1; i >= 0; i -= 1) {
    const apple = world.pickups[i];
    for (const entity of activeActors) {
      if (length(entity.x - apple.x, entity.y - apple.y) <= entity.radius + apple.radius) {
        collectApple(entity, i);
        break;
      }
    }
  }
}

function updateGame(dt) {
  if (!player) return;
  lifetimeStats.timePlayed += dt;
  statsSaveTimer -= dt;
  uiRefreshTimer -= dt;
  updateCombatFlow(dt);
  updateEntityCooldowns(player, dt);
  if (ally) updateEntityCooldowns(ally, dt);
  enemies.forEach((enemy) => updateEntityCooldowns(enemy, dt));

  updatePlayer(dt);
  const aliveEnemies = enemies.filter((enemy) => enemy.hp > 0);
  const aliveAllies = [player, ally].filter((entity) => entity && entity.hp > 0);
  if (ally) updateBot(ally, dt, aliveEnemies);
  aliveEnemies.forEach((enemy) => updateBot(enemy, dt, aliveAllies));
  updateBossPatterns(dt);
  updateTelegraphs(dt);
  const activeActors = [...aliveAllies, ...aliveEnemies];
  updateBullets(dt, activeActors);
  updateParticles(dt);
  updateStatusEffects(dt, activeActors);
  updateDrones(dt);
  updateRipples(dt);
  updateDamageTexts(dt);
  updateApples(dt, activeActors);
  updateSpecialEvent(dt);
  updateHazards(dt, activeActors);

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
    ui.status.textContent = `Vous etes KO. Reprise dans ${settings.restartDelay}s.`;
    playGameOverSound();
  }

  if (gameOver) {
    if (settings.autoRestart) {
      restartTimer -= dt;
      ui.status.textContent = `Vous etes KO. Reprise dans ${Math.max(0, restartTimer).toFixed(1)}s.`;
      if (restartTimer <= 0) {
        playRestartSound();
        restartRun();
      }
    }
    if (uiRefreshTimer <= 0) {
      renderUI(false);
      uiRefreshTimer = mobile.enabled ? 1 / 18 : 1 / 28;
    }
    if (statsSaveTimer <= 0) {
      flushDirtyPersistence();
      statsSaveTimer = 3;
    }
    return;
  }

  if (enemies.length === 0) {
    if (!world.contractDone && (world.objectiveType === "purge" || world.objectiveType === "boss")) {
      completeObjective(world.objectiveType === "boss" ? "Prime boss" : "Vague nettoyee");
    }
    playWinSound();
    resetLevel(world.level + 1, false);
    return;
  }

  if (uiRefreshTimer <= 0) {
    renderUI(false);
    uiRefreshTimer = mobile.enabled ? 1 / 18 : 1 / 28;
  }
  if (statsSaveTimer <= 0) {
    flushDirtyPersistence();
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

function tracePoints(points) {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
}

function fillClosedTerrain(points, closeY, fillStyle, strokeStyle = null) {
  if (!points.length) return;
  tracePoints(points);
  ctx.lineTo(points[points.length - 1][0], closeY);
  ctx.lineTo(points[0][0], closeY);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawCrackStroke(points, options = {}) {
  if (points.length < 2) return;
  const {
    glow = "rgba(255,120,84,0.16)",
    core = "rgba(255,214,140,0.88)",
    width = 18,
    coreWidth = 5.5,
    highlight = "rgba(255,255,255,0.18)"
  } = options;
  ctx.save();
  tracePoints(points);
  ctx.strokeStyle = glow;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
  tracePoints(points);
  ctx.strokeStyle = core;
  ctx.lineWidth = coreWidth;
  ctx.stroke();
  tracePoints(points);
  ctx.strokeStyle = highlight;
  ctx.lineWidth = Math.max(1.6, coreWidth * 0.28);
  ctx.setLineDash([10, 16]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawBackground(camera) {
  const view = viewSize();
  const map = currentMapSpec();
  const desktopFx = !mobile.enabled && view.width >= 900;
  const gradient = ctx.createLinearGradient(0, 0, 0, view.height);
  gradient.addColorStop(0, map.colors.sky);
  gradient.addColorStop(1, map.colors.floor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, view.width, view.height);

  if (desktopFx) {
    const topGlow = ctx.createRadialGradient(view.width * 0.22, view.height * 0.06, 0, view.width * 0.22, view.height * 0.06, view.width * 0.46);
    topGlow.addColorStop(0, hexToRgba(weaponAccent(settings.weapon), 0.18));
    topGlow.addColorStop(1, hexToRgba(weaponAccent(settings.weapon), 0));
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, view.width, view.height);

    const sideGlow = ctx.createRadialGradient(view.width * 0.86, view.height * 0.24, 0, view.width * 0.86, view.height * 0.24, view.width * 0.38);
    sideGlow.addColorStop(0, hexToRgba("#ffffff", 0.06));
    sideGlow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sideGlow;
    ctx.fillRect(0, 0, view.width, view.height);

    ctx.save();
    ctx.translate(-(camera.x * 0.04), -(camera.y * 0.03));
    for (let i = 0; i < 8; i += 1) {
      const px = ((i * 281) % (view.width + 260)) - 140;
      const py = ((i * 167) % (view.height + 160)) - 80;
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.06)" : hexToRgba(weaponAccent(settings.weapon), 0.05);
      ctx.beginPath();
      ctx.arc(px, py, 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1.5;
    for (let i = -1; i < 4; i += 1) {
      const beamX = i * 240 + (camera.x * 0.06 % 240);
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX + 180, view.height);
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  const texturePattern = ctx.createPattern(getMapTextureTile(map), "repeat");
  if (texturePattern) {
    ctx.globalAlpha = desktopFx ? 0.9 : 0.55;
    ctx.fillStyle = texturePattern;
    ctx.fillRect(0, 0, arena.width, arena.height);
    ctx.globalAlpha = 1;
  }

  ctx.strokeStyle = map.colors.line;
  ctx.lineWidth = 1;
  for (let x = 0; x <= arena.width; x += 120) {
    ctx.strokeStyle = x % 480 === 0 ? hexToRgba("#ffffff", 0.07) : map.colors.line;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, arena.height);
    ctx.stroke();
  }
  for (let y = 0; y <= arena.height; y += 120) {
    ctx.strokeStyle = y % 480 === 0 ? hexToRgba("#ffffff", 0.07) : map.colors.line;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(arena.width, y);
    ctx.stroke();
  }

  if (desktopFx) {
    ctx.save();
    ctx.strokeStyle = hexToRgba(weaponAccent(settings.weapon), 0.08);
    ctx.lineWidth = 2;
    [420, 980, 1540].forEach((x, index) => {
      ctx.beginPath();
      ctx.arc(x, 240 + index * 320, 130 + index * 18, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.025)";
    ctx.lineWidth = 1;
    for (let x = 60; x <= arena.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, arena.height);
      ctx.stroke();
    }
    for (let y = 60; y <= arena.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(arena.width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (map.id === "neon-docks") {
    [
      [160, 160, 430, 210, 54],
      [1460, 220, 500, 230, 58],
      [240, 930, 560, 220, 60],
      [1380, 980, 470, 180, 54]
    ].forEach(([x, y, w, h, radius]) => {
      const basin = ctx.createLinearGradient(x, y, x, y + h);
      basin.addColorStop(0, "rgba(110,228,255,0.18)");
      basin.addColorStop(0.46, "rgba(56,146,214,0.12)");
      basin.addColorStop(1, "rgba(16,40,74,0.03)");
      ctx.fillStyle = basin;
      roundRect(x, y, w, h, radius);
      ctx.fill();
      ctx.strokeStyle = "rgba(168,240,255,0.16)";
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      roundRect(x + 12, y + 12, w - 24, h - 24, radius - 10);
      ctx.stroke();
    });

    const waterLane = ctx.createLinearGradient(0, 0, 0, 56);
    waterLane.addColorStop(0, "rgba(120,220,255,0.26)");
    waterLane.addColorStop(0.5, "rgba(64,165,220,0.16)");
    waterLane.addColorStop(1, "rgba(10,60,96,0.04)");
    ctx.fillStyle = waterLane;
    [210, 700, 1180].forEach((y) => {
      roundRect(120, y, arena.width - 240, 40, 20);
      ctx.fill();
      ctx.strokeStyle = "rgba(160,235,255,0.2)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(180, y + 18);
      ctx.bezierCurveTo(620, y - 4, 1520, y + 34, arena.width - 180, y + 14);
      ctx.stroke();
    });

    [
      [140, 132, 86, 260],
      [1040, 120, 62, 240],
      [1840, 182, 92, 290],
      [280, 880, 92, 330],
      [1090, 840, 68, 320],
      [1760, 940, 84, 210]
    ].forEach(([x, y, w, h]) => {
      ctx.fillStyle = "rgba(10,24,36,0.3)";
      roundRect(x, y, w, h, 22);
      ctx.fill();
      ctx.strokeStyle = "rgba(84,240,255,0.16)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    [380, 1520].forEach((x, index) => {
      const y = 360 + index * 420;
      const pool = ctx.createRadialGradient(x, y, 20, x, y, 180);
      pool.addColorStop(0, "rgba(170,240,255,0.22)");
      pool.addColorStop(0.55, "rgba(70,160,220,0.12)");
      pool.addColorStop(1, "rgba(20,60,96,0)");
      ctx.fillStyle = pool;
      ctx.beginPath();
      ctx.arc(x, y, 180, 0, Math.PI * 2);
      ctx.fill();
    });

    [
      [[220, 170], [480, 132], [760, 188], [1100, 146], [1450, 204], [1880, 158]],
      [[210, 660], [520, 612], [890, 694], [1250, 640], [1730, 710]],
      [[280, 1110], [640, 1068], [980, 1138], [1360, 1080], [1820, 1142]]
    ].forEach((points) => {
      ctx.strokeStyle = "rgba(180,245,255,0.14)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    });

    if (desktopFx) {
      ctx.save();
      ctx.strokeStyle = "rgba(84,240,255,0.16)";
      ctx.lineWidth = 2;
      [260, 760, 1260].forEach((y, index) => {
        ctx.beginPath();
        ctx.moveTo(200, y);
        ctx.bezierCurveTo(640, y - 50, 1560, y + 40, arena.width - 200, y - 30 + index * 8);
        ctx.stroke();
      });
      [420, 920, 1420, 1860].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, 248, 92, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
    }
  } else if (map.id === "ember-forge") {
    const ashShade = ctx.createLinearGradient(0, 0, 0, arena.height);
    ashShade.addColorStop(0, "rgba(28,6,4,0.18)");
    ashShade.addColorStop(0.45, "rgba(12,4,4,0)");
    ashShade.addColorStop(1, "rgba(0,0,0,0.18)");
    ctx.fillStyle = ashShade;
    ctx.fillRect(0, 0, arena.width, arena.height);

    const upperHeat = ctx.createLinearGradient(0, 0, 0, 260);
    upperHeat.addColorStop(0, "rgba(255,86,58,0.06)");
    upperHeat.addColorStop(0.45, "rgba(255,124,72,0.03)");
    upperHeat.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = upperHeat;
    ctx.fillRect(0, 0, arena.width, 260);

    const lavaBeds = [
      [190, 274, 300, 108, 46],
      [1530, 252, 366, 136, 56],
      [280, 960, 408, 156, 58],
      [1520, 1010, 380, 142, 52]
    ];
    lavaBeds.forEach(([x, y, w, h, radius]) => {
      const lavaBed = ctx.createLinearGradient(x, y, x, y + h);
      lavaBed.addColorStop(0, "rgba(255,112,62,0.16)");
      lavaBed.addColorStop(0.35, "rgba(255,136,72,0.28)");
      lavaBed.addColorStop(0.72, "rgba(255,214,126,0.16)");
      lavaBed.addColorStop(1, "rgba(70,10,6,0.04)");
      ctx.fillStyle = lavaBed;
      roundRect(x, y, w, h, radius);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,173,96,0.18)";
      ctx.lineWidth = 2.4;
      ctx.stroke();
    });

    [
      [[150, 880], [360, 824], [520, 906], [760, 860], [1010, 948], [1310, 884], [1710, 968], [2010, 918]],
      [[224, 470], [420, 430], [612, 500], [820, 456], [1060, 528], [1290, 470], [1520, 520], [1810, 470]],
      [[390, 660], [560, 706], [720, 662], [900, 736], [1180, 670], [1390, 734]],
      [[1460, 612], [1600, 566], [1740, 610], [1880, 548]]
    ].forEach((points, index) => {
      drawCrackStroke(points, {
        glow: index === 0 ? "rgba(255,104,64,0.26)" : "rgba(255,98,58,0.18)",
        core: index === 0 ? "rgba(255,214,120,0.94)" : "rgba(255,176,108,0.88)",
        width: index === 0 ? 34 : 22,
        coreWidth: index === 0 ? 9 : 5.4
      });
    });

    [
      [170, 718, 104, 150, 0.24],
      [606, 602, 138, 180, 0.2],
      [1120, 772, 160, 210, 0.22],
      [1718, 660, 116, 164, 0.18]
    ].forEach(([x, y, w, h, alpha]) => {
      const island = ctx.createLinearGradient(x, y, x, y + h);
      island.addColorStop(0, `rgba(52,20,14,${alpha + 0.16})`);
      island.addColorStop(1, `rgba(14,6,6,${alpha + 0.34})`);
      ctx.fillStyle = island;
      roundRect(x, y, w, h, 32);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,150,88,0.12)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    const lavaRiver = ctx.createLinearGradient(0, arena.height - 340, 0, arena.height - 110);
    lavaRiver.addColorStop(0, "rgba(255,86,58,0.1)");
    lavaRiver.addColorStop(0.28, "rgba(255,112,62,0.28)");
    lavaRiver.addColorStop(0.7, "rgba(255,188,84,0.18)");
    lavaRiver.addColorStop(1, "rgba(86,14,8,0.06)");
    ctx.fillStyle = lavaRiver;
    roundRect(110, arena.height - 320, arena.width - 220, 172, 64);
    ctx.fill();
    drawCrackStroke(
      [
        [160, arena.height - 238],
        [420, arena.height - 274],
        [720, arena.height - 228],
        [1010, arena.height - 278],
        [1310, arena.height - 216],
        [1600, arena.height - 262],
        [arena.width - 170, arena.height - 228]
      ],
      {
        glow: "rgba(255,94,60,0.28)",
        core: "rgba(255,214,120,0.92)",
        width: 40,
        coreWidth: 10
      }
    );

    [390, 980, 1640].forEach((x, index) => {
      const y = 240 + index * 36;
      ctx.fillStyle = "rgba(255,164,84,0.08)";
      ctx.beginPath();
      ctx.arc(x, y, 88, 0, Math.PI * 2);
      ctx.fill();
      const vent = ctx.createRadialGradient(x, y, 12, x, y, 100);
      vent.addColorStop(0, "rgba(255,212,126,0.34)");
      vent.addColorStop(0.42, "rgba(255,118,70,0.18)");
      vent.addColorStop(1, "rgba(255,118,70,0)");
      ctx.fillStyle = vent;
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, Math.PI * 2);
      ctx.fill();
    });

    if (desktopFx) {
      ctx.save();
      ctx.fillStyle = "rgba(255,124,80,0.04)";
      [
        [220, 182, 58, arena.height - 360],
        [760, 144, 62, arena.height - 420],
        [1310, 170, 54, arena.height - 390],
        [1850, 126, 60, arena.height - 450]
      ].forEach(([x, y, w, h]) => {
        roundRect(x, y, w, h, 26);
        ctx.fill();
      });
      ctx.restore();
    }
  } else if (map.id === "toxic-lab") {
    [
      [280, 180, 260, 180, 52],
      [980, 160, 360, 220, 68],
      [1560, 220, 260, 170, 48],
      [180, 870, 340, 190, 58],
      [1160, 900, 520, 230, 72]
    ].forEach(([x, y, w, h, radius]) => {
      const toxicPool = ctx.createLinearGradient(x, y, x, y + h);
      toxicPool.addColorStop(0, "rgba(170,255,140,0.16)");
      toxicPool.addColorStop(0.45, "rgba(90,202,86,0.12)");
      toxicPool.addColorStop(1, "rgba(18,56,22,0.04)");
      ctx.fillStyle = toxicPool;
      roundRect(x, y, w, h, radius);
      ctx.fill();
      ctx.strokeStyle = "rgba(178,255,160,0.16)";
      ctx.lineWidth = 2.2;
      ctx.stroke();
    });

    [340, 980, 1620].forEach((x, index) => {
      const grass = ctx.createRadialGradient(x, 260 + index * 280, 20, x, 260 + index * 280, 120);
      grass.addColorStop(0, "rgba(170,255,140,0.18)");
      grass.addColorStop(0.55, "rgba(82,170,72,0.12)");
      grass.addColorStop(1, "rgba(28,70,28,0)");
      ctx.fillStyle = grass;
      ctx.beginPath();
      ctx.arc(x, 260 + index * 280, 120, 0, Math.PI * 2);
      ctx.fill();
    });

    [
      [260, 860, 320, 180],
      [1180, 220, 420, 220],
      [1500, 910, 260, 150],
      [680, 560, 260, 160]
    ].forEach(([x, y, w, h]) => {
      const moss = ctx.createLinearGradient(x, y, x, y + h);
      moss.addColorStop(0, "rgba(140,255,125,0.14)");
      moss.addColorStop(1, "rgba(42,100,38,0.05)");
      ctx.fillStyle = moss;
      roundRect(x, y, w, h, 42);
      ctx.fill();
      ctx.strokeStyle = "rgba(160,255,136,0.1)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
    });

    [
      [[200, 260], [420, 180], [660, 310], [910, 262], [1220, 338], [1560, 220], [1880, 296]],
      [[220, 1110], [450, 1020], [720, 1090], [980, 1008], [1320, 1098], [1680, 1036]],
      [[520, 620], [680, 520], [860, 664], [1050, 560], [1240, 680]]
    ].forEach((points) => {
      ctx.strokeStyle = "rgba(148,255,138,0.16)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    });

    for (let i = 0; i < 18; i += 1) {
      const x = 180 + i * 110;
      const y = 220 + (i % 3) * 280;
      ctx.strokeStyle = "rgba(196,255,164,0.08)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x, y + 50);
      ctx.bezierCurveTo(x + 16, y - 10, x + 44, y + 24, x + 62, y - 34);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(145,255,135,0.16)";
    ctx.lineWidth = 4;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.moveTo(220, arena.height - 170);
    ctx.lineTo(arena.width - 220, arena.height - 170);
    ctx.stroke();
    ctx.setLineDash([]);

    if (desktopFx) {
      ctx.save();
      ctx.strokeStyle = "rgba(145,255,135,0.14)";
      ctx.lineWidth = 2;
      [460, 980, 1500].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, arena.height - 280, 96, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
    }
  } else if (map.id === "mirror-core") {
    [
      [arena.width / 2 - 110, 120, 220, arena.height - 240, 54],
      [220, 230, 260, 180, 42],
      [1520, 240, 320, 200, 46],
      [320, 910, 360, 160, 44],
      [1460, 930, 300, 150, 40]
    ].forEach(([x, y, w, h, radius]) => {
      const mirrorGlow = ctx.createLinearGradient(x, y, x + w, y + h);
      mirrorGlow.addColorStop(0, "rgba(180,232,255,0.12)");
      mirrorGlow.addColorStop(0.5, "rgba(84,150,255,0.08)");
      mirrorGlow.addColorStop(1, "rgba(16,30,64,0.04)");
      ctx.fillStyle = mirrorGlow;
      roundRect(x, y, w, h, radius);
      ctx.fill();
      ctx.strokeStyle = "rgba(168,228,255,0.16)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.fillStyle = "rgba(141,212,255,0.07)";
    roundRect(arena.width / 2 - 80, 140, 160, arena.height - 280, 40);
    ctx.fill();
    ctx.strokeStyle = "rgba(141,212,255,0.16)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(arena.width / 2, 100);
    ctx.lineTo(arena.width / 2, arena.height - 100);
    ctx.stroke();

    [
      [360, 230, 82],
      [620, 980, 68],
      [1080, 310, 92],
      [1530, 1080, 78],
      [1810, 520, 72]
    ].forEach(([x, y, size]) => {
      ctx.fillStyle = "rgba(172,228,255,0.05)";
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.5, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.5, y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(200,240,255,0.12)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    [320, 540, 860, 1080].forEach((y, index) => {
      ctx.strokeStyle = index % 2 === 0 ? "rgba(141,212,255,0.14)" : "rgba(255,255,255,0.08)";
      ctx.lineWidth = index % 2 === 0 ? 2 : 1.4;
      ctx.beginPath();
      ctx.moveTo(280, y);
      ctx.lineTo(arena.width - 280, y);
      ctx.stroke();
    });

    [
      [[260, 220], [720, 420], [1140, 240], [1660, 430]],
      [[320, 1130], [760, 930], [1180, 1120], [1750, 940]]
    ].forEach((points) => {
      ctx.strokeStyle = "rgba(186,234,255,0.12)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    });

    if (desktopFx) {
      ctx.save();
      ctx.strokeStyle = "rgba(141,212,255,0.12)";
      ctx.lineWidth = 2;
      [420, 920, 1420, 1780].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, 260, 82, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
    }
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
    ctx.fillStyle = "rgba(0,0,0,0.24)";
    roundRect(rect.x + 12, rect.y + 18, rect.w, rect.h, 26);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.025)";
    roundRect(rect.x - 4, rect.y - 4, rect.w + 8, rect.h + 8, 28);
    ctx.fill();

    const blockGradient = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.w, rect.y + rect.h);
    blockGradient.addColorStop(0, map.colors.obstacleA);
    blockGradient.addColorStop(0.52, hexToRgba("#182b38", 0.92));
    blockGradient.addColorStop(1, map.colors.obstacleB);
    ctx.fillStyle = blockGradient;
    roundRect(rect.x, rect.y, rect.w, rect.h, 24);
    ctx.fill();

    const gloss = ctx.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.h);
    gloss.addColorStop(0, "rgba(255,255,255,0.1)");
    gloss.addColorStop(0.14, "rgba(255,255,255,0.035)");
    gloss.addColorStop(0.5, "rgba(255,255,255,0)");
    ctx.fillStyle = gloss;
    roundRect(rect.x + 8, rect.y + 8, rect.w - 16, Math.max(22, rect.h * 0.22), 14);
    ctx.fill();

    ctx.fillStyle = "rgba(0,0,0,0.12)";
    roundRect(rect.x + 12, rect.y + rect.h - 30, rect.w - 24, 14, 9);
    ctx.fill();

    ctx.strokeStyle = map.colors.obstacleStroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    roundRect(rect.x + 10, rect.y + 10, rect.w - 20, rect.h - 20, 18);
    ctx.stroke();

    const seamColor = map.id === "ember-forge"
      ? "rgba(255,164,84,0.18)"
      : map.id === "toxic-lab"
        ? "rgba(145,255,135,0.18)"
        : map.id === "mirror-core"
          ? "rgba(141,212,255,0.18)"
          : "rgba(84,240,255,0.18)";
    ctx.strokeStyle = seamColor;
    ctx.lineWidth = 1.4;
    if (rect.w > 180) {
      const cuts = Math.max(1, Math.floor(rect.w / 140));
      for (let i = 1; i <= cuts; i += 1) {
        const sx = rect.x + (rect.w / (cuts + 1)) * i;
        ctx.beginPath();
        ctx.moveTo(sx, rect.y + 18);
        ctx.lineTo(sx, rect.y + rect.h - 18);
        ctx.stroke();
      }
    }
    if (rect.h > 150) {
      const cuts = Math.max(1, Math.floor(rect.h / 130));
      for (let i = 1; i <= cuts; i += 1) {
        const sy = rect.y + (rect.h / (cuts + 1)) * i;
        ctx.beginPath();
        ctx.moveTo(rect.x + 18, sy);
        ctx.lineTo(rect.x + rect.w - 18, sy);
        ctx.stroke();
      }
    }

    const bolts = [
      [rect.x + 18, rect.y + 18],
      [rect.x + rect.w - 18, rect.y + 18],
      [rect.x + 18, rect.y + rect.h - 18],
      [rect.x + rect.w - 18, rect.y + rect.h - 18]
    ];
    bolts.forEach(([bx, by]) => {
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.beginPath();
      ctx.arc(bx + 2, by + 2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bx - 2, by);
      ctx.lineTo(bx + 2, by);
      ctx.moveTo(bx, by - 2);
      ctx.lineTo(bx, by + 2);
      ctx.stroke();
    });

    if (map.id === "neon-docks") {
      ctx.strokeStyle = "rgba(84,240,255,0.22)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rect.x + 26, rect.y + rect.h - 24);
      ctx.lineTo(rect.x + rect.w - 26, rect.y + rect.h - 24);
      ctx.stroke();
      ctx.fillStyle = "rgba(84,240,255,0.08)";
      roundRect(rect.x + 18, rect.y + 18, 22, rect.h - 36, 10);
      ctx.fill();
    } else if (map.id === "ember-forge") {
      ctx.fillStyle = "rgba(255,164,84,0.08)";
      roundRect(rect.x + 18, rect.y + 18, rect.w - 36, 16, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,164,84,0.22)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rect.x + 24, rect.y + rect.h - 26);
      ctx.lineTo(rect.x + rect.w - 24, rect.y + rect.h - 26);
      ctx.stroke();
    } else if (map.id === "toxic-lab") {
      ctx.fillStyle = "rgba(145,255,135,0.07)";
      [0.24, 0.5, 0.76].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(rect.x + rect.w * ratio, rect.y + rect.h * 0.22, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.strokeStyle = "rgba(145,255,135,0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rect.x + 22, rect.y + rect.h - 24);
      ctx.lineTo(rect.x + rect.w - 22, rect.y + rect.h - 24);
      ctx.stroke();
    } else if (map.id === "mirror-core") {
      ctx.strokeStyle = "rgba(141,212,255,0.22)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rect.x + rect.w / 2, rect.y + 18);
      ctx.lineTo(rect.x + rect.w / 2, rect.y + rect.h - 18);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rect.x + 18, rect.y + rect.h / 2);
      ctx.lineTo(rect.x + rect.w - 18, rect.y + rect.h / 2);
      ctx.stroke();
    }

    if (desktopFx) {
      ctx.strokeStyle = hexToRgba(weaponAccent(settings.weapon), 0.08);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rect.x + 24, rect.y + rect.h - 22);
      ctx.lineTo(rect.x + rect.w - 24, rect.y + rect.h - 22);
      ctx.stroke();
      ctx.strokeStyle = hexToRgba("#ffffff", 0.04);
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(rect.x + 24, rect.y + 24);
      ctx.lineTo(rect.x + rect.w - 24, rect.y + rect.h - 24);
      ctx.stroke();
      ctx.setLineDash([]);
    }
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
      const pulse = 1 + Math.sin(apple.pulse * 1.2) * 0.08;
      const y = apple.y + bob;
      ctx.shadowBlur = 28;
      ctx.shadowColor = "#63ebff";
      ctx.fillStyle = "rgba(99,235,255,0.14)";
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius * 1.12 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(99,235,255,0.7)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius * 0.98 * pulse, Math.PI * 0.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.42)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius * 0.68, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
      ctx.fillStyle = "rgba(12,40,56,0.92)";
      ctx.beginPath();
      ctx.moveTo(apple.x, y - apple.radius * 0.64);
      ctx.lineTo(apple.x - apple.radius * 0.52, y - apple.radius * 0.14);
      ctx.lineTo(apple.x - apple.radius * 0.34, y + apple.radius * 0.48);
      ctx.lineTo(apple.x, y + apple.radius * 0.72);
      ctx.lineTo(apple.x + apple.radius * 0.34, y + apple.radius * 0.48);
      ctx.lineTo(apple.x + apple.radius * 0.52, y - apple.radius * 0.14);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#63ebff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.arc(apple.x, y - apple.radius * 0.12, apple.radius * 0.12, 0, Math.PI * 2);
      ctx.fill();
    } else if (apple.kind === "fury" || apple.kind === "haste" || apple.kind === "chrono" || apple.kind === "regen" || apple.kind === "overclock") {
      const y = apple.y + bob;
      const palette = apple.kind === "fury"
        ? { glow: "#ff8b8b", core: "#ff5f72", mark: "DMG" }
        : apple.kind === "haste"
          ? { glow: "#63ebff", core: "#4bc8ff", mark: "VIT" }
          : apple.kind === "chrono"
            ? { glow: "#d0b5ff", core: "#b38fff", mark: "T" }
            : apple.kind === "regen"
              ? { glow: "#7cff9c", core: "#45d86f", mark: "+" }
              : { glow: "#ffd166", core: "#ffb84d", mark: "OVR" };
      ctx.shadowBlur = 28;
      ctx.shadowColor = palette.glow;
      ctx.fillStyle = hexToRgba(palette.glow, 0.18);
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius * 1.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(12,18,26,0.92)";
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = palette.glow;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius - 1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = palette.core;
      ctx.beginPath();
      ctx.moveTo(apple.x, y - apple.radius * 0.74);
      ctx.lineTo(apple.x + apple.radius * 0.7, y);
      ctx.lineTo(apple.x, y + apple.radius * 0.74);
      ctx.lineTo(apple.x - apple.radius * 0.7, y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#041016";
      ctx.font = apple.kind === "overclock" ? "700 10px Rajdhani" : "700 11px Rajdhani";
      ctx.textAlign = "center";
      ctx.fillText(palette.mark, apple.x, y + 4);
    } else {
      const y = apple.y + bob;
      const appleGrad = ctx.createRadialGradient(apple.x - apple.radius * 0.34, y - apple.radius * 0.5, 2, apple.x, y, apple.radius * 1.2);
      appleGrad.addColorStop(0, "#ffe3a6");
      appleGrad.addColorStop(0.2, "#ff9a88");
      appleGrad.addColorStop(0.62, "#e4475e");
      appleGrad.addColorStop(1, "#7d1420");
      ctx.shadowBlur = 24;
      ctx.shadowColor = "rgba(255,110,130,0.65)";
      ctx.fillStyle = appleGrad;
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.26)";
      ctx.beginPath();
      ctx.ellipse(apple.x - apple.radius * 0.34, y - apple.radius * 0.36, apple.radius * 0.22, apple.radius * 0.34, -0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(120,18,30,0.42)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(apple.x, y, apple.radius - 1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "#5a2c10";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(apple.x + 1, y - apple.radius * 0.92);
      ctx.quadraticCurveTo(apple.x + 6, y - apple.radius * 1.22, apple.x + 2, y - apple.radius * 1.45);
      ctx.stroke();
      ctx.fillStyle = "#7ff05e";
      ctx.beginPath();
      ctx.ellipse(apple.x + apple.radius * 0.22, y - apple.radius * 0.94, apple.radius * 0.34, apple.radius * 0.18, -0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });
  ctx.restore();
}

function drawHazards(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.hazards.forEach((hazard) => {
    if (hazard.type === "mine") {
      const pulse = hazard.pulse || 1;
      ctx.shadowBlur = 20;
      ctx.shadowColor = hazard.color;
      ctx.fillStyle = "rgba(12,18,26,0.92)";
      ctx.beginPath();
      ctx.arc(hazard.x, hazard.y, 13 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = hexToRgba(hazard.color, hazard.armed > 0 ? 0.5 : 0.88);
      ctx.lineWidth = hazard.armed > 0 ? 2 : 3;
      ctx.beginPath();
      ctx.arc(hazard.x, hazard.y, 18 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(hazard.x, hazard.y, Math.max(26, hazard.radius * 0.32) * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = hexToRgba(hazard.color, hazard.armed > 0 ? 0.52 : 0.92);
      for (let i = 0; i < 3; i += 1) {
        const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
        const px = hazard.x + Math.cos(angle) * 22;
        const py = hazard.y + Math.sin(angle) * 22;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - 5, py + 10);
        ctx.lineTo(px + 5, py + 10);
        ctx.closePath();
        ctx.fill();
      }
      return;
    }
    const alpha = Math.min(0.36, hazard.life / Math.max(0.001, hazard.maxLife) * 0.36);
    const pulse = 1 + Math.sin((performance.now() / 180) + hazard.x * 0.01) * 0.04;
    const inner = hazard.type === "toxic" ? `rgba(145,255,135,${alpha * 0.95})` : `rgba(255,209,102,${alpha * 0.95})`;
    const outer = hazard.type === "toxic" ? `rgba(52,120,48,${alpha * 0.2})` : `rgba(120,82,18,${alpha * 0.2})`;
    const ring = hazard.type === "toxic" ? "rgba(145,255,135,0.56)" : "rgba(255,209,102,0.56)";
    const glow = ctx.createRadialGradient(hazard.x, hazard.y, hazard.radius * 0.12, hazard.x, hazard.y, hazard.radius * 1.08);
    glow.addColorStop(0, inner);
    glow.addColorStop(0.55, hazard.type === "toxic" ? `rgba(125,255,120,${alpha * 0.22})` : `rgba(255,209,102,${alpha * 0.22})`);
    glow.addColorStop(1, outer);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(hazard.x, hazard.y, hazard.radius * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ring;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(hazard.x, hazard.y, hazard.radius * 0.72 * pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  });
  ctx.restore();
}

function drawDrones(camera) {
  if (!world.drones.length) return;
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.drones.forEach((drone) => {
    const x = drone.x ?? player.x;
    const y = drone.y ?? player.y;
    const glow = ctx.createRadialGradient(x, y, 3, x, y, 30);
    glow.addColorStop(0, hexToRgba(drone.color, 0.32));
    glow.addColorStop(1, hexToRgba(drone.color, 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(12,20,28,0.92)";
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = hexToRgba(drone.color, 0.9);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.38)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - 7, y);
    ctx.lineTo(x + 7, y);
    ctx.moveTo(x, y - 7);
    ctx.lineTo(x, y + 7);
    ctx.stroke();
    ctx.fillStyle = hexToRgba(drone.color, 0.65);
    ctx.beginPath();
    ctx.arc(x, y - 2, 3.2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawTelegraphs(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.telegraphs.forEach((telegraph) => {
    const progressRatio = 1 - telegraph.life / telegraph.maxLife;
    const pulse = 1 + Math.sin(progressRatio * 18) * 0.08;
    if (telegraph.type === "burst" || telegraph.type === "hazard") {
      const color = telegraph.type === "hazard" ? "rgba(145,255,135,0.9)" : "rgba(255,189,89,0.94)";
      const fill = ctx.createRadialGradient(telegraph.x, telegraph.y, telegraph.radius * 0.2, telegraph.x, telegraph.y, telegraph.radius * pulse);
      fill.addColorStop(0, telegraph.type === "hazard" ? "rgba(145,255,135,0.14)" : "rgba(255,189,89,0.16)");
      fill.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fill;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(telegraph.x, telegraph.y, telegraph.radius * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.arc(telegraph.x, telegraph.y, telegraph.radius * 0.72 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(telegraph.x, telegraph.y, telegraph.radius * 0.42 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (telegraph.type === "charge") {
      ctx.strokeStyle = "rgba(255,140,102,0.88)";
      ctx.lineWidth = 5;
      ctx.setLineDash([18, 12]);
      ctx.beginPath();
      ctx.moveTo(telegraph.enemy.x, telegraph.enemy.y);
      ctx.lineTo(telegraph.targetX, telegraph.targetY);
      ctx.stroke();
      ctx.setLineDash([]);
      const chargeGlow = ctx.createRadialGradient(telegraph.targetX, telegraph.targetY, 8, telegraph.targetX, telegraph.targetY, 70 + progressRatio * 24);
      chargeGlow.addColorStop(0, "rgba(255,160,120,0.26)");
      chargeGlow.addColorStop(1, "rgba(255,140,102,0)");
      ctx.fillStyle = chargeGlow;
      ctx.beginPath();
      ctx.arc(telegraph.targetX, telegraph.targetY, 34 + progressRatio * 24, 0, Math.PI * 2);
      ctx.fill();
    } else if (telegraph.type === "nova") {
      const radius = telegraph.radius * (0.72 + progressRatio * 0.28);
      const glow = ctx.createRadialGradient(telegraph.x, telegraph.y, radius * 0.18, telegraph.x, telegraph.y, radius * 1.05);
      glow.addColorStop(0, "rgba(255,110,84,0.08)");
      glow.addColorStop(0.55, "rgba(255,110,84,0.12)");
      glow.addColorStop(1, "rgba(255,110,84,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(telegraph.x, telegraph.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,132,92,0.92)";
      ctx.lineWidth = 4;
      ctx.setLineDash([16, 10]);
      ctx.beginPath();
      ctx.arc(telegraph.x, telegraph.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  });
  ctx.restore();
}

function drawRipples(camera) {
  if (!world.ripples.length) return;
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.ripples.forEach((ripple) => {
    const alpha = ripple.life / ripple.maxLife;
    ctx.strokeStyle = hexToRgba(ripple.color, alpha * 0.75);
    ctx.lineWidth = ripple.lineWidth;
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius * (1 - alpha * 0.35), 0, Math.PI * 2);
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

function drawDamageTexts(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.damageTexts.forEach((item) => {
    ctx.globalAlpha = Math.max(0, item.life / item.maxLife);
    ctx.fillStyle = item.color;
    ctx.font = `${Math.round(18 * item.scale + 6)}px Rajdhani`;
    ctx.textAlign = "center";
    ctx.shadowBlur = 16;
    ctx.shadowColor = item.color;
    ctx.fillText(item.text, item.x, item.y);
  });
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawBullets(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.bullets.forEach((bullet) => {
    ctx.shadowBlur = 18;
    ctx.shadowColor = bullet.color;
    const dir = normalize(bullet.vx, bullet.vy);
    const tailLength = bullet.crit ? bullet.radius * 9 : bullet.radius * 5.2;
    const trail = ctx.createLinearGradient(
      bullet.x - dir.x * tailLength,
      bullet.y - dir.y * tailLength,
      bullet.x,
      bullet.y
    );
    trail.addColorStop(0, hexToRgba(bullet.color, 0));
    trail.addColorStop(1, hexToRgba(bullet.color, bullet.crit ? 0.82 : 0.42));
    ctx.strokeStyle = trail;
    ctx.lineWidth = Math.max(1.5, bullet.radius * (bullet.crit ? 1.4 : 0.88));
    ctx.beginPath();
    ctx.moveTo((bullet.prevX ?? bullet.x) - dir.x * 2, (bullet.prevY ?? bullet.y) - dir.y * 2);
    ctx.lineTo(bullet.x, bullet.y);
    ctx.stroke();
    if (bullet.style === "streak") {
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
  const recoilOffset = entity.recoil ? -Math.min(entity.radius * 0.26, entity.recoil * 1.6) : 0;

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
  ctx.translate(recoilOffset, 0);

  ctx.shadowBlur = entity.archetype === "boss" ? 34 : 22;
  ctx.shadowColor = glowColor;
  ctx.fillStyle = entity.team === "enemy" ? "rgba(255,95,125,0.18)" : "rgba(84,240,255,0.18)";
  ctx.beginPath();
  ctx.arc(0, 0, entity.radius + (entity.archetype === "boss" ? 18 : 10), 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(entity.color, 0.35);
  ctx.lineWidth = entity.archetype === "boss" ? 4 : 3;
  ctx.stroke();
  if (entity.shieldTimer > 0) {
    const shieldPulse = 1 + Math.sin(performance.now() / 120) * 0.04;
    ctx.fillStyle = "rgba(99,235,255,0.1)";
    ctx.beginPath();
    ctx.arc(0, 0, (entity.radius + 14) * shieldPulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(99,235,255,0.7)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, (entity.radius + 10) * shieldPulse, Math.PI * 0.12, Math.PI * 1.88);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius + 4, Math.PI * 1.05, Math.PI * 1.9);
    ctx.stroke();
  }
  if (entity.slowTimer > 0) {
    const pulse = 1 + Math.sin(performance.now() / 90) * 0.06;
    ctx.strokeStyle = "rgba(99,235,255,0.62)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, (entity.radius + 12) * pulse, 0, Math.PI * 2);
    ctx.stroke();
  }
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

  if (entity.archetype === "boss") {
    ctx.strokeStyle = "rgba(255,210,120,0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius + 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,209,102,0.92)";
    ctx.beginPath();
    ctx.moveTo(-12, -entity.radius - 12);
    ctx.lineTo(-4, -entity.radius - 26);
    ctx.lineTo(2, -entity.radius - 12);
    ctx.lineTo(8, -entity.radius - 24);
    ctx.lineTo(16, -entity.radius - 12);
    ctx.closePath();
    ctx.fill();
  } else if (entity.archetype === "charger") {
    ctx.strokeStyle = "rgba(255,179,107,0.55)";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(entity.radius * 0.72, -entity.radius * 0.26);
    ctx.lineTo(entity.radius * 1.1, 0);
    ctx.lineTo(entity.radius * 0.72, entity.radius * 0.26);
    ctx.stroke();
  } else if (entity.archetype === "orbiter") {
    ctx.strokeStyle = "rgba(143,220,255,0.62)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius + 6, Math.PI * 0.2, Math.PI * 1.65);
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
  const accent = weaponAccent(settings.weapon);
  const spread = (isFiring() ? 12 : 17) + recoilKick * 0.95;
  const ring = (isFiring() ? 9 : 12) + recoilKick * 0.3;
  ctx.save();
  ctx.translate(pointer.x, pointer.y);
  ctx.strokeStyle = comboReadyFx > 0 ? "#c8ff75" : accent;
  ctx.lineWidth = 2 + hitPulse * 0.35;
  ctx.shadowBlur = 18 + comboReadyFx * 10;
  ctx.shadowColor = hexToRgba(comboReadyFx > 0 ? "#c8ff75" : accent, 0.65);
  ctx.beginPath();
  ctx.arc(0, 0, ring, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-spread, 0);
  ctx.lineTo(-6, 0);
  ctx.moveTo(spread, 0);
  ctx.lineTo(6, 0);
  ctx.moveTo(0, -spread);
  ctx.lineTo(0, -6);
  ctx.moveTo(0, spread);
  ctx.lineTo(0, 6);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = comboReadyFx > 0 ? "#ffffff" : "#dff8ff";
  ctx.lineWidth = 1.2 + hitPulse * 0.2;
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(2.6, ring - 7), 0, Math.PI * 2);
  ctx.stroke();
  if (comboReadyFx > 0) {
    ctx.globalAlpha = Math.min(1, comboReadyFx / 1.6);
    ctx.fillStyle = "#c8ff75";
    ctx.font = "700 11px Rajdhani";
    ctx.textAlign = "center";
    ctx.fillText("SURGE", 0, -ring - 12);
  }
  ctx.restore();
}

function drawHitMarker() {
  if (hitMarkerTimer <= 0 || overlayOpen || mobile.enabled) return;
  ctx.save();
  ctx.translate(pointer.x, pointer.y);
  ctx.globalAlpha = Math.min(1, hitMarkerTimer / 0.16);
  ctx.strokeStyle = hitMarkerColor;
  ctx.lineWidth = 2.6 + hitPulse * 0.35;
  const gap = 6;
  const size = 16 + hitPulse * 3;
  ctx.beginPath();
  ctx.moveTo(-size, -size);
  ctx.lineTo(-gap, -gap);
  ctx.moveTo(size, -size);
  ctx.lineTo(gap, -gap);
  ctx.moveTo(-size, size);
  ctx.lineTo(-gap, gap);
  ctx.moveTo(size, size);
  ctx.lineTo(gap, gap);
  ctx.stroke();
  ctx.restore();
}

function drawToast() {
  if (levelToast <= 0) return;
  const view = viewSize();
  ctx.save();
  ctx.globalAlpha = levelToast;
  const toastGradient = ctx.createLinearGradient(view.width / 2 - 180, 34, view.width / 2 + 180, 106);
  toastGradient.addColorStop(0, "rgba(8,18,26,0.9)");
  toastGradient.addColorStop(1, "rgba(10,26,36,0.86)");
  ctx.fillStyle = toastGradient;
  roundRect(view.width / 2 - 180, 34, 360, 72, 20);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(weaponAccent(settings.weapon), 0.24);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = weaponAccent(settings.weapon);
  ctx.shadowBlur = 18;
  ctx.shadowColor = hexToRgba(weaponAccent(settings.weapon), 0.4);
  ctx.font = "700 22px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillText(`Niveau ${world.level} - ${world.tier}`, view.width / 2, 64);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#e9f5ff";
  ctx.font = "600 16px Rajdhani";
  ctx.fillText(`${world.mapName} / ${currentModeLabel()} / ${currentWeaponLabel()}`, view.width / 2, 88);
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
  if (!mobile.enabled && view.width >= 900) {
    const bloom = ctx.createRadialGradient(
      view.width * 0.5,
      view.height * 0.46,
      view.width * 0.06,
      view.width * 0.5,
      view.height * 0.46,
      view.width * 0.72
    );
    bloom.addColorStop(0, "rgba(255,255,255,0)");
    bloom.addColorStop(1, "rgba(0,8,14,0.14)");
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, view.width, view.height);
  }
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

  if (!mobile.enabled && view.width >= 900) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    for (let y = 12; y < view.height; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(view.width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

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

function updatePointerFromTouch(touch) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = clamp(touch.clientX - rect.left, 0, rect.width);
  pointer.y = clamp(touch.clientY - rect.top, 0, rect.height);
  pointer.active = true;
  return screenToWorld(pointer.x, pointer.y);
}

function updateVirtualPointerFromAim() {
  if (!player) return;
  const camera = getCamera();
  const playerScreenX = player.x - camera.x;
  const playerScreenY = player.y - camera.y;
  const aim = normalize(mobile.aimX, mobile.aimY);
  const reach = 130 + ((settings.mobileAimSensitivity - 60) / 100) * 120;
  pointer.x = playerScreenX + aim.x * reach;
  pointer.y = playerScreenY + aim.y * reach;
  pointer.active = true;
}

function updateAimFromTouch(touch) {
  const rect = ui.aimPad.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rawX = touch.clientX - centerX;
  const rawY = touch.clientY - centerY;
  const sensitivityBoost = settings.mobileAimSensitivity / 100;
  const maxRadius = rect.width * 0.24;
  const dist = Math.hypot(rawX, rawY) || 1;
  const ratio = dist > maxRadius ? maxRadius / dist : 1;
  const stickX = rawX * ratio;
  const stickY = rawY * ratio;
  mobile.aimX = stickX * sensitivityBoost;
  mobile.aimY = stickY * sensitivityBoost;
  ui.aimStick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
  updateVirtualPointerFromAim();
}

function drawMinimap(camera) {
  const rect = minimapCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const map = currentMapSpec();

  minimapCtx.clearRect(0, 0, rect.width, rect.height);

  const scaleX = rect.width / arena.width;
  const scaleY = rect.height / arena.height;
  const mapX = (x) => x * scaleX;
  const mapY = (y) => y * scaleY;

  const background = minimapCtx.createLinearGradient(0, 0, 0, rect.height);
  background.addColorStop(0, map.colors.sky);
  background.addColorStop(1, map.colors.floor);
  minimapCtx.fillStyle = background;
  minimapCtx.fillRect(0, 0, rect.width, rect.height);

  minimapCtx.strokeStyle = "rgba(255,255,255,0.05)";
  minimapCtx.lineWidth = 1;
  for (let x = 1; x < 4; x += 1) {
    const px = (rect.width / 4) * x;
    minimapCtx.beginPath();
    minimapCtx.moveTo(px, 0);
    minimapCtx.lineTo(px, rect.height);
    minimapCtx.stroke();
  }
  for (let y = 1; y < 4; y += 1) {
    const py = (rect.height / 4) * y;
    minimapCtx.beginPath();
    minimapCtx.moveTo(0, py);
    minimapCtx.lineTo(rect.width, py);
    minimapCtx.stroke();
  }

  minimapCtx.fillStyle = map.colors.obstacleStroke;
  obstacles.forEach((obstacle) => {
    minimapCtx.fillRect(mapX(obstacle.x), mapY(obstacle.y), obstacle.w * scaleX, obstacle.h * scaleY);
  });

  world.hazards.forEach((hazard) => {
    minimapCtx.fillStyle = hazard.type === "toxic" ? "rgba(255, 104, 104, 0.16)" : "rgba(99, 235, 255, 0.16)";
    minimapCtx.beginPath();
    minimapCtx.arc(mapX(hazard.x), mapY(hazard.y), Math.max(3, hazard.radius * scaleX), 0, Math.PI * 2);
    minimapCtx.fill();
  });

  world.pickups.forEach((pickup) => {
    minimapCtx.fillStyle = pickup.kind === "coin"
      ? "#ffd166"
      : pickup.kind === "shield"
        ? "#63ebff"
        : pickup.kind === "fury"
          ? "#ff8b8b"
          : pickup.kind === "haste"
            ? "#4bc8ff"
            : pickup.kind === "chrono"
              ? "#d0b5ff"
              : pickup.kind === "regen"
                ? "#7cff9c"
                : pickup.kind === "overclock"
                  ? "#ffb84d"
                  : "#9cff88";
    minimapCtx.beginPath();
    minimapCtx.arc(mapX(pickup.x), mapY(pickup.y), pickup.kind === "coin" ? 2.5 : 3.5, 0, Math.PI * 2);
    minimapCtx.fill();
  });

  const drawDot = (entity, color, radius = 4) => {
    if (!entity || entity.hp <= 0) return;
    minimapCtx.fillStyle = color;
    minimapCtx.beginPath();
    minimapCtx.arc(mapX(entity.x), mapY(entity.y), radius, 0, Math.PI * 2);
    minimapCtx.fill();
  };

  enemies.forEach((enemy) => drawDot(enemy, enemy.archetype === "boss" ? "#ff8f6b" : "#ff5d76", enemy.archetype === "boss" ? 4.6 : 3.4));
  drawDot(ally, "#63ebff", 3.4);
  drawDot(player, settings.playerColor, 4.2);

  minimapCtx.strokeStyle = "rgba(84, 240, 255, 0.62)";
  minimapCtx.lineWidth = 1.2;
  minimapCtx.strokeRect(mapX(camera.x), mapY(camera.y), camera.width * scaleX, camera.height * scaleY);

  minimapCtx.strokeStyle = "rgba(255,255,255,0.14)";
  minimapCtx.lineWidth = 1;
  minimapCtx.strokeRect(0.5, 0.5, rect.width - 1, rect.height - 1);
}

function cycleWeapon() {
  const availableWeapons = ownedWeaponIds();
  if (!availableWeapons.length) return;
  const index = availableWeapons.indexOf(settings.weapon);
  settings.weapon = availableWeapons[(index + 1 + availableWeapons.length) % availableWeapons.length];
  saveSettings();
  playWeaponSwitchSound();
  showCombatBanner(weaponConfigs[settings.weapon].label, currentWeaponProfile().desc, "hot", "Arme", 1.65);
  renderUI();
}

function toggleMinimap() {
  minimapVisible = !minimapVisible;
  ui.status.textContent = minimapVisible ? "Mini-carte activee." : "Mini-carte cachee.";
  renderUI();
}

function render() {
  const view = viewSize();
  ctx.clearRect(0, 0, view.width, view.height);
  if (!player) return;
  const camera = getCamera();
  drawBackground(camera);
  drawHazards(camera);
  drawTelegraphs(camera);
  drawRipples(camera);
  drawApples(camera);
  drawParticles(camera);
  drawBullets(camera);
  drawDrones(camera);
  drawEntity(player, camera);
  if (ally) drawEntity(ally, camera);
  enemies.forEach((enemy) => drawEntity(enemy, camera));
  drawDamageTexts(camera);
  drawToast();
  drawDeath();
  drawPause();
  drawVignette();
  drawCrosshair();
  drawHitMarker();
  if (minimapVisible && (!mobile.enabled || frameCounter % 2 === 0)) {
    drawMinimap(camera);
  }
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
  } else if ((ambientNodes || (ambientLoopTrack && !ambientLoopTrack.paused)) && (overlayOpen || gameOver || paused)) {
    stopAmbientMusic();
  }

  updateCombatBanner(rawDt);

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

canvas.addEventListener("wheel", (event) => {
  if (mobile.enabled || overlayOpen) return;
  event.preventDefault();
  cycleWeapon();
}, { passive: false });

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

  if (key === "tab") {
    event.preventDefault();
    ensureAudio();
    if (overlayOpen) closeOverlay();
    else openOverlay("play");
    return;
  }

  if (key === "f") {
    event.preventDefault();
    ensureAudio();
    requestFullscreenSafe();
    return;
  }

  if (key === "m") {
    event.preventDefault();
    toggleMinimap();
    return;
  }

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
      ui.status.textContent = `Niveau ${world.level} - ${world.tier} - ${world.mapName} - ${eventLabel(world.eventType)}.`;
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

  if (key === bindingKey("dash") || code === "Space") {
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
    const targetWeapon = weaponCycleOrder[["Digit1", "Digit2", "Digit3", "Digit4"].indexOf(code)];
    if (!isWeaponUnlocked(targetWeapon)) {
      showWeaponLockedMessage(targetWeapon);
      return;
    }
    settings.weapon = targetWeapon;
    saveSettings();
    playWeaponSwitchSound();
    showCombatBanner(weaponConfigs[settings.weapon].label, currentWeaponProfile().desc, "hot", "Arme", 1.65);
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

ui.platformPcButton?.addEventListener("click", () => {
  applyPlatformChoice("pc");
});

ui.platformMobileButton?.addEventListener("click", () => {
  applyPlatformChoice("mobile");
});

ui.reopenPlatformButton?.addEventListener("click", () => {
  openPlatformGate();
});

ui.tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

ui.shortcutTabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.openTab));
});

ui.interfaceChoices.forEach((button) => {
  button.addEventListener("click", () => {
    const nextInterface = button.dataset.interface;
    if (nextInterface === "fps3d") {
      playInterfaceSelectSound();
      window.location.href = "fps3d.html";
      return;
    }
    applyPlatformChoice(nextInterface);
    playInterfaceSelectSound();
  });
});

ui.modeChoices.forEach((button) => {
  button.addEventListener("click", () => {
    settings.mode = button.dataset.mode;
    saveSettings();
    playModeSelectSound();
    showCombatBanner("Mode choisi", currentModeLabel(), "gold", "Mode", 1.5);
    renderUI();
  });
});

ui.weaponChoices.forEach((button) => {
  button.addEventListener("click", () => {
    const weaponId = button.dataset.weapon;
    if (!isWeaponUnlocked(weaponId)) {
      showWeaponLockedMessage(weaponId);
      return;
    }
    settings.weapon = weaponId;
    saveSettings();
    playWeaponSwitchSound();
    showCombatBanner(weaponConfigs[settings.weapon].label, currentWeaponProfile().desc, "hot", "Arme", 1.65);
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

ui.mobileHaptics.addEventListener("change", () => {
  settings.mobileHaptics = ui.mobileHaptics.checked;
  saveSettings();
});

ui.mobileButtonScale.addEventListener("input", () => {
  settings.mobileButtonScale = Number(ui.mobileButtonScale.value);
  saveSettings();
  renderUI();
});

ui.mobileAimSensitivity.addEventListener("input", () => {
  settings.mobileAimSensitivity = Number(ui.mobileAimSensitivity.value);
  saveSettings();
  renderUI();
});

[
  [ui.upgradeAttack, "attackTier"],
  [ui.upgradeVitality, "vitalityTier"],
  [ui.upgradeDash, "dashTier"],
  [ui.upgradeFire, "fireTier"]
].forEach(([button, key]) => {
  button?.addEventListener("click", () => purchaseUpgrade(key));
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

ui.tutorialDismissButton?.addEventListener("click", () => {
  hints.mobileTwinStick = true;
  saveHints();
  renderUI();
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
  if (mobile.enabled || overlayOpen) return;
  event.preventDefault();
  ensureAudio();
  tryAutoFullscreen();
  if (mobile.fireTouchId !== null) return;
  const touch = event.changedTouches[0];
  if (!touch) return;
  mobile.fireTouchId = touch.identifier;
  const worldPoint = updatePointerFromTouch(touch);
  if (player && worldPoint) {
    fireWeapon(player, worldPoint.x, worldPoint.y);
  }
  pointer.down = true;
}, { passive: false });

canvas.addEventListener("touchmove", (event) => {
  if (mobile.enabled) return;
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.fireTouchId);
  if (!touch) return;
  event.preventDefault();
  updatePointerFromTouch(touch);
}, { passive: false });

canvas.addEventListener("touchend", (event) => {
  const touch = [...event.changedTouches].find((item) => item.identifier === mobile.fireTouchId);
  if (!touch) return;
  mobile.fireTouchId = null;
  if (mobile.aimTouchId === null) {
    pointer.down = false;
    pointer.active = false;
  } else {
    pointer.down = true;
    updateVirtualPointerFromAim();
  }
}, { passive: false });

canvas.addEventListener("touchcancel", () => {
  mobile.fireTouchId = null;
  if (mobile.aimTouchId === null) {
    pointer.down = false;
    pointer.active = false;
  } else {
    pointer.down = true;
    updateVirtualPointerFromAim();
  }
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
  if (!touch) return;
  mobile.aimTouchId = touch.identifier;
  updateAimFromTouch(touch);
  pointer.down = true;
  ensureAudio();
  tryAutoFullscreen();
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
  ui.aimStick.style.transform = "translate(-50%, -50%)";
  if (mobile.fireTouchId === null) {
    pointer.down = false;
    pointer.active = false;
  }
}, { passive: false });

ui.aimPad.addEventListener("touchcancel", () => {
  mobile.aimTouchId = null;
  ui.aimStick.style.transform = "translate(-50%, -50%)";
  if (mobile.fireTouchId === null) {
    pointer.down = false;
    pointer.active = false;
  }
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
if (platformChoiceMissing()) {
  openPlatformGate();
} else {
  ui.hubOverlay.classList.remove("hidden");
}
resize();
renderUI();
window.addEventListener("beforeunload", () => {
  flushDirtyPersistence(true);
});
requestAnimationFrame(tick);
