const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  const fontSize = 18;
  const glyphs = "01";

  // stream settings
  const MIN_ACTIVE = 1;
  const MAX_ACTIVE = 5;
  const SPAWN_CHANCE = 0.05;
  const FADE_ALPHA = 0.15;
  const SPEED_MIN = 0.08;
  const SPEED_MAX = .12;
  const STREAM_LENGTH = 8; // number of characters tall

  let columns = Math.floor(window.innerWidth / fontSize);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const usedCols = new Set();
  let streams = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function pickFreeColumn() {
    if (usedCols.size >= columns) return null;
    for (let tries = 0; tries < 20; tries++) {
      const c = Math.floor(Math.random() * columns);
      if (!usedCols.has(c)) return c;
    }
    for (let c = 0; c < columns; c++) {
      if (!usedCols.has(c)) return c;
    }
    return null;
  }

  function spawnStream() {
    const col = pickFreeColumn();
    if (col == null) return;
    usedCols.add(col);

    // pre-generate a string of glyphs for this stream
    const chars = Array.from({length: STREAM_LENGTH}, () => 
      glyphs[Math.floor(Math.random() * glyphs.length)]
    );

    streams.push({
      col,
      y: -STREAM_LENGTH, // start above screen
      speed: randomBetween(SPEED_MIN, SPEED_MAX),
      chars
    });
  }

  function ensureStreams() {
    if (streams.length < MIN_ACTIVE) {
      for (let i = streams.length; i < MIN_ACTIVE; i++) spawnStream();
    } else if (streams.length < MAX_ACTIVE && Math.random() < SPAWN_CHANCE) {
      spawnStream();
    }
  }

  function drawFrame() {
    ctx.fillStyle = `rgba(0,0,0,${FADE_ALPHA})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = streams.length - 1; i >= 0; i--) {
      const s = streams[i];
      const x = s.col * fontSize;

      // draw entire vertical string
      for (let j = 0; j < s.chars.length; j++) {
        const ch = s.chars[j];
        const y = (s.y + j) * fontSize;
        ctx.fillText(ch, x, y);
      }

      s.y += s.speed;

      if ((s.y - STREAM_LENGTH) * fontSize > canvas.height) {
        usedCols.delete(s.col);
        streams.splice(i, 1);
      }
    }

    ensureStreams();
    requestAnimationFrame(drawFrame);
  }

  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 3; i++) spawnStream(); // seed a few streams
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(drawFrame);