import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';

import { toREM } from '@utils';

import styles from '@styles/components/common/ProgressCircle.module.css';

function ProgressCircle(props) {
  const {
    size,
    colorName,
    values = {},
    animation,
    className,
    ...rest
  } = props;

  const {
    min: minValue = 0,
    max: maxValue = 100,
    initial: initialValue = minValue,
    target: targetValue = maxValue,
    unit = '%',
  } = values;

  const {
    duration: animationDuration,
    delay: animationDelay = 0,
  } = animation;

  const strokeWidth = useMemo(() => {
    const diameterToStrokeWidthRatio = 1 / 11;

    return size * diameterToStrokeWidthRatio;
  }, [size]);

  const circleRadius = useMemo(() => (
    (size - strokeWidth) / 2
  ), [size, strokeWidth]);

  const initialDashoffset = useMemo(() => (
    (2 * Math.PI * circleRadius).toFixed(1)
  ), [circleRadius]);

  const foregroundCircleRef = useRef(null);
  const progressValueRef = useRef(null);

  const setupProgressAnimation = useCallback(() => {
    const targetFillPercentage = targetValue / (maxValue - minValue);
    const targetDashoffset = Math.max(
      initialDashoffset * (1 - targetFillPercentage),
      0,
    ).toFixed(1);
    const totalDistanceToExpand = initialDashoffset - targetDashoffset;

    function updateProgressValue(currentDashoffset) {
      const expandedDistance = initialDashoffset - currentDashoffset;
      const expansionPercentage = expandedDistance / totalDistanceToExpand;

      const currentPercentage = targetFillPercentage * expansionPercentage;

      if (progressValueRef.current) {
        progressValueRef.current.innerText = !Number.isNaN(currentPercentage)
          ? (currentPercentage * 100).toFixed(1)
          : 0;
      }
    }

    function runProgressAnimation() {
      if (foregroundCircleRef.current) {
        foregroundCircleRef.current.style.strokeDashoffset = (
          `${targetDashoffset}px`
        );
      }

      const intervalDuration = 25;

      const interval = setInterval(() => {
        if (!foregroundCircleRef.current) {
          clearInterval(interval);
          return;
        }

        const currentDashoffset = parseFloat(
          window
            .getComputedStyle(foregroundCircleRef.current)
            .getPropertyValue('stroke-dashoffset'),
        ).toFixed(1);

        updateProgressValue(currentDashoffset);

        if (currentDashoffset === targetDashoffset) {
          clearInterval(interval);
        }
      }, intervalDuration);
    }

    setTimeout(runProgressAnimation, animationDelay);
  }, [maxValue, minValue, targetValue, initialDashoffset, animationDelay]);

  useEffect(setupProgressAnimation, [setupProgressAnimation]);

  return (
    <div className={clsx(styles.progressCircle, className)} {...rest}>
      <svg
        className={styles.circleContainer}
        style={{
          width: `${toREM(size)}rem`,
          height: `${toREM(size)}rem`,
        }}
      >
        <circle
          className={clsx(
            styles.circle,
            styles.backgroundCircle,
          )}
          style={{
            strokeDasharray: `${initialDashoffset}px`,
            strokeWidth,
          }}
          cx="50%"
          cy="50%"
          r={circleRadius}
        />
        <circle
          ref={foregroundCircleRef}
          className={clsx(
            styles.circle,
            styles.foregroundCircle,
            styles[colorName],
          )}
          style={{
            strokeDasharray: `${initialDashoffset}px`,
            strokeDashoffset: `${initialDashoffset}px`,
            strokeWidth,
            transition: `stroke-dashoffset ${animationDuration}ms`,
          }}
          cx="50%"
          cy="50%"
          r={circleRadius}
        />
      </svg>
      <div className={styles.progressValueOuterContainer}>
        <div className={styles.progressValueInnerContainer}>
          <h4 ref={progressValueRef} className={styles.progressValue}>
            {initialValue}
          </h4>
          <span className={styles.progressSymbol}>
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressCircle;
