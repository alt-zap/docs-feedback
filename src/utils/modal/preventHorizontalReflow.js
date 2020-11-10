import { getScrollbarWidth } from '@utils';

function preventHorizontalReflow() {
  const body = document.querySelector('body');

  const scrollbarWidth = getScrollbarWidth();
  body.style.paddingRight = `${scrollbarWidth}px`;
}

export default preventHorizontalReflow;
