"use client";
import { useEffect, useRef } from "react";
import styles from "./ServiceAreas.module.css";
export default function Globe({ textureSrc = "/images/globe-texture.png", fullSphere = false }) {
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current, reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let gl,program,buffer,texture,img,angleUniform,tiltUniform,resolutionUniform,ready=false,visible=false,disposed=false,raf=0,angle=-Math.PI/2,velocity=0,tilt=.32,tiltVelocity=0,drag=null,last=0,targetAngle=-Math.PI/2,targetTilt=.32;
    const request=()=>{if(ready&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(draw);};
    function draw(now) {
      raf=0;
      if(!ready||!visible||document.hidden||disposed)return;
      const elapsed=now-last;
      if(elapsed<1000/30&&!drag&&!reduced.matches){request();return;}
      const seconds=Math.min(elapsed/1000,.1);
      last=now;
      if(!drag&&!reduced.matches){targetAngle+=.045*seconds+velocity*seconds*60;velocity*=Math.pow(.92,seconds*60);targetTilt+=tiltVelocity*seconds*60;tiltVelocity*=Math.pow(.92,seconds*60);}
      const follow=reduced.matches?1:1-Math.exp(-12*seconds);angle+=(targetAngle-angle)*follow;tilt+=(targetTilt-tilt)*follow;
      gl.uniform1f(angleUniform,angle);gl.uniform1f(tiltUniform,tilt);
      gl.drawArrays(gl.TRIANGLES,0,6);
      if(!reduced.matches)request();
    }
    const resize=()=>{if(!gl)return;const dpr=Math.min(devicePixelRatio||1,1.5);c.width=Math.round(c.clientWidth*dpr);c.height=Math.round(c.clientHeight*dpr);gl.viewport(0,0,c.width,c.height);if(resolutionUniform)gl.uniform2f(resolutionUniform,c.width,c.height);request();};
    const init=()=>{
      gl=c.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});if(!gl)return;
      try {
        const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);throw Error('shader');}return s;};
        const vs=compile(gl.VERTEX_SHADER,'attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}');
        const fs=compile(gl.FRAGMENT_SHADER,`precision mediump float; varying vec2 uv; uniform sampler2D earth; uniform float angle; uniform float tilt; uniform vec2 resolution;
          void main(){float radius=${fullSphere ? "min(resolution.x,resolution.y)*.46" : "max(resolution.x*.56,resolution.y*.52)"};vec2 p=${fullSphere ? "(uv-.5)*resolution/radius" : "vec2((uv.x-.5)*resolution.x,uv.y*resolution.y-.85*resolution.y+radius)/radius"};float r=1.;float d=dot(p,p);vec3 bg=vec3(.02745);if(d>r*r){gl_FragColor=vec4(bg,1.);return;}
          vec3 n=vec3(p,sqrt(r*r-d))/r;vec3 q=vec3(n.x,n.y*cos(tilt)+n.z*sin(tilt),n.z*cos(tilt)-n.y*sin(tilt));
          vec2 st=vec2(fract(.5+(atan(q.x,q.z)+angle)/6.2831853),.5-asin(clamp(q.y,-1.,1.))/3.1415927);
          vec3 color=texture2D(earth,st).rgb*(.52+.48*max(0.,dot(n,normalize(vec3(-.25,.7,1.)))));
          float fade=${fullSphere ? "1." : "smoothstep(.02,.55,uv.y)*smoothstep(0.,.12,n.z)"};
          color=mix(bg,color,fade);
          // Cape Coral is the only confirmed service location in the brief.
          // Longitude and latitude stay attached to the globe during rotation.
          vec2 location=vec2((-81.9495+180.)/360.,(90.-26.5629)/180.);
          vec2 delta=abs(st-location);delta.x=min(delta.x,1.-delta.x);
          float distance=length(delta*vec2(2.*cos(26.5629*3.1415927/180.),1.));
          float dotCore=1.-smoothstep(.002,.0035,distance);
          float ring=(1.-smoothstep(.0007,.0015,abs(distance-.008)))*.45;
          float glow=exp(-distance*distance/.00013)*.22;
          float marker=max(dotCore,max(ring,glow))*smoothstep(.02,.18,n.z);
          color=mix(color,vec3(.95,.96,.94),marker);
          ${fullSphere ? "color+=vec3(.2)*smoothstep(.975,1.,sqrt(d));" : ""}
          gl_FragColor=vec4(color,1.);}`);
        program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('program');gl.useProgram(program);angleUniform=gl.getUniformLocation(program,"angle");tiltUniform=gl.getUniformLocation(program,"tilt");resolutionUniform=gl.getUniformLocation(program,"resolution");
        buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const a=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
        texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        img=new Image();img.onload=()=>{if(disposed)return;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);ready=true;c.style.opacity='1';resize();};img.src=textureSrc;
      }catch{c.style.opacity='0';}
    };
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible){if(!gl)init();last=performance.now();request();}else{cancelAnimationFrame(raf);raf=0;velocity=0;tiltVelocity=0;}});io.observe(c);
    const ro=new ResizeObserver(resize);ro.observe(c);
    const down=e=>{if(drag||(e.pointerType==='mouse'&&e.button!==0))return;targetAngle=angle;targetTilt=tilt;drag={x:e.clientX,y:e.clientY,id:e.pointerId,time:performance.now()};velocity=0;tiltVelocity=0;c.setPointerCapture(e.pointerId);};
    const move=e=>{if(!drag||drag.id!==e.pointerId)return;const scale=Math.min(c.clientWidth,c.clientHeight);const dx=(e.clientX-drag.x)/scale*1.2;const dy=(e.clientY-drag.y)/scale*1.2;const now=performance.now(),dt=Math.max(now-drag.time,8);targetAngle+=dx;targetTilt+=dy;velocity=velocity*.75+Math.max(-.012,Math.min(.012,dx*16.67/dt))*.25;tiltVelocity=tiltVelocity*.75+Math.max(-.012,Math.min(.012,dy*16.67/dt))*.25;drag.x=e.clientX;drag.y=e.clientY;drag.time=now;request();};
    const up=()=>{if(drag&&performance.now()-drag.time>80){velocity=0;tiltVelocity=0;}drag=null;request();};
    const key=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')targetAngle-=.15;if(e.key==='ArrowRight')targetAngle+=.15;if(e.key==='ArrowUp')targetTilt-=.15;if(e.key==='ArrowDown')targetTilt+=.15;velocity=0;tiltVelocity=0;request();}};
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;velocity=0;tiltVelocity=0;}else {last=performance.now();request();}};
    const lost=e=>{e.preventDefault();ready=false;c.style.opacity='0';cancelAnimationFrame(raf);raf=0;};
    const motion=()=>{velocity=0;tiltVelocity=0;last=performance.now();request();};reduced.addEventListener('change',motion);
    const handlers={pointerdown:down,pointermove:move,pointerup:up,pointercancel:up,lostpointercapture:up,keydown:key,webglcontextlost:lost};
    Object.entries(handlers).forEach(([name,fn])=>c.addEventListener(name,fn));document.addEventListener('visibilitychange',visibility);
    return()=>{disposed=true;reduced.removeEventListener("change",motion);cancelAnimationFrame(raf);io.disconnect();ro.disconnect();if(img)img.onload=null;Object.entries(handlers).forEach(([name,fn])=>c.removeEventListener(name,fn));document.removeEventListener('visibilitychange',visibility);if(gl){gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);}};
  },[textureSrc,fullSphere]);
  return <canvas ref={ref} className={styles.globeCanvas} style={{ touchAction: fullSphere ? "none" : "pan-y" }} tabIndex={0} role="img" aria-label="Interactive globe. Drag in any direction or use the arrow keys to explore continents."/>;
}
