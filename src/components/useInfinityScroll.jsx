/* eslint-disable consistent-return */
import { useEffect } from 'react';

function useInfinityScroll(callback) {
  useEffect(() => {
    if (typeof callback !== 'function') return;

    function handleScroll() {
      const bodyHeight = document.querySelector('body').scrollHeight;
      const windowBottomY = window.innerHeight + window.scrollY;

      const hasReachedTheBottomOfThePage = windowBottomY === bodyHeight;

      if (hasReachedTheBottomOfThePage) {
        callback();
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
}

export default useInfinityScroll;
