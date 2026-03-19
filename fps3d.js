(function () {
  const THREE = window.THREE;

  const app = document.getElementById("fpsApp");
  const canvas = document.getElementById("fps3dCanvas");
  const enterButton = document.getElementById("fpsEnterButton");
  const restartButton = document.getElementById("fpsRestartButton");
  const fullscreenButton = document.getElementById("fpsFullscreenButton");
  const intro = document.getElementById("fpsIntro");
  const gameOverPanel = document.getElementById("fpsGameOver");
  const gameOverText = document.getElementById("fpsGameOverText");
  const hpLabel = document.getElementById("fpsHp");
  const scoreLabel = document.getElementById("fpsScore");
  const targetsLabel = document.getElementById("fpsTargets");
  const fpsLabel = document.getElementById("fpsFrame");
  const hintLabel = document.getElementById("fpsHint");

  if (!THREE) {
    hintLabel.textContent = "Le moteur 3D n'a pas charge. Rechargez la page avec internet actif.";
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x090d12);
  scene.fog = new THREE.FogExp2(0x140805, 0.022);

  const camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 220);
  camera.rotation.order = "YXZ";

  const playerRig = new THREE.Group();
  playerRig.position.set(0, 0, 12);
  scene.add(playerRig);
  playerRig.add(camera);
  camera.position.set(0, 2.1, 0);

  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();

  const state = {
    hp: 100,
    score: 0,
    kills: 0,
    sprint: false,
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    canShoot: true,
    gameOver: false,
    locked: false,
    sessionRequested: false,
    yaw: 0,
    pitch: 0,
    fpsValue: 0,
    shake: 0
  };

  const colliders = [];
  const hazards = [];
  const enemies = [];
  const enemyProjectiles = [];
  let emberCloud = null;
  let audioContext = null;
  let startedAmbient = false;
  let muzzleFlash = 0;
  let lastEnterAttempt = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function ensureAudio() {
    if (!audioContext) {
      const AudioContextRef = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextRef) return null;
      audioContext = new AudioContextRef();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  }

  function playSynth(options = {}) {
    const context = ensureAudio();
    if (!context) return;
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = options.wave || "sawtooth";
    osc.frequency.setValueAtTime(options.from || 180, now);
    osc.frequency.exponentialRampToValueAtTime(options.to || 80, now + (options.duration || 0.16));
    filter.type = options.filterType || "lowpass";
    filter.frequency.setValueAtTime(options.filter || 1200, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(options.volume || 0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (options.duration || 0.16));

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    osc.start(now);
    osc.stop(now + (options.duration || 0.16));
  }

  function startAmbient() {
    if (startedAmbient) return;
    const context = ensureAudio();
    if (!context) return;
    startedAmbient = true;

    const ambientGain = context.createGain();
    ambientGain.gain.value = 0.022;
    ambientGain.connect(context.destination);

    const hum = context.createOscillator();
    hum.type = "triangle";
    hum.frequency.value = 48;
    hum.connect(ambientGain);
    hum.start();

    const air = context.createOscillator();
    air.type = "sine";
    air.frequency.value = 94;
    air.connect(ambientGain);
    air.start();

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.14;
    lfoGain.gain.value = 0.012;
    lfo.connect(lfoGain);
    lfoGain.connect(ambientGain.gain);
    lfo.start();
  }

  function buildCanvasTexture(drawFn) {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 1024;
    textureCanvas.height = 1024;
    const g = textureCanvas.getContext("2d");
    drawFn(g, textureCanvas.width, textureCanvas.height);
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 8;
    return texture;
  }

  const basaltTexture = buildCanvasTexture((g, width, height) => {
    const grad = g.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#302626");
    grad.addColorStop(1, "#0d0c10");
    g.fillStyle = grad;
    g.fillRect(0, 0, width, height);
    for (let i = 0; i < 340; i += 1) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const w = 12 + Math.random() * 64;
      const h = 5 + Math.random() * 26;
      g.fillStyle = `rgba(255,255,255,${0.012 + Math.random() * 0.03})`;
      g.fillRect(x, y, w, h);
    }
    g.strokeStyle = "rgba(255,132,82,0.08)";
    g.lineWidth = 3;
    for (let i = 0; i < 26; i += 1) {
      g.beginPath();
      g.moveTo(Math.random() * width, Math.random() * height);
      for (let j = 0; j < 5; j += 1) {
        g.lineTo(Math.random() * width, Math.random() * height);
      }
      g.stroke();
    }
  });
  basaltTexture.repeat.set(16, 16);

  const lavaTexture = buildCanvasTexture((g, width, height) => {
    const grad = g.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#3f0a03");
    grad.addColorStop(0.35, "#7e1708");
    grad.addColorStop(0.62, "#ff6427");
    grad.addColorStop(1, "#ffd27a");
    g.fillStyle = grad;
    g.fillRect(0, 0, width, height);
    g.globalAlpha = 0.7;
    for (let i = 0; i < 34; i += 1) {
      g.strokeStyle = i % 2 === 0 ? "rgba(255,240,180,0.7)" : "rgba(255,120,32,0.85)";
      g.lineWidth = 12 + Math.random() * 18;
      g.beginPath();
      g.moveTo(Math.random() * width, 0);
      for (let j = 0; j < 6; j += 1) {
        g.lineTo(Math.random() * width, (height / 5) * j + Math.random() * 80);
      }
      g.stroke();
    }
    g.globalAlpha = 1;
  });
  lavaTexture.repeat.set(8, 8);

  const rimTexture = buildCanvasTexture((g, width, height) => {
    g.fillStyle = "#191316";
    g.fillRect(0, 0, width, height);
    g.strokeStyle = "rgba(255,118,70,0.16)";
    g.lineWidth = 4;
    for (let i = 0; i < 24; i += 1) {
      g.beginPath();
      g.moveTo(0, Math.random() * height);
      for (let j = 0; j < 6; j += 1) {
        g.lineTo((width / 5) * j + Math.random() * 90, Math.random() * height);
      }
      g.stroke();
    }
  });
  rimTexture.repeat.set(8, 2);

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: basaltTexture,
    roughness: 0.96,
    metalness: 0.04
  });

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: rimTexture,
    roughness: 0.94,
    metalness: 0.05,
    color: new THREE.Color(0x2d2323)
  });

  const lavaMaterial = new THREE.MeshStandardMaterial({
    map: lavaTexture,
    emissiveMap: lavaTexture,
    emissive: new THREE.Color(0xff6f2c),
    emissiveIntensity: 1.8,
    roughness: 0.45,
    metalness: 0.02
  });

  const arenaGroup = new THREE.Group();
  scene.add(arenaGroup);

  const skyGlow = new THREE.Mesh(
    new THREE.SphereGeometry(120, 32, 18),
    new THREE.MeshBasicMaterial({
      color: 0xff5522,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.08
    })
  );
  scene.add(skyGlow);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  arenaGroup.add(floor);

  function addCollider(x, z, width, depth) {
    colliders.push({ x, z, width, depth });
  }

  function addHazardRect(x, z, width, depth, damage) {
    hazards.push({ x, z, width, depth, damage });
  }

  function makeBasaltWall(x, y, z, width, height, depth) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), wallMaterial);
    mesh.position.set(x, y, z);
    arenaGroup.add(mesh);
    addCollider(x, z, width, depth);
  }

  function makeLavaStrip(x, z, width, depth) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), lavaMaterial);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.03, z);
    arenaGroup.add(mesh);

    const glow = new THREE.PointLight(0xff7a34, 4.4, 26, 2);
    glow.position.set(x, 1.5, z);
    arenaGroup.add(glow);

    addHazardRect(x, z, width, depth, 14);
  }

  [
    [0, 3, -80, 160, 6],
    [0, 3, 80, 160, 6],
    [-80, 3, 0, 6, 160],
    [80, 3, 0, 6, 160]
  ].forEach(([x, y, z, w, d]) => makeBasaltWall(x, y, z, w, 6, d));

  [
    [-30, 2.4, -18, 18, 4.8, 26],
    [26, 2.4, -14, 22, 4.8, 18],
    [-4, 2.4, 26, 28, 4.8, 10],
    [38, 2.4, 26, 14, 4.8, 24],
    [-46, 2.4, 24, 12, 4.8, 22]
  ].forEach(([x, y, z, w, h, d]) => makeBasaltWall(x, y, z, w, h, d));

  [
    [0, -56, 92, 14],
    [-54, 10, 14, 64],
    [50, 24, 16, 50],
    [0, 46, 46, 12],
    [24, -18, 18, 18]
  ].forEach(([x, z, w, d]) => makeLavaStrip(x, z, w, d));

  function makeVolcano(x, z, scale) {
    const base = new THREE.Mesh(
      new THREE.ConeGeometry(8 * scale, 14 * scale, 8, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x231817,
        roughness: 0.95,
        metalness: 0.03
      })
    );
    base.position.set(x, 6 * scale, z);
    base.rotation.y = Math.random() * Math.PI;
    scene.add(base);

    const lavaCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7 * scale, 1.7 * scale, 5 * scale, 8),
      new THREE.MeshStandardMaterial({
        color: 0xffa35d,
        emissive: 0xff5d20,
        emissiveIntensity: 2
      })
    );
    lavaCore.position.set(x, 10.5 * scale, z);
    scene.add(lavaCore);

    const light = new THREE.PointLight(0xff6f2c, 4.5 * scale, 24 * scale, 2);
    light.position.set(x, 10 * scale, z);
    scene.add(light);
  }

  [
    [-60, -62, 1.4],
    [-18, -72, 1.1],
    [28, -68, 1.35],
    [62, -58, 1.2],
    [-70, 66, 1.25],
    [-26, 74, 1],
    [22, 70, 1.3],
    [68, 60, 1.18]
  ].forEach(([x, z, scale]) => makeVolcano(x, z, scale));

  scene.add(new THREE.AmbientLight(0xffd3a1, 0.55));
  const moonLight = new THREE.DirectionalLight(0xfff1de, 1.45);
  moonLight.position.set(18, 26, 10);
  scene.add(moonLight);

  const lavaUnderlight = new THREE.PointLight(0xff6a2e, 7.5, 100, 2);
  lavaUnderlight.position.set(0, 6, -20);
  scene.add(lavaUnderlight);

  function createEnemy(originAngle, radius, hue) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 1),
      new THREE.MeshStandardMaterial({
        color: 0x301f1a,
        emissive: hue,
        emissiveIntensity: 1.8,
        roughness: 0.55,
        metalness: 0.15
      })
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.1, 12, 36),
      new THREE.MeshBasicMaterial({
        color: 0xffd58a,
        transparent: true,
        opacity: 0.85
      })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(body);
    group.add(ring);
    group.position.set(Math.cos(originAngle) * radius, 2.1, Math.sin(originAngle) * radius);
    scene.add(group);

    enemies.push({
      group,
      body,
      orbitAngle: originAngle,
      orbitRadius: radius,
      speed: 0.28 + Math.random() * 0.18,
      hp: 100,
      cooldown: 1.6 + Math.random() * 2,
      respawn: 0
    });
  }

  [0, 1.1, 2.1, 3.2, 4.15, 5.2].forEach((angle, index) => {
    createEnemy(angle, 18 + (index % 3) * 8, index % 2 === 0 ? 0xff8042 : 0xffb05e);
  });

  function createEmbers() {
    const geometry = new THREE.BufferGeometry();
    const count = 420;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = Math.random() * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 180;
      speeds[i] = 0.35 + Math.random() * 0.45;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffa562,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });
    const points = new THREE.Points(geometry, material);
    points.userData.speeds = speeds;
    scene.add(points);
    return points;
  }

  emberCloud = createEmbers();

  function worldCollides(x, z, radius) {
    if (x < -75 || x > 75 || z < -75 || z > 75) return true;
    return colliders.some((collider) => {
      const dx = Math.abs(x - collider.x);
      const dz = Math.abs(z - collider.z);
      return dx < collider.width / 2 + radius && dz < collider.depth / 2 + radius;
    });
  }

  function hazardDamageAt(x, z) {
    for (const hazard of hazards) {
      const dx = Math.abs(x - hazard.x);
      const dz = Math.abs(z - hazard.z);
      if (dx < hazard.width / 2 && dz < hazard.depth / 2) {
        return hazard.damage;
      }
    }
    return 0;
  }

  function spawnProjectile(origin, direction, speed) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffbf7d })
    );
    mesh.position.copy(origin);
    scene.add(mesh);
    enemyProjectiles.push({
      mesh,
      velocity: direction.clone().multiplyScalar(speed),
      life: 3.4
    });
  }

  function setLocked(locked) {
    state.locked = locked;
    document.body.classList.toggle("locked", locked);
    intro.classList.toggle("hidden", locked || state.sessionRequested);
    if (!locked && !state.gameOver) {
      hintLabel.textContent = state.sessionRequested
        ? "Cliquez dans la scene pour activer ou reprendre la souris."
        : "Cliquez sur Jouer en 3D pour entrer dans l'arene.";
    }
  }

  function requestPointerLock() {
    if (!canvas.requestPointerLock) {
      hintLabel.textContent = "Le verrouillage souris n'est pas disponible ici.";
      return;
    }
    try {
      canvas.requestPointerLock();
    } catch {
      hintLabel.textContent = "Le verrouillage souris a ete bloque. Cliquez encore dans la scene.";
    }
  }

  function dealDamage(amount, reason) {
    if (state.gameOver) return;
    state.hp = clamp(state.hp - amount, 0, 100);
    state.shake = Math.max(state.shake, 0.35);
    playSynth({
      wave: "square",
      from: 180,
      to: 52,
      filter: 720,
      volume: 0.06,
      duration: 0.2
    });
    if (reason) hintLabel.textContent = reason;
    if (state.hp <= 0) {
      state.gameOver = true;
      document.exitPointerLock?.();
      gameOverText.textContent = `Score ${state.score} - ${state.kills} drones casses dans la forge.`;
      gameOverPanel.classList.remove("hidden");
    }
  }

  function shoot() {
    if (!state.locked || !state.canShoot || state.gameOver) return;
    state.canShoot = false;
    muzzleFlash = 0.12;
    playSynth({
      wave: "sawtooth",
      from: 620,
      to: 120,
      filter: 1900,
      volume: 0.08,
      duration: 0.12
    });
    setTimeout(() => {
      state.canShoot = true;
    }, 145);

    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const liveTargets = enemies.filter((enemy) => enemy.respawn <= 0).map((enemy) => enemy.body);
    const hits = raycaster.intersectObjects(liveTargets, false);
    if (!hits.length) {
      hintLabel.textContent = "Tir parti dans la braise.";
      return;
    }

    const hitBody = hits[0].object;
    const enemy = enemies.find((candidate) => candidate.body === hitBody);
    if (!enemy) return;
    enemy.hp -= 100;
    enemy.body.material.emissiveIntensity = 3.4;
    if (enemy.hp <= 0) {
      enemy.respawn = 2.6;
      enemy.group.visible = false;
      state.score += 120;
      state.kills += 1;
      playSynth({
        wave: "triangle",
        from: 420,
        to: 90,
        filter: 1500,
        volume: 0.075,
        duration: 0.18
      });
      hintLabel.textContent = "Drone casse. Continuez la pression.";
    }
  }

  function resetRun() {
    state.hp = 100;
    state.score = 0;
    state.kills = 0;
    state.gameOver = false;
    state.sessionRequested = false;
    state.shake = 0;
    state.yaw = 0;
    state.pitch = 0;
    playerRig.position.set(0, 0, 12);
    playerRig.rotation.y = 0;
    camera.rotation.x = 0;
    enemyProjectiles.forEach((projectile) => scene.remove(projectile.mesh));
    enemyProjectiles.length = 0;
    enemies.forEach((enemy, index) => {
      enemy.hp = 100;
      enemy.respawn = 0;
      enemy.cooldown = 1.2 + Math.random() * 1.8;
      enemy.group.visible = true;
      enemy.orbitAngle = index * 1.08;
      enemy.orbitRadius = 18 + (index % 3) * 8;
      enemy.group.position.set(Math.cos(enemy.orbitAngle) * enemy.orbitRadius, 2.1, Math.sin(enemy.orbitAngle) * enemy.orbitRadius);
      enemy.body.material.emissiveIntensity = 1.8;
    });
    hintLabel.textContent = "Cliquez pour verrouiller la souris et tirer dans la forge.";
    hpLabel.textContent = String(state.hp);
    scoreLabel.textContent = "0";
    gameOverPanel.classList.add("hidden");
    intro.classList.remove("hidden");
  }

  function tryFullscreen() {
    if (document.fullscreenElement || !app.requestFullscreen) return;
    app.requestFullscreen().catch(() => {});
  }

  function enterArena() {
    const now = performance.now();
    if (now - lastEnterAttempt < 180) return;
    lastEnterAttempt = now;
    ensureAudio();
    startAmbient();
    state.sessionRequested = true;
    intro.classList.add("hidden");
    gameOverPanel.classList.add("hidden");
    hintLabel.textContent = "Activation de l'arene... cliquez dans la scene si besoin.";
    canvas.focus?.();
    requestPointerLock();
    setTimeout(() => {
      if (!state.locked && !state.gameOver) {
        hintLabel.textContent = "Cliquez dans la scene pour activer la souris. Plein ecran disponible en haut.";
      }
    }, 250);
  }

  function currentPositionVector() {
    return new THREE.Vector3(playerRig.position.x, 2.1, playerRig.position.z);
  }

  function updatePlayer(delta) {
    if (!state.locked || state.gameOver) return;

    const moveSpeed = (state.sprint ? 11.6 : 7.6) * delta;
    const forward = new THREE.Vector3(Math.sin(state.yaw), 0, -Math.cos(state.yaw));
    const strafe = new THREE.Vector3(Math.cos(state.yaw), 0, Math.sin(state.yaw));
    const motion = new THREE.Vector3();

    if (state.moveForward) motion.add(forward);
    if (state.moveBackward) motion.sub(forward);
    if (state.moveRight) motion.add(strafe);
    if (state.moveLeft) motion.sub(strafe);

    if (motion.lengthSq() > 0) {
      motion.normalize().multiplyScalar(moveSpeed);
      const nextX = playerRig.position.x + motion.x;
      const nextZ = playerRig.position.z + motion.z;
      if (!worldCollides(nextX, playerRig.position.z, 1.05)) playerRig.position.x = nextX;
      if (!worldCollides(playerRig.position.x, nextZ, 1.05)) playerRig.position.z = nextZ;
    }

    const lavaDamage = hazardDamageAt(playerRig.position.x, playerRig.position.z);
    if (lavaDamage > 0) {
      dealDamage(lavaDamage * delta, "La lave vous grignote les bottes.");
    }

    camera.position.y = 2.1 + Math.sin(clock.elapsedTime * 8) * 0.05 * (motion.lengthSq() > 0 ? 1 : 0);
  }

  function updateEnemies(delta) {
    const playerVector = currentPositionVector();
    enemies.forEach((enemy, index) => {
      if (enemy.respawn > 0) {
        enemy.respawn -= delta;
        if (enemy.respawn <= 0) {
          enemy.hp = 100;
          enemy.group.visible = true;
          enemy.orbitAngle = clock.elapsedTime * 0.3 + index;
          enemy.orbitRadius = 16 + ((index + 1) % 3) * 8;
        }
        return;
      }

      enemy.orbitAngle += delta * enemy.speed;
      const toPlayer = new THREE.Vector3(
        playerRig.position.x - enemy.group.position.x,
        0,
        playerRig.position.z - enemy.group.position.z
      );
      const playerDistance = toPlayer.length();
      const targetRadius = clamp(enemy.orbitRadius + Math.sin(clock.elapsedTime * 0.7 + index) * 2.4, 12, 30);
      const targetX = Math.cos(enemy.orbitAngle) * targetRadius;
      const targetZ = Math.sin(enemy.orbitAngle) * targetRadius;

      enemy.group.position.lerp(new THREE.Vector3(targetX, 2.1 + Math.sin(clock.elapsedTime * 3 + index) * 0.18, targetZ), delta * 0.72);
      enemy.group.lookAt(playerVector.x, 2.2, playerVector.z);

      enemy.cooldown -= delta;
      if (enemy.cooldown <= 0 && playerDistance < 48) {
        const direction = toPlayer.normalize();
        const origin = enemy.group.position.clone();
        origin.y += 0.2;
        spawnProjectile(origin, direction, 19 + Math.random() * 6);
        enemy.cooldown = 1.4 + Math.random() * 1.8;
        playSynth({
          wave: "triangle",
          from: 240,
          to: 120,
          filter: 900,
          volume: 0.028,
          duration: 0.12
        });
      }

      if (playerDistance < 3.4) {
        dealDamage(15 * delta, "Un drone vous colle de trop pres.");
      }

      enemy.body.material.emissiveIntensity = THREE.MathUtils.lerp(enemy.body.material.emissiveIntensity, 1.8, delta * 6);
    });
  }

  function updateProjectiles(delta) {
    for (let i = enemyProjectiles.length - 1; i >= 0; i -= 1) {
      const projectile = enemyProjectiles[i];
      projectile.life -= delta;
      projectile.mesh.position.addScaledVector(projectile.velocity, delta);

      if (worldCollides(projectile.mesh.position.x, projectile.mesh.position.z, 0.2) || projectile.life <= 0) {
        scene.remove(projectile.mesh);
        enemyProjectiles.splice(i, 1);
        continue;
      }

      const distance = projectile.mesh.position.distanceTo(currentPositionVector());
      if (distance < 1.3) {
        dealDamage(14, "Impact de braise. Bougez encore.");
        scene.remove(projectile.mesh);
        enemyProjectiles.splice(i, 1);
      }
    }
  }

  function updateEmbers(delta) {
    const positions = emberCloud.geometry.attributes.position.array;
    const speeds = emberCloud.userData.speeds;
    for (let i = 0; i < speeds.length; i += 1) {
      positions[i * 3 + 1] += speeds[i] * delta;
      if (positions[i * 3 + 1] > 20) {
        positions[i * 3] = (Math.random() - 0.5) * 180;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 180;
      }
    }
    emberCloud.geometry.attributes.position.needsUpdate = true;
  }

  function renderHud() {
    hpLabel.textContent = String(Math.round(state.hp));
    scoreLabel.textContent = String(state.score);
    targetsLabel.textContent = String(enemies.filter((enemy) => enemy.respawn <= 0).length);
    fpsLabel.textContent = String(Math.round(state.fpsValue));
  }

  function animate() {
    const delta = Math.min(clock.getDelta(), 0.032);
    state.fpsValue = THREE.MathUtils.lerp(state.fpsValue, 1 / Math.max(0.001, delta), 0.08);
    lavaTexture.offset.y -= delta * 0.12;
    rimTexture.offset.x += delta * 0.02;

    updatePlayer(delta);
    updateEnemies(delta);
    updateProjectiles(delta);
    updateEmbers(delta);
    renderHud();

    if (muzzleFlash > 0) {
      muzzleFlash -= delta;
      renderer.toneMappingExposure = 1.04 + muzzleFlash * 0.68;
    } else {
      renderer.toneMappingExposure = THREE.MathUtils.lerp(renderer.toneMappingExposure, 1.04, delta * 6);
    }

    if (state.shake > 0) {
      state.shake = Math.max(0, state.shake - delta * 1.4);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  document.addEventListener("pointerlockchange", () => {
    const locked = document.pointerLockElement === canvas;
    setLocked(locked);
    if (locked) {
      tryFullscreen();
      hintLabel.textContent = "Forge active. Gardez vos distances avec la lave.";
    }
  });

  document.addEventListener("pointerlockerror", () => {
    state.sessionRequested = true;
    intro.classList.add("hidden");
    if (!state.gameOver) {
      hintLabel.textContent = "Le verrouillage souris a ete refuse. Cliquez dans la scene pour reessayer.";
    }
  });

  document.addEventListener("mousemove", (event) => {
    if (!state.locked || state.gameOver) return;
    state.yaw -= event.movementX * 0.0026;
    state.pitch = clamp(state.pitch - event.movementY * 0.0021, -1.22, 1.22);
    playerRig.rotation.y = state.yaw;
    camera.rotation.x = state.pitch;
  });

  function handleKey(code, value) {
    if (code === "KeyZ" || code === "KeyW") state.moveForward = value;
    if (code === "KeyS") state.moveBackward = value;
    if (code === "KeyQ" || code === "KeyA") state.moveLeft = value;
    if (code === "KeyD") state.moveRight = value;
    if (code === "ShiftLeft" || code === "ShiftRight") state.sprint = value;
    if (value && code === "KeyR") {
      resetRun();
      if (!state.locked) enterArena();
    }
  }

  window.addEventListener("keydown", (event) => handleKey(event.code, true));
  window.addEventListener("keyup", (event) => handleKey(event.code, false));
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  });

  fullscreenButton.addEventListener("click", tryFullscreen);
  enterButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    enterArena();
  });
  enterButton.addEventListener("click", (event) => {
    event.preventDefault();
    enterArena();
  });
  restartButton.addEventListener("click", () => {
    resetRun();
    enterArena();
  });

  canvas.addEventListener("click", () => {
    if (!state.locked) {
      enterArena();
      return;
    }
    shoot();
  });

  resetRun();
  animate();
})();
