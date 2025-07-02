/* window.alert(); 새로고침하면 경고창 띄움 연결 확인할 때 사용 */
gsap.registerPlugin(ScrollTrigger) 


//** popup */
const btnPopup = document.querySelector('#popup button')
btnPopup.addEventListener('click', function() {
    document.querySelector('#popup').style.display = 'none';
})


/* 헤더 */
// 헤더 스타일 변경 => scroll 클래스 넣었다 뺐다
const header = document.querySelector('#header');
const gnbDep1 = document.querySelectorAll('#gnb .dep1>li');

const searchBtn = document.querySelector('.search-wrap button');
const searchBox = document.querySelector('.search-wrap .search-box');

const langWrap = document.querySelector('.header-util .lang-wrap')
const langBtn = document.querySelector('.header-util .lang-wrap button')

gnbDep1.forEach(dep1 => {
    dep1.addEventListener('mouseenter', () => {
        header.classList.add('scroll');
    });
    dep1.addEventListener('mouseleave', () => {
        header.classList.remove('scroll');
        if(window.scrollY >= header.offsetHeight) {
        header.classList.add('scroll');
    }
    });
});


/* search-btn */


// 스크롤 내려가면 배경고정
// console.log(window.scrollY); => 페이지의 y값 가져옴

window.addEventListener('scroll',() => {
    console.log(window.scrollY);
    // 스크롤이 움직일 때마다 값 받아옴
    if(window.scrollY >= header.offsetHeight) {
        header.classList.add('scroll')
    } else {
        header.classList.remove('scroll')
    }
})


searchBox.style.display = 'none'; // 초기값
searchBtn.addEventListener('click',() => {
    // header.classList.toggle('scroll')
    // searchBtn.classList.toggle('show') => show 클래스를 또 만들어야
    // 토글 직접 작성
    langWrap.classList.remove('active');
    if(searchBox.style.display === 'none') {
        searchBox.style.display = 'flex';
        header.classList.add('scroll');
    } else {
        searchBox.style.display = 'none';
        header.classList.remove('scroll');
    }
    if(window.scrollY >= header.offsetHeight) {
        header.classList.add('scroll');
    } 
});


// lang-btn
langBtn.addEventListener('click', () => {
    langWrap.classList.toggle('active');
    searchBox.style.display = 'none';
})

/* 헤더 scroll => 이전 제작
const header = document.querySelector('#header');
header.addEventListener('mouseenter', function() {
    header.classList.add('scroll')
})
header.addEventListener('mouseleave', function() {
    header.classList.remove('scroll')
})
*/




/* section scroll */
const section = gsap.utils.toArray('#main section');
section.forEach(section => {
    gsap.from(section, {
        y: 100, opacity: 0, duration: 0.5,
        scrollTrigger: {
            trigger: section,
            start: 'top 70%',
        }
    })
});


/* allmenu */

const btnAllmenuOpen = document.querySelector('.allmenu-open')
const btnAllmenuClose = document.querySelector('.allmenu-close')
const allmenu = document.querySelector('.allmenu-popup')
btnAllmenuOpen.addEventListener('click', function() {
    allmenu.style.display = 'flex'; // flex인 css를 block으로 주면 안됨
    document.documentElement.style.overflow = 'hidden';
    langWrap.classList.remove('active');
    searchBox.style.display = 'none';
    if(window.scrollY < header.offsetHeight) {
        header.classList.remove('scroll')
    }
})
btnAllmenuClose.addEventListener('click', function() {
    allmenu.style.display = 'none';
    document.documentElement.style.overflow = 'auto';
})




/* search-wrap 
const searchButton = document.querySelector('.search-wrap>button>i')
const searchBox = document.querySelector('.search-wrap .search-box')
searchButton.addEventListener('click', function() {
    searchBox.classList.toggle('active')
})
*/


/* language 

const btnLang = document.querySelector('.header-util .lang-wrap button')
const langWrap = document.querySelector('.header-util .lang-wrap')

btnLang.addEventListener('click', function() {
    // listLang.style.display = 'block'
    langWrap.classList.toggle('active')
    // searchbox 안보이게 할 필요 있음
})
*/

/* news */
const btnBox = document.querySelectorAll('.btn-box button');
const newsContents = document.querySelectorAll('.tab-contents .cont-box');

btnBox.forEach((btn, i) => {
    // i => index
    btn.addEventListener('click', function(event) {
        // event.preventDefault();
        btnBox.forEach(t => t.classList.remove('active'))
        this.classList.add('active')
        
        // newsContents
        newsContents.forEach(cont => cont.style.display = 'none');
        newsContents[i].style.display = 'block'
    })
})

/* 푸터 */
// const familyBtn = Object(객체).method(명령)
const familyBtn = document.querySelector('#footer .family-site button')
const familyList = document.querySelector('#footer .family-site ul')
familyBtn.addEventListener('click', function() {
    // familyList.style.display = 'block'
    familyList.classList.toggle('on');
})
/* 메인비주얼 스와이퍼 
const mainSwiper = new Swiper('.main-swiper', {
//   speed: 400,
//   spaceBetween: 100,
    autoplay: true,
    effect: 'fade',
    loop: true, //무한반복
    pagination: {
        el:".swiper-pagination",
    },
});
*/

// 메인비주얼 스와이퍼 변경
const progressBar = document.querySelector('.main-swiper .bar');
const playBtn = document.querySelector('.main-swiper .btn-play');
const stopBtn = document.querySelector('.main-swiper .btn-stop');
let progressTimeout;
let pausedAt = 0;
let isPaused = false;
let animationDuration = 3000;

const naviButton = document.querySelectorAll('main-swiper .swiper-navigation-wrap button')

document.documentElement.style.setProperty('--animationDuration',`${animationDuration}ms`) 
// css에 사용할 변수설정 : root {}, html {}
// documentElement => html태그

const mainSwiper = new Swiper('.main-swiper', {
//   speed: 400,
//   spaceBetween: 100,
    autoplay: {
        delay: animationDuration,
    },
    effect: 'fade',
    loop: true, 
    pagination: {
        el:".swiper-pagination",
        clickable: true,
    },
    on: {
        init: () => {resetProgressBar()}, // 초기에 이벤트 한번만 실행
        slideChangeTransitionStart: () => {
            // progress bar animation
            resetProgressBar()
        }
    },
    navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
    },
});

function resetProgressBar() {
    // 범용성, 가독성을 높이기 위해 분리해서 작성
    // 애니메이션
    progressBar.style.animation = 'none';
    progressBar.offsetHeight;
    progressBar.style.animation = `progress ${animationDuration}ms linear`;
    progressTimeout = setTimeout(() => {
        // 2초 뒤에 다음 슬라이드
    }, animationDuration)
}

playBtn.addEventListener('click', () => {
    // 애니메이션 running
    progressBar.style.animationPlayState = 'running';
    // 자동재생 시작
    mainSwiper.autoplay.start();
    
    stopBtn.style.display = 'block';
    playBtn.style.display = 'none';
});
stopBtn.addEventListener('click', () => {
    // 애니메이션 paused => animation-play-stop: paused;
    progressBar.style.animationPlayState = 'paused';
    mainSwiper.autoplay.stop();

    // 플레이 버튼으로 바꿈
    stopBtn.style.display = 'none';
    playBtn.style.display = 'block'; 
});
/*
naviButton.forEach(a => {
    a.addEventListener('click',() => {
    stopBtn.style.display = 'block';
    playBtn.style.display = 'none'; 
    })
})
*/

/** 문제점
 * 스탑버튼
    => 키프레임 애니메이션 : 일시정지
    => 스와이퍼 : 완전정지

 * 플레이 버튼
    => 키프레임 : 남은 시간 플레이
    => 스와이퍼 : 새로 시작

 * 스탑버튼 클릭했을 때의 시간을 기록 => pausedAt

*/



// faculty
// 스와이퍼를 쓰려면 구조 만들기 전에 스와이퍼 복붙
const facultySwiper = new Swiper('.faculty-swiper', {
    loop: true,
    autoplay: {delay: 0}, // 다음 애니메이션 시작 시간과의 간격
    slidesPerView: 'auto', // 화면에 보여질 슬라이드의 갯수를 css에 적용된 크기로
    speed: 2000,
    spaceBetween: 70,
    // // css.faculty-wrap ul {gap: 7rem;}와 같은 효과
    // 연속적으로 자연스럽게 흐르게 하기 => css에 transition-timing-function: linear;
}) 



/* 배너 */ 

// 기존 수업
// 한줄 주석이라 엔터하면 주석 없어짐
/* 
const bannerLink = document.querySelector('.banner-wrap .main-link')
const bannerBar = document.querySelector('.banner-wrap .progress .bar')
bannerLink.addEventListener('mouseover', function() {
    // 애니메이션 실행
    bannerBar.style.animation = 'progress 1s linear';
})
bannerLink.addEventListener('mouseout', function() {
    bannerBar.style.animation = 'none'; //초기화
})
*/ 
// 이벤트가 발생하면 반드시 사용함
// bannerLink.style.width = "500";

// 6/27 배너
const bannerBar = document.querySelector('.banner-wrap .bar');
const bannerLink = document.querySelector('.banner-wrap .main-link');
bannerLink.addEventListener('mouseenter', () => {
    // 애니메이션 초기화
    bannerBar.style.animation = 'none';
    bannerBar.offsetHeight;
    // 요소를 다시 찾아서 아래 animation을 다시 시작

    bannerBar.style.animation = 'progress 1s linear';
});


