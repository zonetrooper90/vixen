'use strict';
// Export the exact browser-side Gallery UI into a self-contained HTML preview.
// No macOS binaries, dependencies, network requests, or external assets.
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const app=path.join(root,'app');
let html=fs.readFileSync(path.join(app,'index.html'),'utf8');
const css=fs.readFileSync(path.join(app,'style.css'),'utf8');
const js=fs.readFileSync(path.join(app,'renderer.js'),'utf8');
const inlineCsp=`default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; media-src file: blob:; connect-src 'none'; object-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'`;
html=html.replace(/<meta http-equiv="Content-Security-Policy" content="[^"]*">/, `<meta http-equiv="Content-Security-Policy" content="${inlineCsp}">`);
if(!html.includes('<link rel="stylesheet" href="./style.css">')) throw Error('Gallery stylesheet link not found');
html=html.replace('<link rel="stylesheet" href="./style.css">','<style>'+css.replace(/<\/style/gi,'<\\/style')+'</style>');
if(!html.includes('<script src="./renderer.js"></script>')) throw Error('Gallery renderer link not found');
html=html.replace('<script src="./renderer.js"></script>','<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>');
const out=path.join(root,'dist-preview','Gallery-v0.2.6-Animation-Preview.html');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,html,'utf8');
if(!html.includes('gallery-surface-in')||!html.includes('gallery-dialog-in')||!html.includes('Gallery · v0.2.6'))throw Error('Wrong preview version or missing animation rules');
console.log('Created '+out+' ('+Buffer.byteLength(html)+' bytes)');
