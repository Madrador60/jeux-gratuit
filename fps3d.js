(function () {
  const THREE = window.THREE;
  const ui = {
    app: document.getElementById("fpsApp"),
    canvas: document.getElementById("fps3dCanvas"),
    loading: document.getElementById("fpsLoading"),
    loadingText: document.getElementById("fpsLoadingText"),
    intro: document.getElementById("fpsIntro"),
    gameOver: document.getElementById("fpsGameOver"),
    gameOverTitle: document.getElementById("fpsGameOverTitle"),
    gameOverText: document.getElementById("fpsGameOverText"),
    enterButton: document.getElementById("fpsEnterButton"),
    restartButton: document.getElementById("fpsRestartButton"),
    fullscreenButton: document.getElementById("fpsFullscreenButton"),
    crosshair: document.getElementById("fpsCrosshair"),
    vignette: document.getElementById("fpsVignette"),
    hp: document.getElementById("fpsHp"),
    score: document.getElementById("fpsScore"),
    targets: document.getElementById("fpsTargets"),
    weapon: document.getElementById("fpsWeapon"),
    combo: document.getElementById("fpsCombo"),
    boost: document.getElementById("fpsBoost"),
    event: document.getElementById("fpsEvent"),
    fps: document.getElementById("fpsFrame"),
    wave: document.getElementById("fpsWave"),
    threat: document.getElementById("fpsThreat"),
    zone: document.getElementById("fpsZone"),
    hint: document.getElementById("fpsHint"),
    objective: document.getElementById("fpsObjective"),
    objectiveText: document.getElementById("fpsObjectiveText"),
    bossState: document.getElementById("fpsBossState"),
    bossBar: document.getElementById("fpsBossBar"),
    bossFill: document.getElementById("fpsBossFill"),
    bossName: document.getElementById("fpsBossName"),
    bossHpText: document.getElementById("fpsBossHpText"),
    moment: document.getElementById("fpsMoment"),
    momentTag: document.getElementById("fpsMomentTag"),
    momentTitle: document.getElementById("fpsMomentTitle"),
    momentText: document.getElementById("fpsMomentText"),
    arenaFlavor: document.getElementById("fpsArenaFlavor"),
    summaryWave: document.getElementById("fpsSummaryWave"),
    summaryKills: document.getElementById("fpsSummaryKills"),
    summaryScore: document.getElementById("fpsSummaryScore")
  };
  const debugParams = new URLSearchParams(window.location.search);
  const autoStart3d = debugParams.has("autostart3d");
  const debug3d = debugParams.has("debug3d");

  function setText(node, value) {
    if (!node) return;
    const next = String(value);
    if (node.textContent !== next) node.textContent = next;
  }

  function setHint(text) {
    setText(ui.hint, text);
  }

  function makeRadialTexture(innerColor, outerColor) {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const g = canvas.getContext("2d");
    const gradient = g.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(0.35, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.55, outerColor);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gradient;
    g.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  let debugSampleTimer = 0;

  function sampleDebugPixel(dt) {
    if (!debug3d) return;
    debugSampleTimer -= dt;
    if (debugSampleTimer > 0) return;
    debugSampleTimer = 0.8;
    try {
      const gl = renderer.getContext();
      const px = new Uint8Array(4);
      const x = Math.max(0, Math.floor(renderer.domElement.width * 0.5));
      const y = Math.max(0, Math.floor(renderer.domElement.height * 0.45));
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      ui.canvas?.setAttribute("data-sample", `${px[0]},${px[1]},${px[2]},${px[3]}`);
      ui.canvas?.setAttribute("data-cam", `${state.yaw.toFixed(3)},${state.pitch.toFixed(3)}`);
      ui.canvas?.setAttribute("data-calls", String(renderer.info.render.calls));
      setHint(`DBG px ${px[0]},${px[1]},${px[2]} | objs ${scene.children.length} | pos ${playerRig.position.x.toFixed(1)},${playerRig.position.z.toFixed(1)}`);
    } catch (error) {
      ui.canvas?.setAttribute("data-sample", `error:${error?.message || error}`);
      setHint(`DBG erreur pixel ${error?.message || error}`);
    }
  }

  function aimCameraAt(targetX, targetY, targetZ) {
    const worldCamera = new THREE.Vector3(playerRig.position.x, playerRig.position.y + 1.82, playerRig.position.z);
    const dx = targetX - worldCamera.x;
    const dy = targetY - worldCamera.y;
    const dz = targetZ - worldCamera.z;
    const flat = Math.max(0.001, Math.hypot(dx, dz));
    state.yaw = Math.atan2(dx, -dz);
    state.pitch = clamp(Math.atan2(dy, flat), -1.05, 1.05);
    playerRig.rotation.y = state.yaw;
    camera.rotation.set(state.pitch, 0, 0);
  }

  function setLoading(message, visible) {
    setText(ui.loadingText, message);
    ui.loading?.classList.toggle("hidden", !visible);
  }

  function revealIntro() {
    ui.enterButton?.removeAttribute("disabled");
    ui.intro?.classList.remove("hidden");
  }

  if (!THREE) {
    setLoading("Three.js n'a pas pu charger. Rechargez la page avec internet actif.", true);
    setHint("Le moteur 3D est indisponible.");
    return;
  }

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (items) => items[Math.floor(Math.random() * items.length)];

  function disposeMaterial(material) {
    if (!material) return;
    if (Array.isArray(material)) {
      material.forEach(disposeMaterial);
      return;
    }
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === "object" && typeof value.dispose === "function") {
        value.dispose();
      }
    }
    material.dispose?.();
  }

  function disposeObject3D(object) {
    if (!object) return;
    object.traverse((child) => {
      child.geometry?.dispose?.();
      disposeMaterial(child.material);
    });
    object.parent?.remove(object);
  }

  const glContext =
    ui.canvas?.getContext("webgl", {
      antialias: true,
      alpha: false,
      depth: true,
      stencil: false,
      powerPreference: "default"
    }) ||
    ui.canvas?.getContext("experimental-webgl", {
      antialias: true,
      alpha: false,
      depth: true,
      stencil: false,
      powerPreference: "default"
    });

  if (!glContext) {
    setLoading("WebGL n'est pas disponible sur ce navigateur. Le mode 3D ne peut pas demarrer.", true);
    setHint("Activez l'acceleration graphique pour jouer au mode FPS 3D.");
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: ui.canvas,
    context: glContext,
    antialias: true,
    powerPreference: "default"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  ui.canvas?.setAttribute("data-engine", `three.js ${renderer.capabilities.isWebGL2 ? "webgl2" : "webgl1"}`);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111b24);
  scene.fog = new THREE.FogExp2(0x150c0a, 0.0062);

  const camera = new THREE.PerspectiveCamera(76, window.innerWidth / window.innerHeight, 0.1, 260);
  camera.rotation.order = "YXZ";
  const playerRig = new THREE.Group();
  playerRig.position.set(0, 0, 34);
  scene.add(playerRig);
  playerRig.add(camera);
  camera.position.set(0, 1.82, 0);

  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();

  const state = {
    hp: 100,
    maxHp: 100,
    score: 0,
    kills: 0,
    combo: 0,
    comboTimer: 0,
    wave: 1,
    threat: "BASSE",
    weaponId: "pulse",
    boostType: "none",
    boostTimer: 0,
    eventType: "standard",
    eventTimer: 0,
    locked: false,
    gameOver: false,
    sessionRequested: false,
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    sprint: false,
    wantDash: false,
    fireHeld: false,
    pendingShot: false,
    yaw: 0,
    pitch: 0,
    fpsValue: 0,
    hurt: 0,
    hit: 0,
    shootFx: 0,
    ambienceTimer: 0,
    muzzleTimer: 0,
    mouseSensitivity: 0.0019,
    pendingWave: false,
    intermissionTimer: 0,
    critFlash: 0,
    damageOverlay: 0,
    shake: 0,
    freezeFrames: 0,
    bestWave: 1,
    momentTimer: 0,
    dashOverlay: 0
  };

  const player = {
    radius: 1.05,
    velocity: new THREE.Vector3(),
    baseSpeed: 13.5,
    sprintBonus: 5.6,
    dashCooldown: 0,
    shootCooldown: 0,
    dashBurst: 36,
    bobPhase: 0,
    weaponKick: 0,
    damageKick: 0,
    fovKick: 0,
    summonCooldown: 0
  };

  const world = {
    halfSize: 82,
    colliders: [],
    hazards: [],
    enemies: [],
    allies: [],
    projectiles: [],
    effects: [],
    pickups: [],
    strikes: [],
    lavaLights: [],
    emberCloud: null,
    muzzleLight: null,
    muzzleFlash: null,
    weaponRig: null,
    weaponBody: null,
    weaponBarrel: null,
    weaponCore: null,
    weaponRing: null
  };

  let audioContext = null;
  let ambientGain = null;
  let ambientOscA = null;
  let ambientOscB = null;
  let arenaFlavorIndex = 0;
  let lastEnterPress = 0;
  let audioPrimed = false;

  function ensureAudio() {
    if (!audioContext) {
      const Ref = window.AudioContext || window.webkitAudioContext;
      if (!Ref) return null;
      audioContext = new Ref();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  }

  function tone(from, to, volume, duration, wave = "sawtooth", filterFreq = 1500) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = wave;
    osc.frequency.setValueAtTime(Math.max(0.001, from), now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(0.001, to), now + duration);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(filterFreq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  function primeAudio() {
    if (audioPrimed) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    audioPrimed = true;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.00001;
    osc.frequency.value = 220;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.start(now);
    osc.stop(now + 0.02);
  }

  function startAmbient() {
    const ctx = ensureAudio();
    if (!ctx || ambientGain) return;

    ambientGain = ctx.createGain();
    ambientGain.gain.value = 0.03;
    ambientGain.connect(ctx.destination);

    ambientOscA = ctx.createOscillator();
    ambientOscA.type = "triangle";
    ambientOscA.frequency.value = 62;

    ambientOscB = ctx.createOscillator();
    ambientOscB.type = "sine";
    ambientOscB.frequency.value = 93;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 420;

    ambientOscA.connect(lowpass);
    ambientOscB.connect(lowpass);
    lowpass.connect(ambientGain);

    ambientOscA.start();
    ambientOscB.start();
  }

  function pulseAmbient(dt) {
    if (!ambientGain || !audioContext) return;
    state.ambienceTimer += dt;
    const now = audioContext.currentTime;
    const swell = 0.026 + Math.sin(state.ambienceTimer * 0.5) * 0.01;
    ambientGain.gain.setTargetAtTime(swell, now, 0.4);

    if (state.ambienceTimer > 3.8) {
      state.ambienceTimer = 0;
      tone(160, 92, 0.02, 0.42, "triangle", 520);
    }
  }

  function playShootSound(weapon = currentWeaponConfig()) {
    if (weapon.label === "SCATTER") {
      tone(260, 70, 0.075, 0.18, "sawtooth", 1400);
      tone(120, 64, 0.035, 0.22, "triangle", 800);
      return;
    }
    if (weapon.label === "RAIL") {
      tone(880, 180, 0.065, 0.2, "square", 2400);
      tone(180, 80, 0.025, 0.3, "triangle", 900);
      return;
    }
    if (weapon.label === "TESLA") {
      tone(540, 240, 0.05, 0.1, "sawtooth", 2200);
      tone(1080, 560, 0.03, 0.08, "square", 2600);
      return;
    }
    if (weapon.label === "RPG" || weapon.label === "GRAVITE") {
      tone(210, 66, 0.07, 0.24, "sawtooth", 1200);
      tone(110, 60, 0.028, 0.3, "triangle", 700);
      return;
    }
    if (weapon.label === "CLONE") {
      tone(320, 880, 0.04, 0.16, "triangle", 1600);
      return;
    }
    tone(380, 96, 0.055, 0.14, "square", 1800);
    tone(180, 110, 0.022, 0.18, "triangle", 1200);
  }

  function playHitSound() {
    tone(920, 420, 0.035, 0.09, "square", 2200);
  }

  function playCritSound() {
    tone(1260, 380, 0.05, 0.14, "sawtooth", 2600);
  }

  function playEnemyShotSound() {
    tone(220, 110, 0.03, 0.2, "triangle", 780);
  }

  function playDashSound() {
    tone(120, 28, 0.06, 0.3, "sawtooth", 720);
  }

  function playExplosionSound() {
    tone(180, 32, 0.07, 0.38, "sawtooth", 520);
  }

  function playGameOverSound() {
    tone(150, 24, 0.08, 0.56, "sawtooth", 480);
  }

  function buildTexture(draw, repeatX, repeatY) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const g = canvas.getContext("2d");
    draw(g, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.anisotropy = 8;
    return texture;
  }

  const basaltTexture = buildTexture((g, width, height) => {
    const grad = g.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#2f2625");
    grad.addColorStop(1, "#0b0c10");
    g.fillStyle = grad;
    g.fillRect(0, 0, width, height);
    for (let i = 0; i < 360; i += 1) {
      g.fillStyle = `rgba(255,255,255,${0.008 + Math.random() * 0.028})`;
      g.fillRect(Math.random() * width, Math.random() * height, 10 + Math.random() * 80, 4 + Math.random() * 20);
    }
    g.strokeStyle = "rgba(255,104,72,0.09)";
    g.lineWidth = 2.6;
    for (let i = 0; i < 30; i += 1) {
      g.beginPath();
      g.moveTo(Math.random() * width, Math.random() * height);
      for (let j = 0; j < 5; j += 1) {
        g.lineTo(Math.random() * width, Math.random() * height);
      }
      g.stroke();
    }
  }, 18, 18);

  const lavaTexture = buildTexture((g, width, height) => {
    const grad = g.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#390905");
    grad.addColorStop(0.35, "#841606");
    grad.addColorStop(0.65, "#ff6324");
    grad.addColorStop(1, "#ffd27a");
    g.fillStyle = grad;
    g.fillRect(0, 0, width, height);
    g.globalAlpha = 0.7;
    for (let i = 0; i < 24; i += 1) {
      g.strokeStyle = i % 2 === 0 ? "rgba(255,237,176,0.7)" : "rgba(255,132,52,0.88)";
      g.lineWidth = 10 + Math.random() * 16;
      g.beginPath();
      g.moveTo(Math.random() * width, 0);
      for (let j = 0; j < 7; j += 1) {
        g.lineTo(Math.random() * width, (height / 6) * j + Math.random() * 80);
      }
      g.stroke();
    }
    g.globalAlpha = 1;
  }, 10, 10);

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: basaltTexture,
    roughness: 0.88,
    metalness: 0.06,
    emissive: new THREE.Color(0x0d1821),
    emissiveIntensity: 0.58
  });
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x342f38,
    roughness: 0.82,
    metalness: 0.12,
    emissive: new THREE.Color(0x100d10),
    emissiveIntensity: 0.18
  });
  const lavaMaterial = new THREE.MeshStandardMaterial({
    map: lavaTexture,
    emissiveMap: lavaTexture,
    emissive: new THREE.Color(0xff6b2c),
    emissiveIntensity: 2,
    roughness: 0.35,
    metalness: 0.02
  });

  function pointInsideRect(x, z, rect, padding = 0) {
    return (
      x > rect.x - rect.width / 2 - padding &&
      x < rect.x + rect.width / 2 + padding &&
      z > rect.z - rect.depth / 2 - padding &&
      z < rect.z + rect.depth / 2 + padding
    );
  }

  function intersectsAnyCollider(x, z, radius) {
    return world.colliders.some((rect) => pointInsideRect(x, z, rect, radius));
  }

  function isOnHazard(x, z, padding = 0) {
    return world.hazards.some((rect) => pointInsideRect(x, z, rect, padding));
  }

  function resolveCollisions(position, radius) {
    for (const rect of world.colliders) {
      const nearestX = clamp(position.x, rect.x - rect.width / 2, rect.x + rect.width / 2);
      const nearestZ = clamp(position.z, rect.z - rect.depth / 2, rect.z + rect.depth / 2);
      const dx = position.x - nearestX;
      const dz = position.z - nearestZ;
      const distSq = dx * dx + dz * dz;
      if (distSq >= radius * radius) continue;
      const dist = Math.sqrt(distSq) || 0.0001;
      const push = radius - dist;
      position.x += (dx / dist) * push;
      position.z += (dz / dist) * push;
    }
    position.x = clamp(position.x, -world.halfSize + radius + 1, world.halfSize - radius - 1);
    position.z = clamp(position.z, -world.halfSize + radius + 1, world.halfSize - radius - 1);
  }

  function addCollider(x, z, width, depth) {
    world.colliders.push({ x, z, width, depth });
  }

  function addHazard(x, z, width, depth, damage) {
    world.hazards.push({ x, z, width, depth, damage });
  }

  function makeBox(x, y, z, width, height, depth, material = wallMaterial, collider = true) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    if (collider) addCollider(x, z, width, depth);
  }

  function makeLava(x, z, width, depth, damage) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), lavaMaterial);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.02, z);
    mesh.receiveShadow = true;
    scene.add(mesh);
    const light = new THREE.PointLight(0xff7a34, 4.4, Math.max(width, depth) * 1.2, 2);
    light.position.set(x, 1.6, z);
    scene.add(light);
    world.lavaLights.push({ light, base: light.intensity, phase: rand(0, Math.PI * 2) });
    addHazard(x, z, width, depth, damage);
  }

  function makeSpire(x, z, scale) {
    const mesh = new THREE.Mesh(
      new THREE.ConeGeometry(3.2 * scale, 10 * scale, 7),
      new THREE.MeshStandardMaterial({ color: 0x221816, roughness: 0.94, metalness: 0.02 })
    );
    mesh.position.set(x, 5 * scale, z);
    mesh.rotation.y = rand(0, Math.PI);
    mesh.castShadow = true;
    scene.add(mesh);
  }

  function buildArena() {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(180, 180), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(180, 24, 0x93f0ff, 0x39556a);
    grid.position.y = 0.06;
    grid.material.transparent = true;
    grid.material.opacity = 0.42;
    scene.add(grid);

    const runway = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 96),
      new THREE.MeshBasicMaterial({ color: 0x102533, transparent: true, opacity: 0.58 })
    );
    runway.rotation.x = -Math.PI / 2;
    runway.position.set(0, 0.08, -8);
    scene.add(runway);

    const laneMaterial = new THREE.MeshBasicMaterial({ color: 0x8ef6ff, transparent: true, opacity: 0.84 });
    [
      [-5.4, -8],
      [0, -8],
      [5.4, -8]
    ].forEach(([x, z]) => {
      const lane = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 88), laneMaterial);
      lane.rotation.x = -Math.PI / 2;
      lane.position.set(x, 0.1, z);
      scene.add(lane);
    });

    const stagingPad = new THREE.Mesh(
      new THREE.PlaneGeometry(34, 42),
      new THREE.MeshBasicMaterial({ color: 0x143447, transparent: true, opacity: 0.82 })
    );
    stagingPad.rotation.x = -Math.PI / 2;
    stagingPad.position.set(0, 0.09, 22);
    scene.add(stagingPad);

    const stagingLineMaterial = new THREE.MeshBasicMaterial({ color: 0x8cf7ff, transparent: true, opacity: 0.95 });
    [
      [0, 0.12, 2.8, 24],
      [-11.5, 0.12, 0.32, 38],
      [11.5, 0.12, 0.32, 38],
      [0, 8.2, 22, 0.32]
    ].forEach(([x, z, width, depth]) => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), stagingLineMaterial);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.12, z);
      scene.add(line);
    });

    const bridgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x303640,
      roughness: 0.78,
      metalness: 0.25,
      emissive: new THREE.Color(0x0d1920),
      emissiveIntensity: 0.2
    });

    [
      [0, 4, -88, 176, 8],
      [0, 4, 88, 176, 8],
      [-88, 4, 0, 8, 176],
      [88, 4, 0, 8, 176],
      [0, 2.2, 0, 26, 4.4, 18],
      [-36, 2.2, -8, 20, 4.4, 14],
      [34, 2.2, 6, 22, 4.4, 14],
      [-8, 2.2, 34, 16, 4.4, 18],
      [40, 2.2, 32, 14, 4.4, 20],
      [-48, 2.2, 28, 16, 4.4, 18]
    ].forEach(([x, y, z, w, h, d]) => makeBox(x, y, z, w, h, d));

    [
      [0, -58, 104, 16, 18],
      [-58, 12, 16, 64, 16],
      [58, -6, 16, 58, 16],
      [0, 52, 54, 14, 18],
      [26, 0, 18, 18, 22],
      [0, 20, 44, 8, 10],
      [-22, -18, 22, 7, 12]
    ].forEach(([x, z, w, d, damage]) => makeLava(x, z, w, d, damage));

    [
      [0, 0.45, -58, 28, 0.9, 10],
      [58, 0.45, -6, 10, 0.9, 30],
      [-58, 0.45, 12, 10, 0.9, 36]
    ].forEach(([x, y, z, w, h, d]) => makeBox(x, y, z, w, h, d, bridgeMaterial, true));

    [
      [-70, -70, 1.4], [-24, -78, 1], [18, -76, 1.3], [68, -68, 1.2],
      [-72, 72, 1.3], [-30, 80, 1], [24, 78, 1.35], [74, 70, 1.18]
    ].forEach(([x, z, scale]) => makeSpire(x, z, scale));

    const skyGlow = new THREE.Mesh(
      new THREE.SphereGeometry(150, 36, 18),
      new THREE.MeshBasicMaterial({ color: 0xff5522, side: THREE.BackSide, transparent: true, opacity: 0.08 })
    );
    scene.add(skyGlow);

    const coreBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.1, 0.26, 28),
      new THREE.MeshStandardMaterial({
        color: 0x17212a,
        emissive: new THREE.Color(0xff7a34),
        emissiveIntensity: 1.9,
        roughness: 0.24,
        metalness: 0.1
      })
    );
    coreBeacon.position.set(0, 0.24, 0);
    coreBeacon.receiveShadow = true;
    scene.add(coreBeacon);

    const coreHalo = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.16, 14, 42),
      new THREE.MeshBasicMaterial({ color: 0xffb266, transparent: true, opacity: 0.62 })
    );
    coreHalo.rotation.x = Math.PI / 2;
    coreHalo.position.set(0, 0.12, 0);
    scene.add(coreHalo);

    const beaconMaterial = new THREE.MeshBasicMaterial({ color: 0x7ef2ff, transparent: true, opacity: 0.86 });
    [
      [-26, 4.4, -20],
      [28, 4.4, -26],
      [-32, 4.4, 22],
      [30, 4.4, 28]
    ].forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.65, 7.6, 10), beaconMaterial);
      pillar.position.set(x, y, z);
      scene.add(pillar);
    });

    const arenaRing = new THREE.Mesh(
      new THREE.RingGeometry(18, 19.2, 48),
      new THREE.MeshBasicMaterial({ color: 0xff8b55, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
    );
    arenaRing.rotation.x = -Math.PI / 2;
    arenaRing.position.set(0, 0.05, 0);
    scene.add(arenaRing);

    const startMarker = new THREE.Group();
    const startCore = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 2.2, 2.2),
      new THREE.MeshBasicMaterial({ color: 0x8ff8ff })
    );
    startCore.position.y = 2.2;
    startMarker.add(startCore);
    const startAura = new THREE.Mesh(
      new THREE.TorusGeometry(2.7, 0.16, 12, 28),
      new THREE.MeshBasicMaterial({ color: 0xffb45f, transparent: true, opacity: 0.72 })
    );
    startAura.rotation.x = Math.PI / 2;
    startMarker.add(startAura);
    startMarker.position.set(0, 0.2, 12);
    scene.add(startMarker);

    const forgeGate = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 9),
      new THREE.MeshBasicMaterial({ color: 0xff9f67, transparent: true, opacity: 0.28, side: THREE.DoubleSide })
    );
    forgeGate.position.set(0, 5.4, 6);
    scene.add(forgeGate);

    const gatePostMaterial = new THREE.MeshBasicMaterial({ color: 0x8cecff, transparent: true, opacity: 0.82 });
    [
      [-9.2, 4.8, 6, 0.4, 9.4, 0.4],
      [9.2, 4.8, 6, 0.4, 9.4, 0.4],
      [0, 9.3, 6, 18.8, 0.34, 0.34]
    ].forEach(([x, y, z, w, h, d]) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), gatePostMaterial);
      post.position.set(x, y, z);
      scene.add(post);
    });

    const nearMonolith = new THREE.Mesh(
      new THREE.BoxGeometry(5.4, 5.4, 5.4),
      new THREE.MeshBasicMaterial({ color: 0x8cf7ff, transparent: true, opacity: 0.9 })
    );
    nearMonolith.position.set(0, 3.2, 54);
    scene.add(nearMonolith);

    const emberGeo = new THREE.BufferGeometry();
    const count = 520;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = rand(-110, 110);
      positions[i * 3 + 1] = rand(0, 24);
      positions[i * 3 + 2] = rand(-110, 110);
      speeds[i] = rand(0.28, 0.82);
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    world.emberCloud = new THREE.Points(
      emberGeo,
      new THREE.PointsMaterial({ color: 0xffa562, size: 0.2, transparent: true, opacity: 0.68, depthWrite: false })
    );
    world.emberCloud.userData.speeds = speeds;
    scene.add(world.emberCloud);
  }

  scene.add(new THREE.AmbientLight(0xffe7cf, 1.08));
  scene.add(new THREE.HemisphereLight(0xb7ecff, 0xff8845, 1.08));

  const moonLight = new THREE.DirectionalLight(0xfff0d8, 1.75);
  moonLight.position.set(18, 28, 12);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.width = 1024;
  moonLight.shadow.mapSize.height = 1024;
  moonLight.shadow.camera.left = -60;
  moonLight.shadow.camera.right = 60;
  moonLight.shadow.camera.top = 60;
  moonLight.shadow.camera.bottom = -60;
  scene.add(moonLight);

  const lavaFillLight = new THREE.PointLight(0xff6429, 9.2, 150, 2);
  lavaFillLight.position.set(0, 9, 0);
  scene.add(lavaFillLight);

  world.muzzleLight = new THREE.PointLight(0x8cecff, 0, 12, 2);
  world.muzzleLight.position.set(0, 0, 0);
  scene.add(world.muzzleLight);

  const muzzleFlashTexture = makeRadialTexture("rgba(255,244,200,1)", "rgba(255,132,82,0.55)");
  world.muzzleFlash = new THREE.Sprite(new THREE.SpriteMaterial({
    map: muzzleFlashTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  }));
  world.muzzleFlash.scale.set(1.6, 1.6, 1.6);
  world.muzzleFlash.position.set(0.26, -0.18, -1.05);
  camera.add(world.muzzleFlash);

  function buildViewWeapon() {
    const rig = new THREE.Group();
    rig.position.set(0.58, -0.5, -0.95);

    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x202c39,
      roughness: 0.32,
      metalness: 0.72,
      emissive: new THREE.Color(0x09131c),
      emissiveIntensity: 0.26
    });
    const barrelMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9d8e7,
      roughness: 0.18,
      metalness: 0.88,
      emissive: new THREE.Color(0x10202d),
      emissiveIntensity: 0.18
    });
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x8cecff,
      emissive: new THREE.Color(0x8cecff),
      emissiveIntensity: 1.2,
      roughness: 0.18,
      metalness: 0.2,
      transparent: true,
      opacity: 0.96
    });
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8cecff,
      transparent: true,
      opacity: 0.7
    });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.2, 0.98), shellMaterial);
    body.position.set(0, 0, 0);
    rig.add(body);

    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.78), barrelMaterial);
    barrel.position.set(0.04, 0.02, -0.72);
    rig.add(barrel);

    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.16), shellMaterial.clone());
    grip.position.set(-0.04, -0.16, 0.08);
    grip.rotation.x = 0.2;
    rig.add(grip);

    const core = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, 0.22), coreMaterial);
    core.position.set(0.02, 0.02, -0.15);
    rig.add(core);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.014, 8, 22), ringMaterial);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(0.02, 0.03, -0.52);
    rig.add(ring);

    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.42), barrelMaterial.clone());
    rail.position.set(0.02, 0.1, -0.36);
    rig.add(rail);
    rig.userData.basePosition = new THREE.Vector3(0.58, -0.5, -0.95);
    rig.userData.baseRotation = new THREE.Euler(-0.14, 0.18, -0.08);

    camera.add(rig);
    world.weaponRig = rig;
    world.weaponBody = body;
    world.weaponBarrel = barrel;
    world.weaponCore = core;
    world.weaponRing = ring;
  }

  function applyViewWeaponStyle(id = state.weaponId) {
    if (!world.weaponRig || !world.weaponBody || !world.weaponBarrel || !world.weaponCore || !world.weaponRing) return;
    const preset = {
      pulse: { accent: 0x8cecff, shell: 0x202c39, scale: 1, barrel: 0.78, width: 0.1, yaw: 0.18, pitch: -0.14 },
      scatter: { accent: 0xffcf78, shell: 0x34271f, scale: 1.08, barrel: 0.56, width: 0.16, yaw: 0.2, pitch: -0.16 },
      rail: { accent: 0xf6b4ff, shell: 0x2b2234, scale: 1.06, barrel: 1.04, width: 0.08, yaw: 0.16, pitch: -0.12 },
      tesla: { accent: 0xc2f3ff, shell: 0x1f2c34, scale: 1.02, barrel: 0.86, width: 0.11, yaw: 0.22, pitch: -0.15 },
      rocket: { accent: 0xffab63, shell: 0x352820, scale: 1.16, barrel: 0.94, width: 0.18, yaw: 0.22, pitch: -0.18 },
      gravity: { accent: 0xc7acff, shell: 0x27223b, scale: 1.1, barrel: 0.88, width: 0.14, yaw: 0.2, pitch: -0.16 },
      clone: { accent: 0x7cffc6, shell: 0x17352e, scale: 0.96, barrel: 0.62, width: 0.12, yaw: 0.2, pitch: -0.14 }
    }[id] || { accent: 0x8cecff, shell: 0x202c39, scale: 1, barrel: 0.78, width: 0.1, yaw: 0.18, pitch: -0.14 };

    world.weaponRig.scale.setScalar(preset.scale);
    world.weaponRig.rotation.set(preset.pitch, preset.yaw, -0.08);
    world.weaponRig.userData.basePosition = new THREE.Vector3(0.58, -0.5, -0.95);
    world.weaponRig.userData.baseRotation = new THREE.Euler(preset.pitch, preset.yaw, -0.08);
    world.weaponBody.material.color.setHex(preset.shell);
    world.weaponBody.material.emissive.setHex(preset.shell);
    world.weaponBody.material.emissiveIntensity = 0.18;
    world.weaponBarrel.scale.set(preset.width / 0.1, 1, preset.barrel / 0.78);
    world.weaponBarrel.material.color.setHex(0xd5e3f4);
    world.weaponCore.material.color.setHex(preset.accent);
    world.weaponCore.material.emissive.setHex(preset.accent);
    world.weaponRing.material.color.setHex(preset.accent);
  }

  const headLamp = new THREE.SpotLight(0xbbefff, 6.5, 96, Math.PI / 5.2, 0.38, 1.15);
  headLamp.castShadow = false;
  headLamp.position.set(0, 0, 0);
  const headLampTarget = new THREE.Object3D();
  headLampTarget.position.set(0, -0.35, -12);
  camera.add(headLamp);
  camera.add(headLampTarget);
  headLamp.target = headLampTarget;
  buildViewWeapon();

  buildArena();

  const arenaFlavorLines = [
    "Lave vive, drones hostiles et lumiere volcanique.",
    "Ponts de basalte, failles rouges et ombres chaudes.",
    "Le coeur de la forge pulse sous vos pieds."
  ];

  const FPS_STORAGE_KEY = "arena_fun_fps3d_progress_v1";
  const fpsWeapons = {
    pulse: {
      label: "PULSE",
      unlockWave: 1,
      fireRate: 0.082,
      pellets: 1,
      spread: 0.005,
      damageMin: 24,
      damageMax: 31,
      recoil: 0.95,
      beamColor: 0x85f8ff,
      impactColor: 0x77ecff,
      muzzleColor: 0x85f8ff,
      critChance: 0.16,
      auto: true
    },
    scatter: {
      label: "SCATTER",
      unlockWave: 1,
      fireRate: 0.46,
      pellets: 7,
      spread: 0.11,
      damageMin: 9,
      damageMax: 13,
      recoil: 1.7,
      beamColor: 0xffd97c,
      impactColor: 0xffc468,
      muzzleColor: 0xffca6f,
      critChance: 0.1,
      auto: false
    },
    rail: {
      label: "RAIL",
      unlockWave: 3,
      fireRate: 1.04,
      pellets: 1,
      spread: 0.0005,
      damageMin: 62,
      damageMax: 88,
      recoil: 2.3,
      beamColor: 0xff9af4,
      impactColor: 0xffd0ff,
      muzzleColor: 0xf5b5ff,
      critChance: 0.28,
      pierce: 3,
      zoomFov: 66,
      auto: false
    },
    tesla: {
      label: "TESLA",
      unlockWave: 4,
      fireRate: 0.18,
      pellets: 1,
      spread: 0.012,
      damageMin: 19,
      damageMax: 26,
      recoil: 1.1,
      beamColor: 0xb8f0ff,
      impactColor: 0x9fe8ff,
      muzzleColor: 0xc2f3ff,
      critChance: 0.12,
      chainCount: 3,
      chainRadius: 14,
      auto: true
    },
    rocket: {
      label: "RPG",
      unlockWave: 5,
      fireRate: 0.92,
      pellets: 1,
      spread: 0.01,
      damageMin: 42,
      damageMax: 58,
      recoil: 2.1,
      beamColor: 0xffba73,
      impactColor: 0xff9345,
      muzzleColor: 0xffac5b,
      critChance: 0.08,
      projectileKind: "rocket",
      projectileSpeed: 44,
      blastRadius: 10,
      auto: false
    },
    gravity: {
      label: "GRAVITE",
      unlockWave: 7,
      fireRate: 0.98,
      pellets: 1,
      spread: 0.01,
      damageMin: 30,
      damageMax: 42,
      recoil: 1.8,
      beamColor: 0xd0b5ff,
      impactColor: 0xbba1ff,
      muzzleColor: 0xc7acff,
      critChance: 0.12,
      projectileKind: "gravity",
      projectileSpeed: 36,
      blastRadius: 12,
      auto: false
    },
    clone: {
      label: "CLONE",
      unlockWave: 8,
      fireRate: 2.6,
      pellets: 1,
      spread: 0.001,
      damageMin: 0,
      damageMax: 0,
      recoil: 0.2,
      beamColor: 0x7cffc6,
      impactColor: 0x7cffc6,
      muzzleColor: 0x7cffc6,
      critChance: 0,
      summonClone: true,
      auto: false
    }
  };
  const fpsWeaponOrder = Object.keys(fpsWeapons);
  const fpsBuffs = {
    none: { label: "AUCUN" },
    fury: { label: "DMG x2", duration: 8 },
    haste: { label: "VITESSE", duration: 7 },
    chrono: { label: "CHRONO", duration: 5.5 },
    shield: { label: "BOUCLIER", duration: 8.5 },
    regen: { label: "REGEN", duration: 7 },
    overclock: { label: "SURCHARGE", duration: 6 }
  };
  const fpsEvents = {
    standard: { label: "STANDARD" },
    arsenal: { label: "ARSENAL" },
    emberstorm: { label: "BRASIERS" },
    blackout: { label: "OMBRE" },
    overdrive: { label: "SURGE" }
  };

  function loadFpsProgress() {
    try {
      const raw = localStorage.getItem(FPS_STORAGE_KEY);
      if (!raw) {
        return { bestWave: 1, unlockedWeapons: ["pulse", "scatter"] };
      }
      const parsed = JSON.parse(raw);
      const unlockedWeapons = Array.isArray(parsed?.unlockedWeapons)
        ? [...new Set(["pulse", "scatter", ...parsed.unlockedWeapons.filter((id) => fpsWeapons[id])])]
        : ["pulse", "scatter"];
      return {
        bestWave: Math.max(1, Number(parsed?.bestWave) || 1),
        unlockedWeapons
      };
    } catch {
      return { bestWave: 1, unlockedWeapons: ["pulse", "scatter"] };
    }
  }

  const fpsProgress = loadFpsProgress();

  function saveFpsProgress() {
    localStorage.setItem(FPS_STORAGE_KEY, JSON.stringify({
      bestWave: fpsProgress.bestWave,
      unlockedWeapons: [...new Set(fpsProgress.unlockedWeapons)]
    }));
  }

  function weaponIsUnlocked(id) {
    return fpsProgress.unlockedWeapons.includes(id);
  }

  function buffLabel(id) {
    return fpsBuffs[id]?.label || fpsBuffs.none.label;
  }

  function showMoment(title, text, tone = "Arene", duration = 2.4) {
    state.momentTimer = duration;
    setText(ui.momentTag, tone);
    setText(ui.momentTitle, title);
    setText(ui.momentText, text);
    ui.moment?.setAttribute("data-tone", String(tone).toLowerCase().replace(/\s+/g, "-"));
    ui.moment?.classList.remove("hidden");
    ui.moment?.setAttribute("aria-hidden", "false");
  }

  const enemyTypes = {
    scout: {
      name: "Drone eclaireur",
      color: 0x69ecff,
      emissive: 0x1ab7d4,
      hp: 42,
      radius: 1.05,
      altitude: 3.8,
      score: 45,
      contact: 10,
      fireRate: 1.15,
      projectileSpeed: 27,
      damage: 9,
      moveSpeed: 10.5,
      behavior: "scout"
    },
    orbiter: {
      name: "Drone orbitreur",
      color: 0xffcb68,
      emissive: 0xff8d2b,
      hp: 64,
      radius: 1.2,
      altitude: 4.6,
      score: 70,
      contact: 12,
      fireRate: 1.45,
      projectileSpeed: 22,
      damage: 11,
      moveSpeed: 9.2,
      behavior: "orbiter"
    },
    mortar: {
      name: "Drone mortier",
      color: 0xc88bff,
      emissive: 0x8038ff,
      hp: 82,
      radius: 1.35,
      altitude: 5.4,
      score: 90,
      contact: 14,
      fireRate: 2.3,
      projectileSpeed: 16,
      damage: 15,
      moveSpeed: 6.8,
      behavior: "mortar"
    },
    sniper: {
      name: "Drone sniper",
      color: 0xff89d7,
      emissive: 0xd742a8,
      hp: 56,
      radius: 1.08,
      altitude: 5.1,
      score: 88,
      contact: 10,
      fireRate: 1.85,
      projectileSpeed: 35,
      damage: 18,
      moveSpeed: 7.4,
      behavior: "sniper"
    },
    charger: {
      name: "Drone assaillant",
      color: 0xff6f6f,
      emissive: 0xff2f4f,
      hp: 94,
      radius: 1.4,
      altitude: 3.5,
      score: 110,
      contact: 18,
      fireRate: 1.8,
      projectileSpeed: 21,
      damage: 13,
      moveSpeed: 8.5,
      behavior: "charger"
    },
    evader: {
      name: "Drone evasif",
      color: 0x8af0b8,
      emissive: 0x2ccf7a,
      hp: 72,
      radius: 1.1,
      altitude: 4.1,
      score: 102,
      contact: 11,
      fireRate: 1.22,
      projectileSpeed: 26,
      damage: 10,
      moveSpeed: 10.4,
      behavior: "evader"
    },
    summoner: {
      name: "Drone invocateur",
      color: 0x9ab0ff,
      emissive: 0x5668ff,
      hp: 118,
      radius: 1.45,
      altitude: 5,
      score: 132,
      contact: 14,
      fireRate: 1.6,
      projectileSpeed: 20,
      damage: 12,
      moveSpeed: 6.6,
      behavior: "summoner"
    },
    boss: {
      name: "Boss braise",
      color: 0xffd38d,
      emissive: 0xff7b2f,
      hp: 760,
      radius: 2.5,
      altitude: 6.6,
      score: 600,
      contact: 24,
      fireRate: 1.2,
      projectileSpeed: 25,
      damage: 18,
      moveSpeed: 6.4,
      behavior: "boss"
    }
  };

  function createEnemy(typeId, x, z) {
    const type = enemyTypes[typeId];
    const group = new THREE.Group();
    group.position.set(x, type.altitude, z);

    const body = new THREE.Mesh(
      new THREE.SphereGeometry(type.radius, typeId === "boss" ? 20 : 14, typeId === "boss" ? 16 : 12),
      new THREE.MeshStandardMaterial({
        color: type.color,
        emissive: new THREE.Color(type.emissive),
        emissiveIntensity: typeId === "boss" ? 1.2 : 0.72,
        roughness: 0.28,
        metalness: 0.4
      })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(type.radius + (typeId === "boss" ? 1.25 : 0.62), 0.12, 10, 28),
      new THREE.MeshBasicMaterial({
        color: type.color,
        transparent: true,
        opacity: typeId === "boss" ? 0.8 : 0.58
      })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(typeId === "boss" ? 0.42 : 0.22, 12, 8),
      new THREE.MeshBasicMaterial({ color: 0xfdf6d0 })
    );
    eye.position.set(0, 0.18, type.radius * 0.68);
    group.add(eye);

    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c202a,
      roughness: 0.44,
      metalness: 0.65,
      emissive: new THREE.Color(type.emissive),
      emissiveIntensity: 0.16
    });

    const wingScale = typeId === "boss" ? 1.55 : 1;
    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(1.3 * wingScale, 0.26, 0.5), wingMaterial);
    leftWing.position.set(-(type.radius + 0.6), -0.08, 0);
    const rightWing = leftWing.clone();
    rightWing.position.x *= -1;
    group.add(leftWing, rightWing);

    if (typeId === "mortar" || typeId === "boss" || typeId === "sniper") {
      const rear = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16 * wingScale, 0.26 * wingScale, 1.1 * wingScale, 10),
        new THREE.MeshStandardMaterial({
          color: 0x392f48,
          emissive: new THREE.Color(type.emissive),
          emissiveIntensity: 0.46,
          roughness: 0.35
        })
      );
      rear.rotation.x = Math.PI / 2;
      rear.position.set(0, 0.14, -type.radius * 0.8);
      group.add(rear);
    }

    if (typeId === "evader") {
      const fins = new THREE.Mesh(
        new THREE.TorusGeometry(type.radius + 0.28, 0.08, 8, 24),
        new THREE.MeshBasicMaterial({
          color: 0xa7ffd1,
          transparent: true,
          opacity: 0.58
        })
      );
      fins.rotation.x = Math.PI / 2;
      fins.rotation.z = Math.PI / 4;
      group.add(fins);
    }

    if (typeId === "summoner") {
      for (let i = 0; i < 4; i += 1) {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 12, 12),
          new THREE.MeshStandardMaterial({
            color: 0x1c274f,
            emissive: new THREE.Color(0x7a96ff),
            emissiveIntensity: 1.1,
            roughness: 0.24
          })
        );
        const angle = (Math.PI * 2 * i) / 4;
        orb.position.set(Math.cos(angle) * 1.9, -0.12, Math.sin(angle) * 1.9);
        group.add(orb);
      }
    }

    if (typeId === "boss") {
      for (let i = 0; i < 3; i += 1) {
        const pod = new THREE.Mesh(
          new THREE.SphereGeometry(0.42, 12, 12),
          new THREE.MeshStandardMaterial({
            color: 0x2d2020,
            emissive: new THREE.Color(0xff9d4b),
            emissiveIntensity: 0.9,
            roughness: 0.22,
            metalness: 0.38
          })
        );
        const angle = (Math.PI * 2 * i) / 3;
        pod.position.set(Math.cos(angle) * 2.6, -0.2, Math.sin(angle) * 2.6);
        group.add(pod);
      }
    }

    const hitbox = new THREE.Mesh(
      new THREE.SphereGeometry(type.radius * 1.1, 10, 10),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    group.add(hitbox);

    scene.add(group);

    const scale = 1 + Math.max(0, state.wave - 1) * (typeId === "boss" ? 0.14 : 0.07);
    const enemy = {
      typeId,
      type,
      group,
      body,
      ring,
      hitbox,
      hp: type.hp * scale,
      maxHp: type.hp * scale,
      altitude: type.altitude,
      phase: rand(0, Math.PI * 2),
      fireCooldown: rand(0.2, type.fireRate),
      specialCooldown: rand(1.4, 2.8),
      dashTimer: 0,
      dashDir: new THREE.Vector3(),
      strafeDir: Math.random() > 0.5 ? 1 : -1,
      telegraph: null,
      dodgeCooldown: rand(0.4, 1.4),
      summonCooldown: rand(2.4, 4.1),
      laserTime: 0,
      laserDir: new THREE.Vector3()
    };
    hitbox.userData.enemy = enemy;
    return enemy;
  }

  function clearTransientWorld() {
    world.projectiles.forEach((projectile) => disposeObject3D(projectile.mesh));
    world.effects.forEach((effect) => {
      if (effect.mesh) disposeObject3D(effect.mesh);
      if (effect.light) effect.light.parent?.remove(effect.light);
    });
    world.enemies.forEach((enemy) => disposeObject3D(enemy.group));
    world.allies.forEach((allyUnit) => disposeObject3D(allyUnit.group));
    world.pickups.forEach((pickup) => disposeObject3D(pickup.mesh));
    world.strikes.forEach((strike) => strike.mesh && disposeObject3D(strike.mesh));
    world.projectiles.length = 0;
    world.effects.length = 0;
    world.enemies.length = 0;
    world.allies.length = 0;
    world.pickups.length = 0;
    world.strikes.length = 0;
  }

  function currentWeaponConfig() {
    return fpsWeapons[state.weaponId] || fpsWeapons.pulse;
  }

  function setWeapon(id, silent = false) {
    if (!fpsWeapons[id] || !weaponIsUnlocked(id)) return false;
    state.weaponId = id;
    applyViewWeaponStyle(id);
    if (!silent) {
      setHint(`Arme equipee: ${fpsWeapons[id].label}.`);
      tone(460, 700, 0.04, 0.08, "triangle", 2400);
    }
    return true;
  }

  function cycleWeapon(direction = 1) {
    const unlocked = fpsWeaponOrder.filter(weaponIsUnlocked);
    if (!unlocked.length) return;
    const currentIndex = Math.max(0, unlocked.indexOf(state.weaponId));
    const nextIndex = (currentIndex + direction + unlocked.length) % unlocked.length;
    setWeapon(unlocked[nextIndex]);
  }

  function unlockWeaponsForWave(wave) {
    let unlockedAny = false;
    for (const [weaponId, config] of Object.entries(fpsWeapons)) {
      if (wave >= config.unlockWave && !weaponIsUnlocked(weaponId)) {
        fpsProgress.unlockedWeapons.push(weaponId);
        unlockedAny = true;
        setHint(`Nouvelle arme debloquee: ${config.label}.`);
        showMoment("Nouvelle arme", `${config.label} rejoint votre arsenal 3D.`, "Arsenal", 2.6);
        tone(280, 620, 0.05, 0.14, "triangle", 2200);
      }
    }
    if (unlockedAny) {
      saveFpsProgress();
    }
  }

  function boostPlayer(kind) {
    const boost = fpsBuffs[kind];
    if (!boost) return;
    state.boostType = kind;
    state.boostTimer = boost.duration || 0;
    setHint(`Boost actif: ${boost.label}.`);
    showMoment(boost.label, "La forge vous donne un avantage temporaire. Profitez-en pour casser le rythme.", "Boost", 2.2);
    addRing(playerRig.position.clone(), 0x9ef2ff, 1.1, 5.4, 0.26);
    tone(240, 880, 0.06, 0.18, "triangle", 1800);
  }

  function makePickup(kind, position) {
    const palette = {
      fury: 0xff7d7d,
      haste: 0x73ebff,
      chrono: 0xd3beff,
      shield: 0x8ce6ff,
      regen: 0x7cff9c,
      overclock: 0xffd57d
    };
    const mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.MeshStandardMaterial({
        color: palette[kind] || 0xffffff,
        emissive: new THREE.Color(palette[kind] || 0xffffff),
        emissiveIntensity: 1.3,
        roughness: 0.18,
        metalness: 0.2
      })
    );
    mesh.position.copy(position);
    mesh.position.y = 1.4;
    scene.add(mesh);
    world.pickups.push({
      kind,
      mesh,
      life: 16,
      pulse: Math.random() * Math.PI * 2
    });
  }

  function threatForWave(wave) {
    if (wave >= 8) return "EXTREME";
    if (wave >= 5) return "HAUTE";
    if (wave >= 3) return "MOYENNE";
    return "BASSE";
  }

  function chooseWaveEvent(wave) {
    if (wave % 6 === 0) return "emberstorm";
    if (wave % 5 === 0) return "blackout";
    if (wave % 3 === 0) return "arsenal";
    if (wave % 2 === 0) return "overdrive";
    return "standard";
  }

  function findSpawnPoint(minDist = 42, maxDist = 74) {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(minDist, maxDist);
      const x = clamp(playerRig.position.x + Math.cos(angle) * dist, -world.halfSize + 8, world.halfSize - 8);
      const z = clamp(playerRig.position.z + Math.sin(angle) * dist, -world.halfSize + 8, world.halfSize - 8);
      if (intersectsAnyCollider(x, z, 5.5)) continue;
      if (isOnHazard(x, z, 5)) continue;
      return { x, z };
    }
    return { x: rand(-50, 50), z: rand(-50, 50) };
  }

  function spawnWave(wave) {
    state.pendingWave = false;
    state.intermissionTimer = 0;
    state.wave = wave;
    state.threat = threatForWave(wave);
    state.eventType = chooseWaveEvent(wave);
    state.eventTimer = state.eventType === "emberstorm" ? 2.8 : state.eventType === "arsenal" ? 999 : 0;
    fpsProgress.bestWave = Math.max(fpsProgress.bestWave, wave);
    state.bestWave = fpsProgress.bestWave;
    saveFpsProgress();
    unlockWeaponsForWave(wave);
    setText(ui.wave, wave);
    setText(ui.threat, state.threat);
    setText(ui.event, fpsEvents[state.eventType]?.label || fpsEvents.standard.label);

    if (wave % 5 === 0) {
      const bossPos = findSpawnPoint(54, 62);
      world.enemies.push(createEnemy("boss", bossPos.x, bossPos.z));
      const extras = Math.min(5, 1 + Math.floor(wave / 4));
      for (let i = 0; i < extras; i += 1) {
        const typeId = pick(["scout", "orbiter", "mortar", "charger", "sniper", "evader"]);
        const spawn = findSpawnPoint(38, 76);
        world.enemies.push(createEnemy(typeId, spawn.x, spawn.z));
      }
      setText(ui.objective, "Boss detecte");
      setText(ui.objectiveText, "Brisez le boss braise, gerez ses patterns et profitez des boosts pour tenir la pression.");
      setText(ui.bossState, "Boss braise en approche");
      setHint("Vague boss. Restez mobile et surveillez les anneaux au sol.");
      showMoment("Boss braise", "Une cible d'elite entre dans l'arene. Restez mobile et surveillez les telegraphes.", "Boss", 3.2);
    } else {
      const count = Math.min(13, 3 + wave + (state.eventType === "blackout" ? 1 : 0));
      const pool = wave < 2
        ? ["scout"]
        : wave < 4
          ? ["scout", "orbiter", "sniper"]
          : wave < 6
            ? ["scout", "orbiter", "mortar", "evader"]
            : ["scout", "orbiter", "mortar", "charger", "sniper", "evader", "summoner"];
      for (let i = 0; i < count; i += 1) {
        const spawn = findSpawnPoint(36, 78);
        world.enemies.push(createEnemy(pick(pool), spawn.x, spawn.z));
      }
      if (state.eventType === "arsenal") {
        setText(ui.objective, "Arsenal ouvert");
        setText(ui.objectiveText, "Une arme ou un boost tombe sur la forge. Nettoyez les drones pour tenir la ligne.");
      } else if (state.eventType === "emberstorm") {
        setText(ui.objective, "Tempete de braise");
        setText(ui.objectiveText, "Des impacts tombent sur l'arene. Restez en mouvement et exploitez le chaos.");
      } else if (state.eventType === "blackout") {
        setText(ui.objective, "Forge assombrie");
        setText(ui.objectiveText, "Le fog monte et les snipers prennent confiance. Gardez vos nerfs.");
      } else if (state.eventType === "overdrive") {
        setText(ui.objective, "Surge ouverte");
        setText(ui.objectiveText, "La forge vous booste. Profitez-en pour accelerer le rythme.");
      } else {
        setText(ui.objective, "Tenez la vague");
        setText(ui.objectiveText, "Nettoyez l'arene drone par drone, utilisez le dash et ne traversez pas la lave.");
      }
      setText(ui.bossState, "Aucun");
      setHint("Nouvelle vague lancee.");
      const eventLabel = fpsEvents[state.eventType]?.label || fpsEvents.standard.label;
      const eventText = state.eventType === "arsenal"
        ? "Une arme ou un boost peut tomber sur la forge."
        : state.eventType === "emberstorm"
          ? "Les impacts de braise vont forcer vos mouvements."
          : state.eventType === "blackout"
            ? "Le brouillard monte et les drones profitent de la penombre."
            : state.eventType === "overdrive"
              ? "La forge accelere votre rythme pour quelques secondes."
              : "La pression monte, tenez la ligne et faites grimper le score.";
      showMoment(`Vague ${wave}`, eventText, eventLabel, 2.4);
    }

    if (state.eventType === "arsenal") {
      const unlocked = fpsWeaponOrder.filter((id) => weaponIsUnlocked(id));
      const pickupKind = pick(["fury", "shield", "regen", "overclock"]);
      const pickupPos = new THREE.Vector3(rand(-26, 26), 0, rand(-26, 26));
      if (!intersectsAnyCollider(pickupPos.x, pickupPos.z, 4) && !isOnHazard(pickupPos.x, pickupPos.z, 4)) {
        makePickup(pickupKind, pickupPos);
      }
      if (unlocked.length) {
        setWeapon(unlocked[unlocked.length - 1], true);
      }
    } else if (state.eventType === "overdrive") {
      boostPlayer("haste");
    } else if (state.eventType === "blackout") {
      scene.fog.density = 0.0115;
      renderer.toneMappingExposure = 1.18;
    } else {
      scene.fog.density = 0.0085;
      renderer.toneMappingExposure = 1.08;
    }
  }

  function addBeam(start, end, color, life = 0.08) {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    world.effects.push({ kind: "beam", mesh: line, life, maxLife: life });
  }

  function addRing(position, color, startScale, endScale, life, y = 0.12) {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.72, 0.95, 48),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(position);
    mesh.position.y = y;
    mesh.scale.setScalar(startScale);
    scene.add(mesh);
    world.effects.push({ kind: "ring", mesh, life, maxLife: life, startScale, endScale });
    return mesh;
  }

  function addImpact(position, color, size = 0.55) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(size, 10, 10),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 })
    );
    mesh.position.copy(position);
    scene.add(mesh);
    world.effects.push({
      kind: "pulse",
      mesh,
      life: 0.22,
      maxLife: 0.22,
      startScale: 0.45,
      endScale: 1.9
    });

    const light = new THREE.PointLight(color, 2.8, 8, 2);
    light.position.copy(position);
    scene.add(light);
    world.effects.push({
      kind: "light",
      light,
      life: 0.12,
      maxLife: 0.12
    });
    addSparkBurst(position, color, Math.max(6, Math.round(size * 10)), 4 + size * 3, 0.22);
  }

  function addSparkBurst(position, color, count = 8, power = 5.2, life = 0.2) {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      const theta = rand(0, Math.PI * 2);
      const up = rand(0.45, 1.4);
      const speed = rand(power * 0.55, power);
      velocities.push(new THREE.Vector3(Math.cos(theta) * speed, up * speed, Math.sin(theta) * speed));
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color,
      size: 0.28,
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, material);
    points.position.copy(position);
    scene.add(points);
    world.effects.push({
      kind: "sparks",
      mesh: points,
      life,
      maxLife: life,
      velocities
    });
  }

  function addDangerZone(position, radius, color, life) {
    const mesh = addRing(position, color, 0.8, radius, life, 0.08);
    mesh.material.opacity = 0.48;
    return mesh;
  }

  function registerCombo(amount) {
    state.combo = clamp(state.combo + amount, 0, 100);
    state.comboTimer = 3;
  }

  function currentDamageMultiplier() {
    let multiplier = 1 + state.combo * 0.005;
    if (state.boostType === "fury") multiplier *= 2;
    if (state.boostType === "overclock") multiplier *= 1.28;
    return multiplier;
  }

  function enemyWorldPoint(enemy) {
    return enemy.group.position.clone().setY(enemy.group.position.y + enemy.type.radius * 0.08);
  }

  function spawnPlayerProjectile(kind, origin, direction, weapon) {
    const color = kind === "gravity" ? 0xc7acff : 0xffa35b;
    const radius = kind === "gravity" ? 0.56 : 0.44;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 16, 16),
      new THREE.MeshStandardMaterial({
        color,
        emissive: new THREE.Color(color),
        emissiveIntensity: 1.25,
        roughness: 0.18,
        metalness: 0.22
      })
    );
    mesh.position.copy(origin);
    scene.add(mesh);
    world.projectiles.push({
      mesh,
      velocity: direction.clone().normalize().multiplyScalar(weapon.projectileSpeed),
      damage: rand(weapon.damageMin, weapon.damageMax) * currentDamageMultiplier(),
      ttl: kind === "gravity" ? 2.8 : 3.2,
      radius,
      owner: "player",
      type: kind,
      blastRadius: weapon.blastRadius || 8,
      pullStrength: kind === "gravity" ? 26 : 0
    });
  }

  function spawnClone() {
    if (player.summonCooldown > 0 || world.allies.length >= 2) {
      setHint("Clone en recharge.");
      return false;
    }

    const group = new THREE.Group();
    group.position.copy(playerRig.position);
    group.position.y = 2.6;
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 14, 14),
      new THREE.MeshStandardMaterial({
        color: 0x7cffc6,
        emissive: new THREE.Color(0x4df0c0),
        emissiveIntensity: 1.2,
        roughness: 0.22,
        metalness: 0.34,
        transparent: true,
        opacity: 0.88
      })
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.08, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0x9bffe1, transparent: true, opacity: 0.6 })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(body, ring);
    scene.add(group);
    world.allies.push({
      group,
      body,
      ring,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitRadius: 5.2 + Math.random() * 1.6,
      life: 14,
      fireCooldown: 0.18
    });
    player.summonCooldown = 12;
    addRing(playerRig.position.clone(), 0x7cffc6, 0.8, 5.2, 0.24);
    setHint("Clone tactique deploye.");
    tone(220, 720, 0.05, 0.18, "triangle", 2000);
    return true;
  }

  function spawnStrike(position, radius, life, color, damage) {
    world.strikes.push({
      position: position.clone(),
      radius,
      timer: life,
      maxTimer: life,
      color,
      damage,
      mesh: addDangerZone(position.clone(), 0.9, color, life)
    });
  }

  function spawnEnemyProjectile(origin, direction, speed, damage, color, radius, ttl, owner, type = "bolt") {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 10, 10),
      new THREE.MeshStandardMaterial({
        color,
        emissive: new THREE.Color(color),
        emissiveIntensity: 1.2,
        roughness: 0.24,
        metalness: 0.14
      })
    );
    mesh.position.copy(origin);
    mesh.castShadow = true;
    scene.add(mesh);
    world.projectiles.push({
      mesh,
      velocity: direction.clone().normalize().multiplyScalar(speed),
      damage,
      ttl,
      radius,
      owner,
      type
    });
  }

  function applyDamageToPlayer(amount, sourceLabel) {
    if (state.gameOver) return;
    if (state.boostType === "shield") {
      amount *= 0.28;
    }
    state.hp = clamp(state.hp - amount, 0, state.maxHp);
    state.hurt = 1;
    state.damageOverlay = Math.max(state.damageOverlay, 1);
    state.shake = Math.max(state.shake, 0.9);
    player.damageKick = Math.min(player.damageKick + 1.25, 3);
    setHint(`Impact ${sourceLabel}.`);
    tone(210, 90, 0.05, 0.18, "square", 950);
    if (state.hp <= 0) {
      handleGameOver();
    }
  }

  function removeEnemy(enemy) {
    const index = world.enemies.indexOf(enemy);
    if (index >= 0) world.enemies.splice(index, 1);
    disposeObject3D(enemy.group);
    if (enemy.telegraph?.mesh) disposeObject3D(enemy.telegraph.mesh);
  }

  function killEnemy(enemy, crit) {
    state.score += enemy.type.score;
    state.kills += 1;
    state.hit = 1;
    registerCombo(enemy.typeId === "boss" ? 34 : crit ? 20 : 12);
    if (crit) playCritSound(); else playHitSound();
    addImpact(enemy.group.position, crit ? 0xffe67b : enemy.type.color, enemy.typeId === "boss" ? 1.6 : 0.78);
    addRing(enemy.group.position, crit ? 0xffe67b : enemy.type.color, 0.7, enemy.typeId === "boss" ? 9 : 3.8, enemy.typeId === "boss" ? 0.5 : 0.18);
    if (Math.random() < (enemy.typeId === "boss" ? 1 : 0.14)) {
      makePickup(pick(["fury", "haste", "chrono", "shield", "regen", "overclock"]), enemy.group.position.clone());
    }
    if (enemy.typeId === "boss") {
      playExplosionSound();
      setHint("Boss braise neutralise.");
      setText(ui.bossState, "Boss abattu");
      showMoment("Boss abattu", "La forge respire. Prenez l'avance avant la prochaine pression.", "Victoire", 3);
    }
    removeEnemy(enemy);
  }

  function applyDamageToEnemy(enemy, amount, crit = false) {
    enemy.hp -= amount;
    enemy.body.material.emissiveIntensity = crit ? 1.8 : 1.35;
    enemy.ring.material.opacity = 1;
    enemy.dodgeCooldown = Math.max(0, enemy.dodgeCooldown - 0.18);
    state.hit = crit ? 1.2 : 0.8;
    state.critFlash = crit ? 0.36 : state.critFlash;
    if (enemy.hp <= 0) {
      killEnemy(enemy, crit);
    }
  }

  function rayHits() {
    const candidates = world.enemies.map((enemy) => enemy.hitbox);
    return raycaster.intersectObjects(candidates, false);
  }

  function explodeAt(position, radius, damage, color, gravityPull = 0) {
    addImpact(position, color, 1.15);
    addRing(position, color, 0.8, radius * 0.7, 0.34);
    playExplosionSound();
    for (const enemy of world.enemies.slice()) {
      const offset = new THREE.Vector2(enemy.group.position.x - position.x, enemy.group.position.z - position.z);
      const dist = offset.length();
      if (dist > radius) continue;
      const force = 1 - dist / Math.max(radius, 0.001);
      if (gravityPull > 0 && dist > 0.001) {
        enemy.group.position.x -= (offset.x / dist) * gravityPull * force * 0.06;
        enemy.group.position.z -= (offset.y / dist) * gravityPull * force * 0.06;
      }
      applyDamageToEnemy(enemy, damage * (0.48 + force * 0.72), force > 0.72);
    }
  }

  function teslaChainFrom(enemy, weapon, originPoint) {
    const chained = new Set([enemy]);
    let sourceEnemy = enemy;
    let sourcePoint = originPoint.clone();
    for (let jump = 0; jump < weapon.chainCount; jump += 1) {
      let best = null;
      let bestDist = weapon.chainRadius;
      for (const candidate of world.enemies) {
        if (candidate.hp <= 0 || chained.has(candidate)) continue;
        const dist = sourceEnemy.group.position.distanceTo(candidate.group.position);
        if (dist < bestDist) {
          best = candidate;
          bestDist = dist;
        }
      }
      if (!best) break;
      chained.add(best);
      const targetPoint = enemyWorldPoint(best);
      addBeam(sourcePoint, targetPoint, weapon.beamColor, 0.1);
      applyDamageToEnemy(best, rand(weapon.damageMin, weapon.damageMax) * currentDamageMultiplier() * (0.82 - jump * 0.12), jump === 0);
      sourceEnemy = best;
      sourcePoint = targetPoint.clone();
    }
  }

  function handleShoot() {
    if (!state.locked || state.gameOver) return;
    const weapon = currentWeaponConfig();
    if (player.shootCooldown > 0 && state.boostType !== "overclock") return;
    state.pendingShot = false;
    player.shootCooldown = state.boostType === "overclock" ? 0.03 : weapon.fireRate;
    state.shootFx = 1;
    state.muzzleTimer = 0.11;
    player.weaponKick = Math.min(player.weaponKick + weapon.recoil, 3.5);
    player.fovKick = Math.min(player.fovKick + weapon.recoil * 0.7, 4.2);
    state.shake = Math.max(state.shake, weapon.recoil * 0.4);
    playShootSound(weapon);

    const spread = 0.006 + clamp(player.velocity.length() / 24, 0, 0.018) + state.shootFx * 0.006;
    const origin = new THREE.Vector3();
    camera.getWorldPosition(origin);
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    const start = origin.clone().add(forward.clone().multiplyScalar(1.1));

    if (weapon.summonClone) {
      spawnClone();
      state.pitch = clamp(state.pitch - 0.005, -1.25, 1.25);
      return;
    }

    if (weapon.projectileKind) {
      const mouse = new THREE.Vector2(rand(-spread, spread), rand(-spread, spread));
      raycaster.setFromCamera(mouse, camera);
      spawnPlayerProjectile(weapon.projectileKind, start, raycaster.ray.direction.clone(), weapon);
      addRing(start.clone(), weapon.muzzleColor, 0.3, 1.3, 0.08, start.y);
      state.pitch = clamp(state.pitch - (weapon.projectileKind === "rocket" ? 0.025 : 0.016), -1.25, 1.25);
      return;
    }

    let strongestCrit = false;
    const pelletCount = weapon.pellets || 1;
    for (let pellet = 0; pellet < pelletCount; pellet += 1) {
      const mouse = new THREE.Vector2(rand(-spread, spread) * (weapon.spread * 120), rand(-spread, spread) * (weapon.spread * 90));
      raycaster.setFromCamera(mouse, camera);
      const direction = raycaster.ray.direction.clone();
      const hits = rayHits();
      let endPoint = origin.clone().add(direction.clone().multiplyScalar(140));
      let hitEnemy = null;
      if (hits.length > 0) {
        hitEnemy = hits[0].object.userData.enemy;
        endPoint = hits[0].point.clone();
      }

      addBeam(start, endPoint, hitEnemy ? weapon.beamColor : 0x85f8ff, weapon.label === "RAIL" ? 0.12 : 0.08);

      if (hitEnemy) {
        const crit = Math.random() < weapon.critChance + state.combo * 0.0015;
        const damage = rand(weapon.damageMin, weapon.damageMax) * currentDamageMultiplier();
        applyDamageToEnemy(hitEnemy, crit ? damage * 1.55 : damage, crit);
        addImpact(endPoint, crit ? 0xfff29c : weapon.impactColor, crit ? 0.78 : 0.45);
        strongestCrit = strongestCrit || crit;
        if (weapon.chainCount) {
          teslaChainFrom(hitEnemy, weapon, endPoint);
        }
        if (weapon.pierce && hits.length > 1) {
          const extraHits = hits.slice(1, weapon.pierce + 1);
          for (const extra of extraHits) {
            const extraEnemy = extra.object.userData.enemy;
            if (!extraEnemy || extraEnemy === hitEnemy) continue;
            applyDamageToEnemy(extraEnemy, damage * 0.72, false);
            addImpact(extra.point.clone(), weapon.impactColor, 0.4);
          }
        }
        registerCombo(crit ? 18 : 9);
      }
    }

    if (weapon.label === "SCATTER") {
      addRing(start.clone(), weapon.muzzleColor, 0.35, 1.8, 0.1, start.y);
    }
    state.pitch = clamp(state.pitch - rand(0.006, 0.012) * weapon.recoil, -1.25, 1.25);
    if (strongestCrit) {
      state.critFlash = 0.34;
    }
  }

  function difficultyScaleForWave(wave) {
    return 1 + Math.max(0, wave - 1) * 0.085;
  }

  function updateBoss(enemy, dt, toPlayer, distance, difficultyScale) {
    enemy.specialCooldown -= dt;
    enemy.fireCooldown -= dt;
    enemy.laserTime = Math.max(0, enemy.laserTime - dt);

    const side = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).multiplyScalar(Math.sin(enemy.phase) * 0.8);
    const desired = toPlayer.clone().multiplyScalar(distance > 28 ? 1 : distance < 18 ? -1 : 0).add(side);
    if (desired.lengthSq() > 0.001) {
      desired.normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale);
      enemy.group.position.add(desired.multiplyScalar(dt));
    }

    if (enemy.laserTime > 0) {
      const laserOrigin = enemyWorldPoint(enemy);
      const laserDir = enemy.laserDir.clone().normalize();
      const laserEnd = laserOrigin.clone().add(laserDir.clone().multiplyScalar(92));
      addBeam(laserOrigin, laserEnd, 0xffa0d8, 0.05);
      const playerOffset = new THREE.Vector2(playerRig.position.x - laserOrigin.x, playerRig.position.z - laserOrigin.z);
      const dir2 = new THREE.Vector2(laserDir.x, laserDir.z).normalize();
      const along = playerOffset.dot(dir2);
      const lateral = Math.abs(playerOffset.x * dir2.y - playerOffset.y * dir2.x);
      if (along > 0 && along < 92 && lateral < 2.4) {
        applyDamageToPlayer((18 + state.wave) * dt, "laser braise");
      }
    }

    if (enemy.telegraph) {
      enemy.telegraph.timer -= dt;
      if (enemy.telegraph.mesh) {
        const progress = 1 - enemy.telegraph.timer / enemy.telegraph.maxTimer;
        enemy.telegraph.mesh.scale.setScalar(0.8 + progress * enemy.telegraph.radius);
        enemy.telegraph.mesh.material.opacity = 0.55 + progress * 0.22;
      }

      if (enemy.telegraph.timer <= 0) {
        if (enemy.telegraph.kind === "nova") {
          const epicenter = enemy.telegraph.mesh.position.clone();
          const shockDistance = new THREE.Vector2(playerRig.position.x - epicenter.x, playerRig.position.z - epicenter.z).length();
          if (shockDistance < enemy.telegraph.radius * 1.15) {
            applyDamageToPlayer(24, "onde de braise");
          }
          addImpact(epicenter.clone().setY(0.4), 0xffa661, 1.4);
          addRing(epicenter, 0xff7b34, 0.9, enemy.telegraph.radius * 1.45, 0.45, 0.08);
          playExplosionSound();
        } else if (enemy.telegraph.kind === "laser") {
          enemy.laserTime = 1.45;
          enemy.laserDir.copy(new THREE.Vector3(
            playerRig.position.x - enemy.group.position.x,
            0,
            playerRig.position.z - enemy.group.position.z
          ).normalize());
          setText(ui.bossState, "Laser balaye");
          playEnemyShotSound();
        } else if (enemy.telegraph.kind === "meteor") {
          enemy.telegraph.points.forEach((point) => {
            spawnStrike(point.clone(), 7.5, 0.55, 0xffa55d, 26);
          });
          setText(ui.bossState, "Pluie de braise");
        }
        if (enemy.telegraph.mesh) disposeObject3D(enemy.telegraph.mesh);
        enemy.telegraph = null;
        enemy.specialCooldown = rand(2.6, 3.6);
        setText(ui.bossState, enemy.laserTime > 0 ? "Laser braise" : "Rechargement");
      }
      return;
    }

    if (enemy.specialCooldown <= 0) {
      const roll = Math.random();
      if (roll < 0.42) {
        enemy.telegraph = {
          kind: "nova",
          timer: 1.1,
          maxTimer: 1.1,
          radius: 10 + Math.min(8, state.wave),
          mesh: addDangerZone(enemy.group.position.clone(), 1, 0xff7d47, 1.1)
        };
        setText(ui.bossState, "Nova de braise");
        setHint("Anneau du boss detecte. Sortez de la zone.");
      } else if (roll < 0.72) {
        const laserPreview = addDangerZone(enemy.group.position.clone().add(toPlayer.clone().multiplyScalar(12)), 1.2, 0xff9df0, 0.9);
        laserPreview.rotation.z = Math.atan2(toPlayer.z, toPlayer.x);
        enemy.telegraph = {
          kind: "laser",
          timer: 0.9,
          maxTimer: 0.9,
          radius: 18,
          mesh: laserPreview
        };
        setText(ui.bossState, "Balayage laser");
        setHint("Le boss charge un laser. Decalez-vous vite.");
      } else {
        const points = Array.from({ length: 4 }, () => new THREE.Vector3(
          clamp(playerRig.position.x + rand(-16, 16), -world.halfSize + 8, world.halfSize - 8),
          0.1,
          clamp(playerRig.position.z + rand(-16, 16), -world.halfSize + 8, world.halfSize - 8)
        ));
        points.forEach((point) => addDangerZone(point.clone(), 0.8, 0xffa661, 1));
        enemy.telegraph = {
          kind: "meteor",
          timer: 1,
          maxTimer: 1,
          radius: 7.5,
          mesh: addDangerZone(enemy.group.position.clone(), 0.8, 0xffa661, 1),
          points
        };
        setText(ui.bossState, "Pluie de braise");
        setHint("Des impacts arrivent. Coupez votre trajectoire.");
      }
      return;
    }

    if (enemy.fireCooldown <= 0) {
      for (let i = 0; i < 6; i += 1) {
        const spreadAngle = -0.3 + i * 0.12;
        const dir = toPlayer.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), spreadAngle);
        spawnEnemyProjectile(enemy.group.position.clone(), dir, enemy.type.projectileSpeed + 3, enemy.type.damage, 0xffba66, 0.4, 4.5, enemy, "boss");
      }
      playEnemyShotSound();
      enemy.fireCooldown = enemy.type.fireRate * rand(0.9, 1.15);
      setText(ui.bossState, "Tir en eventail");
    }
  }

  function updateEnemy(enemy, dt) {
    const difficultyScale = difficultyScaleForWave(state.wave);
    const toPlayer = new THREE.Vector3(
      playerRig.position.x - enemy.group.position.x,
      0,
      playerRig.position.z - enemy.group.position.z
    );
    const distance = Math.max(0.001, toPlayer.length());
    toPlayer.normalize();

    enemy.phase += dt * (enemy.typeId === "boss" ? 1.8 : 2.8);
    enemy.group.position.y = enemy.altitude + Math.sin(enemy.phase) * (enemy.typeId === "boss" ? 0.52 : 0.34);
    enemy.group.lookAt(playerRig.position.x, enemy.group.position.y, playerRig.position.z);
    enemy.ring.rotation.z += dt * 0.7;

    enemy.fireCooldown -= dt;
    enemy.specialCooldown -= dt;
    enemy.dodgeCooldown = Math.max(0, enemy.dodgeCooldown - dt);
    enemy.summonCooldown = Math.max(0, enemy.summonCooldown - dt);
    if (enemy.dashTimer > 0) {
      enemy.group.position.add(enemy.dashDir.clone().multiplyScalar(dt));
      enemy.dashTimer -= dt;
    } else if (enemy.type.behavior === "scout") {
      const seek = distance > 20 ? 1 : distance < 14 ? -0.6 : 0;
      const lateral = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).multiplyScalar(enemy.strafeDir * 0.55);
      const move = toPlayer.clone().multiplyScalar(seek).add(lateral);
      if (move.lengthSq() > 0.0001) {
        move.normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale * dt);
        enemy.group.position.add(move);
      }
    } else if (enemy.type.behavior === "orbiter") {
      const orbit = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).multiplyScalar(enemy.strafeDir * 1.05);
      const radial = toPlayer.clone().multiplyScalar(distance > 24 ? 0.5 : distance < 18 ? -0.75 : 0);
      const move = orbit.add(radial);
      move.normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale * dt);
      enemy.group.position.add(move);
    } else if (enemy.type.behavior === "mortar") {
      const move = toPlayer.clone().multiplyScalar(distance > 32 ? 0.46 : distance < 22 ? -0.82 : 0);
      if (move.lengthSq() > 0.001) {
        move.normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale * dt);
        enemy.group.position.add(move);
      }
    } else if (enemy.type.behavior === "sniper") {
      const move = toPlayer.clone().multiplyScalar(distance > 46 ? 0.54 : distance < 32 ? -1.15 : 0);
      const strafe = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).multiplyScalar(enemy.strafeDir * 0.26);
      if (move.lengthSq() > 0.001 || strafe.lengthSq() > 0.001) {
        move.add(strafe).normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale * dt);
        enemy.group.position.add(move);
      }
    } else if (enemy.type.behavior === "charger") {
      if (enemy.specialCooldown <= 0 && distance > 10) {
        enemy.dashDir.copy(toPlayer).multiplyScalar(30 * difficultyScale);
        enemy.dashTimer = 0.28;
        enemy.specialCooldown = rand(2.3, 3.1);
        addRing(enemy.group.position, 0xff6f6f, 0.7, 3.4, 0.2);
      } else {
        const move = toPlayer.clone().multiplyScalar(distance > 16 ? 1 : distance < 8 ? -0.5 : 0);
        if (move.lengthSq() > 0.001) {
          move.normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale * dt);
          enemy.group.position.add(move);
        }
      }
    } else if (enemy.type.behavior === "evader") {
      if (enemy.dodgeCooldown <= 0 && distance < 28) {
        enemy.dashDir.set(-toPlayer.z, 0, toPlayer.x).normalize().multiplyScalar((Math.random() > 0.5 ? 1 : -1) * 28 * difficultyScale);
        enemy.dashTimer = 0.22;
        enemy.dodgeCooldown = rand(0.9, 1.5);
        addRing(enemy.group.position, 0x8affbe, 0.55, 2.8, 0.14);
      } else {
        const orbit = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).multiplyScalar(enemy.strafeDir * 1.6);
        const move = orbit.add(toPlayer.clone().multiplyScalar(distance > 20 ? 0.38 : -0.2));
        move.normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale * dt);
        enemy.group.position.add(move);
      }
    } else if (enemy.type.behavior === "summoner") {
      const move = toPlayer.clone().multiplyScalar(distance > 30 ? 0.44 : distance < 22 ? -0.9 : 0);
      if (move.lengthSq() > 0.001) {
        move.normalize().multiplyScalar(enemy.type.moveSpeed * difficultyScale * dt);
        enemy.group.position.add(move);
      }
      if (enemy.summonCooldown <= 0 && world.enemies.length < 18) {
        const spawn = findSpawnPoint(10, 18);
        world.enemies.push(createEnemy(Math.random() < 0.5 ? "scout" : "evader", spawn.x, spawn.z));
        enemy.summonCooldown = rand(4.6, 6.4);
        addRing(enemy.group.position, 0x9ab0ff, 0.7, 4.2, 0.22);
        setHint("Un invocateur appelle du renfort.");
      }
    } else if (enemy.type.behavior === "boss") {
      updateBoss(enemy, dt, toPlayer, distance, difficultyScale);
    }

    resolveCollisions(enemy.group.position, enemy.type.radius + 0.5);

    if (enemy.type.behavior !== "boss" && enemy.fireCooldown <= 0 && distance < 48) {
      const spread = enemy.typeId === "mortar" ? 0.18 : enemy.typeId === "orbiter" ? 0.09 : enemy.typeId === "sniper" ? 0.012 : 0.06;
      const projectileType = enemy.typeId === "mortar" ? "mortar" : enemy.typeId === "sniper" ? "sniper" : "bolt";
      const projectileRadius = enemy.typeId === "mortar" ? 0.42 : enemy.typeId === "sniper" ? 0.22 : 0.26;
      const damage = enemy.type.damage * difficultyScale;
      const direction = new THREE.Vector3(
        toPlayer.x + rand(-spread, spread),
        enemy.typeId === "mortar" ? rand(0.03, 0.11) : enemy.typeId === "sniper" ? 0 : rand(-0.02, 0.03),
        toPlayer.z + rand(-spread, spread)
      ).normalize();
      spawnEnemyProjectile(enemy.group.position.clone(), direction, enemy.type.projectileSpeed, damage, enemy.type.color, projectileRadius, enemy.typeId === "mortar" ? 6.2 : 4.4, enemy, projectileType);
      enemy.fireCooldown = enemy.type.fireRate * rand(0.86, 1.15);
      playEnemyShotSound();
    }

    if (distance < enemy.type.radius + player.radius + 0.75) {
      applyDamageToPlayer(enemy.type.contact * dt, enemy.type.name.toLowerCase());
    }

    enemy.body.material.emissiveIntensity += (0.72 - enemy.body.material.emissiveIntensity) * dt * 4;
    enemy.ring.material.opacity += (0.58 - enemy.ring.material.opacity) * dt * 6;
  }

  function updateProjectiles(dt) {
    const playerPos = playerRig.position;
    for (let i = world.projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = world.projectiles[i];
      projectile.ttl -= dt;
      if (projectile.type === "mortar") {
        projectile.velocity.y -= dt * 3.4;
      } else if (projectile.type === "gravity") {
        projectile.mesh.rotation.y += dt * 8;
        for (const enemy of world.enemies) {
          const dx = projectile.mesh.position.x - enemy.group.position.x;
          const dz = projectile.mesh.position.z - enemy.group.position.z;
          const dist = Math.hypot(dx, dz);
          if (dist > 0.001 && dist < projectile.blastRadius * 1.8) {
            enemy.group.position.x += (dx / dist) * dt * projectile.pullStrength * 0.08;
            enemy.group.position.z += (dz / dist) * dt * projectile.pullStrength * 0.08;
          }
        }
      }
      projectile.mesh.position.addScaledVector(projectile.velocity, dt);

      if (projectile.owner === "player") {
        let hitEnemy = null;
        for (const enemy of world.enemies) {
          const dx = projectile.mesh.position.x - enemy.group.position.x;
          const dz = projectile.mesh.position.z - enemy.group.position.z;
          const dy = projectile.mesh.position.y - enemy.group.position.y;
          if (dx * dx + dz * dz < (enemy.type.radius + projectile.radius + 0.35) ** 2 && Math.abs(dy) < enemy.type.radius + 1.4) {
            hitEnemy = enemy;
            break;
          }
        }
        if (hitEnemy) {
          if (projectile.type === "rocket") {
            explodeAt(projectile.mesh.position.clone(), projectile.blastRadius, projectile.damage, 0xff9d5f);
          } else if (projectile.type === "gravity") {
            explodeAt(projectile.mesh.position.clone(), projectile.blastRadius, projectile.damage, 0xb79cff, projectile.pullStrength);
          } else {
            applyDamageToEnemy(hitEnemy, projectile.damage, false);
          }
          disposeObject3D(projectile.mesh);
          world.projectiles.splice(i, 1);
          continue;
        }
      } else {
        const px = projectile.mesh.position.x - playerPos.x;
        const py = projectile.mesh.position.y - camera.position.y;
        const pz = projectile.mesh.position.z - playerPos.z;
        const playerHitRadius = player.radius + projectile.radius + 0.45;

        if (px * px + pz * pz < playerHitRadius * playerHitRadius && Math.abs(py) < 1.6) {
          applyDamageToPlayer(projectile.damage, projectile.type === "boss" ? "boss braise" : projectile.type === "sniper" ? "drone sniper" : "drone");
          addImpact(projectile.mesh.position, projectile.type === "mortar" ? 0xffa366 : projectile.type === "sniper" ? 0xffa1e4 : 0x7ae9ff, projectile.type === "mortar" ? 0.9 : 0.5);
          disposeObject3D(projectile.mesh);
          world.projectiles.splice(i, 1);
          continue;
        }
      }

      if (
        projectile.ttl <= 0 ||
        Math.abs(projectile.mesh.position.x) > world.halfSize + 8 ||
        Math.abs(projectile.mesh.position.z) > world.halfSize + 8 ||
        intersectsAnyCollider(projectile.mesh.position.x, projectile.mesh.position.z, projectile.radius)
      ) {
        if (projectile.owner === "player") {
          if (projectile.type === "rocket") {
            explodeAt(projectile.mesh.position.clone(), projectile.blastRadius, projectile.damage, 0xff9d5f);
          } else if (projectile.type === "gravity") {
            explodeAt(projectile.mesh.position.clone(), projectile.blastRadius, projectile.damage, 0xb79cff, projectile.pullStrength);
          }
        } else if (projectile.type === "mortar" || projectile.type === "boss") {
          addImpact(projectile.mesh.position, 0xffa55d, projectile.type === "boss" ? 1.2 : 0.76);
          addRing(projectile.mesh.position, 0xff8e54, 0.8, projectile.type === "boss" ? 6.4 : 3.2, 0.22);
        }
        disposeObject3D(projectile.mesh);
        world.projectiles.splice(i, 1);
      }
    }
  }

  function updatePickups(dt) {
    for (let i = world.pickups.length - 1; i >= 0; i -= 1) {
      const pickup = world.pickups[i];
      pickup.life -= dt;
      pickup.pulse += dt * 4;
      pickup.mesh.position.y = 1.35 + Math.sin(pickup.pulse) * 0.35;
      pickup.mesh.rotation.y += dt * 1.8;

      const dx = pickup.mesh.position.x - playerRig.position.x;
      const dz = pickup.mesh.position.z - playerRig.position.z;
      if (dx * dx + dz * dz < 6.4) {
        boostPlayer(pickup.kind);
        disposeObject3D(pickup.mesh);
        world.pickups.splice(i, 1);
        continue;
      }

      if (pickup.life <= 0) {
        disposeObject3D(pickup.mesh);
        world.pickups.splice(i, 1);
      }
    }
  }

  function updateAllies(dt) {
    for (let i = world.allies.length - 1; i >= 0; i -= 1) {
      const allyUnit = world.allies[i];
      allyUnit.life -= dt;
      allyUnit.orbitAngle += dt * 1.6;
      allyUnit.group.position.x = playerRig.position.x + Math.cos(allyUnit.orbitAngle) * allyUnit.orbitRadius;
      allyUnit.group.position.z = playerRig.position.z + Math.sin(allyUnit.orbitAngle) * allyUnit.orbitRadius;
      allyUnit.group.position.y = 2.6 + Math.sin(allyUnit.orbitAngle * 2.2) * 0.3;
      allyUnit.ring.rotation.z += dt * 0.8;

      const target = world.enemies.reduce((best, enemy) => {
        if (!best) return enemy;
        return allyUnit.group.position.distanceToSquared(enemy.group.position) < allyUnit.group.position.distanceToSquared(best.group.position) ? enemy : best;
      }, null);
      allyUnit.fireCooldown -= dt;
      if (target && allyUnit.fireCooldown <= 0) {
        allyUnit.fireCooldown = 0.26;
        const start = allyUnit.group.position.clone();
        const end = enemyWorldPoint(target);
        addBeam(start, end, 0x7cffc6, 0.08);
        applyDamageToEnemy(target, rand(12, 18), false);
      }

      if (allyUnit.life <= 0) {
        disposeObject3D(allyUnit.group);
        world.allies.splice(i, 1);
      }
    }
    player.summonCooldown = Math.max(0, player.summonCooldown - dt);
  }

  function updateWaveEvents(dt) {
    if (state.eventType === "emberstorm") {
      state.eventTimer -= dt;
      if (state.eventTimer <= 0) {
        const strikePos = new THREE.Vector3(rand(-58, 58), 0.1, rand(-58, 58));
        if (!intersectsAnyCollider(strikePos.x, strikePos.z, 6)) {
          spawnStrike(strikePos, 7.2, 0.8, 0xff8c52, 22);
        }
        state.eventTimer = 2.1;
      }
    }

    for (let i = world.strikes.length - 1; i >= 0; i -= 1) {
      const strike = world.strikes[i];
      strike.timer -= dt;
      const progress = 1 - strike.timer / strike.maxTimer;
      if (strike.mesh) {
        strike.mesh.scale.setScalar(0.7 + progress * strike.radius * 0.12);
        strike.mesh.material.opacity = 0.35 + progress * 0.35;
      }
      if (strike.timer <= 0) {
        addImpact(strike.position.clone().setY(0.3), strike.color, 1.1);
        explodeAt(strike.position.clone(), strike.radius, strike.damage, strike.color);
        const playerDist = new THREE.Vector2(playerRig.position.x - strike.position.x, playerRig.position.z - strike.position.z).length();
        if (playerDist < strike.radius) {
          applyDamageToPlayer(strike.damage * 0.9, "pluie de braise");
        }
        if (strike.mesh) disposeObject3D(strike.mesh);
        world.strikes.splice(i, 1);
      }
    }
  }

  function updateEffects(dt) {
    for (let i = world.effects.length - 1; i >= 0; i -= 1) {
      const effect = world.effects[i];
      effect.life -= dt;
      const alpha = clamp(effect.life / effect.maxLife, 0, 1);

      if (effect.kind === "beam" && effect.mesh) {
        effect.mesh.material.opacity = alpha;
      } else if (effect.kind === "ring" && effect.mesh) {
        const progress = 1 - alpha;
        const scale = effect.startScale + (effect.endScale - effect.startScale) * progress;
        effect.mesh.scale.setScalar(scale);
        effect.mesh.material.opacity = alpha * 0.88;
      } else if (effect.kind === "pulse" && effect.mesh) {
        const progress = 1 - alpha;
        const scale = effect.startScale + (effect.endScale - effect.startScale) * progress;
        effect.mesh.scale.setScalar(scale);
        effect.mesh.material.opacity = alpha * 0.7;
      } else if (effect.kind === "sparks" && effect.mesh) {
        const positions = effect.mesh.geometry.attributes.position.array;
        for (let j = 0; j < effect.velocities.length; j += 1) {
          const velocity = effect.velocities[j];
          velocity.y -= dt * 16;
          positions[j * 3] += velocity.x * dt;
          positions[j * 3 + 1] += velocity.y * dt;
          positions[j * 3 + 2] += velocity.z * dt;
        }
        effect.mesh.geometry.attributes.position.needsUpdate = true;
        effect.mesh.material.opacity = alpha;
      } else if (effect.kind === "light" && effect.light) {
        effect.light.intensity = alpha * 3;
      }

      if (effect.life <= 0) {
        if (effect.mesh) disposeObject3D(effect.mesh);
        if (effect.light) effect.light.parent?.remove(effect.light);
        world.effects.splice(i, 1);
      }
    }
  }

  function updateArenaFX(dt, elapsed) {
    basaltTexture.offset.x += dt * 0.005;
    basaltTexture.offset.y -= dt * 0.004;
    lavaTexture.offset.y -= dt * 0.14;
    lavaTexture.offset.x += dt * 0.08;

    for (const lavaLight of world.lavaLights) {
      lavaLight.phase += dt * 0.95;
      lavaLight.light.intensity = lavaLight.base + Math.sin(lavaLight.phase + elapsed * 3.8) * 1.1;
    }

    if (world.emberCloud) {
      const positions = world.emberCloud.geometry.attributes.position.array;
      const speeds = world.emberCloud.userData.speeds;
      for (let i = 0; i < speeds.length; i += 1) {
        positions[i * 3 + 1] += speeds[i] * dt * 4.5;
        positions[i * 3] += Math.sin(elapsed * 0.4 + i) * dt * 0.15;
        if (positions[i * 3 + 1] > 28) {
          positions[i * 3 + 1] = rand(0, 2);
          positions[i * 3] = rand(-110, 110);
          positions[i * 3 + 2] = rand(-110, 110);
        }
      }
      world.emberCloud.geometry.attributes.position.needsUpdate = true;
    }

    if (state.muzzleTimer > 0) {
      state.muzzleTimer -= dt;
      const origin = new THREE.Vector3();
      camera.getWorldPosition(origin);
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      world.muzzleLight.position.copy(origin.clone().add(forward.multiplyScalar(1.4)));
      world.muzzleLight.color.setHex(currentWeaponConfig().muzzleColor || 0x7ae9ff);
      world.muzzleLight.intensity = clamp(state.muzzleTimer * 30, 0, 2.8);
      if (world.muzzleFlash) {
        world.muzzleFlash.material.opacity = clamp(state.muzzleTimer * 9.5, 0, 0.92);
        world.muzzleFlash.scale.setScalar(1.2 + Math.random() * 1.4);
        world.muzzleFlash.material.color.setHex(currentWeaponConfig().muzzleColor || 0xffffff);
      }
    } else {
      world.muzzleLight.intensity = 0;
      if (world.muzzleFlash) {
        world.muzzleFlash.material.opacity = 0;
      }
    }

    arenaFlavorIndex += dt;
    if (arenaFlavorIndex > 7.5) {
      arenaFlavorIndex = 0;
      setText(ui.arenaFlavor, pick(arenaFlavorLines));
    }

    if (state.eventType === "blackout") {
      scene.background.lerp(new THREE.Color(0x07090f), 0.035);
    } else {
      scene.background.lerp(new THREE.Color(0x0b1118), 0.05);
    }
  }

  function updatePlayer(dt) {
    const input = new THREE.Vector3();
    if (state.moveForward) input.z -= 1;
    if (state.moveBackward) input.z += 1;
    if (state.moveLeft) input.x -= 1;
    if (state.moveRight) input.x += 1;
    if (input.lengthSq() > 0) input.normalize();

    const forward = new THREE.Vector3(Math.sin(state.yaw), 0, -Math.cos(state.yaw));
    const right = new THREE.Vector3(Math.cos(state.yaw), 0, Math.sin(state.yaw));
    const desired = new THREE.Vector3();
    desired.addScaledVector(forward, -input.z);
    desired.addScaledVector(right, input.x);

    const hasteBonus = state.boostType === "haste" ? 4.8 : 0;
    const chronoScale = state.boostType === "chrono" ? 0.45 : 1;
    const maxSpeed = player.baseSpeed + (state.sprint ? player.sprintBonus : 0) + hasteBonus;
    if (desired.lengthSq() > 0) {
      desired.normalize().multiplyScalar(maxSpeed);
      player.velocity.x += (desired.x - player.velocity.x) * Math.min(1, dt * 12);
      player.velocity.z += (desired.z - player.velocity.z) * Math.min(1, dt * 12);
    } else {
      player.velocity.x += (0 - player.velocity.x) * Math.min(1, dt * 9);
      player.velocity.z += (0 - player.velocity.z) * Math.min(1, dt * 9);
    }

    if (state.wantDash && player.dashCooldown <= 0) {
      const dashDir = desired.lengthSq() > 0.01 ? desired.clone().normalize() : forward.clone().normalize();
      player.velocity.addScaledVector(dashDir, player.dashBurst + (state.boostType === "haste" ? 8 : 0));
      player.dashCooldown = state.boostType === "overclock" ? 0.62 : 1.1;
      state.wantDash = false;
      state.dashOverlay = 1;
      playDashSound();
      addRing(playerRig.position.clone(), 0x73ebff, 0.5, 5.6, 0.2);
      state.shake = Math.max(state.shake, 1.4);
      player.fovKick = Math.min(player.fovKick + 2.6, 5);
      setHint("Dash execute.");
    }

    player.dashCooldown = Math.max(0, player.dashCooldown - dt);
    player.shootCooldown = Math.max(0, player.shootCooldown - dt);
    state.hurt = Math.max(0, state.hurt - dt * 1.8);
    state.hit = Math.max(0, state.hit - dt * 5.4);
    state.shootFx = Math.max(0, state.shootFx - dt * 5.4);
    state.comboTimer = Math.max(0, state.comboTimer - dt);
    if (state.comboTimer <= 0) {
      state.combo = Math.max(0, state.combo - dt * 18);
    }
    state.boostTimer = Math.max(0, state.boostTimer - dt);
    if (state.boostTimer <= 0 && state.boostType !== "none") {
      state.boostType = "none";
      setHint("Boost termine.");
    }
    state.critFlash = Math.max(0, state.critFlash - dt * 3.5);
    state.damageOverlay = Math.max(0, state.damageOverlay - dt * 2.4);
    state.dashOverlay = Math.max(0, state.dashOverlay - dt * 4.4);
    state.shake = Math.max(0, state.shake - dt * 3.2);
    player.weaponKick = Math.max(0, player.weaponKick - dt * 7.8);
    player.damageKick = Math.max(0, player.damageKick - dt * 3.2);
    player.fovKick = Math.max(0, player.fovKick - dt * 5.4);

    playerRig.position.x += player.velocity.x * dt;
    playerRig.position.z += player.velocity.z * dt;
    resolveCollisions(playerRig.position, player.radius);

    let hazardDamage = 0;
    for (const hazard of world.hazards) {
      if (pointInsideRect(playerRig.position.x, playerRig.position.z, hazard, player.radius * 0.8)) {
        hazardDamage += hazard.damage * chronoScale;
      }
    }
    if (hazardDamage > 0) {
      applyDamageToPlayer(hazardDamage * dt, "lave");
      setHint("La lave vous brule.");
    }

    if (state.boostType === "regen") {
      state.hp = clamp(state.hp + dt * 7.5, 0, state.maxHp);
    }

    if (state.fireHeld) handleShoot();

    const speedFactor = clamp(player.velocity.length() / (player.baseSpeed + player.sprintBonus + player.dashBurst * 0.5), 0, 1);
    player.bobPhase += dt * (6 + speedFactor * 12);
    const shakeYaw = (Math.random() - 0.5) * state.shake * 0.008;
    const shakePitch = (Math.random() - 0.5) * state.shake * 0.006;
    const weapon = currentWeaponConfig();
    const baseFov = weapon.zoomFov || 76;
    const targetFov = baseFov + player.fovKick;
    camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 7);
    camera.updateProjectionMatrix();
    camera.position.y = 1.82 + Math.sin(player.bobPhase) * 0.045 * speedFactor;
    camera.position.x = Math.sin(player.bobPhase * 0.5) * 0.035 * speedFactor;
    playerRig.rotation.y = state.yaw + shakeYaw;
    camera.rotation.z = Math.sin(player.bobPhase * 0.5) * 0.018 * speedFactor + player.damageKick * 0.012;
    camera.rotation.y = 0;
    camera.rotation.x = state.pitch - player.weaponKick * 0.02 + shakePitch;
    if (world.weaponRig) {
      const basePosition = world.weaponRig.userData.basePosition || new THREE.Vector3(0.58, -0.5, -0.95);
      const baseRotation = world.weaponRig.userData.baseRotation || new THREE.Euler(-0.14, 0.18, -0.08);
      const swayX = Math.sin(player.bobPhase * 0.5) * 0.03 * speedFactor;
      const swayY = Math.sin(player.bobPhase) * 0.025 * speedFactor;
      const recoilDrop = player.weaponKick * 0.085 + state.shootFx * 0.02;
      const dashLean = state.dashOverlay * 0.08;
      world.weaponRig.position.set(
        basePosition.x + swayX + dashLean * 0.25,
        basePosition.y - swayY - recoilDrop,
        basePosition.z + recoilDrop * 0.38 - dashLean
      );
      world.weaponRig.rotation.set(
        baseRotation.x + swayY * 0.4 + player.weaponKick * 0.06,
        baseRotation.y + recoilDrop * 0.05,
        baseRotation.z - swayX * 1.2 - player.damageKick * 0.03 - dashLean * 0.35
      );
      if (world.weaponCore) {
        world.weaponCore.material.emissiveIntensity = 1.1 + state.shootFx * 0.9 + state.hit * 0.25;
      }
      if (world.weaponRing) {
        world.weaponRing.material.opacity = 0.52 + state.shootFx * 0.38 + state.hit * 0.1;
        world.weaponRing.scale.setScalar(1 + state.shootFx * 0.24);
      }
    }
  }

  function updateWave(dt) {
    if (state.gameOver) return;
    if (world.enemies.length === 0) {
      if (!state.pendingWave) {
        state.pendingWave = true;
        state.intermissionTimer = 2.5;
        setHint("Vague nettoyee. Preparation de la suivante.");
      } else {
        state.intermissionTimer -= dt;
        if (state.intermissionTimer <= 0) {
          spawnWave(state.wave + 1);
        }
      }
    } else {
      state.pendingWave = false;
      state.intermissionTimer = 0;
    }
  }

  function updatePresentation(dt) {
    state.momentTimer = Math.max(0, state.momentTimer - dt);
    if (state.momentTimer > 0) {
      ui.moment?.classList.remove("hidden");
      ui.moment?.setAttribute("aria-hidden", "false");
    } else {
      ui.moment?.classList.add("hidden");
      ui.moment?.setAttribute("aria-hidden", "true");
    }
  }

  function updateHUD() {
    setText(ui.hp, Math.ceil(state.hp));
    setText(ui.score, Math.floor(state.score));
    setText(ui.targets, world.enemies.length);
    setText(ui.weapon, currentWeaponConfig().label);
    setText(ui.combo, state.combo >= 100 ? "SURGE" : `x${Math.max(0, Math.round(state.combo))}`);
    setText(ui.boost, state.boostType === "none" ? "AUCUN" : `${buffLabel(state.boostType)} ${Math.ceil(state.boostTimer)}s`);
    setText(ui.event, fpsEvents[state.eventType]?.label || fpsEvents.standard.label);
    setText(ui.wave, state.wave);
    setText(ui.threat, state.threat);
    setText(ui.fps, Math.round(state.fpsValue));
    setText(ui.zone, "Forge Omega");
    ui.crosshair?.classList.toggle("hit", state.hit > 0.02);
    ui.crosshair?.classList.toggle("lowhp", state.hp < state.maxHp * 0.28);
    ui.crosshair?.classList.toggle("crit", state.critFlash > 0.02);
    ui.crosshair?.style.setProperty("--spread", `${16 + player.velocity.length() * 0.22 + state.shootFx * 12}px`);
    ui.vignette?.style.setProperty("--hurt", (Math.max(state.hurt * 0.38, state.damageOverlay * 0.22)).toFixed(3));
    ui.vignette?.style.setProperty("--dash", (state.dashOverlay * 0.18).toFixed(3));

    if (!state.locked && !state.gameOver && state.sessionRequested) {
      setHint("Cliquez dans la scene pour reprendre la souris.");
    }

    const boss = world.enemies.find((enemy) => enemy.typeId === "boss");
    if (boss) {
      ui.bossBar?.classList.remove("hidden");
      ui.bossBar?.setAttribute("aria-hidden", "false");
      setText(ui.bossName, boss.type.name);
      setText(ui.bossHpText, `${Math.max(0, Math.round((boss.hp / boss.maxHp) * 100))}%`);
      if (ui.bossFill) {
        ui.bossFill.style.transform = `scaleX(${clamp(boss.hp / boss.maxHp, 0, 1)})`;
      }
    } else {
      ui.bossBar?.classList.add("hidden");
      ui.bossBar?.setAttribute("aria-hidden", "true");
      if (ui.bossFill) ui.bossFill.style.transform = "scaleX(1)";
      if (ui.bossState?.textContent !== "Aucun" && state.wave % 5 !== 0) {
        setText(ui.bossState, "Aucun");
      }
    }

  }

  function handleGameOver() {
    if (state.gameOver) return;
    state.gameOver = true;
    state.fireHeld = false;
    state.pendingShot = false;
    fpsProgress.bestWave = Math.max(fpsProgress.bestWave, state.wave);
    saveFpsProgress();
    playGameOverSound();
    document.exitPointerLock?.();
    setText(ui.gameOverTitle, "La forge vous a renverse");
    setText(ui.gameOverText, `Le boss, la lave ou les drones ont eu le dernier mot. Arme: ${currentWeaponConfig().label}. Respirez puis repartez.`);
    setText(ui.summaryWave, state.wave);
    setText(ui.summaryKills, state.kills);
    setText(ui.summaryScore, Math.floor(state.score));
    ui.gameOver?.classList.remove("hidden");
    setHint("Partie terminee.");
    showMoment("Forge perdue", "Respirez, reajustez votre build puis repartez dans la chaleur.", "Alerte", 2.8);
  }

  function requestPointerAndFullscreen() {
    ui.canvas?.focus();
    ui.canvas?.requestPointerLock?.();
    if (!document.fullscreenElement) {
      ui.app?.requestFullscreen?.().catch(() => {});
    }
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
      return;
    }
    ui.app?.requestFullscreen?.().catch(() => {});
  }

  function resetSession() {
    clearTransientWorld();
    state.hp = 100;
    state.maxHp = 100;
    state.score = 0;
    state.kills = 0;
    state.combo = 0;
    state.comboTimer = 0;
    state.wave = 1;
    state.threat = "BASSE";
    state.boostType = "none";
    state.boostTimer = 0;
    state.eventType = "standard";
    state.eventTimer = 0;
    state.gameOver = false;
    state.pendingWave = false;
    state.intermissionTimer = 0;
    state.pendingShot = false;
    state.hurt = 0;
    state.hit = 0;
    state.shootFx = 0;
    state.critFlash = 0;
    state.damageOverlay = 0;
    state.shake = 0;
    player.velocity.set(0, 0, 0);
    player.dashCooldown = 0;
    player.shootCooldown = 0;
    player.weaponKick = 0;
    player.damageKick = 0;
    player.fovKick = 0;
    player.summonCooldown = 0;
    playerRig.position.set(0, 0, 34);
    state.yaw = 0;
    state.pitch = -0.42;
    setWeapon(weaponIsUnlocked("pulse") ? state.weaponId : "pulse", true);
    camera.position.set(0, 1.82, 0);
    playerRig.rotation.y = state.yaw;
    camera.rotation.set(state.pitch, 0, 0);
    camera.fov = currentWeaponConfig().zoomFov || 76;
    camera.updateProjectionMatrix();
    scene.fog.density = 0.0062;
    renderer.toneMappingExposure = 1.16;
    ui.gameOver?.classList.add("hidden");
    spawnWave(1);
    updateHUD();
  }

  function startSession() {
    try {
      state.sessionRequested = true;
      ui.intro?.classList.add("hidden");
      ui.gameOver?.classList.add("hidden");
      startAmbient();
      primeAudio();
      if (state.gameOver || world.enemies.length === 0) {
        resetSession();
      }
      requestPointerAndFullscreen();
      showMoment("Forge Omega", "Pointez, dash et tenez la ligne. Le mode FPS est verrouille.", "Depart", 2.4);
      setHint("Souris activee. Nettoyez la forge.");
    } catch (error) {
      console.error("[fps3d] lancement impossible", error);
      state.sessionRequested = false;
      ui.intro?.classList.remove("hidden");
      setHint("Le mode 3D a rencontre une erreur au lancement.");
      setLoading("Erreur 3D au lancement. Ouvrez la console puis rechargez la page.", true);
    }
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  function keyStateFromEvent(event, active) {
    switch (event.code) {
      case "KeyW":
      case "KeyZ":
        state.moveForward = active;
        break;
      case "KeyS":
        state.moveBackward = active;
        break;
      case "KeyA":
      case "KeyQ":
        state.moveLeft = active;
        break;
      case "KeyD":
        state.moveRight = active;
        break;
      case "ShiftLeft":
      case "ShiftRight":
        state.sprint = active;
        break;
      case "Space":
        if (active) state.wantDash = true;
        break;
      case "KeyF":
        if (active) toggleFullscreen();
        break;
      case "KeyR":
        if (active) startSession();
        break;
      case "Digit1":
        if (active) setWeapon("pulse");
        break;
      case "Digit2":
        if (active) setWeapon("scatter");
        break;
      case "Digit3":
        if (active) setWeapon("rail");
        break;
      case "Digit4":
        if (active) setWeapon("tesla");
        break;
      case "Digit5":
        if (active) setWeapon("rocket");
        break;
      case "Digit6":
        if (active) setWeapon("gravity");
        break;
      case "Digit7":
        if (active) setWeapon("clone");
        break;
      default:
        break;
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Tab") {
      event.preventDefault();
    }
    keyStateFromEvent(event, true);
  });

  document.addEventListener("keyup", (event) => {
    keyStateFromEvent(event, false);
    if (event.code === "Space") state.wantDash = false;
  });

  document.addEventListener("mousemove", (event) => {
    if (!state.locked || state.gameOver) return;
    state.yaw -= event.movementX * state.mouseSensitivity;
    state.pitch -= event.movementY * state.mouseSensitivity;
    state.pitch = clamp(state.pitch, -1.18, 1.18);
  });

  document.addEventListener("pointerlockchange", () => {
    state.locked = document.pointerLockElement === ui.canvas;
    if (state.locked) {
      setHint("Forge verrouillee. Tirez sur les drones.");
      if (state.pendingShot && !state.gameOver) {
        handleShoot();
      }
    } else if (state.sessionRequested && !state.gameOver) {
      setHint("Cliquez dans la scene pour reprendre.");
    }
  });

  document.addEventListener("pointerlockerror", () => {
    setHint("La souris n'a pas pu etre verrouillee. Recliquez dans la scene.");
  });

  function handlePrimaryFirePress(event) {
    if (event.type === "mousedown" && "PointerEvent" in window) return false;
    if (event.button !== 0) return;
    event.preventDefault?.();
    ensureAudio();
    primeAudio();
    if (!state.sessionRequested) {
      state.pendingShot = true;
      startSession();
      return false;
    }
    if (!state.locked) {
      state.pendingShot = true;
      requestPointerAndFullscreen();
      return false;
    }
    state.fireHeld = true;
    handleShoot();
    return true;
  }

  ui.canvas?.addEventListener("pointerdown", handlePrimaryFirePress);
  ui.canvas?.addEventListener("mousedown", handlePrimaryFirePress);

  document.addEventListener("mouseup", (event) => {
    if (event.button === 0) state.fireHeld = false;
  });

  ui.canvas?.addEventListener("wheel", (event) => {
    event.preventDefault();
    cycleWeapon(event.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  ui.canvas?.addEventListener("click", () => {
    if (!state.sessionRequested) {
      startSession();
    } else if (!state.locked && !state.gameOver) {
      requestPointerAndFullscreen();
    }
  });

  function handleEnterPress(event) {
    event?.preventDefault?.();
    const now = performance.now();
    if (now - lastEnterPress < 250) return;
    lastEnterPress = now;
    ensureAudio();
    startSession();
  }

  ui.enterButton?.addEventListener("click", handleEnterPress);
  ui.enterButton?.addEventListener("pointerdown", handleEnterPress);

  ui.restartButton?.addEventListener("click", () => {
    ensureAudio();
    startSession();
  });

  ui.fullscreenButton?.addEventListener("click", () => {
    ensureAudio();
    toggleFullscreen();
  });

  window.addEventListener("resize", resize);

  state.yaw = 0;
  state.pitch = -0.42;
  playerRig.rotation.y = state.yaw;
  camera.rotation.set(state.pitch, 0, 0);
  setWeapon(weaponIsUnlocked("pulse") ? state.weaponId : "pulse", true);
  setText(ui.zone, "Forge Omega");
  setText(ui.arenaFlavor, arenaFlavorLines[0]);
  setText(ui.objective, "Survivez a la forge");
  setText(ui.objectiveText, "Cliquez sur Jouer en 3D pour entrer, activer la souris, changer d'arme et lancer la premiere vague.");
  setText(ui.bossState, "Aucun");
  setText(ui.event, fpsEvents.standard.label);
  setText(ui.boost, "AUCUN");
  updateHUD();
  setLoading("Forge prete. Cliquez sur Jouer en 3D.", false);
  revealIntro();
  if (autoStart3d) {
    state.sessionRequested = true;
    ui.intro?.classList.add("hidden");
    resetSession();
    setHint("Mode test 3D actif.");
  }

  function animate() {
    requestAnimationFrame(animate);
    const rawDt = Math.min(clock.getDelta(), 0.033);
    const dt = rawDt * (state.boostType === "chrono" ? 0.66 : 1);
    const elapsed = clock.elapsedTime;
    state.fpsValue = 1 / Math.max(dt, 0.0001);

    pulseAmbient(dt);
    updateArenaFX(dt, elapsed);

    if (state.sessionRequested && !state.gameOver) {
      updatePlayer(dt);
      for (const enemy of world.enemies.slice()) {
        updateEnemy(enemy, dt);
      }
      updateProjectiles(dt);
      updateAllies(dt);
      updatePickups(dt);
      updateWaveEvents(dt);
      updateEffects(dt);
      updateWave(dt);
    } else {
      updateEffects(dt);
    }

    updatePresentation(dt);
    updateHUD();
    renderer.render(scene, camera);
    sampleDebugPixel(dt);
  }

  animate();
})();
