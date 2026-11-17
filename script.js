(() => {
  'use strict';
  const qs = (selector) => document.querySelector(selector);
  const year = qs('#year'); if (year) year.textContent = String(new Date().getFullYear());

  const progress = qs('#reading-progress');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const total = Math.max(1,document.documentElement.scrollHeight - window.innerHeight);
      if (progress) progress.style.width = `${Math.min(100, (window.scrollY / total) * 100)}%`;
      ticking = false;
    });
  }
  document.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }), {threshold:0.09,rootMargin:'0px 0px -25px 0px'});
    revealItems.forEach(el => observer.observe(el));
  } else revealItems.forEach(el => el.classList.add('visible'));

  const menu = qs('#menu-toggle');
  const links = qs('#site-nav-links');
  if (menu && links) {
    const closeMenu = () => { menu.setAttribute('aria-expanded','false'); links.classList.remove('open'); };
    menu.addEventListener('click',() => {
      const next = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(next)); links.classList.toggle('open',next);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e => {if(e.key==='Escape') closeMenu();});
    document.addEventListener('click',e => {if(!menu.contains(e.target)&&!links.contains(e.target))closeMenu();});
  }

  const sectionLinks = [...document.querySelectorAll('.nav-link')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+visible.target.id));
    },{rootMargin:'-30% 0px -52% 0px',threshold:0});
    ['about','expertise','work','projects','contact'].forEach(id=>{const el=document.getElementById(id);if(el)sectionObserver.observe(el);});
  }

  // Subtle cursor-driven depth: no external animation library required.
  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const device = qs('#device-card');
    if (device) {
      device.parentElement.addEventListener('pointermove',e => {
        const box=device.getBoundingClientRect();
        const x=(e.clientX-box.left)/box.width-.5,y=(e.clientY-box.top)/box.height-.5;
        device.style.transform=`rotateY(${x*5}deg) rotateX(${-y*4}deg) translateY(-4px)`;
      });
      device.parentElement.addEventListener('pointerleave',()=>{device.style.transform='';});
    }
  }

  let toastTimer;
  function showToast(message) {
    const toast=qs('#toast');if(!toast)return;
    toast.textContent=message;toast.classList.add('visible');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2600);
  }
  qs('#copy-email')?.addEventListener('click',async e=>{
    const email=e.currentTarget.dataset.email;
    try {await navigator.clipboard.writeText(email);showToast('Email address copied!');}
    catch {showToast('Email: '+email);}
  });
})();
