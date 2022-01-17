
// HEADER의 SEARCH 부분 애니메이션
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click',function(){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus',function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder','통합검색');
});

searchInputEl.addEventListener('blur',function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder','');
});


// HEADER의 badge 부분 애니메이션
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// 스크롤 이벤트 발생 시에 브라우저의 과부하를 줄이기 위해 일정 시간에 한번씩만 이벤트가 실행되도록 하는 라이브러리 lodash
// _.throttle(함수,시간)
window.addEventListener('scroll',_.throttle(function(){
  if(window.scrollY > 500){
    //배지 숨기기
    //gsap.to(요소,지속시간,옵션);
    gsap.to(badgeEl,.6,{
      opacity: 0,
      display: 'none'
    });
    //top버튼 보이기
    gsap.to(toTopEl,.5,{
      x: 0
    });
  }else{
    //배지 보이기
    gsap.to(badgeEl,.6,{
      opacity: 1,
      display: 'block'
    });
    //top버튼 숨기기
    gsap.to(toTopEl,.5,{
      x: 100
    });
  }
},300));


// top버튼 기능 구현
toTopEl.addEventListener('click',function(){
  gsap.to(window,.7,{
    scrollTo: 0
  });
});


// VISUAL의 애니메이션
const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function(fadeEl,index){
  //gsap.to(요소,지속시간,옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,
    opacity: 1
  });
});


// 공지사항 SWIPER 적용
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});


// 프로모션 슬라이드 SWIPER 적용
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


// 프로모션 슬라이드 열고 닫는 토글 버튼
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  if(!isHidePromotion){
    // 숨김 처리!
    promotionEl.classList.add('hide');
  }else{
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
  isHidePromotion = !isHidePromotion;
});


// 비디오 재생 부분 floating이미지 애니메이션 구현
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector,delay,size){
  gsap.to(
    selector, //선택자
    random(1.5, 2.5) //애니메이션 동작 시간 
    ,{ //옵션
      y:size,
      repeat:-1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0,delay)
    }
  );
}
floatingObject('.floating1',1,15);
floatingObject('.floating2',.5,15);
floatingObject('.floating3',1.5,20);


// 화면에서 아이템이 보일 경우를 감지해서 애니메이션을 주는 효과
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl,k){
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 정함
      triggerHook: .8 //viewport가 시작하는 위치가 0, 끝나는 위치가 1임. 그것을 기준으로 영역을 설정
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});


// 풋터 copyright 부분에 연도 계산
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();