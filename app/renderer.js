'use strict';
/* Gallery v0.2.7 UI integration, based on approved v41 HTML design. Sample media availability and viewing progress are illustrative. */
const SVG={rewind10:'<path d="M7 9l-3 -3l3 -3"/><path d="M15.997 17.918a6.002 6.002 0 0 0 -.997 -11.918h-11"/><path d="M6 14v6"/><path d="M9 15.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0"/>',forward10:'<path d="M17 9l3 -3l-3 -3"/><path d="M8 17.918a5.997 5.997 0 0 1 -5 -5.918a6 6 0 0 1 6 -6h11"/><path d="M12 14v6"/><path d="M15 15.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0"/>',pause:'<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>',volume:'<path d="M4 9h4l5 -4v14l-5 -4H4z"/><path d="M17 8a6 6 0 0 1 0 8"/>',captions:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 11h5m-5 4h4m3 -4h5m-5 4h4"/>',maximize:'<path d="M9 3H3v6m12-6h6v6M9 21H3v-6m12 6h6v-6"/>',clapper:'<path d="M4 11h16v10H4zM4 11 2 6l17-4 3 5zM7 5l4 5m3-7 4 5"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="var(--window)"/><circle cx="15" cy="17" r="2" fill="var(--window)"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3z"/>',library:'<path d="M4 4v16M8 4v16M12 6v14M16 4l4 16M2 20h20"/>',download:'<path d="M12 2v13m-5-5 5 5 5-5M4 18v3h16v-3"/>',sliders:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="var(--window)"/><circle cx="16" cy="12" r="2" fill="var(--window)"/><circle cx="8" cy="18" r="2" fill="var(--window)"/>',play:'<path d="m9 6 10 6-10 6z"/>',share:'<path d="M12 16V3m-5 5 5-5 5 5M4 14v6h16v-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',import:'<path d="M12 3v13m-5-5 5 5 5-5M4 20h16"/>',bookmark:'<path d="M5 3h14v18l-7-5-7 5z"/>',close:'<path d="M5 5l14 14M19 5 5 19"/>',chevron:'<path d="m9 6 6 6-6 6"/>',check:'<path d="m4 12 5 5L20 6"/>',dots:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16m10-16v16M3 9h4m-4 6h4m10-6h4m-4 6h4"/>',arrow:'<path d="M5 12h14m-7-7 7 7-7 7"/>',heart:'<path d="M20.8 5.9a5 5 0 0 0-7.1 0L12 7.6l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 22l8.8-9a5 5 0 0 0 0-7.1z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c6 5 6 13 0 18M12 3c-6 5-6 13 0 18"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.2"/>',folder:'<path d="M3 6h7l2 3h9v11H3z"/>',back:'<path d="m14 5-7 7 7 7"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1"/>',headphones:'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14h4v7H5a2 2 0 0 1-2-2zm18 0h-4v7h2a2 2 0 0 0 2-2z"/>'};
function icon(name,size=19){return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SVG[name]||SVG.film}</svg>`;}
function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const demo=[
{id:'demo:quints',name:'The Quintessential Quintuplets',art:'linear-gradient(152deg,#3c425f 0%,#806c98 42%,#c68d9d 73%,#e8baab 100%)',episodes:12,status:'Completed',lang:'Sub / Dub',tags:['Watching'],blurb:'Futaro Uesugi becomes tutor to five identical sisters with very different personalities. This demo groups two TV seasons, the 2022 film, and the separate 2023 and 2024 two-part specials.'},
{id:'demo:solo',name:'Solo Leveling',art:'linear-gradient(150deg,#121a35,#415078 50%,#8b6ab1)',episodes:12,status:'Completed',lang:'Sub / Dub',tags:['Watching'],blurb:'A hunter gains an unusual ability after a dangerous dungeon encounter. Connected-season relationships are illustrative; audio availability is simulated.'},
{id:'demo:long',name:'The Endless Voyage · Layout Test',art:'linear-gradient(150deg,#17333e,#437b7a 50%,#ad9481)',episodes:12,status:'Completed',lang:'Sub / Dub',tags:[],blurb:'Fictional long-running series used to stress-test the season selector. All installments and provider data are invented for this interface demonstration.'},
{id:'demo:aot',name:'Attack on Titan',art:'linear-gradient(150deg,#334447,#697b77 50%,#958c76)',episodes:25,status:'Completed',lang:'Sub / Dub',tags:['Plan to Watch'],blurb:'Humanity struggles to survive behind enormous walls. This example demonstrates split seasons, parts, and related releases.'},
{id:'demo:01',name:'Moonlit Signals',art:'linear-gradient(145deg,#322554 2%,#74548f 51%,#c48b9c 100%)',episodes:12,status:'Completed',lang:'Sub / Dub',tags:['Watching','Comfort Picks'],blurb:'A quiet science-fiction story about late-night messages between distant worlds.'},
{id:'demo:02',name:'Astra Afterlight',art:'linear-gradient(145deg,#213654,#386e88 50%,#88c2c1 100%)',episodes:12,status:'Ongoing',lang:'Sub',tags:['Watching','Downloads'],blurb:'An observatory apprentice follows a mysterious new constellation.'},
{id:'demo:03',name:'Paper Crane Days',art:'linear-gradient(150deg,#513a60,#a57696 52%,#f4b6a1)',episodes:10,status:'Completed',lang:'Sub / Dub',tags:['Comfort Picks','Plan to Watch'],blurb:'A charming slice-of-life story about a neighborhood stationery shop.'},
{id:'demo:04',name:'The Glass Harbor',art:'linear-gradient(160deg,#233955,#4b6384 52%,#b8b3ca)',episodes:13,status:'Completed',lang:'Sub',tags:['Plan to Watch'],blurb:'A coastal town reveals its secrets whenever the tide retreats.'},
{id:'demo:05',name:'Golden Orchard',art:'linear-gradient(165deg,#75506b,#aa796d 55%,#f5bf80)',episodes:24,status:'Ongoing',lang:'Sub / Dub',tags:['Weekend Queue'],blurb:'Old friends reunite to save an orchard with an unusual history.'},
{id:'demo:06',name:'Neon Reverie',art:'linear-gradient(135deg,#252a5b,#7b57a3 55%,#d277ac)',episodes:12,status:'Completed',lang:'Dub',tags:['Downloads','Comfort Picks'],blurb:'A nighttime city adventure where every streetlight remembers a wish.'},
{id:'demo:07',name:'Summer in Orbit',art:'linear-gradient(160deg,#2e5f70,#6893b1 45%,#dbbd8b)',episodes:12,status:'Completed',lang:'Sub / Dub',tags:['Plan to Watch','Weekend Queue'],blurb:'A summer school trip becomes a tiny voyage across the solar system.'},
{id:'demo:08',name:'Silent Atlas',art:'linear-gradient(150deg,#3b364c,#64778d 50%,#8e95ad)',episodes:8,status:'Ongoing',lang:'Sub',tags:['Watching'],blurb:'An archivist searches for missing places in a changing city.'},
{id:'demo:09',name:'Wisteria Nights',art:'linear-gradient(150deg,#4d3467,#8e5f95 57%,#dd9db4)',episodes:12,status:'Completed',lang:'Sub / Dub',tags:['Comfort Picks'],blurb:'A gentle mystery unfolds beneath a street of flowering trees.'},
{id:'demo:10',name:'Skyline Letters',art:'linear-gradient(160deg,#23485b,#698b8f 50%,#b9c6ad)',episodes:12,status:'Completed',lang:'Sub',tags:['Plan to Watch'],blurb:'Two childhood friends reconnect through messages left on rooftops.'}
];
const state={playback:null,playbackReturnScroll:0,view:'discover',theme:'neon',tag:'All Titles',filterStatus:'All',filterAudio:'All',downloadStatus:'All',query:'',tags:['Watching','Downloads','Plan to Watch','Comfort Picks','Weekend Queue'],kind:{'Watching':'system','Downloads':'system','Plan to Watch':'system','Comfort Picks':'custom','Weekend Queue':'custom'},importDoc:null,detailId:null,detailSeason:0,detailEpisode:1,detailReturnView:'discover',detailReturnScroll:0,detailAudio:null,detailRelated:null,detailEpisodeFilter:'all',seasonTags:{},defaultPlayback:'sub',defaultDownload:'sub',defaultSubtitles:true};
const screen=document.getElementById('screen'); const workspace=document.getElementById('workspace'); const modalHost=document.getElementById('modal-host');
let modalExitTimer=null;
function countTag(t){return t==='All Titles'?demo.length:demo.filter(x=>x.tags.includes(t)).length;}
// Browser-only sliding-tab and label-anchored cursor-follow hover-pill experiment.
// No changes have been applied to the Gallery macOS application.
const tabOrder=['discover','library','downloads'];
const tabPagesViewport=document.getElementById('tab-pages-viewport');
const tabPagesTrack=document.getElementById('tab-pages-track');
const tabPages=Object.fromEntries(tabOrder.map(view=>[view,tabPagesViewport.querySelector(`[data-tab-page="${view}"]`)]));

/* v23 — One Mac-style overlay scrollbar for main tabs and anime overviews.
   It is anchored to the visible workspace rather than the hidden tabs viewport.
   No gutter is reserved; switching pages never reveals a native scrollbar. */
const tabScrollOverlay=document.getElementById('tab-scroll-overlay');
const tabScrollThumb=tabScrollOverlay.querySelector('.tab-scroll-thumb');
let tabScrollFadeTimer=null;
let tabScrollIntentUntil=0;
let tabScrollDragging=false;
function hideTabScrollOverlay(){
 clearTimeout(tabScrollFadeTimer);
 tabScrollOverlay.classList.remove('is-visible');
}
function currentScrollSurface(){
 if(workspace.classList.contains('tab-pages-visible')){
  return tabPagesViewport.hidden?null:tabPages[state.view];
 }
 return screen.hidden?null:workspace;
}
function positionScrollOverlay(){
 const appRect=document.querySelector('.app').getBoundingClientRect();
 const workspaceRect=workspace.getBoundingClientRect();
 tabScrollOverlay.style.top=Math.round(workspaceRect.top-appRect.top+6)+'px';
 tabScrollOverlay.style.bottom=Math.round(appRect.bottom-workspaceRect.bottom+6)+'px';
}
function updateTabScrollOverlay(){
 const page=currentScrollSurface();
 if(!page){hideTabScrollOverlay();return false;}
 positionScrollOverlay();
 const maxScroll=Math.max(0,page.scrollHeight-page.clientHeight);
 const trackHeight=tabScrollOverlay.clientHeight;
 if(maxScroll<=1||trackHeight<=0){hideTabScrollOverlay();return false;}
 const thumbHeight=Math.min(trackHeight,Math.max(40,Math.round(trackHeight*page.clientHeight/page.scrollHeight)));
 const thumbY=(trackHeight-thumbHeight)*(page.scrollTop/maxScroll);
 tabScrollThumb.style.height=thumbHeight+'px';
 tabScrollThumb.style.transform=`translate3d(0,${thumbY}px,0)`;
 return true;
}
function revealTabScrollOverlay(){
 if(!updateTabScrollOverlay())return;
 tabScrollOverlay.classList.add('is-visible');
 clearTimeout(tabScrollFadeTimer);
 tabScrollFadeTimer=setTimeout(()=>{if(!tabScrollDragging)tabScrollOverlay.classList.remove('is-visible')},950);
}
function signalUserScroll(){
 tabScrollIntentUntil=performance.now()+1400;
 revealTabScrollOverlay();
}
for(const page of Object.values(tabPages)){
 page.addEventListener('wheel',()=>{if(page===tabPages[state.view])signalUserScroll()}, {passive:true});
 page.addEventListener('touchmove',()=>{if(page===tabPages[state.view])signalUserScroll()}, {passive:true});
 page.addEventListener('scroll',()=>{
  if(page!==tabPages[state.view])return;
  updateTabScrollOverlay();
  if(performance.now()<tabScrollIntentUntil||tabScrollDragging)revealTabScrollOverlay();
 }, {passive:true});
}
/* The detail overview (and player screen) scroll inside workspace itself. */
workspace.addEventListener('wheel',event=>{
 if(currentScrollSurface()!==workspace)return;
 if(Math.abs(event.deltaY)>=Math.abs(event.deltaX)&&workspace.scrollHeight>workspace.clientHeight)signalUserScroll();
},{passive:true});
workspace.addEventListener('touchmove',()=>{
 if(currentScrollSurface()===workspace)signalUserScroll();
},{passive:true});
workspace.addEventListener('scroll',()=>{
 if(currentScrollSurface()!==workspace)return;
 updateTabScrollOverlay();
 if(performance.now()<tabScrollIntentUntil||tabScrollDragging)revealTabScrollOverlay();
},{passive:true});
document.addEventListener('keydown',event=>{
 const scrollKeys=['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '];
 if(!scrollKeys.includes(event.key)||modalHost.firstChild||!currentScrollSurface())return;
 if(event.target.closest('input,select,textarea,[contenteditable="true"]'))return;
 signalUserScroll();
});
// The visible thumb may be dragged, just like a native scrollbar.
let tabScrollDragStartY=0;
let tabScrollDragStartTop=0;
tabScrollThumb.addEventListener('pointerdown',event=>{
 if(event.button!==0||!updateTabScrollOverlay())return;
 event.preventDefault();
 tabScrollDragging=true;
 tabScrollDragStartY=event.clientY;
 tabScrollDragStartTop=currentScrollSurface().scrollTop;
 tabScrollOverlay.classList.add('is-dragging');
 tabScrollThumb.setPointerCapture(event.pointerId);
 clearTimeout(tabScrollFadeTimer);
});
tabScrollThumb.addEventListener('pointermove',event=>{
 if(!tabScrollDragging)return;
 const page=currentScrollSurface();
 if(!page){endTabScrollDrag();return;}
 const maxScroll=page.scrollHeight-page.clientHeight;
 const thumbTravel=tabScrollOverlay.clientHeight-tabScrollThumb.getBoundingClientRect().height;
 if(thumbTravel>0){page.scrollTop=tabScrollDragStartTop+(event.clientY-tabScrollDragStartY)*maxScroll/thumbTravel}
 revealTabScrollOverlay();
});
function endTabScrollDrag(){
 if(!tabScrollDragging)return;
 tabScrollDragging=false;
 tabScrollOverlay.classList.remove('is-dragging');
 revealTabScrollOverlay();
}
tabScrollThumb.addEventListener('pointerup',endTabScrollDrag);
tabScrollThumb.addEventListener('pointercancel',endTabScrollDrag);
window.addEventListener('resize',()=>requestAnimationFrame(updateTabScrollOverlay));

let tabPagesReady=false;
let tabTrackAnimation=null;
let tabTrackTarget='discover';
let pointerTab=null;
let pointerClientX=null;
let pointerOverTabs=false;
let focusedTab=null;
let pillCurrentX=null;
let pillTargetX=null;
let pillFrame=null;
let pillLastFrame=null;
// v19: keep v18's adaptive pointer following, but return to the selected
// tab more gently when the pointer leaves the entire navigation bar.
// No artificial delay: the return starts immediately and simply travels
// more slowly, regardless of the distance between tabs.
let pillReturningToActive=false;
const pillReturnTimeConstant=235;
// v18: retain soft ~170ms settling near a tab, but shorten the time constant
// to ~105ms when the pill has a long distance to travel. This preserves the
// established feel while avoiding excessive lag on rapid cross-bar movements.
const pillNearTimeConstant=170;
const pillFarTimeConstant=105;
function pillTimeConstant(distance){
 const amount=Math.max(0,Math.min(1,(distance-75)/365));
 // Smoothly blend instead of abruptly changing speed at a threshold.
 const eased=amount*amount*(3-2*amount);
 return pillNearTimeConstant+(pillFarTimeConstant-pillNearTimeConstant)*eased;
}

// Fit the capsule to the icon + label, with enough side padding for a
// small cursor-responsive shift without detaching it from the text.
function indicatorGeometry(view){
 const tabs=document.querySelector('.tabs');
 const button=tabs?.querySelector(`[data-view="${view}"]`);
 if(!tabs||!button)return null;
 const icon=button.querySelector('svg');
 const label=button.querySelector('span');
 const buttonBounds=button.getBoundingClientRect();
 const tabBounds=tabs.getBoundingClientRect();
 const iconBounds=icon?.getBoundingClientRect();
 const labelBounds=label?.getBoundingClientRect();
 const textWidth=iconBounds&&labelBounds
  ?labelBounds.right-iconBounds.left
  :(labelBounds?.width||buttonBounds.width*.55);
 const pillWidth=Math.min(buttonBounds.width-10,Math.max(82,textWidth+46));
 const pillHeight=Math.min(buttonBounds.height-2,42);
 return {
  center:buttonBounds.left-tabBounds.left+buttonBounds.width/2,
  buttonLeft:buttonBounds.left-tabBounds.left,
  buttonWidth:buttonBounds.width,
  // Only the spare padding can be used for cursor tracking. Reserve at
  // least 9px at either edge so the icon and text are never uncovered.
  followLimit:Math.min(15,Math.max(0,(pillWidth-textWidth)/2-9)),
  top:buttonBounds.top-tabBounds.top+(buttonBounds.height-pillHeight)/2,
  width:pillWidth,height:pillHeight
 };
}
function drawPill(center){
 const indicator=document.querySelector('.tab-indicator');
 if(indicator)indicator.style.transform=`translate3d(${center}px,0,0) translateX(-50%)`;
}
function advancePill(time){
 pillFrame=null;
 if(pillTargetX===null)return;
 const elapsed=pillLastFrame===null?16:Math.min(64,time-pillLastFrame);
 pillLastFrame=time;
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const remaining=Math.abs(pillTargetX-pillCurrentX);
 const timeConstant=pillReturningToActive?pillReturnTimeConstant:pillTimeConstant(remaining);
 const fraction=reduceMotion?1:1-Math.exp(-elapsed/timeConstant);
 pillCurrentX+=(pillTargetX-pillCurrentX)*fraction;
 if(Math.abs(pillTargetX-pillCurrentX)<.15)pillCurrentX=pillTargetX;
 drawPill(pillCurrentX);
 if(pillCurrentX!==pillTargetX)pillFrame=requestAnimationFrame(advancePill);
 else pillLastFrame=null;
}
function updateTabIndicator(){
 const indicator=document.querySelector('.tab-indicator');
 const tabs=document.querySelector('.tabs');
 const view=(pointerOverTabs&&pointerTab)||focusedTab||state.view;
 const geometry=indicatorGeometry(view);
 if(!indicator||!geometry||!tabs)return;
 indicator.style.top=geometry.top+'px';
 indicator.style.width=geometry.width+'px';
 indicator.style.height=geometry.height+'px';
 indicator.dataset.position=view;
 // Pointer motion *nudges* the pill inside its hovered tab, rather than
 // centering the entire capsule under the raw X coordinate. That former
 // behavior left the tab label completely outside the capsule at the edges.
 // The safe travel range is derived from the capsule's spare text padding.
 const bar=tabs.getBoundingClientRect();
 let centered=geometry.center;
 if(pointerOverTabs&&pointerTab&&pointerClientX!==null){
  const tabMidpoint=geometry.buttonLeft+geometry.buttonWidth/2;
  const cursorOffset=pointerClientX-bar.left-tabMidpoint;
  const normalized=Math.max(-1,Math.min(1,cursorOffset/(geometry.buttonWidth/2)));
  centered+=normalized*geometry.followLimit;
 }
 const margin=6;
 pillTargetX=Math.max(geometry.width/2+margin,Math.min(bar.width-geometry.width/2-margin,centered));
 if(pillCurrentX===null||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  pillCurrentX=pillTargetX;
  drawPill(pillCurrentX);
  return;
 }
 if(pillFrame===null){pillLastFrame=null;pillFrame=requestAnimationFrame(advancePill)}
}
function animateTabIndicator(){updateTabIndicator()}
// Pick the nearest *tab* using the cursor X coordinate, including the gaps
// between buttons. Never temporarily fall back to the selected tab while the
// pointer is still inside the navigation bar.
function nearestPointerTab(tabs,clientX){
 let nearest=null;
 let closest=Infinity;
 for(const button of tabs.querySelectorAll('.tab')){
  const bounds=button.getBoundingClientRect();
  const delta=Math.abs(clientX-(bounds.left+bounds.width/2));
  if(delta<closest){closest=delta;nearest=button.dataset.view;}
 }
 return nearest;
}
function setupTabHover(){
 const tabs=document.querySelector('.tabs');
 function pointToPointer(event){
  if(event.pointerType==='touch')return;
  pillReturningToActive=false;
  pointerOverTabs=true;
  pointerClientX=event.clientX;
  pointerTab=nearestPointerTab(tabs,event.clientX);
  tabs.classList.toggle('pill-hovering-other',pointerTab!==state.view);
  updateTabIndicator();
 }
 tabs.addEventListener('pointerenter',pointToPointer);
 tabs.addEventListener('pointermove',pointToPointer);
 tabs.addEventListener('pointerleave',event=>{
  if(event.pointerType==='touch')return;
  pillReturningToActive=true;
  pointerOverTabs=false;
  pointerClientX=null;
  pointerTab=null;
  tabs.classList.remove('pill-hovering-other');
  updateTabIndicator();
 });
 // Keyboard focus moves the pill between tab centers, even without a mouse.
 tabs.addEventListener('focusin',event=>{
  const button=event.target.closest('.tab');
  if(!button)return;
  focusedTab=button.dataset.view;
  pillReturningToActive=false;
  updateTabIndicator();
 });
 tabs.addEventListener('focusout',event=>{
  if(tabs.contains(event.relatedTarget))return;
  focusedTab=null;
  if(!pointerOverTabs)pillReturningToActive=true;
  updateTabIndicator();
 });
}
function updateActiveTab(view){
 const tabs=document.querySelector('.tabs');
 if(tabs)tabs.classList.toggle('pill-hovering-other',pointerOverTabs&&pointerTab!==null&&pointerTab!==view);
 for(const tab of document.querySelectorAll('.tab')){
  const active=tab.dataset.view===view;
  tab.classList.toggle('active',active);
  if(active)tab.setAttribute('aria-current','page');else tab.removeAttribute('aria-current');
 }
}
function tabViewContent(view){
 return view==='discover'?discover():view==='library'?library():downloads();
}
function selectedTabScroll(){
 return workspace.classList.contains('tab-pages-visible')
  ?tabPages[state.view].scrollTop:workspace.scrollTop;
}
function syncTabPanelAccessibility(){
 for(const view of tabOrder){
  const panel=tabPages[view];const active=view===state.view;
  panel.inert=!active;
  panel.setAttribute('aria-hidden',String(!active));
 }
}
function bindTabPageEvents(view){
 const content=tabPages[view].querySelector('.tab-page-content');
 const on=(id,fn)=>{const el=content.querySelector('#'+id);if(el)el.addEventListener('click',fn)};
 for(const el of content.querySelectorAll('[data-detail]'))el.addEventListener('click',()=>showDetail(el.dataset.detail));
 for(const el of content.querySelectorAll('[data-tag]'))el.addEventListener('click',()=>{hideTabScrollOverlay();state.tag=el.dataset.tag;render();});
 for(const el of content.querySelectorAll('[data-download-filter]'))el.addEventListener('click',()=>{hideTabScrollOverlay();state.downloadStatus=el.dataset.downloadFilter;render();});
 on('filters',showFilters);on('resume',()=>showDetail('demo:02'));
 on('import',showImport);on('newtag',showNewTag);on('sharetag',showShare);
 on('renametag',showRenameTag);on('deletetag',showDeleteTag);
 on('tag-options',()=>{
  const menu=content.querySelector('#tag-options-menu'),button=content.querySelector('#tag-options');
  if(!menu||!button)return;
  menu.hidden=!menu.hidden;
  button.setAttribute('aria-expanded',String(!menu.hidden));
 });
 on('openfolder',showFolderInfo);on('demo-finish-download',runDemoDownloadSimulation);
}
function updateLibraryTagRail(content,revealActive=false){
 const rail=content.querySelector('.tagbar');
 const row=content.querySelector('.library-tag-row');
 if(!rail||!row)return;
 const back=content.querySelector('#library-tag-prev');
 const next=content.querySelector('#library-tag-next');
 const refresh=()=>{
  const max=Math.max(0,rail.scrollWidth-rail.clientWidth);
  const overflow=max>2;
  row.classList.toggle('has-overflow',overflow);
  const left=overflow&&rail.scrollLeft>2,right=overflow&&rail.scrollLeft<max-2;
  back.disabled=!left;next.disabled=!right;
  rail.classList.toggle('can-left',left);
  rail.classList.toggle('can-right',right);
 };
 const pan=(direction)=>rail.scrollBy({left:direction*Math.max(140,rail.clientWidth*.7),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 back.addEventListener('click',()=>pan(-1));
 next.addEventListener('click',()=>pan(1));
 rail.addEventListener('scroll',refresh,{passive:true});
 const showActive=()=>{
  const selected=rail.querySelector('.tagchip.active');
  if(!selected)return;
  const r=rail.getBoundingClientRect(),a=selected.getBoundingClientRect();
  if(a.left<r.left+12)rail.scrollLeft-=r.left+12-a.left;
  else if(a.right>r.right-12)rail.scrollLeft+=a.right-r.right+12;
 };
 rail.galleryRefresh=(reveal=false)=>{
  // The arrows take up space when overflow begins. Measure only after
  // they've appeared, so selected tags stay visible when resizing.
  refresh();if(reveal)showActive();refresh();
 };
 rail.galleryRefresh(revealActive);
}
function renderTabPage(view){
 const panel=tabPages[view];
 const scroll=panel.scrollTop;
 const content=panel.querySelector('.tab-page-content');
 const priorTag=content.querySelector('.tagchip.active')?.dataset.tag;
 const tagScroll=content.querySelector('.tagbar')?.scrollLeft||0;
 content.innerHTML=tabViewContent(view);
 panel.dataset.initialized='true';
 bindTabPageEvents(view);
 panel.scrollTop=scroll;
 requestAnimationFrame(updateTabScrollOverlay);
 if(view==='library'&&content.querySelector('.tagbar')){
  content.querySelector('.tagbar').scrollLeft=tagScroll;
  updateLibraryTagRail(content,priorTag!==state.tag);
 }
}
function measuredTrackX(){
 const transform=getComputedStyle(tabPagesTrack).transform;
 return transform==='none'?0:new DOMMatrixReadOnly(transform).m41;
}
/* v13 — The track travels in % of the *current* viewport width, rather
   than pixels captured when a tab was clicked. Percentage transforms are
   automatically recomputed by the browser on window/container resize,
   including while a WAAPI slide is running. */
function tabTrackPercent(x){
 const width=tabPagesViewport.clientWidth;
 return width>0?x/width*100:0;
}
function tabTrackTransform(percent){return `translate3d(${percent}%,0,0)`;}
function freezeTabTrack(){
 if(!tabTrackAnimation)return measuredTrackX();
 const current=measuredTrackX();
 const transform=tabTrackTransform(tabTrackPercent(current));
 tabTrackAnimation.onfinish=null;
 tabTrackAnimation.cancel();
 tabTrackAnimation=null;
 tabPagesTrack.style.transform=transform;
 return current;
}
function snapTabTrack(view){
 freezeTabTrack();
 tabTrackTarget=view;
 tabPagesTrack.style.transform=tabTrackTransform(-tabOrder.indexOf(view)*100);
}
function animateTabTrack(view){
 const width=tabPagesViewport.clientWidth;
 if(width<=0)return;
 const from=freezeTabTrack();
 const fromPercent=tabTrackPercent(from);
 const destinationPercent=-tabOrder.indexOf(view)*100;
 tabTrackTarget=view;
 const toTransform=tabTrackTransform(destinationPercent);
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||Math.abs(fromPercent-destinationPercent)<.05){
  tabPagesTrack.style.transform=toTransform;
  return;
 }
 // A single uninterrupted trajectory through intermediate pages; both
 // keyframes remain relative to the viewport width even during resizing.
 const pages=Math.abs(destinationPercent-fromPercent)/100;
 const duration=Math.round(Math.max(160,Math.min(520,310*Math.pow(pages,.68))));
 const fromTransform=tabTrackTransform(fromPercent);
 tabPagesTrack.style.transform=toTransform;
 const running=tabPagesTrack.animate(
  [{transform:fromTransform},{transform:toTransform}],
  {duration,easing:'cubic-bezier(.32,.08,.22,1)',fill:'both'}
 );
 tabTrackAnimation=running;
 running.onfinish=()=>{
  if(tabTrackAnimation!==running)return;
  tabPagesTrack.style.transform=toTransform;
  tabTrackAnimation=null;
  running.cancel();
 };
}
function showTabPages(refreshCurrent=true){
 hideTabScrollOverlay();
 const returning=!workspace.classList.contains('tab-pages-visible');
 workspace.classList.add('tab-pages-visible');
 workspace.classList.remove('library-view');
 tabPagesViewport.hidden=false;
 screen.hidden=true;
 if(!tabPagesReady){
  tabOrder.forEach(renderTabPage);
  tabPagesReady=true;
 }else if(returning){
  tabOrder.forEach(renderTabPage);
 }else if(refreshCurrent){renderTabPage(state.view);}
 syncTabPanelAccessibility();
 if(returning)snapTabTrack(state.view);
}
function setView(view){
 if(!tabOrder.includes(view))return;
 const oldView=state.view;
 if(view!==oldView)hideTabScrollOverlay();
 const wasTop=!state.detailId&&!state.playback;
 if(oldView===view&&wasTop)return;
 state.playback=null;state.view=view;state.detailId=null;state.query='';
 updateActiveTab(view);
 if(!wasTop){
  render(); // Detail/player → main navigation; restore the persistent track.
 }else{
  if(!tabPages[view].dataset.initialized)renderTabPage(view);
  syncTabPanelAccessibility();
  animateTabTrack(view); // Interruptions immediately redirect from the current position.
 }
 updateTabIndicator();
}
function artCard(item){return `<article class="poster-item"><button class="poster-button" data-detail="${escapeHTML(item.id)}" title="View ${escapeHTML(item.name)}"><div class="poster" style="background:${item.art}"><span class="art-orb"></span><span class="poster-name">${escapeHTML(item.name)}</span></div><div class="poster-title">${escapeHTML(item.name)}</div><div class="meta">${escapeHTML(item.status)} · ${escapeHTML(item.lang)}</div></button></article>`;}
function gallery(items){return items.length?`<div class="poster-grid">${items.map(artCard).join('')}</div>`:'<div class="empty">No matching anime in this sample collection.</div>';}
function searchItems(items){if(!state.query.trim())return items;let q=state.query.trim().toLowerCase();return items.filter(x=>x.name.toLowerCase().includes(q));}
function pageHeader(title, actions='', secondary='', view=''){
  return `<section class="page-header page-header-${escapeHTML(view)}" aria-label="${escapeHTML(title)} page header"><div class="page-header-primary"><h1>${escapeHTML(title)}</h1><div class="page-header-actions">${actions}</div></div><div class="page-header-divider" aria-hidden="true"></div>${secondary?`<div class="page-header-secondary">${secondary}</div>`:''}</section>`;
}
function discover(){
 const matching=searchItems(demo).filter(x=>(state.filterStatus==='All'||x.status===state.filterStatus)&&(state.filterAudio==='All'||x.lang.includes(state.filterAudio)));
 const actions=`<button class="btn ghost page-filter-button" id="filters">${icon('sliders',18)} Filters${state.filterStatus!=='All'||state.filterAudio!=='All'?' · Active':''}</button>`;
 return `${pageHeader('Discover',actions,'','discover')}
 <section class="continue" aria-label="Continue watching"><div class="continue-icon">${icon('play',27)}</div><div class="continue-copy"><div class="continue-heading">Continue watching</div><div class="continue-title">Astra Afterlight</div><div class="muted">Episode 6 of 12 · Sample viewing progress</div><div class="progress-track"><div class="progress-fill"></div></div></div><button class="btn primary" id="resume">${icon('play',15)} Resume</button></section>
 <section class="gallery-section" aria-label="Explore anime"><div class="section-row"><h2>Explore anime</h2><span class="muted">${matching.length} sample titles</span></div>${gallery(matching)}</section>`;
}
function library(){
 const titles=searchItems(state.tag==='All Titles'?demo:demo.filter(x=>x.tags.includes(state.tag)));
 const isCustom=state.kind[state.tag]==='custom';
 const isAll=state.tag==='All Titles';
 const actions=`<button class="btn" id="import">${icon('import',16)} <span>Import</span></button><button class="btn primary" id="newtag">${icon('plus',17)} <span>New Tag</span></button>`;
 const tagChip=(tag)=>{const active=state.tag===tag,custom=state.kind[tag]==='custom',count=countTag(tag);return `<button type="button" class="tagchip ${active?'active':''}" data-tag="${escapeHTML(tag)}" aria-pressed="${active}" aria-label="${escapeHTML(tag)}${custom?', custom tag':''}, ${count} titles" title="${custom?'Custom tag':'Built-in collection'}"><span>${escapeHTML(tag)}</span>${custom?`<span class="custom-tag-icon">${icon('bookmark',11)}</span>`:''}<span class="count">${count}</span></button>`;};
 const tags=`<div class="library-tag-row"><button type="button" class="library-tag-arrow library-tag-prev" id="library-tag-prev" aria-label="Scroll collections left">${icon('chevron',16)}</button><div class="tagbar" role="group" aria-label="Library collections">${tagChip('All Titles')}${state.tags.map(tagChip).join('')}</div><button type="button" class="library-tag-arrow library-tag-next" id="library-tag-next" aria-label="Scroll collections right">${icon('chevron',16)}</button></div>`;
 const shareAction=isAll?'':`<button class="btn small" id="sharetag" title="Share ${escapeHTML(state.tag)}">${icon('share',15)} <span>Share</span></button>`;
 const menu=isCustom?`<div class="collection-menu-wrap"><button class="btn small collection-options" id="tag-options" aria-label="More actions for ${escapeHTML(state.tag)}" aria-haspopup="menu" aria-expanded="false">${icon('dots',19)}</button><div class="collection-menu" id="tag-options-menu" role="menu" hidden><button type="button" role="menuitem" id="renametag">${icon('bookmark',15)} Rename tag</button><button type="button" role="menuitem" class="delete-tag-action" id="deletetag">${icon('close',15)} Delete tag</button></div></div>`:'';
 const kind=isAll?'All anime in your library':isCustom?'Custom tag':'Built-in collection';
 return `${pageHeader('My Library',actions,tags,'library')}
 <section class="library-collection" aria-label="Selected library collection"><div class="collections-head"><div class="col-title-row"><div><h2>${escapeHTML(state.tag)}</h2><div class="meta">${titles.length} ${titles.length===1?'title':'titles'} · ${kind}</div></div></div><div class="collection-actions">${menu}${shareAction}</div></div><div class="col-contents">${gallery(titles)}</div>${!isAll?'<p class="tip">Shared collections include titles and identifiers only — not videos, watch history, or private settings.</p>':''}</section>`;
}
// One fictional transfer is controllable to test the completion moment.
// The existing completed download starts with its percentage hidden.
const DEMO_COMPLETION_HOLD_MS=3000;
const demoTransfer={finished:false,finishedAt:0,hideTimer:null};
function demoTransferPercentageHidden(){
 return demoTransfer.finished && Date.now()-demoTransfer.finishedAt>=DEMO_COMPLETION_HOLD_MS;
}
function runDemoDownloadSimulation(){
 clearTimeout(demoTransfer.hideTimer);
 if(demoTransfer.finished){
  demoTransfer.finished=false;
  demoTransfer.finishedAt=0;
  renderTabPage('downloads');
  return;
 }
 demoTransfer.finished=true;
 demoTransfer.finishedAt=Date.now();
 const panel=tabPages.downloads;
 const row=panel.querySelector('[data-demo-download-id="demo:02"]');
 // Modify the existing track so the 61% → 100% change can animate.
 // If a filtered view excludes this item, simply re-render the filter.
 if(state.downloadStatus==='All' && row){
  row.dataset.completed='true';
  const status=row.querySelector('.download-status');
  if(status) status.textContent='Completed';
  const track=row.querySelector('.download-progress');
  track?.setAttribute('aria-valuenow','100');
  row.querySelector('.player-remaining')?.remove();
  const downloaded=row.querySelector('.player-watched');
  if(downloaded) downloaded.style.flexBasis='100%';
  const pct=row.querySelector('.download-percent');
  if(pct){pct.textContent='100%';pct.classList.remove('is-hidden')}
  const counts=panel.querySelectorAll('.download-filters .count');
  if(counts.length===3){counts[0].textContent='2';counts[1].textContent='0';counts[2].textContent='2'}
  const action=panel.querySelector('#demo-finish-download');
  if(action)action.textContent='Reset demo';
 }else{
  renderTabPage('downloads');
 }
 demoTransfer.hideTimer=setTimeout(()=>{
  // The state itself determines visibility after re-renders or tab switches.
  const current=tabPages.downloads.querySelector('[data-demo-download-id="demo:02"] .download-percent');
  current?.classList.add('is-hidden');
  demoTransfer.hideTimer=null;
 },DEMO_COMPLETION_HOLD_MS);
}
function downloads(){
 const list=demo.filter(x=>x.tags.includes('Downloads'));
 const all=list.map((x,i)=>({anime:x,status:i||demoTransfer.finished?'Completed':'Downloading',ep:i+2,audio:i?'Dub':'Sub',progress:i||demoTransfer.finished?100:61}));
 const filtered=state.downloadStatus==='All'?all:all.filter(x=>x.status===state.downloadStatus);
 const statuses=['All','Downloading','Completed'];
 const filters=`<div class="download-filters" role="group" aria-label="Download status">${statuses.map(status=>`<button class="filterpill ${status===state.downloadStatus?'active':''}" data-download-filter="${status}" aria-pressed="${status===state.downloadStatus}">${status} <span class="count">${status==='All'?all.length:all.filter(x=>x.status===status).length}</span></button>`).join('')}</div>`;
 const actions=`<button class="btn" id="openfolder">${icon('folder',16)} <span>Open Folder</span></button>`;
 return `${pageHeader('Downloads',actions,filters,'downloads')}
 <section class="downloads-list" aria-label="Download items">${filtered.length?filtered.map(({anime,status,ep,audio,progress})=>{
  const hidePercent=progress===100 && (anime.id!=='demo:02'||demoTransferPercentageHidden());
  return `<div class="download-row" data-demo-download-id="${escapeHTML(anime.id)}" data-completed="${progress===100}"><div class="tiny-art" style="background:${anime.art}"></div><div><div class="download-title">${escapeHTML(anime.name)}</div><div class="muted">Episode ${ep} · ${audio} · <span class="download-status">${status}</span></div><div class="download-progress-line"><div class="player-progress-bar download-progress" role="progressbar" aria-label="${escapeHTML(anime.name)} · Episode ${ep} download progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">${progress>0?`<div class="player-watched" style="flex-basis:${progress===100?'100%':`calc((100% - 5px) * ${progress/100})`}" aria-hidden="true"></div>`:''}${progress<100?'<div class="player-remaining" aria-hidden="true"></div>':''}</div><span class="download-percent ${hidePercent?'is-hidden':''}"${hidePercent?' aria-hidden="true"':''}>${progress}%</span></div></div><button class="btn small" data-detail="${escapeHTML(anime.id)}">Details ${icon('chevron',13)}</button></div>`;
 }).join(''):'<div class="empty">No downloads in this category.</div>'}<div class="demo-download-footer"><p class="tip">Download states are fictional. No transfers occur in this prototype.</p><button type="button" class="demo-download-control" id="demo-finish-download">${demoTransfer.finished?'Reset demo':'Simulate completion'}</button></div></section>`;
}

const seasonStories={
 'demo:01':['A signal after midnight','The distant reply','Orbits and echoes','A quiet visitor','Paper constellations','A light from home','The hidden station','Messages at dawn','Across the signal','A map of stars','The last transmission','First light'],
 'demo:02':['The new constellation','Under the observatory','Through the telescope','Northern horizon','A fragment of light','The second star','Before sunrise']
};
/* Connected records simulate a cached, verified relationship graph.
   Titles and release grouping use genuine naming conventions, but provider episode
   coverage, source matches, tags and progress below are design-only sample data.
   In the real app, IDs are cross-referenced and user corrections are explicit. */
const connectedMetadata={
 'demo:quints':{
   seasons:[
     {id:'quints-s1',label:'Season 1',title:'The Quintessential Quintuplets',seasonNumber:1,total:12,year:'2019',status:'Completed',sub:12,dub:12,sourceMatched:true,watched:4,downloaded:1},
     {id:'quints-s2',label:'Season 2',title:'The Quintessential Quintuplets ∬',seasonNumber:2,total:12,year:'2021',status:'Completed',sub:12,dub:12,sourceMatched:true,watched:0,downloaded:0}
   ],
   related:[
     {id:'quints-movie',title:'The Quintessential Quintuplets Movie',kind:'Movie',year:'2022',note:'The 2022 feature film, shown separately from the numbered TV seasons.',sourceMatched:true,total:1,sub:1,dub:1,status:'Completed',watched:0,downloaded:0},
     {id:'quints-sp-2023',title:'The Quintessential Quintuplets ∽',kind:'Special',year:'2023',note:'2023 special: two episodes, kept separate from the seasons and 2024 special.',sourceMatched:true,total:2,sub:2,dub:2,status:'Completed',watched:0,downloaded:0},
     {id:'quints-sp-2024',title:'The Quintessential Quintuplets ＊',kind:'Special',year:'2024',note:'2024 special: two episodes, kept separate from the 2023 special.',sourceMatched:true,total:2,sub:2,dub:2,status:'Completed',watched:0,downloaded:0}
   ]
 },
 'demo:solo':{
   seasons:[
     {id:'solo-s1',label:'Season 1',title:'Solo Leveling',seasonNumber:1,total:12,year:'2024',status:'Completed',sub:12,dub:12,sourceMatched:true,watched:4,downloaded:1},
     {id:'solo-s2',label:'Season 2',title:'Arise from the Shadow',seasonNumber:2,total:13,year:'2025',status:'Completed',sub:13,dub:9,sourceMatched:true,watched:0,downloaded:0}
   ],related:[]
 },
 'demo:long':{
   seasons:Array.from({length:18},(_,i)=>({id:`long-s${i+1}`,label:`Season ${i+1}`,title:i===0?'The Endless Voyage':i%3===0?`The Endless Voyage: Arc ${i+1}`:`Voyage Arc ${i+1} — ${['Dawn','Eclipse','North Star','Beyond the Horizon'][i%4]}`,seasonNumber:i+1,total:12,year:String(2007+i),status:'Completed',sub:12,dub:i%5===0?0:12,sourceMatched:i!==11,watched:0,downloaded:0})),
   related:[...Array.from({length:5},(_,i)=>({id:`long-m${i+1}`,title:`The Endless Voyage — Feature Film ${i+1}`,kind:'Movie',year:String(2012+i*2),sourceMatched:false,total:1,sub:null,dub:null,status:'Completed',watched:0,downloaded:0})),...Array.from({length:11},(_,i)=>({id:`long-o${i+1}`,title:`Side Story ${i+1}: ${['The First Night','Reunion','Hidden Paths'][i%3]}`,kind:i%2?'OVA':'Special',year:String(2010+i),sourceMatched:false,total:1,sub:null,dub:null,status:'Completed',watched:0,downloaded:0}))]
 },
 'demo:aot':{
   seasons:[
     {id:'aot-s1',label:'Season 1',title:'Attack on Titan',seasonNumber:1,total:25,year:'2013',status:'Completed',sub:25,dub:25,sourceMatched:true,watched:10,downloaded:3},
     {id:'aot-s2',label:'Season 2',title:'Attack on Titan',seasonNumber:2,total:12,year:'2017',status:'Completed',sub:12,dub:12,sourceMatched:true,watched:2,downloaded:0},
     {id:'aot-s3',label:'Season 3',title:'Attack on Titan',seasonNumber:3,total:22,year:'2018–2019',status:'Completed',sub:null,dub:null,sourceMatched:false,watched:0,downloaded:0},
     {id:'aot-s4a',label:'Season 4 · Part 1',title:'The Final Season · Part 1',seasonNumber:4,total:16,year:'2020–2021',status:'Completed',sub:16,dub:12,sourceMatched:true,watched:0,downloaded:0},
     {id:'aot-s4b',label:'Season 4 · Part 2',title:'The Final Season · Part 2',seasonNumber:4,total:12,year:'2022',status:'Completed',sub:12,dub:null,sourceMatched:true,watched:0,downloaded:0},
   ],related:[
     {id:'aot-finalchapters',title:'The Final Chapters',kind:'Special',year:'2023',note:'Finale specials · linked, not assigned a new season number',sourceMatched:false,total:2,sub:null,dub:null,watched:0,downloaded:0,status:'Completed'},
     {id:'aot-lastattack',title:'THE LAST ATTACK',kind:'Movie',year:'2024',note:'Film version of the finale · not Season 5',sourceMatched:false,total:1,sub:null,dub:null,watched:0,downloaded:0,status:'Completed'},
     {id:'aot-oad',title:'OAD Archive',kind:'OVA',year:'Various',note:'Original animation releases · separate from numbered seasons',sourceMatched:false,total:8,sub:null,dub:null,watched:0,downloaded:0,status:'Completed'}
   ]
 }
};
function connectedFor(x){return connectedMetadata[x.id]||null;}
function getRelated(x){return connectedFor(x)?.related||[];}
function activeInstallment(x){const related=getRelated(x);return state.detailRelated?related.find(r=>r.id===state.detailRelated):getSeasons(x)[state.detailSeason];}
function seasonTagList(x,season){if(!season?.id)return x.tags;return state.seasonTags[season.id]??(season.id==='solo-s1'?['Watching']:season.id==='solo-s2'?['Plan to Watch']:[]);}
function installmentDisplayName(x,s){return s.title||x.name;}
function installmentSubLabel(s){return s.kind?`${s.kind} · ${s.year}`:s.label;}
function getSeasons(x){
 if(connectedFor(x))return connectedFor(x).seasons;
 if(x.id==='demo:01')return [
  {id:'moon-s1',title:'Moonlit Signals',label:'Season 1',total:12,status:'Completed',sub:12,dub:8,year:'2025',sourceMatched:true,watched:5,downloaded:2},
  {id:'moon-s2',title:'Moonlit Signals',label:'Season 2',total:10,status:'Ongoing',sub:6,dub:2,year:'2026',sourceMatched:true,watched:0,downloaded:0}
 ];
 if(x.id==='demo:04')return [{label:'Season 1',total:13,status:'Completed',sub:13,dub:null,year:'2024'}];
 const supportsSub=x.lang.includes('Sub'),supportsDub=x.lang.includes('Dub');
 const available=x.status==='Ongoing'?Math.max(1,Math.ceil(x.episodes*.63)):x.episodes;
 const dubCount=supportsDub?(x.status==='Ongoing'?Math.max(0,available-2):x.episodes):0;
 return [{label:'Season 1',total:x.episodes,status:x.status,sub:supportsSub?available:0,dub:dubCount,year:x.status==='Ongoing'?'2026':'2025'}];
}
function availabilityText(count,total){return count===null?'Unknown':`${count} / ${total}`;}
function episodeAvailability(season,n){return {sub:season.sub!==null?n<=season.sub:null,dub:season.dub!==null?n<=season.dub:null};}
function audioName(lang){return lang==='dub'?'English (Dub)':'Japanese (Sub)';}
function installmentReleaseYear(item){
 // Use only the year recorded for the installment; undated/"Various" records
 // go after dated releases rather than inventing a release date.
 const match=String(item.year||'').match(/^\d{4}/);
 return match?Number(match[0]):Number.POSITIVE_INFINITY;
}
function installmentRail(x){
 const seasons=getSeasons(x),related=getRelated(x);
 if(seasons.length+related.length<=1)return '';
 // One continuous, chronological strip. Preserve each item's original
 // identity, so a movie or special never becomes a synthetic TV season.
 const releases=[
   ...seasons.map((item,index)=>({...item,_index:index,_kind:'season',_sourceOrder:index})),
   ...related.map((item,index)=>({...item,_kind:'related',_sourceOrder:seasons.length+index}))
 ].sort((a,b)=>installmentReleaseYear(a)-installmentReleaseYear(b)||a._sourceOrder-b._sourceOrder);
 const totals={};
 for(const item of releases)if(item._kind==='related')totals[item.kind]=(totals[item.kind]||0)+1;
 const counters={};
 const cards=releases.map(item=>{
   const current=item._kind==='season'?!state.detailRelated&&item._index===state.detailSeason:state.detailRelated===item.id;
   const title=installmentDisplayName(x,item);
   let label;
   if(item._kind==='season')label=`${item.label}${item.year?' · '+item.year:''}`;
   else {
     const type=item.kind||'Special';
     counters[type]=(counters[type]||0)+1;
     label=`${type}${totals[type]>1?' '+counters[type]:''}${item.year&&item.year!=='Various'?' · '+item.year:''}`;
   }
   return `<button type="button" class="inline-installment-card" data-inline-installment="${escapeHTML(item.id||'')}" data-inline-index="${item._index??''}" data-inline-kind="${item._kind}" aria-current="${current}" aria-label="${escapeHTML(title)}, ${escapeHTML(label)}${current?', selected':''}"><span class="installment-copy"><span class="installment-name">${escapeHTML(title)}</span><span class="installment-number">${escapeHTML(label)}</span></span></button>`;
 }).join('');
 return `<nav class="inline-installments" aria-label="Releases in chronological order"><div class="inline-release-viewport"><div class="inline-installment-rail" id="inline-installment-rail" aria-label="Releases in chronological order" tabindex="0">${cards}</div><div class="inline-release-fade inline-release-fade-left" aria-hidden="false"><button type="button" class="inline-arrow previous" data-inline-scroll="-1" aria-label="Scroll releases one card left" title="Previous release" disabled>${icon('chevron',17)}</button></div><div class="inline-release-fade inline-release-fade-right" aria-hidden="false"><button type="button" class="inline-arrow" data-inline-scroll="1" aria-label="Scroll releases one card right" title="Next release" disabled>${icon('chevron',17)}</button></div></div></nav>`;
}
let activeInstallmentRailObserver=null;
function refreshInstallmentArrows(){
 const rail=screen.querySelector('#inline-installment-rail');
 const viewport=rail?.closest('.inline-release-viewport');
 if(!rail||!viewport)return;
 const maxScroll=Math.max(0,rail.scrollWidth-rail.clientWidth);
 const left=maxScroll>3&&rail.scrollLeft>2;
 const right=maxScroll>3&&rail.scrollLeft<maxScroll-2;
 // A scrolling arrow can vanish under a stationary cursor on the final card.
 // Keep an INVISIBLE full-height hit shield until the pointer leaves the edge.
 const guardLeft=!left&&viewport.dataset.pointerLeft==='true';
 const guardRight=!right&&viewport.dataset.pointerRight==='true';
 viewport.classList.toggle('guard-left',guardLeft);
 viewport.classList.toggle('guard-right',guardRight);
 viewport.classList.toggle('can-left',left);
 viewport.classList.toggle('can-right',right);
 const previous=viewport.querySelector('[data-inline-scroll="-1"]');
 const next=viewport.querySelector('[data-inline-scroll="1"]');
 if(previous)previous.disabled=!(left||guardLeft);
 if(next)next.disabled=!(right||guardRight);
}
function setupInstallmentEdgeGuards(viewport){
 if(!viewport)return;
 for(const side of ['left','right']){
   const fade=viewport.querySelector('.inline-release-fade-'+side);
   if(!fade)continue;
   const prop=side==='left'?'pointerLeft':'pointerRight';
   fade.addEventListener('pointerenter',event=>{
     if(event.pointerType==='touch')return;
     viewport.dataset[prop]='true';
     refreshInstallmentArrows();
   });
   fade.addEventListener('pointerleave',()=>{
     viewport.dataset[prop]='false';
     refreshInstallmentArrows();
   });
 }
}
/* Update only release-dependent sections; the rail itself never gets
   destroyed, so its scroll position, pointer target and buttons survive. */
function selectInlineInstallment(card,rail){
 if(card.getAttribute('aria-current')==='true')return;
 const savedScroll=workspace.scrollTop;
 if(card.dataset.inlineKind==='season'){
   state.detailSeason=Number(card.dataset.inlineIndex);
   state.detailRelated=null;
 }else state.detailRelated=card.dataset.inlineInstallment;
 state.detailEpisode=1;
 // Keep All/Playable-only while moving among releases of the same anime.
 // Opening a different anime still starts at All (see showDetail).
 const template=document.createElement('div');
 template.innerHTML=detailPage();
 const newDetail=template.querySelector('.anime-detail');
 if(!newDetail)return;
 // The release rail remains the actual, mounted DOM element.
 for(const selector of ['.detail-overview','.detail-control-panel']){
   const oldPart=screen.querySelector(selector);
   const newPart=newDetail.querySelector(selector);
   if(oldPart&&newPart)oldPart.replaceWith(newPart);
 }
 const section=screen.querySelector('.detail-section');
 const newSection=newDetail.querySelector('.detail-section');
 if(section&&newSection){
   const releaseNav=section.querySelector('.inline-installments');
   section.replaceChildren(releaseNav,...Array.from(newSection.children).filter(node=>!node.classList.contains('inline-installments')));
 }
 for(const release of rail.querySelectorAll('.inline-installment-card')){
   const selected=release===card;
   release.setAttribute('aria-current',String(selected));
   const name=release.getAttribute('aria-label').replace(/, selected$/,'');
   release.setAttribute('aria-label',name+(selected?', selected':''));
 }
 // Controls inside the replaced sections require their own event handlers.
 setupDetailAudioHover();
 document.getElementById('manage-detail-tags')?.addEventListener('click',showManageDetailTags);
 document.getElementById('find-source')?.addEventListener('click',showFindSource);
 for(const el of screen.querySelectorAll('[data-detail-audio]'))el.addEventListener('click',()=>{
   if((state.detailAudio||state.defaultPlayback)!==el.dataset.detailAudio)changeDetailAudio(el.dataset.detailAudio);
 });
 bindEpisodeFiltersAndActions();
 for(const el of screen.querySelectorAll('.detail-actions [data-episode-action]'))el.addEventListener('click',()=>showEpisodeAction(el.dataset.episodeAction,Number(el.dataset.episode)));
 workspace.scrollTop=savedScroll;
 requestAnimationFrame(updateTabScrollOverlay);
}

function setupDetailAudioHover(){
 const toggle=screen.querySelector('.detail-audio-toggle');
 const pill=toggle?.querySelector('.detail-audio-highlight');
 if(!toggle||!pill)return;
 const where=audio=>audio==='dub'?'translateX(calc(100% + var(--audio-gap)))':'translateX(0)';
 const move=target=>{
   toggle.classList.remove('is-returning');
   toggle.classList.toggle('is-hovering-other',target!==toggle.dataset.active);
   pill.style.transform=where(target);
 };
 toggle.addEventListener('pointermove',event=>{
   if(event.pointerType==='touch')return;
   const rect=toggle.getBoundingClientRect();
   move(event.clientX < rect.left+rect.width/2?'sub':'dub');
 });
 toggle.addEventListener('pointerleave',event=>{
   if(event.pointerType==='touch')return;
   toggle.classList.add('is-returning');
   toggle.classList.remove('is-hovering-other');
   pill.style.transform=where(toggle.dataset.active);
 });
 toggle.addEventListener('focusin',event=>{
   const button=event.target.closest('[data-detail-audio]');
   if(button)move(button.dataset.detailAudio);
 });
 toggle.addEventListener('focusout',event=>{
   if(toggle.contains(event.relatedTarget))return;
   if(toggle.matches(':hover'))return;
   toggle.classList.add('is-returning');
   toggle.classList.remove('is-hovering-other');
   pill.style.transform=where(toggle.dataset.active);
 });
}


// v27 — Update playback availability in place when changing Sub/Dub.
// A full screen render would destroy the old selected button and its ::before
// before CSS could animate it from opacity 1 to opacity 0.

/* v38 — Keep the count mounted when filtering so the count and its
   divider can fade rather than snapping in with a newly created toolbar. */
function syncEpisodeToolbar(updated){
 const current=screen.querySelector('.episode-toolbar');
 if(!current||!updated)return;
 const oldValues=current.querySelectorAll('.availability-value');
 const newValues=updated.querySelectorAll('.availability-value');
 for(let i=0;i<Math.min(oldValues.length,newValues.length);i++)
   oldValues[i].textContent=newValues[i].textContent;
 const oldCount=current.querySelector('.episode-shown');
 const newCount=updated.querySelector('.episode-shown');
 if(oldCount&&newCount){
   const hidden=newCount.classList.contains('is-hidden');
   if(!hidden)oldCount.textContent=newCount.textContent;
   oldCount.classList.toggle('is-hidden',hidden);
   if(hidden){oldCount.setAttribute('aria-hidden','true');oldCount.removeAttribute('role');}
   else{oldCount.removeAttribute('aria-hidden');oldCount.setAttribute('role','status');}
 }
 // Replace only the filter control (not its surrounding box) so fresh
 // click handlers can be attached without duplicating listeners.
 const oldFilter=current.querySelector('.episode-filter');
 const newFilter=updated.querySelector('.episode-filter');
 if(oldFilter&&newFilter)oldFilter.replaceWith(newFilter);
}
function changeEpisodeFilter(next){
 if(state.detailEpisodeFilter===next)return;
 const y=workspace.scrollTop;
 state.detailEpisodeFilter=next;
 const holder=document.createElement('div');
 holder.innerHTML=detailPage();
 syncEpisodeToolbar(holder.querySelector('.episode-toolbar'));
 const currentList=screen.querySelector('.episode-list');
 const updatedList=holder.querySelector('.episode-list');
 if(currentList&&updatedList)currentList.replaceWith(updatedList);
 bindEpisodeFiltersAndActions();
 workspace.scrollTop=y;
 requestAnimationFrame(updateTabScrollOverlay);
}
function bindEpisodeFiltersAndActions(){
 for(const el of screen.querySelectorAll('[data-episode-filter]')){
   el.addEventListener('click',()=>changeEpisodeFilter(el.dataset.episodeFilter));
 }
 for(const el of screen.querySelectorAll('.episode-list [data-episode-action]')){
   el.addEventListener('click',()=>showEpisodeAction(el.dataset.episodeAction,Number(el.dataset.episode)));
 }
}

function changeDetailAudio(next){
 const toggle=screen.querySelector('.detail-audio-toggle');
 if(!toggle || (state.detailAudio||state.defaultPlayback)===next)return;
 const scroll=workspace.scrollTop;
 state.detailAudio=next;
 // Build the new markup offscreen so other episode controls update immediately,
 // while the original toggle retains its DOM identity and animation state.
 const container=document.createElement('div');
 container.innerHTML=detailPage();
 const updatedToggle=container.querySelector('.detail-audio-toggle');
 for(const lang of ['sub','dub']){
   const current=toggle.querySelector(`[data-detail-audio="${lang}"]`);
   const updated=updatedToggle?.querySelector(`[data-detail-audio="${lang}"]`);
   if(!current||!updated)continue;
   for(const attr of ['aria-label','title'])current.setAttribute(attr,updated.getAttribute(attr));
   current.setAttribute('aria-pressed',String(lang===next));
 }
 toggle.dataset.active=next;
 // Removes the old outline with its existing 420 ms opacity transition.
 // The hover pill is already over the button just clicked; keep it there.
 toggle.classList.remove('is-returning','is-hovering-other');
 const pill=toggle.querySelector('.detail-audio-highlight');
 if(pill)pill.style.transform=next==='dub'?'translateX(calc(100% + var(--audio-gap)))':'translateX(0)';
 // These pieces depend on playback language. Replacing them, rather than the
 // whole detail page, also keeps the user's scroll position and hover animation.
 syncEpisodeToolbar(container.querySelector('.episode-toolbar'));
 for(const selector of ['.detail-actions','.episode-list']){
   const current=screen.querySelector(selector);
   const updated=container.querySelector(selector);
   if(current && updated)current.replaceWith(updated);
 }
 document.getElementById('manage-detail-tags')?.addEventListener('click',showManageDetailTags);
 for(const el of screen.querySelectorAll('.detail-actions [data-episode-action]'))
   el.addEventListener('click',()=>showEpisodeAction(el.dataset.episodeAction,Number(el.dataset.episode)));
 bindEpisodeFiltersAndActions();
 workspace.scrollTop=scroll;
 toggle.querySelector(`[data-detail-audio="${next}"]`)?.focus({preventScroll:true});
 requestAnimationFrame(updateTabScrollOverlay);
}

function detailPage(){
 const x=demo.find(d=>d.id===state.detailId);if(!x)return '';
 const seasons=getSeasons(x);const si=Math.max(0,Math.min(state.detailSeason,seasons.length-1));
 const s=activeInstallment(x)||seasons[si];const related=Boolean(state.detailRelated);
 const sourceMatched=s.sourceMatched!==false;
 const targetEpisode=Math.max(1,Math.min((Number.isFinite(s.watched)?s.watched:0)+1,s.total)); // Top Watch resumes the next unwatched episode; individual row actions use their own episode.
 const targetAvail=sourceMatched?episodeAvailability(s,targetEpisode):{sub:null,dub:null};
 const audio=state.detailAudio||state.defaultPlayback;
 const canWatch=sourceMatched&&targetAvail[audio]===true;
 const audioOption=(lang,label)=>{
   const available=targetAvail[lang];const status=sourceMatched?(available===true?'available':available===false?'unavailable':'unverified'):'source not matched';
   const info=`${lang==='sub'?'Japanese':'English'} audio · ${status} for ${s.kind||s.label}, episode ${targetEpisode}${state.defaultPlayback===lang?' · your default':''}`;
   return `<button type="button" data-detail-audio="${lang}" aria-pressed="${audio===lang}" aria-label="${escapeHTML(info)}" title="${escapeHTML(info)}">${label}</button>`;
 };
 const audioControl=`<div class="detail-audio-control"><div class="detail-audio-toggle" data-active="${audio}" role="group" aria-label="Audio version for playback"><span class="detail-audio-highlight" aria-hidden="true"></span>${audioOption('sub','Sub')}${audioOption('dub','Dub')}</div></div>`;
 const playableCount=sourceMatched?Array.from({length:s.total},(_,i)=>episodeAvailability(s,i+1)[audio]===true).filter(Boolean).length:0;
 const playableOnly=state.detailEpisodeFilter==='playable';
 const episodeFilter=sourceMatched?`<div class="episode-filter" role="group" aria-label="Filter episodes by playback availability"><button type="button" data-episode-filter="all" aria-pressed="${!playableOnly}">All</button><button type="button" data-episode-filter="playable" aria-pressed="${playableOnly}" title="Show episodes playable in ${audio==='sub'?'Sub':'Dub'}">Playable only</button></div>`:'';
 const visibleEpisodeNumbers=sourceMatched?Array.from({length:s.total},(_,i)=>i+1).filter(n=>!playableOnly||episodeAvailability(s,n)[audio]===true):[];
 const entries=sourceMatched?(visibleEpisodeNumbers.length?visibleEpisodeNumbers.map(n=>{
 const i=n-1,avail=episodeAvailability(s,n),active=avail.sub===true||avail.dub===true;
 const selectedAudioAvailable=avail[audio]===true;
 const name=(s.id==='moon-s1'?seasonStories[x.id]?.[i]:null)||`Episode ${n}`;
 const stateText=selectedAudioAvailable?'Ready in '+(audio==='sub'?'Sub':'Dub'):
   active?'Not in '+(audio==='sub'?'Sub':'Dub')+' · other audio available':
   (avail.sub===null||avail.dub===null)?'Audio availability unverified':'Not available yet';
 return `<div class="episode-item ${!selectedAudioAvailable?'episode-not-playable':''}" role="listitem"><span class="episode-no">${String(n).padStart(2,'0')}</span><div class="episode-copy"><div class="episode-name">${escapeHTML(name)}</div><div class="episode-subtext">${escapeHTML(stateText)}</div></div><div class="episode-tools"><div class="episode-flags" aria-label="Audio availability"><span class="audio-flag ${avail.sub!==true?'unavailable':''}" title="Japanese audio: ${avail.sub===null?'unverified':avail.sub?'available':'unavailable'}">Sub${avail.sub===null?' ?':''}</span><span class="audio-flag ${avail.dub!==true?'unavailable':''}" title="English dub: ${avail.dub===null?'unverified':avail.dub?'available':'unavailable'}">Dub${avail.dub===null?' ?':''}</span></div><div class="episode-actions"><button class="iconbtn" type="button" data-episode-action="watch" data-episode="${n}" ${!selectedAudioAvailable?'disabled':''} aria-label="Watch ${escapeHTML(x.name)} ${escapeHTML(s.label||s.kind)} episode ${n}" title="${selectedAudioAvailable?`Watch episode ${n} · ${audioName(audio)}`:`${audioName(audio)} unavailable or unverified for episode ${n}`} ">${icon('play',18)}</button><button class="iconbtn" type="button" data-episode-action="download" data-episode="${n}" ${!active?'disabled':''} aria-label="Download ${escapeHTML(x.name)} ${escapeHTML(s.label||s.kind)} episode ${n}" title="Download episode ${n}">${icon('download',17)}</button></div></div></div>`;
 }).join('<div class="episode-divider" aria-hidden="true"></div>'):'<div class="episode-empty-filter">No episodes are currently confirmed playable in this audio version. Choose <strong>All</strong> to see every episode, or switch the audio option above.</div>'):'<div class="provider-unmatched">'+icon('info',19)+'<div><strong>No streaming source matched</strong><p>This installment is linked through the example relationship graph, but no provider entry is confirmed. The app must not invent episodes or assume a Sub/Dub version is available.</p></div><button class="btn" type="button" id="find-source">Find source</button></div>';
 const seasonInfo=related?`${escapeHTML(s.kind)} · Related release`:`${escapeHTML(s.label)}`;
 const showInstallmentTitle=connectedFor(x)||seasons.length>1;
 const tagList=seasonTagList(x,s);
 const shownCount=visibleEpisodeNumbers.length;
 const reduced=sourceMatched&&playableOnly&&shownCount<s.total;
 const breakdown=sourceMatched?`<div class="availability episode-availability" aria-label="Episode audio availability and filtering"><div class="episode-stats"><span class="availability-label">${icon('headphones',16)} Sub <strong class="availability-value">${availabilityText(s.sub,s.total)}</strong></span><span class="availability-label">Dub <strong class="availability-value">${availabilityText(s.dub,s.total)}</strong></span><span class="episode-shown${reduced?'':' is-hidden'}" ${reduced?'role="status"':'aria-hidden="true"'}>${shownCount} of ${s.total} shown</span></div>${episodeFilter}</div>`:'';
 return `<div class="anime-detail" aria-label="Anime detail: ${escapeHTML(x.name)}">
 <button type="button" id="detail-back" class="detail-back">${icon('back',18)} Back to ${state.detailReturnView==='library'?'Library':state.detailReturnView==='downloads'?'Downloads':'Discover'}</button>
 <section class="detail-hero">
 <div class="detail-cover" style="background:${x.art}"><span class="detail-cover-name">${escapeHTML(x.name)}</span></div>
 <div class="detail-overview"><div class="detail-kicker">Anime · Series overview</div><h1 class="detail-title">${escapeHTML(x.name)}</h1>
 
 <div class="detail-badges"><span class="detail-badge">${seasons.length} ${seasons.length===1?'season':'seasons'}</span><span class="detail-badge">${escapeHTML(s.year)}</span><span class="detail-badge">${s.kind==='Movie'?'Status':'Airing'}: <strong>${escapeHTML(s.status)}</strong>${related?` · ${escapeHTML(s.kind)}`:''}</span></div>
 <p class="detail-description">${escapeHTML(related?(s.note||x.blurb):x.blurb)}</p>
 <div class="detail-browsing"><span class="detail-browsing-caption">Currently browsing</span><strong>${escapeHTML(installmentSubLabel(s))} <span class="detail-browsing-sep">·</span> ${s.total} ${s.total===1?'episode':'episodes'}</strong>${Number.isInteger(s.watched)?`<span class="detail-browsing-progress">${s.watched} of ${s.total} watched <small>(demo)</small></span>`:''}</div></div>
 <aside class="detail-control-panel" aria-label="Playback and library actions">${audioControl}
 <div class="detail-actions"><button class="btn primary" type="button" aria-label="${s.kind==='Movie'?'Watch movie':`Watch episode ${targetEpisode}`}" data-episode-action="watch" data-episode="${targetEpisode}" ${!canWatch?`disabled title="${sourceMatched?'Audio unavailable or unverified':'No matched provider'}"`:''}>${icon('play',17)} <span class="detail-action-label-long">${s.kind==='Movie'?'Watch movie':`Watch episode ${targetEpisode}`}</span><span class="detail-action-label-short">Watch</span></button><button class="btn" type="button" id="manage-detail-tags" aria-label="${tagList.length?'Manage tags':'Add to Library'}">${icon('bookmark',17)} <span class="detail-action-label-long">${tagList.length?'Manage tags':'Add to Library'}</span><span class="detail-action-label-short">${tagList.length?'Tags':'Add'}</span></button></div></aside>
 </section>
 <section class="detail-section" aria-label="Episodes and availability">${installmentRail(x)}
 <div class="episode-toolbar"><div class="episode-heading"><h2>${s.kind==='Movie'?'Movie':s.kind==='Special'?'Special episodes':'Episodes'}</h2></div>${breakdown}</div>
 <div class="episode-list" role="list">${entries}</div>
 <p class="episode-note">${related?'Related releases remain separate from numbered seasons. ':'Each season has its own identity, tag assignments, and watch/download history. '}Provider availability and progress are fictional for this UI demonstration; unknown coverage is never treated as confirmed.</p>
 </section></div>`;
}
function backFromDetail(){state.playback=null;state.detailId=null;state.view=state.detailReturnView;render();tabPages[state.view].scrollTop=state.detailReturnScroll;}
function startPlayback(n){
 const x=demo.find(d=>d.id===state.detailId);if(!x)return;
 const installment=activeInstallment(x);if(!installment||installment.sourceMatched===false)return;
 const audio=state.detailAudio||state.defaultPlayback;
 const availability=episodeAvailability(installment,n);
 if(availability[audio]!==true)return; // Never fall back to the other version silently.
 state.playbackReturnScroll=workspace.scrollTop;
 state.detailEpisode=n;
 state.playback={episode:n,audio,installmentId:installment.id,subtitles:state.defaultSubtitles};
 closeModal();render();workspace.scrollTop=0;
}
function playbackPage(){
 const x=demo.find(d=>d.id===state.detailId),p=state.playback,s=x&&activeInstallment(x);
 if(!x||!s||!p)return '';
 const label=s.kind==='Movie'?'Movie':`Episode ${p.episode}`;
 const prev=p.episode>1, next=p.episode<s.total;
 return `<section class="playback-page" aria-label="Gallery video player">
  <div class="playback-compactbar">
   <button type="button" class="detail-back" id="back-from-playback">${icon('back',18)} Back to episodes</button>
   <div class="playback-title-inline"><strong>${escapeHTML(x.name)}</strong><span>${escapeHTML(installmentDisplayName(x,s))} · ${escapeHTML(installmentSubLabel(s))} · ${escapeHTML(label)}</span></div>
   <span class="playback-audio">${escapeHTML(audioName(p.audio))}</span>
  </div>
  <div class="player-area" id="player-area" tabindex="0" aria-label="Video and controls">
   <video id="local-video" playsinline preload="metadata" aria-label="Local video playback"></video>
   <div class="player-no-media" id="player-empty"><div class="player-empty-inner">${icon('film',35)}<strong>No streaming source connected yet</strong><p>The anime entries in this development build are examples. Open a local video file to test our actual player controls.</p><button type="button" class="btn primary" id="open-local-video">${icon('folder',16)} Open local video…</button></div></div>
   <div class="player-overlay" id="player-overlay">
    <div class="player-top"><div><strong>${escapeHTML(installmentDisplayName(x,s))}</strong><small>${escapeHTML(installmentSubLabel(s))} · ${escapeHTML(label)}</small></div></div>
    <div class="player-bottom"><div class="player-progress-row"><span class="player-time" id="current-time">00:00</span><div class="player-progress" id="timeline"><div class="player-progress-bar"><div class="player-watched" id="watched"></div><div class="player-remaining"></div></div><span class="player-scrub" id="scrub-knob"></span><input type="range" id="seek" min="0" max="1000" value="0" aria-label="Seek within episode" disabled></div><span class="player-time" id="duration-time">00:00</span></div>
    <div class="player-controls"><div class="controls-left"><button type="button" class="player-icon" id="mute" aria-label="Mute or unmute">${icon('volume',21)}</button><input type="range" class="player-volume" id="volume" min="0" max="100" value="100" aria-label="Volume"></div><div class="controls-middle"><button type="button" class="player-icon" id="rewind10" aria-label="Rewind 10 seconds">${icon('rewind10',29)}</button><button type="button" class="player-main-action" id="pause-play" aria-label="Play" disabled>${icon('play',25)}</button><button type="button" class="player-icon" id="forward10" aria-label="Forward 10 seconds">${icon('forward10',29)}</button></div><div class="controls-right"><button type="button" class="player-icon" id="toggle-subs" aria-label="Show or hide subtitles" aria-pressed="${p.subtitles}">${icon('captions',22)}</button><button type="button" class="player-icon" id="player-settings" aria-label="Playback speed">${icon('settings',21)}</button><button type="button" class="player-icon" id="fullscreen" aria-label="Toggle fullscreen">${icon('maximize',21)}</button></div></div></div>
   </div>
  </div>
  <div class="player-episode-nav"><button class="btn small player-episode-previous" id="previous-episode" ${!prev?'disabled':''}>${icon('back',15)} Previous episode</button><div class="player-episode-label"><strong>${escapeHTML(installmentDisplayName(x,s))}</strong><small>${escapeHTML(installmentSubLabel(s))} · ${escapeHTML(label)} · ${escapeHTML(audioName(p.audio))}</small></div><button class="btn small player-episode-next" id="next-episode" ${!next?'disabled':''}>Next episode ${icon('chevron',15)}</button></div>
  <details class="player-dev-tools" data-development-only="true"><summary>Development tools · Local playback / VLC</summary>
   <div class="player-file-actions"><button class="btn small" id="change-local-video">${icon('folder',15)} Open local video…</button><button class="btn small" id="open-external-vlc" disabled>Open in VLC</button><span class="muted" id="local-file-label" style="align-self:center;font-size:12px">No local file selected</span></div>
   <div class="player-notice" id="player-notice">Local-file playback is functional where Electron supports the file's codec. Actual provider streams, bundled MPV rendering, and subtitle imports are not connected yet. Gallery does not autoplay the next episode.</div>
  </details>
 </section>`;
}
function backFromPlayback(){
 clearTimeout(playerControlsTimer);playerControlsTimer=null;
 document.getElementById("local-video")?.pause();isLocalVideoReady=false;
 state.playback=null;render();workspace.scrollTop=state.playbackReturnScroll;
}
function showEpisodeAction(action,n){
 if(action==='watch'){startPlayback(n);return;}
 if(action!=='download')return;
 const x=demo.find(d=>d.id===state.detailId);if(!x)return;
 const season=activeInstallment(x);if(!season||season.sourceMatched===false)return;
 const a=episodeAvailability(season,n);
 const choices=[['sub','Japanese · Sub',a.sub],['dub','English · Dub',a.dub]];
 const available=choices.filter(choice=>choice[2]===true);if(!available.length)return;
 const defaultVersion=state.defaultDownload;
 const preferredAvailable=available.some(choice=>choice[0]===defaultVersion);
 const selected=preferredAvailable?defaultVersion:null;
 modal(`Download episode ${n}`,`<p class="description"><b>${escapeHTML(x.name)}</b> · ${escapeHTML(installmentDisplayName(x,season))} · ${escapeHTML(installmentSubLabel(season))} · Episode ${n}</p><div class="field"><span class="label">Audio version for download</span><div class="audio-choose">${choices.map(([id,name,availability])=>`<label><input type="radio" name="episode-audio" value="${id}" ${selected===id?'checked':''} ${availability!==true?'disabled':''}><span>${escapeHTML(name)}${availability===null?' · Unknown':availability===false?' · Unavailable':''}</span></label>`).join('')}</div></div>
 ${preferredAvailable?'':`<div class="preview-warning">The preferred download version (${defaultVersion==='sub'?'Sub':'Dub'}) is unavailable for this episode. Choose another available version explicitly to continue; the app will not switch automatically.</div>`}<div class="preview-warning">Available selectable subtitle tracks will be preserved independently of subtitle visibility. No silent audio-language substitution.</div><p class="tip">Choosing another download version here does not change your saved playback or download preferences.</p>`,`<button class="btn" id="episode-cancel">Cancel</button><button class="btn primary" id="episode-confirm" ${!selected?'disabled':''}>${icon('download',16)} Preview download</button>`);
 document.getElementById('episode-cancel').onclick=closeModal;
 for(const input of modalHost.querySelectorAll('input[name="episode-audio"]'))input.addEventListener('change',()=>{document.getElementById('episode-confirm').disabled=false;});
 document.getElementById('episode-confirm').onclick=()=>{
  const chosen=modalHost.querySelector('input[name="episode-audio"]:checked')?.value;
  if(!chosen||a[chosen]!==true)return;
  modal('Download preview',`<p class="description">${escapeHTML(x.name)} · ${escapeHTML(installmentDisplayName(x,season))} · ${escapeHTML(installmentSubLabel(season))} · Episode ${n}</p><div class="dialog-sample"><b>${chosen==='sub'?'Japanese (Sub)':'English (Dub)'}</b><p class="description">In the finished application, this would queue the selected download version and save accessible selectable subtitles for offline use.</p></div><p class="tip">This is a UI prototype; no downloading occurs.</p>`,`<button class="btn primary" id="episode-ok">Got it</button>`);
  document.getElementById('episode-ok').onclick=closeModal;
 };
}
function showManageDetailTags(){const x=demo.find(d=>d.id===state.detailId);if(!x)return;
 const season=activeInstallment(x);if(!season)return;const current=seasonTagList(x,season);
 modal(`Library tags · ${installmentDisplayName(x,season)}`,`<p class="description">Tags are saved for this specific installment (${escapeHTML(installmentSubLabel(season))}), independently of other seasons and their progress. This is temporary demo state only.</p><div class="tag-picker-list">${state.tags.map(tag=>`<label><input type="checkbox" data-detail-tag="${escapeHTML(tag)}" ${current.includes(tag)?'checked':''}><span>${escapeHTML(tag)}</span></label>`).join('')}</div>`,`<button class="btn" id="detail-tags-cancel">Cancel</button><button class="btn primary" id="detail-tags-save">Save tags</button>`);
 document.getElementById('detail-tags-cancel').onclick=closeModal;
 document.getElementById('detail-tags-save').onclick=()=>{const updated=Array.from(modalHost.querySelectorAll('input[data-detail-tag]:checked')).map(el=>el.dataset.detailTag);if(season.id)state.seasonTags[season.id]=updated;else x.tags=updated;closeModal();render();};
}
function showFindSource(){const x=demo.find(d=>d.id===state.detailId),s=x&&activeInstallment(x);if(!s)return;
 modal('Find a streaming source',`<p class="description"><b>${escapeHTML(installmentDisplayName(x,s))}</b> · ${escapeHTML(installmentSubLabel(s))}</p><div class="dialog-sample"><b>Not matched</b><p class="description">The finished application would search installed providers for this exact installment and ask you to confirm ambiguous matches. Nothing is silently linked here.</p></div><p class="tip">A relationship record does not prove that an episode can be streamed or downloaded.</p>`,`<button class="btn primary" id="source-ok">Got it</button>`);
 document.getElementById('source-ok').onclick=closeModal;
}

/* Electron bridge is narrowly scoped; standalone preview still renders. */
let localVideoName='',isLocalVideoReady=false,lastExternalPlayerStatus='not checked';
let savingPreference=false;
async function saveDesktopPreferences(){
 if(!window.galleryDesktop)return;
 try {await window.galleryDesktop.saveSettings({theme:state.theme,defaultPlayback:state.defaultPlayback,defaultDownload:state.defaultDownload,defaultSubtitles:state.defaultSubtitles,playerPreference:state.playerPreference||'built-in'});}catch(err){console.warn('Settings save failed:',err)}
}
async function setupDesktopSettings(){
 if(!window.galleryDesktop)return;
 document.body.classList.add('desktop-build');
 try{
  const prefs=await window.galleryDesktop.getSettings();
  if(['neon','midnight','paper'].includes(prefs.theme))state.theme=prefs.theme;
  if(['sub','dub'].includes(prefs.defaultPlayback))state.defaultPlayback=prefs.defaultPlayback;
  if(['sub','dub'].includes(prefs.defaultDownload))state.defaultDownload=prefs.defaultDownload;
  if(typeof prefs.defaultSubtitles==='boolean')state.defaultSubtitles=prefs.defaultSubtitles;
  state.playerPreference=prefs.playerPreference||'built-in';
  document.body.dataset.theme=state.theme;
  render();
 }catch(err){console.warn('Could not load local settings:',err)}
}
function fmtTime(sec){if(!Number.isFinite(sec)||sec<0)return '00:00';const x=Math.floor(sec);return `${String(Math.floor(x/3600)).padStart(x>=3600?1:2,'0')}:${String(Math.floor(x%3600/60)).padStart(2,'0')}:${String(x%60).padStart(2,'0')}`.replace(/^00:/,'');}
function updatePlaybackUI(){
 const video=document.getElementById('local-video');if(!video)return;
 const duration=Number.isFinite(video.duration)?video.duration:0;
 const portion=duration?Math.min(1,Math.max(0,video.currentTime/duration)):0;
 const watched=document.getElementById('watched'),knob=document.getElementById('scrub-knob'),seek=document.getElementById('seek');
 if(watched)watched.style.flexBasis=`calc(${(portion*100).toFixed(3)}% - ${(portion*5).toFixed(2)}px)`;
 if(knob)knob.style.left=`${(portion*100).toFixed(3)}%`;
 if(seek){seek.value=String(Math.round(portion*1000));seek.disabled=!duration;}
 document.getElementById('current-time').textContent=fmtTime(video.currentTime);
 document.getElementById('duration-time').textContent=fmtTime(duration);
 const play=document.getElementById('pause-play');if(play){play.disabled=!isLocalVideoReady;play.innerHTML=icon(video.paused?'play':'pause',25);play.setAttribute('aria-label',video.paused?'Play':'Pause');}
}
function showPlayerNotice(text){const n=document.getElementById('player-notice');if(n)n.textContent=text;}
async function openLocalForPlayer(){
 if(!window.galleryDesktop){showPlayerNotice('Local files can be opened from the macOS application, not from this browser development preview.');return;}
 let chosen;
 try{chosen=await window.galleryDesktop.openVideo();}
 catch(error){showPlayerNotice(`Unable to open file: ${error.message}`);return;}
 if(!chosen)return;
 const video=document.getElementById('local-video');if(!video)return;
 video.pause();isLocalVideoReady=false;localVideoName=chosen.name;
 video.src=chosen.fileURL;video.load();
 document.getElementById('player-empty').hidden=true;
 document.getElementById('local-file-label').textContent=chosen.name;
 document.getElementById('open-external-vlc').disabled=false;
 showPlayerNotice(`Selected local file: ${chosen.name}. The codec must be supported by Electron for in-app playback. Subtitles and streaming providers are not wired in this milestone.`);
 if(state.playerPreference==='vlc'){
  const result=await window.galleryDesktop.openInVLC();
  if(result.ok){
   video.pause();showPlayerNotice(`Opened ${chosen.name} in VLC as requested. Gallery cannot reliably track external playback progress; player compatibility is not guaranteed.`);
  }else{
   video.pause();showPlayerNotice(`VLC is your selected player, but it could not open the file: ${result.message}. You can press Play to use the built-in player for this file, or locate VLC in Settings.`);
  }
 }
 // User action picked a file; no automatic next-episode transition.
}
function advanceEpisode(step){
 clearTimeout(playerControlsTimer);playerControlsTimer=null;
 const p=state.playback,x=demo.find(d=>d.id===state.detailId),s=x&&activeInstallment(x);
 if(!p||!s)return;const newEp=p.episode+step;
 if(newEp<1||newEp>s.total)return;
 state.detailEpisode=newEp;state.playback={...p,episode:newEp};
 isLocalVideoReady=false;localVideoName='';render();workspace.scrollTop=0;
}
// The controls fade out during playback and stay visible for keyboard users.
let playerControlsTimer=null;
let playerEventController=null;
let playerKeyboardFocus=false;
const PLAYER_CONTROLS_IDLE_MS=2600;
function playerControlsWake(){
 const area=document.getElementById('player-area');if(!area)return;
 area.classList.remove('controls-hidden');
 playerControlsScheduleHide();
}
function playerControlsScheduleHide(){
 clearTimeout(playerControlsTimer);playerControlsTimer=null;
 const area=document.getElementById('player-area'),video=document.getElementById('local-video');
 if(!area||!video)return;
 if(!isLocalVideoReady||video.paused||video.ended){area.classList.remove('controls-hidden');return;}
 const focused=document.activeElement;
 if(playerKeyboardFocus&&focused&&area.contains(focused)&&focused!==area)return;
 if(document.getElementById('modal-host')?.firstElementChild)return;
 playerControlsTimer=setTimeout(()=>{
  const currentVideo=document.getElementById('local-video'),currentArea=document.getElementById('player-area');
  if(!currentArea||!currentVideo||currentVideo!==video||currentVideo.paused||currentVideo.ended)return;
  const active=document.activeElement;
  if(playerKeyboardFocus&&active&&currentArea.contains(active)&&active!==currentArea)return;
  if(document.getElementById('modal-host')?.firstElementChild)return;
  currentArea.classList.add('controls-hidden');
 },PLAYER_CONTROLS_IDLE_MS);
}
function initializePlayer(){
 const v=document.getElementById('local-video');if(!v)return;
 clearTimeout(playerControlsTimer);playerControlsTimer=null;
 playerEventController?.abort();playerEventController=new AbortController();
 isLocalVideoReady=false;localVideoName='';
 v.volume=1;v.autoplay=false;v.loop=false;
 v.addEventListener('loadedmetadata',()=>{isLocalVideoReady=true;document.getElementById('player-empty').hidden=true;updatePlaybackUI();});
 v.addEventListener('error',()=>{isLocalVideoReady=false;document.getElementById('player-empty').hidden=false;showPlayerNotice('The selected file cannot be decoded in the integrated Chromium player. You may try VLC, if installed, or another compatible file.');updatePlaybackUI();});
 for(const name of ['timeupdate','durationchange','play','pause','ended','volumechange'])v.addEventListener(name,updatePlaybackUI);
 v.addEventListener('play',playerControlsWake);
 for(const name of ['pause','ended','emptied'])v.addEventListener(name,()=>{clearTimeout(playerControlsTimer);document.getElementById('player-area')?.classList.remove('controls-hidden');});
 const playerArea=document.getElementById('player-area');
 playerArea.addEventListener('pointermove',()=>{playerKeyboardFocus=false;playerControlsWake();});
 playerArea.addEventListener('pointerdown',()=>{playerKeyboardFocus=false;playerControlsWake();});
 playerArea.addEventListener('keydown',()=>{playerKeyboardFocus=true;playerControlsWake();});
 document.addEventListener('keydown',e=>{if(e.key==='Tab')playerKeyboardFocus=true;},{signal:playerEventController.signal});
 playerArea.addEventListener('focusin',playerControlsWake);
 playerArea.addEventListener('focusout',()=>setTimeout(playerControlsScheduleHide,0));
 document.addEventListener('fullscreenchange',playerControlsWake,{signal:playerEventController.signal});
 document.getElementById('open-local-video').onclick=openLocalForPlayer;
 document.getElementById('change-local-video').onclick=openLocalForPlayer;
 document.getElementById('pause-play').onclick=()=>{if(!isLocalVideoReady)return;if(v.paused)v.play().catch(e=>showPlayerNotice('Unable to play file: '+e.message));else v.pause();};
 document.getElementById('rewind10').onclick=()=>{if(Number.isFinite(v.duration))v.currentTime=Math.max(0,v.currentTime-10);};
 document.getElementById('forward10').onclick=()=>{if(Number.isFinite(v.duration))v.currentTime=Math.min(v.duration,v.currentTime+10);};
 document.getElementById('seek').oninput=e=>{if(Number.isFinite(v.duration))v.currentTime=v.duration*Number(e.target.value)/1000;};
 const volume=document.getElementById('volume');volume.oninput=()=>{v.volume=Number(volume.value)/100;v.muted=v.volume===0;};
 document.getElementById('mute').onclick=()=>{v.muted=!v.muted;document.getElementById('mute').setAttribute('aria-label',v.muted?'Unmute':'Mute');};
 document.getElementById('toggle-subs').onclick=e=>{const target=e.currentTarget;const tracks=Array.from(v.textTracks||[]);if(!tracks.length){showPlayerNotice('No subtitle tracks are loaded for this local file. External subtitle imports are planned.');return;}const activate=target.getAttribute('aria-pressed')!=='true';tracks.forEach(t=>t.mode=activate?'showing':'disabled');target.setAttribute('aria-pressed',String(activate));};
 document.getElementById('player-settings').onclick=()=>{
  modal('Playback speed',`<p class="description">Speed applies to the currently open local video.</p><div class="field"><label for="video-rate">Playback speed</label><select id="video-rate">${[0.5,0.75,1,1.25,1.5,2].map(r=>`<option value="${r}" ${v.playbackRate===r?'selected':''}>${r}×</option>`).join('')}</select></div>`,`<button class="btn primary" id="save-rate">Apply</button>`);
  document.getElementById('save-rate').onclick=()=>{v.playbackRate=Number(document.getElementById('video-rate').value);closeModal();};
 };
 const fullscreen=()=>{const area=document.getElementById('player-area');if(!document.fullscreenElement)area.requestFullscreen?.().catch(()=>showPlayerNotice('Fullscreen is not available in this environment.'));else document.exitFullscreen?.();};
 document.getElementById('fullscreen').onclick=fullscreen;
 document.getElementById('previous-episode').onclick=()=>advanceEpisode(-1);
 document.getElementById('next-episode').onclick=()=>advanceEpisode(1);
 document.getElementById('open-external-vlc').onclick=async()=>{
  if(!window.galleryDesktop)return;
  const result=await window.galleryDesktop.openInVLC();
  if(!result.ok)showPlayerNotice(`${result.message} Use Settings to locate VLC manually if automatic detection fails. External-player compatibility and progress tracking are not guaranteed.`);
  else showPlayerNotice('The selected local file was handed to VLC. Watch progress in Gallery is not tracked for external playback.');
 };
 updatePlaybackUI();
}

function render(){
 if(!state.playback){clearTimeout(playerControlsTimer);playerControlsTimer=null;playerEventController?.abort();playerEventController=null;}
 document.body.classList.toggle('player-view',Boolean(state.playback));
 if(!state.playback&&!state.detailId){showTabPages();return;}
 // Detail and player screens retain their existing layout and event handling.
 freezeTabTrack();
 hideTabScrollOverlay();
 workspace.classList.remove('tab-pages-visible');
 tabPagesViewport.hidden=true;
 screen.hidden=false;
 const oldTagScroll=screen.querySelector('.tagbar')?.scrollLeft||0;
 const priorRailScroll=screen.querySelector('#inline-installment-rail')?.scrollLeft||0;
 workspace.classList.toggle('library-view',state.view==='library'&&!state.detailId);
 // Animate actual screen navigation, not routine player updates or episode selections.
 const surfaceKey=state.playback?'playback':state.detailId?'detail:'+state.detailId:state.view==='discover'?'discover:'+state.filterStatus+':'+state.filterAudio:state.view==='library'?'library:'+state.tag:'downloads:'+state.downloadStatus;
 const surfaceChanged=screen.dataset.surfaceKey!==surfaceKey;
 screen.dataset.surfaceKey=surfaceKey;
 screen.innerHTML=state.playback?playbackPage():state.detailId?detailPage():state.view==='discover'?discover():state.view==='library'?library():downloads();
 if(surfaceChanged){
  screen.classList.remove('surface-enter');
  void screen.offsetWidth;
  screen.classList.add('surface-enter');
 }
 if(state.playback){
   document.getElementById('back-from-playback')?.addEventListener('click',backFromPlayback);
   initializePlayer();requestAnimationFrame(updateTabScrollOverlay);return;
 }
 if(state.detailId){
   document.getElementById('detail-back')?.addEventListener('click',backFromDetail);
   activeInstallmentRailObserver?.disconnect();
   activeInstallmentRailObserver=null;
   const rail=document.getElementById('inline-installment-rail');
   if(rail){
     rail.addEventListener('scroll',refreshInstallmentArrows,{passive:true});
     setupInstallmentEdgeGuards(rail.closest('.inline-release-viewport'));
     activeInstallmentRailObserver=new ResizeObserver(refreshInstallmentArrows);
     activeInstallmentRailObserver.observe(rail);
     for(const card of rail.children)activeInstallmentRailObserver.observe(card);
     requestAnimationFrame(refreshInstallmentArrows);
     rail.scrollLeft=priorRailScroll;
     for(const arrow of screen.querySelectorAll('[data-inline-scroll]'))arrow.addEventListener('click',()=>{
       // One arrow click advances by exactly one discrete release, not a viewport fraction.
       const direction=Number(arrow.dataset.inlineScroll);
       // Even at the end, this click is consumed by the invisible guard.
       if(arrow.closest('.inline-release-viewport').classList.contains(direction>0?'guard-right':'guard-left'))return;
       const cards=Array.from(rail.querySelectorAll('.inline-installment-card'));
       const railX=rail.getBoundingClientRect().left;
       const offsets=cards.map(card=>card.getBoundingClientRect().left-railX+rail.scrollLeft);
       const position=rail.scrollLeft;
       const target=direction>0
         ? offsets.find(offset=>offset>position+4)
         : [...offsets].reverse().find(offset=>offset<position-4);
       const limit=Math.max(0,rail.scrollWidth-rail.clientWidth);
       if(target===undefined)return;
       rail.scrollTo({left:Math.max(0,Math.min(target,limit)),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
     });
     for(const card of rail.querySelectorAll('[data-inline-installment]'))
       card.addEventListener('click',()=>selectInlineInstallment(card,rail));
   }
   document.getElementById('find-source')?.addEventListener('click',showFindSource);
   bindEpisodeFiltersAndActions();
   setupDetailAudioHover();
   for(const el of screen.querySelectorAll('[data-detail-audio]'))el.addEventListener('click',()=>{
     const next=el.dataset.detailAudio;
     if((state.detailAudio||state.defaultPlayback)===next)return;
     changeDetailAudio(next);
   });
   document.getElementById('manage-detail-tags')?.addEventListener('click',showManageDetailTags);
   for(const el of screen.querySelectorAll('.detail-actions [data-episode-action]'))el.addEventListener('click',()=>showEpisodeAction(el.dataset.episodeAction,Number(el.dataset.episode)));
   requestAnimationFrame(updateTabScrollOverlay);
   return;
 }
 if(state.view==='library'&&screen.querySelector('.tagbar'))screen.querySelector('.tagbar').scrollLeft=oldTagScroll;
 for(const el of screen.querySelectorAll('[data-detail]'))el.addEventListener('click',()=>showDetail(el.dataset.detail));
 for(const el of screen.querySelectorAll('[data-tag]'))el.addEventListener('click',()=>{state.tag=el.dataset.tag;render();});
 const on=(id,fn)=>{const el=document.getElementById(id);if(el)el.addEventListener('click',fn)};
 on('filters',showFilters);on('resume',()=>showDetail('demo:02'));on('import',showImport);on('newtag',showNewTag);on('sharetag',showShare);on('renametag',showRenameTag);on('openfolder',showFolderInfo);on('demo-finish-download',runDemoDownloadSimulation);
 for(const el of screen.querySelectorAll('[data-download-filter]'))el.addEventListener('click',()=>{state.downloadStatus=el.dataset.downloadFilter;render();});
}
/* v39: Modal lifecycle and keyboard focus stay stable across every Gallery dialog.
   Preserve the original opener even when a dialog replaces another (e.g. import preview). */
const galleryApp=document.querySelector('.app');
let modalReturnFocus=null;
const modalFocusable='button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function visibleModalControls(){
 const dialog=modalHost.querySelector('.dialog');
 return dialog?Array.from(dialog.querySelectorAll(modalFocusable)).filter(el=>!el.closest('[hidden]')&&el.getClientRects().length>0&&!el.inert):[];
}
function modal(title,inner,actions=''){
 const previouslyOpen=!!modalHost.querySelector('.overlay');
 if(!previouslyOpen){
  const opener=document.activeElement;
  modalReturnFocus=opener instanceof HTMLElement&&opener!==document.body&&!modalHost.contains(opener)?opener:null;
 }
 clearTimeout(modalExitTimer);modalExitTimer=null;
 modalHost.innerHTML=`<div class="overlay" role="presentation"><div class="dialog" role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}" tabindex="-1"><div class="dialog-scroll"><div class="dialog-head"><h2>${escapeHTML(title)}</h2><button class="iconbtn" aria-label="Close dialog" id="close-dialog">${icon('close',20)}</button></div>${inner}${actions?`<div class="dialog-actions">${actions}</div>`:''}</div></div></div>`;
 galleryApp.inert=true;
 modalHost.querySelector('.overlay').addEventListener('click',e=>{if(e.target.classList.contains('overlay'))closeModal()});
 document.getElementById('close-dialog').addEventListener('click',closeModal);
 (modalHost.querySelector('button:not(#close-dialog),input,select')||document.getElementById('close-dialog')).focus({preventScroll:true});
}
function finishModalClose(overlay){
 if(modalHost.firstElementChild!==overlay)return;
 modalHost.innerHTML='';
 galleryApp.inert=false;
 const target=modalReturnFocus;
 modalReturnFocus=null;
 if(target?.isConnected&&!target.disabled)target.focus({preventScroll:true});
 else document.getElementById('settings')?.focus({preventScroll:true});
}
function closeModal(){
 const overlay=modalHost.querySelector('.overlay');
 if(!overlay||overlay.classList.contains('is-closing'))return;
 clearTimeout(modalExitTimer);
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finishModalClose(overlay);return;}
 overlay.classList.add('is-closing');
 modalExitTimer=setTimeout(()=>{
  finishModalClose(overlay);
  modalExitTimer=null;
 },150);
}
/* v41: All Tab / Shift+Tab focus changes in dialogs are managed here.
   Prevent Chrome's instant implicit focus scroll, then reveal the newly
   focused control through the same smooth scroll path as wraparound.
   Keep focus itself immediate, the dialog stationary and Reduce Motion intact. */
let modalScrollFrame=null;
let modalScrollGoal=null;
let modalScrollContainer=null;
function cancelModalKeyboardScroll(){
 if(modalScrollFrame!==null)cancelAnimationFrame(modalScrollFrame);
 modalScrollFrame=null;modalScrollGoal=null;modalScrollContainer=null;
}
function revealModalControl(control,edge='nearest'){
 const scroller=modalHost.querySelector('.dialog-scroll');
 if(!scroller||!control||!scroller.contains(control))return;
 // Compute visibility relative to the *intended* destination of any in-flight
 // keyboard scroll, not an intermediate animation frame. Repeated Tab presses
 // can therefore redirect the scroll without piling up contradictory requests.
 const base=(scroller===modalScrollContainer&&modalScrollGoal!==null)
  ?modalScrollGoal:scroller.scrollTop;
 const max=Math.max(0,scroller.scrollHeight-scroller.clientHeight);
 let target=base;
 if(edge==='start')target=0;
 else if(edge==='end')target=max;
 else{
  const view=scroller.getBoundingClientRect();
  const item=control.getBoundingClientRect();
  const itemTop=item.top-view.top+scroller.scrollTop;
  const itemBottom=item.bottom-view.top+scroller.scrollTop;
  const breathingRoom=10;
  if(itemTop<base+breathingRoom)target=itemTop-breathingRoom;
  else if(itemBottom>base+scroller.clientHeight-breathingRoom)
   target=itemBottom-scroller.clientHeight+breathingRoom;
 }
 target=Math.max(0,Math.min(target,max));
 cancelModalKeyboardScroll();
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  scroller.scrollTop=target;return;
 }
 const start=scroller.scrollTop;
 if(Math.abs(target-start)<1)return;
 modalScrollContainer=scroller;modalScrollGoal=target;
 const distance=Math.abs(target-start);
 const duration=Math.min(410,Math.max(220,180+Math.sqrt(distance)*7));
 let started=null;
 function step(time){
  if(modalScrollContainer!==scroller)return;
  if(started===null)started=time;
  const fraction=Math.min(1,(time-started)/duration);
  const eased=1-Math.pow(1-fraction,3);
  scroller.scrollTop=start+(target-start)*eased;
  if(fraction<1)modalScrollFrame=requestAnimationFrame(step);
  else{modalScrollFrame=null;modalScrollGoal=null;modalScrollContainer=null;}
 }
 modalScrollFrame=requestAnimationFrame(step);
}
// Pointer/wheel scrolling always takes precedence over keyboard-initiated motion.
modalHost.addEventListener('wheel',cancelModalKeyboardScroll,{passive:true,capture:true});
modalHost.addEventListener('touchstart',cancelModalKeyboardScroll,{passive:true,capture:true});
/* Set before focus() and cleared synchronously by focusin. This prevents
   the focusin fallback from issuing a second, conflicting scroll request. */
let modalKeyboardFocusTarget=null;
document.addEventListener('keydown',event=>{
 const overlay=modalHost.querySelector('.overlay');
 if(!overlay)return;
 if(event.key==='Escape'){
  event.preventDefault();event.stopImmediatePropagation();closeModal();return;
 }
 if(event.key!=='Tab'||overlay.classList.contains('is-closing')||event.altKey||event.ctrlKey||event.metaKey)return;
 const controls=visibleModalControls();
 const active=document.activeElement;
 const backward=event.shiftKey;
 // Only Settings requires manual Tab navigation. Other dialogs retain native
 // Tab behavior (important for radio groups) and the original focus trap.
 if(!overlay.querySelector('#apply-preferences')){
  const first=controls[0],last=controls[controls.length-1];
  if(!first){event.preventDefault();overlay.querySelector('.dialog')?.focus({preventScroll:true});return;}
  if(!overlay.contains(active)||(backward&&active===first)||(!backward&&active===last)){
   event.preventDefault();
   const next=backward?last:first;
   modalKeyboardFocusTarget=next;
   next.focus({preventScroll:true});
   if(modalKeyboardFocusTarget===next)modalKeyboardFocusTarget=null;
   revealModalControl(next,backward?'end':'start');
  }
  return;
 }
 event.preventDefault(); // Never let Chrome jump to an off-screen Settings control.
 if(!controls.length){overlay.querySelector('.dialog')?.focus({preventScroll:true});return;}
 const index=controls.indexOf(active);
 const nextIndex=index<0?(backward?controls.length-1:0):(index+(backward?-1:1)+controls.length)%controls.length;
 const next=controls[nextIndex];
 const wrap=index>=0&&((backward&&index===0)||(!backward&&index===controls.length-1));
 modalKeyboardFocusTarget=next;
 next.focus({preventScroll:true});
 // A click or programmatic focus may already have focused next.
 if(modalKeyboardFocusTarget===next)modalKeyboardFocusTarget=null;
 revealModalControl(next,wrap?(backward?'end':'start'):'nearest');
},true);
document.addEventListener('focusin',event=>{
 const overlay=modalHost.querySelector('.overlay');
 if(!overlay||overlay.classList.contains('is-closing'))return;
 if(overlay.contains(event.target)){
  const focused=event.target;
  if(focused===modalKeyboardFocusTarget){modalKeyboardFocusTarget=null;return;}
  // Mouse/programmatic focus outside Tab should still reveal hidden controls.
  requestAnimationFrame(()=>{
   if(document.activeElement===focused)revealModalControl(focused);
  });
  return;
 }
 const first=visibleModalControls()[0]||overlay.querySelector('.dialog');
 first?.focus({preventScroll:true});
 revealModalControl(first);
},true);
function showDetail(id){const x=demo.find(t=>t.id===id);if(!x)return;state.playback=null;state.detailReturnView=state.view;state.detailReturnScroll=selectedTabScroll();state.detailId=id;state.detailSeason=0;state.detailRelated=null;state.detailEpisodeFilter='all';state.detailEpisode=1;state.detailAudio=null;closeModal();render();workspace.scrollTop=0;}
function showFolderInfo(){modal('Downloads folder',`<p class="description">In the finished macOS application, this button will open your configured download folder in Finder.</p><div class="dialog-sample"><b>Design prototype</b><p class="description">This standalone HTML demo has no access to a real application's downloaded files or chosen folder.</p></div>`,`<button class="btn primary" id="folder-okay">Got it</button>`);document.getElementById('folder-okay').onclick=closeModal;}
function showSettings(){
 const themeTile=(id,title,description,gradient)=>`<button class="theme-tile" data-theme-button="${id}" aria-pressed="${state.theme===id}"><span class="swatch" style="background:${gradient}"></span><span><b>${title}</b><br><small class="muted">${description}</small></span></button>`;
 const selectAudio=(id,value)=>`<select id="${id}" aria-label="${id==='pref-playback'?'Default playback audio':'Default download audio'}"><option value="sub" ${value==='sub'?'selected':''}>Japanese (Sub)</option><option value="dub" ${value==='dub'?'selected':''}>English (Dub)</option></select>`;
 modal('Appearance & playback preferences',`<p class="description">All three visual themes share the Gallery layout.</p>
 <div class="theme-list">${themeTile('neon','Neon Reel','Lavender accents, minimal glow','linear-gradient(145deg,#171221,#c5a0ed)')}${themeTile('midnight','Midnight Cinema','Quiet and cinematic','linear-gradient(145deg,#111922,#92cbc7)')}${themeTile('paper','Paper Lantern','Warm and light','linear-gradient(145deg,#f7f2eb,#c68f8d)')}</div>
 <div class="dialog-sample"><span class="label">Demo preferences</span>
 <div class="field"><label for="pref-playback">Default playback audio</label>${selectAudio('pref-playback',state.defaultPlayback)}</div>
 <div class="field"><label for="pref-download">Default download language</label>${selectAudio('pref-download',state.defaultDownload)}</div>
 <div class="field"><label for="pref-subs">Subtitles enabled when playback starts</label><select id="pref-subs"><option value="on" ${state.defaultSubtitles?'selected':''}>On</option><option value="off" ${!state.defaultSubtitles?'selected':''}>Off</option></select></div>
 </div><div class="dialog-sample"><span class="label">Player integration · v0.2.7</span><div class="field"><label for="player-pref">Preferred player for local files</label><select id="player-pref"><option value="built-in" ${(state.playerPreference||'built-in')==='built-in'?'selected':''}>Built-in (default)</option><option value="vlc" ${state.playerPreference==='vlc'?'selected':''}>VLC (external · optional)</option></select></div><p class="tip">External player compatibility, subtitles, and watch progress are not guaranteed. Gallery recommends the built-in player. VLC detection uses macOS Spotlight metadata and standard application locations — no full disk scan.</p><button class="btn small" id="locate-vlc">Locate VLC manually…</button><div class="tip" id="vlc-detection">Optional: select a custom VLC installation path.</div></div><p class="tip">This is a development build. The app saves appearance and playback preferences locally. Provider streaming and real downloads are not implemented yet.</p>`,
 `<button class="btn primary" id="apply-preferences">Apply preferences</button>`);
 /* Apply appearance immediately, without replacing the dialog or committing unsaved form fields.
    Keeping the same DOM preserves scroll, focused theme tile, VLC choice, and other draft preferences. */
 for(const el of modalHost.querySelectorAll('[data-theme-button]'))el.onclick=()=>{
  const next=el.dataset.themeButton;
  if(state.theme===next)return;
  state.theme=next;
  document.body.dataset.theme=next;
  for(const tile of modalHost.querySelectorAll('[data-theme-button]'))tile.setAttribute('aria-pressed',String(tile.dataset.themeButton===next));
  saveDesktopPreferences();
 };
 document.getElementById('locate-vlc')?.addEventListener('click',async()=>{if(!window.galleryDesktop){document.getElementById('vlc-detection').textContent='Available in the macOS app only.';return;}const found=await window.galleryDesktop.locateVLC();document.getElementById('vlc-detection').textContent=found.ok?'Selected: '+found.path:found.message;});
 document.getElementById('apply-preferences').onclick=()=>{state.playerPreference=document.getElementById('player-pref').value;state.defaultPlayback=document.getElementById('pref-playback').value;state.defaultDownload=document.getElementById('pref-download').value;state.defaultSubtitles=document.getElementById('pref-subs').value==='on';state.detailAudio=null;saveDesktopPreferences();closeModal();render();};
}

function showFilters(){modal('Discovery filters',`<p class="description">Combinable filters, independent of sorting. Missing data must be represented as Unknown in production.</p><div class="field"><label for="status-filter">Airing status</label><select id="status-filter"><option>All</option><option>Completed</option><option>Ongoing</option></select></div><div class="field"><label for="audio-filter">Available audio</label><select id="audio-filter"><option>All</option><option>Sub</option><option>Dub</option></select></div>`,`<button class="btn" id="reset-filters">Reset</button><button class="btn primary" id="apply-filters">Apply filters</button>`);document.getElementById('status-filter').value=state.filterStatus;document.getElementById('audio-filter').value=state.filterAudio;document.getElementById('reset-filters').onclick=()=>{state.filterStatus='All';state.filterAudio='All';closeModal();render();};document.getElementById('apply-filters').onclick=()=>{state.filterStatus=document.getElementById('status-filter').value;state.filterAudio=document.getElementById('audio-filter').value;closeModal();render();};}
function showSearch(){modal('Search anime',`<div class="field"><label for="search-input">Search the sample library</label><input id="search-input" type="search" placeholder="Try “Moonlit” or “Orbit”" autocomplete="off" maxlength="100"></div><div id="search-results" class="result-list" aria-live="polite"></div>`);let input=document.getElementById('search-input');let results=document.getElementById('search-results');input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();const found=q?demo.filter(x=>x.name.toLowerCase().includes(q)):demo.slice(0,5);results.innerHTML=found.length?found.map(x=>`<button class="searchresult" data-result="${x.id}"><span>${escapeHTML(x.name)}</span>${icon('chevron',16)}</button>`).join(''):'<div class="empty">No matching sample titles.</div>';results.querySelectorAll('[data-result]').forEach(el=>el.onclick=()=>showDetail(el.dataset.result));});input.dispatchEvent(new Event('input'));input.focus();}
function showShare(){const tag=state.tag;const titles=demo.filter(x=>x.tags.includes(tag));const doc={format:'anime-gallery-tag',version:1,tag:{name:tag,type:state.kind[tag]},entries:titles.map(x=>({id:x.id,title:x.name,type:'series',source:'fictional-demo'}))};modal(`Share “${tag}”`,`<p class="description">Export a portable collection. The recipient can preview it or explicitly merge its titles into a tag.</p><div class="dialog-sample"><b>${titles.length} anime</b><p class="description">${escapeHTML(titles.slice(0,4).map(x=>x.name).join(' · '))}${titles.length>4?' …':''}</p></div><p class="tip">This demonstration exports fictional data, without videos, downloads, viewing history, or account information.</p>`,`<button class="btn" id="cancel-export">Cancel</button><button class="btn primary" id="export-tag">${icon('share',16)} Export sample file</button>`);document.getElementById('cancel-export').onclick=closeModal;document.getElementById('export-tag').onclick=()=>{const blob=new Blob([JSON.stringify(doc,null,2)],{type:'application/json'});const link=document.createElement('a');const url=URL.createObjectURL(blob);link.href=url;link.download=`${tag.toLowerCase().replace(/[^a-z0-9]+/g,'-')||'anime-tag'}.anime-collection.json`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);closeModal();};}
function showNewTag(){modal('Create a library tag',`<p class="description">Custom tags live alongside Watching, Downloads, and Plan to Watch.</p><div class="field"><label for="tag-name">Tag name</label><input id="tag-name" maxlength="45" placeholder="e.g. Movie Night" autocomplete="off"></div><p class="error" id="tag-error" aria-live="polite"></p>`,`<button class="btn" id="cancel-tag">Cancel</button><button class="btn primary" id="create-tag">${icon('plus',16)} Create tag</button>`);document.getElementById('cancel-tag').onclick=closeModal;document.getElementById('create-tag').onclick=()=>{const raw=document.getElementById('tag-name').value.trim().replace(/\s+/g,' ');const error=document.getElementById('tag-error');if(!raw||/[\x00-\x1F\x7F]/.test(raw)){error.textContent='Enter a valid tag name.';return;}if(state.tags.some(x=>x.toLowerCase()===raw.toLowerCase())||raw.toLowerCase()==='all titles'){error.textContent='A tag with that name already exists.';return;}state.tags.push(raw);state.kind[raw]='custom';state.tag=raw;closeModal();render();};}
function showDeleteTag(){
 const tag=state.tag;if(state.kind[tag]!=='custom')return;
 const total=countTag(tag);
 modal(`Delete “${tag}”?`,`<p class="description">This removes the custom tag from <b>${total} ${total===1?'title':'titles'}</b>. The anime themselves will stay in your Library.</p><p class="tip">Changes in this HTML prototype are temporary and reset when you reload.</p>`,`<button class="btn" id="cancel-delete-tag">Cancel</button><button class="btn primary" id="confirm-delete-tag">Delete tag</button>`);
 document.getElementById('cancel-delete-tag').onclick=closeModal;
 document.getElementById('confirm-delete-tag').onclick=()=>{
  state.tags=state.tags.filter(t=>t!==tag);delete state.kind[tag];
  demo.forEach(x=>{x.tags=x.tags.filter(t=>t!==tag)});
  Object.keys(state.seasonTags).forEach(k=>{state.seasonTags[k]=state.seasonTags[k].filter(t=>t!==tag)});
  state.tag='All Titles';closeModal();render();
 };
}
function showRenameTag(){const old=state.tag;if(state.kind[old]!=='custom')return;modal('Rename custom tag',`<div class="field"><label for="tag-rename">Tag name</label><input id="tag-rename" maxlength="45" value="${escapeHTML(old)}"></div><p class="error" id="tag-error" aria-live="polite"></p>`,`<button class="btn" id="cancel-tag">Cancel</button><button class="btn primary" id="rename-tag">Save name</button>`);document.getElementById('cancel-tag').onclick=closeModal;document.getElementById('rename-tag').onclick=()=>{const raw=document.getElementById('tag-rename').value.trim();if(!raw||state.tags.some(x=>x.toLowerCase()===raw.toLowerCase()&&x!==old)){document.getElementById('tag-error').textContent='Choose a unique name.';return;}state.tags=state.tags.map(x=>x===old?raw:x);delete state.kind[old];state.kind[raw]='custom';demo.forEach(x=>x.tags=x.tags.map(t=>t===old?raw:t));state.tag=raw;closeModal();render();};}
function showImport(){state.importDoc=null;modal('Import shared collection',`<p class="description">Open a compatible, locally saved collection file. Preview it before making any changes to your sample library.</p><div class="field"><label for="import-file">Collection file (.json)</label><input id="import-file" type="file" accept=".json,application/json"></div><div id="import-status" class="dialog-sample"><p class="description">Tip: export a sample tag first, then import that file to test this flow.</p></div>`,`<button class="btn" id="cancel-import">Cancel</button><button class="btn primary" id="preview-import" disabled>Preview collection</button>`);document.getElementById('cancel-import').onclick=closeModal;document.getElementById('import-file').onchange=async(e)=>{const f=e.target.files?.[0];const status=document.getElementById('import-status');state.importDoc=null;document.getElementById('preview-import').disabled=true;if(!f)return;if(f.size>1024*1024){status.innerHTML='<p class="error">File is too large for this prototype (max 1 MB).</p>';return;}try{const parsed=JSON.parse(await f.text());if(parsed.format!=='anime-gallery-tag'||parsed.version!==1||typeof parsed.tag?.name!=='string'||!Array.isArray(parsed.entries)||parsed.entries.length>500||!parsed.entries.every(x=>typeof x.id==='string'&&typeof x.title==='string'))throw Error('Unsupported or malformed collection file.');state.importDoc=parsed;status.innerHTML=`<b>${escapeHTML(parsed.tag.name)}</b><p class="description">${parsed.entries.length} entries found. Preview them before importing.</p>`;document.getElementById('preview-import').disabled=false;}catch(err){status.innerHTML=`<p class="error">${escapeHTML(err.message)}</p>`;}};document.getElementById('preview-import').onclick=showImportPreview;}
function showImportPreview(){const d=state.importDoc;if(!d)return;const matched=d.entries.map(en=>({entry:en,found:demo.find(x=>x.id===en.id)}));let recognized=matched.filter(x=>x.found).length;let missing=matched.length-recognized;modal(`Preview “${d.tag.name}”`,`<p class="description">Nothing has been imported yet. Matches use demonstration IDs only; the real application will need reliable anime and season matching.</p><div class="dialog-sample"><b>${recognized} matches · ${missing} unmatched</b><p class="description">Only matched titles can be merged in this prototype. Unmatched titles are never guessed.</p></div><div class="result-list">${matched.slice(0,14).map(x=>`<div class="searchresult"><span>${escapeHTML(x.entry.title)}</span><span class="${x.found?'success':'muted'}">${x.found?'Matched':'Review'}</span></div>`).join('')}${matched.length>14?'<div class="tip">Showing first 14 entries.</div>':''}</div><div class="field"><label for="import-target">Import into</label><select id="import-target"><option value="__new__">New custom tag: ${escapeHTML(d.tag.name)}</option>${state.tags.map(t=>`<option value="${escapeHTML(t)}">Existing: ${escapeHTML(t)}</option>`).join('')}</select></div><p class="tip">For safety, importing into a built-in tag in this demo only changes tag membership. It never changes watched or downloaded state.</p>`,`<button class="btn" id="cancel-import-preview">Cancel</button><button class="btn primary" id="merge-import">Merge matched titles</button>`);document.getElementById('cancel-import-preview').onclick=closeModal;document.getElementById('merge-import').onclick=()=>{const dest=document.getElementById('import-target').value;let finalTag=dest;if(dest==='__new__'){let base=String(d.tag.name||'Shared collection').trim().slice(0,40)||'Shared collection';finalTag=base;let n=2;while(state.tags.some(t=>t.toLowerCase()===finalTag.toLowerCase())){finalTag=base+' ('+n++ +')';}state.tags.push(finalTag);state.kind[finalTag]='custom';}for(const record of matched){if(record.found&&!record.found.tags.includes(finalTag))record.found.tags.push(finalTag);}state.tag=finalTag;closeModal();setView('library');};}
document.addEventListener('pointerdown',event=>{
 const wrap=tabPages.library?.querySelector('.collection-menu-wrap');
 if(!wrap||wrap.contains(event.target))return;
 const menu=wrap.querySelector('.collection-menu'),button=wrap.querySelector('#tag-options');
 if(menu&&!menu.hidden){menu.hidden=true;button?.setAttribute('aria-expanded','false');}
});
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 const menu=tabPages.library?.querySelector('#tag-options-menu');
 if(menu&&!menu.hidden){menu.hidden=true;const button=tabPages.library.querySelector('#tag-options');button?.setAttribute('aria-expanded','false');button?.focus();event.preventDefault();}
});
for(const tab of document.querySelectorAll('.tab'))tab.addEventListener('click',()=>setView(tab.dataset.view));document.getElementById('brand-icon').innerHTML=icon('clapper',25);document.getElementById('search').innerHTML=icon('search',22);document.getElementById('settings').innerHTML=icon('settings',23);document.getElementById('search').onclick=showSearch;document.getElementById('settings').onclick=showSettings;for(const [name,ico] of [['discover','compass'],['library','library'],['downloads','download']])document.getElementById('nav-'+name).innerHTML=`<span class="tab-label-wrap">${icon(ico,19)}<span>${name[0].toUpperCase()+name.slice(1)}</span></span>`;document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modalHost.firstChild)closeModal();});render();setupDesktopSettings();setupTabHover();updateTabIndicator();requestAnimationFrame(()=>document.querySelector('.tab-indicator')?.classList.add('is-ready'));window.addEventListener('resize',updateTabIndicator);
window.addEventListener('resize',()=>tabPages.library?.querySelector('.tagbar')?.galleryRefresh?.(true));
