// Calm neon effects + Home button for the academic pages.
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var path = location.pathname;
  var isHome = /\/$|\/index\.html$/.test(path) && !/\/hello\/$/.test(path);

  function ready(fn){ if (document.body) fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function(){
    var a = document.createElement('div'); a.className = 'fx-aurora'; a.setAttribute('aria-hidden','true');
    a.innerHTML = '<i></i><i></i><i></i>'; document.body.appendChild(a);
    var p = document.createElement('div'); p.className = 'fx-progress'; p.setAttribute('aria-hidden','true'); document.body.appendChild(p);
    var g = document.createElement('div'); g.className = 'fx-glow'; g.setAttribute('aria-hidden','true'); document.body.appendChild(g);

    if (!isHome){
      var h = document.createElement('a'); h.className = 'fx-home'; h.href = './';
      h.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>Home';
      document.body.appendChild(h);
    }

    function onScroll(){
      var max = document.documentElement.scrollHeight - innerHeight;
      p.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    }
    addEventListener('scroll', onScroll, {passive:true}); addEventListener('resize', onScroll); onScroll();

    if (!reduce && matchMedia('(pointer:fine)').matches){
      addEventListener('pointermove', function(e){ g.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; });
    }

    // the page content is drawn after load, so watch for the nav and make the name a link home
    function linkBrand(){
      var b = document.querySelector('.nav-brand:not([data-fx])');
      if (!b) return;
      b.setAttribute('data-fx','1');
      var l = document.createElement('a'); l.href = './'; l.className = 'fx-brand'; l.textContent = b.textContent; l.setAttribute('aria-label','Home');
      b.textContent = ''; b.appendChild(l);
    }
    linkBrand();
    new MutationObserver(linkBrand).observe(document.body, {childList:true, subtree:true});
  });
})();
