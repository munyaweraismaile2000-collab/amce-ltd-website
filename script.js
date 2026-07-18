
  (function(){
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if(!menuBtn || !mobileNav) return;
    menuBtn.addEventListener('click', function(){
      const isOpen = mobileNav.classList.toggle('open');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  })();

  (function(){
    const track = document.getElementById('carouselTrack');
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const carousel = document.getElementById('siteCarousel');
    if(!track || !dotsWrap || !prevBtn || !nextBtn || !carousel) return;

    const slides = Array.from(track.children);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let timer = null;

    slides.forEach(function(_, i){
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function(){ goTo(i); });
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render(){
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function(d, i){ d.classList.toggle('active', i === index); });
    }
    function goTo(i){
      index = (i + slides.length) % slides.length;
      render();
      restartAutoplay();
    }
    function next(){ goTo(index + 1); }
    function prev(){ goTo(index - 1); }
    function restartAutoplay(){
      if(reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    carousel.addEventListener('mouseenter', function(){ clearInterval(timer); });
    carousel.addEventListener('mouseleave', restartAutoplay);

    let touchStartX = 0;
    track.addEventListener('touchstart', function(e){ touchStartX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', function(e){
      const dx = e.changedTouches[0].clientX - touchStartX;
      if(Math.abs(dx) > 40){ dx < 0 ? next() : prev(); }
    }, {passive:true});

    render();
    restartAutoplay();
  })();