(()=>{const reduce=matchMedia('(prefers-reduced-motion: reduce)');let enabled=true;try{enabled=localStorage.getItem('teshuva-wave-motion')!=='off'}catch{}
const bars=document.querySelectorAll('#wave i');bars.forEach((bar,i)=>{bar.style.setProperty('--wave-time',(3.1+(i*17%23)/10)+'s');bar.style.setProperty('--wave-delay',(-i*.37)+'s')});
const label=document.createElement('label');label.className='check';const input=document.createElement('input');input.type='checkbox';input.id='waveMotion';const text=document.createElement('span');label.append(input,text);document.getElementById('tools').insertBefore(label,document.getElementById('tools').querySelector('details'));
function apply(){input.checked=enabled&&!reduce.matches;input.disabled=reduce.matches;text.textContent=reduce.matches?'תנועה מצומצמת לפי הגדרות המכשיר':'תנועה עדינה במרחב';document.body.classList.toggle('wave-paused',!enabled||reduce.matches)}
input.onchange=()=>{enabled=input.checked;try{localStorage.setItem('teshuva-wave-motion',enabled?'on':'off')}catch{}apply()};reduce.addEventListener('change',apply);apply();})();
(()=>{
const title=document.getElementById('title'), panel=document.createElement('div');panel.className='living-echo';panel.setAttribute('aria-hidden','true');document.getElementById('instruction').after(panel);
const drawings=[
'M40 150 Q40 96 77 94 Q104 93 104 131 M59 87 C20 80 30 24 63 30 C90 32 86 72 67 78 M81 150 Q73 117 103 114 Q133 112 143 151 M96 109 C70 88 96 64 115 78 C136 92 118 112 104 111 M44 112 Q51 140 92 139',
'M32 147 L37 109 Q22 103 25 87 L48 62 L66 70 Q93 66 110 88 L132 89 L145 108 L127 119 L120 149 M43 117 L48 149 M61 119 L71 145 M47 64 L48 36 L76 69 M112 101 L113 102 M125 120 Q91 123 71 104',
'M20 149 Q18 96 50 100 Q76 100 76 149 M37 91 C15 68 39 47 55 62 C75 82 51 99 37 91 M66 146 Q63 82 99 85 Q135 85 132 149 M84 76 C61 49 89 28 109 44 C128 68 106 87 84 76 M128 147 Q127 101 152 106 M139 96 C119 73 147 55 161 72 C176 92 154 108 139 96',
'M85 30 L139 125 L31 125 Z M85 150 L31 55 L139 55 Z',
'M21 107 Q43 85 59 105 L78 123 Q91 128 104 116 L123 103 Q137 93 155 104 M23 121 Q50 123 66 140 Q87 155 110 137 Q134 119 157 120 M59 81 Q87 97 116 80 L110 107 Q88 121 66 107 Z'
];let key='',lastWord='',lastEcho='';
window.updateQuietMotion=()=>{
 const p=current(),e=Math.max(0,state.total-state.left),id=state.i+':'+state.p;
 if(key!==id){key=id;lastWord='';lastEcho='';panel.replaceChildren();title.removeAttribute('aria-label');title.classList.remove('letter-word')}
 panel.hidden=state.ground||!!(p.voices&&(!p.linePortrait||e>=p.voiceAfter));panel.classList.toggle('has-echo-space',!!(p.voices||p.linePortrait));document.body.classList.toggle('motion-resting',!state.running);
 if(p.morph&&!state.ground){
 const t=Math.max(0,e-p.morphAfter),index=e<p.morphAfter?0:Math.floor(t/32)%p.morph.length,word=p.morph[index];
 if(word!==lastWord){title.replaceChildren();title.classList.add('letter-word');title.setAttribute('aria-label',word);[...word].forEach((c,i)=>{const n=document.createElement('span');n.textContent=c;n.setAttribute('aria-hidden','true');n.style.setProperty('--letter-x',((i%2?1:-1)*(18+i*9))+'px');n.style.setProperty('--letter-y',(i%2?20:-20)+'px');title.append(n)});lastWord=word}
 title.classList.toggle('letters-apart',e>=p.morphAfter&&t%32>26);
 }
 let echo='';if(p.voices&&e>=p.voiceAfter&&e<p.voiceUntil){const t=e-p.voiceAfter;if(t%16<12)echo=p.voices[Math.floor(t/16)%p.voices.length]}
 let art=-1;if(p.linePortrait&&e>=45&&e<145){const t=e-45;if(t%40<30)art=Math.floor(t/40)%drawings.length}
 const next=echo||String(art);if(next!==lastEcho){panel.replaceChildren();if(echo){const n=document.createElement('span');n.textContent=echo;panel.append(n)}else if(art>=0){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 180 180');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',drawings[art]);svg.append(path);panel.append(svg)}lastEcho=next}
};window.updateQuietMotion();
})();

(()=>{const wave=document.getElementById('wave').cloneNode(true);wave.removeAttribute('id');wave.setAttribute('aria-hidden','true');document.getElementById('listeningPath').after(wave)})();

/* A timed thought field: three independent lanes, no collision with the invitation. */
(()=>{
 const field=document.createElement('div');field.id='thoughtField';field.className='thought-field';field.hidden=true;field.setAttribute('aria-label','מחשבות חולפות. אפשר לגעת במילה ולתת לה להתפוגג.');
 document.getElementById('instruction').after(field);
 const slots=Array.from({length:3},(_,i)=>{const lane=document.createElement('div');lane.className='thought-lane';const button=document.createElement('button');button.type='button';button.className='thought-bubble';const ink=document.createElement('span');button.append(ink);const ring=document.createElement('i');ring.className='thought-ring';ring.setAttribute('aria-hidden','true');lane.append(button,ring);field.append(lane);return {lane,button,ink,ring,id:'',dismissed:false,at:0}});
 let phase='',previousElapsed=0;const prior=window.updateQuietMotion;
 window.updateQuietMotion=()=>{prior?.();const p=current(),e=Math.max(0,state.total-state.left),id=state.i+':'+state.p;
 const words=p.voices||[];const active=!!words.length&&!state.ground&&(!p.linePortrait||e>=p.voiceAfter);
 field.hidden=!active;document.body.classList.toggle('has-thought-field',active);
 if(phase!==id||e<previousElapsed){phase=id;slots.forEach(s=>{s.id='';s.dismissed=false;s.at=0})}previousElapsed=e;
 if(!active)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('wave-paused');
 const dense=state.i===1&&p.ear===1;const mobile=matchMedia('(max-width:600px)').matches;const count=dense?(mobile?2:3):1;
 field.dataset.density=String(count);
 const start=p.voiceAfter??90,end=p.voiceUntil??p.seconds-45;
 slots.forEach((s,i)=>{const time=e-start-i*9,cycle=Math.floor(Math.max(0,time)/42),age=((time%42)+42)%42;
 const visible=i<count&&time>=0&&e<end&&age<29;
 const wordIndex=dense?(cycle*count+i)%words.length:cycle%words.length;const identity=id+':'+i+':'+cycle;
 if(s.id!==identity){s.id=identity;s.dismissed=false;s.ink.textContent=words[wordIndex];s.button.setAttribute('aria-label',words[wordIndex]+' · לתת למחשבה להתפוגג');}
 const fading=s.dismissed?Math.min(1,(e-s.at)/3):0;
 let opacity=visible?Math.min(1,age/5,(29-age)/6):0;opacity*=1-fading;
 const dx=reduced?0:Math.sin(age/9+i*2)*9,dy=reduced?0:Math.cos(age/11+i)*7;
 s.lane.hidden=i>=count;s.button.style.opacity=Math.max(0,opacity);s.button.style.transform=`translate(${dx}px,${dy}px)`;
 s.button.style.visibility=visible&&opacity>.01?'visible':'hidden';s.button.disabled=!visible||s.dismissed;
 s.button.tabIndex=visible&&!s.dismissed?0:-1;
 const ripple=s.dismissed?e-s.at:-1;s.ring.style.opacity=ripple>=0&&ripple<8?String((1-ripple/8)*.6):'0';s.ring.style.transform=`scale(${reduced?1:1+Math.max(0,ripple)/6})`;
 s.button.onclick=()=>{if(!s.dismissed){s.dismissed=true;s.at=Math.max(0,state.total-state.left);s.button.style.opacity='.2';s.ring.style.opacity='.6';if(!state.running){s.at-=3;s.button.style.visibility='hidden';s.ring.style.transform='scale(1.3)'}}};
 });
 };
 const preview=document.createElement('button');preview.className='wide';preview.textContent='הצצה לשדה המחשבות';preview.onclick=()=>{document.getElementById('tools').close();change(1,1);state.left=state.total-112;state.running=true;state.deadline=Date.now()+state.left*1000;paint();save()};document.getElementById('tools').querySelector('.tool-buttons').after(preview);
 window.updateQuietMotion();
})();
