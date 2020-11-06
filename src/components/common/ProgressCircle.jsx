import React, { useEffect } from 'react';
import clsx from 'clsx';

import { toREM } from '../../utils';

import styles from '../../styles/components/common/ProgressCircle.module.css';

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

  function getStrokeWidth(circleDiameter) {
    const diameterToStrokeWidthRatio = 1 / 11;

    return circleDiameter * diameterToStrokeWidthRatio;
  }

  const circleRadius = (size - getStrokeWidth(size)) / 2;
  const initialDashoffset = (2 * Math.PI * circleRadius).toFixed(1);

  function setupProgressAnimation() {
    const foregroundCircle = document
      .querySelector(`.${styles.foregroundCircle}`);
    const progressValueElement = document
      .querySelector(`.${styles.progressValue}`);

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

      progressValueElement.innerText = !Number.isNaN(currentPercentage)
        ? (currentPercentage * 100).toFixed(1)
        : 0;
    }

    function runProgressAnimation() {
      foregroundCircle.style.strokeDashoffset = `${targetDashoffset}px`;

      const intervalDuration = 25;

      const interval = setInterval(() => {
        const currentDashoffset = parseFloat(
          window
            .getComputedStyle(foregroundCircle)
            .getPropertyValue('stroke-dashoffset'),
        ).toFixed(1);

        updateProgressValue(currentDashoffset);

        if (currentDashoffset === targetDashoffset) {
          clearInterval(interval);
        }
      }, intervalDuration);
    }

    setTimeout(runProgressAnimation, animationDelay);
  }

  useEffect(setupProgressAnimation, [values, animation]);

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
          style={{ strokeDasharray: `${initialDashoffset}px` }}
          cx="50%"
          cy="50%"
          r={circleRadius}
        />
        <circle
          className={clsx(
            styles.circle,
            styles.foregroundCircle,
            styles[colorName],
          )}
          style={{
            strokeDasharray: `${initialDashoffset}px`,
            strokeDashoffset: `${initialDashoffset}px`,
            transition: `stroke-dashoffset ${animationDuration}ms`,
          }}
          cx="50%"
          cy="50%"
          r={circleRadius}
        />
      </svg>
      <div className={styles.progressValueOuterContainer}>
        <div className={styles.progressValueInnerContainer}>
          <h4 className={styles.progressValue}>
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
