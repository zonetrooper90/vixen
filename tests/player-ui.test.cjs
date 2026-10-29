'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const app=path.join(__dirname,'..','app');
const renderer=fs.readFileSync(path.join(app,'renderer.js'),'utf8');
const css=fs.readFileSync(path.join(app,'style.css'),'utf8');

test('player has exactly one fullscreen button and handler',()=>{
 assert.equal((renderer.match(/id="fullscreen"/g)||[]).length,1);
 assert.equal((renderer.match(/getElementById\('fullscreen'\)\.onclick=fullscreen/g)||[]).length,1);
 assert.doesNotMatch(renderer,/top-fullscreen/);
});
test('player controls have gradual fade and reduced-motion fallback',()=>{
 assert.match(css,/transition:opacity \.30s ease-out/);
 assert.match(css,/\.player-area\.controls-hidden \.player-overlay\{transition:opacity \.62s /);
 assert.match(css,/prefers-reduced-motion:reduce\)\{\.player-area\.controls-hidden \.player-overlay,\.player-overlay\{transition:none!important\}/);
});

test('episode navigation shares the player frame width and centers the info between edge buttons',()=>{
 assert.match(renderer,/<div class="player-episode-nav"><button class="btn small player-episode-previous"/);
 assert.match(renderer,/<div class="player-episode-label">/);
 assert.match(renderer,/<button class="btn small player-episode-next"/);
 assert.match(css,/body\.player-view \.player-area,body\.player-view \.player-episode-nav\{width:var\(--player-frame-width\)\}/);
 assert.match(css,/grid-template-columns:minmax\(0,1fr\) minmax\(0,2fr\) minmax\(0,1fr\)/);
 assert.match(css,/\.player-episode-label\{min-width:0;text-align:center\}/);
});


test('v41 persistent navigation and CSP-safe sources',()=>{
 const html=require('node:fs').readFileSync(require('node:path').join(app,'index.html'),'utf8');
 assert.match(html,/<title>Gallery · v0\.2\.7<\/title>/);
 assert.match(html,/script-src 'self'/);
 assert.match(html,/id="tab-pages-track"/);
 assert.match(html,/data-tab-page="downloads"/);
 assert.match(renderer,/function renderTabPage\(/);
 assert.match(renderer,/function animateTabTrack\(/);
 assert.match(renderer,/function setupTabHover\(/);
 assert.match(css,/\.tab-pages-track/);
});
test('release navigation, episode filtering and keyboard-aware Settings',()=>{
 assert.match(renderer,/function refreshInstallmentArrows\(/);
 assert.match(renderer,/function setupInstallmentEdgeGuards\(/);
 assert.match(renderer,/function changeEpisodeFilter\(/);
 assert.match(renderer,/detailEpisodeFilter/);
 assert.match(renderer,/function revealModalControl\(/);
 assert.match(renderer,/preventScroll:true/);
 assert.match(css,/\.tab-scroll-overlay/);
 assert.match(css,/\.download-progress/);
});
test('local video, VLC and native preference bridge remain intact',()=>{
 assert.match(renderer,/galleryDesktop\.openVideo\(/);
 assert.match(renderer,/galleryDesktop\.openInVLC\(/);
 assert.match(renderer,/galleryDesktop\.saveSettings\(/);
 assert.match(renderer,/function initializePlayer\(/);
});
