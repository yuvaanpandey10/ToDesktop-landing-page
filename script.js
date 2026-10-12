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

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return; // skip on touch devices / reduced motion

  const layers = Array.from(stepCard.querySelectorAll("[data-depth]")).map((el) => ({
    el,
    depth: parseFloat(el.dataset.depth),
    x: 0,
    y: 0,
  }));

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
      if (Math.abs(goalX - l.x) > 0.05 || Math.abs(goalY - l.y) > 0.05) moving = true;
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