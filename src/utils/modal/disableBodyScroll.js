import preventHorizontalReflow from './preventHorizontalReflow';

function disableBodyScroll() {
  const body = document.querySelector('body');

  const bodyHeight = parseFloat(
    window.getComputedStyle(body).getPropertyValue('height'),
  );

  const isScrollbarBeingDisplayed = bodyHeight > window.innerHeight;

  if (isScrollbarBeingDisplayed) {
    preventHorizontalReflow();
  }

  body.style.top = `${-window.scrollY}px`;
  body.style.position = 'fixed';
}

export default disableBodyScroll;
