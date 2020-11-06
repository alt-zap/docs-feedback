import setStyleOnElement from './setStyleOnElement';

function getScrollbarWidth() {
  const body = document.querySelector('body');

  const measureDiv = document.createElement('div');
  setStyleOnElement(measureDiv, {
    width: '100px',
    height: '100px',
    position: 'absolute',
    top: '-9999px',
    overflow: 'scroll',
  });

  body.appendChild(measureDiv);

  const scrollbarWidth = measureDiv.offsetWidth - measureDiv.clientWidth;

  measureDiv.remove();

  return scrollbarWidth;
}

export default getScrollbarWidth;
