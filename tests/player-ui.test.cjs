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
