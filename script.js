'use strict';
/* ===================================================
   MINECRAFT CONFESSION — script.js
   =================================================== */

const R = (a,b) => Math.random()*(b-a)+a;
const RI = (a,b) => Math.floor(R(a,b));

const body       = document.body;
const bgLayer    = document.getElementById('bg-layer');
const partLayer  = document.getElementById('particle-layer');
const cloudLayer = document.getElementById('cloud-layer');
const entityLayer= document.getElementById('entity-layer');
const itemLayer  = document.getElementById('item-layer');
const yesBtn     = document.getElementById('yes-btn');
const noBtn      = document.getElementById('no-btn');
const yesOverlay = document.getElementById('yes-overlay');
const expLayer   = document.getElementById('exp-layer');
const confLayer  = document.getElementById('confetti-layer');
const hint       = document.getElementById('hint');

window.addEventListener('load', init);

function init() {
  const MC = window.MC;

  const groundCanvas = document.getElementById('ground-canvas');
  groundCanvas.width = Math.ceil(window.innerWidth / 32 + 1) * 32;
  groundCanvas.height = 32;
  const gctx = groundCanvas.getContext('2d');
  gctx.imageSmoothingEnabled = false;

  const tileW = 16, tileH = 4, tileScale = 2;
  const grassSprite = MC.SPRITES.grass;
  for (let tx = 0; tx < groundCanvas.width; tx += tileW * tileScale) {
    const tmp = document.createElement('canvas');
    tmp.width  = tileW * tileScale;
    tmp.height = tileH * tileScale;
    const tc = tmp.getContext('2d');
    tc.imageSmoothingEnabled = false;
    grassSprite.rows.slice(0, 4).forEach((row, ry) => {
      row.forEach((color, cx) => {
        if (!color) return;
        tc.fillStyle = color;
        tc.fillRect(cx * tileScale, ry * tileScale, tileScale, tileScale);
      });
    });
    gctx.drawImage(tmp, tx, 0);
  }

  // Chỉ sử dụng nhân vật Steve theo yêu cầu
  MC.createMob('steve', 6, 55, 60,  1, entityLayer);
  MC.createMob('steve', 6, 40, window.innerWidth * 0.7, -1, entityLayer);
  MC.createMob('steve', 6, 35, window.innerWidth * 0.3, 1, entityLayer);
  const beeCanvas = MC.createMob('steve', 5, 50, window.innerWidth * 0.55, -1, entityLayer);
  beeCanvas.style.bottom = '80px';

  function decorateCanvas(id, spriteName, scale) {
    const c = document.getElementById(id);
    if (!c) return;
    MC.renderSprite(c, MC.SPRITES[spriteName], scale || 2);
  }
  decorateCanvas('ci-grass',   'grass',   2);
  decorateCanvas('ci-heart',   'heart',   2);
  decorateCanvas('ci-flower',  'flower',  2);
  decorateCanvas('ci-diamond', 'diamond', 2);
  decorateCanvas('ci-heart2',  'heart',   2);
  decorateCanvas('ci-sword',   'sword',   2);

  const floatItems = ['heart','diamond','sword','bow','flower','grass','heart','diamond'];
  floatItems.forEach((name, i) => {
    const c = document.createElement('canvas');
    c.className = 'float-item';
    const scale = RI(2, 4);
    MC.renderSprite(c, MC.SPRITES[name], scale);
    c.style.left  = R(3, 93) + 'vw';
    c.style.top   = R(5, 75) + 'vh';
    c.style.setProperty('--dur', R(3,6)  + 's');
    c.style.setProperty('--del', R(0,4)  + 's');
    c.style.opacity = '0.35';
    itemLayer.appendChild(c);
  });

  spawnParticles();

  let noAttempts = 0;
  let noMoving   = false;

  noBtn.style.left = (window.innerWidth / 2 + 80) + 'px';
  noBtn.style.top  = (window.innerHeight / 2 + 8)  + 'px';

  function moveNo() {
    if (noMoving) return;
    noMoving = true;
    noAttempts++;

    if (noAttempts >= 5) {
      const sh = Math.max(0.42, 1 - (noAttempts - 4) * 0.12);
      noBtn.style.fontSize = (13 * sh) + 'px';
      noBtn.style.padding  = (13 * sh) + 'px ' + (26 * sh) + 'px';
    }

    const r   = noBtn.getBoundingClientRect();
    const nW  = r.width, nH = r.height;
    const mg  = 24;
    const maxX = window.innerWidth  - nW - mg;
    const maxY = window.innerHeight - nH - mg;
    const curX = parseFloat(noBtn.style.left) || 0;
    const curY = parseFloat(noBtn.style.top)  || 0;

    let nx, ny, tries = 0;
    do { nx = R(mg, maxX); ny = R(mg, maxY); tries++; }
    while (tries < 20 && Math.hypot(nx - curX, ny - curY) < 160);

    noBtn.style.left = nx + 'px';
    noBtn.style.top  = ny + 'px';

    const msgs = [
      'hm, interesting choice 😏',
      "you can't catch me!",
      '🐷 oink oink!',
      'just click YES already ❤',
      'NO is getting tired...',
    ];
    hint.textContent = msgs[Math.min(noAttempts - 1, msgs.length - 1)];

    setTimeout(() => { noMoving = false; }, 380);
  }

  document.addEventListener('mousemove', e => {
    if (!yesOverlay.classList.contains('hidden')) return;
    const r  = noBtn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    if (Math.hypot(e.clientX - cx, e.clientY - cy) < 115) moveNo();
  });

  document.addEventListener('touchmove', e => {
    if (!yesOverlay.classList.contains('hidden')) return;
    const t = e.touches[0];
    const r = noBtn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    if (Math.hypot(t.clientX - cx, t.clientY - cy) < 90) moveNo();
  }, { passive:true });

  noBtn.addEventListener('click', moveNo);

  yesBtn.addEventListener('click', () => {
    triggerYes(MC);
  });

  window.addEventListener('resize', () => {
    const cx = parseFloat(noBtn.style.left) || 0;
    const cy = parseFloat(noBtn.style.top)  || 0;
    const r  = noBtn.getBoundingClientRect();
    noBtn.style.left = Math.min(cx, window.innerWidth  - r.width  - 20) + 'px';
    noBtn.style.top  = Math.min(cy, window.innerHeight - r.height - 20) + 'px';
  });
}

function spawnParticles() {
  const chars = ['❤','♥','✦','✧','✵','❋'];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement('span');
    el.textContent = chars[RI(0, chars.length)];
    el.style.cssText = `
      position:absolute;
      left:${R(1,99)}vw;
      top:${R(1,95)}vh;
      font-family:monospace;
      font-size:${R(10,24)}px;
      color:rgba(255,100,170,${R(0.15,0.5)});
      animation:itemFloat ${R(3,7)}s ease-in-out ${R(0,5)}s infinite;
      pointer-events:none;
    `;
    partLayer.appendChild(el);
  }
}

function triggerYes(MC) {
  yesOverlay.classList.remove('hidden');

  // Music playback
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(e => console.log('Audio autoplay blocked', e));
  }

  setTimeout(() => {
    body.classList.add('sunset');
    body.classList.add('yes-glow');
  }, 60);

  setTimeout(() => {
    spawnClouds();
    cloudLayer.classList.add('show');
  }, 700);

  setTimeout(() => { heartBurst(MC); }, 200);
  setTimeout(() => { spawnConfetti(MC); }, 350);

  let wave = 0;
  const wInt = setInterval(() => {
    if (wave++ > 14) { clearInterval(wInt); return; }
    for (let j = 0; j < 5; j++) spawnRisingHeart();
  }, 450);
}

function heartBurst(MC) {
  const total = 55;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const HEARTS = ['❤','♥','❥','❣'];

  for (let i = 0; i < total; i++) {
    const useCanvas = i % 3 === 0;
    let el;

    if (useCanvas) {
      el = document.createElement('canvas');
      MC.renderSprite(el, MC.SPRITES.heart, RI(2,5));
    } else {
      el = document.createElement('span');
      el.textContent = HEARTS[RI(0, HEARTS.length)];
      el.style.fontFamily = 'monospace';
      el.style.fontSize = RI(14, 36) + 'px';
      el.style.color = `hsl(${RI(320,380)},90%,${RI(55,75)}%)`;
    }

    el.className = 'exp-h';
    const angle = R(0, 360);
    const dist  = R(80, Math.max(window.innerWidth, window.innerHeight) * 0.6);
    const rad   = angle * Math.PI / 180;
    const tx    = Math.cos(rad) * dist;
    const ty    = Math.sin(rad) * dist;
    const dur   = R(1.2, 2.8);
    const del   = R(0, 0.5);

    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    el.style.setProperty('--x',  tx + 'px');
    el.style.setProperty('--y',  ty + 'px');
    el.style.setProperty('--x1', (tx * 0.3) + 'px');
    el.style.setProperty('--y1', (ty * 0.3 - 30) + 'px');
    el.style.setProperty('--r',  R(-180, 180) + 'deg');
    el.style.setProperty('--dur', dur + 's');
    el.style.setProperty('--del', del + 's');

    expLayer.appendChild(el);
    setTimeout(() => el.remove(), (dur + del + 0.5) * 1000);
  }
}

function spawnRisingHeart() {
  const el = document.createElement('span');
  el.className = 'rise-heart';
  el.textContent = ['❤','♥','❥'][RI(0,3)];
  el.style.fontSize = RI(14, 30) + 'px';
  el.style.left  = R(5, 92) + 'vw';
  el.style.bottom = '0';
  el.style.color = `hsl(${RI(320,380)},90%,${RI(55,75)}%)`;
  const dur = R(2.2, 4);
  el.style.setProperty('--dur', dur + 's');
  el.style.setProperty('--del', R(0, 0.5) + 's');
  el.style.setProperty('--r',   R(-30, 30) + 'deg');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur + 1) * 1000);
}

function spawnClouds() {
  const configs = [
    { w:100,h:24,y:'10vh', dur:24, del:0    },
    { w:70, h:18,y:'20vh', dur:18, del:-7   },
    { w:130,h:28,y:'6vh',  dur:30, del:-14  },
    { w:55, h:16,y:'28vh', dur:16, del:-3   },
  ];
  configs.forEach(cfg => {
    const el = document.createElement('div');
    el.className = 'px-cloud';
    el.style.width  = cfg.w + 'px';
    el.style.height = cfg.h + 'px';
    el.style.top    = cfg.y;
    el.style.setProperty('--cd',   cfg.dur + 's');
    el.style.setProperty('--cdel', cfg.del + 's');
    cloudLayer.appendChild(el);
  });
}

const CONF_COLORS = ['#FF85B8','#FFB3D1','#FF3D7F','#FFDA6B','#A8E6CF','#C8A8D8','#44E8F8','#5588E8'];

function spawnConfetti(MC) {
  drop(80);
  setTimeout(() => drop(60), 2200);

  function drop(n) {
    for (let i = 0; i < n; i++) {
      let el;
      if (i % 5 === 0) {
        el = document.createElement('canvas');
        MC.renderSprite(el, MC.SPRITES.diamond, 1);
      } else {
        el = document.createElement('div');
        const sz = RI(6, 14);
        el.style.width  = sz + 'px';
        el.style.height = (Math.random() > .5 ? sz : sz * 2) + 'px';
        el.style.background = CONF_COLORS[RI(0, CONF_COLORS.length)];
      }
      el.className = 'confetti';
      el.style.left = R(4, 94) + 'vw';
      el.style.setProperty('--dur',  R(2, 5)    + 's');
      el.style.setProperty('--del',  R(0, 2)    + 's');
      el.style.setProperty('--spin', R(360, 900) + 'deg');
      confLayer.appendChild(el);
      setTimeout(() => el.remove(), 8000);
    }
  }
}
