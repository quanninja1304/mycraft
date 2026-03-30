/* ============================================================
   MINECRAFT CONFESSION PAGE — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM refs ─────────────────────────────────────────── */
  const body           = document.body;
  const yesBtn         = document.getElementById('yes-btn');
  const noBtn          = document.getElementById('no-btn');
  const yesOverlay     = document.getElementById('yes-overlay');
  const heartExplosion = document.getElementById('heart-explosion');
  const confettiCont   = document.getElementById('confetti-container');
  const cloudsCont     = document.getElementById('clouds-container');
  const sparklesCont   = document.getElementById('sparkles-container');
  const bgHeartsCont   = document.getElementById('bg-hearts');
  const hintText       = document.getElementById('hint-text');

  /* ── NO button state ──────────────────────────────────── */
  let noAttempts = 0;
  let noW = 0, noH = 0;   // cached size
  let noIsMoving = false;

  /* ── Helpers ──────────────────────────────────────────── */
  const rand  = (min, max) => Math.random() * (max - min) + min;
  const randI = (min, max) => Math.floor(rand(min, max));

  /* ============================================================
     1. BACKGROUND SPARKLES
     ============================================================ */
  const SPARKLE_CHARS = ['✦', '✧', '⋆', '✵', '✴', '❋', '✺'];

  function createSparkle() {
    const el = document.createElement('span');
    el.className = 'sparkle';
    el.textContent = SPARKLE_CHARS[randI(0, SPARKLE_CHARS.length)];
    el.style.left   = rand(2, 98) + 'vw';
    el.style.bottom = rand(5, 90) + 'vh';
    el.style.setProperty('--dur',   rand(3, 6) + 's');
    el.style.setProperty('--delay', rand(0, 5) + 's');
    el.style.fontSize = rand(10, 22) + 'px';
    sparklesCont.appendChild(el);
  }

  for (let i = 0; i < 28; i++) createSparkle();

  /* ============================================================
     2. BACKGROUND FLOATING HEARTS
     ============================================================ */
  const HEART_CHARS = ['❤', '♥', '❤', '❥'];

  function createBgHeart() {
    const el = document.createElement('span');
    el.className = 'bg-heart';
    el.textContent = HEART_CHARS[randI(0, HEART_CHARS.length)];
    el.style.left   = rand(2, 96) + 'vw';
    el.style.bottom = rand(0, 30) + 'vh';
    el.style.setProperty('--dur',   rand(5, 9) + 's');
    el.style.setProperty('--delay', rand(0, 7) + 's');
    el.style.setProperty('--size',  rand(14, 28) + 'px');
    bgHeartsCont.appendChild(el);
  }

  for (let i = 0; i < 22; i++) createBgHeart();

  /* ============================================================
     3. NO BUTTON — run-away logic
     ============================================================ */
  function initNoBtn() {
    // Place NO btn initially via fixed position in centre-right
    const rect = noBtn.getBoundingClientRect();
    noW = rect.width;
    noH = rect.height;
    // Start at natural flow position — JS will track from mousemove
    noBtn.style.left = (window.innerWidth / 2 + 60) + 'px';
    noBtn.style.top  = (window.innerHeight / 2 + 10) + 'px';
    noBtn.style.transform = 'none';
  }

  function moveNoBtn() {
    if (noIsMoving) return;
    noIsMoving = true;
    noAttempts++;

    // Shrink after 5 attempts
    if (noAttempts >= 5) {
      const shrink = Math.max(0.45, 1 - (noAttempts - 4) * 0.1);
      noBtn.style.fontSize = (14 * shrink) + 'px';
      noBtn.style.padding  = (14 * shrink) + 'px ' + (28 * shrink) + 'px';
    }

    // Update cached size
    const r = noBtn.getBoundingClientRect();
    noW = r.width;
    noH = r.height;

    const margin = 20;
    const maxX   = window.innerWidth  - noW  - margin;
    const maxY   = window.innerHeight - noH  - margin;

    let newX, newY;
    // Try to keep some distance from current position
    const curX = parseFloat(noBtn.style.left) || 0;
    const curY = parseFloat(noBtn.style.top)  || 0;
    let attempts = 0;

    do {
      newX = rand(margin, maxX);
      newY = rand(margin, maxY);
      attempts++;
    } while (
      attempts < 20 &&
      Math.hypot(newX - curX, newY - curY) < 150
    );

    noBtn.style.transition = 'left 0.35s cubic-bezier(0.34,1.56,0.64,1), top 0.35s cubic-bezier(0.34,1.56,0.64,1)';
    noBtn.style.left = newX + 'px';
    noBtn.style.top  = newY + 'px';

    // Update hint text with cheeky messages
    const hints = [
      '← nice try 😏',
      '← you can\'t catch me!',
      '← the pig is faster than NO',
      '← just click YES already 🐷',
      '← NO is getting tired...',
    ];
    if (hintText) hintText.textContent = hints[Math.min(noAttempts - 1, hints.length - 1)];

    setTimeout(() => { noIsMoving = false; }, 400);
  }

  // Proximity check on mousemove
  document.addEventListener('mousemove', function (e) {
    if (!noBtn || yesOverlay.classList.contains('hidden') === false) return;

    const r = noBtn.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < 110) moveNoBtn();
  });

  // Touch support
  document.addEventListener('touchmove', function (e) {
    if (!noBtn || !yesOverlay.classList.contains('hidden')) return;
    const t = e.touches[0];
    const r = noBtn.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    if (Math.hypot(t.clientX - cx, t.clientY - cy) < 90) moveNoBtn();
  }, { passive: true });

  // Also move on direct click (if somehow clicked)
  noBtn.addEventListener('click', moveNoBtn);

  // Init position after fonts load
  window.addEventListener('load', initNoBtn);

  /* ============================================================
     4. YES BUTTON — main celebration
     ============================================================ */
  yesBtn.addEventListener('click', function () {
    triggerYes();
  });

  function triggerYes() {
    /* — Reveal overlay — */
    yesOverlay.classList.remove('hidden');

    /* — Sunset background — */
    setTimeout(() => {
      body.classList.add('sunset');
      body.classList.add('yes-glow');
    }, 50);

    /* — Pixel clouds — */
    setTimeout(() => {
      spawnClouds();
      cloudsCont.classList.add('visible');
    }, 600);

    /* — Heart explosion — */
    setTimeout(spawnHeartExplosion, 200);

    /* — Confetti — */
    setTimeout(spawnConfetti, 400);
  }

  /* ============================================================
     5. HEART EXPLOSION
     ============================================================ */
  const HEART_SYMBOLS = ['❤', '♥', '❥', '❣', '💗', '💕', '💖', '💓'];

  function spawnHeartExplosion() {
    const total = 60;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < total; i++) {
      const el = document.createElement('span');
      el.className = 'exp-heart';
      el.textContent = HEART_SYMBOLS[randI(0, HEART_SYMBOLS.length)];

      const size   = rand(14, 36);
      const angle  = rand(0, 360);
      const dist   = rand(80, Math.max(window.innerWidth, window.innerHeight) * 0.55);
      const rad    = (angle * Math.PI) / 180;
      const tx     = Math.cos(rad) * dist;
      const ty     = Math.sin(rad) * dist;
      const dur    = rand(1.2, 2.8);
      const delay  = rand(0, 0.6);

      el.style.left   = cx + 'px';
      el.style.top    = cy + 'px';
      el.style.setProperty('--size',  size + 'px');
      el.style.setProperty('--tx',    tx   + 'px');
      el.style.setProperty('--ty',    ty   + 'px');
      el.style.setProperty('--tx1',   (tx * 0.3) + 'px');
      el.style.setProperty('--ty1',   (ty * 0.3 - 30) + 'px');
      el.style.setProperty('--rot',   rand(-180, 180) + 'deg');
      el.style.setProperty('--dur',   dur   + 's');
      el.style.setProperty('--delay', delay + 's');
      el.style.fontSize = size + 'px';
      el.style.color = `hsl(${randI(330, 380)}, 85%, ${randI(55, 75)}%)`;

      heartExplosion.appendChild(el);
    }

    /* Continuous floating hearts rising upward */
    let waveCount = 0;
    const waveInterval = setInterval(() => {
      if (waveCount++ > 12) { clearInterval(waveInterval); return; }
      for (let j = 0; j < 6; j++) {
        spawnRisingHeart();
      }
    }, 400);
  }

  function spawnRisingHeart() {
    const el = document.createElement('span');
    el.className = 'exp-heart';
    el.textContent = HEART_SYMBOLS[randI(0, HEART_SYMBOLS.length)];

    const size  = rand(16, 30);
    const tx    = rand(-150, 150);
    const dur   = rand(1.8, 3.5);

    el.style.left   = rand(10, 90) + 'vw';
    el.style.top    = (window.innerHeight + 20) + 'px';
    el.style.setProperty('--size',  size + 'px');
    el.style.setProperty('--tx',    tx   + 'px');
    el.style.setProperty('--ty',    '-' + rand(300, 700) + 'px');
    el.style.setProperty('--tx1',   (tx * 0.4) + 'px');
    el.style.setProperty('--ty1',   '-' + rand(100, 200) + 'px');
    el.style.setProperty('--rot',   rand(-90, 90) + 'deg');
    el.style.setProperty('--dur',   dur  + 's');
    el.style.setProperty('--delay', '0s');
    el.style.fontSize = size + 'px';
    el.style.color = `hsl(${randI(320, 380)}, 88%, ${randI(55, 75)}%)`;

    heartExplosion.appendChild(el);

    // Clean up old hearts
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, (dur + 1) * 1000);
  }

  /* ============================================================
     6. PIXEL CLOUDS
     ============================================================ */
  function spawnClouds() {
    const configs = [
      { w: 120, h: 30, y: '12vh', dur: 22, delay: 0 },
      { w:  80, h: 20, y: '22vh', dur: 18, delay: -6 },
      { w: 140, h: 35, y:  '8vh', dur: 28, delay: -12 },
      { w:  60, h: 18, y: '30vh', dur: 15, delay: -3 },
    ];

    configs.forEach(cfg => {
      const cloud = document.createElement('div');
      cloud.className = 'pixel-cloud';
      cloud.style.width  = cfg.w + 'px';
      cloud.style.height = cfg.h + 'px';
      cloud.style.top    = cfg.y;
      cloud.style.borderRadius = '0';  // keep pixelated
      cloud.style.setProperty('--cdur',   cfg.dur   + 's');
      cloud.style.setProperty('--cdelay', cfg.delay + 's');
      cloudsCont.appendChild(cloud);
    });
  }

  /* ============================================================
     7. CONFETTI
     ============================================================ */
  const CONFETTI_COLORS = [
    '#FF85B3', '#FFB3D1', '#FF3D7F',
    '#FFF0F7', '#FFDA6B', '#A8E6CF',
    '#FFD6E7', '#C8A8D8',
  ];

  function spawnConfetti() {
    const total = 80;

    for (let i = 0; i < total; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';

      const size  = randI(6, 14);
      el.style.width  = size + 'px';
      el.style.height = size + 'px';
      el.style.left   = rand(5, 95) + 'vw';
      el.style.background = CONFETTI_COLORS[randI(0, CONFETTI_COLORS.length)];
      el.style.setProperty('--dur',   rand(2, 4.5) + 's');
      el.style.setProperty('--delay', rand(0, 2)   + 's');
      el.style.setProperty('--spin',  (randI(0, 2) ? '' : '-') + rand(360, 900) + 'deg');
      // Randomly square or rectangular
      if (Math.random() > 0.5) {
        el.style.width  = size + 'px';
        el.style.height = size * 2 + 'px';
      }

      confettiCont.appendChild(el);

      // Remove after animation
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, (4.5 + 2 + 0.5) * 1000);
    }

    // Wave 2
    setTimeout(() => spawnConfettiWave(50), 2000);
  }

  function spawnConfettiWave(count) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = randI(6, 12);
      el.style.width  = size + 'px';
      el.style.height = size + 'px';
      el.style.left   = rand(5, 95) + 'vw';
      el.style.background = CONFETTI_COLORS[randI(0, CONFETTI_COLORS.length)];
      el.style.setProperty('--dur',   rand(2, 4) + 's');
      el.style.setProperty('--delay', rand(0, 1) + 's');
      el.style.setProperty('--spin',  rand(360, 720) + 'deg');
      confettiCont.appendChild(el);
      setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 6000);
    }
  }

  /* ============================================================
     8. BOUNCING CHARACTERS (extra wiggle on click)
     ============================================================ */
  const steve   = document.getElementById('steve');
  const pigChar = document.getElementById('pig');

  function characterWiggle(el, intensity) {
    el.style.animation = 'none';
    el.style.transform = `translateY(-${intensity}px) rotate(${rand(-15, 15)}deg) scale(1.2)`;
    setTimeout(() => {
      el.style.transform = '';
      el.style.animation = '';
    }, 400);
  }

  yesBtn.addEventListener('mouseenter', () => {
    characterWiggle(steve,   20);
    characterWiggle(pigChar, 25);
  });

  /* ============================================================
     9. WINDOW RESIZE — reposition NO btn safely
     ============================================================ */
  window.addEventListener('resize', function () {
    const r  = noBtn.getBoundingClientRect();
    const cx = parseFloat(noBtn.style.left) || 0;
    const cy = parseFloat(noBtn.style.top)  || 0;
    const maxX = window.innerWidth  - r.width  - 20;
    const maxY = window.innerHeight - r.height - 20;

    if (cx > maxX) noBtn.style.left = maxX + 'px';
    if (cy > maxY) noBtn.style.top  = maxY + 'px';
    if (cx < 0)    noBtn.style.left = '20px';
    if (cy < 0)    noBtn.style.top  = '20px';
  });

  /* ============================================================
     10. INITIAL ANIMATIONS STAGGER
     ============================================================ */
  // Stagger the bg elements appearance
  setTimeout(() => {
    document.querySelectorAll('.bg-heart').forEach((el, i) => {
      el.style.animationDelay = (i * 0.3) + 's';
    });
  }, 100);

})();
