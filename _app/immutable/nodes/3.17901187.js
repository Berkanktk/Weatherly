import{s as B,n as k,f as S}from"../chunks/scheduler.63274e7e.js";import{S as G,i as P,g as d,s as D,h as _,j as E,y as W,c as j,f as b,k as i,a as L,x as r,A as R,m as I,n as M}from"../chunks/index.64499f1b.js";import{e as O,c as q}from"../chunks/codeData.74351d8b.js";function w(m,t,a){const p=m.slice();return p[0]=t[a][0],p[1]=t[a][1],p}function A(m){let t,a,p=m[0]+"",C,o,g,c,h,f,x,T=m[1].description+"",u,v;return{c(){t=d("tr"),a=d("td"),C=I(p),o=D(),g=d("td"),c=d("img"),f=D(),x=d("td"),u=I(T),v=D(),this.h()},l(l){t=_(l,"TR",{});var e=E(t);a=_(e,"TD",{class:!0});var n=E(a);C=M(n,p),n.forEach(b),o=j(e),g=_(e,"TD",{class:!0});var s=E(g);c=_(s,"IMG",{src:!0,alt:!0,width:!0,height:!0}),s.forEach(b),f=j(e),x=_(e,"TD",{class:!0});var y=E(x);u=M(y,T),y.forEach(b),v=j(e),e.forEach(b),this.h()},h(){i(a,"class","svelte-1f20d69"),S(c.src,h=`/weather-icons/${m[1].icon}`)||i(c,"src",h),i(c,"alt",m[1].description),i(c,"width","32"),i(c,"height","32"),i(g,"class","svelte-1f20d69"),i(x,"class","svelte-1f20d69")},m(l,e){L(l,t,e),r(t,a),r(a,C),r(t,o),r(t,g),r(g,c),r(t,f),r(t,x),r(x,u),r(t,v)},p:k,d(l){l&&b(t)}}}function V(m){let t,a,p="Weather Icons",C,o,g="WMO Weather interpretation codes (WW)",c,h,f,x='<tr><th class="svelte-1f20d69">Code</th> <th class="svelte-1f20d69">Icon</th> <th class="svelte-1f20d69">Description</th></tr>',T,u,v=O(Object.entries(q[0])),l=[];for(let e=0;e<v.length;e+=1)l[e]=A(w(m,v,e));return{c(){t=d("div"),a=d("h1"),a.textContent=p,C=D(),o=d("h2"),o.textContent=g,c=D(),h=d("table"),f=d("thead"),f.innerHTML=x,T=D(),u=d("tbody");for(let e=0;e<l.length;e+=1)l[e].c();this.h()},l(e){t=_(e,"DIV",{class:!0});var n=E(t);a=_(n,"H1",{class:!0,"data-svelte-h":!0}),W(a)!=="svelte-1vvyve"&&(a.textContent=p),C=j(n),o=_(n,"H2",{class:!0,"data-svelte-h":!0}),W(o)!=="svelte-12qbldu"&&(o.textContent=g),c=j(n),h=_(n,"TABLE",{class:!0});var s=E(h);f=_(s,"THEAD",{"data-svelte-h":!0}),W(f)!=="svelte-ecjjne"&&(f.innerHTML=x),T=j(s),u=_(s,"TBODY",{});var y=E(u);for(let H=0;H<l.length;H+=1)l[H].l(y);y.forEach(b),s.forEach(b),n.forEach(b),this.h()},h(){i(a,"class","text-5xl mb-8"),i(o,"class","text-3xl mb-4"),i(h,"class","svelte-1f20d69"),i(t,"class","p-4")},m(e,n){L(e,t,n),r(t,a),r(t,C),r(t,o),r(t,c),r(t,h),r(h,f),r(h,T),r(h,u);for(let s=0;s<l.length;s+=1)l[s]&&l[s].m(u,null)},p(e,[n]){if(n&0){v=O(Object.entries(q[0]));let s;for(s=0;s<v.length;s+=1){const y=w(e,v,s);l[s]?l[s].p(y,n):(l[s]=A(y),l[s].c(),l[s].m(u,null))}for(;s<l.length;s+=1)l[s].d(1);l.length=v.length}},i:k,o:k,d(e){e&&b(t),R(l,e)}}}class F extends G{constructor(t){super(),P(this,t,null,V,B,{})}}export{F as component};
