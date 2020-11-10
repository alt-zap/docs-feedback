function enableBodyScroll() {
  const body = document.querySelector('body');

  const scrollY = Math.abs(parseFloat(body.style.top)) || 0;

  body.style.position = '';
  body.style.top = '';
  body.style.paddingRight = '';

  window.scrollTo(0, scrollY);
}

export default enableBodyScroll;
