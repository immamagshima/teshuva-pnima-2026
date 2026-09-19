const $=id=>document.getElementById(id),KEY='teshuva-shared-quiet-90-v2',LINES='teshuva-song-lines-v1';
let state={i:0,p:0,left:120,total:120,running:false,deadline:0,auto:false,quiet:false,ground:false,gate:false,noise:0},lines=[],draft=[],trackURL=null;
try{const old=JSON.parse(localStorage.getItem(KEY));if(old&&SCENES[old.i]?.phases[old.p])state={...state,...old,running:false,deadline:0,quiet:false};const saved=JSON.parse(localStorage.getItem(LINES)||'[]');if(Array.isArray(saved))lines=saved.filter(x=>typeof x==='string')}catch(e){}
const beats=SCENES.flatMap((s,i)=>s.phases.map((p,j)=>[i,j]));
function save(){try{localStorage.setItem(KEY,JSON.stringify({...state,running:false,deadline:0,quiet:false}));localStorage.setItem(LINES,JSON.stringify(lines))}catch(e){toast('השמירה בדפדפן אינה זמינה. אפשר להוריד את השורות לקובץ.')}}
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toast.id);toast.id=setTimeout(()=>$('toast').classList.remove('show'),3200)}
function format(n){n=Math.max(0,Math.ceil(n));return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
function current(){return SCENES[state.i].phases[state.p]}
function songLines(){return typeof allSongLines==='function'?allSongLines():lines}
let wallSignature='';
function renderWall(){const displayLines=songLines(),wall=$('wall'),sig=JSON.stringify(displayLines);if(sig===wallSignature)return;wallSignature=sig;wall.replaceChildren();if(!displayLines.length){const p=document.createElement('p');p.className='empty';p.textContent='כאן יופיעו המשפטים שתבחרו להניח יחד.';wall.append(p)}else displayLines.forEach((t,i)=>{const p=document.createElement('p');p.textContent=t;p.style.setProperty('--arrival',Math.min(i,12)*.12+'s');wall.append(p)})}
function paint(){let s=SCENES[state.i],p=current(),visual=state.ground?'horizon':p.visual;
 document.body.dataset.visual=visual;document.body.classList.toggle('quiet-mode',state.quiet);document.body.classList.toggle('grounded',state.ground);document.body.classList.toggle('gate-open',state.gate);
 if(!p.morph||state.ground)$('title').textContent=state.ground?'חוזרות לכאן':p.title;
 $('instruction').textContent=state.ground?'הביטי בחדר. הרגישי את הרגליים על הרצפה.\nאפשר לנוע, לשתות או לבקש קשר.':p.text;
 $('mode').textContent=state.ground?'אפשר לעצור ולהיעזר':visual==='listen'?'מקשיבות בשקט':p.chat?'מילים בצ׳אט · הקשבה בינינו':visual==='word'?'מילה אחת. זמן להקשיב.':visual==='eyes'?'הביטי בנשים שנמצאות כאן':'יחד, בשקט';
 $('listeningPath').hidden=s.kind!=='listen'||state.ground; [...$('listeningPath').children].forEach((n,i)=>n.classList.toggle('active',i===p.ear));
 $('phaseClock').textContent=format(state.left); $('phaseTimeLabel').textContent=p.chat?'זמן לשיתוף בצ׳אט':s.kind==='listen'?'זמן להקשבה':'זמן לשהייה';
 const elapsed=Math.max(0,state.total-state.left); const words=p.floatWords||[]; const shown=state.ground||(p.hideAfter&&elapsed>=p.hideAfter)?0:Math.min(words.length,Math.max(0,Math.floor((elapsed-(p.revealAfter||0))/(p.floatStep||5))+1));
 const cloud=$('floatingWords'); cloud.hidden=!words.length||elapsed<(p.revealAfter||0)||!!(p.hideAfter&&elapsed>=p.hideAfter+4)||state.ground; if(cloud.dataset.phase!==state.i+':'+state.p){cloud.replaceChildren(); words.forEach(w=>{const n=document.createElement('span');n.textContent=w;cloud.append(n)});cloud.dataset.phase=state.i+':'+state.p} [...cloud.children].forEach((n,i)=>n.classList.toggle('surfaced',i<shown));
 $('chatInvitation').hidden=state.ground||p.chatAfter===undefined||elapsed<p.chatAfter;
 $('noise').hidden=visual!=='noise';[...$('noise').children].forEach((n,i)=>n.classList.toggle('gone',i<state.noise));
 [...$('wave').children].forEach((n,i)=>{const amp=Math.max(2,(Math.sin(i*1.7)*22+28)*(1-state.noise/4));n.style.height=amp+'px';n.style.opacity=String(1-state.noise*.15)});
 $('wall').hidden=visual!=='wall';if(visual==='wall')renderWall();
 $('songSettings').hidden=visual!=='music';$('stageAction').hidden=!['noise','gate','wall','music'].includes(visual);$('stageAction').textContent=visual==='noise'?(state.noise>=4?'הרעש נחלש. להקשיב.':'להנמיך עוד שכבה'):visual==='gate'?(state.gate?'להישאר עם הפתח':'לפנות מקום'):visual==='wall'?'מרחב השיר · המילים שהגיעו':($('songAudio').paused?'להשמיע את שיר הסיום':'להשהות את השיר');
 $('stageAction').disabled=visual==='noise'&&state.noise>=4;
 $('clock').textContent=format(state.left);$('play').textContent=state.running?'להשהות':state.left<=0?'לשהות שוב':'להתחיל שהייה';$('play').disabled=state.ground;
 $('progress').style.width=Math.min(100,Math.max(0,1-state.left/state.total)*100)+'%';
 $('timerStatus').textContent=state.ground?'הזמן ממתין איתנו':state.left<=0?'אפשר להמשיך, כשאנחנו מוכנות':state.running?'נותנות לזה זמן':state.left<state.total?'השהייה ממתינה':'אפשר להישאר עם מה שעולה';
 $('position').textContent=s.title+' · '+s.time+' · פעימה '+(state.p+1)+' מתוך '+s.phases.length;
 $('auto').checked=state.auto;$('ground').textContent=state.ground?'לחזור לרגע הקודם':'חזרה לקרקע';$('returnControls').hidden=!state.quiet;$('quiet').setAttribute('aria-pressed',String(state.quiet));
 const b=beats.findIndex(([i,j])=>i===state.i&&j===state.p);$('back').disabled=b===0;$('next').disabled=b===beats.length-1;$('next').textContent=b===beats.length-1?'המפגש הושלם':state.p===s.phases.length-1?'למרחב הבא ←':'הפעימה הבאה ←';
 if(p.consent&&!state.ground)$('next').textContent='הלבבות כאן. נכנסות יחד ←';
 [...$('map').children].forEach((n,i)=>n.setAttribute('aria-current',String(i===state.i)));
 window.updateQuietMotion?.();
 if(window.updateSongInvite)updateSongInvite();
}
function change(i,p=0){const next=SCENES[i]?.phases[p];if(!next)return;pauseMusic();state={...state,i,p,left:next.seconds,total:next.seconds,running:false,deadline:0,ground:false,gate:false,noise:0};paint();save();window.scrollTo({top:0,behavior:'instant'})}
function move(d){const b=beats.findIndex(([i,j])=>i===state.i&&j===state.p);const n=beats[b+d];if(n)change(...n)}
function toggle(){if(state.ground)return;if(state.left<=0)state.left=state.total;state.running=!state.running;state.deadline=Date.now()+state.left*1000;paint();save()}
for(let i=0;i<49;i++){const bar=document.createElement('i');$('wave').append(bar)}
SCENES.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s.time+' · '+s.title;b.onclick=()=>{change(i);$('tools').close()};$('map').append(b)});
$('back').onclick=()=>move(-1);$('next').onclick=()=>move(1);$('play').onclick=toggle;
$('menu').onclick=()=>$('tools').showModal();document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
$('quiet').onclick=()=>{state.quiet=true;paint()};$('returnControls').onclick=()=>{state.quiet=false;paint()};
$('reset').onclick=()=>{state.running=false;state.left=current().seconds;state.total=state.left;paint();save();toast('הזמן אופס')};
$('more').onclick=()=>{state.left+=60;state.total+=60;if(state.running)state.deadline+=60000;paint();save();toast('נוספה דקה')};
$('auto').onchange=e=>{state.auto=e.target.checked;save()};
$('ground').onclick=()=>{state.ground=!state.ground;state.running=false;pauseMusic();$('tools').close();paint();save()};
$('full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();$('tools').close()}catch(e){toast('אפשר לעבור למסך מלא דרך הדפדפן')}};
function openCollector(){if(window.openLiveRoom)return window.openLiveRoom();openLegacyCollector()}
function openLegacyCollector(){state.running=false;paint();save();if($('tools').open)$('tools').close();$('collector').showModal();$('collectionStatus').textContent=lines.length+' שורות שמורות לשיר'}
$('collect').onclick=openCollector;$('viewWall').onclick=()=>{const i=SCENES.findIndex(s=>s.phases.some(p=>p.visual==='wall'));change(i,SCENES[i].phases.findIndex(p=>p.visual==='wall'));$('tools').close()};
$('stageAction').onclick=()=>{const v=document.body.dataset.visual;if(v==='noise'){state.noise=Math.min(4,state.noise+1);paint();save()}if(v==='gate'){state.gate=!state.gate;paint();save()}if(v==='wall')openCollector();if(v==='music'){if(trackURL){if($('songAudio').paused)$('songAudio').play().catch(()=>toast('לחצי על נגן השיר כדי להתחיל'));else $('songAudio').pause()}else{$('songFile').click()}}};
function review(){const container=$('review');container.replaceChildren();draft.forEach((text,i)=>{const row=document.createElement('div');row.className='review-row';const area=document.createElement('textarea');area.value=text;area.setAttribute('aria-label','שורה '+(i+1)+' לשיר');area.oninput=()=>{draft[i]=area.value;$('approve').disabled=!draft.some(t=>t.trim())};const remove=document.createElement('button');remove.textContent='להסיר';remove.onclick=()=>{draft.splice(i,1);review()};row.append(area,remove);container.append(row)});$('approve').disabled=!draft.some(t=>t.trim())}
$('parse').onclick=()=>{draft=[];for(const line of $('chatInput').value.split(/\r?\n/)){const m=line.match(/(?:^|\s)לשיר\s*[:：]\s*(.+)$/u);if(m&&m[1].trim())draft.push(m[1].trim())}review();$('parseStatus').textContent=draft.length?'נמצאו '+draft.length+' שורות מסומנות. בדקי וערכי לפני ההוספה.':'לא נמצאו שורות עם הסימון לשיר:. לא הוספנו שיתוף רגיל.'};
$('approve').onclick=()=>{const valid=draft.map(t=>t.trim()).filter(Boolean);lines.push(...valid);draft=[];$('chatInput').value='';review();save();renderWall();$('parseStatus').textContent='';$('collectionStatus').textContent=valid.length+' שורות נוספו. בסך הכול '+lines.length+' שורות לשיר.'};
function songText(){return 'שורות המשתתפות לשיר סליחה\nמקור לעריכה, לא להדבקה ישירה ב-Suno לפני ניקוד ובדיקת הגייה.\n\n'+songLines().join('\n')}
$('copy').onclick=async()=>{if(!lines.length)return toast('עדיין אין שורות שמורות');try{await navigator.clipboard.writeText(songText());$('collectionStatus').textContent='כל '+lines.length+' השורות הועתקו.'}catch(e){const a=document.createElement('textarea');a.value=songText();$('collector').append(a);a.focus();a.select();$('collectionStatus').textContent='סמני והעתיקי מהתיבה שנפתחה, או שמרי קובץ.'}};
$('download').onclick=()=>{if(!lines.length)return toast('עדיין אין שורות שמורות');const url=URL.createObjectURL(new Blob(['\ufeff'+songText()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='שורות-המשתתפות-לשיר-סליחה.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('collectionStatus').textContent='הקובץ הוכן להורדה.'};
$('clear').onclick=()=>{if(!lines.length)return;if(confirm('למחוק את כל השורות השמורות בדפדפן הזה?')){lines=[];save();renderWall();$('collectionStatus').textContent='השורות נמחקו.'}};
function pauseMusic(){const audio=$('songAudio');if(audio)audio.pause()}
$('songFile').onchange=e=>{pauseMusic();if(trackURL)URL.revokeObjectURL(trackURL);const file=e.target.files[0];if(!file){trackURL=null;$('songAudio').removeAttribute('src');return}trackURL=URL.createObjectURL(file);$('songAudio').src=trackURL;$('songName').textContent=file.name+' · מוכן להשמעה במפגש הזה';toast('השיר מוכן. ההשמעה תתחיל רק בלחיצה שלך.')};
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||/INPUT|TEXTAREA|BUTTON/.test(e.target.tagName))return;if(e.key==='ArrowLeft'){e.preventDefault();move(1)}if(e.key==='ArrowRight'){e.preventDefault();move(-1)}if(e.key===' '){e.preventDefault();toggle()}if(e.key.toLowerCase()==='h'){state.quiet=!state.quiet;paint()}});
let savedAt=0;setInterval(()=>{if(!state.running)return;state.left=Math.max(0,(state.deadline-Date.now())/1000);if(state.left===0){state.running=false;if(state.auto&&state.p<SCENES[state.i].phases.length-1){change(state.i,state.p+1);state.running=true;state.deadline=Date.now()+state.left*1000}}paint();if(Date.now()-savedAt>1500){save();savedAt=Date.now()}},250);
window.addEventListener('beforeunload',save);paint();
function productionPrompt(){return `צרי עכשיו שיר סיום למפגש הפתוח לקהל הרחב ״תשובה פנימה״ של קרן בן עמי, מתוך שורות המקור בהמשך. זהו שיר שנוצר בזמן המפגש כדי שנוכל להקשיב לו יחד בסופו. השיר יישלח למשתתפות בתום המפגש. כל משפט חדש נאסף עם הסכמה לשימוש ולעריכה. שמרי על כוונת הכותבת, ואל תהפכי כאב למחילה שלא נבחרה.

הכוונה: סליחה, בקשת סליחה, מחילה וחזרה להקשבה. תני לחומר האמיתי לקבוע את התנועה. אל תמציאי ציטוטי משתתפות, סיפור חיים או הבטחה למחילה. שמרי את כל שורות המקור ברשימה נפרדת; אם הן רבות, ארגני לשיר קוהרנטי והבהירי מה עובד ומה ציטוט. אין חובה להכניס כל שורה כמות שהיא או לכפות פזמון קיים. אין שמות ופרטים מזהים.

השפה של בין לבין: קול נשי קרוב ואנושי, נשימה וגרעיניות, סול עם גוון תפילה מזרחי, כלי נשיפה נמוך שעונה בין משפטים, סאבטקסט ומילים שאפשר לומר בפה. הפעם לפי בחירת קרן: איטי מאוד, עדין ושקט, 60 עד 64 BPM, שלוש וחצי עד ארבע דקות. התנועה היא בקִרבה, במרווחים ובהצטמצמות הליווי. ללא שיא ריקודי, מקהלה מנופחת, דרופ או עצירה מבהילה. לפתוח בקול קרוב, להרחיב מעט, לחזור לשקט ולהשאיר עשר שניות נשימה בסוף.

רפרנס מאושר למסגרת ההפקה: אל תעלי בלעדיי | B2 SOUL PRAYER, V5.5. לפני Generate יש לבדוק בממשק את המקור b6195bdd-0265-4053-b229-25e74da67242 או הפרסונה הרשומה ״קרן | קול קבוע | אל תעלי B2״. זו פרסונה מבוססת מקור, לא טענה לשכפול הקול האמיתי של קרן. אין להעתיק את מכת הטלפון, המעבר המקורי או המנגינה.

החזירי: 1. מילים בשפה מדוברת לעריכה. 2. בלוק נפרד של מילים עם ניקוד עברי מלא בכל מילה, כולל חזרות ומילות קישור, וכותרות מקטעים באנגלית בלבד. בלוק לא מנוקד אינו מוכן ל-Suno. 3. Style באנגלית, עד 1000 תווים, עם ספירת תווים. 4. שמרי את שורות המקור בנפרד מן העיבוד. אין להכריז שהשיר מוכן לפני האזנה ובדיקת הגייה. אל תשלחי או תפרסמי דבר.

שורות המקור שנמסרו לשיר:
${songLines().map((t,i)=>(i+1)+'. '+t).join('\n')}`}
$('production').onclick=async()=>{if(!lines.length)return toast('קודם נאסוף לפחות שורה אחת שניתנה לשיר');try{await navigator.clipboard.writeText(productionPrompt());$('collectionStatus').textContent='הועתקו פרוטוקול השיר וכל '+lines.length+' שורות המקור. מוכנות להעברה לכתיבה ולהפקה.'}catch(e){const area=document.createElement('textarea');area.value=productionPrompt();$('collector').append(area);area.select();$('collectionStatus').textContent='פרומפט ההפקה מוכן להעתקה מהתיבה.'}};

["play","pause","ended"].forEach(event=>$("songAudio").addEventListener(event,()=>{if(document.body.dataset.visual==="music")$("stageAction").textContent=$("songAudio").paused?"להשמיע את שיר הסיום":"להשהות את השיר"}));
