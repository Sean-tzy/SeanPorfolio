HIRAYA — GLOBAL DEVELOPMENT RULES

These rules apply to every development phase.

Work directly inside the existing repository.
Preserve the existing architecture unless changes are necessary.
Implement only the current requested phase.
Never attempt to implement all remaining phases simultaneously.
Do not remove previously completed functionality.
Do not fabricate personal information.
Keep the website a single-page portfolio.
Keep all nine academic content requirements intact.
Section 7 must contain exactly three topics.
Prioritize working functionality over decorative complexity.
Keep code modular, maintainable, and reusable.
Avoid unnecessary dependencies.
Test every major change before reporting completion.
Respect responsive design and reduced-motion preferences.
Never claim to have tested something that was not tested.
Maintain a record of completed phases and outstanding tasks.
If something is too complex for the current phase, implement a practical simplified version and document the limitation.
Do not proceed to the next phase until I explicitly authorize it.

At the end of each phase, report:

What was implemented.
Files created.
Files modified.
Tests performed.
Tests passed.
Known issues.
Remaining tasks.
Confirmation that previous functionality remains intact.

STOP after completing the current phase and wait for my approval.

CURRENT IMPLEMENTATION STATUS

Completed through Phase 10. No later phase has been started.

The static site entry point is `index.html`; styles and scripts are in `css/` and `js/`;
images remain in `assets/img/`. Phase 05 adds five editable education milestones,
the five digital-guardianship focus areas, skill categories, and the existing
competitions, organizations, and achievements as a distinct academic section.
Phase 06 adds an illustrated, keyboard-accessible magical tree archive with five
branch categories. Existing project details and evidence are retained; missing
contributions, screenshots, and project-specific links remain explicit placeholders.
Phase 07 adds exactly three “Beyond the Classroom” topics: hobbies and passions,
future aspirations, and five personal discoveries. Unknown personal details remain
editable placeholders. Phase 08 completes the violin-themed final chapter, verified
contact channels, return to HIRAYA, and footer; unprovided LinkedIn and motto details
remain placeholders. Phase 09 adds restrained environmental motion, scroll-linked
wind and parallax, and reduced-motion behavior across the seven chapters.

Phase 10 final QA verified all nine academic areas, the five education milestones,
five cybersecurity focus areas, exactly three Chapter 06 topics, and five personal
discoveries. The orphaned legacy education markup was removed. Navigation, scroll
progress, back-to-top, storybook turns, all five tree branches and 13 archive leaves,
contact links, mobile navigation/touch emulation, and keyboard controls were exercised.
Responsive checks at 360, 390, 575, 768, 991, 1024, 1440, and 1920 pixels found no
horizontal overflow or selected content-box spill. Image assets loaded, and the browser
reported no console errors or failed requests. The reduced-motion check found no
running animations or ScrollTriggers, and page-hide cleanup removed all active triggers.
CSS scene animations now pause outside the viewport; with the opening scene active at
1024 pixels, 13 CSS animations ran and none were running in off-screen chapters.

Personal details and credentials were checked against the original profile source;
no new biographical claims or accounts were added. Remaining user-editable items include
personal story/personality/inspiration, missing education dates and honors, additional
verified skills, detailed project contributions and links, future goals, other hobbies,
LinkedIn, and a personal motto. The contact form uses `mailto:` and therefore depends on
the visitor having a configured email application. Bootstrap and GSAP are loaded from
CDNs and require an internet connection. Accessibility was manually checked for labels,
keyboard access, focus, and image alternatives; no automated WCAG contrast scan was run.


My recommended workflow
Your development cycle

Send Phase 01 to Astra.
Review its repository audit.
Approve Phase 02.
Let Astra implement and test Phase 02.
Review the actual website in your browser.
Continue one phase at a time.
Fix issues before moving forward.
Finish with Phase 10 and push the final version to GitHub.

Prioritize a working, complete, and maintainable implementation over visual perfection. Every phase must have a clearly defined completion boundary. If the requested work cannot reasonably be completed in one development session, complete the highest-priority functional portion and document the remaining work.


MASTER DEVELOPMENT PROMPT
HIRAYA — THE DIGITAL ME
A Living Filipino Fairytale About Identity, Creativity, and Cybersecurity

You are an expert creative director, senior frontend developer, interaction designer, UI/UX designer, cinematic motion designer, and digital storyteller.

Your mission is to completely redesign and develop my existing personal portfolio website into an extraordinary, fully responsive, single-page cinematic personal portfolio.

This project must satisfy my professor's academic performance task while delivering a highly creative and technically impressive digital experience.

Do not treat this as an ordinary portfolio.

Do not treat it as a generic fantasy website.

Do not treat it as a cybersecurity dashboard.

I want these three identities to exist together:

My personal identity as a third-year BS Computer Science student.
My creative identity, inspired by Filipino folklore, nature, music, and whimsical storytelling.
My growing identity in cybersecurity, represented through the beauty of understanding and protecting digital environments.

The experience should feel like a beautifully animated fantasy film controlled by the visitor's scrolling.

The environment must feel alive.

The grass, trees, leaves, flowers, water, clouds, fireflies, lighting, and atmosphere should have subtle natural movements.

The camera should move through the environment as visitors scroll.

The website should tell a story without losing its purpose as an academic personal portfolio.

01. PROJECT AND ACADEMIC INFORMATION

This is an individual academic performance task.

Course: Application Development and Emerging Technologies

Program: BS Computer Science – Third Year

Topic: Responsive Web Design

Activity: THE DIGITAL ME: A Responsive Personal Portfolio Webpage

Submission Deadline: November 16, 2026

Repository:

https://github.com/Sean-tzy/SeanPorfolio.git

Mandatory academic requirements

The final website must include all nine required content areas:

Hero Section / Personal Introduction.
About Me.
Educational Background.
Skills and Technical Competencies.
Competitions, Organizations, and Achievements.
Work Experience / Projects / Practical Experience.
Beyond the Classroom: What Makes You Unique?
Contact and Social Media Links.
Footer.

Section 7 must contain exactly three selected topics:

My Hobbies and Passions.
My Dreams and Future Aspirations.
Five Things You Should Know About Me.

The website must demonstrate:

HTML5.
CSS3.
Bootstrap.
Flexbox.
CSS Grid.
CSS Media Queries.
Responsive layouts.
Desktop, tablet, and mobile compatibility.

These are academic requirements, not optional suggestions.

The website must remain a single-page portfolio, even though its storytelling is divided into cinematic chapters.

Do not create seven separate webpages.

02. THE CREATIVE IDENTITY
HIRAYA
The Art of Digital Guardianship

The word HIRAYA serves as the identity of the portfolio.

The experience should communicate imagination, aspirations, creativity, and the preservation of things that matter.

The central philosophy:

"Technology is not beautiful simply because of what it can create. It is beautiful because of what it allows us to protect, preserve, and understand."

I want to change the way people perceive cybersecurity.

Cybersecurity should not be represented exclusively through:

Hooded hackers.
Black terminal screens.
Neon-green text.
Red warning screens.
Aggressive digital interfaces.
Dark rooms filled with monitors.

Those visuals can be appropriate in certain technical contexts, but they should not define the entire identity of my portfolio.

Instead, show cybersecurity through the beauty of:

Digital protection.
Curiosity.
Investigation.
Knowledge.
Trust.
Resilience.
Responsible discovery.
Preserving digital information.
Understanding invisible systems.
Protecting people and their digital identities.

The central metaphor is an enchanted forest.

A forest is an interconnected ecosystem.

Every tree, root, branch, flower, and living organism contributes to its balance.

Similarly, digital systems contain interconnected components, information, people, and relationships.

Cybersecurity represents the responsibility of understanding and protecting that ecosystem.

Make this metaphor visually meaningful throughout the entire experience.

03. ART DIRECTION — A FILIPINO FAIRYTALE
The overall visual atmosphere

Imagine a magical world inspired by traditional Filipino landscapes and storytelling.

A traditional village rests between mountains.

A gentle breeze moves through the grass.

Sunlight filters through trees.

A bahay kubo stands near a beautiful garden.

An ancient wooden bridge crosses a peaceful stream.

Fireflies float through the air.

Somewhere deeper in the forest stands an enormous magical tree.

The tree contains an entire world within its roots, trunk, branches, and leaves.

The atmosphere should feel like entering a beautifully illustrated animated fantasy film.

The visual style should be:

Whimsical.
Magical.
Organic.
Calm.
Cinematic.
Nostalgic.
Elegant.
Dreamlike.
Mysterious.
Emotionally expressive.
Distinctly Filipino-inspired.

Use original fantasy artwork and thoughtful cultural references.

Take inspiration from traditional Filipino architecture, weaving, natural materials, tropical vegetation, Philippine landscapes, and folklore.

Use cultural elements respectfully. Do not combine sacred or distinct indigenous symbols carelessly.

Do not copy Disney characters, recognizable scenes, or existing copyrighted artwork. Use an original fairytale visual identity.

Color palette

Use a natural and cinematic palette.

Deep Forest: #102820
Forest Green: #183D32
Moss Green: #78876A
Sage: #A7B49A
Parchment: #F3EBDD
Soft Cream: #FAF5EA
Antique Gold: #C5A66A
Terracotta: #A65F45
Midnight Blue: #192B3A
Charcoal Brown: #302820

The environment should transition between warm and cool tones.

Opening: warm golden sunlight.

Storybook: parchment and antique gold.

Forest: deep emerald and moss green.

Cybersecurity sanctuary: forest green, muted gold, and midnight blue.

Magical tree: emerald, natural wood, and warm golden light.

Violin scene: warm amber and soft cream.

Ending: golden sunset.

Typography

Use elegant editorial serif typography for major storytelling headlines.

Use modern sans-serif typography for technical content and portfolio descriptions.

Use a restrained handwritten typeface for personal notes and annotations.

The typography must never compromise readability.

04. THE WORLD MUST FEEL ALIVE

THIS IS ONE OF THE MOST IMPORTANT REQUIREMENTS.

Do not create static backgrounds with a few floating particles.

I want the environment to feel like a real animated world.

Think of a 3D animated film with environmental motion, atmospheric depth, and carefully choreographed camera movement.

The animation should be subtle enough to feel natural but detailed enough that visitors notice the craftsmanship.

A. Grass animation

The grass must not look like a flat green surface.

Create multiple layers of grass:

Foreground grass.
Midground grass.
Background grass.
Individual taller blades.
Small clusters of wildflowers.
Decorative vegetation.

Each layer should respond differently to the wind.

Animation requirements:

Individual grass blades gently sway.
Nearby grass moves slightly more than distant grass.
Wind movement travels in waves across the environment.
Grass blades have slightly different movement speeds.
Some taller blades bend more noticeably.
Small flowers move with the grass.
Grass movement should feel organic rather than synchronized.
Wind should occasionally become stronger during scene transitions.
Foreground grass should provide additional depth.
The grass should never look like it is vibrating or shaking randomly.

Use layered illustrations, CSS transforms, SVG animation, or lightweight shader effects where appropriate.

Avoid rendering thousands of unnecessary DOM elements.

B. Tree animation

Trees are major environmental landmarks.

Each tree should have multiple visual layers:

Trunk.
Main branches.
Secondary branches.
Leaves.
Foreground foliage.
Background foliage.

Animate them independently.

Required behavior:

Branches gently sway.
Leaves move with the wind.
Individual leaves occasionally fall.
Small leaves rotate naturally while falling.
Branches move with different amplitudes.
Distant trees move more subtly.
Foreground trees can move slightly faster through parallax.
Sunlight should pass between leaves.
Shadows should change subtly.
Some magical leaves may emit a very restrained golden glow.

Do not make the entire tree rotate or bounce.

The animation must communicate weight and natural movement.

C. Wind system

Create a consistent environmental wind direction.

The wind should affect:

Grass.
Flowers.
Leaves.
Tree branches.
Hanging decorations.
Small fabric elements.
Floating particles.

Wind intensity should occasionally change.

During peaceful scenes, the wind should be gentle.

During magical transitions, the wind can become slightly stronger.

During dramatic cybersecurity scenes, the environment can respond with a more powerful gust.

Use coordinated animation timing rather than unrelated random animations.

D. Firefly animation

Fireflies should appear throughout the forest.

Each firefly should:

Have an individual movement path.
Drift slowly.
Change direction naturally.
Pulse gently.
Have different brightness levels.
Move at different depths.
Occasionally gather around magical objects.
Avoid flashing aggressively.

The glow should illuminate nearby surroundings subtly where technically practical.

Use efficient particle systems.

E. Flowers and vegetation

Add environmental details such as:

Small wildflowers.
Ferns.
Moss.
Hanging vines.
Large tropical leaves.
Delicate flowering plants.
Small plants near tree roots.

Animate these elements with subtle wind movement.

Some flowers may gently open during the golden-hour transition.

Avoid excessive decorative elements.

Every environmental detail should support the composition.

F. Clouds and sky

The sky should have slow-moving clouds.

Create:

Soft atmospheric clouds.
Distant mountain silhouettes.
Subtle changes in sunlight.
Warm golden-hour gradients.
Occasional floating particles.
Light haze.

Cloud movement should be slow.

The sky should change gradually as the story progresses.

G. Water animation

Where streams or ponds appear:

Add subtle ripples.
Create soft reflections.
Allow sunlight to shimmer across the water.
Add occasional small floating leaves.
Use gentle movement.

Water should feel peaceful and natural.

H. Lighting and atmosphere

Lighting is essential.

Use:

Volumetric-light-inspired rays.
Warm sunlight.
Soft shadows.
Atmospheric fog.
Depth haze.
Golden highlights.
Ambient environmental lighting.
Subtle light transitions.

Sunlight should appear to pass through trees.

Light rays should be visible where the composition allows.

Avoid excessive bloom and overexposed glowing effects.

I. Environmental audio

Do not autoplay sound.

If optional ambient audio is added, provide a visible sound toggle.

Possible sounds:

Gentle wind.
Birds.
Leaves rustling.
Water.
Soft forest ambience.
Original instrumental music.

Sound must remain optional.

Respect browser autoplay restrictions.

Do not reproduce copyrighted music.

05. CINEMATIC CAMERA AND SCROLL SYSTEM

The visitor should feel like they are controlling a camera through an animated movie.

Scrolling should control the progression of the visual experience.

The website must not simply reveal stacked content sections.

Camera behavior

Create cinematic camera movements such as:

Slow dolly forward.
Gentle zoom.
Pan across the environment.
Parallax depth movement.
Gradual vertical movement.
Focus transitions.
Foreground object reveals.
Environment-to-environment transitions.

For every chapter, define a scroll-controlled animation timeline.

Use GSAP and ScrollTrigger where compatible with the existing architecture.

Use CSS 3D transforms for the storybook.

Use Three.js selectively if a real 3D scene adds meaningful value.

Do not introduce complex 3D rendering just to make the website technically impressive.

A carefully composed 2.5D environment with layered artwork is acceptable and may perform better.

Scroll interaction requirements
Scrolling forward progresses the scene.
Scrolling backward reverses the scene.
Camera movement remains synchronized with scroll progress.
Transitions should not abruptly jump between environments.
Pinned scenes must have a deliberate duration.
Navigation links must move to the correct chapter.
Users must not become trapped in an animation.
Native scrolling and browser navigation must remain functional.
Mobile should use shorter or simplified animations.
Reduced-motion preferences must be respected.
The cinematic principle

The visitor should feel that the website is a film whose timeline they control.

The scroll wheel becomes the timeline controller.

The camera becomes the storytelling device.

The environment becomes the narrator.

The actual portfolio content becomes the story.

06. CHAPTER ONE — THE ENCHANTED BEGINNING
Hero and personal introduction

The experience begins with a wide cinematic view of a traditional Filipino-inspired village.

Environment composition

Foreground:

Tall grass.
Small flowers.
Leaves.
Gentle environmental movement.

Midground:

A traditional bahay kubo-inspired house.
A wooden pathway.
Tropical vegetation.
A small stream or garden.

Background:

Mountains.
Forest.
Warm sky.
Slow-moving clouds.

Add atmospheric depth between each layer.

The scene should feel like a beautiful illustrated landscape that has come to life.

Required personal content

Display:

My complete name or preferred professional name.
My personal photograph.
My tagline.
My academic identity.
My brief introduction.

Academic identity:

"Third-Year BS Computer Science Student"

Suggested headline:

"Between the art of protection and the beauty of discovery."

Suggested introduction:

"I am a Computer Science student fascinated by technology, creativity, and the hidden systems that shape our digital world. My curiosity draws me toward cybersecurity, where understanding, exploration, and protection come together."

Treat this as editable draft content.

My actual photograph is mandatory.

If no personal photograph exists in the repository, create a clearly labeled image placeholder.

Do not replace my real photograph with a fictional person or generic AI portrait.

Camera movement

At the beginning, the camera is positioned far away from the village.

As the visitor scrolls:

The camera slowly approaches the village.
Foreground grass moves with parallax.
Leaves occasionally pass in front of the camera.
The house becomes larger.
Sunlight filters through the foliage.
The camera approaches the wooden house.
A mysterious antique book becomes visible.
The camera gradually focuses on the book.

Display:

"Every journey begins with a story."

The antique book becomes the transition into Chapter Two.

07. CHAPTER TWO — THE STORYBOOK OF IDENTITY
About Me

The camera enters the traditional house.

Inside, there is a wooden table with an antique book.

The room should have:

Warm wooden textures.
Traditional craftsmanship-inspired details.
Soft window lighting.
Floating dust particles.
Delicate shadows.
A peaceful atmosphere.

The book should become the main visual focus.

Book design

Create a realistic antique storybook.

Details:

Aged leather cover.
Detailed spine.
Thick parchment pages.
Slightly curved page edges.
Realistic shadows.
Warm paper texture.
Subtle golden decorations.
Elegant typography.
Delicate Filipino-inspired border motifs.

The book should open through a cinematic sequence.

Scroll-controlled page turning

This is a signature interaction.

The user should turn the book pages by scrolling.

Do not simply replace the content on each scroll.

Create a page-turning effect with:

3D rotation.
Perspective.
Realistic shadows.
Curved page appearance.
Page thickness.
Appropriate stacking.
Controlled lighting.

The page-turning animation should be synchronized with scroll progress.

Scrolling backward should reverse the page-turning animation.

About Me content

Include:

Personal background.
Brief life story.
Personality traits.
Personal values.
Strengths.
Weaknesses.
What motivates me.
What inspires me.
Personal philosophy.
Something people would not normally know about me.

Make the information personal and genuine.

Do not repeat the hero introduction.

Use placeholders for missing information.

The book should feel like someone is discovering the actual person behind the portfolio.

08. CHAPTER THREE — THE PATH OF KNOWLEDGE
Educational background

As the final storybook page turns, the paper texture transforms into a beautiful forest pathway.

The pathway represents my educational journey.

Environment
A winding natural pathway.
Tall trees.
Small flowers.
Soft grass.
Sunlight between branches.
Wooden signposts.
Floating particles.
Distant mountains.
Required educational milestones

Display:

Elementary Education.
Junior High School.
Senior High School and strand.
Current College or University.
BS Computer Science — Third Year.

For every milestone, provide:

School name.
Location, where appropriate.
Academic year.
Grade level or program.
Academic distinctions.
Honors or recognitions, if applicable.

Do not fabricate educational information.

Use clearly labeled editable placeholders.

Visual design

Represent each educational stage as a small landmark along the path.

For example:

Elementary: A small wooden gate.
Junior High: A stone pathway.
Senior High: A bridge.
College: A large tree with books and illuminated details.

These are visual metaphors, not literal claims about my educational history.

Scroll behavior

The camera travels along the path.

Each milestone appears as the camera reaches it.

Use smooth transitions, parallax, and controlled typography reveals.

The education information must remain easy to read.

09. CHAPTER FOUR — THE SANCTUARY OF DIGITAL GUARDIANS
Skills and technical competencies

The forest gradually becomes more mysterious.

A large sanctuary appears.

Its architecture should combine natural materials and carefully designed geometric details.

The sanctuary represents the interconnected world of technology.

Its design should communicate protection, balance, curiosity, and responsibility.

Display:

"Every system has a story. Every vulnerability has a lesson. Every defense is an act of care."

Technical skills

Create organized categories for:

Programming languages.
Web development.
HTML.
CSS.
JavaScript.
Bootstrap.
Databases.
Networking.
Operating systems.
Linux.
Cybersecurity fundamentals.
Development tools.
Other actual technical skills.

Only display actual skills supported by my existing content or clearly mark them as editable placeholders.

Personal and professional skills

Include:

Communication.
Teamwork.
Problem-solving.
Critical thinking.
Creativity.
Time management.
Adaptability.
Leadership, if applicable.
Cybersecurity as an art

Create five visual areas inside the sanctuary.

1. Digital Guardianship

Represents defensive security.

Visual metaphor:

A beautiful protective structure with warm light surrounding it.

Actual content:

System protection.
Security fundamentals.
Access control.
Security awareness.
Defensive security concepts.
2. The Art of Investigation

Represents digital investigation.

Visual metaphor:

An illuminated archive with information connected through golden threads.

Actual content:

Digital forensics.
Log analysis.
Threat investigation.
Evidence preservation.
Suspicious activity analysis.
3. The Hidden Threads

Represents infrastructure and networking.

Visual metaphor:

Golden threads connecting different structures across the forest.

Actual content:

Networking.
Linux.
System administration.
Infrastructure.
Understanding interconnected systems.
4. The Quiet Watch

Represents monitoring and detection.

Visual metaphor:

An observatory overlooking the forest.

Actual content:

Security monitoring.
Detection.
Incident response.
Vulnerability management.
Continuous improvement.
5. The Art of Discovery

Represents ethical security research.

Visual metaphor:

An ancient locked gate that is carefully studied and understood.

Actual content:

Ethical hacking.
Penetration testing.
Responsible vulnerability research.
Security testing.
Understanding system weaknesses.

These categories describe interests and learning areas, not automatically professional expertise.

Keep technical information accurate and editable.

Visual presentation

Use elegant information panels.

Do not turn the sanctuary into a terminal dashboard.

Cybersecurity should feel like the art of understanding an intricate ecosystem.

10. CHAPTER FIVE — THE GREAT MAGICAL TREE
The centerpiece of the entire portfolio

THIS IS THE MOST IMPORTANT VISUAL LANDMARK.

I want a gigantic ancient magical tree standing in the center of an enchanted forest.

It should be enormous, majestic, beautiful, and mysterious.

The tree should visually represent my projects, accomplishments, skills, academic experiences, and personal development.

The tree is not simply a background illustration.

It is an interactive portfolio environment.

Visitors should feel like they are exploring an ancient living archive.

Tree environment

The tree stands in a beautiful forest clearing.

Its surroundings include:

Tall grass.
Wildflowers.
Moss-covered stones.
Small plants.
Glowing roots.
Floating leaves.
Fireflies.
Small mushrooms.
Gentle mist.
Warm sunlight.
Distant forest layers.

The tree should occupy the central visual composition.

Its trunk should be massive.

Its branches should extend across the scene.

Its roots should spread naturally across the ground.

Its crown should fill a large portion of the screen.

Tree animation

The tree must feel alive.

Animate:

Branches gently swaying.
Individual leaves moving in the wind.
Small leaves falling occasionally.
Subtle movement in vines.
Fireflies gathering around the trunk.
Golden light moving through the roots.
Soft illumination around selected branches.
Small particles traveling upward.
Subtle changes in the tree's lighting.
Grass and flowers responding to wind.
Background trees moving at different parallax speeds.
Light rays filtering through the canopy.

The trunk should remain stable and feel massive.

Do not animate the entire tree like a floating object.

The roots — My foundation

The roots represent the foundations of my identity.

Use the roots to introduce:

My personal background.
My education.
My values.
My foundational technical knowledge.
My curiosity.
My learning journey.

Visually, glowing lines can travel gently through the roots toward the trunk.

This represents how experiences and knowledge support future growth.

The trunk — My identity

The trunk represents the central identity of the portfolio.

Display:

HIRAYA

THE DIGITAL ME

Include a brief statement:

"Everything I learn becomes part of the person I am becoming."

The trunk should feel strong, grounded, and natural.

The branches — My projects and achievements

Every major branch represents a category of work or experience.

Create these categories:

Academic Projects.
Personal Projects.
Cybersecurity Projects.
Competitions and Organizations.
Achievements and Certifications, when applicable.

Do not invent project names or accomplishments.

Use actual projects from my repository or clearly labeled placeholders.

The leaves — My individual projects

Each leaf or illuminated artifact represents an individual project.

When visitors approach or select a project leaf:

The leaf becomes illuminated.
A subtle particle effect appears.
The camera gently zooms toward the selected branch.
An elegant project information panel appears.
The panel displays the actual project information.

Each project panel must contain:

Project title.
Description.
Technologies used.
My specific contribution.
Problems addressed.
What I learned.
Screenshot or visual preview.
GitHub repository link.
Live demo link, if available.

Provide functional links.

Do not fabricate screenshots or project details.

If a project has no screenshot, use a suitable illustration or neutral project placeholder.

Interactive tree exploration

Create an interactive experience.

Visitors should be able to:

Hover over branches.
Select illuminated leaves.
Explore project artifacts.
Open project details.
Navigate between project categories.
Return to the main tree view.

Do not require precise hovering on mobile.

On touch devices, provide tappable branch and leaf targets.

The tree must remain visually beautiful when no project is selected.

The cybersecurity symbolism of the tree

The tree represents a digital ecosystem.

Explain through the visual experience:

Roots: foundations and infrastructure.
Trunk: core systems and identity.
Branches: interconnected services and applications.
Leaves: information and individual projects.
Protective light: security and resilience.
Forest ecosystem: people and the environments technology serves.

Do not imply that this metaphor is a literal cybersecurity architecture.

It is an artistic representation.

Scroll-controlled camera journey

As the visitor scrolls toward the tree:

The camera approaches the forest clearing.
Foreground grass moves past the camera.
The tree gradually becomes visible.
The camera moves toward the trunk.
The view expands to reveal the branches.
Individual project artifacts become illuminated.
The visitor explores the archive.
The camera slowly pulls back.
The tree becomes the transition into the next chapter.

This scene should feel like a cinematic reveal.

11. CHAPTER SIX — BEYOND THE CLASSROOM
Required creative section

This section must show who I am outside academic requirements.

Use exactly three topics.

A. MY HOBBIES AND PASSIONS

Create a beautiful garden-like environment.

Include editable information about:

Hobbies.
Music.
Creative interests.
Activities outside technology.
Things I genuinely enjoy.
Personal passions.

Use the violin as a visual motif.

The violin represents the relationship between creativity, discipline, emotion, and personal expression.

Do not claim that I am a professional musician or violinist unless confirmed.

B. MY DREAMS AND FUTURE ASPIRATIONS

Create a cinematic mountain landscape.

A winding path leads toward a distant horizon.

Include:

My dream career.
Cybersecurity aspirations.
The professional I hope to become.
Skills I want to develop.
Long-term goals.
My desired future.
The impact I hope to make.

Suggested statement:

"I want to become someone whose knowledge is not measured only by what I can discover, but also by what I can protect."

Use editable personal information.

C. FIVE THINGS YOU SHOULD KNOW ABOUT ME

Present five discoveries as small enchanted artifacts.

Each artifact contains:

Something that makes me curious.
Something I deeply value.
Something people might not expect about me.
Something that inspires me.
Something I hope to accomplish.

These must be actual personal details.

Do not invent my experiences or characteristics.

Scroll behavior

The camera moves between three connected environments.

Each topic receives its own visual composition.

Use smooth transitions, subtle movement, and restrained animation.

This chapter should feel more personal and intimate than the technical chapters.

12. CHAPTER SEVEN — THE VIOLIN AND THE FINAL CHAPTER
The emotional conclusion

The environment becomes quiet.

The visitor enters a peaceful forest clearing.

A beautifully illustrated violin rests in the scene.

Warm golden sunlight illuminates the environment.

Leaves drift slowly.

Fireflies move gently.

The grass continues to sway.

The atmosphere feels reflective.

Display:

"Cybersecurity is like a violin."

"Sometimes it whispers through quiet observation."

"Sometimes it speaks through sharp intervention."

"Sometimes it protects silently, unseen by the world."

"But whether gentle or powerful, its purpose is harmony."

"To understand. To protect. To preserve."

The text should appear gradually through scroll-controlled animation.

Do not autoplay music.

If sound is available, make it optional.

Contact information

Transition from the violin scene to the final landscape.

Include:

Professional email.
GitHub.
LinkedIn.
Other professional platforms.
Optional social media.

Only display information I provide and approve.

Final message

"Every story deserves to be protected. Every journey deserves a beginning."

"Thank you for wandering through my little corner of the digital world."

Footer

Include:

My name.
Personal motto.
Copyright notice.

Example:

© 2026 [Your Name]. All Rights Reserved.

The antique book slowly closes.

The screen returns to the HIRAYA identity.

End peacefully.

13. NAVIGATION SYSTEM

Create a minimal, elegant navigation system.

Include:

HIRAYA wordmark.
Chapter navigation.
Current chapter indicator.
Scroll progress.
Back-to-top interaction.
Skip-to-content action.

Chapter labels:

01 — The Beginning

02 — The Storybook

03 — The Path of Knowledge

04 — The Sanctuary

05 — The Magical Tree

06 — Beyond the Classroom

07 — The Final Chapter

The navigation should remain readable and unobtrusive.

Visitors must be able to navigate directly to all required content.

Navigation must work on mobile and desktop.

14. RESPONSIVE WEB DESIGN — MANDATORY ACADEMIC REQUIREMENT

Do not sacrifice the academic requirements for cinematic effects.

The website must demonstrate the following technologies:

HTML5.
CSS3.
Bootstrap.
Flexbox.
CSS Grid.
CSS Media Queries.

Use Bootstrap components and layout utilities where appropriate, but customize them to match the HIRAYA identity.

Use Flexbox for flexible horizontal and vertical arrangements.

Use CSS Grid for project collections, skill layouts, and structured information.

Use Media Queries to adjust layouts across devices.

Desktop

Provide the complete cinematic experience.

Use:

Detailed environments.
Full book animations.
Camera movement.
Multiple parallax layers.
Interactive tree exploration.
Spacious project panels.
Large illustrations.
Tablet

Simplify environmental complexity where needed.

Maintain the main story.

Adjust text sizes, spacing, image dimensions, and navigation.

Mobile

Do not simply shrink the desktop version.

Create a mobile-specific presentation.

Requirements:

Touch-friendly navigation.
Properly stacked content.
Optimized illustrations.
Reduced particle counts.
Simplified page turning.
Shorter pinned scenes.
Responsive project tree interaction.
No horizontal overflow.
Readable text.
Properly sized touch targets.
No overlapping sections.

The tree may become a simplified interactive vertical tree or a touch-controlled branch explorer.

All projects must remain accessible.

Media queries

Use suitable responsive breakpoints.

Suggested:

Up to 575px.
576px–767px.
768px–991px.
992px–1199px.
1200px and above.

Use relative sizing and fluid typography where appropriate.

Use clamp(), rem, %, and viewport units.

15. TECHNICAL IMPLEMENTATION

Before modifying anything, inspect the existing repository.

Repository:

https://github.com/Sean-tzy/SeanPorfolio.git

Identify:

Existing framework.
File structure.
Existing dependencies.
Current routes.
Existing components.
Existing styles.
Existing images and assets.
Existing personal information.
Existing working functionality.

Do not assume React, Vite, or another framework.

Preserve the existing project architecture where practical.

Preferred technologies:

HTML5.
CSS3.
Bootstrap.
JavaScript.
GSAP.
ScrollTrigger.
CSS 3D transforms.
Three.js when justified.
Lenis if compatible.
Animation architecture

Organize animations by chapter.

Each chapter should have its own timeline.

Ensure proper cleanup of event listeners, animation timelines, and observers.

Avoid creating unnecessary animations on every scroll event.

Use efficient scroll progress synchronization.

Environment rendering

Choose the most practical implementation for each scene.

Possible methods:

Layered illustrated images.
CSS animations.
SVG elements.
Canvas particle systems.
CSS parallax.
Three.js scenes.
Lightweight 2.5D environments.

Use the simplest method that produces the desired visual result.

Do not force every scene into WebGL.

Performance

The website must be visually rich without becoming excessively heavy.

Implement:

Lazy loading.
Image optimization.
WebP or AVIF assets where suitable.
Responsive image sources.
Efficient animations.
Reduced particle counts on mobile.
GPU-friendly transformations.
Animation cleanup.
Efficient event handling.
Proper asset loading.
Reasonable pinned-scene durations.

Avoid unnecessary re-rendering.

Avoid thousands of independent DOM animations.

Use requestAnimationFrame or an appropriate animation engine for continuous effects.

Respect browser performance constraints.

Accessibility

Support:

Keyboard navigation.
Screen readers.
Accessible contrast.
Visible focus states.
Reduced-motion preferences.
Alternative text.
Touch navigation.
Readable content.

If reduced motion is enabled, provide a simplified presentation that preserves all portfolio information.

Do not make essential information dependent on animation.

16. PERSONAL INFORMATION AND AUTHENTICITY

This website represents my real identity.

Do not invent:

My name.
School names.
Educational history.
Academic awards.
Competition participation.
Certifications.
Work experience.
Project details.
Skill proficiency.
Hobbies.
Personal interests.
Life experiences.
Social media accounts.
Contact information.

Use existing information from my repository.

For missing information, create clearly labeled editable placeholders.

The personal photograph must be my actual photograph.

Do not present fictional content as my personal achievements.

Use a centralized content structure where practical so I can update the portfolio easily.

17. FINAL QUALITY CONTROL

Before completing the implementation, test the entire website.

Academic checklist
Hero section with actual personal photograph.
Name and personal introduction.
About Me.
Educational background.
Technical skills.
Personal and professional skills.
Competitions, organizations, and achievements.
Work experience or practical experience.
Projects with descriptions and technologies.
Beyond the Classroom: exactly three topics.
Contact information and social links.
Footer with 2026 copyright.
Technical checklist
HTML5.
CSS3.
Bootstrap.
Flexbox.
CSS Grid.
CSS Media Queries.
Responsive desktop.
Responsive tablet.
Responsive mobile.
Cinematic checklist
Living grass animation.
Natural tree movement.
Individual leaf movement.
Falling leaves.
Firefly animation.
Flower and vegetation movement.
Moving clouds.
Atmospheric lighting.
Environmental parallax.
Scroll-controlled camera.
Interactive storybook.
Scroll-controlled page turning.
Magical tree reveal.
Interactive project branches and leaves.
Cybersecurity sanctuary.
Violin-inspired conclusion.
Smooth transitions in both scroll directions.
Functional checklist
Navigation works.
Project links work.
Social links work.
Contact links work.
Mobile touch interactions work.
No broken images.
No horizontal overflow.
No major console errors.
No broken routes.
Reduced-motion mode works.
All academic content remains accessible.
18. IMPLEMENTATION INSTRUCTIONS

Do not stop at planning.

Do not simply provide a mockup.

Do not only generate the hero section.

Work directly inside my existing repository.

Follow this implementation order:

Audit the repository.
Map the nine academic requirements.
Establish the visual foundation.
Build the opening environment.
Implement the interactive storybook.
Build the educational journey.
Create the cybersecurity sanctuary.
Build the magical tree and interactive project archive.
Create the three Beyond the Classroom topics.
Implement the violin and contact ending.
Add responsive layouts.
Optimize performance.
Test the entire experience.
Fix errors and broken functionality.

If the project is too large to implement in one pass, prioritize a complete functional single-page website first, then progressively improve the cinematic environments.

Do not sacrifice required content to create visual effects.

When finished, provide:

A summary of the implemented features.
The technologies used.
Any personal information I still need to fill in.
Instructions for running the website locally.
Any remaining limitations.
FINAL CREATIVE DIRECTION

Imagine someone opening my website.

They see a peaceful Filipino village.

The grass moves gently.

Leaves dance in the wind.

Sunlight passes through the trees.

An old book waits to be discovered.

They scroll.

The camera approaches.

The book opens.

They turn its pages and discover who I am.

The environment transforms into an enchanted forest.

They travel through my educational journey.

They discover a sanctuary representing cybersecurity.

They begin to understand that cybersecurity is not merely about attacking or defending computers.

It is about protecting something meaningful.

Then they discover a gigantic ancient magical tree.

Its roots represent my foundation.

Its trunk represents my identity.

Its branches represent my growth.

Its leaves contain my projects.

Its illuminated artifacts reveal my achievements and technical journey.

They explore the projects as though discovering treasures in an enchanted world.

They learn about my interests, my dreams, and the person behind the screen.

Finally, they reach the violin.

The atmosphere becomes peaceful.

The music is imaginary, but the emotion is real.

The story ends with the sunset.

And the visitor understands that this was never just a website.

It was a digital representation of a person.

HIRAYA — THE DIGITAL ME.

A Filipino fairytale told through the language of technology.

Gentle like a lullaby. Mysterious like an enchanted forest. Powerful like a violin.

Make the world breathe. Make the story meaningful. Make the projects grow like a magical tree. Make cybersecurity beautiful. And above everything else, make sure this remains a complete, honest, responsive personal portfolio that fulfills every requirement of my professor.

THIS IS PHASING SO DONT DO IT SIMULTANIOUSLY
PHASE 01 — HIRAYA REPOSITORY AUDIT & PROJECT FOUNDATION

You are working on my existing project:

Repository: https://github.com/Sean-tzy/SeanPorfolio.git

Your task is to inspect and understand the existing project before making major modifications.

OBJECTIVES
Inspect the complete repository.
Identify the existing framework, dependencies, and build tools.
Understand the current file structure and architecture.
Identify existing pages, components, routes, stylesheets, and assets.
Locate existing personal information, photographs, projects, and social links.
Identify existing working functionality that must be preserved.
Map the nine mandatory academic portfolio requirements to the future implementation.
IMPORTANT RULES
Do not assume the project uses React, Vite, or any specific framework.
Do not replace the existing architecture without a strong technical reason.
Do not delete existing files unnecessarily.
Do not invent personal information.
Do not start building all seven chapters yet.
Do not introduce unnecessary dependencies.
CREATE A PROJECT IMPLEMENTATION PLAN

Identify:

Existing architecture.
Files that should be preserved.
Files that should be modified.
New files that may be necessary.
Existing assets that can be reused.
Missing personal information.
Recommended animation strategy.
Potential performance risks.
ACADEMIC REQUIREMENTS

Confirm how the project will demonstrate:

HTML5
CSS3
Bootstrap
Flexbox
CSS Grid
CSS Media Queries
Responsive desktop, tablet, and mobile layouts
COMPLETION REQUIREMENT

Do not proceed to the actual portfolio implementation.

First provide a concise repository audit, recommended architecture, and implementation plan.

Wait for my approval before proceeding to Phase 02.


PHASE 02 — HIRAYA VISUAL IDENTITY & DESIGN SYSTEM

Establish the complete visual foundation of HIRAYA — THE DIGITAL ME.

Do not build the full website yet.

CREATIVE DIRECTION

Create an original Filipino-inspired fairytale aesthetic combining:

Traditional Filipino architecture.
Tropical forests and vegetation.
Warm golden-hour lighting.
Antique storybooks.
Natural wooden textures.
Enchanted forest environments.
Elegant editorial typography.
Beautiful and subtle cybersecurity symbolism.
COLOR PALETTE

Use the established HIRAYA palette:

Deep Forest: #102820 Forest Green: #183D32 Moss Green: #78876A Sage: #A7B49A Parchment: #F3EBDD Soft Cream: #FAF5EA Antique Gold: #C5A66A Terracotta: #A65F45 Midnight Blue: #192B3A Charcoal Brown: #302820

TYPOGRAPHY

Use:

Elegant serif typography for storytelling headlines.
Modern sans-serif for technical information.
Restrained handwritten typography for personal annotations.
IMPLEMENTATION

Create:

Global CSS variables.
Typography system.
Spacing system.
Responsive container rules.
Button styles.
Navigation styling foundations.
Card and panel styles.
Image treatments.
Consistent borders and shadows.
Reusable animation utilities.

Use Bootstrap 5 where compatible with the existing architecture.

Demonstrate Flexbox and CSS Grid in appropriate reusable layouts.

IMPORTANT

Do not create unnecessary animations yet.

Prioritize visual consistency, maintainability, readability, and responsive foundations.

COMPLETION

Test the foundation in desktop, tablet, and mobile viewport sizes.

Report all files created or modified.

Wait for my approval before Phase 03.

PHASE 03 — NAVIGATION & CINEMATIC SCROLL FRAMEWORK

Build the navigation system and technical foundation for the seven-chapter single-page experience.

NAVIGATION

Create:

HIRAYA wordmark.
Seven chapter navigation links.
Current chapter indicator.
Scroll progress indicator.
Back-to-top interaction.
Skip-to-content functionality.
Responsive mobile navigation.

Chapter labels:

01 — The Beginning 02 — The Storybook 03 — The Path of Knowledge 04 — The Sanctuary 05 — The Magical Tree 06 — Beyond the Classroom 07 — The Final Chapter

CINEMATIC FRAMEWORK

Implement a maintainable scroll architecture.

Use GSAP and ScrollTrigger if compatible with the existing project.

Create separate animation modules or timelines for each chapter.

Support:

Forward scrolling.
Backward scrolling.
Chapter navigation.
Scroll progress synchronization.
Proper animation cleanup.
Reduced-motion preferences.
Mobile-friendly animation settings.
IMPORTANT

Do not implement all chapter environments.

Build only the reusable cinematic infrastructure.

Do not hijack native scrolling or trap visitors inside pinned scenes.

COMPLETION

Verify that navigation reaches the correct chapter and works with keyboard and touch input.

Wait for my approval before Phase 04.

PHASE 04 — CHAPTER 01 & 02: THE BEGINNING AND STORYBOOK

Implement the first two chapters of HIRAYA.

CHAPTER 01 — THE ENCHANTED BEGINNING

Create a cinematic Filipino-inspired village environment.

Include:

Foreground grass.
Tropical vegetation.
Bahay kubo-inspired architecture.
Wooden pathway.
Mountains.
Warm sunlight.
Clouds.
Atmospheric depth.

Add subtle environmental movement.

Display:

Actual personal name.
Actual personal photograph.
Third-Year BS Computer Science Student.
Personal tagline.
Brief introduction.

Use clearly labeled placeholders for missing information.

The camera should approach the village as visitors scroll.

End with an antique book reveal.

CHAPTER 02 — THE STORYBOOK OF IDENTITY

Create a beautiful antique storybook.

Include:

Leather cover.
Parchment pages.
Page thickness.
Perspective.
Realistic shadows.
Decorative details.

Implement scroll-controlled page turning using CSS 3D transforms or another suitable approach.

Include the About Me content:

Personal background.
Life story.
Personality.
Values.
Strengths.
Weaknesses.
Motivation.
Inspiration.
Personal philosophy.

Use editable placeholders wherever information is missing.

IMPORTANT

The page-turning animation must reverse when scrolling backward.

Do not compromise readability.

Ensure the content remains accessible when animations are disabled.

COMPLETION

Test both chapters, their navigation, and responsive behavior.

Wait for my approval before Phase 05.

PHASE 05 — CHAPTER 03 & 04: KNOWLEDGE AND DIGITAL GUARDIANSHIP

Build the educational journey and cybersecurity sanctuary.

CHAPTER 03 — THE PATH OF KNOWLEDGE

Create a winding forest pathway.

Include five educational milestones:

Elementary Education.
Junior High School.
Senior High School and strand.
College or University.
BS Computer Science — Third Year.

Each milestone must support:

School name.
Location.
Academic year.
Program or grade level.
Honors and recognitions.

Do not fabricate educational information.

Use editable placeholders.

CHAPTER 04 — THE SANCTUARY OF DIGITAL GUARDIANS

Create a beautiful forest sanctuary representing interconnected digital systems.

Include the five cybersecurity areas:

Digital Guardianship — Defensive Security.
The Art of Investigation — Digital Forensics.
The Hidden Threads — Networking and Infrastructure.
The Quiet Watch — Monitoring and Detection.
The Art of Discovery — Ethical Security Research.

Include technical skills:

Programming languages.
HTML, CSS, JavaScript.
Bootstrap.
Databases.
Networking.
Linux.
Operating systems.
Cybersecurity fundamentals.
Development tools.

Include personal and professional skills.

Add competitions, organizations, and achievements as a distinct academic content area.

Do not claim expertise, certifications, or achievements without evidence.

VISUAL DIRECTION

Use organic architectural structures, natural materials, golden light, and elegant information panels.

Avoid generic hacker dashboards.

COMPLETION

Verify that all information is editable, readable, and responsive.

Wait for my approval before Phase 06.

PHASE 06 — CHAPTER 05: THE GREAT MAGICAL TREE

This is the visual centerpiece of HIRAYA.

Build the interactive magical tree environment.

ENVIRONMENT

Create a massive ancient tree in an enchanted forest clearing.

Include:

Massive stable trunk.
Detailed branches.
Layered foliage.
Spreading roots.
Moss.
Wildflowers.
Grass.
Fireflies.
Floating leaves.
Atmospheric mist.
Golden sunlight.

The tree must feel alive but grounded.

SYMBOLISM

Roots: Personal foundations, education, values, and knowledge.

Trunk: HIRAYA — THE DIGITAL ME.

Branches: Project categories and achievements.

Leaves: Individual projects and portfolio artifacts.

Protective light: Security and resilience.

Forest: The interconnected world of people and technology.

INTERACTIVE PROJECT ARCHIVE

Create these branch categories:

Academic Projects.
Personal Projects.
Cybersecurity Projects.
Competitions and Organizations.
Achievements and Certifications.

Individual project leaves must be interactive.

When selected, display a project panel containing:

Project title.
Description.
Technologies.
Personal contribution.
Problems addressed.
Lessons learned.
Screenshot or suitable placeholder.
GitHub link.
Live demo link, if available.

Use actual repository information.

Never invent projects or screenshots.

INTERACTION

Desktop:

Hover over branches.
Select leaves.
Reveal project panels.

Mobile:

Use large tappable branch targets.
Provide a simplified tree explorer.
Keep every project accessible.

Include a return-to-tree-view interaction.

PERFORMANCE

Do not create thousands of DOM elements.

Use SVG, CSS, Canvas, or Three.js selectively.

Prioritize a beautiful stable tree over unnecessary technical complexity.

COMPLETION

Test all project interactions, links, and responsive behavior.

Wait for my approval before Phase 07.

PHASE 07 — CHAPTER 06: BEYOND THE CLASSROOM

Create the personal storytelling chapter.

IMPORTANT: This section must contain EXACTLY THREE TOPICS. Do not introduce additional standalone topics.

TOPIC 01 — MY HOBBIES AND PASSIONS

Create an enchanted garden environment.

Include editable information about:

Hobbies.
Music.
Creative interests.
Activities outside technology.
Personal passions.

Use a violin as a visual motif without claiming professional musical experience.

TOPIC 02 — MY DREAMS AND FUTURE ASPIRATIONS

Create a cinematic mountain landscape with a winding path.

Include:

Dream career.
Cybersecurity aspirations.
Desired professional identity.
Skills to develop.
Long-term goals.
Desired impact.
TOPIC 03 — FIVE THINGS YOU SHOULD KNOW ABOUT ME

Create five enchanted artifacts.

Each artifact represents:

Something that makes me curious.
Something I deeply value.
Something unexpected about me.
Something that inspires me.
Something I hope to accomplish.

Use actual personal information or clearly labeled editable placeholders.

IMPORTANT

These are exactly three topics, even though the third contains five individual discoveries.

Connect all three environments through subtle cinematic transitions.

Ensure the content works on mobile.

COMPLETION

Verify that all three topics are present and no fictional personal claims have been introduced.

Wait for my approval before Phase 08.

PHASE 08 — CHAPTER 07: THE VIOLIN AND THE FINAL CHAPTER

Build the emotional conclusion of HIRAYA.

ENVIRONMENT

Create a peaceful forest clearing with:

Beautiful illustrated violin.
Warm golden sunlight.
Gently moving grass.
Floating leaves.
Fireflies.
Soft atmospheric lighting.
STORYTELLING

Reveal these statements gradually:

"Cybersecurity is like a violin."

"Sometimes it whispers through quiet observation."

"Sometimes it speaks through sharp intervention."

"Sometimes it protects silently, unseen by the world."

"But whether gentle or powerful, its purpose is harmony."

"To understand. To protect. To preserve."

Do not autoplay music.

CONTACT SECTION

Include:

Professional email.
GitHub.
LinkedIn.
Other approved professional platforms.
Optional social media.

Only use verified personal links and information.

FINAL MESSAGE

"Every story deserves to be protected. Every journey deserves a beginning."

"Thank you for wandering through my little corner of the digital world."

FOOTER

Include:

Personal name.
Personal motto.
© 2026 [Your Name]. All Rights Reserved.
ENDING

Animate the antique book slowly closing.

Return to the HIRAYA identity.

Create a peaceful ending.

COMPLETION

Test all contact links, footer elements, and chapter navigation.

Wait for my approval before Phase 09.

PHASE 09 — HIRAYA LIVING WORLD & CINEMATIC POLISH

Now that all seven chapters exist and contain their required content, improve the cinematic environment.

Do not redesign the entire website.

Focus on coordinated environmental animation.

ANIMATION SYSTEM

Implement:

Grass gently swaying.
Different grass layers moving at different speeds.
Branches responding to wind.
Individual leaves moving.
Occasional falling leaves.
Flowers and vegetation responding to wind.
Fireflies with individual movement paths.
Slow-moving clouds.
Subtle water ripples where water exists.
Atmospheric lighting.
Volumetric-light-inspired rays.
Environmental haze.
Gentle background parallax.
Coordinated wind intensity changes.
CINEMATIC CAMERA

Improve:

Dolly movement.
Gentle zoom.
Parallax depth.
Chapter transitions.
Focus effects.
Scroll-synchronized movement.
Reversible transitions.

Use GSAP and ScrollTrigger where appropriate.

IMPORTANT

Avoid:

Excessive particles.
Synchronized shaking.
Unnecessary WebGL.
Heavy blur effects.
Aggressive glowing.
Animation on every element.
Uncontrolled scroll hijacking.

Environmental motion should feel coordinated and natural.

AUDIO

Do not autoplay sound.

If optional ambience is implemented, provide an accessible sound toggle.

ACCESSIBILITY

Implement a simplified animation experience for prefers-reduced-motion.

PERFORMANCE

Optimize animations for mobile and lower-powered devices.

COMPLETION

Check all seven chapters in forward and backward scrolling.

Wait for my approval before Phase 10.

PHASE 10 — FINAL QUALITY ASSURANCE & ACADEMIC COMPLIANCE

Perform a comprehensive audit of the completed HIRAYA website.

Do not add major new features.

Focus on identifying and fixing incomplete functionality, responsiveness issues, accessibility problems, and performance bottlenecks.

ACADEMIC REQUIREMENTS

Verify all nine required areas:

Hero and Personal Introduction.
About Me.
Educational Background.
Skills and Technical Competencies.
Competitions, Organizations, and Achievements.
Work Experience, Projects, and Practical Experience.
Beyond the Classroom — EXACTLY THREE TOPICS.
Contact and Social Media Links.
Footer.

Verify the use of:

HTML5.
CSS3.
Bootstrap.
Flexbox.
CSS Grid.
CSS Media Queries.
RESPONSIVE TESTING

Test:

360px mobile.
390px mobile.
575px mobile.
768px tablet.
991px tablet.
1024px desktop.
1440px desktop.
1920px large desktop.

Fix horizontal overflow and overlapping content.

FUNCTIONAL TESTING

Verify:

Navigation.
Scroll progress.
Back-to-top.
Storybook page turning.
Educational milestones.
Cybersecurity content.
Project tree interactions.
Project links.
Contact links.
Mobile touch interactions.
Reduced-motion mode.
Keyboard navigation.
PERFORMANCE

Check:

Image loading.
Animation efficiency.
Unnecessary dependencies.
Console errors.
Broken assets.
Unnecessary event listeners.
Animation cleanup.
Mobile performance.
AUTHENTICITY

Verify that no personal achievements, educational details, skills, certifications, projects, photographs, or social accounts have been fabricated.

List all remaining editable placeholders.

FINAL REPORT

Provide:

Implemented features.
Technologies used.
Files created and modified.
Academic requirement checklist.
Responsive testing results.
Remaining limitations.
Personal information I still need to supply.
Instructions for running the website locally.
Git commands for committing and pushing the finished project.

Do not claim a test passed unless it was actually executed.

STRICT PHASE AUTHORIZATION

Only execute the phase explicitly provided and authorized in the current instruction.

The presence of future phase descriptions does not authorize their implementation.

Before modifying files:

Identify the currently authorized phase.
Review the previous phase's implementation.
Identify the specific changes required for the current phase.
Preserve all previously completed functionality.

Never begin the next phase automatically.

After completing the current phase, stop and wait for my explicit approval.

C:\Users\ASUS\Downloads\assets-20261116T005716Z-1-001