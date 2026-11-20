/* A solid-geometry coding and cybersecurity workspace. No libraries, WebGL, or idle loop. */
(() => {
  'use strict';
  const home=document.getElementById('home'), world=document.getElementById('villageWorld');
  if(!home||!world)return;
  const canvas=document.createElement('canvas'), ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx)return;
  canvas.className='village-solid-scene';canvas.setAttribute('aria-hidden','true');
  world.prepend(canvas);world.classList.add('village-solid-ready');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
  const faces=[],connections=[];
  const face=(points,color)=>faces.push({points,color});
  function box(x,y,z,w,h,d,colors){
    const a=x-w/2,b=x+w/2,c=z-d/2,e=z+d/2,t=y+h;
    face([[a,y,c],[b,y,c],[b,t,c],[a,t,c]],colors[0]);
    face([[b,y,c],[b,y,e],[b,t,e],[b,t,c]],colors[1]);
    face([[a,y,e],[a,y,c],[a,t,c],[a,t,e]],colors[1]);
    face([[b,y,e],[a,y,e],[a,t,e],[b,t,e]],colors[1]);
    face([[a,t,c],[b,t,c],[b,t,e],[a,t,e]],colors[2]);
  }
  const metal=['#425a4e','#20382e','#718875'];
  const edge=['#738675','#394f40','#a8b698'];
  const dark=['#172c23','#102119','#314b3b'];
  const brass=['#a69d77','#665f49','#d2c299'];
  // A connected workspace: code at the center, systems and security at its edges.
  const terrain={points:[[-25,-.08,-8],[25,-.08,-8],[25,-.08,40],[-25,-.08,40]],color:'#0c1b16'};
  // An elevated machined platform gives every object a shared spatial foundation.
  box(0,.02,0,7.1,.2,5.6,dark);box(0,.22,0,6.8,.055,5.3,metal);
  // Laptop base, recessed keyboard, trackpad, hinge and tilted screen.
  box(0,.3,-.45,5.25,.16,3.15,edge);
  box(0,.463,-.13,4.65,.018,1.45,dark);
  for(let row=0;row<4;row++)for(let col=0;col<12;col++)box(-2.1+col*.38,.485,-.62+row*.31,.29,.035,.21,metal);
  box(0,.465,-1.43,1.4,.015,.55,['#718373','#425b49','#879680']);
  box(0,.45,1.04,4.8,.16,.16,dark);
  const screenPoint=(x,y,offset=0)=>[x,y,1.04+(y-.55)*.2+offset];
  const panel=(x,y,w,h,color,offset=0)=>face([screenPoint(x,y,offset),screenPoint(x+w,y,offset),screenPoint(x+w,y+h,offset),screenPoint(x,y+h,offset)],color);
  panel(-2.63,.55,5.26,3.05,'#5e7566');panel(-2.5,.68,5,2.78,'#10251d',-.025);
  face([screenPoint(2.63,.55),screenPoint(2.63,3.6),screenPoint(2.63,3.6,.12),screenPoint(2.63,.55,.12)],'#293e31');
  face([screenPoint(-2.63,3.6),screenPoint(2.63,3.6),screenPoint(2.63,3.6,.12),screenPoint(-2.63,3.6,.12)],'#92a18a');
  // A visual code editor: tabs, indentation and syntax blocks, without fake terminal output.
  panel(-2.4,3.12,4.8,.22,'#2d4436',-.035);panel(-2.33,3.13,1.12,.18,'#6e8267',-.045);
  panel(-2.4,.8,.5,2.22,'#182d23',-.035);
  const codeRows=[[0,1.4,.65],[.25,.7,1.3],[.5,1.15,.6],[.5,.8,1.05],[.25,1.5,.45],[0,.55,.7]];
  codeRows.forEach(([indent,a,b],i)=>{const y=2.72-i*.3;panel(-1.65+indent,y,a,.075,i%2?'#a6b68f':'#c0b58c',-.045);panel(-1.53+indent+a,y,b,.075,'#577963',-.045);});
  // Connected system modules are small solid stacks, not buildings or scenery.
  const systemNodes=[[-4.8,1.5],[4.7,-.2],[-4,-3.5],[4.2,4.5]];
  systemNodes.forEach(([x,z],index)=>{
    box(x,.04,z,1.6,.15,1.5,dark);
    for(let level=0;level<(index<2?3:1);level++){
      box(x,.25+level*.36,z,1.3,.25,1.12,metal);
      box(x-.42,.32+level*.36,z-.567,.12,.065,.012,brass);
      box(x+.15,.32+level*.36,z-.567,.55,.04,.012,dark);
    }
    connections.push([[x,.015,z],[x,.015,z<0?-2.6:2.7],[0,.015,z<0?-2.6:2.7],[0,.015,0]]);
  });
  // Security shield, extruded from a six-point outline beside the workstation.
  const sx=4.7,sy=2.5,sz=.05;
  const outline=[[0,1.2],[.92,.83],[.8,-.35],[0,-1.05],[-.8,-.35],[-.92,.83]];
  const front=outline.map(([x,y])=>[sx+x,sy+y,sz-.18]);
  const back=outline.map(([x,y])=>[sx+x,sy+y,sz+.04]);
  face(back,'#304936');
  for(let i=0;i<outline.length;i++)face([front[i],back[i],back[(i+1)%6],front[(i+1)%6]],i<3?'#6f805d':'#b8b489');
  face(front,'#b6b68d');
  face(outline.map(([x,y])=>[sx+x*.87,sy+y*.87,sz-.195]),'#314e3b');
  face([[sx-.38,sy+.1,sz-.21],[sx-.12,sy-.2,sz-.21],[sx+.44,sy+.46,sz-.21],[sx+.55,sy+.36,sz-.21],[sx-.12,sy-.42,sz-.21],[sx-.49,sy,sz-.21]],'#e0d4aa');
  // Quiet circuit traces connect the workspace to the chapter's surrounding space.
  for(let i=0;i<6;i++){
    const x=-9+i*3.5;
    connections.push([[x,.01,12],[x,.01,6],[x+1.2,.01,4.5]]);
    box(x,.025,12,.22,.07,.22,metal);
  }
  let width=0,height=0,top=0,frame=0,visible=true,yaw=-.38,targetYaw=yaw,pitch=.21,targetPitch=pitch,scroll=0;
  function project(p){
    const x=p[0]*Math.cos(yaw)-p[2]*Math.sin(yaw),z=p[0]*Math.sin(yaw)+p[2]*Math.cos(yaw);
    const y=p[1]*Math.cos(pitch)+z*Math.sin(pitch),depth=z*Math.cos(pitch)-p[1]*Math.sin(pitch);
    const scale=Math.min(width/15,height/9.5)*22/(22+depth);
    return {x:width*(width<768?.53:.56)+x*scale,y:height*(width<768?.75:.78)-y*scale+scroll*16,z:depth};
  }
  function draw(){
    const sky=ctx.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#080f0f');sky.addColorStop(.55,'#17372d');sky.addColorStop(1,'#0b1812');ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
    const glow=ctx.createRadialGradient(width*.66,height*.55,0,width*.66,height*.55,width*.5);glow.addColorStop(0,'#7997792b');glow.addColorStop(1,'#79977900');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    function polygon(points,color){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=color;ctx.fill();}
    polygon(terrain.points.map(project),terrain.color);
    ctx.lineWidth=.65;ctx.strokeStyle='#66867122';
    const line=points=>{ctx.beginPath();points.map(project).forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();};
    for(let i=-12;i<=18;i+=2){line([[i,0,-7],[i,0,25]]);if(i>=-6)line([[-18,0,i],[18,0,i]]);}
    ctx.strokeStyle='#a4b98b77';ctx.lineWidth=1.2;connections.forEach(line);
    const projected=faces.map(f=>{const points=f.points.map(project);return {points,color:f.color,z:points.reduce((s,p)=>s+p.z,0)/points.length};}).sort((a,b)=>b.z-a.z);
    projected.forEach(f=>polygon(f.points,f.color));
    ctx.font=(width<768?'8':'10')+'px monospace';ctx.textAlign='center';ctx.fillStyle='#b8c9a6';
    for(const [text,position] of [['DEVELOPMENT',[0,3.95,1.8]],['SYSTEMS',[-4.8,1.8,1.5]],['SECURITY',[4.7,4.1,.05]]]){const p=project(position);ctx.fillText(text,p.x,p.y);}
  }
  function tick(){frame=0;if(!visible||document.hidden)return;yaw+= (targetYaw-yaw)*.16;pitch+=(targetPitch-pitch)*.16;draw();if(Math.abs(targetYaw-yaw)+Math.abs(targetPitch-pitch)>.0004)frame=requestAnimationFrame(tick);}
  function request(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function measure(){const r=world.getBoundingClientRect();width=r.width;height=r.height;top=r.top+scrollY;const dpr=Math.min(devicePixelRatio||1,1.25);canvas.width=Math.round(Math.min(width*dpr,1920));canvas.height=Math.round(Math.min(height*dpr,1800));ctx.setTransform(canvas.width/width,0,0,canvas.height/height,0,0);request();}
  function reset(){targetYaw=-.38;targetPitch=.21;request();}
  home.addEventListener('pointermove',e=>{if(!fine.matches||reduced.matches||!visible||e.pointerType!=='mouse')return;targetYaw=-.38+(e.clientX/width-.5)*.22;targetPitch=.21-((e.clientY+scrollY-top)/height-.5)*.08;request();},{passive:true});
  home.addEventListener('pointerleave',reset);
  window.addEventListener('scroll',()=>{if(!visible||reduced.matches)return;scroll=Math.max(0,Math.min(1,(scrollY-top)/height));request();},{passive:true});
  const resize=new ResizeObserver(measure);resize.observe(world);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)request();else{cancelAnimationFrame(frame);frame=0;}});observer.observe(home);
  const sync=()=>{if(reduced.matches){yaw=targetYaw=-.38;pitch=targetPitch=.21;scroll=0;}reset();};
  reduced.addEventListener('change',sync);fine.addEventListener('change',reset);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else request();});
  window.addEventListener('pagehide',e=>{cancelAnimationFrame(frame);frame=0;if(!e.persisted){resize.disconnect();observer.disconnect();}});
  window.addEventListener('pageshow',measure);measure();
})();
