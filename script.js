const loco = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
loco();

const tl = gsap.timeline();

tl.from(".loader-elem>h1", {
  y: 150,
  stagger: 0.4,
});

tl.from(".loader-elem>h2", {
  y: 150,
});

tl.from(".loader-process", {
  opacity: 0,
});

let = counter = 0;
const loaderCounter = document.querySelector(".loader-process>h1");
const myInterval = setInterval(() => {
  if (counter < 100) {
    counter++;
    loaderCounter.textContent = counter;
  } else {
    loaderAnimation();
    clearInterval(myInterval);
  }
}, 40);

let = counter1 = 0;

const loaderFontChanger = document.querySelector(".loader-font-changer");
let flag = 0;
const myInterval1 = setInterval(() => {
  if (counter1 < 4000) {
    counter1 += 800;
    if (flag === 0) {
      loaderFontChanger.classList.add("loader-font-changer1");
      loaderFontChanger.classList.remove("loader-font-changer2");
      flag = 1;
    } else {
      loaderFontChanger.classList.add("loader-font-changer2");
      loaderFontChanger.classList.remove("loader-font-changer1");

      flag = 0;
    }
  } else {
    clearInterval(myInterval1);
  }
}, 800);

function loaderAnimation() {
  tl.to(".loader>.loader-elem", {
    opacity: 0,
  });

  tl.to(".loader", {
    top: "-100vh",
    ease: "power3.inOut",
    duration: 1,
  });
}
