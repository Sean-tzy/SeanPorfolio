(() => {
  const progress = document.getElementById("scrollProgress");
  const progressBar = document.getElementById("scrollProgressBar");
  const backToTop = document.getElementById("backToTop");
  const chapterSections = Array.from(document.querySelectorAll("[data-chapter]"));
  const chapterLinks = Array.from(document.querySelectorAll("[data-chapter-link]"));
  const navMenu = document.getElementById("navMenu");

  if (!progress || !progressBar || !backToTop || chapterSections.length !== 7) {
    throw new Error("HIRAYA scroll navigation is missing required page elements.");
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  const chapterTimelines = new Map();
  const chapterAnimationDisposers = new Map();
  let activeChapterId = null;
  let scheduledFrame = null;

  function setActiveChapter(chapterId) {
    if (chapterId === activeChapterId) {
      return;
    }

    activeChapterId = chapterId;
    chapterLinks.forEach(link => {
      if (link.dataset.chapterLink === chapterId) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateScrollState() {
    const root = document.documentElement;
    const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 0);
    const scrollProgress = maxScroll === 0 ? 0 : Math.min(window.scrollY / maxScroll, 1);
    const percent = Math.round(scrollProgress * 100);

    progressBar.style.transform = `scaleX(${scrollProgress})`;
    if (progress.getAttribute("aria-valuenow") !== String(percent)) {
      progress.setAttribute("aria-valuenow", String(percent));
      progress.setAttribute("aria-valuetext", `${percent}%`);
    }

    backToTop.hidden = window.scrollY < 480;

    const activationLine = document.getElementById("mainNav").getBoundingClientRect().height
      + window.innerHeight * 0.35;
    let currentChapterId = chapterSections[0].dataset.chapter;

    chapterSections.forEach(section => {
      if (section.getBoundingClientRect().top <= activationLine) {
        currentChapterId = section.dataset.chapter;
      }
    });

    setActiveChapter(currentChapterId);
  }

  function scheduleScrollStateUpdate() {
    if (scheduledFrame !== null) {
      return;
    }

    scheduledFrame = window.requestAnimationFrame(() => {
      scheduledFrame = null;
      updateScrollState();
    });
  }

  function registerChapterAnimation(chapterId, buildTimeline) {
    const section = chapterSections.find(item => item.dataset.chapter === chapterId);
    if (!section) {
      throw new RangeError(`Unknown HIRAYA chapter: ${chapterId}`);
    }
    if (typeof buildTimeline !== "function") {
      throw new TypeError("A chapter timeline builder function is required.");
    }
    if (chapterAnimationDisposers.has(chapterId)) {
      throw new Error(`An animation is already registered for chapter ${chapterId}.`);
    }
    if (!window.gsap || !window.ScrollTrigger) {
      throw new Error("GSAP and ScrollTrigger are required for chapter animations.");
    }

    const media = window.gsap.matchMedia();
    let timeline = null;

    media.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      mobile: "(max-width: 767.98px)",
      desktop: "(min-width: 768px)"
    }, context => {
      if (context.conditions.reduceMotion) {
        return;
      }

      timeline = window.gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 18%",
          scrub: context.conditions.mobile ? false : 0.5,
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true
        }
      });
      chapterTimelines.set(chapterId, timeline);
      buildTimeline({
        timeline,
        section,
        conditions: context.conditions,
        ScrollTrigger: window.ScrollTrigger
      });

      return () => {
        if (timeline) {
          if (timeline.scrollTrigger) {
            timeline.scrollTrigger.kill();
          }
          timeline.kill();
          chapterTimelines.delete(chapterId);
          timeline = null;
        }
      };
    });

    const dispose = () => {
      media.revert();
      chapterAnimationDisposers.delete(chapterId);
    };
    chapterAnimationDisposers.set(chapterId, dispose);
    return dispose;
  }

  function disposeChapterAnimations() {
    Array.from(chapterAnimationDisposers.values()).forEach(dispose => dispose());
  }

  chapterLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (!navMenu || !navMenu.classList.contains("show") || !window.bootstrap) {
        return;
      }

      window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    });
  });

  window.addEventListener("scroll", scheduleScrollStateUpdate, { passive: true });
  window.addEventListener("resize", scheduleScrollStateUpdate, { passive: true });
  window.addEventListener("load", () => {
    updateScrollState();
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }, { once: true });
  window.addEventListener("pagehide", disposeChapterAnimations, { once: true });

  window.HirayaScroll = Object.freeze({
    registerChapterAnimation,
    refresh() {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
      scheduleScrollStateUpdate();
    },
    getCurrentChapter() {
      return activeChapterId;
    },
    getChapterTimeline(chapterId) {
      return chapterTimelines.get(chapterId) || null;
    }
  });

  updateScrollState();
})();
