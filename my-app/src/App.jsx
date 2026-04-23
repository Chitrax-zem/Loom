import { useState, useEffect, useRef, useCallback } from "react";

// ─── Ability Configs ──────────────────────────────────────────────────────────
const ABILITIES = {
  sorcerer:{name:"⚗️ SORCERER",emoji:"🔮",label:"Sorcerer",getColor:(t)=>`hsl(${270+Math.sin(t)*40},100%,${55+Math.random()*20}%)`,bgGradient:["#0a0014","#1a0030"],glowColor:"#cc66ff",particleSize:()=>2+Math.random()*5,shape:"circle",trail:true,gravity:-0.02,forceScale:1.2,emitRate:4,maxLife:220},
  timestone:{name:"💚 TIME STONE",emoji:"💚",label:"Time",getColor:(t)=>`hsl(${140+Math.sin(t*2)*15},100%,${45+Math.random()*25}%)`,bgGradient:["#001a0a","#003318"],glowColor:"#00ff88",particleSize:()=>3+Math.random()*4,shape:"circle",trail:true,gravity:0,forceScale:0,emitRate:3,maxLife:999,freeze:true},
  rainbow:{name:"🌈 RAINBOW",emoji:"🌈",label:"Rainbow",getColor:(t,i)=>`hsl(${(t*3+(i||0)*20)%360},100%,60%)`,bgGradient:["#0a0018","#180028"],glowColor:"#ff88ff",particleSize:()=>2+Math.random()*6,shape:"circle",trail:true,gravity:-0.01,forceScale:0.8,emitRate:6,maxLife:180},
  cyberpunk:{name:"⚡ CYBERPUNK",emoji:"⚡",label:"Cyber",getColor:()=>["#00ffff","#ff00ff","#ffff00","#00ff88"][Math.floor(Math.random()*4)],bgGradient:["#000a12","#001020"],glowColor:"#00ffff",particleSize:()=>1+Math.random()*3,shape:"square",trail:false,gravity:0.05,forceScale:1.6,emitRate:7,maxLife:120},
  lava:{name:"🌋 LAVA",emoji:"🌋",label:"Lava",getColor:()=>`hsl(${10+Math.random()*20},100%,${35+Math.random()*30}%)`,bgGradient:["#120200","#200500"],glowColor:"#ff4400",particleSize:()=>5+Math.random()*9,shape:"blob",trail:false,gravity:0.08,forceScale:1.0,emitRate:2,maxLife:160},
  ocean:{name:"🌊 OCEAN",emoji:"🌊",label:"Ocean",getColor:()=>`hsl(${200+Math.random()*40},${70+Math.random()*30}%,${40+Math.random()*30}%)`,bgGradient:["#000820","#000c30"],glowColor:"#4488ff",particleSize:()=>3+Math.random()*7,shape:"circle",trail:true,gravity:-0.015,forceScale:0.6,emitRate:3,maxLife:250},
  galaxy:{name:"🌌 GALAXY",emoji:"🌌",label:"Galaxy",getColor:(t,i)=>`hsl(${(t+(i||0)*7)%360},${50+Math.random()*50}%,${45+Math.random()*40}%)`,bgGradient:["#03000f","#06001a"],glowColor:"#aa44ff",particleSize:()=>1+Math.random()*4,shape:"star",trail:true,gravity:-0.005,forceScale:0.9,emitRate:5,maxLife:300},
  // ── NEW ABILITIES FROM VIDEO ──
  antigravity:{name:"🌀 ANTIGRAVITY",emoji:"🌀",label:"AntiGrav",getColor:(t)=>`hsl(${(t*5)%360},100%,65%)`,bgGradient:["#000510","#001025"],glowColor:"#44ffff",particleSize:()=>2+Math.random()*4,shape:"circle",trail:true,gravity:-0.06,forceScale:1.1,emitRate:5,maxLife:260},
  lightning:{name:"⚡ LIGHTNING",emoji:"🌩️",label:"Lightning",getColor:()=>["#ffffff","#aaddff","#ffff88","#88aaff"][Math.floor(Math.random()*4)],bgGradient:["#050510","#0a0820"],glowColor:"#aaddff",particleSize:()=>1+Math.random()*2,shape:"circle",trail:true,gravity:0.02,forceScale:2.0,emitRate:8,maxLife:80},
  vortex:{name:"🌪️ VORTEX",emoji:"🌪️",label:"Vortex",getColor:(t)=>`hsl(${(t*4+180)%360},80%,60%)`,bgGradient:["#080010","#100020"],glowColor:"#8844ff",particleSize:()=>2+Math.random()*5,shape:"circle",trail:true,gravity:0,forceScale:0,emitRate:5,maxLife:320,vortex:true},
  aurora:{name:"🌌 AURORA",emoji:"🎆",label:"Aurora",getColor:(t,i)=>`hsl(${(t*2+(i||0)*15)%360},100%,70%)`,bgGradient:["#000a08","#001510"],glowColor:"#00ffaa",particleSize:()=>3+Math.random()*8,shape:"circle",trail:true,gravity:-0.03,forceScale:0.5,emitRate:4,maxLife:350},
  plasma:{name:"⚛️ PLASMA",emoji:"⚛️",label:"Plasma",getColor:(t)=>`hsl(${(t*8)%360},100%,${60+Math.random()*25}%)`,bgGradient:["#080008","#120012"],glowColor:"#ff44ff",particleSize:()=>2+Math.random()*6,shape:"circle",trail:true,gravity:-0.01,forceScale:1.3,emitRate:5,maxLife:200},
  portal:{name:"🕳️ PORTAL",emoji:"🕳️",label:"Portal",getColor:(t)=>{const h=(t*6)%360;return`hsl(${h},100%,55%)`;},bgGradient:["#000008","#050015"],glowColor:"#6600ff",particleSize:()=>2+Math.random()*5,shape:"circle",trail:true,gravity:0,forceScale:0,emitRate:6,maxLife:280,portal:true},
};

const FC={sorcerer:"#cc88ff",timestone:"#00ff88",rainbow:"#ff88ff",cyberpunk:"#00ffff",lava:"#ff6600",ocean:"#4488ff",galaxy:"#aa44ff",antigravity:"#44ffff",lightning:"#aaddff",vortex:"#8844ff",aurora:"#00ffaa",plasma:"#ff44ff",portal:"#6600ff"};

const HAND_CONNECTIONS=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];

function detectGesture(lm){
  if(!lm||lm.length<21)return"open";
  const tips=[8,12,16,20],pips=[6,10,14,18];
  let ext=0;for(let i=0;i<4;i++)if(lm[tips[i]].y<lm[pips[i]].y)ext++;
  const dx=lm[4].x-lm[8].x,dy=lm[4].y-lm[8].y;
  if(Math.sqrt(dx*dx+dy*dy)<0.07)return"pinch";
  if(ext===0)return"fist";if(ext>=3)return"open";return"point";
}

// ─── Particle ─────────────────────────────────────────────────────────────────
let _pid=0;
class Particle{
  constructor(x,y,ability,idx=0,vxIn,vyIn){
    this.id=_pid++;this.ability=ability;
    const c=ABILITIES[ability];
    this.x=x;this.y=y;
    this.vx=vxIn!==undefined?vxIn:(Math.random()-0.5)*3;
    this.vy=vyIn!==undefined?vyIn:(Math.random()-0.5)*3-1;
    this.size=c.particleSize();this.baseSize=this.size;
    this.color=c.getColor(Date.now()*0.001,idx);
    this.age=0;this.maxLife=c.maxLife+Math.random()*80;this.life=1;
    this.rotation=Math.random()*Math.PI*2;
    this.rotSpeed=(Math.random()-0.5)*0.12;
    this.trail=c.trail?[]:null;this.trailMax=14;
    this.waveOffset=Math.random()*Math.PI*2;
    this.orbitAngle=Math.random()*Math.PI*2;
    this.orbitSpeed=(Math.random()-0.5)*0.04;
    this.orbitR=50+Math.random()*120;
  }
  update(W,H,sources,ts,frozen){
    this.age++;this.life=1-this.age/this.maxLife;
    if(this.life<=0)return false;
    const c=ABILITIES[this.ability];
    if(frozen){
      this.x+=Math.cos(this.age*0.015+this.waveOffset)*0.5;
      this.y+=Math.sin(this.age*0.015+this.waveOffset)*0.5;
      if(this.trail){this.trail.unshift({x:this.x,y:this.y});if(this.trail.length>this.trailMax)this.trail.pop();}
      return true;
    }
    // Portal: orbit around center
    if(c.portal){
      this.orbitAngle+=this.orbitSpeed;
      const cx=W/2,cy=H/2;
      const tx=cx+Math.cos(this.orbitAngle)*this.orbitR*(0.5+this.age/this.maxLife*0.5);
      const ty=cy+Math.sin(this.orbitAngle)*this.orbitR*(0.5+this.age/this.maxLife*0.5);
      this.vx+=(tx-this.x)*0.04;this.vy+=(ty-this.y)*0.04;
    }
    // Vortex: spiral around source
    if(c.vortex&&sources.length>0){
      const s=sources[0];
      const dx=this.x-s.x,dy=this.y-s.y,dist=Math.sqrt(dx*dx+dy*dy)+1;
      this.vx+=(-dy/dist)*1.5-dx/dist*0.3;this.vy+=(dx/dist)*1.5-dy/dist*0.3;
    }
    for(const s of sources){
      if(c.vortex)break;
      const dx=s.x-this.x,dy=s.y-this.y,dist=Math.sqrt(dx*dx+dy*dy)+1;
      const fm=(c.forceScale*1000)/(dist*dist+120);
      const dir=s.gesture==="fist"?-1:1;
      this.vx+=(dx/dist)*fm*dir*0.25;this.vy+=(dy/dist)*fm*dir*0.25;
    }
    if(sources.length===0&&!c.portal&&!c.vortex)this.vy-=0.01;
    this.vy+=c.gravity;
    if(this.ability==="ocean"){this.vx+=Math.sin(ts*0.002+this.waveOffset)*0.07;this.vy+=Math.cos(ts*0.002+this.waveOffset)*0.035;}
    if(this.ability==="galaxy"){const ax=W/2-this.x,ay=H/2-this.y,ad=Math.sqrt(ax*ax+ay*ay)+1;this.vx+=(ax/ad)*0.012;this.vy+=(ay/ad)*0.012;}
    if(this.ability==="antigravity"){this.vy-=0.04;this.vx+=Math.sin(ts*0.003+this.waveOffset)*0.05;}
    if(this.ability==="aurora"){this.vx+=Math.sin(ts*0.001+this.waveOffset)*0.08;this.vy+=Math.cos(ts*0.0015+this.id*0.01)*0.04;}
    if(this.ability==="lightning"){this.vx+=(Math.random()-0.5)*0.8;this.vy+=(Math.random()-0.5)*0.8;}
    if(this.ability==="plasma"){this.vx+=Math.cos(ts*0.004+this.waveOffset)*0.06;this.vy+=Math.sin(ts*0.003+this.id*0.02)*0.06;}
    this.vx*=0.97;this.vy*=0.97;
    this.x+=this.vx;this.y+=this.vy;
    this.rotation+=this.rotSpeed;
    if(this.x<0){this.x=0;this.vx*=-0.6;}if(this.x>W){this.x=W;this.vx*=-0.6;}
    if(this.y<0){this.y=0;this.vy*=-0.6;}if(this.y>H){this.y=H;this.vy*=-0.6;}
    if(this.ability==="rainbow")this.color=c.getColor(ts*0.001,this.id);
    if(this.ability==="galaxy")this.color=c.getColor(ts*0.0004,this.id);
    if(this.ability==="sorcerer")this.color=c.getColor(ts*0.002+this.id*0.01);
    if(this.ability==="antigravity")this.color=c.getColor(ts*0.003+this.id*0.005);
    if(this.ability==="plasma")this.color=c.getColor(ts*0.005);
    if(this.ability==="aurora")this.color=c.getColor(ts*0.0008,this.id);
    if(this.ability==="portal")this.color=c.getColor(ts*0.004);
    if(this.ability==="lava")this.size=this.baseSize*(0.8+Math.sin(ts*0.01+this.waveOffset)*0.3);
    if(this.trail){this.trail.unshift({x:this.x,y:this.y});if(this.trail.length>this.trailMax)this.trail.pop();}
    return true;
  }
  draw(ctx,ts,arMode){
    const c=ABILITIES[this.ability];
    ctx.save();
    ctx.globalAlpha=Math.min(1,this.life*1.5)*(arMode?1.0:0.9);
    if(this.trail&&this.trail.length>1){
      ctx.beginPath();ctx.moveTo(this.trail[0].x,this.trail[0].y);
      for(let i=1;i<this.trail.length;i++)ctx.lineTo(this.trail[i].x,this.trail[i].y);
      ctx.strokeStyle=this.color;ctx.lineWidth=this.size*0.4;
      const a=ctx.globalAlpha;ctx.globalAlpha*=0.22;ctx.stroke();ctx.globalAlpha=a;
    }
    ctx.shadowColor=c.glowColor;ctx.shadowBlur=this.size*(arMode?5:4);
    ctx.translate(this.x,this.y);ctx.rotate(this.rotation);
    ctx.fillStyle=this.color;
    if(c.shape==="square"){ctx.fillRect(-this.size/2,-this.size/2,this.size,this.size);}
    else if(c.shape==="star"){drawStar(ctx,0,0,5,this.size,this.size*0.45);}
    else if(c.shape==="blob"){
      ctx.beginPath();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2,r=this.size*(0.7+Math.sin(ts*0.02+this.waveOffset+i)*0.3);if(i===0)ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r);else ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();
    }else{ctx.beginPath();ctx.arc(0,0,this.size,0,Math.PI*2);ctx.fill();}
    ctx.restore();
  }
}

function drawStar(ctx,cx,cy,sp,oR,iR){let rot=(Math.PI/2)*3;const step=Math.PI/sp;ctx.beginPath();ctx.moveTo(cx,cy-oR);for(let i=0;i<sp;i++){ctx.lineTo(cx+Math.cos(rot)*oR,cy+Math.sin(rot)*oR);rot+=step;ctx.lineTo(cx+Math.cos(rot)*iR,cy+Math.sin(rot)*iR);rot+=step;}ctx.lineTo(cx,cy-oR);ctx.closePath();ctx.fill();}

// ─── Floating Stars (like in video) ──────────────────────────────────────────
class FloatStar{
  constructor(W,H){
    this.reset(W,H);this.y=Math.random()*H;this.life=Math.random();
  }
  reset(W,H){
    this.x=Math.random()*W;this.y=-10;
    this.vx=(Math.random()-0.5)*0.4;this.vy=0.3+Math.random()*0.5;
    this.size=1.5+Math.random()*3;
    this.color=`hsl(${Math.random()*360},100%,70%)`;
    this.life=1;this.maxLife=300+Math.random()*200;this.age=0;
    this.twinkle=Math.random()*Math.PI*2;
  }
  update(W,H){
    this.age++;this.life=1-this.age/this.maxLife;
    this.twinkle+=0.08;
    this.x+=this.vx;this.y+=this.vy;
    if(this.y>H+10||this.life<=0)this.reset(W,H);
  }
  draw(ctx){
    ctx.save();
    ctx.globalAlpha=(0.5+Math.sin(this.twinkle)*0.5)*this.life;
    ctx.fillStyle=this.color;ctx.shadowColor=this.color;ctx.shadowBlur=this.size*3;
    ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
}

// ─── Wireframe Spinning Globe (from video!) ───────────────────────────────────
class WireGlobe{
  constructor(){
    this.rotX=0;this.rotY=0;this.rotZ=0;
    this.visible=false;this.x=0;this.y=0;this.radius=80;
    this.opacity=0;this.targetOpacity=0;
    this.color="#00ff88";this.glowColor="#00ff88";
  }
  show(x,y,color,glow){this.x=x;this.y=y;this.targetOpacity=1;this.color=color||"#00ff88";this.glowColor=glow||"#00ff88";}
  hide(){this.targetOpacity=0;}
  update(){
    this.rotX+=0.012;this.rotY+=0.018;this.rotZ+=0.006;
    this.opacity+=(this.targetOpacity-this.opacity)*0.06;
  }
  draw(ctx){
    if(this.opacity<0.01)return;
    const{x,y,radius:R,rotX,rotY,rotZ}=this;
    const project=(px,py,pz)=>{
      // Rotate around Y
      let rx=px*Math.cos(rotY)-pz*Math.sin(rotY);
      let rz=px*Math.sin(rotY)+pz*Math.cos(rotY);
      // Rotate around X
      let ry=py*Math.cos(rotX)-rz*Math.sin(rotX);
      rz=py*Math.sin(rotX)+rz*Math.cos(rotX);
      // Rotate around Z
      const finalX=rx*Math.cos(rotZ)-ry*Math.sin(rotZ);
      const finalY=rx*Math.sin(rotZ)+ry*Math.cos(rotZ);
      return{sx:x+finalX,sy:y+finalY,z:rz};
    };
    ctx.save();
    ctx.globalAlpha=this.opacity*0.85;
    ctx.strokeStyle=this.color;ctx.shadowColor=this.glowColor;ctx.shadowBlur=18;
    // Latitude lines
    const latLines=10,lonLines=12,pts=40;
    for(let li=0;li<=latLines;li++){
      const lat=((li/latLines)-0.5)*Math.PI;
      ctx.beginPath();ctx.lineWidth=li===latLines/2?1.5:0.8;
      for(let i=0;i<=pts;i++){
        const lon=(i/pts)*Math.PI*2;
        const px=R*Math.cos(lat)*Math.cos(lon);
        const py=R*Math.sin(lat);
        const pz=R*Math.cos(lat)*Math.sin(lon);
        const{sx,sy,z}=project(px,py,pz);
        const alpha=Math.max(0,(z/R+1)/2);
        ctx.globalAlpha=this.opacity*alpha*0.9;
        if(i===0)ctx.moveTo(sx,sy);else ctx.lineTo(sx,sy);
      }
      ctx.stroke();
    }
    // Longitude lines
    ctx.globalAlpha=this.opacity*0.85;
    for(let lo=0;lo<lonLines;lo++){
      const lon=(lo/lonLines)*Math.PI*2;
      ctx.beginPath();ctx.lineWidth=0.8;
      for(let i=0;i<=pts;i++){
        const lat=((i/pts)-0.5)*Math.PI*2;
        const px=R*Math.cos(lat)*Math.cos(lon);
        const py=R*Math.sin(lat);
        const pz=R*Math.cos(lat)*Math.sin(lon);
        const{sx,sy,z}=project(px,py,pz);
        const alpha=Math.max(0,(z/R+1)/2);
        ctx.globalAlpha=this.opacity*alpha*0.9;
        if(i===0)ctx.moveTo(sx,sy);else ctx.lineTo(sx,sy);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
}

// ─── Hand Connector Beam (the neon line between hands from video) ─────────────
function drawHandConnector(ctx,h1,h2,ability,ts){
  const cfg=ABILITIES[ability];
  const color=FC[ability]||"#00ff88";
  const dx=h2.x-h1.x,dy=h2.y-h1.y;
  const dist=Math.sqrt(dx*dx+dy*dy);
  if(dist<10)return;
  ctx.save();
  // Main beam
  ctx.shadowColor=color;ctx.shadowBlur=20;
  ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.globalAlpha=0.8;
  ctx.beginPath();ctx.moveTo(h1.x,h1.y);
  // Wavy beam (like in video)
  const steps=30;
  for(let i=1;i<=steps;i++){
    const t=i/steps;
    const mx=h1.x+dx*t;
    const my=h1.y+dy*t;
    const perp={x:-dy/dist,y:dx/dist};
    const wave=Math.sin(ts*0.008+t*Math.PI*4)*6*(1-Math.abs(t-0.5)*2);
    ctx.lineTo(mx+perp.x*wave,my+perp.y*wave);
  }
  ctx.stroke();
  // Inner bright core
  ctx.strokeStyle="#ffffff";ctx.lineWidth=0.8;ctx.globalAlpha=0.5;ctx.shadowBlur=5;
  ctx.beginPath();ctx.moveTo(h1.x,h1.y);
  for(let i=1;i<=steps;i++){
    const t=i/steps;const mx=h1.x+dx*t;const my=h1.y+dy*t;
    const perp={x:-dy/dist,y:dx/dist};
    const wave=Math.sin(ts*0.008+t*Math.PI*4)*6*(1-Math.abs(t-0.5)*2);
    ctx.lineTo(mx+perp.x*wave,my+perp.y*wave);
  }
  ctx.stroke();
  // Particles along beam
  const nBeamParticles=8;
  for(let i=0;i<nBeamParticles;i++){
    const t=((ts*0.001+i/nBeamParticles)%1);
    const bx=h1.x+dx*t,by=h1.y+dy*t;
    const perp={x:-dy/dist,y:dx/dist};
    const wave=Math.sin(ts*0.008+t*Math.PI*4)*6*(1-Math.abs(t-0.5)*2);
    ctx.save();ctx.globalAlpha=0.9;ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=12;
    ctx.beginPath();ctx.arc(bx+perp.x*wave,by+perp.y*wave,3,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  ctx.restore();
}

// ─── Lightning bolt between two points ───────────────────────────────────────
function drawLightningBolt(ctx,x1,y1,x2,y2,color,ts){
  const dx=x2-x1,dy=y2-y1;const steps=20;
  ctx.save();ctx.strokeStyle=color||"#aaddff";ctx.lineWidth=1.5;ctx.globalAlpha=0.7;
  ctx.shadowColor=color||"#aaddff";ctx.shadowBlur=15;
  ctx.beginPath();ctx.moveTo(x1,y1);
  for(let i=1;i<steps;i++){
    const t=i/steps;
    const jitter=(Math.random()-0.5)*20*(1-Math.abs(t-0.5)*2);
    const perp={x:-dy/Math.sqrt(dx*dx+dy*dy),y:dx/Math.sqrt(dx*dx+dy*dy)};
    ctx.lineTo(x1+dx*t+perp.x*jitter,y1+dy*t+perp.y*jitter);
  }
  ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();
}

// ─── Audio ────────────────────────────────────────────────────────────────────
class AudioEngine{
  constructor(){this.ctx=null;this.master=null;this.enabled=true;}
  init(){if(this.ctx)return;try{this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.master=this.ctx.createGain();this.master.gain.value=0.22;this.master.connect(this.ctx.destination);}catch(e){}}
  resume(){this.ctx?.state==="suspended"&&this.ctx.resume();}
  play(freq,type="sine",dur=0.15,vol=0.07){if(!this.ctx||!this.enabled)return;try{this.resume();const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.value=freq;o.frequency.exponentialRampToValueAtTime(freq*0.4,this.ctx.currentTime+dur);g.gain.setValueAtTime(vol,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+dur);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+dur);}catch(e){}}
  abilitySound(a){({sorcerer:()=>this.play(250+Math.random()*350,"sawtooth",0.2,0.03),timestone:()=>this.play(180+Math.random()*80,"sine",0.5,0.035),rainbow:()=>this.play(350+Math.random()*500,"sine",0.1,0.02),cyberpunk:()=>this.play(900+Math.random()*700,"square",0.05,0.02),lava:()=>this.play(60+Math.random()*60,"sawtooth",0.35,0.055),ocean:()=>this.play(220+Math.random()*180,"sine",0.6,0.02),galaxy:()=>this.play(120+Math.random()*400,"triangle",0.4,0.025),antigravity:()=>this.play(400+Math.random()*300,"sine",0.15,0.025),lightning:()=>this.play(1200+Math.random()*800,"square",0.04,0.015),vortex:()=>this.play(200+Math.random()*150,"sawtooth",0.2,0.02),aurora:()=>this.play(300+Math.random()*200,"sine",0.4,0.02),plasma:()=>this.play(600+Math.random()*400,"triangle",0.12,0.02),portal:()=>this.play(150+Math.random()*100,"sine",0.5,0.03)})[a]?.();}
  select(){this.play(330,"triangle",0.4,0.1);}
  burst(){this.play(440,"triangle",0.3,0.12);}
  clear(){this.play(80,"sawtooth",0.4,0.14);}
  arOn(){this.play(528,"sine",0.6,0.12);setTimeout(()=>this.play(660,"sine",0.4,0.08),200);}
  arOff(){this.play(200,"triangle",0.4,0.1);}
}
const audio=new AudioEngine();
function hexToRgb(hex){if(!hex||hex.length<7)return"128,128,128";return`${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;}

// ═══════════════════════════════════════════════════════════════════════════════
export default function ArcaneForge(){
  const canvasRef   =useRef(null);
  const arVideoRef  =useRef(null);
  const mpVideoRef  =useRef(null);
  const previewRef  =useRef(null);
  const overlayRef  =useRef(null);
  const particlesRef=useRef([]);
  const rafRef      =useRef(null);
  const handsRef    =useRef([]);
  const mouseRef    =useRef({x:-999,y:-999,gesture:"open",active:false});
  const starsRef    =useRef([]);
  const floatStarsRef=useRef([]);
  const globeRef    =useRef(new WireGlobe());
  const emitTimer   =useRef(0);
  const soundTimer  =useRef(0);
  const pinchCool   =useRef({});
  const abilityRef  =useRef("sorcerer");
  const arModeRef   =useRef(false);
  const mpRef       =useRef(null);
  const camRef      =useRef(null);
  const arStreamRef =useRef(null);
  const fpsRef      =useRef({frames:0,last:0});
  const globeTimerRef=useRef(0);
  const lightningRef=useRef({bolts:[],timer:0});

  const [ability,setAbility]         =useState("sorcerer");
  const [soundOn,setSoundOn]         =useState(true);
  const [showInfo,setShowInfo]       =useState(false);
  const [abilityFlash,setAbilityFlash]=useState(null);
  const [camStatus,setCamStatus]     =useState("idle");
  const [arMode,setArMode]           =useState(false);
  const [arStatus,setArStatus]       =useState("off");
  const [fps,setFps]                 =useState(0);
  const [pCount,setPCount]           =useState(0);
  const [gestLines,setGestLines]     =useState([]);
  const [showGlobe,setShowGlobe]     =useState(false);

  useEffect(()=>{abilityRef.current=ability;},[ability]);
  useEffect(()=>{audio.enabled=soundOn;},[soundOn]);
  useEffect(()=>{arModeRef.current=arMode;},[arMode]);

  // Resize + stars
  useEffect(()=>{
    const resize=()=>{
      const c=canvasRef.current;if(!c)return;
      c.width=window.innerWidth;c.height=window.innerHeight;
      starsRef.current=Array.from({length:220},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.5,tw:Math.random()*Math.PI*2,spd:0.015+Math.random()*0.03}));
      floatStarsRef.current=Array.from({length:60},()=>new FloatStar(c.width,c.height));
    };
    resize();window.addEventListener("resize",resize);return()=>window.removeEventListener("resize",resize);
  },[]);

  // Mouse/touch
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;
    const mv=(x,y)=>{mouseRef.current.x=x;mouseRef.current.y=y;mouseRef.current.active=true;};
    const mm=e=>mv(e.clientX,e.clientY);
    const mt=e=>{if(e.touches.length>0){e.preventDefault();mv(e.touches[0].clientX,e.touches[0].clientY);}};
    const dn=()=>{mouseRef.current.gesture="fist";};const up=()=>{mouseRef.current.gesture="open";};
    c.addEventListener("mousemove",mm);c.addEventListener("mousedown",dn);c.addEventListener("mouseup",up);
    c.addEventListener("touchmove",mt,{passive:false});c.addEventListener("touchstart",e=>{mt(e);dn();},{passive:false});c.addEventListener("touchend",up);
    return()=>{c.removeEventListener("mousemove",mm);c.removeEventListener("mousedown",dn);c.removeEventListener("mouseup",up);c.removeEventListener("touchmove",mt);c.removeEventListener("touchstart",dn);c.removeEventListener("touchend",up);};
  },[]);

  // Double-click burst
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;
    let last=0;
    const burst=(x,y)=>{audio.burst();for(let i=0;i<16;i++){if(particlesRef.current.length>=500)break;const a=(i/16)*Math.PI*2;const p=new Particle(x+Math.cos(a)*30,y+Math.sin(a)*30,abilityRef.current,i,Math.cos(a)*5,Math.sin(a)*5);particlesRef.current.push(p);}};
    const dbl=e=>burst(e.clientX,e.clientY);
    const tap=e=>{const now=Date.now();if(now-last<300&&e.touches.length>0)burst(e.touches[0].clientX,e.touches[0].clientY);last=now;};
    c.addEventListener("dblclick",dbl);c.addEventListener("touchstart",tap,{passive:true});
    return()=>{c.removeEventListener("dblclick",dbl);c.removeEventListener("touchstart",tap);};
  },[]);

  // Pinch burst
  useEffect(()=>{
    const iv=setInterval(()=>{for(const h of handsRef.current){if(h.gesture==="pinch"){const now=Date.now(),key=h.label;if(!pinchCool.current[key]||now-pinchCool.current[key]>350){pinchCool.current[key]=now;audio.burst();for(let i=0;i<12;i++){if(particlesRef.current.length>=500)break;const a=(i/12)*Math.PI*2;const p=new Particle(h.x+Math.cos(a)*25,h.y+Math.sin(a)*25,abilityRef.current,i,Math.cos(a)*4,Math.sin(a)*4);particlesRef.current.push(p);}}}}},50);
    return()=>clearInterval(iv);
  },[]);

  const loadScript=useCallback((src)=>new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`)){res();return;}const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);}),[]);

  const startCamera=useCallback(async()=>{
    setCamStatus("requesting");audio.init();audio.resume();
    let stream;
    try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:640},height:{ideal:480}},audio:false});}
    catch(e){setCamStatus("denied");return;}
    const video=mpVideoRef.current;video.srcObject=stream;await new Promise(res=>{video.onloadedmetadata=res;});await video.play();
    if(previewRef.current)previewRef.current.srcObject=stream;
    setCamStatus("loading");
    try{await Promise.all([loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.js"),loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1640029074/camera_utils.js"),loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1620248257/drawing_utils.js")]);}
    catch(e){setCamStatus("error");return;}
    if(typeof window.Hands==="undefined"){setCamStatus("error");return;}
    const hands=new window.Hands({locateFile:f=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${f}`});
    hands.setOptions({maxNumHands:2,modelComplexity:1,minDetectionConfidence:0.7,minTrackingConfidence:0.5});
    const overlay=overlayRef.current;const octx=overlay.getContext("2d");
    hands.onResults(results=>{
      octx.clearRect(0,0,overlay.width,overlay.height);handsRef.current=[];
      if(!results.multiHandLandmarks||results.multiHandLandmarks.length===0){setGestLines([]);return;}
      for(let i=0;i<results.multiHandLandmarks.length;i++){
        const lm=results.multiHandLandmarks[i];const handed=results.multiHandedness?.[i];
        const gesture=detectGesture(lm);const label=handed?.label||"Right";
        const W=window.innerWidth,H=window.innerHeight;
        const sx=(1-lm[9].x)*W,sy=lm[9].y*H;
        handsRef.current.push({x:sx,y:sy,gesture,label,lm});
        const ow=overlay.width,oh=overlay.height;
        const gc=gesture==="fist"?"#ff4444":gesture==="pinch"?"#ffff00":gesture==="point"?"#ff8800":"#00ffff";
        octx.strokeStyle=gc;octx.lineWidth=1.5;
        for(const[a,b]of HAND_CONNECTIONS){octx.beginPath();octx.moveTo((1-lm[a].x)*ow,lm[a].y*oh);octx.lineTo((1-lm[b].x)*ow,lm[b].y*oh);octx.stroke();}
        for(const pt of lm){octx.beginPath();octx.arc((1-pt.x)*ow,pt.y*oh,2.5,0,Math.PI*2);octx.fillStyle="#fff";octx.fill();}
      }
      setGestLines(handsRef.current.map(h=>{const g=h.gesture==="open"?"🖐 ATTRACT":h.gesture==="fist"?"✊ REPEL":h.gesture==="pinch"?"🤏 BURST":"👆 POINT";return`${h.label}: ${g}`;}));
    });
    mpRef.current=hands;
    const mpCam=new window.Camera(video,{onFrame:async()=>{await hands.send({image:video});},width:640,height:480});
    mpCam.start();camRef.current=mpCam;setCamStatus("active");
  },[loadScript]);

  const stopCamera=useCallback(()=>{
    camRef.current?.stop?.();const v=mpVideoRef.current;
    if(v?.srcObject){v.srcObject.getTracks().forEach(t=>t.stop());v.srcObject=null;}
    if(previewRef.current)previewRef.current.srcObject=null;
    handsRef.current=[];mpRef.current=null;setCamStatus("idle");setGestLines([]);
  },[]);

  const startAR=useCallback(async()=>{
    setArStatus("starting");audio.init();audio.resume();
    let stream;
    try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}},audio:false}).catch(()=>navigator.mediaDevices.getUserMedia({video:true,audio:false}));}
    catch(e){setArStatus("error");return;}
    arStreamRef.current=stream;const v=arVideoRef.current;v.srcObject=stream;
    await new Promise(res=>{v.onloadedmetadata=res;});await v.play();
    setArMode(true);setArStatus("active");audio.arOn();
  },[]);

  const stopAR=useCallback(()=>{
    if(arStreamRef.current){arStreamRef.current.getTracks().forEach(t=>t.stop());arStreamRef.current=null;}
    const v=arVideoRef.current;if(v)v.srcObject=null;
    setArMode(false);setArStatus("off");audio.arOff();
  },[]);

  const toggleAR=useCallback(()=>{if(arMode)stopAR();else startAR();},[arMode,startAR,stopAR]);

  // ── Main render loop ──────────────────────────────────────────────────────
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    audio.init();let lastPc=0;

    const loop=ts=>{
      rafRef.current=requestAnimationFrame(loop);
      const W=canvas.width,H=canvas.height;
      const ab=abilityRef.current;const cfg=ABILITIES[ab];
      const frozen=cfg.freeze===true;const isAR=arModeRef.current;

      fpsRef.current.frames++;
      if(ts-fpsRef.current.last>800){setFps(Math.round(fpsRef.current.frames/((ts-fpsRef.current.last)/1000)));fpsRef.current={frames:0,last:ts};}

      const handSrc=handsRef.current;const m=mouseRef.current;
      const sources=handSrc.length>0?handSrc:(m.active?[m]:[]);

      // ── Background ──────────────────────────────────────────────────────
      if(isAR){
        ctx.clearRect(0,0,W,H);
        const vign=ctx.createRadialGradient(W/2,H/2,W*0.35,W/2,H/2,W*0.75);
        vign.addColorStop(0,"rgba(0,0,0,0)");vign.addColorStop(1,"rgba(0,0,0,0.3)");
        ctx.fillStyle=vign;ctx.fillRect(0,0,W,H);
      }else{
        const gr=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.8);
        gr.addColorStop(0,cfg.bgGradient[0]);gr.addColorStop(1,cfg.bgGradient[1]);
        ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
        // Stars
        for(const s of starsRef.current){s.tw+=s.spd;ctx.save();ctx.globalAlpha=0.15+Math.abs(Math.sin(s.tw))*0.5;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();ctx.restore();}
        // Ability ambient
        if(ab==="cyberpunk"&&Math.random()<0.015){ctx.save();ctx.strokeStyle="#00ffff";ctx.lineWidth=0.5;ctx.globalAlpha=0.055;for(let gx=0;gx<W;gx+=45){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}for(let gy=0;gy<H;gy+=45){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}ctx.restore();}
        if(ab==="galaxy"){ctx.save();ctx.globalAlpha=0.035;const cg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.4);cg.addColorStop(0,"#aa44ff");cg.addColorStop(1,"transparent");ctx.fillStyle=cg;ctx.beginPath();ctx.arc(W/2,H/2,W*0.4,0,Math.PI*2);ctx.fill();ctx.restore();}
        if(ab==="ocean"){ctx.save();ctx.globalAlpha=0.035;for(let wi=0;wi<4;wi++){ctx.strokeStyle="#4488ff";ctx.lineWidth=1;ctx.beginPath();for(let wx=0;wx<=W;wx+=10){const wy=H*0.3+wi*45+Math.sin(wx*0.015+ts*0.002+wi)*18;if(wx===0)ctx.moveTo(wx,wy);else ctx.lineTo(wx,wy);}ctx.stroke();}ctx.restore();}
        if(ab==="lava"){ctx.save();const lg=ctx.createLinearGradient(0,H*0.85,0,H);lg.addColorStop(0,"rgba(255,80,0,0.1)");lg.addColorStop(1,"rgba(200,40,0,0.22)");ctx.fillStyle=lg;ctx.fillRect(0,H*0.85,W,H*0.15);ctx.restore();}
        // NEW: Vortex background spiral
        if(ab==="vortex"){
          ctx.save();ctx.globalAlpha=0.05;
          for(let si=0;si<3;si++){
            ctx.strokeStyle=`hsl(${(ts*0.1+si*120)%360},80%,60%)`;ctx.lineWidth=1;ctx.beginPath();
            for(let a=0;a<Math.PI*6;a+=0.1){const r=(a/(Math.PI*6))*Math.min(W,H)*0.4;ctx.lineTo(W/2+Math.cos(a+ts*0.001+si*2)*r,H/2+Math.sin(a+ts*0.001+si*2)*r);}
            ctx.stroke();
          }ctx.restore();
        }
        // NEW: Aurora waves
        if(ab==="aurora"){
          ctx.save();
          for(let ai=0;ai<5;ai++){
            const gy=ctx.createLinearGradient(0,0,0,H*0.5);
            gy.addColorStop(0,`hsla(${(ts*0.05+ai*60)%360},100%,60%,0)`);
            gy.addColorStop(0.4,`hsla(${(ts*0.05+ai*60)%360},100%,60%,0.08)`);
            gy.addColorStop(1,`hsla(${(ts*0.05+ai*60)%360},100%,60%,0)`);
            ctx.fillStyle=gy;ctx.fillRect(0,ai*(H/5),W,H/5);
          }ctx.restore();
        }
        // NEW: Portal ring
        if(ab==="portal"){
          ctx.save();ctx.globalAlpha=0.08;
          const pr=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.min(W,H)*0.3);
          pr.addColorStop(0,`hsl(${(ts*0.05)%360},100%,60%)`);pr.addColorStop(0.5,"rgba(0,0,0,0)");pr.addColorStop(0.8,`hsl(${(ts*0.05+180)%360},100%,50%)`);pr.addColorStop(1,"rgba(0,0,0,0)");
          ctx.fillStyle=pr;ctx.beginPath();ctx.arc(W/2,H/2,Math.min(W,H)*0.35,0,Math.PI*2);ctx.fill();ctx.restore();
        }
        // NEW: Plasma field
        if(ab==="plasma"){
          ctx.save();ctx.globalAlpha=0.04;
          for(let pi=0;pi<6;pi++){
            const px=W*0.2+Math.sin(ts*0.001+pi*1.2)*W*0.3,py=H*0.2+Math.cos(ts*0.0015+pi*0.8)*H*0.3;
            const pg=ctx.createRadialGradient(px,py,0,px,py,150);
            pg.addColorStop(0,`hsl(${(ts*0.05+pi*60)%360},100%,65%)`);pg.addColorStop(1,"transparent");
            ctx.fillStyle=pg;ctx.beginPath();ctx.arc(px,py,150,0,Math.PI*2);ctx.fill();
          }ctx.restore();
        }
      }

      // ── Floating color stars (like in video) ─────────────────────────────
      if(isAR||ab==="antigravity"||ab==="galaxy"||ab==="rainbow"){
        const W2=canvas.width,H2=canvas.height;
        for(const fs of floatStarsRef.current){fs.update(W2,H2);fs.draw(ctx);}
      }

      // ── Hand connector beam (video feature!) ─────────────────────────────
      if(handSrc.length>=2){
        drawHandConnector(ctx,handSrc[0],handSrc[1],ab,ts);
      }else if(handSrc.length===1&&m.active){
        // Single hand to mouse line
        drawHandConnector(ctx,handSrc[0],m,ab,ts);
      }

      // ── Lightning ability: bolts between sources ──────────────────────────
      if(ab==="lightning"&&sources.length>=2){
        lightningRef.current.timer++;
        if(lightningRef.current.timer%3===0){
          drawLightningBolt(ctx,sources[0].x,sources[0].y,sources[1].x,sources[1].y,FC.lightning,ts);
        }
      }

      // ── Spinning globe (fist gesture with 2 hands, or G key) ─────────────
      const globe=globeRef.current;
      if(handSrc.length>=2&&handSrc[0].gesture==="fist"&&handSrc[1].gesture==="fist"){
        const mx=(handSrc[0].x+handSrc[1].x)/2,my=(handSrc[0].y+handSrc[1].y)/2;
        globe.show(mx,my,FC[ab],FC[ab]);
      }else if(showGlobe){
        const src=sources[0]||{x:W/2,y:H/2};
        globe.show(src.x,src.y,FC[ab],FC[ab]);
      }else{globe.hide();}
      globe.update();globe.draw(ctx);

      // ── Emit particles ───────────────────────────────────────────────────
      emitTimer.current++;
      const every=Math.max(1,Math.round(10/cfg.emitRate));
      if(emitTimer.current%every===0&&particlesRef.current.length<500){
        const srcs=sources.length>0?sources:[{x:W/2,y:H/2,gesture:"open"}];
        for(const src of srcs){
          if(particlesRef.current.length>=500)break;
          const p=new Particle(src.x+(Math.random()-0.5)*18,src.y+(Math.random()-0.5)*18,ab,particlesRef.current.length);
          if(src.gesture==="fist"){p.vx=(Math.random()-0.5)*5;p.vy=(Math.random()-0.5)*5;}
          particlesRef.current.push(p);
          soundTimer.current++;if(soundTimer.current%9===0)audio.abilitySound(ab);
        }
      }

      // ── Update + draw particles ──────────────────────────────────────────
      particlesRef.current=particlesRef.current.filter(p=>{const alive=p.update(W,H,sources,ts,frozen);if(alive)p.draw(ctx,ts,isAR);return alive;});

      // ── Cursor/hand orbs ─────────────────────────────────────────────────
      for(const src of sources){
        const gc=src.gesture==="fist"?"#ff4444":src.gesture==="pinch"?"#ffff00":FC[ab];
        const os=src.gesture==="fist"?22:16;
        ctx.save();ctx.shadowColor=gc;ctx.shadowBlur=isAR?50:35;
        ctx.strokeStyle=gc;ctx.lineWidth=2;ctx.globalAlpha=0.8;
        ctx.beginPath();ctx.arc(src.x,src.y,os+Math.sin(ts*0.005)*4,0,Math.PI*2);ctx.stroke();
        ctx.globalAlpha=0.95;ctx.fillStyle=gc;ctx.beginPath();ctx.arc(src.x,src.y,4,0,Math.PI*2);ctx.fill();
        ctx.globalAlpha=0.22;ctx.save();ctx.translate(src.x,src.y);ctx.rotate(ts*0.004);ctx.beginPath();ctx.arc(0,0,os+12,0,Math.PI*1.3);ctx.stroke();ctx.restore();
        ctx.restore();
      }

      // ── AR mode overlays ─────────────────────────────────────────────────
      if(isAR){
        const scanY=(ts*0.08)%H;
        const sg=ctx.createLinearGradient(0,scanY-40,0,scanY+40);
        sg.addColorStop(0,"rgba(0,255,180,0)");sg.addColorStop(0.5,`rgba(${hexToRgb(FC[ab])},0.05)`);sg.addColorStop(1,"rgba(0,255,180,0)");
        ctx.fillStyle=sg;ctx.fillRect(0,scanY-40,W,80);
        const bs=32;const corners=[[0,0,1,1],[W,0,-1,1],[0,H,1,-1],[W,H,-1,-1]];
        ctx.strokeStyle=FC[ab];ctx.lineWidth=2;ctx.globalAlpha=0.7;ctx.shadowColor=FC[ab];ctx.shadowBlur=10;
        for(const[cx2,cy2,sx2,sy2]of corners){ctx.save();ctx.translate(cx2,cy2);ctx.beginPath();ctx.moveTo(sx2*bs,0);ctx.lineTo(0,0);ctx.lineTo(0,sy2*bs);ctx.stroke();ctx.restore();}
        ctx.save();ctx.globalAlpha=0.55;ctx.fillStyle=FC[ab];ctx.shadowBlur=8;ctx.shadowColor=FC[ab];ctx.font="bold 10px 'Courier New'";ctx.fillText("◉ AR MODE",10,H-10);ctx.restore();
        // Float stars always in AR
        const W3=canvas.width,H3=canvas.height;
        for(const fs of floatStarsRef.current){fs.update(W3,H3);fs.draw(ctx);}
      }

      if(ts-lastPc>600){setPCount(particlesRef.current.length);lastPc=ts;}
    };
    rafRef.current=requestAnimationFrame(loop);
    return()=>cancelAnimationFrame(rafRef.current);
  },[showGlobe]);

  // Keyboard: G = toggle globe
  useEffect(()=>{
    const kd=e=>{if(e.key==="g"||e.key==="G")setShowGlobe(s=>!s);};
    window.addEventListener("keydown",kd);return()=>window.removeEventListener("keydown",kd);
  },[]);

  const selectAbility=ab=>{
    setAbility(ab);abilityRef.current=ab;
    setAbilityFlash(ABILITIES[ab].name);
    audio.resume();audio.select();
    setTimeout(()=>setAbilityFlash(null),1900);
  };

  const fc=FC[ability];
  const btnBase={width:40,height:40,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,transition:"all 0.2s",color:"white",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.12)",background:"rgba(0,0,0,0.5)"};

  // Split abilities into rows for the bar
  const abilityEntries=Object.entries(ABILITIES);

  return(
    <div style={{width:"100vw",height:"100vh",overflow:"hidden",background:"#000",position:"relative",fontFamily:"'Courier New',monospace"}}>
      <video ref={arVideoRef} playsInline muted autoPlay style={{position:"fixed",inset:0,width:"100%",height:"100%",objectFit:"cover",display:arMode?"block":"none",transform:"none",zIndex:0}}/>
      <canvas ref={canvasRef} style={{display:"block",width:"100%",height:"100%",cursor:"crosshair",position:"relative",zIndex:1,background:"transparent"}}/>
      <video ref={mpVideoRef} playsInline muted style={{display:"none"}}/>

      {/* Hand cam preview */}
      {(camStatus==="active"||camStatus==="loading")&&(
        <div style={{position:"fixed",bottom:100,right:14,width:152,height:112,borderRadius:14,overflow:"hidden",border:`1px solid ${camStatus==="active"?"rgba(0,255,136,0.4)":"rgba(255,200,0,0.3)"}`,background:"#000",boxShadow:`0 0 24px ${camStatus==="active"?"rgba(0,255,136,0.15)":"rgba(255,200,0,0.1)"}`,zIndex:200}}>
          <video ref={previewRef} autoPlay playsInline muted style={{width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)",display:"block"}}/>
          <canvas ref={overlayRef} width={152} height={112} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
          <div style={{position:"absolute",top:5,left:6,fontSize:"0.44rem",letterSpacing:"0.12em",color:camStatus==="active"?"#00ff88":"#ffcc00",textShadow:`0 0 8px ${camStatus==="active"?"#00ff88":"#ffcc00"}`}}>
            {camStatus==="active"?"● HAND TRACK":"⏳ LOADING..."}
          </div>
        </div>
      )}

      {/* Ability flash */}
      {abilityFlash&&<div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Georgia',serif",fontSize:"clamp(1.2rem,4.5vw,2.4rem)",fontWeight:900,color:fc,textShadow:`0 0 30px ${fc},0 0 60px ${fc}`,pointerEvents:"none",zIndex:300,letterSpacing:"0.08em",animation:"fadeInOut 1.9s ease forwards",textAlign:"center",whiteSpace:"nowrap"}}>{abilityFlash}</div>}

      {/* Top-left HUD */}
      <div style={{position:"fixed",top:14,left:14,pointerEvents:"none",zIndex:100,display:"flex",flexDirection:"column",gap:4}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontSize:"0.58rem",color:fc,letterSpacing:"0.15em",textTransform:"uppercase",textShadow:`0 0 8px ${fc}`}}>{ABILITIES[ability].name}</div>
          {arMode&&<div style={{fontSize:"0.45rem",padding:"2px 7px",borderRadius:20,background:`rgba(${hexToRgb(fc)},0.2)`,border:`1px solid ${fc}`,color:fc,letterSpacing:"0.1em"}}>◉ AR</div>}
          {showGlobe&&<div style={{fontSize:"0.45rem",padding:"2px 7px",borderRadius:20,background:"rgba(0,255,136,0.1)",border:"1px solid #00ff88",color:"#00ff88",letterSpacing:"0.08em"}}>🌐 GLOBE</div>}
        </div>
        {gestLines.length>0
          ?gestLines.map((g,i)=><div key={i} style={{fontSize:"0.54rem",color:"rgba(255,255,255,0.55)",letterSpacing:"0.05em"}}>{g}</div>)
          :<div style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.25)"}}>MOVE · HOLD=REPEL · DBL-CLICK=BURST · G=GLOBE</div>
        }
        <div style={{fontSize:"0.46rem",color:"rgba(255,255,255,0.18)",marginTop:2}}>FPS {fps} · {pCount} PARTICLES · {arMode?"AR":"DEFAULT"}</div>
      </div>

      {/* Top-right controls */}
      <div style={{position:"fixed",top:14,right:14,display:"flex",gap:7,zIndex:200,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:"calc(100vw - 180px)"}}>
        {/* AR toggle */}
        <button onClick={toggleAR} title={arMode?"Exit AR":"AR Mode"} style={{...btnBase,border:`1px solid ${arMode?"rgba(0,220,255,0.6)":"rgba(255,255,255,0.12)"}`,background:arMode?"rgba(0,220,255,0.15)":"rgba(0,0,0,0.5)",boxShadow:arMode?"0 0 18px rgba(0,220,255,0.4)":"none"}}>
          {arStatus==="starting"?"⏳":"🌐"}
        </button>
        {/* DEFAULT/AR pill */}
        <div style={{display:"flex",alignItems:"center",background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:30,overflow:"hidden",backdropFilter:"blur(12px)"}}>
          <button onClick={()=>{if(arMode)stopAR();}} style={{padding:"0 10px",height:40,border:"none",cursor:"pointer",fontSize:"0.52rem",letterSpacing:"0.06em",fontFamily:"'Courier New',monospace",transition:"all 0.2s",background:!arMode?"rgba(255,255,255,0.12)":"transparent",color:!arMode?"#fff":"rgba(255,255,255,0.35)"}}>DEFAULT</button>
          <button onClick={()=>{if(!arMode)startAR();}} style={{padding:"0 10px",height:40,border:"none",cursor:"pointer",fontSize:"0.52rem",letterSpacing:"0.06em",fontFamily:"'Courier New',monospace",transition:"all 0.2s",background:arMode?`rgba(${hexToRgb(fc)},0.2)`:"transparent",color:arMode?fc:"rgba(255,255,255,0.35)",boxShadow:arMode?`inset 0 0 12px rgba(${hexToRgb(fc)},0.2)`:"none"}}>AR</button>
        </div>
        {/* Globe toggle */}
        <button onClick={()=>setShowGlobe(s=>!s)} title="Toggle Globe (G)" style={{...btnBase,border:`1px solid ${showGlobe?"rgba(0,255,136,0.6)":"rgba(255,255,255,0.12)"}`,background:showGlobe?"rgba(0,255,136,0.15)":"rgba(0,0,0,0.5)",boxShadow:showGlobe?"0 0 14px rgba(0,255,136,0.3)":"none"}}>🌐</button>
        {/* Camera */}
        <button onClick={camStatus==="active"?stopCamera:startCamera} title={camStatus==="active"?"Stop Hand Tracking":"Hand Tracking"} style={{...btnBase,border:`1px solid ${camStatus==="active"?"rgba(0,255,136,0.5)":camStatus==="denied"||camStatus==="error"?"rgba(255,80,80,0.4)":"rgba(255,255,255,0.12)"}`,background:camStatus==="active"?"rgba(0,255,136,0.12)":camStatus==="loading"?"rgba(255,200,0,0.1)":"rgba(0,0,0,0.5)",boxShadow:camStatus==="active"?"0 0 14px rgba(0,255,136,0.3)":"none"}}>
          {camStatus==="requesting"||camStatus==="loading"?"⏳":camStatus==="active"?"🎥":camStatus==="denied"?"🚫":"📷"}
        </button>
        <button onClick={()=>{setSoundOn(s=>!s);audio.resume();}} style={{...btnBase,opacity:soundOn?1:0.4}}>{soundOn?"🔊":"🔇"}</button>
        <button onClick={()=>{particlesRef.current=[];audio.resume();audio.clear();}} style={btnBase}>💥</button>
        <button onClick={()=>setShowInfo(s=>!s)} style={btnBase}>❓</button>
      </div>

      {/* Status banners */}
      {camStatus==="denied"&&<SBanner c="red">⚠ Camera denied — using mouse/touch</SBanner>}
      {camStatus==="error"&&<SBanner c="yellow">⚠ MediaPipe blocked — use downloaded file for hand tracking</SBanner>}
      {arStatus==="error"&&<SBanner c="red" top={64}>⚠ AR camera unavailable</SBanner>}

      {/* Info overlay */}
      {showInfo&&(
        <div onClick={()=>setShowInfo(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(20px)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"rgba(6,6,18,0.98)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"24px 22px",maxWidth:400,width:"100%",color:"white",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{fontSize:"1rem",fontWeight:900,marginBottom:14,textAlign:"center",color:"#ffd700",letterSpacing:"0.06em"}}>✦ ARCANE FORGE ✦</div>
            <SH>Modes</SH>
            {[["DEFAULT","Dark starfield + full effects"],["AR 🌐","Live camera + floating particles"]].map(([k,v])=><IR k={k} v={v} key={k}/>)}
            <SH>Video Features (NEW!)</SH>
            {[["🔗 Hand Beam","Glowing beam connects both hands"],["🌐 Globe","Two fists = spinning wireframe globe"],["⭐ Float Stars","Colorful anti-gravity stars (AntiGrav/Rainbow/Galaxy)"],["⚡ Lightning","Bolts between hands (Lightning ability)"],["G key","Toggle globe manually"]].map(([k,v])=><IR k={k} v={v} key={k}/>)}
            <SH>New Abilities</SH>
            {[["🌀 AntiGrav","Particles float upward with waves"],["🌩️ Lightning","Bolt shards + hand lightning"],["🌪️ Vortex","Spiral force field"],["🎆 Aurora","Northern lights wave"],["⚛️ Plasma","Pulsing plasma field"],["🕳️ Portal","Orbital ring of particles"]].map(([k,v])=><IR k={k} v={v} key={k}/>)}
            <SH>Controls</SH>
            {[["🖐 Open","Attract"],["✊ Fist","Repel / Globe (×2)"],["🤏 Pinch","Burst ring"],["DBL-click","Burst ring"],["G key","Toggle globe"]].map(([k,v])=><IR k={k} v={v} key={k}/>)}
            <div style={{marginTop:12,fontSize:"0.6rem",color:"#444",textAlign:"center"}}>Tap to close</div>
          </div>
        </div>
      )}

      {/* Ability bar — two rows */}
      <div style={{position:"fixed",bottom:14,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",gap:5,alignItems:"center",zIndex:150,maxWidth:"calc(100vw - 16px)"}}>
        {[abilityEntries.slice(0,7),abilityEntries.slice(7)].map((row,ri)=>(
          <div key={ri} style={{display:"flex",gap:5,background:"rgba(0,0,0,0.62)",backdropFilter:"blur(18px)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:60,padding:"6px 10px",flexWrap:"wrap",justifyContent:"center"}}>
            {row.map(([key,cfg])=>{
              const active=ability===key;const c=FC[key];
              return(
                <button key={key} onClick={()=>selectAbility(key)} style={{width:46,height:46,borderRadius:"50%",border:`1.5px solid ${active?c:"rgba(255,255,255,0.1)"}`,background:active?`rgba(${hexToRgb(c)},0.25)`:"rgba(0,0,0,0.4)",boxShadow:active?`0 0 14px ${c}88`:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,transform:active?"scale(1.15)":"scale(1)",transition:"all 0.2s",flexShrink:0}}>
                  <span style={{fontSize:16,lineHeight:1}}>{cfg.emoji}</span>
                  <span style={{fontSize:"0.34rem",letterSpacing:"0.03em",color:active?c:"rgba(255,255,255,0.3)",textTransform:"uppercase"}}>{cfg.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInOut{0%{opacity:0;transform:translate(-50%,-50%) scale(0.8);}20%{opacity:1;transform:translate(-50%,-50%) scale(1.05);}70%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(-50%,-50%) scale(0.9);}}
        button:active{opacity:0.7;}*{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.2);border-radius:2px;}
      `}</style>
    </div>
  );
}

function SBanner({children,c="red",top=64}){const cols={red:["rgba(255,60,60,0.12)","rgba(255,80,80,0.4)","#ff9999"],yellow:["rgba(255,160,0,0.12)","rgba(255,160,0,0.4)","#ffcc66"],cyan:["rgba(0,220,255,0.1)","rgba(0,220,255,0.35)","#80eeff"]};const[bg,border,text]=cols[c]||cols.red;return<div style={{position:"fixed",top,left:"50%",transform:"translateX(-50%)",background:bg,border:`1px solid ${border}`,borderRadius:10,padding:"7px 16px",fontSize:"0.6rem",color:text,zIndex:200,textAlign:"center",letterSpacing:"0.04em",whiteSpace:"nowrap",pointerEvents:"none"}}>{children}</div>;}
function SH({children}){return<div style={{fontSize:"0.58rem",letterSpacing:"0.2em",color:"#ffd700",textTransform:"uppercase",marginTop:14,marginBottom:7,borderBottom:"1px solid rgba(255,215,0,0.15)",paddingBottom:4}}>{children}</div>;}
function IR({k,v}){return<div style={{display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:"0.72rem",borderBottom:"1px solid rgba(255,255,255,0.04)",paddingBottom:6}}><span style={{color:"#aaa"}}>{k}</span><span style={{color:"#fff",textAlign:"right",maxWidth:"58%"}}>{v}</span></div>;}
