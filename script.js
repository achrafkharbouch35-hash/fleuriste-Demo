window.addEventListener("load",()=>{const p=document.querySelector(".preloader");setTimeout(()=>p.classList.add("hidden"),700)});
const navbar=document.getElementById("navbar"),backTop=document.getElementById("backTop");
window.addEventListener("scroll",()=>{navbar.classList.toggle("scrolled",scrollY>50);backTop.classList.toggle("show",scrollY>600)});
const menuButton=document.getElementById("menuButton"),mobileMenu=document.getElementById("mobileMenu");
menuButton.addEventListener("click",()=>{mobileMenu.classList.toggle("open");document.body.classList.toggle("no-scroll")});
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>{mobileMenu.classList.remove("open");document.body.classList.remove("no-scroll")}));
backTop.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

const filters=document.querySelectorAll(".filter"),items=document.querySelectorAll(".gallery-item");
filters.forEach(f=>f.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));f.classList.add("active");const c=f.dataset.filter;items.forEach(i=>{const show=c==="all"||i.dataset.category===c;i.classList.toggle("hidden",!show);if(show)i.style.animation="galleryIn .5s ease"})}));

const lightbox=document.getElementById("lightbox"),lightboxImage=document.getElementById("lightboxImage");
const imageElements=[...document.querySelectorAll(".gallery-item img")];let currentImage=0;
function openLightbox(i){currentImage=i;lightboxImage.src=imageElements[i].src;lightboxImage.alt=imageElements[i].alt;lightbox.classList.add("open");document.body.classList.add("no-scroll")}
function closeLightbox(){lightbox.classList.remove("open");document.body.classList.remove("no-scroll")}
function nextImage(){currentImage=(currentImage+1)%imageElements.length;lightboxImage.src=imageElements[currentImage].src}
function prevImage(){currentImage=(currentImage-1+imageElements.length)%imageElements.length;lightboxImage.src=imageElements[currentImage].src}
document.querySelectorAll(".view-image").forEach((b,i)=>b.addEventListener("click",e=>{e.stopPropagation();openLightbox(i)}));
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
document.getElementById("lightboxNext").addEventListener("click",nextImage);
document.getElementById("lightboxPrev").addEventListener("click",prevImage);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowRight")nextImage();if(e.key==="ArrowLeft")prevImage()});

const testimonials=document.querySelectorAll(".testimonial");let ti=0;
function showTestimonial(i){testimonials.forEach(x=>x.classList.remove("active"));testimonials[i].classList.add("active")}
document.getElementById("nextTestimonial").addEventListener("click",()=>{ti=(ti+1)%testimonials.length;showTestimonial(ti)});
document.getElementById("prevTestimonial").addEventListener("click",()=>{ti=(ti-1+testimonials.length)%testimonials.length;showTestimonial(ti)});
setInterval(()=>{ti=(ti+1)%testimonials.length;showTestimonial(ti)},6000);

document.querySelectorAll(".order-product").forEach(b=>b.addEventListener("click",()=>{const message=`Bonjour Les Fleurs de Chaimae 🌷, je suis intéressé(e) par "${b.dataset.product}". Pouvez-vous me donner plus d'informations ?`;window.open(`https://wa.me/212609453498?text=${encodeURIComponent(message)}`,"_blank")}));

const counters=document.querySelectorAll(".counter");let countersStarted=false;
function animateCounters(){if(countersStarted)return;countersStarted=true;counters.forEach(c=>{const target=+c.dataset.target;let current=0;const step=()=>{current+=target/80;if(current<target){c.textContent=Math.floor(current).toLocaleString("fr-FR");requestAnimationFrame(step)}else c.textContent=target.toLocaleString("fr-FR")};step()})}
new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&animateCounters()),{threshold:.4}).observe(document.querySelector(".instagram-intro"));

const revealElements=document.querySelectorAll(".section-heading,.center-heading,.gallery-item,.product-card,.service-card,.about-content,.about-image,.process-item,.testimonial-slider,.instagram-grid a,.cta-content");
revealElements.forEach(e=>e.classList.add("reveal"));
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ro.unobserve(e.target)}}),{threshold:.12});
revealElements.forEach(e=>ro.observe(e));

const sections=document.querySelectorAll("main section[id]"),navLinks=document.querySelectorAll(".nav-link");
window.addEventListener("scroll",()=>{let current="";sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});navLinks.forEach(l=>l.classList.toggle("active",l.getAttribute("href")===`#${current}`))});

let touchStartX=0;
lightbox.addEventListener("touchstart",e=>touchStartX=e.changedTouches[0].screenX);
lightbox.addEventListener("touchend",e=>{const d=touchStartX-e.changedTouches[0].screenX;if(Math.abs(d)>=50)d>0?nextImage():prevImage()});
document.querySelectorAll("img").forEach(img=>img.addEventListener("dragstart",e=>e.preventDefault()));
console.log("🌷 Les Fleurs de Chaimae — Website loaded successfully.");