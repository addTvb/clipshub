"use client";

import { useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { useCpmSliderStore } from "./model/useCpmSliderStore";

interface SplineObject {
  name?: string;
  scale?: { x: number; y: number; z: number };
}

export default function CpmChart() {
  const splineApp = useRef<Application | null>(null);
  const dynamicShape = useRef<SplineObject | null>(null);
  const originalScale = useRef<{ x: number; y: number; z: number } | null>(
    null
  );

  // Refs для social-shape
  const socialShape = useRef<SplineObject | null>(null);
  const originalSocialScale = useRef<{
    x: number;
    y: number;
    z: number;
  } | null>(null);

  const { setChangeHeight, setChangeSocialHeight } = useCpmSliderStore();
  const currentMultiplierRef = useRef<number>(0.4);
  const targetMultiplierRef = useRef<number>(0.4);
  const rafIdRef = useRef<number | null>(null);

  // Refs для анимации social-shape
  const currentSocialMultiplierRef = useRef<number>(0.4);
  const targetSocialMultiplierRef = useRef<number>(0.4);
  const socialRafIdRef = useRef<number | null>(null);

  function onLoad(spline: Application) {
    splineApp.current = spline;

    // Устанавливаем начальный зум для лучшего отображения в контейнере
    spline.setZoom(0.7);

    // Находим объект по имени 'dynamic-shape'
    const shapeObject = spline.findObjectByName("dynamic-shape");

    if (shapeObject) {
      dynamicShape.current = shapeObject;

      // Сохраняем исходный масштаб
      if (shapeObject.scale) {
        originalScale.current = { ...shapeObject.scale };
      }

      // Регистрируем функцию в zustand для использования слайдером
      setChangeHeight(changeHeight);
      // Устанавливаем дефолтное минимальное значение графика сразу
      currentMultiplierRef.current = 0.4;
      targetMultiplierRef.current = 0.4;
      if (originalScale.current && dynamicShape.current?.scale) {
        dynamicShape.current.scale.y = originalScale.current.y * 0.4;
      }
    } else {
      console.error('Object "dynamic-shape" not found in the scene');
    }

    // Находим объект по имени 'social-shape'
    const socialShapeObject = spline.findObjectByName("social-shape");

    if (socialShapeObject) {
      socialShape.current = socialShapeObject;

      // Сохраняем исходный масштаб
      if (socialShapeObject.scale) {
        originalSocialScale.current = { ...socialShapeObject.scale };
      }

      // Регистрируем функцию в zustand для использования слайдером
      setChangeSocialHeight(changeSocialHeight);
      // Устанавливаем дефолтное минимальное значение графика сразу
      currentSocialMultiplierRef.current = 0.4;
      targetSocialMultiplierRef.current = 0.4;
      if (originalSocialScale.current && socialShape.current?.scale) {
        socialShape.current.scale.y = originalSocialScale.current.y * 0.4;
      }
    } else {
      console.error('Object "social-shape" not found in the scene');
    }
  }

  // Простая функция для изменения высоты по оси Y
  // multiplier: 1.0 = исходный размер, 1.5 = увеличение в 1.5 раза, 0.5 = уменьшение вдвое
  function changeHeight(multiplier: number) {
    if (
      !dynamicShape.current ||
      !dynamicShape.current.scale ||
      !originalScale.current
    )
      return;
    // Кладем цель и запускаем анимацию
    targetMultiplierRef.current = Math.max(0.4, Math.min(1.6, multiplier));
    if (rafIdRef.current == null) {
      animateTowardsTarget();
    }
  }

  // Функция для изменения высоты social-shape по оси Y
  // multiplier: 1.0 = исходный размер, 1.5 = увеличение в 1.5 раза, 0.5 = уменьшение вдвое
  function changeSocialHeight(multiplier: number) {
    if (
      !socialShape.current ||
      !socialShape.current.scale ||
      !originalSocialScale.current
    )
      return;
    // Кладем цель и запускаем анимацию
    targetSocialMultiplierRef.current = Math.max(
      0.4,
      Math.min(1.6, multiplier)
    );
    if (socialRafIdRef.current == null) {
      animateTowardsSocialTarget();
    }
  }

  function animateTowardsTarget() {
    if (!dynamicShape.current || !originalScale.current) {
      rafIdRef.current = null;
      return;
    }
    const current = currentMultiplierRef.current;
    const target = targetMultiplierRef.current;
    // LERP
    const next = current + (target - current) * 0.15;
    currentMultiplierRef.current = next;
    dynamicShape.current.scale!.y = originalScale.current.y * next;

    if (Math.abs(target - next) > 0.001) {
      rafIdRef.current = requestAnimationFrame(animateTowardsTarget);
    } else {
      currentMultiplierRef.current = target;
      dynamicShape.current.scale!.y = originalScale.current.y * target;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }

  function animateTowardsSocialTarget() {
    if (!socialShape.current || !originalSocialScale.current) {
      socialRafIdRef.current = null;
      return;
    }
    const current = currentSocialMultiplierRef.current;
    const target = targetSocialMultiplierRef.current;
    // LERP
    const next = current + (target - current) * 0.15;
    currentSocialMultiplierRef.current = next;
    socialShape.current.scale!.y = originalSocialScale.current.y * next;

    if (Math.abs(target - next) > 0.001) {
      socialRafIdRef.current = requestAnimationFrame(
        animateTowardsSocialTarget
      );
    } else {
      currentSocialMultiplierRef.current = target;
      socialShape.current.scale!.y = originalSocialScale.current.y * target;

      if (socialRafIdRef.current) cancelAnimationFrame(socialRafIdRef.current);
      socialRafIdRef.current = null;
    }
  }

  return (
    <div className="h-[350px] sm:h-[520px] relative">
      <Spline
        scene="https://prod.spline.design/t0psrQunCCyv1Gnp/scene.splinecode"
        className="w-full h-full object-contain"
        onLoad={onLoad}
      />
      {/* Невидимый оверлей для отключения взаимодействия со Spline на мобиле */}
      <div 
        className="absolute inset-0 lg:hidden"
        style={{ 
          touchAction: 'pan-y',
          pointerEvents: 'auto',
          background: 'transparent'
        }}
      />
      {/* Скрытие логотипа Spline */}
      <div 
        className="absolute bottom-[10px] right-[20px] w-[140px] h-12 bg-[#010d22] pointer-events-none"
      />
    </div>
  );
}
