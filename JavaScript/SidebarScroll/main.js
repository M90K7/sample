
  const leftEle = document.querySelector('.left');
  const rightEle = document.querySelector('.right');
  const centerEle = document.querySelector('.center');
  const footerEle = document.querySelector('.footer');
  
  scrollLast = window.pageYOffset || document.documentElement.scrollTop;

window.onscroll = ($event) => {

  const centerRectNow = centerEle.getBoundingClientRect();

  let top = 120;
  let bottom = 0;
  if (centerRectNow.top > 0) {
    top = centerRectNow.top;
  }else {
    top = 0;
  }

  if(centerRectNow.bottom < window.innerHeight) {
    bottom = window.innerHeight - centerRectNow.bottom;
  }

  leftEle.style.top = top + 'px';
  rightEle.style.top = top + 'px';
  leftEle.style.bottom = bottom + 'px';
  rightEle.style.bottom = bottom + 'px';

  // start of scroll
  if(top > 0){
    leftEle.scroll({
      top: 0,
      //behavior: 'smooth'
    });
    rightEle.scroll({
      top: 0,
      //behavior: 'smooth'
    });
    return;
  }

  // end of scroll
  if(centerRectNow.bottom < window.innerHeight){
    leftEle.scroll({
      top: leftEle.scrollHeight,
      //behavior: 'smooth'
    });
    rightEle.scroll({
      top: rightEle.scrollHeight,
      //behavior: 'smooth'
    });
    return;
  }

  const scrollNow = window.pageYOffset || document.documentElement.scrollTop;

  const left_per = (leftEle.scrollHeight + window.innerHeight) / centerRectNow.height;
  const right_per = (rightEle.scrollHeight + window.innerHeight) / centerRectNow.height;

  if (scrollLast < scrollNow) {
    // scroll down
    const sTop = 200;
    leftEle.scroll({
      top: window.scrollY * left_per, //leftEle.scrollTop + sTop,
      behavior: 'smooth'
    });
    rightEle.scroll({
      top: window.scrollY * right_per, // rightEle.scrollTop + sTop,
      behavior: 'smooth'
    });
  } else {
    // scroll up
    const sDown = 200;
    leftEle.scroll({
      top: window.scrollY * left_per, //leftEle.scrollTop - sDown,
      behavior: 'smooth'
    });
    rightEle.scroll({
      top: window.scrollY * right_per, // rightEle.scrollTop - sDown,
      behavior: 'smooth'
    });
  }

  scrollLast = scrollNow;
}

footerEle.style.top  = centerEle.scrollHeight + 'px';

// window.onscroll = ($event) => {
//   var pagH = centerEle.clientHeight - window.outerHeight;
//   var pagT = window.scrollY - centerEle.getBoundingClientRect().top;
//   rightEle.scroll({
//     top: pagT / pagH * (rightEle.scrollHeight - window.scrollY),
//     behavior: 'smooth'
//   });
// };