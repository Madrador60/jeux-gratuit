const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ui = {
  levelLabel: document.getElementById("levelLabel"),
  bestLevel: document.getElementById("bestLevel"),
  modeLabel: document.getElementById("modeLabel"),
  weaponLabel: document.getElementById("weaponLabel"),
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
  mobileFireButton: document.getElementById("mobileFireButton"),
  mobileDashButton: document.getElementById("mobileDashButton"),
  mobileWeaponButton: document.getElementById("mobileWeaponButton"),
  mobileMenuButton: document.getElementById("mobileMenuButton"),
  hubOverlay: document.getElementById("hubOverlay"),
  closeHubButton: document.getElementById("closeHubButton"),
  tabButtons: [...document.querySelectorAll(".tab-button")],
  tabPanels: [...document.querySelectorAll(".tab-panel")],
  interfaceChoices: [...document.querySelectorAll("[data-interface]")],
  modeChoices: [...document.querySelectorAll("[data-mode]")],
  weaponChoices: [...document.querySelectorAll("[data-weapon]")],
  startButton: document.getElementById("startButton"),
  shopGrid: document.getElementById("shopGrid"),
  shopHint: document.getElementById("shopHint"),
  bulletSize: document.getElementById("bulletSize"),
  bulletSizeValue: document.getElementById("bulletSizeValue"),
  bulletColor: document.getElementById("bulletColor"),
  bulletColorValue: document.getElementById("bulletColorValue"),
  bulletDamage: document.getElementById("bulletDamage"),
  bulletDamageValue: document.getElementById("bulletDamageValue"),
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
  soundPack: document.getElementById("soundPack"),
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
  recordSoundPack: document.getElementById("recordSoundPack"),
  recordCurrentSkin: document.getElementById("recordCurrentSkin"),
  recordCurrentWeapon: document.getElementById("recordCurrentWeapon"),
  recordCurrentMode: document.getElementById("recordCurrentMode"),
  recordMood: document.getElementById("recordMood")
};

const STORAGE_SETTINGS = "arena_fun_settings_v1";
const STORAGE_RECORD = "arena_fun_record_v1";
const STORAGE_STATS = "arena_fun_stats_v1";
const DPR = Math.min(window.devicePixelRatio || 1, 2);
const arena = { width: 2200, height: 1400 };

const weaponConfigs = {
  rifle: { label: "RIFLE", reload: 0.12, pellets: 1, spread: 0.01, speed: 1120, damageMul: 1 },
  shotgun: { label: "SHOTGUN", reload: 0.45, pellets: 6, spread: 0.26, speed: 930, damageMul: 0.6 },
  sniper: { label: "SNIPER", reload: 0.82, pellets: 1, spread: 0.002, speed: 1550, damageMul: 2.1 },
  burst: { label: "RAFALE", reload: 0.34, pellets: 3, spread: 0.06, speed: 1180, damageMul: 0.82 }
};

const skinCatalog = {
  core: { name: "Core", unlock: 1, colorable: true },
  shadow: { name: "Shadow", unlock: 1, colorable: true },
  nova: { name: "Nova", unlock: 2, colorable: true },
  tank: { name: "Tank", unlock: 3, colorable: true },
  duck: { name: "Canard", unlock: 4, image: "assets/skins/duck.svg" },
  poop: { name: "Caca", unlock: 5, image: "assets/skins/poop.svg" },
  cat: { name: "Chat", unlock: 7, image: "assets/skins/cat.svg" },
  bear: { name: "Ours", unlock: 9, image: "assets/skins/bear.svg" },
  fox: { name: "Renard", unlock: 11, image: "assets/skins/fox.svg" },
  frog: { name: "Grenouille", unlock: 13, image: "assets/skins/frog.svg" },
  banana: { name: "Banane", unlock: 15, image: "assets/skins/banana.svg" },
  alien: { name: "Alien", unlock: 17, image: "assets/skins/alien.svg" }
};

const obstacles = [
  { x: 430, y: 300, w: 280, h: 120 },
  { x: 920, y: 180, w: 230, h: 230 },
  { x: 1360, y: 320, w: 330, h: 130 },
  { x: 620, y: 800, w: 150, h: 340 },
  { x: 1040, y: 660, w: 340, h: 120 },
  { x: 1610, y: 760, w: 180, h: 300 }
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
  firing: false
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
  skin: "core",
  playerColor: "#7cf6b8",
  bulletColor: "#63ebff",
  bulletSize: 6,
  bulletDamage: 11,
  masterVolume: 100,
  dashVolume: 100,
  soundPack: "prout",
  fpsCap: 120,
  autoFullscreen: true,
  autoRestart: true,
  restartDelay: 2,
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
let listeningAction = null;
let currentTab = "play";
let audioContext = null;
let musicClock = 0;
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
let coarseMedia = null;

let player;
let ally = null;
let enemies = [];

const world = {
  bullets: [],
  particles: [],
  apples: [],
  level: 1,
  tier: "Facile",
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
    if (!parsed?.interfaceMode && window.matchMedia("(pointer: coarse)").matches) {
      merged.interfaceMode = "mobile";
    }
    return merged;
  } catch {
    const fallback = structuredClone(defaultSettings);
    if (window.matchMedia("(pointer: coarse)").matches) {
      fallback.interfaceMode = "mobile";
    }
    return fallback;
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
      dashes: Number(parsed?.dashes) || 0
    };
  } catch {
    return { kills: 0, shots: 0, apples: 0, dashes: 0 };
  }
}

function saveStats() {
  localStorage.setItem(STORAGE_STATS, JSON.stringify(lifetimeStats));
}

function saveBestLevel(level) {
  bestLevel = Math.max(bestLevel, level);
  localStorage.setItem(STORAGE_RECORD, String(bestLevel));
}

function sanitizeSettings() {
  if (!["pc", "mobile"].includes(settings.interfaceMode)) settings.interfaceMode = "pc";
  if (!weaponConfigs[settings.weapon]) settings.weapon = "rifle";
  if (!skinCatalog[settings.skin]) settings.skin = "core";
  if (!["levels", "duo", "chaos"].includes(settings.mode)) settings.mode = "levels";
  if (!["arcade", "prout", "coincoin", "party"].includes(settings.soundPack)) settings.soundPack = "prout";
  settings.bulletSize = clamp(Number(settings.bulletSize) || defaultSettings.bulletSize, 4, 12);
  settings.bulletDamage = clamp(Number(settings.bulletDamage) || defaultSettings.bulletDamage, 6, 25);
  settings.masterVolume = clamp(Number(settings.masterVolume) || defaultSettings.masterVolume, 0, 100);
  settings.dashVolume = clamp(Number(settings.dashVolume) || defaultSettings.dashVolume, 0, 100);
  settings.restartDelay = clamp(Number(settings.restartDelay) || defaultSettings.restartDelay, 1, 5);
  settings.fpsCap = [0, 60, 120, 144].includes(Number(settings.fpsCap)) ? Number(settings.fpsCap) : defaultSettings.fpsCap;
}

sanitizeSettings();

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
    reload: 0,
    dashCooldown: 0,
    hitFlash: 0,
    color: options.color || "#7cf6b8",
    skin: options.skin || "core",
    team: options.team || "ally",
    ai: options.ai || false
  };
}

function currentModeLabel() {
  if (settings.mode === "duo") return "2V2 ASSIST";
  if (settings.mode === "chaos") return "CHAOS";
  return "NIVEAUX";
}

function currentWeaponLabel() {
  return weaponConfigs[settings.weapon].label;
}

function currentMoodLabel() {
  if (settings.soundPack === "prout") return "Gros delire prout blaster";
  if (settings.soundPack === "coincoin") return "Coin coin tactique";
  if (settings.soundPack === "party") return "Fete cosmique";
  return "Arcade propre";
}

function skinFlavor(id) {
  const flavors = {
    core: "Classique nerveux",
    shadow: "Sneaky et propre",
    nova: "Neon qui claque",
    tank: "Lourd et costaud",
    duck: "Canard de guerre",
    poop: "Chaos complet",
    cat: "Petit assassin",
    bear: "Gros nounours furieux",
    fox: "Rapide et malin",
    frog: "Sautillant toxique",
    banana: "Banane glissante",
    alien: "Visiteur bizarre"
  };
  return flavors[id] || "Skin legendaire";
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
  return pointer.down || mobile.firing;
}

function isMobileViewport() {
  return mobile.enabled;
}

function syncMobileMode() {
  const next = settings.interfaceMode === "mobile";
  mobile.enabled = next;
  ui.mobileControls?.setAttribute("aria-hidden", String(!next));
  document.body.classList.toggle("mobile-ui-active", next);
  if (!next) {
    mobile.moveTouchId = null;
    mobile.aimTouchId = null;
    mobile.moveX = 0;
    mobile.moveY = 0;
    mobile.aiming = false;
    mobile.firing = false;
    ui.joystickStick.style.transform = "translate(-50%, -50%)";
  }
}

function isSkinUnlocked(id) {
  return Boolean(skinCatalog[id]);
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
  const enemySpawn = randomSpawn("enemy");
  const enemySpawnTwo = randomSpawn("enemy");
  const allySpawn = randomSpawn("ally");
  world.level = level;
  world.tier = diff.tier;
  gameOver = false;
  restartTimer = 0;
  appleTimer = 2.5;
  levelToast = 1;
  impactFlash = 0;
  cameraShake = 0;
  world.bullets = [];
  world.particles = [];
  world.apples = [];

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

  ally = null;
  enemies = [];

  enemies.push(createEntity(enemySpawn.x, enemySpawn.y, {
    color: "#ff7088",
    skin: level % 3 === 0 ? "shadow" : level % 3 === 1 ? "core" : "tank",
    team: "enemy",
    ai: true,
    hp: diff.enemyHp
  }));

  if (settings.mode === "duo") {
    ally = createEntity(allySpawn.x, allySpawn.y, { color: "#76d8ff", skin: "nova", team: "ally", ai: true, hp: 100 });
    enemies.push(createEntity(enemySpawnTwo.x, enemySpawnTwo.y, { color: "#ff9b68", skin: "fox", team: "enemy", ai: true, hp: Math.round(diff.enemyHp * 0.88) }));
  } else if (settings.mode === "chaos") {
    enemies.push(createEntity(enemySpawnTwo.x, enemySpawnTwo.y, { color: "#ff9b68", skin: "frog", team: "enemy", ai: true, hp: Math.round(diff.enemyHp * 0.78) }));
  }

  saveBestLevel(level);
  ui.status.textContent = `Niveau ${world.level} - ${world.tier} - ${currentModeLabel()}.`;
  renderUI();
}

function restartRun() {
  world.session.kills = 0;
  world.session.shots = 0;
  world.session.apples = 0;
  world.session.dashes = 0;
  resetLevel(1, true);
}

function openOverlay(tab = currentTab) {
  overlayOpen = true;
  paused = true;
  currentTab = tab;
  ui.hubOverlay.classList.remove("hidden");
  canvas.classList.add("blocked");
  switchTab(tab);
}

function closeOverlay() {
  if (!gameStarted) return;
  overlayOpen = false;
  paused = false;
  ui.hubOverlay.classList.add("hidden");
  canvas.classList.remove("blocked");
}

function startMatch() {
  restartRun();
  gameStarted = true;
  overlayOpen = false;
  paused = false;
  ui.hubOverlay.classList.add("hidden");
  canvas.classList.remove("blocked");
  ensureAudio();
  tryAutoFullscreen();
}

function switchTab(tab) {
  currentTab = tab;
  ui.tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  ui.tabPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab));
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * DPR);
  canvas.height = Math.floor(rect.height * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  syncMobileMode();
}

function setBinding(action, key) {
  if (key === "escape") return;
  settings.bindings[action] = key;
  saveSettings();
  renderUI();
}

function renderUI() {
  ui.levelLabel.textContent = String(world.level);
  ui.bestLevel.textContent = String(bestLevel);
  ui.modeLabel.textContent = currentModeLabel();
  ui.weaponLabel.textContent = currentWeaponLabel();
  ui.mobileWeaponButton.textContent = weaponConfigs[settings.weapon].label.replace("SHOTGUN", "POMPE");
  ui.fps.textContent = String(shownFps);

  if (player) {
    ui.playerHp.style.width = `${(player.hp / player.maxHp) * 100}%`;
    ui.playerEnergy.style.width = `${(player.energy / player.maxEnergy) * 100}%`;
  }
  ui.enemyHp.style.width = enemies[0] ? `${(enemies[0].hp / enemies[0].maxHp) * 100}%` : "0%";
  ui.allyStat.classList.toggle("hidden", !(settings.mode === "duo" && ally));
  ui.enemyTwoStat.classList.toggle("hidden", enemies.length < 2);
  ui.allyHp.style.width = ally ? `${(ally.hp / ally.maxHp) * 100}%` : "0%";
  ui.enemyTwoHp.style.width = enemies[1] ? `${(enemies[1].hp / enemies[1].maxHp) * 100}%` : "0%";

  ui.bulletSize.value = String(settings.bulletSize);
  ui.bulletSizeValue.textContent = String(settings.bulletSize);
  ui.bulletColor.value = settings.bulletColor;
  ui.bulletColorValue.textContent = settings.bulletColor.toUpperCase();
  ui.bulletDamage.value = String(settings.bulletDamage);
  ui.bulletDamageValue.textContent = String(settings.bulletDamage);
  ui.bulletPreview.style.setProperty("--bullet-preview-size", `${settings.bulletSize * 2.5}px`);
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
  ui.soundPack.value = settings.soundPack;
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
  ui.recordSoundPack.textContent = settings.soundPack.toUpperCase();
  ui.recordCurrentSkin.textContent = skinCatalog[settings.skin].name;
  ui.recordCurrentWeapon.textContent = currentWeaponLabel();
  ui.recordCurrentMode.textContent = currentModeLabel();
  ui.recordMood.textContent = currentMoodLabel();

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
    const item = document.createElement("button");
    item.type = "button";
    item.className = `shop-item${settings.skin === id ? " selected" : ""}${unlocked ? "" : " locked"}`;
    item.disabled = !unlocked;
    const thumb = info.image
      ? `<div class="shop-thumb" style="background-image:url('${info.image}')"></div>`
      : `<div class="shop-thumb" style="background:${settings.playerColor}; box-shadow:0 0 18px ${settings.playerColor};"></div>`;
    item.innerHTML = `${thumb}<strong>${info.name}</strong><small class="shop-meta">${skinFlavor(id)}</small>`;
    item.addEventListener("click", () => {
      settings.skin = id;
      if (player) player.skin = id;
      saveSettings();
      renderUI();
    });
    ui.shopGrid.appendChild(item);
  });
  ui.shopHint.textContent = `Toutes les skins sont debloquees. Record actuel: niveau ${bestLevel}.`;
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
  const actualVolume = Math.min(1, volume * (settings.masterVolume / 100));
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, actualVolume), now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + duration + 0.03);
}

function playShootSound() {
  if (settings.soundPack === "prout") {
    tone({ frequency: 130, slideTo: 52, duration: 0.12, volume: 0.16, type: "sawtooth" });
    tone({ frequency: 220, slideTo: 80, duration: 0.08, volume: 0.08, type: "triangle" });
  } else if (settings.soundPack === "coincoin") {
    tone({ frequency: 520, slideTo: 360, duration: 0.08, volume: 0.11, type: "square" });
    tone({ frequency: 720, slideTo: 480, duration: 0.05, volume: 0.08, type: "triangle" });
  } else if (settings.soundPack === "party") {
    tone({ frequency: 320, slideTo: 620, duration: 0.05, volume: 0.09, type: "square" });
    tone({ frequency: 220, slideTo: 420, duration: 0.08, volume: 0.07, type: "triangle" });
  } else {
    tone({ frequency: 240, slideTo: 140, duration: 0.06, volume: 0.08, type: "square" });
    tone({ frequency: 420, slideTo: 250, duration: 0.05, volume: 0.05, type: "triangle" });
  }
}

function playDashSound() {
  const mult = settings.dashVolume / 100;
  if (settings.soundPack === "prout") {
    tone({ frequency: 90, slideTo: 42, duration: 0.16, volume: 0.22 * mult, type: "sawtooth" });
  } else if (settings.soundPack === "coincoin") {
    tone({ frequency: 440, slideTo: 220, duration: 0.11, volume: 0.14 * mult, type: "square" });
  } else {
    tone({ frequency: 300, slideTo: 100, duration: 0.14, volume: 0.16 * mult, type: "sawtooth" });
  }
}

function playStepSound(speedRatio) {
  if (settings.soundPack === "party") {
    tone({ frequency: 140 + speedRatio * 80, slideTo: 120, duration: 0.04, volume: 0.035, type: "triangle" });
  } else {
    tone({ frequency: 110 + Math.random() * 40, slideTo: 95, duration: 0.035, volume: 0.022 + speedRatio * 0.01, type: "triangle" });
  }
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
  const notes = settings.soundPack === "coincoin" ? [392, 440, 494, 523] : [196, 246.94, 293.66, 369.99];
  const note = notes[Math.floor((performance.now() / 450) % notes.length)];
  tone({ frequency: note, slideTo: note * 1.01, duration: 0.36, volume: 0.018, type: "triangle" });
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
  if (world.apples.length >= 3) return;
  for (let tries = 0; tries < 60; tries += 1) {
    const x = 220 + Math.random() * (arena.width - 440);
    const y = 220 + Math.random() * (arena.height - 440);
    const probe = { x, y, radius: 28 };
    const blocked = obstacles.some((rect) => circleIntersectsRect(probe, rect));
    const tooNearActor = [player, ally, ...enemies].some((entity) => entity && entity.hp > 0 && length(entity.x - x, entity.y - y) < 160);
    if (!blocked && !tooNearActor) {
      world.apples.push({ x, y, radius: 20, pulse: Math.random() * Math.PI * 2 });
      return;
    }
  }
}

function collectApple(entity, appleIndex) {
  const apple = world.apples[appleIndex];
  if (!apple) return;
  entity.hp = clamp(entity.hp + 28, 0, entity.maxHp);
  entity.energy = clamp(entity.energy + 24, 0, entity.maxEnergy);
  world.apples.splice(appleIndex, 1);
  spawnBurst(apple.x, apple.y, "#9cff88", 10, 180);
  if (entity === player) {
    world.session.apples += 1;
    lifetimeStats.apples += 1;
    saveStats();
  }
  playAppleSound();
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
      radius: (options.radius || settings.bulletSize) * (config.pellets > 1 ? 0.9 : 1),
      damage: (options.damage || settings.bulletDamage) * config.damageMul,
      color: options.color || (entity.team === "ally" ? settings.bulletColor : "#ff7f98"),
      life: config.pellets > 1 ? 0.6 : 0.95,
      team: entity.team
    });
  }

  entity.reload = options.reload ?? config.reload;
  if (entity === player) {
    world.session.shots += config.pellets;
    lifetimeStats.shots += config.pellets;
    saveStats();
  }
  spawnBurst(entity.x + Math.cos(baseAngle) * entity.radius, entity.y + Math.sin(baseAngle) * entity.radius, options.color || settings.bulletColor, 6, 90);
  if (entity === player) {
    playShootSound();
  }
}

function dash(entity, dirX, dirY) {
  if (entity.dashCooldown > 0 || entity.energy < 18 || entity.hp <= 0) return;
  const dir = normalize(dirX, dirY);
  const power = entity === player ? 2850 : 1180;
  entity.vx += dir.x * power;
  entity.vy += dir.y * power;
  entity.energy = clamp(entity.energy - 18, 0, entity.maxEnergy);
  entity.dashCooldown = entity === player ? 0.22 : 1;
  spawnBurst(entity.x, entity.y, entity.color, 14, 260);
  if (entity === player) {
    world.session.dashes += 1;
    lifetimeStats.dashes += 1;
    saveStats();
    cameraShake = 10;
    playDashSound();
  }
}

function damageEntity(entity, amount, fromColor) {
  if (!entity || entity.hp <= 0) return;
  entity.hp = clamp(entity.hp - amount, 0, entity.maxHp);
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
      saveStats();
    }
  }
}

function updateEntityCooldowns(entity, dt) {
  entity.reload = Math.max(0, entity.reload - dt);
  entity.dashCooldown = Math.max(0, entity.dashCooldown - dt);
  entity.hitFlash = Math.max(0, entity.hitFlash - dt);
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
  const desiredRange = entity.team === "enemy" ? 340 : 300;
  const strafe = dist > desiredRange ? 0.26 : 0.92;
  const speed = entity.team === "enemy" ? getDifficulty(world.level).enemySpeed : 300;

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
    const weapon = entity.team === "enemy" ? (world.level > 8 ? "burst" : "rifle") : "rifle";
    const diff = getDifficulty(world.level);
    fireWeapon(entity, target.x, target.y, {
      weapon,
      color: entity.team === "enemy" ? "#ff7f98" : "#7ae1ff",
      radius: entity.team === "enemy" ? 5.5 : 5,
      damage: entity.team === "enemy" ? diff.enemyDamage : 8,
      reload: entity.team === "enemy" ? diff.enemyReload : weaponConfigs.rifle.reload
    });
  }

  if (dist < 170 && entity.dashCooldown <= 0 && Math.random() < 0.012) {
    dash(entity, dir.x, dir.y);
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
        damageEntity(entity, bullet.damage, bullet.color);
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

  world.apples.forEach((apple) => {
    apple.pulse += dt * 4;
  });

  const actors = [player, ally, ...enemies].filter((entity) => entity && entity.hp > 0);
  for (let i = world.apples.length - 1; i >= 0; i -= 1) {
    const apple = world.apples[i];
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
  updateEntityCooldowns(player, dt);
  if (ally) updateEntityCooldowns(ally, dt);
  enemies.forEach((enemy) => updateEntityCooldowns(enemy, dt));

  updatePlayer(dt);
  if (ally) updateBot(ally, dt);
  enemies.forEach((enemy) => updateBot(enemy, dt));
  updateBullets(dt);
  updateParticles(dt);
  updateApples(dt);

  impactFlash = Math.max(0, impactFlash - dt);
  cameraShake = Math.max(0, cameraShake - dt * 24);
  levelToast = Math.max(0, levelToast - dt);

  enemies = enemies.filter((enemy) => enemy.hp > 0);
  if (ally && ally.hp <= 0) ally = null;

  if (player.hp <= 0 && !gameOver) {
    gameOver = true;
    restartTimer = settings.restartDelay;
    ui.status.textContent = `Vous etes KO. Restart dans ${settings.restartDelay}s.`;
  }

  if (gameOver) {
    if (settings.autoRestart) {
      restartTimer -= dt;
      ui.status.textContent = `Vous etes KO. Restart dans ${Math.max(0, restartTimer).toFixed(1)}s.`;
      if (restartTimer <= 0) {
        restartRun();
      }
    }
    renderUI();
    return;
  }

  if (enemies.length === 0) {
    playWinSound();
    resetLevel(world.level + 1, false);
    return;
  }

  renderUI();
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
  gradient.addColorStop(0, "#0f2430");
  gradient.addColorStop(1, "#081119");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, view.width, view.height);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  ctx.strokeStyle = "rgba(255,255,255,0.04)";
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
    ctx.strokeStyle = "rgba(84,240,255,0.16)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.restore();
}

function drawApples(camera) {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  world.apples.forEach((apple) => {
    const bob = Math.sin(apple.pulse) * 4;
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
    ctx.fillStyle = bullet.color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
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
    if (entity.skin === "shadow") {
      ctx.strokeStyle = "rgba(8,8,12,0.32)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, entity.radius * 0.55, 0, Math.PI * 2);
      ctx.stroke();
    } else if (entity.skin === "nova") {
      ctx.strokeStyle = "rgba(255,255,255,0.42)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, entity.radius * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-entity.radius * 0.5, 0);
      ctx.lineTo(entity.radius * 0.5, 0);
      ctx.moveTo(0, -entity.radius * 0.5);
      ctx.lineTo(0, entity.radius * 0.5);
      ctx.stroke();
    }
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

function updateAimFromTouch(touch) {
  const rect = ui.aimPad.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  mobile.aimX = touch.clientX - centerX;
  mobile.aimY = touch.clientY - centerY;
  mobile.aiming = true;
  mobile.firing = true;
  updateVirtualPointerFromAim();
}

function cycleWeapon() {
  const order = ["rifle", "shotgun", "sniper", "burst"];
  const index = order.indexOf(settings.weapon);
  settings.weapon = order[(index + 1) % order.length];
  saveSettings();
  renderUI();
}

function render() {
  const view = viewSize();
  ctx.clearRect(0, 0, view.width, view.height);
  if (!player) return;
  const camera = getCamera();
  drawBackground(camera);
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
  document.documentElement.requestFullscreen?.().catch(() => {});
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
  if (mobile.enabled) {
    tryAutoFullscreen();
  }
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
    if (overlayOpen) closeOverlay();
    else openOverlay("play");
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
  if (gameStarted) closeOverlay();
});

ui.hubOverlay.addEventListener("click", (event) => {
  if (event.target === ui.hubOverlay && gameStarted) {
    closeOverlay();
  }
});

ui.startButton.addEventListener("click", () => {
  startMatch();
});

ui.tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

ui.interfaceChoices.forEach((button) => {
  button.addEventListener("click", () => {
    settings.interfaceMode = button.dataset.interface;
    saveSettings();
    syncMobileMode();
    renderUI();
  });
});

ui.modeChoices.forEach((button) => {
  button.addEventListener("click", () => {
    settings.mode = button.dataset.mode;
    saveSettings();
    renderUI();
  });
});

ui.weaponChoices.forEach((button) => {
  button.addEventListener("click", () => {
    settings.weapon = button.dataset.weapon;
    saveSettings();
    renderUI();
  });
});

ui.bulletSize.addEventListener("input", () => {
  settings.bulletSize = Number(ui.bulletSize.value);
  saveSettings();
  renderUI();
});

ui.bulletColor.addEventListener("input", () => {
  settings.bulletColor = ui.bulletColor.value;
  saveSettings();
  renderUI();
});

ui.bulletDamage.addEventListener("input", () => {
  settings.bulletDamage = Number(ui.bulletDamage.value);
  saveSettings();
  renderUI();
});

ui.playerColor.addEventListener("input", () => {
  settings.playerColor = ui.playerColor.value;
  if (player) player.color = settings.playerColor;
  saveSettings();
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

ui.soundPack.addEventListener("change", () => {
  settings.soundPack = ui.soundPack.value;
  saveSettings();
  renderUI();
  playShootSound();
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

ui.mobileFireButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  ensureAudio();
  tryAutoFullscreen();
  mobile.firing = true;
  if (overlayOpen) startMatch();
});

window.addEventListener("pointerup", () => {
  mobile.firing = false;
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

ui.joystickShell.addEventListener("touchstart", (event) => {
  if (!mobile.enabled) return;
  const touch = event.changedTouches[0];
  mobile.moveTouchId = touch.identifier;
  updateJoystickFromTouch(touch);
  ensureAudio();
  tryAutoFullscreen();
}, { passive: true });

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
}, { passive: true });

ui.joystickShell.addEventListener("touchcancel", () => {
  mobile.moveTouchId = null;
  resetJoystick();
}, { passive: true });

ui.aimPad.addEventListener("touchstart", (event) => {
  if (!mobile.enabled) return;
  const touch = event.changedTouches[0];
  mobile.aimTouchId = touch.identifier;
  updateAimFromTouch(touch);
  ensureAudio();
  tryAutoFullscreen();
  if (overlayOpen) startMatch();
}, { passive: true });

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
}, { passive: true });

ui.aimPad.addEventListener("touchcancel", () => {
  mobile.aimTouchId = null;
  mobile.aiming = false;
  mobile.firing = false;
}, { passive: true });

document.querySelectorAll(".bind-button").forEach((button) => {
  button.addEventListener("click", () => {
    listeningAction = button.dataset.action;
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
