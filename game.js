import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const mount=document.querySelector('#world');
const scene=new THREE.Scene();scene.background=new THREE.Color('#c9eacb');scene.fog=new THREE.Fog('#c9eacb',20,42);
const camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);let orbit={angle:.72,radius:19,height:12.5};
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.16;mount.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight('#f4fff0','#769567',2.1));const sun=new THREE.DirectionalLight('#fff4d8',3.2);sun.position.set(-5,12,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-12;sun.shadow.camera.right=12;sun.shadow.camera.top=12;sun.shadow.camera.bottom=-12;scene.add(sun);
const mat=(color,roughness=.88)=>new THREE.MeshStandardMaterial({color,roughness});
function box(parent,size,color,pos){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),typeof color==='string'?mat(color):color);mesh.position.set(...pos);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh}
function sphere(parent,r,color,pos,segments=12){const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,segments,Math.max(8,segments-2)),mat(color));mesh.position.set(...pos);mesh.castShadow=true;parent.add(mesh);return mesh}
function cylinder(parent,rt,rb,h,color,pos,segments=12){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,segments),mat(color));mesh.position.set(...pos);mesh.castShadow=true;parent.add(mesh);return mesh}
const ground=new THREE.Mesh(new THREE.CircleGeometry(22,64),mat('#94c876'));ground.rotation.x=-Math.PI/2;ground.position.y=-.24;ground.receiveShadow=true;scene.add(ground);
const patch=new THREE.Mesh(new THREE.CircleGeometry(9.4,48),mat('#a8d585'));patch.rotation.x=-Math.PI/2;patch.position.set(0,-.225,.5);scene.add(patch);
const path=new THREE.Mesh(new THREE.PlaneGeometry(3.2,11),mat('#d9c99d'));path.rotation.x=-Math.PI/2;path.position.set(0,-.17,3.7);scene.add(path);
for(let i=0;i<8;i++){const stone=new THREE.Mesh(new THREE.CylinderGeometry(.33,.38,.075,8),mat(i%2?'#e7d8b3':'#d7c59b'));stone.position.set(Math.sin(i*.65)*.34,-.095,7.8-i*1.1);stone.rotation.y=i*.4;scene.add(stone)}
for(let i=0;i<44;i++){const a=i*2.399,r=6.2+(i%5)*.8,x=Math.cos(a)*r,z=Math.sin(a)*r+.1;if(Math.abs(x)<4.4&&z>-4.7&&z<4.8)continue;const g=new THREE.Group();g.position.set(x,-.2,z);scene.add(g);cylinder(g,.025,.035,.28,'#4e9b55',[0,.14,0],7);const cs=['#fff2cb','#f8a7a4','#fffdf3','#d6a5e8','#ffd66f'];for(let p=0;p<5;p++){const pet=sphere(g,.075,cs[i%cs.length],[Math.cos(p*1.257)*.09,.31,Math.sin(p*1.257)*.09],9);pet.scale.set(1,.7,1)}sphere(g,.045,'#f1bc49',[0,.32,0],9)}
function tree(x,z,s=1){const g=new THREE.Group();g.position.set(x,-.2,z);scene.add(g);cylinder(g,.22*s,.34*s,1.2*s,'#93683f',[0,.6*s,0]);sphere(g,.8*s,'#6ca967',[0,1.45*s,0]);sphere(g,.55*s,'#84bc70',[.35*s,1.62*s,.03]);sphere(g,.5*s,'#5d9c60',[-.35*s,1.72*s,-.08])}
tree(-7,-5,1.25);tree(7,-5,1.05);tree(-7,4,1.1);tree(7,5,1.25);tree(-5.9,-8,.85);tree(6.2,-8,.9);
const stall=new THREE.Group();stall.position.set(-5.2,-.18,1.5);stall.rotation.y=-.28;scene.add(stall);box(stall,[1.9,.12,1.05],'#b8794b',[0,1.25,0]);for(const x of[-.78,.78])box(stall,[.13,1.55,.13],'#a46e45',[x,.72,0]);box(stall,[1.85,.14,1.05],'#e9b957',[0,2.1,0]);for(let i=0;i<5;i++){const aw=box(stall,[.36,.1,1.08],i%2?'#f4e3ba':'#e5775d',[-.72+i*.36,2.07,0]);aw.rotation.z=(i-2)*.12}box(stall,[1.5,.55,.09],'#f6edd6',[0,.8,-.52]);
const can=new THREE.Group();can.position.set(-4.18,-.15,2.05);can.rotation.y=-.3;scene.add(can);const canBody=new THREE.Mesh(new THREE.CylinderGeometry(.26,.32,.5,12),mat('#77b8b2'));canBody.position.y=.36;can.add(canBody);const spout=new THREE.Mesh(new THREE.CylinderGeometry(.055,.11,.52,10),mat('#77b8b2'));spout.position.set(.35,.52,0);spout.rotation.z=-.85;can.add(spout);const handle=new THREE.Mesh(new THREE.TorusGeometry(.2,.045,7,14,Math.PI),mat('#4b928d'));handle.position.set(-.05,.48,0);handle.rotation.z=Math.PI/2;can.add(handle);
const seedTypes=[{id:'carrot',name:'Cenoura',emoji:'🥕',price:5,value:15,time:18,color:'#f18b45',stock:4},{id:'tomato',name:'Tomatinho',emoji:'🍅',price:8,value:23,time:25,color:'#e76455',stock:2},{id:'sunflower',name:'Girassol',emoji:'🌻',price:14,value:42,time:38,color:'#f3bf49',stock:1}];
const saved=(()=>{try{return JSON.parse(localStorage.getItem('meu-jardim-save'))||{}}catch{return {}}})();
const state={coins:Number.isFinite(saved.coins)?saved.coins:40,level:saved.level||1,harvested:saved.harvested||0,stock:{...Object.fromEntries(seedTypes.map(s=>[s.id,s.stock])),...(saved.stock||{})},plots:saved.plots||{},selected:saved.selected||'carrot',mode:'plant',water:1,expanded:!!saved.expanded,questPaid:!!saved.questPaid,day:1,seconds:0};
const plots=[],plotMaterial=mat('#795435'),edgeMaterial=mat('#bd9061'),soilMaterial=mat('#60422f');
function makePlot(def){const group=new THREE.Group();group.position.set(def.x,0,def.z);scene.add(group);box(group,[1.86,.34,1.7],edgeMaterial,[0,.02,0]);const base=box(group,[1.9,.13,1.75],plotMaterial,[0,.19,0]);base.material=plotMaterial.clone();const top=box(group,[1.65,.08,1.48],'#66462e',[0,.30,0]);top.userData.plotId=def.id;for(let i=-1;i<=1;i++)box(group,[1.46,.012,.018],'#79593a',[0,.346,i*.38]);const plot={...def,group,hit:top,crop:null,baseScale:1};plots.push(plot);top.userData.plot=plot;return plot}
for(let row=0;row<4;row++)for(let col=0;col<3;col++)makePlot({id:`${row}-${col}`,x:(col-1)*2.12,z:(row-1.45)*2});
function addCrop(plot){if(plot.crop?.group)plot.group.remove(plot.crop.group);const crop=state.plots[plot.id];plot.crop=null;if(!crop)return;const type=seedTypes.find(s=>s.id===crop.type)||seedTypes[0];const age=Math.max(0,crop.elapsed??((Date.now()-crop.plantedAt)/1000+(crop.bonus||0))),stage=Math.min(3,Math.floor(age/type.time*3));const g=new THREE.Group();g.position.set(0,.35,0);plot.group.add(g);const h=[.22,.42,.68,1.02][stage];cylinder(g,.035,.055,h,'#4f9650',[0,h/2+.03,0],9);const count=stage===0?2:stage+2;for(let i=0;i<count;i++){const a=i*2.4+plot.z*.2,leaf=sphere(g,.22,stage===3?'#5eac5f':'#75ba66',[Math.cos(a)*.16,.17+i/count*h,Math.sin(a)*.16],10);leaf.scale.set(1.45,.42,.68);leaf.rotation.y=a;leaf.rotation.z=Math.cos(a)*.22}if(stage===3){if(type.id==='sunflower'){sphere(g,.28,'#5d8240',[0,h+.1,0]);for(let j=0;j<10;j++){const a=j*Math.PI/5,pet=sphere(g,.105,'#ffd34d',[Math.cos(a)*.26,h+.1+Math.sin(a)*.26,0],9);pet.scale.set(.78,1,.65)}sphere(g,.16,'#6a482b',[0,h+.1,0])}else{const n=type.id==='carrot'?1:3;for(let j=0;j<n;j++){const a=j*2.1,f=sphere(g,type.id==='carrot'?.16:.17,type.color,[Math.cos(a)*.22,h-.13+(j%2)*.12,Math.sin(a)*.19]);if(type.id==='carrot'){f.scale.set(.65,1.55,.65);f.rotation.z=-.16}else cylinder(g,.035,.025,.11,'#468749',[Math.cos(a)*.22,h+.015+(j%2)*.12,Math.sin(a)*.19],7)}}}plot.crop={group:g,stage,type,age};if(stage===3){const glow=new THREE.PointLight(type.color,.55,2.1);glow.position.set(0,.8,0);g.add(glow)}}
const gardener=new THREE.Group();gardener.position.set(2.4,0,6.1);gardener.rotation.y=.3;scene.add(gardener);cylinder(gardener,.3,.38,.76,'#78a6d9',[0,.55,0]);sphere(gardener,.29,'#f2c69d',[0,1.12,0],14);sphere(gardener,.31,'#6b4c37',[0,1.3,0]).scale.set(1,.35,1);cylinder(gardener,.38,.38,.08,'#e5a944',[0,1.44,0]);cylinder(gardener,.24,.31,.2,'#e5a944',[0,1.54,0]);for(const x of[-.13,.13])sphere(gardener,.035,'#3f493e',[x,1.15,.25],8);const arm=cylinder(gardener,.11,.13,.48,'#f2c69d',[.39,.75,0],10);arm.rotation.z=-.65;
const clouds=[];for(let i=0;i<5;i++){const c=new THREE.Group();c.position.set(-12+i*5,7+(i%2)*1.3,-7-(i%3)*3);scene.add(c);for(let j=0;j<4;j++)sphere(c,.58+(j%2)*.15,'#f8fff0',[j*.65,Math.sin(j)*.12,0]);clouds.push(c)}
function updateCamera(){camera.position.set(Math.sin(orbit.angle)*orbit.radius,orbit.height,Math.cos(orbit.angle)*orbit.radius);camera.lookAt(0,.25,.3)}updateCamera();
if(!saved.plots){
  state.plots['1-1']={type:'tomato',plantedAt:Date.now(),elapsed:30};
  state.plots['1-2']={type:'carrot',plantedAt:Date.now(),elapsed:8.5};
}
if(state.expanded){
  for(let i=0;i<3;i++){const plot=makePlot({id:`extra-${i}`,x:4.55,z:-1.1+i*2.15});plot.baseScale=.9;plot.group.scale.setScalar(plot.baseScale)}
}
plots.forEach(addCrop);

const $=s=>document.querySelector(s);
const seedList=$('#seedList');
let toastTimer;
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100)}
function save(){try{localStorage.setItem('meu-jardim-save',JSON.stringify({coins:state.coins,level:state.level,harvested:state.harvested,stock:state.stock,plots:state.plots,selected:state.selected,expanded:state.expanded,questPaid:state.questPaid}))}catch{}}
function renderSeeds(){
  seedList.innerHTML='';
  seedTypes.forEach((seed,index)=>{
    const button=document.createElement('button');button.className=`seed-option ${state.selected===seed.id?'selected':''}`;
    button.innerHTML=`<span class="seed-icon">${seed.emoji}</span><span class="seed-info"><span class="seed-name">${seed.name}</span><span class="seed-meta">⏱ ${seed.time}s · ganha ${seed.value} 🪙</span></span><span class="seed-price"><span class="coin">🪙</span>${seed.price}<span class="stock">×${state.stock[seed.id]||0}</span></span>`;
    button.title=`Selecionar ${seed.name}`;button.addEventListener('click',()=>{state.selected=seed.id;state.mode='plant';updateUI();toast(`${seed.emoji} ${seed.name} selecionada! Clique num canteiro.`)});seedList.append(button);
  });
}
function updateUI(){
  $('#coins').textContent=state.coins;$('#level').textContent=state.level;
  $('#questCount').textContent=`${Math.min(3,state.harvested)} de 3 colhidas`;
  $('#questProgress').style.width=`${Math.min(100,state.harvested/3*100)}%`;
  $('#questReward').textContent=state.questPaid?'✓ Recompensa resgatada!':state.harvested>=3?'Missão completa! +25 moedas em breve':'';
  $('#waterStock').textContent=state.water?'1 gota':'recarregando';$('#waterAction').disabled=!state.water;
  const plant=$('#plantAction');plant.classList.toggle('primary',state.mode==='plant');$('#waterAction').classList.toggle('primary',state.mode==='water');
  plant.querySelector('span:nth-child(2)').textContent=state.mode==='plant'?'Plantar':'Plantar';
  $('#expandAction').innerHTML=state.expanded?'<span>🌳</span><span>Jardim ampliado!</span>':'<span>🪵</span><span>Mais canteiros</span><span class="key">80 🪙</span>';
  $('#expandAction').disabled=state.expanded;
  renderSeeds();save();
}
function plant(plot){
  const seed=seedTypes.find(s=>s.id===state.selected);
  if(!seed)return;
  if(!state.stock[seed.id]){
    if(state.coins<seed.price){toast(`Faltam ${seed.price-state.coins} moedas para comprar ${seed.name}.`);return}
    state.coins-=seed.price;state.stock[seed.id]=(state.stock[seed.id]||0)+1;
  }
  state.stock[seed.id]--;
  state.plots[plot.id]={type:seed.id,plantedAt:Date.now(),elapsed:0};addCrop(plot);updateUI();
  toast(`${seed.emoji} ${seed.name} plantada! Ela cresce em ${seed.time}s.`);
}
function harvest(plot){
  const crop=plot.crop;const type=crop.type;
  if(crop.stage<3){const left=Math.max(1,Math.ceil(type.time*(1-crop.age/type.time)));toast(`Ainda está crescendo... falta pouco! 🌱`);return}
  const bonus=Math.round(type.value*(weather==='rain'?1.15:1));state.coins+=bonus;state.harvested++;state.plots[plot.id]=null;addCrop(plot);
  const oldLevel=state.level;state.level=1+Math.floor(state.harvested/5);
  if(state.harvested>=3&&!state.questPaid){state.coins+=25;state.questPaid=true;toast(`Missão completa! +${bonus+25} moedas 🪙`)}else toast(`${type.emoji} Colheita incrível! +${bonus} moedas 🪙`);
  if(state.level>oldLevel)setTimeout(()=>toast(`Parabéns! Você chegou ao nível ${state.level}! ⭐`),850);
  updateUI();
}
function water(plot){
  if(!plot.crop){toast('Escolha uma plantinha para regar 🌱');return}
  if(!state.water){toast('O regador está enchendo. Só mais um pouquinho!');return}
  state.water=0;state.waterReadyAt=Date.now()+14000;
  const crop=state.plots[plot.id];const type=plot.crop.type;
  crop.elapsed=(plot.crop.age||0)+type.time*.34;addCrop(plot);updateUI();
  toast(`${type.emoji} Água fresquinha! Cresceu bastante 💧`);
}
function clickPlot(plot){
  if(plot.crop?.stage===3){harvest(plot);return}
  if(state.mode==='water'){water(plot);return}
  if(plot.crop){harvest(plot);return}
  plant(plot);
}
function expandGarden(){
  if(state.expanded)return;
  if(state.coins<80){toast(`Junte mais ${80-state.coins} moedas para ampliar o jardim.`);return}
  state.coins-=80;state.expanded=true;
  for(let i=0;i<3;i++){const p=makePlot({id:`extra-${i}`,x:4.55,z:-1.1+i*2.15});p.group.scale.setScalar(.9)}
  updateUI();toast('Que espaço lindo! 3 canteiros novos desbloqueados 🌳');
}

let weather='sun';let weatherUntil=Date.now()+65000;
function setWeather(next){weather=next;weatherUntil=Date.now()+(next==='rain'?22000:65000);const rain=next==='rain';
  $('#weatherIcon').textContent=rain?'🌧️':'☀️';$('#weatherName').textContent=rain?'Chuvinha boa':'Solzinho';
  $('#weatherDesc').textContent=rain?'As plantas crescem mais rápido!':'Dia perfeito para plantar';
  $('#weatherTip').textContent=rain?'🌧️ Chuva acelera o crescimento e deixa a colheita mais valiosa!':'💧 Regue suas plantinhas para crescerem rapidinho!';
  scene.fog.color.set(rain?'#b8d5d4':'#c9eacb');scene.background.set(rain?'#b8d5d4':'#c9eacb');sun.intensity=rain?1.7:3.2;
  if(rain)toast('Começou a chover! Suas plantas crescem mais rápido 🌧️');
}
$('#plantAction').addEventListener('click',()=>{state.mode='plant';updateUI();toast('Modo plantar: escolha um canteiro vazio 🌱')});
$('#waterAction').addEventListener('click',()=>{if(!state.water){toast('O regador está enchendo!');return}state.mode=state.mode==='water'?'plant':'water';updateUI();toast(state.mode==='water'?'Modo regar: clique numa plantinha 💧':'Modo plantar ativado 🌱')});
$('#expandAction').addEventListener('click',expandGarden);
$('#helpBtn').addEventListener('click',()=>$('#helpModal').classList.add('open'));
$('#closeHelp').addEventListener('click',()=>$('#helpModal').classList.remove('open'));
$('#startPlaying').addEventListener('click',()=>$('#helpModal').classList.remove('open'));
$('#helpModal').addEventListener('click',e=>{if(e.target.id==='helpModal')e.currentTarget.classList.remove('open')});
$('#menuToggle').addEventListener('click',()=>$('#leftPanel').classList.toggle('collapsed'));
updateUI();
if(!saved.plots)setTimeout(()=>{$('#helpModal').classList.add('open')},900);

const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null,dragged=false,hoverPlot=null;
function plotAt(event){const rect=renderer.domElement.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width*2-1;pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(plots.map(p=>p.hit),false);return hits.length?hits[0].object.userData.plot:null}
renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,angle:orbit.angle,height:orbit.height};dragged=false;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener('pointermove',e=>{
  if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)+Math.abs(dy)>5)dragged=true;
    if(dragged){orbit.angle=down.angle-dx*.006;orbit.height=Math.max(7,Math.min(18,down.height+dy*.035));updateCamera()}}
  const next=plotAt(e);if(next!==hoverPlot){if(hoverPlot)hoverPlot.group.scale.setScalar(hoverPlot.baseScale);hoverPlot=next;if(hoverPlot)hoverPlot.group.scale.setScalar(hoverPlot.baseScale*1.035)}
  renderer.domElement.style.cursor=hoverPlot?'pointer':down?'grabbing':'grab';
});
renderer.domElement.addEventListener('pointerup',e=>{if(!dragged){const plot=plotAt(e);if(plot)clickPlot(plot)}down=null});
renderer.domElement.addEventListener('pointercancel',()=>down=null);
renderer.domElement.addEventListener('wheel',e=>{orbit.radius=Math.max(12,Math.min(25,orbit.radius+e.deltaY*.012));updateCamera()},{passive:true});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8))});
window.addEventListener('keydown',e=>{
  if(e.key==='1'||e.key==='2'||e.key==='3'){state.selected=seedTypes[Number(e.key)-1].id;state.mode='plant';updateUI()}
  if(e.key.toLowerCase()==='r'){state.mode='water';updateUI()}
  if(e.key==='Escape')$('#helpModal').classList.remove('open');
});

let last=performance.now(),saveTicker=0;
function animate(now){requestAnimationFrame(animate);const dt=Math.min(.06,(now-last)/1000);last=now;
  clouds.forEach((c,i)=>{c.position.x+=dt*(.12+i*.012);if(c.position.x>14)c.position.x=-14});
  gardener.rotation.y=.3+Math.sin(now*.0008)*.07;gardener.children[7].rotation.z=-.65+Math.sin(now*.004)*.18;
  for(const plot of plots){
    if(!plot.crop)continue;
    const data=state.plots[plot.id];if(!data)continue;
    data.elapsed=(data.elapsed??Math.max(0,(Date.now()-data.plantedAt)/1000+(data.bonus||0)))+dt*(weather==='rain'?1.8:1);
    plot.crop.age=data.elapsed;
    const stage=Math.min(3,Math.floor(plot.crop.age/plot.crop.type.time*3));
    if(stage!==plot.crop.stage)addCrop(plot);
    if(plot.crop.stage===3){plot.crop.group.scale.setScalar(1+Math.sin(now*.003+plot.x)*.035);}
  }
  if(!state.water&&Date.now()>=state.waterReadyAt){state.water=1;updateUI();toast('Seu regador está cheio de novo 💧')}
  if(Date.now()>weatherUntil)setWeather(weather==='sun'?'rain':'sun');
  state.seconds+=dt;const mins=Math.floor(state.seconds)%60;const hours=8+Math.floor(state.seconds/60)%12;
  $('#dayClock').textContent=`${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}`;
  saveTicker+=dt;if(saveTicker>4){saveTicker=0;save()}
  renderer.render(scene,camera);
}
requestAnimationFrame(animate);
