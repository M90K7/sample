
  leftEle = document.querySelector('.left');
  rightEle = document.querySelector('.right');
  centerEle = document.querySelector('.center');
  
  scrollLast = window.pageYOffset || document.documentElement.scrollTop;

window.onscroll = ($event) => {

  const centerRectNow = centerEle.getBoundingClientRect();

  let top = 120;
  if (centerRectNow.top > 0) {
    top = centerRectNow.top;
  }else {
    top = 0;
  }

  leftEle.style.top = top + 'px';
  rightEle.style.top = top + 'px';

  const scrollNow = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollLast < scrollNow) {
    // scroll down
    const sTop = 200;
    leftEle.scroll({
      top: leftEle.scrollTop + sTop,
      behavior: 'smooth'
    });
    rightEle.scroll({
      top: leftEle.scrollTop + sTop,
      behavior: 'smooth'
    });
  } else {
    // scroll up
    const sDown = 200;
    leftEle.scroll({
      top: leftEle.scrollTop - sDown,
      behavior: 'smooth'
    });
    rightEle.scroll({
      top: leftEle.scrollTop - sDown,
      behavior: 'smooth'
    });
  }

  scrollLast = scrollNow;
}