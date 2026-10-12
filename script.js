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
