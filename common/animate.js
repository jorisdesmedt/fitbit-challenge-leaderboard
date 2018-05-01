export const animateArc = (from, to, element) => {
  if (!isNaN(from) && !isNaN(to) && from !== to) {
    let current = from;
    let growing = from < to;
    const stepSize = growing ? Math.floor((to - from) / 10) : Math.floor((from - to) / 10);
    const changeArc = () => {
      if ((growing && current < to) || (!growing && current > to))  {
        if (growing) {
          current += Math.min( stepSize, to - current);  
        } else {
          current -= Math.min( stepSize, current - to);
        }
      
        element.sweepAngle = current;
        requestAnimationFrame(changeArc);
      }
    }
    requestAnimationFrame(changeArc);  
  }
}

export const fadeInAndOut = (element, startIn, showTime) => {
  setTimeout(() => {
        element.style.display = 'inline';
        element.animate('enable');        
        setTimeout(() => {
          element.style.display = 'none';
        }, showTime);
      }, startIn)
}