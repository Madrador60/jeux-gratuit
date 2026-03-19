(() => {
  const arena = { width: 2200, height: 1400 };

  const weaponConfigs = {
    rifle: { label: "FUSIL", reload: 0.1, pellets: 1, spread: 0.01, speed: 1240, damageMul: 1, life: 0.96, radiusMul: 1, shake: 2.5, burstFx: 7 },
    shotgun: { label: "POMPE", reload: 0.52, pellets: 8, spread: 0.38, speed: 780, damageMul: 0.7, life: 0.38, radiusMul: 1.28, shake: 7.4, burstFx: 15 },
    sniper: { label: "SNIPER", reload: 1.02, pellets: 1, spread: 0.001, speed: 1820, damageMul: 3.1, life: 1.32, radiusMul: 0.88, shake: 10.6, burstFx: 12 },
    burst: { label: "RAFALE", reload: 0.27, pellets: 3, spread: 0.07, speed: 1280, damageMul: 0.88, life: 0.86, radiusMul: 0.96, shake: 4.6, burstFx: 10 }
  };

  const weaponProfiles = {
    rifle: {
      tag: "Stable",
      desc: "Tir propre pour tenir la ligne et gagner les duels sans surprise.",
      stats: ["Portee haute", "Precision", "Duel"],
      accent: "#63ebff"
    },
    shotgun: {
      tag: "Brutal",
      desc: "Tres fort au contact. Chaque impact repousse franchement les ennemis.",
      stats: ["Proche", "Impact", "Zone"],
      accent: "#ffd166"
    },
    sniper: {
      tag: "Critique",
      desc: "Un gros tir lourd qui ralentit la cible et ouvre de vrais picks.",
      stats: ["Longue portee", "Lourd", "Ralentit"],
      accent: "#ff8ddb"
    },
    burst: {
      tag: "Pression",
      desc: "Rafale nerveuse pour casser le rythme adverse et maintenir la pression.",
      stats: ["Rafale", "Stagger", "Polyvalent"],
      accent: "#ff9e6b"
    }
  };

  const weaponCatalog = {
    rifle: {
      name: "Fusil",
      price: 0,
      badge: "Gratuit",
      blurb: "Le plus stable pour debuter et tenir les duels.",
      mark: "F"
    },
    shotgun: {
      name: "Pompe",
      price: 18,
      badge: "Brutal",
      blurb: "Tres violent de pres avec un gros recul sur les ennemis.",
      mark: "P"
    },
    sniper: {
      name: "Sniper",
      price: 32,
      badge: "Lourd",
      blurb: "Tir ultra fort pour ouvrir les combats de loin.",
      mark: "S"
    },
    burst: {
      name: "Rafale",
      price: 24,
      badge: "Pression",
      blurb: "Bonne arme nerveuse pour tenir le rythme en continu.",
      mark: "R"
    }
  };

  const modeLabels = {
    levels: "NIVEAUX",
    duo: "2V2 ASSIST",
    chaos: "CHAOS",
    swarm: "MEUTE",
    bossrush: "RUEE BOSS"
  };

  const weaponCycleOrder = ["rifle", "shotgun", "sniper", "burst"];
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
    skull: { name: "Crane", price: 28, image: "assets/skins/skull.svg" },
    pig: { name: "Cochon", price: 30, image: "assets/skins/pig.svg" },
    rabbit: { name: "Lapin", price: 32, image: "assets/skins/rabbit.svg" },
    dragon: { name: "Dragon", price: 34, image: "assets/skins/dragon.svg" },
    chicken: { name: "Poulet", price: 36, image: "assets/skins/chicken.svg" },
    monkey: { name: "Singe", price: 38, image: "assets/skins/monkey.svg" },
    tiger: { name: "Tigre", price: 40, image: "assets/skins/tiger.svg" },
    cow: { name: "Vache", price: 42, image: "assets/skins/cow.svg" }
  };

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

  const mapCatalog = [
    {
      id: "neon-docks",
      name: "Quais neon",
      theme: "neo",
      layoutIndex: 0,
      colors: {
        sky: "#0f2430",
        floor: "#081119",
        line: "rgba(255,255,255,0.04)",
        obstacleA: "rgba(29,52,66,0.95)",
        obstacleB: "rgba(10,22,30,0.98)",
        obstacleStroke: "rgba(84,240,255,0.16)"
      }
    },
    {
      id: "ember-forge",
      name: "Forge rouge",
      theme: "ember",
      layoutIndex: 1,
      colors: {
        sky: "#2f1710",
        floor: "#120906",
        line: "rgba(255,167,120,0.05)",
        obstacleA: "rgba(70,31,22,0.95)",
        obstacleB: "rgba(28,12,8,0.98)",
        obstacleStroke: "rgba(255,164,84,0.18)"
      }
    },
    {
      id: "toxic-lab",
      name: "Lab vert",
      theme: "toxic",
      layoutIndex: 2,
      colors: {
        sky: "#0b2a1d",
        floor: "#08150f",
        line: "rgba(145,255,135,0.05)",
        obstacleA: "rgba(20,56,34,0.95)",
        obstacleB: "rgba(8,22,14,0.98)",
        obstacleStroke: "rgba(145,255,135,0.18)"
      }
    },
    {
      id: "mirror-core",
      name: "Coeur miroir",
      theme: "mirror",
      layoutIndex: 3,
      colors: {
        sky: "#12273a",
        floor: "#09121d",
        line: "rgba(141,212,255,0.045)",
        obstacleA: "rgba(22,44,70,0.95)",
        obstacleB: "rgba(9,20,33,0.98)",
        obstacleStroke: "rgba(141,212,255,0.18)"
      }
    }
  ];

  const enemyArchetypeMeta = {
    grunt: {
      name: "Soldat",
      shortName: "Soldat",
      badge: "Polyvalent",
      desc: "Avance proprement avec un fusil stable.",
      shotColor: "#ff7f98",
      strafeNear: 0.86,
      strafeFar: 0.24,
      rushBias: 1
    },
    runner: {
      name: "Sprinteur",
      shortName: "Speed",
      badge: "Rapide",
      desc: "Rafale courte et pression mobile.",
      shotColor: "#ff9d66",
      strafeNear: 1.28,
      strafeFar: 0.62,
      rushBias: 1.18
    },
    tank: {
      name: "Brute",
      shortName: "Tank",
      badge: "Lourd",
      desc: "Encaisse beaucoup et pousse a la pompe.",
      shotColor: "#ffd166",
      strafeNear: 0.16,
      strafeFar: 0.08,
      rushBias: 1.35
    },
    sniper: {
      name: "Tireur",
      shortName: "Sniper",
      badge: "Precision",
      desc: "Joue tres loin et punit les ouvertures.",
      shotColor: "#ff8ddb",
      strafeNear: 0.38,
      strafeFar: 0.18,
      rushBias: -0.82
    },
    boss: {
      name: "Boss",
      shortName: "Boss",
      badge: "Elite",
      desc: "Alterne salves, charges et zones speciales.",
      shotColor: "#ffbd59",
      strafeNear: 0.5,
      strafeFar: 0.36,
      rushBias: 1.06
    }
  };

  window.ARENA_DATA = {
    arena,
    weaponConfigs,
    weaponProfiles,
    weaponCatalog,
    modeLabels,
    weaponCycleOrder,
    bulletStyles,
    skinCatalog,
    obstacleLayouts,
    mapCatalog,
    enemyArchetypeMeta
  };
})();
