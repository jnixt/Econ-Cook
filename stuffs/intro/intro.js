document.addEventListener("DOMContentLoaded", function () {
    const SOUND_FILE = 'sfx-blipmale.wav';

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

    //tiap array didalam messagesByImage artinya array itu simpan semua teks untuk gambar itu saja
    //ingat bahwa text yang gak di config dengan typeIt gak akan muncul hehehehe...
    const messagesByImage = [
        //kota_awal
        [
            { text: 'Sudah terpinggir kita terdesak', options: { speed: 40 } },
            { text: 'Sampailah akhirnya', options: { speed: 40 } },
            { text: 'Di kota retak ini', options: { speed: 67 } }
        ],
        //kota_retak
        [
            { text: 'Ini caption pertama untuk gambar kedua', options: { speed: 50 } },
            { text: 'Lanjutkan klik untuk pesan kedua', options: { speed: 50 } },
            { text: 'Pesan ketiga untuk gambar kedua', options: { speed: 45 } }
        ],

    ];

    // fallback/default messages if a particular image has no messages array
    const defaultMessages = []; // keep empty since only configured messages should appear

    // state: which slide src index is currently shown in firstImg
    let currentSrcIndex = slideSrcs.indexOf(firstImg.src);
    if (currentSrcIndex === -1) currentSrcIndex = 0;

    // get messages for the current image (or fallback)
    function getMessagesForIndex(idx) {
        if (Array.isArray(messagesByImage[idx]) && messagesByImage[idx].length > 0) {
            return messagesByImage[idx];
        }
        return defaultMessages;
    }

    let currentMessages = getMessagesForIndex(currentSrcIndex);
    let clickWithinImage = 0; // counts clicks while on the current image

    // If the user clicks the image itself we also trigger the same behaviour as the button
    firstImg.addEventListener('click', (e) => {
        btn.click();
    });

    // Ensure the play button toggles blur removal and cycles text + image based on clicks.
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Remove blur if present (first interaction)
        if (firstImg.classList.contains('blurred')) {
            firstImg.classList.remove('blurred');
            btn.setAttribute('aria-pressed', 'true');
            btn.innerHTML = pauseSVG;
            // keep the button visible so user can continue clicking
        }

        // ensure banner exists
        if (typeof showBottomBanner === 'function') showBottomBanner(slideContainer, '');

        const banner = slideContainer.querySelector('.play-bottom-banner');
        const textEl = banner && banner.querySelector('.banner-text');
        if (!textEl) {
            return;
        }

        // increment click count for this image
        clickWithinImage++;

        // message index cycles through currentMessages
        const messageIndex = (clickWithinImage - 1) % currentMessages.length;
        const message = currentMessages[messageIndex];

        // normalize and decide whether this entry has TypeIt configuration
        const normalized = normalizeMessageEntry(message);
        const hasTypeItConfig = normalized.options && Object.keys(normalized.options).length > 0;

        if (hasTypeItConfig) {
            // show with TypeIt using per-message options
            startTypeItOnElement(textEl, normalized.text, normalized.options).catch(() => {});
            banner.classList.add('visible');
        } else {
            // NO TypeIt config -> do NOT show plain text in the banner.
            // Ensure any running TypeIt instance is destroyed and hide the banner.
            try {
                if (currentTypeIt && typeof currentTypeIt.destroy === 'function') currentTypeIt.destroy();
            } catch (err) { }
            currentTypeIt = null;
            textEl.textContent = '';
            banner.classList.remove('visible');
        }

        // when clickWithinImage reaches the length of the currentMessages array,
        // we advance to the next image and switch to that image's messages.
        if (clickWithinImage >= currentMessages.length) {
            // advance image index
            const nextSrcIndex = (currentSrcIndex + 1) % slideSrcs.length;
            const targetSrc = slideSrcs[nextSrcIndex];

            // swap image visually
            fadeSwapImage(firstImg, targetSrc, 400);

            // update state for new image
            currentSrcIndex = nextSrcIndex;
            currentMessages = getMessagesForIndex(currentSrcIndex);

            // reset click counter for the new image
            clickWithinImage = 0;
        }
    });

})(); // end IIFE registerPlayButtonForFirstSlide

/* Insert this small helper inside the same IIFE where you register the play button
   (registerPlayButtonForFirstSlide). Place it near the play button handlers. */

function showBottomBanner(container, text) {
    // container should be the .mySlides element (positioned)
    if (!container) return;
    let banner = container.querySelector('.play-bottom-banner');
    if (!banner) {
        banner = document.createElement('div');
        banner.className = 'play-bottom-banner';
        banner.innerHTML = `
      <div class="banner-text"></div>
      <button class="banner-close" aria-label="Close banner">&times;</button>
    `;
        container.appendChild(banner);

        const closeBtn = banner.querySelector('.banner-close');
        closeBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            banner.classList.remove('visible');
            setTimeout(() => { if (banner && banner.parentElement) banner.parentElement.removeChild(banner); }, 260);
        });
    }

    const textEl = banner.querySelector('.banner-text');
    textEl.textContent = text || '';

    requestAnimationFrame(() => {
        banner.classList.add('visible');
    });
}