import{a as y,S as v,i as w}from"./assets/vendor-BkC4bTqC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();async function L(r,o){return(await y.get("https://pixabay.com/api/",{params:{key:"55036420-a7a19d5751e273048ff10c958",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o}})).data}const d=document.querySelector(".gallery"),m=document.querySelector(".loader");let b=new v(".gallery .photo-card a",{captionsData:"alt",captionDelay:250});function S(r){function o(e){const{webformatURL:t,tags:i,likes:u,views:f,comments:p,downloads:h,largeImageURL:g}=e;return`<li class="photo-card">
              <a href=${g}><img src="${t}" alt="${i}"/></a>

              <div class="info">
              <div class="info-item"><h2>Likes: <span>${u}</span></h2></div>
              <div class="info-item"> <h2>Views: <span>${f}</span></h2></div>
              <div class="info-item"><h2>Comments: <span>${p}</span></h2></div>
              <div class="info-item"><h2>Downloads: <span>${h}</span></h2></div>
            </div>
            </li>
            `}function a(e){return e.map(o).join("")}const s=a(r);d.innerHTML=s,b.refresh()}function D(){d.innerHTML=""}function $(){m.classList.remove("is-hidden")}function n(){m.classList.add("is-hidden")}const l=document.querySelector(".form");l.addEventListener("submit",q);//! ========================================
async function q(r){r.preventDefault();const a=new FormData(l).get("search-text").trim();if(a===""){c("Please enter a search term");return}D(),$();try{const s=await L(a);s.hits.length||(n(),c("Sorry, there are no images matching your search query.Please try again!")),S(s.hits)}catch{n(),c("Something went wrong!")}n(),l.reset()}//! ========================================message text
function c(r){w.show({message:r,position:"topRight",backgroundColor:"rgba(232, 13, 13, 0.8)",messageColor:"white"})}//! ========================================
//# sourceMappingURL=index.js.map
