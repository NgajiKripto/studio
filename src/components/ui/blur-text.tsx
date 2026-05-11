"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type AnimationValue = string | number;
type AnimationSnapshot = Record<string, AnimationValue>;

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (from: AnimationSnapshot, steps: AnimationSnapshot[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))]);

  const firstDefinedByKey = new Map<string, AnimationValue>();
  keys.forEach((key) => {
    const sourceValue = from[key];
    if (sourceValue !== undefined) {
      firstDefinedByKey.set(key, sourceValue);
      return;
    }

    for (const step of steps) {
      const stepValue = step[key];
      if (stepValue !== undefined) {
        firstDefinedByKey.set(key, stepValue);
        break;
      }
    }
  });

  const keyframes: Record<string, AnimationValue[]> = {};
  keys.forEach((key) => {
    const firstDefined = firstDefinedByKey.get(key);
    if (firstDefined === undefined) return;

    const values: AnimationValue[] = [firstDefined];

    steps.forEach((step) => {
      values.push(step[key] ?? values[values.length - 1]);
    });

    keyframes[key] = values;
  });
  return keyframes;
};

const buildTimes = (stepCount: number) => {
  if (stepCount <= 1) return [0];
  return Array.from({ length: stepCount }, (_, index) => index / (stepCount - 1));
};

const NON_BREAKING_SPACE = "\u00A0";

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = buildTimes(stepCount);
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

  return (
    <span ref={ref} className={className}>
      {elements.map((segment, index) => {
        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times,
              delay: (index * delay) / 1000,
              ease: easing,
            }}
            className="inline-block"
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment}
            {animateBy === "words" && index < elements.length - 1 ? NON_BREAKING_SPACE : ""}
          </motion.span>
        );
      })}
    </span>
  );
}
