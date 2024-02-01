import{S as l,i as c,a as u}from"./assets/vendor-b52d9f5e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const d="https://pixabay.com/api",p="42087776-9136d7523d21dc11bf8e1a72d",f=document.querySelector(".form"),m=document.querySelector(".gallery"),i=document.querySelector(".loader");f.addEventListener("submit",g);i.classList.remove("loader");const y=new l(".gallery a",{captionsData:"alt",captionDelay:250});async function g(s){s.preventDefault();const r=s.currentTarget,n=r.elements.query.value.trim();i.classList.add("loader");try{const{data:o}=await h(n);console.log(o);let e="";const t=o.hits;for(const a of t)e+=L(a);t.length===0&&c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),m.innerHTML=e,i.classList.remove("loader"),y.refresh()}catch(o){console.log(o)}finally{r.reset()}}async function h(s){try{return await u.get(`${d}/?`,{params:{key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:40}})}catch(r){console.log(r)}}function L({webformatURL:s,largeImageURL:r,tags:n,likes:o,views:e,comments:t,downloads:a}){return` <li class="gallery-item">
    <a class="gallery-link" href=${r}>
      <img
        class="gallery-image"
        src=${s}
        alt=${n}
        >
  
        <p>Likes<br> ${o}</p>
        <p>Views<br> ${e}</p>
        <p>Comments<br> ${t}</p>
        <p>Downloads<br> ${a}</p>   
    </a>
  </li>`}
//# sourceMappingURL=commonHelpers.js.map
