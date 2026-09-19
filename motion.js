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
 const words=p.voices||[];const active=!!words.length&&!state.ground&&(!p.linePortrait||e>=p.voiceAfter||!!window.thoughtsLive);
 field.hidden=!active;document.body.classList.toggle('has-thought-field',active);
 if(phase!==id||e<previousElapsed){phase=id;slots.forEach(s=>{s.id='';s.dismissed=false;s.at=0})}previousElapsed=e;
 if(!active)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('wave-paused');
 const dense=state.i===1&&p.ear===1;const mobile=matchMedia('(max-width:600px)').matches;const count=dense?(mobile?2:3):1;
 field.dataset.density=String(count);
 const start=window.thoughtsLive?.start??p.voiceAfter??90,end=window.thoughtsLive?Infinity:(p.voiceUntil??p.seconds-45);
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
 window.updateQuietMotion();
})();

/* Live controls and a continuous, reversible letter choreography. */
(()=>{
 const title=document.getElementById('title'),instruction=document.getElementById('instruction');
 const controls=document.createElement('div');controls.className='field-controls';controls.setAttribute('aria-label','תנועה במרחב');document.getElementById('phaseClock').parentElement.after(controls);
 const motion=document.createElement('button'),variation=document.createElement('button'),thought=document.createElement('button');
 motion.id='wordMotionToggle';variation.id='wordVariation';thought.id='thoughtToggle';variation.textContent='תנועה אחרת';controls.append(motion,variation,thought);
 let key='',paused=false,hold=0,bias=0,word='',anchor=-1;
 const elapsed=()=>Math.max(0,Math.min(state.total,state.running?state.total-(state.deadline-Date.now())/1000:state.total-state.left));
 const active=()=>!state.ground&&current().visual==='word'&&!/\s/.test(current().title.trim());
 function start(){if(!state.running&&state.left>0)toggle()}
 motion.onclick=()=>{if(!state.running){start();paused=false}else if(paused){bias=hold-elapsed();paused=false}else{hold=elapsed()+bias;paused=true}sync()};
 variation.onclick=()=>{bias+=40;paused=false;start();sync()};
 thought.onclick=()=>{if(window.thoughtsLive){window.thoughtsLive=null}else{window.thoughtsLive={start:Math.max(0,state.total-state.left)-8};start()}paint()};
 const anchors=[['לקראת יום כיפור, רציתי שנעצור יחד.\nלהקשיב למה שעוד לא הצלחנו לומר.','ביום הזה אני רוצה לפנות מקום\nלמה שנשאר ביני לבין עצמי.','נהיה כאן בשקט.\nהמילים שעל המסך ילוו אותנו.','אולי יעלה אדם. אולי רגע.\nאפשר לתת להם להיות כאן.','אנחנו יחד.\nכל אחת עם מה שחי בה עכשיו.']];
 function sync(){const id=state.i+':'+state.p;if(key!==id){key=id;paused=false;bias=0;word='';anchor=-1;window.thoughtsLive=null}
 const yes=active();motion.hidden=variation.hidden=!yes;thought.hidden=!current().voices||state.ground;controls.hidden=!yes&&thought.hidden;
 motion.textContent=paused?'להמשיך את התנועה':state.running?'להניח למילה לנוח':'להתחיל שהייה ותנועה';motion.setAttribute('aria-pressed',String(!paused&&state.running));thought.textContent=window.thoughtsLive?'להחזיר שקט למסך':'להציף מחשבות';thought.setAttribute('aria-pressed',String(!!window.thoughtsLive));
 if(!state.ground&&((state.i===0&&state.p===0)||current().guides)){const list=current().guides||anchors[0],i=Math.min(list.length-1,Math.floor(elapsed()/(current().guides?(current().guideEvery||30):25)));instruction.textContent=list[i];if(anchor!==i){anchor=i;instruction.getAnimations().forEach(a=>a.cancel());if(!matchMedia('(prefers-reduced-motion: reduce)').matches)instruction.animate([{opacity:.1,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:1800,easing:'ease-out'})}}
 if(yes&&(word!==current().title||!title.classList.contains('letter-word')||!title.children.length)){word=current().title;title.replaceChildren();title.classList.add('letter-word','continuous-word');title.classList.remove('letters-apart');title.setAttribute('aria-label',word);[...word].forEach(c=>{const n=document.createElement('span');n.textContent=c;n.setAttribute('aria-hidden','true');title.append(n)})}
 if(!yes){title.classList.remove('continuous-word');word=''}
 }
 const prior=window.updateQuietMotion;window.updateQuietMotion=()=>{sync();prior();sync()};
 function frame(){if(active()){
 const t=paused?hold:elapsed()+bias;const pace=Math.min(1,state.total/((current().letterForms?.length||1)*32.8)),lengths=[24,36,28,44,32].map(x=>x*pace),sum=164*pace;let local=((t%sum)+sum)%sum,k=0;while(local>=lengths[k])local-=lengths[k++];const u=local/lengths[k];
 // Hold whole, open slowly, then gather fully. Every cycle has its own path.
 const amp=u<.12||u>.92?0:Math.pow(Math.sin(Math.PI*(u-.12)/.8),2);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('wave-paused');
 const nodes=[...title.children],forms=current().letterForms||[word],ordinal=Math.floor(t/sum)*5+k,from=ordinal===0?word:forms[(ordinal-1)%forms.length],to=forms[ordinal%forms.length];const norm=c=>({'ם':'מ','ן':'נ','ך':'כ','ף':'פ','ץ':'צ'}[c]||c);function layout(text){const used=new Set(),parts=[];let space=false;for(const c of text){if(/\s/.test(c)){space=true;continue}if(/[א-ת]/.test(c)){const at=[...word].findIndex((v,j)=>!used.has(j)&&norm(v)===norm(c));if(at<0)continue;used.add(at);parts.push({i:at,c,before:space,punct:''});space=false}else if(parts.length&&/[׳',]/.test(c))parts[parts.length-1].punct+=c}const gap=parseFloat(getComputedStyle(title).gap)||0,em=parseFloat(getComputedStyle(title).fontSize),spaceWidth=em*.22,widths=parts.map(p=>nodes[p.i].offsetWidth+(p.punct?em*.15:0)),total=widths.reduce((a,b)=>a+b,0)+gap*Math.max(0,parts.length-1)+parts.filter(p=>p.before).length*spaceWidth;let cursor=total/2;const result={};parts.forEach((p,j)=>{if(p.before)cursor-=spaceWidth;result[p.i]={x:cursor-nodes[p.i].offsetWidth/2,c:p.c,punct:p.punct};cursor-=widths[j]+gap});return result}const base=layout(word),a=layout(from),b=layout(to),blend=(1-Math.cos(Math.PI*Math.max(0,Math.min(1,(u-.2)/.6))))/2;const unit=Math.min(38,innerWidth*.045),n=nodes.length;
 nodes.forEach((el,i)=>{const c=i-(n-1)/2;let x=0,y=0,r=0;
 if(k===0){x=-c*unit*.6;y=Math.sin(i*1.7)*unit*.65}
 if(k===1){x=Math.sin(i*2.1)*unit;y=Math.cos(i*2.1)*unit*.85;r=(i%2?1:-1)*9}
 if(k===2){x=-c*unit*.42;y=c*unit*.46;r=c*4}
 if(k===3){x=Math.sin(i*1.9)*unit*.6;y=(i%2?1:-1)*unit;r=(i%2?1:-1)*5}
 if(k===4){x=-c*unit*.7;y=Math.cos(i*1.3)*unit*.45}
 const ax=a[i]?.x??base[i].x,bx=b[i]?.x??base[i].x,shift=ax+(bx-ax)*blend-base[i].x,visibility=(a[i]?1:0)*(1-blend)+(b[i]?1:0)*blend;el.textContent=reduced?[...word][i]:(blend>.5?(b[i]?.c??[...word][i]):(a[i]?.c??[...word][i]));el.dataset.punctuation=reduced?'':(blend>.5?(b[i]?.punct||''):(a[i]?.punct||''));el.style.transform=reduced?'none':`translate(${shift+x*amp}px,${y*amp}px) rotate(${r*amp}deg)`;el.style.opacity=String(reduced?1:(.075+.925*visibility)*(1-amp*.25));el.style.filter=reduced?'none':`blur(${amp*.45}px)`;
 });}requestAnimationFrame(frame)}sync();requestAnimationFrame(frame);
})();

/* Examples remain separate from participants' submitted lines. */
(()=>{const box=document.createElement('div');box.className='passing-example';box.hidden=true;document.getElementById('instruction').after(box);const label=document.createElement('small'),line=document.createElement('p');label.textContent='אולי המשפט שלך מתחיל אחרת…';box.append(label,line);const prior=window.updateQuietMotion;let key='';window.updateQuietMotion=()=>{prior();const p=current(),e=Math.max(0,state.total-state.left),examples=p.examples;box.hidden=state.ground||!examples;if(examples&&!state.ground){const i=Math.min(examples.length-1,Math.floor(e/(p.exampleEvery||30))),id=state.i+':'+state.p+':'+i;line.textContent=examples[i];if(key!==id){key=id;box.getAnimations().forEach(a=>a.cancel());if(!matchMedia('(prefers-reduced-motion:reduce)').matches)box.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:3000,fill:'both'})}}};window.updateQuietMotion()})();
(()=>{const note=document.createElement('div');note.className='letter-number';note.hidden=true;note.textContent='ס 60 · ל 30 · י 10 · ח 8 · ה 5 = 113';note.setAttribute('aria-label','ערכי האותיות בגימטריה: סליחה, מאה ושלוש עשרה');document.getElementById('title').after(note);const prior=window.updateQuietMotion;window.updateQuietMotion=()=>{prior();const e=state.total-state.left;note.hidden=state.ground||!current().gematria||e<150||e>=180};const details=document.createElement('details'),summary=document.createElement('summary'),p=document.createElement('p'),a=document.createElement('a');summary.textContent='השראת צירופי האותיות';p.textContent='משחק האותיות הוא יצירה אמנותית בהשראת הצירוף וההמרה בספר יצירה, ב:ב. המספר 113 הוא סכום ערכי האותיות של סליחה בגימטריה רגילה; לא מיוחסת לו כאן משמעות קבלית נוספת. ';a.href='https://www.sefaria.org/Sefer_Yetzirah.2.2?lang=he';a.textContent='למקור בספר יצירה';a.target='_blank';a.rel='noopener';p.append(a);details.append(summary,p);document.getElementById('tools').append(details);window.updateQuietMotion()})();
