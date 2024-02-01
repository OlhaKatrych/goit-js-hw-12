import{S as g,i as u,a as h}from"./assets/vendor-b52d9f5e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const y="https://pixabay.com/api",L="42087776-9136d7523d21dc11bf8e1a72d",b=document.querySelector(".form"),d=document.querySelector(".gallery"),c=document.querySelector(".loader"),i=document.querySelector(".button");b.addEventListener("submit",q);c.classList.remove("loader");const v=new g(".gallery a",{captionsData:"alt",captionDelay:250}),n={query:"",page:1,per_page:40,maxPage:0};async function q(s){s.preventDefault(),d.innerHTML="";const r=s.currentTarget;if(n.query=r.elements.query.value.trim(),c.classList.add("loader"),i.classList.add("is-hidden"),!!n.query)try{const{data:o}=await f(n);console.log(o);let a="";const e=o.hits;for(const l of e)a+=p(l);e.length===0&&u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});const t=o.totalHits;n.maxPage=Math.ceil(t/n.per_page),d.innerHTML=a,c.classList.remove("loader"),e.length>0&&e.length!==t?(i.addEventListener("click",m),i.classList.remove("is-hidden")):i.classList.add("is-hidden"),v.refresh()}catch(o){console.log(o)}finally{r.reset()}}async function m(){n.page+=1,c.classList.add("loader"),i.classList.add("is-hidden");try{const{data:s}=await f(n);console.log(s);let r="";const o=s.hits;for(const a of o)r+=p(a);d.innerHTML+=r}catch(s){console.log(s)}finally{c.classList.remove("loader"),i.classList.remove("is-hidden")}n.page===n.maxPage&&(i.classList.add("is-hidden"),u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.removeEventListener("click",m))}async function f({query:s,page:r=1,per_page:o}){try{return await h.get(`${y}/?`,{params:{key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o}})}catch(a){console.log(a)}}function p({webformatURL:s,largeImageURL:r,tags:o,likes:a,views:e,comments:t,downloads:l}){return` <li class="gallery-item">
    <a class="gallery-link" href=${r}>
      <img
        class="gallery-image"
        src=${s}
        alt=${o}
        >
  
        <p>Likes<br> ${a}</p>
        <p>Views<br> ${e}</p>
        <p>Comments<br> ${t}</p>
        <p>Downloads<br> ${l}</p>   
    </a>
  </li>`}
//# sourceMappingURL=commonHelpers.js.map
