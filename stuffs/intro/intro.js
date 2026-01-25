/* Updated intro.js
   - Adds a "Skip to assistant choices" button left of the Jump-to-start button.
   - Extracts assistant-choice handling into applyAssistantChoice() to reuse from both end-of-slides and the Skip button.
   - The Skip button opens the assistant selection overlay immediately.
   - No other behavior changes.
*/

document.addEventListener("DOMContentLoaded", function () {

    (function () {
        const STORAGE_KEY = 'cookie_consent_v1';

        if (localStorage.getItem(STORAGE_KEY)) return;

        const overlay = document.createElement('div');
        overlay.id = 'cookie-consent-overlay';
        overlay.setAttribute('aria-hidden', 'false');
        overlay.style.cssText = [
            'position:fixed',
            'inset:0',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'background:rgba(0,0,0,0.35)',
            'z-index:100000'
        ].join(';');

        // Create dialog box
        const box = document.createElement('div');
        box.id = 'cookie-consent-box';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.style.cssText = [
            'width:min(520px, 92vw)',
            'background:#fff',
            'color:#000',
            'border-radius:12px',
            'padding:18px 20px',
            'box-shadow:0 20px 40px rgba(0,0,0,0.35)',
            'font-family:system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            'text-align:center'
        ].join(';');

        // Content
        const msg = document.createElement('div');
        msg.style.cssText = 'margin-bottom:14px; font-size:15px; line-height:1.4; color:#000;';
        msg.textContent = 'This website uses cookies';

        // Buttons wrapper
        const btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex; gap:12px; justify-content:center; color:#000;';

        const acceptBtn = document.createElement('button');
        acceptBtn.type = 'button';
        acceptBtn.textContent = 'Accept all';
        acceptBtn.style.cssText = [
            'background:#0b74ff',
            'color:#fff',
            'border:0',
            'padding:10px 14px',
            'border-radius:8px',
            'cursor:pointer',
            'font-weight:600'
        ].join(';');

        const declineBtn = document.createElement('button');
        declineBtn.type = 'button';
        declineBtn.textContent = 'Decline all';
        declineBtn.style.cssText = [
            'background:#f3f3f3',
            'color:#111',
            'border:1px solid #d7d7d7',
            'padding:10px 14px',
            'border-radius:8px',
            'cursor:pointer',
            'font-weight:600'
        ].join(';');

        btnRow.appendChild(acceptBtn);
        btnRow.appendChild(declineBtn);
        box.appendChild(msg);
        box.appendChild(btnRow);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // Prevent background scroll while modal is open
        const previousOverflow = document.documentElement.style.overflow || document.body.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Accessibility: focus management
        const previouslyFocused = document.activeElement;
        acceptBtn.focus();

        function closeAndRemember(choice) {
            try {
                localStorage.setItem(STORAGE_KEY, choice);
            } catch (e) {
            }
            document.documentElement.style.overflow = previousOverflow;
            document.body.style.overflow = previousOverflow;

            overlay.remove();

            try {
                if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
                    previouslyFocused.focus();
                }
            } catch (e) { }
        }

        acceptBtn.addEventListener('click', () => closeAndRemember('accepted'));
        declineBtn.addEventListener('click', () => closeAndRemember('declined'));

        function onKey(e) {
            if (e.key === 'Escape') {
                closeAndRemember('declined');
                window.removeEventListener('keydown', onKey);
            }
        }
        window.addEventListener('keydown', onKey);
    })();

});
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}

// Minimal JS: insert after DOM is ready (you can paste into your existing script.js near other slideshow code)

(function registerPlayButtonForFirstSlide() {
    let __bannerTypingController = null;
    let currentTypeIt = null;

    // helper: normalize message entry to { text, options }
    function normalizeMessageEntry(entry) {
        if (typeof entry === 'string') return { text: entry, options: {} };
        if (entry && typeof entry === 'object' && typeof entry.text === 'string') {
            return { text: entry.text, options: entry.options || {} };
        }
        return { text: String(entry || ''), options: {} };
    }

    // helper: start a TypeIt instance on an element for a given message
    function startTypeItOnElement(el, message, opts = {}) {
        // destroy previous instance if present
        try {
            if (currentTypeIt && typeof currentTypeIt.destroy === 'function') {
                currentTypeIt.destroy(); // stop previous typing & cleanup
            }
        } catch (err) {
            // ignore
        }
        currentTypeIt = null;

        // If TypeIt not loaded, fallback (but per requirement, we won't show plain text)
        if (typeof window.TypeIt !== 'function') {
            // nothing to show if TypeIt isn't available
            el.textContent = '';
            return Promise.resolve();
        }

        // clear existing content
        el.textContent = '';

        // build options with sensible defaults, allow per-message override
        const defaultOpts = {
            speed: 50,
            cursor: true,
            waitUntilVisible: true,
        };
        const finalOpts = Object.assign({}, defaultOpts, opts || {});

        // create TypeIt instance and return the promise from .go()
        try {
            // create instance bound to the element and type the message
            currentTypeIt = new TypeIt(el, finalOpts).type(message);
            return currentTypeIt.go().then(() => {
                // keep currentTypeIt so it can be destroyed later if needed
            }).catch(() => {
                el.textContent = '';
            });
        } catch (e) {
            el.textContent = '';
            return Promise.resolve();
        }
    }

    function typingEffect(text, speed = 30) {
        // ensure banner exists and is visible
        showBottomBanner(slideContainer, ''); // uses existing helper to (re)create the banner
        const banner = slideContainer.querySelector('.play-bottom-banner');
        if (!banner) return Promise.reject(new Error('banner not found'));

        const textEl = banner.querySelector('.banner-text');
        if (!textEl) return Promise.reject(new Error('banner text element not found'));

        // cancel previous typing if any
        if (__bannerTypingController) __bannerTypingController.cancelled = true;
        const controller = { cancelled: false };
        __bannerTypingController = controller;

        textEl.textContent = '';

        return new Promise((resolve) => {
            let i = 0;
            function step() {
                if (controller.cancelled) {
                    resolve('cancelled');
                    return;
                }
                if (i >= text.length) {
                    resolve();
                    return;
                }
                textEl.textContent += text.charAt(i++);
                setTimeout(step, speed);
            }
            step();
        });
    }

    // optional: make it globally callable
    window.typingEffect = typingEffect;
    const firstImg = document.querySelector('.mySlides img');
    if (!firstImg) return;

    const slideContainer = firstImg.closest('.mySlides') || firstImg.parentElement;
    if (!slideContainer) return;

    // Ensure container is a positioning context
    const style = window.getComputedStyle(slideContainer);
    if (style.position === 'static') slideContainer.style.position = 'relative';

    // Start blurred (if you have CSS to apply blur via .blurred)
    firstImg.classList.add('blurred');

    // Create button (circle with an SVG "play" triangle inside)
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'play-overlay-btn';
    btn.setAttribute('aria-pressed', 'false');
    btn.title = 'Play (remove blur)';

    // SVGs for play and pause (equilateral-looking triangle pointing right)
    const playSVG = `
    <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
      <polygon points="30,18 82,50 30,82"/>
    </svg>
  `;
    const pauseSVG = `
    <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
      <rect x="28" y="18" width="12" height="64"></rect>
      <rect x="60" y="18" width="12" height="64"></rect>
    </svg>
  `;

    btn.innerHTML = playSVG;
    slideContainer.appendChild(btn);

    // --- New: Jump-to-start button (top-right) and Skip-to-assistant (left of it) ---
    // Create reset (jump-to-start) and skip buttons, append both.
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'jump-to-start';
    resetBtn.title = 'Back to beginning';
    resetBtn.innerHTML = '⤒';

    const skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.className = 'skip-to-assistant';
    skipBtn.title = 'Skip to assistant choices';
    skipBtn.innerHTML = 'Skip';

    // Append skip then reset so skip appears left of reset when styled
    slideContainer.appendChild(skipBtn);
    slideContainer.appendChild(resetBtn);

    // Helper to apply an assistant choice (extracted to reuse)
    function applyAssistantChoice(choice) {
        // Save the user's choice
        try { localStorage.setItem('assistant_choice', choice); } catch (e) { }

        // Optional: show confirmation text in the banner
        if (typeof showBottomBanner === 'function') showBottomBanner(slideContainer, '');
        const b = slideContainer.querySelector('.play-bottom-banner');
        if (b) {
            const t = b.querySelector('.banner-text');
            if (t) t.textContent = (choice === 'female')
                ? 'You picked the female assistant'
                : 'You picked the male assistant';
            b.classList.add('visible');
        }

        // OPTIONAL: return the user to the first slide and re-apply blur.
        // Remove or comment this block if you want to keep the user on the last slide.
        const firstSrc = slideSrcs[0];
        if (firstSrc) {
            fadeSwapImage(firstImg, firstSrc, 400);
        }
        currentSrcIndex = 0;
        visibleMessages = buildVisibleMessagesFor(currentSrcIndex);
        visibleIndex = -1;

        // re-apply blur and reset play button state
        firstImg.classList.add('blurred');
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = playSVG;
        btn.classList.remove('hidden');
        btn.removeAttribute('aria-hidden');

        // hide confirmation after a short delay
        setTimeout(() => {
            const bb = slideContainer.querySelector('.play-bottom-banner');
            if (bb) bb.classList.remove('visible');
        }, 2000);
    }

    // Skip button: open assistant choices immediately
    skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Hide any banner while overlay appears
        const banner = slideContainer.querySelector('.play-bottom-banner');
        if (banner) banner.classList.remove('visible');

        showAssistantChoices(function (choice) {
            applyAssistantChoice(choice);
        });
    });

    // Reset (jump-to-start) button handler
    resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Animate swap to first image
        const firstSrc = slideSrcs[0];
        if (firstSrc) {
            fadeSwapImage(firstImg, firstSrc, 400);
        }
        // Reset state
        currentSrcIndex = 0;
        visibleMessages = buildVisibleMessagesFor(currentSrcIndex);
        visibleIndex = -1;

        // Re-apply blur and reset play button UI
        firstImg.classList.add('blurred');
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = playSVG;
        btn.classList.remove('hidden');
        btn.removeAttribute('aria-hidden');

        // hide any banner
        const banner = slideContainer.querySelector('.play-bottom-banner');
        if (banner) {
            banner.classList.remove('visible');
            const textEl = banner.querySelector('.banner-text');
            if (textEl) textEl.textContent = '';
        }
    });

    // Fade-swap helper for image swapping (keeps transition smooth)
    async function fadeSwapImage(imgEl, targetSrc, duration) {
        if (imgEl.dataset.animating === '1') return;
        imgEl.dataset.animating = '1';

        // Fade out
        imgEl.style.transition = `opacity ${duration}ms ease`;
        imgEl.style.opacity = '0';

        // Preload next image to avoid seeing the image pop-in
        await new Promise((res) => {
            const tmp = new Image();
            tmp.onload = () => res(tmp);
            tmp.onerror = () => res(null);
            tmp.src = targetSrc;
        });

        // After fade out duration, change src and fade in
        setTimeout(() => {
            imgEl.src = targetSrc;
            // ensure the browser has a slight moment; then fade in
            requestAnimationFrame(() => {
                imgEl.style.opacity = '1';
            });

            // done after fade-in completes
            setTimeout(() => {
                imgEl.dataset.animating = '0';
            }, duration);
        }, duration);
    }

    // ---------- New behavior: per-image message arrays ----------
    // Collect all slide image sources (document order)
    const slideImgs = Array.from(document.querySelectorAll('.mySlides img'));
    const slideSrcs = slideImgs.map(img => img.src);
    const sound_file = new Audio('sfx-blipmale.wav');

    // messagesByImage: each inner array stores messages for that image.
    // Only entries that are objects with non-empty options will be shown (per earlier requirement).
    const messagesByImage = [
        [
            { text: '. . .', options: { speed: 167, afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Lihatlah baik-baik', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Ini dunia yang rapuh', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Dibangun dari manis… dan runtuh oleh waktu', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Kau tidak berada di sini', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Tapi kau melihat semuanya', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Artinya. . .', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Kau mendengarku', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Aku bukan bagian dari dunia ini', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Aku tidak dipanggang. Tidak dibentuk', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Aku hanya… terjaga', options: { speed: 140, afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Namun untuk menceritakan segalanya padamu. . .', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Anda perlu memilih wujudku', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Bukan karena tubuh', options: { speed: 140, afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Bukan karena suara', options: { speed: 140, afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Namun karena cara dunia cookies akan mengingatku', options: { speed: 140, afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Setelah kamu memilih. . .', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Saya akan menjelaskan tentang dunia ini', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Kenapa cookie diciptakan', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Kenapa mereka bisa hancur', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Dan kenapa aku masih ada', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ],
        [
            { text: 'Pilihlah', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Setelah itu. . .', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } },
            { text: 'Cerita sebenarnya baru akan dimulai', options: { afterStep: function (step, instance) { sound_file.currentTime = 0; sound_file.play() } } }
        ]
    ];

    const defaultMessages = [];

    let currentSrcIndex = slideSrcs.indexOf(firstImg.src);
    if (currentSrcIndex === -1) currentSrcIndex = 0;

    let visibleMessages = [];
    let visibleIndex = -1;

    function getMessagesForIndex(idx) {
        if (Array.isArray(messagesByImage[idx]) && messagesByImage[idx].length > 0) {
            return messagesByImage[idx];
        }
        return defaultMessages;
    }

    function buildVisibleMessagesFor(index) {
        const all = getMessagesForIndex(index);
        const visible = [];
        for (const entry of all) {
            const normalized = normalizeMessageEntry(entry);
            if (normalized.options && Object.keys(normalized.options).length > 0) {
                visible.push(normalized);
            }
        }
        return visible;
    }

    visibleMessages = buildVisibleMessagesFor(currentSrcIndex);
    visibleIndex = -1;

    firstImg.addEventListener('click', (e) => {
        btn.click();
    });

    function showVisibleMessageAtIndex(idx) {
        if (!Array.isArray(visibleMessages) || visibleMessages.length === 0) return;
        if (idx < 0) idx = 0;
        if (idx >= visibleMessages.length) idx = visibleMessages.length - 1;

        const entry = visibleMessages[idx];
        const banner = slideContainer.querySelector('.play-bottom-banner');
        const textEl = banner && banner.querySelector('.banner-text');
        if (!textEl) return;

        startTypeItOnElement(textEl, entry.text, entry.options).catch(() => { });
        banner.classList.add('visible');
        visibleIndex = idx;
    }

    function showAssistantChoices(onChoose) {
        if (document.querySelector('.assistant-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'assistant-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.style.cssText = [
            'position:fixed',
            'inset:0',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'background:rgba(0,0,0,0.6)',
            'z-index:20000',
            'padding:20px',
            'box-sizing:border-box'
        ].join(';');

        const panel = document.createElement('div');
        panel.className = 'assistant-panel';
        panel.style.cssText = [
            'max-width:920px',
            'width:100%',
            'display:grid',
            'grid-template-columns:1fr 1fr',
            'gap:18px',
            'align-items:start'
        ].join(';');

        function createCard(id, imgSrc, title) {
            const card = document.createElement('button');
            card.className = 'assistant-card';
            card.type = 'button';
            card.dataset.choice = id;
            card.style.cssText = [
                'background:#111',
                'color:#fff',
                'border-radius:12px',
                'padding:14px',
                'text-align:center',
                'border:0',
                'cursor:pointer',
                'display:flex',
                'flex-direction:column',
                'align-items:center',
                'gap:12px',
                'min-height:240px'
            ].join(';');

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = title;
            img.style.cssText = [
                'width:120px',
                'height:120px',
                'object-fit:cover',
                'border-radius:8px',
                'box-shadow:0 8px 28px rgba(0,0,0,0.4)'
            ].join(';');

            const h = document.createElement('div');
            h.textContent = title;
            h.style.cssText = [
                'font-size:18px',
                'font-weight:700'
            ].join(';');

            const subtitle = document.createElement('div');
            subtitle.textContent = 'Click to select';
            subtitle.style.cssText = 'font-size:13px; opacity:0.85;';

            card.appendChild(img);
            card.appendChild(h);
            card.appendChild(subtitle);

            card.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    card.click();
                }
            });

            return card;
        }

        const femaleImg = 'cewek_normal.png';
        const maleImg = 'cowok_normal.png';

        const femaleCard = createCard('female', femaleImg, 'Female Assistant');
        const maleCard = createCard('male', maleImg, 'Male Assistant');

        panel.appendChild(femaleCard);
        panel.appendChild(maleCard);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        function cleanup() {
            try {
                overlay.remove();
            } catch (e) { }
        }

        // handle selection
        femaleCard.addEventListener('click', () => {
            cleanup();
            if (typeof onChoose === 'function') onChoose('female');
        });
        maleCard.addEventListener('click', () => {
            cleanup();
            if (typeof onChoose === 'function') onChoose('male');
        });

        // Close on Escape or backdrop click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cleanup();
        });
        window.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                cleanup();
                window.removeEventListener('keydown', escHandler);
            }
        });

        // focus first card
        femaleCard.focus();
    }
    function applyAssistantChoice(choice) {
        // Save the user's choice to localStorage (persist)
        try { localStorage.setItem('assistant_choice', choice); } catch (e) { /* ignore */ }

        // Store on window so other scripts can access immediately
        window.assistantChoice = choice;

        // dispatch an event so other scripts (script.js) can react if already loaded
        try {
            window.dispatchEvent(new CustomEvent('assistantChoiceChanged', { detail: choice }));
        } catch (e) { /* ignore older browsers */ }

        // Optional: show confirmation text in the banner
        if (typeof showBottomBanner === 'function') showBottomBanner(slideContainer, '');
        const b = slideContainer.querySelector('.play-bottom-banner');
        if (b) {
            const t = b.querySelector('.banner-text');
            if (t) t.textContent = (choice === 'female') ? 'You picked the female assistant' : 'You picked the male assistant';
            b.classList.add('visible');
        }

        // OPTIONAL: return the user to the first slide and re-apply blur.
        const firstSrc = slideSrcs[0];
        if (firstSrc) {
            fadeSwapImage(firstImg, firstSrc, 400);
        }
        currentSrcIndex = 0;
        visibleMessages = buildVisibleMessagesFor(currentSrcIndex);
        visibleIndex = -1;

        // re-apply blur and reset play button state
        firstImg.classList.add('blurred');
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = playSVG;
        btn.classList.remove('hidden');
        btn.removeAttribute('aria-hidden');

        // hide confirmation after a short delay
        setTimeout(() => {
            const bb = slideContainer.querySelector('.play-bottom-banner');
            if (bb) bb.classList.remove('visible');
        }, 2000);
    }

    // --- inside showAssistantChoices: when user clicks a card, persist and set window variable too ---
    // Replace the femaleCard/maleCard click handlers with the below (so the choice is stored immediately)

    femaleCard.addEventListener('click', () => {
        // Persist & expose on window immediately
        try { localStorage.setItem('assistant_choice', 'female'); } catch (e) { }
        window.assistantChoice = 'female';
        try { window.dispatchEvent(new CustomEvent('assistantChoiceChanged', { detail: 'female' })); } catch (e) { }

        cleanup();
        if (typeof onChoose === 'function') onChoose('female');
    });
    maleCard.addEventListener('click', () => {
        try { localStorage.setItem('assistant_choice', 'male'); } catch (e) { }
        window.assistantChoice = 'male';
        try { window.dispatchEvent(new CustomEvent('assistantChoiceChanged', { detail: 'male' })); } catch (e) { }

        cleanup();
        if (typeof onChoose === 'function') onChoose('male');
    });
    // Replace the click handler: unblur click shows first visible message without counting;
    // subsequent clicks advance through visibleMessages only. When visibleMessages exhausted, advance image.
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // If the image is still blurred -> treat this click as "unblur" only:
        if (firstImg.classList.contains('blurred')) {
            // Unblur and show the FIRST visible entry (index 0) without incrementing any counters.
            firstImg.classList.remove('blurred');
            btn.setAttribute('aria-pressed', 'true');
            btn.innerHTML = pauseSVG;

            // prepare banner and show the first visible message (index 0), if any
            if (typeof showBottomBanner === 'function') showBottomBanner(slideContainer, '');
            // rebuild visibleMessages in case they changed
            visibleMessages = buildVisibleMessagesFor(currentSrcIndex);
            visibleIndex = -1;

            if (visibleMessages.length > 0) {
                showVisibleMessageAtIndex(0);
            }
            // important: do NOT advance image or increment any counter here
            return;
        }

        // Normal click behavior when already un-blurred:
        // Move to the next visible message (if any)
        if (!Array.isArray(visibleMessages)) visibleMessages = [];
        const nextIndex = visibleIndex + 1;

        if (nextIndex < visibleMessages.length) {
            // show next visible message
            showVisibleMessageAtIndex(nextIndex);
        } else {
            // we've reached the end of visible messages for this image -> advance to next image
            const nextSrcIndex = (currentSrcIndex + 1);
            // If nextSrcIndex is beyond the last index, DO NOT loop: stop advancing.
            if (nextSrcIndex >= slideSrcs.length) {
                // At last image already and its messages are exhausted — show assistant choice overlay
                const banner = slideContainer.querySelector('.play-bottom-banner');
                if (banner) banner.classList.remove('visible');

                // showAssistantChoices should be defined (see helper added earlier)
                showAssistantChoices(function (choice) {
                    applyAssistantChoice(choice);
                });

                return;
            }

            const targetSrc = slideSrcs[nextSrcIndex];

            // swap image visually
            fadeSwapImage(firstImg, targetSrc, 400);

            // update state for new image
            currentSrcIndex = nextSrcIndex;
            visibleMessages = buildVisibleMessagesFor(currentSrcIndex);
            visibleIndex = -1;

            // Do NOT auto-show the first message for the new image (user must click).
        }
    });

})(); // end IIFE registerPlayButtonForFirstSlide

/* Insert this small helper inside the same IIFE where you register the play button
   (registerPlayButtonForFirstSlide). Place it near the play button handlers. */

function showBottomBanner(container, text) {
    // container should be the .mySlides element (positioned)
    if (!container || !(container instanceof Element)) {
        container = document.body;
    }

    // Try to find banner inside the container (keeps compatibility with slideContainer.querySelector)
    let banner = container.querySelector('.play-bottom-banner');

    if (!banner) {
        banner = document.createElement('div');
        banner.className = 'play-bottom-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-live', 'polite');
        banner.style.cssText = [
            'position:fixed',            // fixed to viewport so won't be clipped
            'left:0',
            'right:0',
            'bottom:0',
            'margin:0 auto',
            'box-sizing:border-box',
            'width:100%',
            'max-width:100vw',
            'background:rgba(0,0,0,0.6)',
            'color:#fff',
            'padding:10px 16px',
            'text-align:center',
            'opacity:0',
            'transform:translateY(8px)',
            'transition:opacity 220ms ease, transform 220ms ease',
            'z-index:99999',
            'display:flex',
            'flex-direction:column',
            'align-items:center',
            'justify-content:flex-start',
            'min-height:48px',
            'max-height:40vh',
            'overflow:auto',
            '-webkit-overflow-scrolling:touch'
        ].join(';');

        banner.innerHTML = `
      <div class="banner-text" aria-atomic="true" style="margin:0; width:100%;"></div>
      <button class="banner-close" aria-label="Close banner" style="
        position:absolute; right:8px; top:8px; background:transparent; border:0; color:#fff; font-size:18px; cursor:pointer;">&times;</button>
    `;

        // Append banner as child of the container so slideContainer.querySelector finds it,
        // but since it is position:fixed it will be anchored to the viewport.
        container.appendChild(banner);

        const closeBtn = banner.querySelector('.banner-close');
        closeBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            banner.classList.remove('visible');
            // remove after transition to keep DOM clean
            setTimeout(() => { try { banner.remove(); } catch (e) { } }, 260);
        });
    }

    const textEl = banner.querySelector('.banner-text');
    // Set immediate fallback text (TypeIt will overwrite when typing starts)
    textEl.textContent = text || '';

    // Make visible (use RAF to trigger transition)
    requestAnimationFrame(() => {
        banner.classList.add('visible');
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
    });

    return banner;
}
