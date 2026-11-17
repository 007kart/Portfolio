(()=>{
'use strict';
const projectData={
 ecommerce:{number:'01',kind:'FULL STACK / SALES ANALYTICS',name:'E-Commerce Analytics Portal',description:'Explore a sales analytics dashboard with interactive order creation, transaction filtering, product insights and CSV reporting. The browser preview uses synthetic data stored locally.',tags:['Next.js','JavaScript','React','PostgreSQL','REST APIs'],demo:'./demos/ecommerce/',repo:'https://github.com/007kart/E-Commerce-Analytics-Portal',note:'Interactive demo: frontend simulation with browser-local data. Full Next.js + PostgreSQL application source is in GitHub.'},
 erp:{number:'02',kind:'FULL STACK / INVENTORY OPERATIONS',name:'ERP Inventory & Reporting Module',description:'Try inventory management workflows including stock-in/out adjustments, low-stock alerting, supplier views, movement history and CSV exports.',tags:['Next.js','JavaScript','SQL','PostgreSQL','API Routes'],demo:'./demos/erp/',repo:'https://github.com/007kart/ERP-Inventory-Reporting-Modul',note:'Interactive demo: browser-local data persists on this device. The GitHub code contains the Next.js PostgreSQL-backed version.'},
 ai:{number:'03',kind:'EXPERIMENT / LEARNING PROTOTYPE',name:'AI Document Assistant',description:'An experimental RAG document assistant exploring document upload, retrieval and LLM-generated answers. This prototype has not been deployed as a live application.',tags:['Next.js','Python','LLM APIs','RAG','pgvector'],demo:null,repo:'https://github.com/007kart/ai-document-assistant',note:'Source code only. No live application is deployed or claimed.'}
};
const $=s=>document.querySelector(s);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu=$('#mobile-toggle'), mobileNav=$('#mobile-nav');
menu?.addEventListener('click',()=>{const next=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(next));mobileNav.classList.toggle('open',next)});
mobileNav?.querySelectorAll('a').forEach(x=>x.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');mobileNav.classList.remove('open')}));
const reveal=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window && !reduced){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{rootMargin:'0px 0px -35px 0px',threshold:.07});reveal.forEach(x=>io.observe(x));}else reveal.forEach(x=>x.classList.add('visible'));
const marker=$('#scroll-marker');let scrollRequested=false;
function refreshScroll(){scrollRequested=false;const max=document.documentElement.scrollHeight-innerHeight;if(marker)marker.style.width=(max>0?Math.max(0,Math.min(100,(scrollY/max)*100)):0)+'%'}
window.addEventListener('scroll',()=>{if(!scrollRequested){scrollRequested=true;requestAnimationFrame(refreshScroll)}},{passive:true});refreshScroll();
$('#copyright-year').textContent=new Date().getFullYear();
if(!reduced && matchMedia('(pointer:fine)').matches){const visual=$('#hero-widget');visual?.parentElement?.addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)/r.width,dy=(e.clientY-r.top-r.height/2)/r.height;visual.style.transform=`rotate(${-4+dx*2}deg) translate(${dx*8}px,${dy*8}px)`});visual?.parentElement?.addEventListener('pointerleave',()=>visual.style.transform='');}
const overlay=$('#project-overlay'), closeBtn=$('#modal-close');let prevFocus=null;
function cleanURL(){const url=new URL(location.href);url.searchParams.delete('project');if(location.protocol==='https:'||location.protocol==='http:')history.replaceState({},'',url.pathname+url.search+url.hash)}
function showProject(key,changeURL=true){const p=projectData[key];if(!p)return;prevFocus=document.activeElement;$('#modal-name').textContent=p.name;$('#modal-description').textContent=p.description;$('#modal-kind').textContent=p.kind;$('#modal-number').textContent=p.number;$('#modal-art').className='modal-art '+key;$('#modal-stack').replaceChildren(...p.tags.map(tag=>{const el=document.createElement('span');el.textContent=tag;return el}));
 const actions=$('#modal-actions');actions.replaceChildren();
 const addButton=(label,href,secondary)=>{const a=document.createElement('a');a.className='modal-button'+(secondary?' secondary':'');a.href=href;a.target='_blank';a.rel='noopener noreferrer';const l=document.createElement('span');l.textContent=label;const arrow=document.createElement('span');arrow.textContent='↗';a.append(l,arrow);actions.appendChild(a)};
 if(p.demo){addButton('Launch interactive demo',p.demo,false);addButton('View GitHub source code',p.repo,true)}else addButton('View GitHub source code',p.repo,false);
 $('#modal-footnote').textContent=p.note;overlay.hidden=false;document.body.style.overflow='hidden';closeBtn.focus();
 if(changeURL){const url=new URL(location.href);url.searchParams.set('project',key);if(location.protocol==='https:'||location.protocol==='http:')history.pushState({project:key},'',url.pathname+url.search+url.hash)}
}
function closeProject(changeURL=true){if(overlay.hidden)return;overlay.hidden=true;document.body.style.overflow='';if(changeURL)cleanURL();prevFocus?.focus?.()}
closeBtn.addEventListener('click',()=>closeProject());overlay.addEventListener('click',e=>{if(e.target===overlay)closeProject()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProject();if(e.key==='Tab'&&!overlay.hidden){const els=[...overlay.querySelectorAll('button,a[href]')].filter(el=>el.getClientRects().length);if(els.length){const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}});
document.querySelectorAll('[data-open-project]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();showProject(b.dataset.openProject)}));
document.querySelectorAll('.project-row[data-project]').forEach(row=>{row.addEventListener('click',e=>{if(e.target.closest('a'))return;if(e.target.closest('button'))return;showProject(row.dataset.project)});row.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ') && e.target===row){e.preventDefault();showProject(row.dataset.project)}})});
window.addEventListener('popstate',()=>{const project=new URLSearchParams(location.search).get('project');if(project&&projectData[project])showProject(project,false);else closeProject(false)});
const firstProject=new URLSearchParams(location.search).get('project');if(firstProject&&projectData[firstProject])showProject(firstProject,false);
})();
