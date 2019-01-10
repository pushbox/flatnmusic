// ==UserScript==
// @name   Userscript Helper for Netease Music Flat Userstyle
// @name:zh-CN         网易云音乐扁平用户样式辅助用户脚本
// @namespace    wTonyChen
// @version      0.0.22-0.3.78
// @description  Provides a better experience for Netease Music Flat Userstyle.
// @description:zh-CN  为网易云音乐扁平用户样式提供更佳的用户体验。
// @author       wTonyChen
// @homepage      https://greasyfork.org/scripts/369688
// @match        http*://music.163.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
 "use strict";
document.documentElement.setAttribute("wk-style-assist", "true");
let mainEvent = e => {
    let alt_imgs = document.querySelectorAll("img[data-src]");
    for ( let i = 0; i < alt_imgs; i ++ ) {
        if (alt_imgs[i].dataset.src && alt_imgs[i].src == "") alt_imgs[i].src = alt_imgs[i].dataset.src;
    }
    let imgs = window.document.images;
    for ( let i = 0; i < imgs.length; i ++ ) {
        let base = imgs[i].src.split("?")[0];
        if (imgs[i].src != base){
            let a = new Image();
            let l = j => {
                if (!imgs[i]) return;
                if (imgs[i].src.split("?")[0] == base) imgs[i].src = base;
                a.removeEventListener("load", l, !1);
            }
            a.addEventListener("load", l, !1);
            a.src = base;
        }
    }
    if (location.pathname.indexOf("/user/") == 0) {
        let user_pic = document.querySelector(".m-proifo dt img"), container = document.querySelector(".g-bd");
        if (user_pic && user_pic.src && container) (document.documentElement.classList.add("has-upb"), container.style.cssText = `--upb: url("${user_pic.src}")`);
   }
   let cover_img = document.querySelector(".g-wrap > .m-info .cover img"), con = document.querySelector(".g-wrap > .m-info");
   if (cover_img && con) (document.documentElement.classList.add("has-mib"), con.style.cssText = `--mib: url("${cover_img.src}")`);
}
mainEvent();
window.setInterval(mainEvent, 2000);
})();