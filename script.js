const navDialog = document.getElementById("nav-dialog");

function handleMenu() {
  navDialog.classList.toggle("hidden");
}

function setupIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
      scrollHandler();
      document.addEventListener("scroll", scrollHandler);
    } else {
      document.removeEventListener("scroll", scrollHandler);
    }
  };
  const intersectionObserver = new IntersectionObserver(intersectionCallback);

  intersectionObserver.observe(element);
  function scrollHandler() {
    //measure from the center of the screen, so movement is small
    const rect = element.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
    let translateX = distance * speed;

    //use isLTR so the rows move in opposite directions
    if (!isLTR) translateX = -translateX;

    element.style.transform = `translateX(${translateX}px)`;
    element.style.transition = "transform 0.2s ease-out";
  }
}

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

setupIntersectionObserver(line1, true, 0.05);
setupIntersectionObserver(line2, false, 0.05);
setupIntersectionObserver(line3, true, 0.05);

// ---- Step 1: smooth mouse-move parallax ----
(function () {
  const stepCard = document.getElementById("step-1");
  if (!stepCard) return;

  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!canHover || reduceMotion) return; // skip on touch devices / reduced motion

  const layers = Array.from(stepCard.querySelectorAll("[data-depth]")).map(
    (el) => ({
      el,
      depth: parseFloat(el.dataset.depth),
      x: 0,
      y: 0,
    }),
  );

  let targetX = 0;
  let targetY = 0;
  let running = false;

  function animate() {
    let moving = false;
    layers.forEach((l) => {
      const goalX = targetX * l.depth;
      const goalY = targetY * l.depth;
      // lerp = smooth easing toward the target
      l.x += (goalX - l.x) * 0.08;
      l.y += (goalY - l.y) * 0.08;
      if (Math.abs(goalX - l.x) > 0.05 || Math.abs(goalY - l.y) > 0.05)
        moving = true;
      // 'translate' property composes with Tailwind's own transforms
      l.el.style.translate = `${l.x.toFixed(2)}px ${l.y.toFixed(2)}px`;
    });
    if (moving) {
      requestAnimationFrame(animate);
    } else {
      running = false;
    }
  }

  function start() {
    if (!running) {
      running = true;
      requestAnimationFrame(animate);
    }
  }

  stepCard.addEventListener("mousemove", (e) => {
    const rect = stepCard.getBoundingClientRect();
    // normalize to -1 ... 1 from the center of the card
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    start();
  });

  stepCard.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    start();
  });
})();

// ---- Step 2: smooth mouse-move parallax ----
(function () {
  const card = document.getElementById("step-2");
  if (!card) return;

  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!canHover || reduceMotion) return;

  const layers = Array.from(card.querySelectorAll("[data-depth]")).map(
    (el) => ({
      el,
      depth: parseFloat(el.dataset.depth),
      x: 0,
      y: 0,
    }),
  );

  let targetX = 0;
  let targetY = 0;
  let running = false;

  function animate() {
    let moving = false;
    layers.forEach((l) => {
      const goalX = targetX * l.depth;
      const goalY = targetY * l.depth;
      l.x += (goalX - l.x) * 0.08;
      l.y += (goalY - l.y) * 0.08;
      if (Math.abs(goalX - l.x) > 0.05 || Math.abs(goalY - l.y) > 0.05)
        moving = true;
      l.el.style.translate = `${l.x.toFixed(2)}px ${l.y.toFixed(2)}px`;
    });
    if (moving) requestAnimationFrame(animate);
    else running = false;
  }

  function start() {
    if (!running) {
      running = true;
      requestAnimationFrame(animate);
    }
  }

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    start();
  });

  card.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    start();
  });
})();

// ---- Step 3: smooth mouse-move parallax ----
(function () {
  const card = document.getElementById("step-3");
  if (!card) return;

  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!canHover || reduceMotion) return;

  const layers = Array.from(card.querySelectorAll("[data-depth]")).map(
    (el) => ({
      el,
      depth: parseFloat(el.dataset.depth),
      x: 0,
      y: 0,
    }),
  );

  let targetX = 0,
    targetY = 0,
    running = false;

  function animate() {
    let moving = false;
    layers.forEach((l) => {
      const goalX = targetX * l.depth;
      const goalY = targetY * l.depth;
      l.x += (goalX - l.x) * 0.08;
      l.y += (goalY - l.y) * 0.08;
      if (Math.abs(goalX - l.x) > 0.05 || Math.abs(goalY - l.y) > 0.05)
        moving = true;
      l.el.style.translate = `${l.x.toFixed(2)}px ${l.y.toFixed(2)}px`;
    });
    if (moving) requestAnimationFrame(animate);
    else running = false;
  }

  function start() {
    if (!running) {
      running = true;
      requestAnimationFrame(animate);
    }
  }

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    start();
  });
  card.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    start();
  });
})();

// ---- Ticker: scroll down = slides left, scroll up = eases back right ----
(function () {
  const wrap = document.getElementById("marquee-wrap");
  const track = document.getElementById("marquee-track");
  if (!wrap || !track) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // repeat the items so the row never runs out of content
  const original = track.innerHTML;
  track.innerHTML = original + original + original;

  const SPEED = 0.6; // px moved per px scrolled (higher = faster)
  const EASE = 0.1; // lower = smoother / more lag
  let current = 0;
  let target = 0;
  let running = false;

  function measure() {
    const rect = wrap.getBoundingClientRect();
    // 0 when the row enters the bottom of the screen, grows as you scroll down
    const progress = Math.max(0, window.innerHeight - rect.top);
    const maxLeft = track.scrollWidth - wrap.clientWidth;
    target = -Math.min(progress * SPEED, maxLeft);
  }

  function tick() {
    current += (target - current) * EASE;
    track.style.transform = `translate3d(${current.toFixed(2)}px, 0, 0)`;
    if (Math.abs(target - current) > 0.1) requestAnimationFrame(tick);
    else running = false;
  }

  function onScroll() {
    measure();
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();

// ---- Pricing: Monthly / Yearly toggle ----
(function () {
  const toggle = document.getElementById("billing-toggle");
  if (!toggle) return;
  const buttons = toggle.querySelectorAll(".billing-btn");
  const prices = document.querySelectorAll(".price");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.billing; // "monthly" | "yearly"
      buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
      prices.forEach((p) => {
        p.textContent = p.dataset[mode];
      });
    });
  });
})();

// ---- FAQ accordion ----
(function () {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-btn");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
})();
