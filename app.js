const nav=document.getElementById('nav'),btn=document.getElementById('menu');
btn.onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const links=[...nav.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));
// Tablas: en pantallas chicas cada fila se muestra como tarjeta con su encabezado
document.querySelectorAll('table').forEach(t=>{const hs=[...t.querySelectorAll('tr:first-child th')].map(h=>h.textContent);t.querySelectorAll('tr').forEach(r=>[...r.children].forEach((c,i)=>{if(c.tagName==='TD'&&hs[i])c.setAttribute('data-l',hs[i])}))});
