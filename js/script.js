(() => {
  const progress = document.getElementById("scrollProgress");
  const progressBar = document.getElementById("scrollProgressBar");
  const backToTop = document.getElementById("backToTop");
  const chapterSections = Array.from(document.querySelectorAll("[data-chapter]"));
  const chapterLinks = Array.from(document.querySelectorAll("[data-chapter-link]"));
  const navMenu = document.getElementById("navMenu");

  if (!progress || !progressBar || !backToTop || chapterSections.length !== 7) {
    throw new Error("SEAN scroll navigation is missing required page elements.");
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
      throw new RangeError(`Unknown SEAN chapter: ${chapterId}`);
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

    media.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      mobile: "(max-width: 767.98px)",
      desktop: "(min-width: 768px)"
    }, context => {
      if (context.conditions.reduceMotion) {
        return;
      }

      const timeline = window.gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: chapterId === "07" ? "bottom 80%" : "bottom 18%",
          scrub: context.conditions.mobile ? false : 0.5,
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true
        }
      });
      chapterTimelines.set(chapterId, timeline);
      const cleanupBuilder = buildTimeline({
        timeline,
        section,
        conditions: context.conditions,
        ScrollTrigger: window.ScrollTrigger
      });

      return () => {
        if (typeof cleanupBuilder === "function") {
          cleanupBuilder();
        }
        if (timeline.scrollTrigger) {
          timeline.scrollTrigger.kill();
        }
        timeline.kill();
        chapterTimelines.delete(chapterId);
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

  function registerEnvironmentalWind() {
    if (!window.gsap || !window.ScrollTrigger) {
      return;
    }

    const root = document.documentElement;
    const mainContent = document.getElementById("mainContent");
    if (!mainContent) {
      throw new Error("SEAN environmental motion is missing the main content region.");
    }

    const media = window.gsap.matchMedia();
    media.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      mobile: "(max-width: 767.98px)",
      desktop: "(min-width: 768px)"
    }, context => {
      if (context.conditions.reduceMotion) {
        return;
      }

      const wind = window.gsap.timeline({
        scrollTrigger: {
          trigger: mainContent,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true
        }
      });
      wind.to(root, {
        "--hiraya-wind-light": "0.5deg",
        "--hiraya-wind-medium": "0.8deg",
        "--hiraya-wind-strong": "1.2deg",
        duration: 0.24,
        ease: "none"
      }, 0.08);
      wind.to(root, {
        "--hiraya-wind-light": "0.2deg",
        "--hiraya-wind-medium": "0.38deg",
        "--hiraya-wind-strong": "0.62deg",
        duration: 0.24,
        ease: "none"
      }, 0.38);
      wind.to(root, {
        "--hiraya-wind-light": "0.45deg",
        "--hiraya-wind-medium": "0.72deg",
        "--hiraya-wind-strong": "1.05deg",
        duration: 0.24,
        ease: "none"
      }, 0.68);

      return () => {
        if (wind.scrollTrigger) {
          wind.scrollTrigger.kill();
        }
        wind.kill();
        root.style.removeProperty("--hiraya-wind-light");
        root.style.removeProperty("--hiraya-wind-medium");
        root.style.removeProperty("--hiraya-wind-strong");
      };
    });

    chapterAnimationDisposers.set("environmental-wind", () => {
      media.revert();
      chapterAnimationDisposers.delete("environmental-wind");
    });
  }

  function registerSceneMotionObserver() {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("motion-offscreen", !entry.isIntersecting);
      });
    }, { rootMargin: "120px 0px" });

    chapterSections.forEach(section => observer.observe(section));
    window.addEventListener("pagehide", event => { if (!event.persisted) observer.disconnect(); });
  }

  function registerEnchantedPointer() {
    const cursor = document.getElementById('enchantedCursor');
    if (!cursor || !window.matchMedia) {
      return;
    }

    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let animationFrame = null;
    let initialized = false;
    let targetX = -64;
    let targetY = -64;
    let currentX = -64;
    let currentY = -64;

    function isEnabled() {
      return finePointer.matches && !reduceMotion.matches;
    }

    function syncPointerMode() {
      const enabled = isEnabled();
      root.classList.toggle('enchanted-pointer-ready', enabled && initialized);
      if (!enabled) {
        cursor.classList.remove('is-visible', 'is-interactive', 'is-pressed');
        if (animationFrame !== null) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      }
    }

    function renderPointer() {
      currentX += (targetX - currentX) * 0.34;
      currentY += (targetY - currentY) * 0.34;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        animationFrame = window.requestAnimationFrame(renderPointer);
      } else {
        animationFrame = null;
      }
    }

    function movePointer(event) {
      if (!isEnabled()) {
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!initialized) {
        currentX = targetX;
        currentY = targetY;
        initialized = true;
      }
      cursor.classList.add('is-visible');
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(renderPointer);
      }
    }

    function updateInteractiveState(event) {
      if (!isEnabled() || !(event.target instanceof Element)) {
        return;
      }
      cursor.classList.toggle(
        'is-interactive',
        Boolean(event.target.closest('a, button, input, textarea, select, label, [role=tab]'))
      );
    }

    function hidePointer(event) {
      if (!event.relatedTarget) {
        cursor.classList.remove('is-visible', 'is-interactive', 'is-pressed');
      }
    }

    function pressPointer() {
      if (isEnabled()) {
        cursor.classList.add('is-pressed');
      }
    }

    function releasePointer() {
      cursor.classList.remove('is-pressed');
    }

    syncPointerMode();
    finePointer.addEventListener('change', syncPointerMode);
    reduceMotion.addEventListener('change', syncPointerMode);
    window.addEventListener('pointermove', movePointer, { passive: true });
    window.addEventListener('pointerout', hidePointer, { passive: true });
    window.addEventListener('pointerdown', pressPointer, { passive: true });
    window.addEventListener('pointerup', releasePointer, { passive: true });
    document.addEventListener('pointerover', updateInteractiveState, { passive: true });

    window.addEventListener('pagehide', event => {
      if (event.persisted) return;
      finePointer.removeEventListener('change', syncPointerMode);
      reduceMotion.removeEventListener('change', syncPointerMode);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('pointerout', hidePointer);
      window.removeEventListener('pointerdown', pressPointer);
      window.removeEventListener('pointerup', releasePointer);
      document.removeEventListener('pointerover', updateInteractiveState);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      root.classList.remove('enchanted-pointer-ready');
    }, { once: true });
  }

  chapterLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (!navMenu || !navMenu.classList.contains("show") || !window.bootstrap) {
        return;
      }

      window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    });
  });

  if (window.gsap && window.ScrollTrigger) {
    const villageWorld = document.getElementById("villageWorld");
    const villageHouse = document.querySelector(".village-house");
    const villageBook = document.querySelector(".village-book-reveal");
    const identityBook = document.getElementById("identityBook");

    if (!villageWorld || !villageHouse || !villageBook || !identityBook) {
      throw new Error("SEAN chapter animations are missing required scene elements.");
    }

    registerChapterAnimation("01", ({ timeline }) => {
      timeline.to(villageWorld, {
        scale: 1.16,
        transformOrigin: "50% 58%",
        ease: "none"
      }, 0);
      timeline.to(villageHouse, {
        y: -12,
        scale: 1.04,
        transformOrigin: "center bottom",
        ease: "none"
      }, 0);
      timeline.to(villageBook, {
        y: -16,
        scale: 1.04,
        ease: "none"
      }, 0.3);
    });

    registerChapterAnimation("02", ({ timeline, section }) => {
      const cover = section.querySelector(".storybook-cover");
      const pageTurns = Array.from(section.querySelectorAll(".storybook-page-turn"));
      if (!cover || pageTurns.length !== 3) {
        throw new Error("SEAN storybook animation is missing its cover or page turns.");
      }

      section.classList.add("storybook-motion-ready");
      timeline.fromTo(cover, { rotateY: 0 }, {
        rotateY: -155,
        ease: "none"
      }, 0);
      pageTurns.forEach((pageTurn, index) => {
        timeline.fromTo(pageTurn, { rotateY: 0 }, {
          rotateY: -155,
          ease: "none"
        }, 0.2 + index * 0.26);
      });

      return () => section.classList.remove("storybook-motion-ready");
    });

    registerChapterAnimation("03", ({ timeline, section }) => {
      const milestones = Array.from(section.querySelectorAll(".education-card"));
      if (milestones.length !== 5) {
        throw new Error("SEAN education path must contain five milestones.");
      }

      timeline.fromTo(milestones, {
        y: 24,
        autoAlpha: 0.72
      }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        ease: "none"
      }, 0);
    });

    registerChapterAnimation("04", ({ timeline, section }) => {
      const guardians = Array.from(section.querySelectorAll(".guardian-card"));
      const skillsPanels = Array.from(section.querySelectorAll(".skills-panel"));
      if (guardians.length !== 5 || skillsPanels.length !== 2) {
        throw new Error("SEAN digital sanctuary is missing its focus areas or skills panels.");
      }

      timeline.fromTo(guardians, {
        y: 22,
        autoAlpha: 0.72
      }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.08,
        ease: "none"
      }, 0);
      timeline.fromTo(skillsPanels, {
        y: 18,
        autoAlpha: 0.78
      }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        ease: "none"
      }, 0.25);
    });

    registerChapterAnimation("05", ({ timeline, section }) => {
      const treeArtwork = section.querySelector(".tree-artwork");
      const branchTabs = Array.from(section.querySelectorAll(".tree-branch-tab"));
      if (!treeArtwork || branchTabs.length !== 5) {
        throw new Error("SEAN magical tree is missing its scene or five branch controls.");
      }

      timeline.to(treeArtwork, {
        scale: 1.08,
        transformOrigin: "50% 60%",
        ease: "none"
      }, 0);
    });

    registerChapterAnimation("06", ({ timeline, section }) => {
      const topics = Array.from(section.querySelectorAll("[data-beyond-topic]"));
      const discoveries = Array.from(section.querySelectorAll(".discovery-artifact"));
      const scenes = Array.from(section.querySelectorAll(".beyond-scene, .discovery-sky"));
      if (topics.length !== 3 || discoveries.length !== 5 || scenes.length !== 3) {
        throw new Error("SEAN beyond-the-classroom chapter must contain three topics and five discoveries.");
      }

      timeline.fromTo(scenes, {
        y: 14,
        scale: 1.025
      }, {
        y: 0,
        scale: 1,
        stagger: 0.12,
        ease: "none"
      }, 0);
      timeline.fromTo(topics, {
        y: 22
      }, {
        y: 0,
        stagger: 0.12,
        ease: "none"
      }, 0);
      timeline.fromTo(discoveries, {
        y: 12
      }, {
        y: 0,
        stagger: 0.08,
        ease: "none"
      }, 0.45);
    });

    registerChapterAnimation("07", ({ timeline, section }) => {
      const storyLines = Array.from(section.querySelectorAll("[data-final-story]"));
      const bookCovers = Array.from(section.querySelectorAll(".final-book__cover"));
      const clearing = section.querySelector(".final-clearing");
      if (storyLines.length !== 6 || bookCovers.length !== 2 || !clearing) {
        throw new Error("SEAN final chapter is missing its six story lines, book covers, or forest clearing.");
      }

      timeline.fromTo(storyLines, {
        y: 16,
        autoAlpha: 0.4
      }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.2,
        duration: 0.65,
        ease: "power1.out"
      }, 0);
      timeline.fromTo(bookCovers[0], {
        rotateY: -145
      }, {
        rotateY: 0,
        duration: 1.8,
        ease: "power2.inOut"
      }, 1.55);
      timeline.fromTo(bookCovers[1], {
        rotateY: 145
      }, {
        rotateY: 0,
        duration: 1.8,
        ease: "power2.inOut"
      }, 1.55);
      timeline.to(clearing, {
        scale: 1.025,
        transformOrigin: "50% 50%",
        ease: "none"
      }, 0);
    });
  }

  registerEnvironmentalWind();
  registerSceneMotionObserver();
  registerEnchantedPointer();

  const treeArchive = document.getElementById("treeArchive");
  const treeExplorer = document.getElementById("treeExplorer");
  const treeTabs = Array.from(document.querySelectorAll(".tree-branch-tab"));
  const treePanels = Array.from(document.querySelectorAll(".tree-branch-panel"));
  const treeDetail = document.getElementById("treeDetail");
  const treeReturn = document.getElementById("treeReturn");
  const treeDetailTitle = document.getElementById("treeDetailTitle");
  const treeDetailKind = document.getElementById("treeDetailKind");
  const treeDetailDescription = document.getElementById("treeDetailDescription");
  const treeProjectFields = document.getElementById("treeProjectFields");
  const treeDetailImage = document.getElementById("treeDetailImage");
  const treeImagePlaceholder = document.getElementById("treeImagePlaceholder");
  const treeImagePlaceholderText = treeImagePlaceholder
    ? treeImagePlaceholder.querySelector("p")
    : null;
  const treeImageCaption = document.getElementById("treeImageCaption");
  const treeGithubLink = document.getElementById("treeGithubLink");
  const treeGithubPlaceholder = document.getElementById("treeGithubPlaceholder");
  const treeDemoLink = document.getElementById("treeDemoLink");
  const treeDemoPlaceholder = document.getElementById("treeDemoPlaceholder");
  const treeProjectFieldsReady = [
    "treeDetailTechnologies",
    "treeDetailContribution",
    "treeDetailProblem",
    "treeDetailLessons"
  ].every(id => document.getElementById(id));

  if (
    !treeArchive || !treeExplorer || treeTabs.length !== 5 || treePanels.length !== 5
    || !treeDetail || !treeReturn || !treeDetailTitle || !treeDetailKind
    || !treeDetailDescription || !treeProjectFields || !treeDetailImage
    || !treeImagePlaceholder || !treeImagePlaceholderText || !treeImageCaption
    || !treeGithubLink || !treeGithubPlaceholder || !treeDemoLink
    || !treeDemoPlaceholder || !treeProjectFieldsReady
  ) {
    throw new Error("SEAN project archive is missing required tree controls or detail fields.");
  }

  let selectedTreeLeaf = null;

  function activateTreeBranch(tab, moveFocus) {
    const panelId = tab.getAttribute("aria-controls");
    const selectedPanel = document.getElementById(panelId);
    if (!selectedPanel || !treePanels.includes(selectedPanel)) {
      throw new Error(`SEAN project branch is missing its panel: ${panelId}`);
    }

    treeTabs.forEach(branchTab => {
      const isSelected = branchTab === tab;
      branchTab.setAttribute("aria-selected", String(isSelected));
      branchTab.tabIndex = isSelected ? 0 : -1;
    });
    treePanels.forEach(panel => {
      panel.hidden = panel !== selectedPanel;
    });
    if (moveFocus) {
      tab.focus();
    }
  }

  function setDetailLink(link, placeholder, url, label, fallback) {
    if (url) {
      link.href = url;
      link.textContent = label;
      link.hidden = false;
      placeholder.hidden = true;
      placeholder.textContent = "";
      return;
    }

    link.removeAttribute("href");
    link.textContent = "";
    link.hidden = true;
    placeholder.textContent = fallback;
    placeholder.hidden = false;
  }

  function showTreeLeaf(leaf) {
    const recordType = leaf.dataset.recordType;
    const title = leaf.dataset.title;
    const description = leaf.dataset.description;
    if (!title || !description || !["project", "achievement"].includes(recordType)) {
      throw new Error("SEAN archive leaf is missing its type, title, or description.");
    }

    treeDetailKind.textContent = recordType === "project" ? "Project leaf" : "Portfolio record";
    treeDetailTitle.textContent = title;
    treeDetailDescription.textContent = description;
    treeProjectFields.hidden = recordType !== "project";

    if (recordType === "project") {
      document.getElementById("treeDetailTechnologies").textContent =
        leaf.dataset.technologies || "[Add verified technologies.]";
      document.getElementById("treeDetailContribution").textContent =
        leaf.dataset.contribution || "[Describe your contribution.]";
      document.getElementById("treeDetailProblem").textContent =
        leaf.dataset.problem || "[Describe the problem addressed.]";
      document.getElementById("treeDetailLessons").textContent =
        leaf.dataset.lessons || "[Add lessons learned.]";
      setDetailLink(
        treeGithubLink,
        treeGithubPlaceholder,
        leaf.dataset.githubUrl,
        leaf.dataset.githubLabel || "Open GitHub profile",
        "No project-specific GitHub link is recorded. Add one if available."
      );
      setDetailLink(
        treeDemoLink,
        treeDemoPlaceholder,
        leaf.dataset.demoUrl,
        leaf.dataset.demoLabel || "Open live demo",
        "No verified live demo is recorded. Add one if available."
      );
    }

    if (leaf.dataset.image) {
      treeDetailImage.src = leaf.dataset.image;
      treeDetailImage.alt = leaf.dataset.imageAlt || title;
      treeDetailImage.hidden = false;
      treeImagePlaceholder.hidden = true;
      treeImageCaption.textContent = leaf.dataset.imageCaption || "";
      treeImageCaption.hidden = !treeImageCaption.textContent;
    } else {
      treeDetailImage.removeAttribute("src");
      treeDetailImage.alt = "";
      treeDetailImage.hidden = true;
      treeImagePlaceholder.hidden = false;
      treeImagePlaceholderText.textContent = recordType === "project"
        ? "A project screenshot is not included in the repository. Add a verified image when available."
        : "No supporting image is available for this portfolio record.";
      treeImageCaption.textContent = "";
      treeImageCaption.hidden = true;
    }

    if (selectedTreeLeaf) {
      selectedTreeLeaf.classList.remove("is-selected");
      selectedTreeLeaf.setAttribute("aria-pressed", "false");
    }
    selectedTreeLeaf = leaf;
    selectedTreeLeaf.classList.add("is-selected");
    selectedTreeLeaf.setAttribute("aria-pressed", "true");
    treeArchive.hidden = true;
    treeDetail.hidden = false;
    treeDetail.focus();
  }

  treeTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTreeBranch(tab, false));
    tab.addEventListener("keydown", event => {
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (index + 1) % treeTabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (index - 1 + treeTabs.length) % treeTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = treeTabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTreeBranch(treeTabs[nextIndex], true);
    });
  });

  treeArchive.addEventListener("click", event => {
    if (!(event.target instanceof Element)) {
      return;
    }
    const leaf = event.target.closest("[data-tree-leaf]");
    if (leaf && treeArchive.contains(leaf)) {
      showTreeLeaf(leaf);
    }
  });

  treeReturn.addEventListener("click", () => {
    treeDetail.hidden = true;
    treeArchive.hidden = false;
    if (selectedTreeLeaf) {
      selectedTreeLeaf.focus();
    }
  });

  treeDetail.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      treeReturn.click();
    }
  });

  window.addEventListener("scroll", scheduleScrollStateUpdate, { passive: true });
  window.addEventListener("resize", scheduleScrollStateUpdate, { passive: true });
  window.addEventListener("load", () => {
    updateScrollState();
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }, { once: true });
  window.addEventListener("pagehide", event => { if (!event.persisted) disposeChapterAnimations(); });

  window.SeanScroll = Object.freeze({
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
