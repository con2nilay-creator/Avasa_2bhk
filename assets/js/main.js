/* Avasa — 2 BHK Residences · page behaviour (plain JavaScript, no framework) */
(function () {
  'use strict';

  var ACCENT = '#A86E5C';
  var LEAD_URL = 'https://lmsapi.persquarefeet.in/submit_lead/e0a8e8dded754cc68a71a8c430bf7734/e0d60ca4039c46dc9a8557d240f16bb8';
  var RERA_NO = 'PR1180002601627';

  // Images opened by the clickable areas on the Resident's Club floor cutaway
  var HOTSPOTS = [
    { src: 'assets/images/legacy-club-outdoor-celebration.jpg', cap: 'Outdoor Banquet · artist’s impression' },
    { src: 'assets/images/club-banquet.jpg', cap: 'Indoor Banquet · artist’s impression' },
    { src: 'assets/images/legacy-club-digital-games.jpg', cap: 'Digital Games Room · artist’s impression' },
    { src: 'assets/images/club-pool-table.jpg', cap: 'Games Room · artist’s impression' },
    { src: 'assets/images/club-gym.jpg', cap: 'Gym — Designed by K11 · artist’s impression' }
  ];

  var state = {
    menu: false, open: false, pop: false, rera: false, copied: false,
    sent: false, sending: false, err: '',
    name: '', phone: '', email: '', msg: '', date: '', cfg: '2 BHK', slot: '',
    lb: -1, lbList: [],
    navSolid: 0, pageP: 0, prog: {}
  };

  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  function set(patch) {
    for (var k in patch) state[k] = patch[k];
    render();
  }

  // ---------- derived values (same maths as the original design) ----------
  function values() {
    var p = state.prog.daynight || 0;
    var t = Math.min(1, p / 0.6);
    var eased = t * t * (3 - 2 * t);
    var nightO = eased;
    var item = state.lb >= 0 ? state.lbList[state.lb] : null;
    return {
      navSolid: state.navSolid,
      pageProg: (state.pageP * 100).toFixed(2) + '%',
      nightO: nightO,
      dayT: 'scale(' + (1 + eased * 0.05).toFixed(4) + ')',
      nightT: 'scale(' + (1.05 - eased * 0.05).toFixed(4) + ')',
      nightClip: 'inset(0 0 ' + ((1 - nightO) * 100).toFixed(2) + '% 0)',
      edgeTop: (nightO * 100).toFixed(2) + '%',
      edgeO: (Math.sin(Math.PI * clamp(nightO, 0, 1)) * 0.95).toFixed(3),
      railFill: (eased * 100).toFixed(1) + '%',
      dayNightLabel: nightO > 0.55 ? 'AVASA at dusk' : 'AVASA by day',
      menuO: state.menu ? 1 : 0,
      menuV: state.menu ? 'visible' : 'hidden',
      scrimO: state.open ? 1 : 0,
      scrimP: state.open ? 'auto' : 'none',
      drawerX: state.open ? 'translateX(0)' : 'translateX(102%)',
      notSent: !state.sent,
      sent: state.sent,
      popOpen: state.pop && !state.sent,
      hasErr: !!state.err,
      err: state.err,
      btnLabel: state.sending ? 'Sending…' : 'Request a visit',
      reraOpen: state.rera,
      reraCopy: state.copied ? 'Copied' : 'Copy number',
      showDay: true,
      showNight: true,
      lbOpen: !!item,
      lbNoteDisp: item && !item.src ? 'block' : 'none',
      lbNoteTitle: (item && item.title) || '',
      lbNote: (item && item.note) || '',
      lbCap: item ? item.cap : '',
      lbSrc: item && item.src ? item.src : ''
    };
  }

  // ---------- render: push current values into the DOM ----------
  function render() {
    var v = values();

    $$('[data-style]').forEach(function (el) {
      el.getAttribute('data-style').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        el.style.setProperty(pair.slice(0, i), String(v[pair.slice(i + 1)]));
      });
    });
    $$('[data-text]').forEach(function (el) {
      var txt = String(v[el.getAttribute('data-text')]);
      if (el.textContent !== txt) el.textContent = txt;
    });
    $$('[data-if]').forEach(function (el) {
      el.hidden = !v[el.getAttribute('data-if')];
    });

    // Form fields (the drawer and the pop-up share the same values)
    $$('[data-field]').forEach(function (el) {
      var val = state[el.getAttribute('data-field')] || '';
      if (el.value !== val && document.activeElement !== el) el.value = val;
    });
    $$('[data-submit]').forEach(function (el) { el.disabled = state.sending; });

    // Configuration / time-slot pills
    $$('[data-action="pick"]').forEach(function (el) {
      var on = state[el.getAttribute('data-kind')] === el.getAttribute('data-value');
      el.style.color = on ? '#fff' : 'rgba(255,255,255,.6)';
      el.style.borderColor = on ? ACCENT : 'rgba(255,255,255,.22)';
      el.style.background = on ? ACCENT : 'transparent';
    });

    // Lightbox image
    var img = document.querySelector('[data-lb-img]');
    if (img) {
      img.style.display = v.lbSrc ? 'block' : 'none';
      if (v.lbSrc && img.getAttribute('src') !== v.lbSrc) img.src = v.lbSrc;
      img.alt = v.lbCap;
    }
  }

  // ---------- scroll-driven effects ----------
  function onScroll() {
    var hero = document.getElementById('top');
    if (!hero) return;
    var vh = window.innerHeight || 1;
    var past = Math.max(0, -hero.getBoundingClientRect().top);
    var nav = clamp((past - 60) / 240, 0, 1);

    var prog = {}, changed = false;
    $$('[data-stage]').forEach(function (el) {
      var id = el.getAttribute('data-stage');
      var run = Math.max(1, el.offsetHeight - vh);
      var p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top) / run);
      prog[id] = p;
      if (Math.abs(p - (state.prog[id] || 0)) > 0.005) changed = true;
    });

    var doc = document.documentElement;
    var pageP = clamp((window.scrollY || 0) / Math.max(1, doc.scrollHeight - vh), 0, 1);

    var patch = {}, any = false;
    if (changed) { patch.prog = prog; any = true; }
    if (Math.abs(nav - state.navSolid) > 0.03 || (nav === 0 && state.navSolid !== 0) || (nav === 1 && state.navSolid !== 1)) { patch.navSolid = nav; any = true; }
    if (Math.abs(pageP - state.pageP) > 0.004) { patch.pageP = pageP; any = true; }
    if (any) set(patch);
  }

  // ---------- carousels ----------
  function slide(key, dir) {
    var el = document.querySelector('[data-scroller="' + key + '"]');
    if (!el) return;
    var card = el.firstElementChild && el.firstElementChild.firstElementChild;
    var step = card ? card.getBoundingClientRect().width + 22 : el.clientWidth * 0.8;
    var max = el.scrollWidth - el.clientWidth;
    var from = el.scrollLeft;
    var to = clamp(from + dir * step, 0, max);
    if (to === from) return;
    try { el.scrollTo({ left: to, behavior: 'smooth' }); } catch (e) { el.scrollLeft = to; }
    clearTimeout(slide.t);
    slide.t = setTimeout(function () { if (Math.abs(el.scrollLeft - from) < 2) el.scrollLeft = to; }, 280);
  }

  // ---------- lightbox ----------
  function zoomItem(n) {
    var imgs = n.tagName === 'IMG' ? [n] : $$('img', n);
    if (!imgs.length) return null;
    var best = imgs[0], bo = -1;
    imgs.forEach(function (im) {
      var o = parseFloat(getComputedStyle(im).opacity || '1');
      if (o > bo) { bo = o; best = im; }
    });
    var cap = n.getAttribute('data-zoom');
    return { src: best.currentSrc || best.src, cap: cap || best.alt || '' };
  }
  function openZoom(el) {
    var list = [], idx = 0;
    $$('[data-zoom]').forEach(function (n) {
      var z = zoomItem(n);
      if (!z) return;
      if (n === el) idx = list.length;
      list.push(z);
    });
    if (list.length) set({ lbList: list, lb: idx });
  }
  function step(d) {
    var n = state.lbList.length;
    if (n) set({ lb: (state.lb + d + n) % n });
  }

  // ---------- lead form ----------
  function submit() {
    if (state.sending) return;
    var name = (state.name || '').trim();
    var phone = (state.phone || '').trim();
    var email = (state.email || '').trim();
    if (!name || phone.replace(/\D/g, '').length < 10 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      set({ err: 'Please enter your name, a 10-digit phone number and a valid email.' });
      return;
    }
    set({ sending: true, err: '' });

    var q = new URLSearchParams(location.search);
    var bits = ['AVASA · 2 BHK · Kandivali East'];
    if (state.date) bits.push('Visit ' + state.date);
    if (state.slot) bits.push(state.slot);
    if (state.msg) bits.push(String(state.msg).trim());
    var digits = phone.replace(/\D/g, '');
    var body = JSON.stringify({
      name: name,
      email: email,
      phone: digits.length === 10 ? '+91' + digits : '+' + digits,
      source: 'Website',
      vendor_remark: bits.join(' | '),
      utm_source: q.get('utm_source') || 'direct',
      utm_medium: q.get('utm_medium') || '',
      utm_campaign: q.get('utm_campaign') || '',
      utm_term: q.get('utm_term') || '',
      utm_content: q.get('utm_content') || ''
    });

    function done() { set({ sent: true, sending: false, pop: false }); }
    fetch(LEAD_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body })
      .then(function (r) { if (!r.ok) throw new Error('http'); done(); })
      .catch(function () {
        return fetch(LEAD_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: body })
          .then(done)
          .catch(function () {
            set({ sending: false, err: 'We could not send that just now. Please try again, or call the sales desk.' });
          });
      });
  }

  // ---------- click actions ----------
  var actions = {
    openMenu: function () { set({ menu: true }); },
    closeMenu: function () { set({ menu: false }); },
    menuEnquiry: function () { set({ menu: false, open: true }); },
    openEnquiry: function () { set({ open: true, menu: false }); },
    closeEnquiry: function () { set({ open: false }); },
    closePop: function () { set({ pop: false }); },
    toggleRera: function () { set({ rera: !state.rera, copied: false }); },
    closeRera: function () { set({ rera: false, copied: false }); },
    copyRera: function () {
      try { navigator.clipboard.writeText(RERA_NO); } catch (e) {}
      set({ copied: true });
      clearTimeout(actions.copyT);
      actions.copyT = setTimeout(function () { set({ copied: false }); }, 1800);
    },
    clubPrev: function () { slide('club', -1); },
    clubNext: function () { slide('club', 1); },
    roofPrev: function () { slide('roof', -1); },
    roofNext: function () { slide('roof', 1); },
    closeLb: function () { set({ lb: -1 }); },
    submit: submit,
    reset: function () { set({ sent: false, name: '', phone: '', email: '', msg: '', date: '', slot: '', err: '' }); },
    pick: function (el) {
      var patch = {};
      patch[el.getAttribute('data-kind')] = el.getAttribute('data-value');
      set(patch);
    }
  };
  for (var h = 0; h < HOTSPOTS.length; h++) {
    (function (i) { actions['openH' + i] = function () { set({ lbList: HOTSPOTS, lb: i }); }; })(h);
  }

  function init() {
    // Today's date as the earliest selectable visit day
    var today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    $$('[data-min-today]').forEach(function (el) { el.min = today; });

    // Capture phase, so CTA buttons still work when the .enquireModal handler stops propagation
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-action]') : null;
      if (el) {
        var fn = actions[el.getAttribute('data-action')];
        if (fn) fn(el);
        return;
      }
      var z = e.target.closest ? e.target.closest('[data-zoom]') : null;
      if (z) openZoom(z);
    }, true);

    // Keyboard: Enter/Space on role="button" elements, Esc to close, arrows in lightbox
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') set({ lb: -1, open: false, menu: false, rera: false });
      if (state.lb >= 0 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) step(e.key === 'ArrowRight' ? 1 : -1);
      var t = e.target;
      if ((e.key === 'Enter' || e.key === ' ') && t.getAttribute && t.getAttribute('role') === 'button' && t.hasAttribute('data-action')) {
        e.preventDefault();
        t.click();
      }
    });

    document.addEventListener('input', function (e) {
      var f = e.target.getAttribute && e.target.getAttribute('data-field');
      if (!f) return;
      var patch = {};
      patch[f] = e.target.value;
      set(patch);
    });

    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Booking pop-up every 50 seconds until the visitor has enquired
    setInterval(function () {
      // don't interrupt a visitor who is typing into one of the page's forms
      var typing = document.activeElement && document.activeElement.closest && document.activeElement.closest('.lead-form');
      if (!state.sent && !state.open && !typing) set({ pop: true });
    }, 50000);

    // Hide the intro splash once its animation has finished
    setTimeout(function () {
      var s = document.querySelector('[data-splash]');
      if (s) s.style.display = 'none';
    }, 2600);

    render();
    onScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
