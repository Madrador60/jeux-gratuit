(() => {
  const STORAGE_KEYS = {
    settings: "arena_fun_settings_v1",
    record: "arena_fun_record_v1",
    stats: "arena_fun_stats_v1",
    progress: "arena_fun_progress_v1",
    audioBoost: "arena_fun_audio_boost_v1",
    hints: "arena_fun_hints_v1"
  };
  const SAVE_VERSION = 2;

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
    mobileHaptics: true,
    mobileButtonScale: 100,
    mobileAimSensitivity: 100,
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

  const defaultStats = {
    kills: 0,
    shots: 0,
    apples: 0,
    dashes: 0,
    bosses: 0,
    coinsEarned: 0,
    timePlayed: 0,
    weaponUsage: {
      rifle: 0,
      shotgun: 0,
      sniper: 0,
      burst: 0
    }
  };

  const defaultProgress = {
    coins: 0,
    attackTier: 0,
    vitalityTier: 0,
    dashTier: 0,
    fireTier: 0,
    ownedSkins: ["tank", "duck"],
    ownedWeapons: ["rifle"]
  };

  const defaultHints = {
    mobileTwinStick: false
  };

  function cloneValue(value) {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value));
  }

  function readRawJson(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function unwrapStoredPayload(value) {
    if (value && typeof value === "object" && !Array.isArray(value) && value.data && typeof value.data === "object") {
      return value.data;
    }
    return value;
  }

  function writeStructuredJson(key, value) {
    localStorage.setItem(key, JSON.stringify({
      version: SAVE_VERSION,
      updatedAt: Date.now(),
      data: value
    }));
  }

  function normalizeWeaponUsage(value) {
    return {
      rifle: Number(value?.rifle) || 0,
      shotgun: Number(value?.shotgun) || 0,
      sniper: Number(value?.sniper) || 0,
      burst: Number(value?.burst) || 0
    };
  }

  function loadSettings() {
    const parsed = unwrapStoredPayload(readRawJson(STORAGE_KEYS.settings));
    return {
      ...cloneValue(defaultSettings),
      ...(parsed || {}),
      bindings: {
        ...defaultSettings.bindings,
        ...(parsed?.bindings || {})
      }
    };
  }

  function saveSettings(settings) {
    writeStructuredJson(STORAGE_KEYS.settings, settings);
  }

  function loadBestLevel() {
    const value = Number.parseInt(localStorage.getItem(STORAGE_KEYS.record) || "1", 10);
    return Number.isFinite(value) && value > 0 ? value : 1;
  }

  function saveBestLevel(currentBest, nextLevel) {
    const bestLevel = Math.max(Number(currentBest) || 1, Number(nextLevel) || 1);
    localStorage.setItem(STORAGE_KEYS.record, String(bestLevel));
    return bestLevel;
  }

  function loadStats() {
    const parsed = unwrapStoredPayload(readRawJson(STORAGE_KEYS.stats));
    return {
      ...cloneValue(defaultStats),
      ...(parsed || {}),
      weaponUsage: normalizeWeaponUsage(parsed?.weaponUsage)
    };
  }

  function saveStats(stats) {
    writeStructuredJson(STORAGE_KEYS.stats, {
      ...stats,
      weaponUsage: normalizeWeaponUsage(stats?.weaponUsage)
    });
  }

  function loadProgress() {
    const parsed = unwrapStoredPayload(readRawJson(STORAGE_KEYS.progress));
    return {
      ...cloneValue(defaultProgress),
      ...(parsed || {}),
      ownedSkins: Array.isArray(parsed?.ownedSkins) ? [...new Set(parsed.ownedSkins)] : [...defaultProgress.ownedSkins],
      ownedWeapons: Array.isArray(parsed?.ownedWeapons) ? [...new Set(parsed.ownedWeapons)] : [...defaultProgress.ownedWeapons]
    };
  }

  function saveProgress(progress) {
    writeStructuredJson(STORAGE_KEYS.progress, {
      ...progress,
      ownedSkins: [...new Set(progress?.ownedSkins || defaultProgress.ownedSkins)],
      ownedWeapons: [...new Set(progress?.ownedWeapons || defaultProgress.ownedWeapons)]
    });
  }

  function loadHints() {
    const parsed = unwrapStoredPayload(readRawJson(STORAGE_KEYS.hints));
    return {
      ...cloneValue(defaultHints),
      ...(parsed || {})
    };
  }

  function saveHints(hints) {
    writeStructuredJson(STORAGE_KEYS.hints, hints);
  }

  window.ARENA_STORAGE = {
    STORAGE_KEYS,
    defaultSettings,
    loadSettings,
    saveSettings,
    loadBestLevel,
    saveBestLevel,
    loadStats,
    saveStats,
    loadProgress,
    saveProgress,
    loadHints,
    saveHints
  };
})();
