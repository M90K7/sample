
const containerEle = document.querySelector('.container');
const leftEle = document.querySelector('.left');
const rightEle = document.querySelector('.right');
const centerEle = document.querySelector('.center');
const footerEle = document.querySelector('.footer');

scrollLast = window.pageYOffset || document.documentElement.scrollTop;

let centerRect = centerEle.getBoundingClientRect();  
const gapWidth = 20;
const containerTop = centerRect.top + gapWidth;

const checkTopBottom = (centerRectNow) => {

  let bottom = 0;
  let top = containerTop;
  if (centerRectNow.top > 0) {
    top = centerRectNow.top;
  } else {
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
  if(centerRectNow.top + gapWidth > 0){
    leftEle.scroll({
      top: 0,
      //behavior: 'smooth'
    });
    rightEle.scroll({
      top: 0,
      //behavior: 'smooth'
    });
    return false;
  }

  return true
}

checkTopBottom(centerRect);



window.onscroll = ($event) => {
  
  const centerRectNow = centerEle.getBoundingClientRect();
  if(!checkTopBottom(centerRectNow)){
    return;
  }
  
  // start of scroll
  // if(top > 0){
  //   leftEle.scroll({
  //     top: 0,
  //     //behavior: 'smooth'
  //   });
  //   rightEle.scroll({
  //     top: 0,
  //     //behavior: 'smooth'
  //   });
  //   return;
  // }

  // end of scroll
  // if(centerRectNow.bottom < window.innerHeight){
  //   leftEle.scroll({
  //     top: leftEle.scrollHeight,
  //     //behavior: 'smooth'
  //   });
  //   rightEle.scroll({
  //     top: rightEle.scrollHeight,
  //     //behavior: 'smooth'
  //   });
  //   return;
  // }

  const scrollNow = window.pageYOffset || document.documentElement.scrollTop;

  const left_per = (leftEle.scrollHeight + window.innerHeight) / (centerRectNow.height + window.innerHeight);
  const right_per = (rightEle.scrollHeight + window.innerHeight) / (centerRectNow.height + window.innerHeight);

  if (scrollLast < scrollNow) {
    // scroll down
    (leftEle.scrollTop + leftEle.clientHeight + 1 <= leftEle.scrollHeight) && leftEle.scroll({
      top: window.scrollY * left_per, //leftEle.scrollTop + sTop,
      //behavior: 'smooth'
    });
    (rightEle.scrollTop + rightEle.clientHeight + 1 <= rightEle.scrollHeight) && rightEle.scroll({
      top: window.scrollY * right_per, // rightEle.scrollTop + sTop,
      //behavior: 'smooth'
    });
  } else {
    // scroll up
    leftEle.scrollTop && leftEle.scroll({
      top: window.scrollY * left_per, //leftEle.scrollTop - sDown,
      //behavior: 'smooth'
    });
    rightEle.scrollTop && rightEle.scroll({
      top: window.scrollY * right_per, // rightEle.scrollTop - sDown,
      //behavior: 'smooth'
    });
  }

  scrollLast = scrollNow;
}

window.onscroll(); 

footerEle.style.top  = centerEle.scrollHeight + 'px';

// window.onscroll = ($event) => {
//   var pagH = centerEle.clientHeight - window.outerHeight;
//   var pagT = window.scrollY - centerEle.getBoundingClientRect().top;
//   rightEle.scroll({
//     top: pagT / pagH * (rightEle.scrollHeight - window.scrollY),
//     behavior: 'smooth'
//   });
// };