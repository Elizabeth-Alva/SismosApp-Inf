// Menú, tema, progreso, revelado al bajar, números animados e interacción con las capturas
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav=$('#nav'),btn=$('#menu');
btn.onclick=()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)};
$$('a',nav).forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}));
// tema
const raiz=document.documentElement;
try{const g=localStorage.getItem('tema');if(g)raiz.dataset.theme=g}catch(e){}
$('#tema').onclick=()=>{const osc=matchMedia('(prefers-color-scheme: dark)').matches;const act=raiz.dataset.theme||(osc?'dark':'light');const n=act==='dark'?'light':'dark';raiz.dataset.theme=n;try{localStorage.setItem('tema',n)}catch(e){}};
// menu activo
const links=$$('a',nav);
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});
$$('section[id],.hero[id],article.scr[id]').forEach(s=>io2.observe(s));
// progreso y boton subir
const prog=$('#progreso'),arr=$('#arriba');
const onScroll=()=>{const h=document.documentElement;const p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);prog.style.width=(p*100)+'%';arr.classList.toggle('show',h.scrollTop>600)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
arr.onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});
// revelado escalonado
$$('.card,.cp,.mc,.kpi,.sw,blockquote,.scr-body,.uso-nav a,section>h2,section>h3,.uso-hero,.veredicto,.flow,table,.pend,.note,figure,details').forEach((e,i)=>{e.classList.add('rv');const sib=[...e.parentElement.children].indexOf(e);e.style.setProperty('--d',Math.min(sib,6)*60+'ms')});
$$('.dn svg.dt circle').forEach((c,i)=>c.style.setProperty('--i',i));
const rev=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rev.unobserve(e.target);if(e.target.matches('.kpi'))contar(e.target)}}),{threshold:.12});
$$('.rv').forEach(e=>rev.observe(e));
// numeros que suben
function contar(k){const b=$('b',k);if(!b||reduce)return;const t=b.firstChild;const m=/^([\d.]+)(.*)$/.exec(t.textContent.trim());if(!m)return;const fin=parseFloat(m[1]),dec=(m[1].split('.')[1]||'').length,suf=m[2];const t0=performance.now();(function f(n){const p=Math.min((n-t0)/900,1),v=fin*(1-Math.pow(1-p,3));t.textContent=v.toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)})(t0)}
// leyenda <-> puntos
$$('.scr-body').forEach(b=>{const dots=$$('.dot',b),lis=$$('.leg li',b);const set=(n,on)=>{dots.forEach(d=>d.classList.toggle('hot',on&&d.textContent.trim()==n));lis.forEach(l=>l.classList.toggle('hot',on&&l.value==n))};
 lis.forEach(l=>{l.tabIndex=0;['mouseenter','focus'].forEach(ev=>l.addEventListener(ev,()=>set(l.value,true)));['mouseleave','blur'].forEach(ev=>l.addEventListener(ev,()=>set(l.value,false)))});
 dots.forEach(d=>{d.tabIndex=0;d.setAttribute('role','button');const n=d.textContent.trim();['mouseenter','focus'].forEach(ev=>d.addEventListener(ev,()=>set(n,true)));['mouseleave','blur'].forEach(ev=>d.addEventListener(ev,()=>set(n,false)));d.addEventListener('click',()=>{const l=lis.find(x=>x.value==n);if(l){l.scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'});set(n,true);setTimeout(()=>set(n,false),1800)}})})});
// copiar codigo
$$('pre').forEach(p=>{const b=document.createElement('button');b.className='copiar';b.textContent='Copiar';b.onclick=async()=>{try{await navigator.clipboard.writeText(p.innerText.replace(/Copiar\s*$/,'').trim());b.textContent='¡Copiado!'}catch(e){b.textContent='Selecciona y copia'}setTimeout(()=>b.textContent='Copiar',1600)};p.appendChild(b)});
// Tablas: en pantallas chicas cada fila se muestra como tarjeta con su encabezado
$$('table').forEach(t=>{const hs=$$('tr:first-child th',t).map(h=>h.textContent);$$('tr',t).forEach(r=>[...r.children].forEach((c,i)=>{if(c.tagName==='TD'&&hs[i])c.setAttribute('data-l',hs[i])}))});
