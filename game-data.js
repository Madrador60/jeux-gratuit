(() => {
  const arena = { width: 2200, height: 1400 };

  const weaponConfigs = {
    rifle: { label: "FUSIL", reload: 0.1, pellets: 1, spread: 0.01, speed: 1240, damageMul: 1, life: 0.96, radiusMul: 1, shake: 2.5, burstFx: 7 },
    shotgun: { label: "POMPE", reload: 0.52, pellets: 8, spread: 0.38, speed: 780, damageMul: 0.7, life: 0.38, radiusMul: 1.28, shake: 7.4, burstFx: 15 },
    sniper: { label: "SNIPER", reload: 1.02, pellets: 1, spread: 0.001, speed: 1820, damageMul: 3.1, life: 1.32, radiusMul: 0.88, shake: 10.6, burstFx: 12 },
    burst: { label: "RAFALE", reload: 0.27, pellets: 3, spread: 0.07, speed: 1280, damageMul: 0.88, life: 0.86, radiusMul: 0.96, shake: 4.6, burstFx: 10 },
    laser: { label: "LASER", reload: 0.05, pellets: 1, spread: 0.004, speed: 1760, damageMul: 0.78, life: 0.72, radiusMul: 0.72, shake: 1.8, burstFx: 6 },
    grenade: { label: "GRENADE", reload: 0.68, pellets: 1, spread: 0.02, speed: 620, damageMul: 1.8, life: 1.4, radiusMul: 1.42, shake: 6.4, burstFx: 12, explosionRadius: 96, explosionDamageMul: 0.9 },
    arc: { label: "ARC", reload: 0.24, pellets: 1, spread: 0.03, speed: 980, damageMul: 0.86, life: 0.56, radiusMul: 1.05, shake: 3.2, burstFx: 9, chainCount: 2, chainFactor: 0.52 },
    flamethrower: { label: "FLAMMES", reload: 0.08, pellets: 5, spread: 0.42, speed: 520, damageMul: 0.36, life: 0.22, radiusMul: 0.92, shake: 3.2, burstFx: 9, burn: 1.8 },
    railgun: { label: "RAILGUN", reload: 1.25, pellets: 1, spread: 0.0004, speed: 2400, damageMul: 3.8, life: 1.5, radiusMul: 0.82, shake: 12.2, burstFx: 16, pierce: 2 },
    freeze: { label: "GLACE", reload: 0.22, pellets: 2, spread: 0.08, speed: 1100, damageMul: 0.74, life: 0.7, radiusMul: 1, shake: 3.4, burstFx: 8, freeze: 1.4 },
    gravity: { label: "GRAVITE", reload: 0.7, pellets: 1, spread: 0.04, speed: 760, damageMul: 1.1, life: 1.02, radiusMul: 1.2, shake: 7.1, burstFx: 12, gravityRadius: 120, gravityPull: 520, gravityBlast: 0.72 },
    katana: { label: "KATANA", reload: 0.38, pellets: 1, spread: 0, speed: 0, damageMul: 1.7, life: 0.12, radiusMul: 1.2, shake: 8.8, burstFx: 14, meleeDash: true },
    chaos: { label: "CHAOS", reload: 0.2, pellets: 2, spread: 0.14, speed: 1250, damageMul: 0.92, life: 0.92, radiusMul: 1, shake: 5.1, burstFx: 12, chaos: true },
    virus: { label: "VIRUS", reload: 0.26, pellets: 1, spread: 0.06, speed: 980, damageMul: 0.82, life: 0.84, radiusMul: 1, shake: 3.7, burstFx: 8, virus: 2.8 },
    ricochet: { label: "RICOCHET", reload: 0.18, pellets: 1, spread: 0.04, speed: 1220, damageMul: 0.9, life: 1.1, radiusMul: 0.96, shake: 3.1, burstFx: 8, bounces: 2 },
    mine: { label: "MINES", reload: 0.64, pellets: 1, spread: 0.02, speed: 540, damageMul: 0.82, life: 0.9, radiusMul: 1.1, shake: 5.2, burstFx: 10, mineRadius: 88, mineDamageMul: 1.3 },
    drone: { label: "DRONE", reload: 0.52, pellets: 1, spread: 0.03, speed: 900, damageMul: 0.64, life: 0.65, radiusMul: 0.92, shake: 3.8, burstFx: 8, drone: true },
    poison: { label: "POISON", reload: 0.19, pellets: 2, spread: 0.1, speed: 1100, damageMul: 0.66, life: 0.76, radiusMul: 1, shake: 2.8, burstFx: 8, poison: 2.4 },
    explosiveburst: { label: "BURST-X", reload: 0.33, pellets: 4, spread: 0.1, speed: 1180, damageMul: 0.78, life: 0.86, radiusMul: 0.98, shake: 5.2, burstFx: 12, miniExplosion: 54 }
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
    },
    laser: {
      tag: "Continu",
      desc: "Faisceau ultra rapide, propre et tres stable pour percer les duels.",
      stats: ["Tres rapide", "Stable", "Tracking"],
      accent: "#7cf6ff"
    },
    grenade: {
      tag: "Explosion",
      desc: "Projectile lourd qui explose a l'impact et ouvre les packs.",
      stats: ["Zone", "Lourd", "Controle"],
      accent: "#ffb36b"
    },
    arc: {
      tag: "Chaines",
      desc: "L'eclair saute d'une cible a l'autre et nettoie les groupes.",
      stats: ["Chain lightning", "Moyenne portee", "Pression"],
      accent: "#9ce6ff"
    },
    flamethrower: {
      tag: "Incendie",
      desc: "Tres fort de pres, met le feu et fait fondre les tanks.",
      stats: ["Tres proche", "Brulure", "Cone"],
      accent: "#ff8f59"
    },
    railgun: {
      tag: "Percant",
      desc: "Un tir massif qui traverse les lignes et punit tres fort.",
      stats: ["Perce", "Tres lourd", "Longue portee"],
      accent: "#f4b0ff"
    },
    freeze: {
      tag: "Controle",
      desc: "Ralentit fortement les ennemis pour casser leur rythme.",
      stats: ["Glace", "Ralentit", "Safe"],
      accent: "#7ccfff"
    },
    gravity: {
      tag: "Singularite",
      desc: "Attire les ennemis avant d'exploser au centre de l'impact.",
      stats: ["Pull", "Explosion", "Setup"],
      accent: "#b0a2ff"
    },
    katana: {
      tag: "Melee dash",
      desc: "Tranche vite, avance d'un coup et punit au contact.",
      stats: ["Melee", "Dash", "Assassin"],
      accent: "#ffffff"
    },
    chaos: {
      tag: "Aleatoire",
      desc: "Chaque tir peut geler, exploser, infecter ou electriser.",
      stats: ["Random", "Surprise", "Fun"],
      accent: "#ff78ff"
    },
    virus: {
      tag: "Propagation",
      desc: "Infecte une cible puis propage la douleur au groupe.",
      stats: ["Virus", "Spread", "DOT"],
      accent: "#63ff8f"
    },
    ricochet: {
      tag: "Rebond",
      desc: "Les tirs ricochent sur les murs et ouvrent des angles sales.",
      stats: ["Bounce", "Angles", "Trickshots"],
      accent: "#ffd86f"
    },
    mine: {
      tag: "Pieges",
      desc: "Pose des mines qui explosent quand un ennemi s'approche.",
      stats: ["Trap", "Controle", "Zone"],
      accent: "#ffcf63"
    },
    drone: {
      tag: "Support",
      desc: "Deploye un mini-drone allie qui suit et aide au tir.",
      stats: ["Allie", "Support", "Tempo"],
      accent: "#7affc7"
    },
    poison: {
      tag: "DOT",
      desc: "Empoisonne et use les ennemis avec des degats progressifs.",
      stats: ["Poison", "Usure", "Controle"],
      accent: "#9cff88"
    },
    explosiveburst: {
      tag: "Rafale-X",
      desc: "Rafale rapide avec mini-explosions sur chaque impact.",
      stats: ["Burst", "Mini boom", "Chaos"],
      accent: "#ff946b"
    }
  };

  const weaponCatalog = {
    rifle: {
      name: "Fusil",
      price: 0,
      badge: "Gratuit",
      rarity: "common",
      tag: "Polyvalent",
      blurb: "Le plus stable pour debuter et tenir les duels.",
      mark: "F"
    },
    shotgun: {
      name: "Pompe",
      price: 0,
      badge: "Gratuit",
      rarity: "common",
      tag: "Impact",
      blurb: "Tres violent de pres avec un gros recul sur les ennemis.",
      mark: "P"
    },
    sniper: {
      name: "Sniper",
      price: 0,
      badge: "Gratuit",
      rarity: "rare",
      tag: "Critique",
      blurb: "Tir ultra fort pour ouvrir les combats de loin.",
      mark: "S"
    },
    burst: {
      name: "Rafale",
      price: 0,
      badge: "Gratuit",
      rarity: "common",
      tag: "Pression",
      blurb: "Bonne arme nerveuse pour tenir le rythme en continu.",
      mark: "R"
    },
    laser: {
      name: "Laser continu",
      price: 22,
      badge: "Continu",
      rarity: "rare",
      tag: "Nouveau",
      blurb: "Ultra rapide pour coller la visee et tenir le DPS.",
      mark: "L"
    },
    grenade: {
      name: "Lance-grenade",
      price: 28,
      badge: "Boom",
      rarity: "rare",
      tag: "Zone",
      blurb: "Explose a l'impact pour ouvrir les zones denses.",
      mark: "LG"
    },
    arc: {
      name: "Arc electrique",
      price: 30,
      badge: "Eclair",
      rarity: "epic",
      tag: "Chaine",
      blurb: "Chain lightning sur plusieurs cibles proches.",
      mark: "AE"
    },
    flamethrower: {
      name: "Lance-flammes",
      price: 34,
      badge: "Feu",
      rarity: "rare",
      tag: "Controle",
      blurb: "Court rayon, grosse pression et brulure continue.",
      mark: "LF"
    },
    railgun: {
      name: "Railgun",
      price: 42,
      badge: "Percant",
      rarity: "legendary",
      tag: "Lourd",
      blurb: "Traverse les lignes avec un tir lourd devastateur.",
      mark: "RG"
    },
    freeze: {
      name: "Freeze gun",
      price: 36,
      badge: "Glace",
      rarity: "rare",
      tag: "Safe",
      blurb: "Gele le rythme adverse avec un gros ralentissement.",
      mark: "FG"
    },
    gravity: {
      name: "Arme gravite",
      price: 44,
      badge: "Pull",
      rarity: "legendary",
      tag: "Controle",
      blurb: "Attire, regroupe puis fait exploser les ennemis.",
      mark: "GV"
    },
    katana: {
      name: "Katana dash",
      price: 26,
      badge: "Melee",
      rarity: "rare",
      tag: "Dash",
      blurb: "Slash rapide avec dash pour casser les duels de pres.",
      mark: "KD"
    },
    chaos: {
      name: "Chaos gun",
      price: 48,
      badge: "Random",
      rarity: "legendary",
      tag: "Chaos",
      blurb: "Effets aleatoires a chaque tir pour un style imprevisible.",
      mark: "CH"
    },
    virus: {
      name: "Arme virus",
      price: 40,
      badge: "Spread",
      rarity: "epic",
      tag: "Degats",
      blurb: "Infecte et propage les degats dans les groupes.",
      mark: "VX"
    },
    ricochet: {
      name: "Ricochet gun",
      price: 32,
      badge: "Rebond",
      rarity: "rare",
      tag: "Angles",
      blurb: "Balles qui rebondissent sur les murs pour jouer les angles.",
      mark: "RC"
    },
    mine: {
      name: "Mine launcher",
      price: 29,
      badge: "Pieges",
      rarity: "rare",
      tag: "Pieges",
      blurb: "Pose des pieges explosifs pour verrouiller la map.",
      mark: "MN"
    },
    drone: {
      name: "Drone gun",
      price: 46,
      badge: "Support",
      rarity: "epic",
      tag: "Allie",
      blurb: "Fait apparaitre un mini-drone allie qui vous assiste.",
      mark: "DR"
    },
    poison: {
      name: "Poison gun",
      price: 31,
      badge: "DOT",
      rarity: "rare",
      tag: "Usure",
      blurb: "Degats sur la duree pour user sans arret.",
      mark: "PS"
    },
    explosiveburst: {
      name: "Burst explosif",
      price: 38,
      badge: "Mini boom",
      rarity: "epic",
      tag: "Explosif",
      blurb: "Rafale nerveuse avec mini explosions sur impact.",
      mark: "BX"
    }
  };

  const modeLabels = {
    levels: "NIVEAUX",
    duo: "2V2 ASSIST",
    chaos: "CHAOS",
    swarm: "MEUTE",
    bossrush: "RUEE BOSS"
  };

  const starterWeaponIds = ["rifle", "shotgun", "sniper", "burst"];

  const weaponCycleOrder = [
    "rifle",
    "shotgun",
    "sniper",
    "burst",
    "laser",
    "grenade",
    "arc",
    "flamethrower",
    "railgun",
    "freeze",
    "gravity",
    "katana",
    "chaos",
    "virus",
    "ricochet",
    "mine",
    "drone",
    "poison",
    "explosiveburst"
  ];
  const bulletStyles = ["dot", "streak", "plasma", "spark", "ring", "comet", "shard", "bolt", "pulse", "nova"];

  const skinCatalog = {
    tank: { name: "Tank", price: 0, image: "assets/skins/tank.svg", rarity: "common" },
    duck: { name: "Canard", price: 0, image: "assets/skins/duck.svg", rarity: "common" },
    poop: { name: "Caca", price: 6, image: "assets/skins/poop.svg", rarity: "rare" },
    cat: { name: "Chat", price: 8, image: "assets/skins/cat.svg", rarity: "rare" },
    bear: { name: "Ours", price: 10, image: "assets/skins/bear.svg", rarity: "rare" },
    fox: { name: "Renard", price: 12, image: "assets/skins/fox.svg", rarity: "rare" },
    frog: { name: "Grenouille", price: 14, image: "assets/skins/frog.svg", rarity: "rare" },
    banana: { name: "Banane", price: 16, image: "assets/skins/banana.svg", rarity: "rare" },
    alien: { name: "Alien", price: 18, image: "assets/skins/alien.svg", rarity: "epic" },
    panda: { name: "Panda", price: 20, image: "assets/skins/panda.svg", rarity: "epic" },
    shark: { name: "Requin", price: 22, image: "assets/skins/shark.svg", rarity: "epic" },
    robot: { name: "Robot", price: 24, image: "assets/skins/robot.svg", rarity: "epic" },
    ninja: { name: "Ninja", price: 26, image: "assets/skins/ninja.svg", rarity: "epic" },
    skull: { name: "Crane", price: 28, image: "assets/skins/skull.svg", rarity: "epic" },
    pig: { name: "Cochon", price: 30, image: "assets/skins/pig.svg", rarity: "epic" },
    rabbit: { name: "Lapin", price: 32, image: "assets/skins/rabbit.svg", rarity: "epic" },
    dragon: { name: "Dragon", price: 34, image: "assets/skins/dragon.svg", rarity: "legendary" },
    chicken: { name: "Poulet", price: 36, image: "assets/skins/chicken.svg", rarity: "rare" },
    monkey: { name: "Singe", price: 38, image: "assets/skins/monkey.svg", rarity: "rare" },
    tiger: { name: "Tigre", price: 40, image: "assets/skins/tiger.svg", rarity: "legendary" },
    cow: { name: "Vache", price: 42, image: "assets/skins/cow.svg", rarity: "epic" }
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
    charger: {
      name: "Assaillant",
      shortName: "Charge",
      badge: "Rupture",
      desc: "Fonce, casse la ligne et force les duels rapproches.",
      shotColor: "#ffb36b",
      strafeNear: 0.18,
      strafeFar: 0.06,
      rushBias: 1.46
    },
    orbiter: {
      name: "Orbiteur",
      shortName: "Orbiter",
      badge: "Controle",
      desc: "Tourne autour de vous et maintient une pression laterale.",
      shotColor: "#8fdcff",
      strafeNear: 1.5,
      strafeFar: 0.96,
      rushBias: 0.36
    },
    skirmisher: {
      name: "Escarmoucheur",
      shortName: "Skirmish",
      badge: "Laser",
      desc: "Joue la distance, strafe beaucoup et use au laser.",
      shotColor: "#63ebff",
      strafeNear: 1.18,
      strafeFar: 0.72,
      rushBias: 0.22
    },
    engineer: {
      name: "Ingenieur",
      shortName: "Engi",
      badge: "Pieges",
      desc: "Pose des mines et pousse a bouger en permanence.",
      shotColor: "#d0b5ff",
      strafeNear: 0.52,
      strafeFar: 0.22,
      rushBias: -0.18
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
    starterWeaponIds,
    modeLabels,
    weaponCycleOrder,
    bulletStyles,
    skinCatalog,
    obstacleLayouts,
    mapCatalog,
    enemyArchetypeMeta
  };
})();
