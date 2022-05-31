
const sidebarSelector = [".left", ".right", ".center"]
const footerSelector = ".footer"
const sidebarTop = 100;
const gapWidth = 20;

const scrollModel = {
  sidebarElements: sidebarSelector.map(selector => document.querySelector(selector)),
  footerElement: document.querySelector(footerSelector),
  maxElement: null,
};
// Find Max Height Element
const _maxHeightObj = {};
for (const e of scrollModel.sidebarElements) {
  _maxHeightObj[e.scrollHeight] = e;
}
const _maxEleKey = Math.max(...Object.keys(_maxHeightObj).map(Number));
scrollModel.maxElement = _maxHeightObj[_maxEleKey];

const sidebars = scrollModel.sidebarElements.filter(e => e !== scrollModel.maxElement);

for (const ele of sidebars) {
  ele.style.position = "fixed";
  ele.style.top = sidebarTop;
  ele.style.bottom = 0;
  ele.style.overflowY = "auto";
  ele.classList.add("hidden-scrollbar");
  ele.onscroll = ($event) => {
    scrollModel.maxElement.focus();
    // end of scroll
    // const _rect = ele.getBoundingClientRect();
    //  if(_rect.bottom < window.innerHeight) {
    //     scrollModel.maxElement.focus();
    //  } else if(_rect.top + 1 > 0) {   
    //   scrollModel.maxElement.focus();
    // }
  };
}

scrollLast = window.pageYOffset || document.documentElement.scrollTop;

let centerRect = scrollModel.maxElement.getBoundingClientRect();
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

  for (const e of sidebars) {
    e.style.top = top + 'px';
    e.style.bottom = bottom + 'px';
  }

  // start of scroll
  if(centerRectNow.top + gapWidth > 0){
    for (const e of sidebars){
      e.scroll({
        top: 0,
        //behavior: 'smooth'
      });   
    }
    return false;
  }

  // end of scroll
  if(centerRectNow.bottom < window.innerHeight){
     for (const e of sidebars) {
        scrollModel.maxElement.scrollHeight > e.scrollHeight && e.scroll({
          top: e.scrollHeight,
          //behavior: 'smooth'
        });
     }
    return;
  }

  return true
}

checkTopBottom(centerRect);

window.onscroll = ($event) => {
  
  const centerRectNow = scrollModel.maxElement.getBoundingClientRect();
  if(!checkTopBottom(centerRectNow)){
    return;
  }

  const scrollNow = window.pageYOffset || document.documentElement.scrollTop;

  for (const e of sidebars) {
    const e_per = (e.scrollHeight + window.innerHeight) / (centerRectNow.height + window.innerHeight);   
    if (scrollLast < scrollNow) {
      // scroll down
      (e.scrollTop + e.clientHeight + 1 <= e.scrollHeight) && e.scroll({
        top: window.scrollY * e_per, //leftEle.scrollTop + sTop,
        //behavior: 'smooth'
      });
    } else {
      // scroll up
      e.scrollTop && e.scroll({
        top: window.scrollY * e_per, //leftEle.scrollTop - sDown,
        //behavior: 'smooth'
      });
    }
  }

  scrollLast = scrollNow;
}

scrollModel.footerElement.style.top  = scrollModel.maxElement.scrollHeight + 'px';
