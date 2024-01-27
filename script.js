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

const fullLoaderAnimation = () => {
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
    page1Animation();
  }
};
fullLoaderAnimation();

function page1Animation() {
  tl.from(".page1-text>h1", {
    y: 150,
    stagger: {
      amount: 0.7,
    },
  });

  tl.from("nav", {
    delay: -0.4,
    opacity: 0,
  });
}

Shery.mouseFollower();
function page2Animation() {
  const page2VideoElem = document.querySelector(".page2-video");
  page2VideoElem.addEventListener("mouseenter", () => {
    gsap.to(".mousefollower", {
      opacity: 0,
    });
  });

  page2VideoElem.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
  });

  page2VideoElem.addEventListener("mousemove", (dets) => {
    gsap.to(".page2-cursor", {
      left: dets.x - 610,
      top: dets.y - 280,
    });
  });

  page2VideoElem.addEventListener("mouseleave", (dets) => {
    gsap.to(".page2-cursor", {
      left: "70%",
      top: "-15%",
    });
  });

  let flag = 0;

  const video = document.querySelector(".page2-video>video");
  page2VideoElem.addEventListener("click", () => {
    if (flag === 0) {
      video.play();
      gsap.to(video, {
        opacity: 1,
      });

      gsap.to(".page2-cursor", {
        scale: 0.6,
      });

      document.querySelector(
        ".page2-cursor"
      ).innerHTML = `<i class="ri-pause-line text-[2vw]"></i>`;

      flag = 1;
    } else {
      gsap.to(video, {
        opacity: 0,
      });
      video.pause();
      gsap.to(".page2-cursor", {
        scale: 1,
      });

      document.querySelector(
        ".page2-cursor"
      ).innerHTML = `<i class="ri-play-fill text-[2vw]"></i>`;
      flag = 0;
    }
  });
}

page2Animation();

function page3Animation() {
  const page3Elem1Title = document.querySelector(".page3-elem-title");
  page3Elem1Title.addEventListener("mouseenter", () => {
    gsap.to(".page3-elem-title>h3", {
      y: -40,
    });
  });
  page3Elem1Title.addEventListener("mouseleave", () => {
    gsap.to(".page3-elem-title>h3", {
      y: 0,
    });
  });

  const page3Elem1Title2 = document.querySelector(".page3-elem-title2");
  page3Elem1Title2.addEventListener("mouseenter", () => {
    gsap.to(".page3-elem-title2>h3", {
      y: -40,
    });
  });
  page3Elem1Title2.addEventListener("mouseleave", () => {
    gsap.to(".page3-elem-title2>h3", {
      y: 0,
    });
  });

  const page3Circle = document.querySelector(".page3-circle");
  page3Circle.addEventListener("mouseenter", () => {
    tl.to(".circle-text", {
      height: "100%",
      width: "100%",
    });
    tl.to(".circle-text>span", {
      opacity: 1,
    });
  });

  page3Circle.addEventListener("mouseleave", () => {
    tl.to(".circle-text>span", {
      opacity: 0,
    });
    tl.to(".circle-text", {
      height: "0%",
      width: "0%",
    });
  });
}
page3Animation();

if (
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  Shery.imageEffect(".page3-elem-img", {
    style: 5,
    // debug: true,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: "9", range: [-9999999, 9999999] },
      aspect: { value: 0.8431487050716809 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.12, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.44, range: [0, 2], _gsap: { id: 20 } },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}
