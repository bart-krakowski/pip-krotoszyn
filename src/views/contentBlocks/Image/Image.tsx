import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Figure from "../Figure";
import { useImageObserver } from "./ImageObserverContext";
import { canvasRGB } from "stackblur-canvas";

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
  thumbnail: string;
  width: number;
  height: number;
}

const CONTENT_WIDTH = 552;

const prepareUrl = (src: string, multiplier?: number) => {
  const width =
    multiplier !== undefined
      ? ["w", `${CONTENT_WIDTH * multiplier}`]
      : undefined;

  const paramsArray = [width, ["fm", "jpg"], ["q", "85"]].filter(
    <T extends unknown>(x: T | undefined): x is T => {
      return Boolean(x);
    }
  );

  const query = new URLSearchParams(paramsArray);

  return `${src}?${query.toString()}`;
};

const useImageSrc = (src: string) => {
  return useMemo(() => {
    return {
      maxSrc: `${prepareUrl(src, 2)}`,
      srcSet: `${prepareUrl(src, 1)},
             ${prepareUrl(src, 1.5)} 1.5x,
             ${prepareUrl(src, 2)} 2x`,
    };
  }, [src]);
};

const LazyLoadedImage: FC<ImageProps> = ({
  src: initialSrc,
  alt,
  caption,
  thumbnail,
  width,
  height,
}) => {
  const { maxSrc, srcSet } = useImageSrc(initialSrc);
  const figureRef = useRef<HTMLElement | null>(null);
  const [loadTrigger, setLoadTrigger] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const observer = useImageObserver();

  useEffect(() => {
    const element = figureRef.current;
    if (element && observer) {
      observer.observe(element, () => {
        setLoadTrigger(true);
        observer.unobserve(element);
      });
      return () => {
        observer.unobserve(element);
      };
    }
  }, [observer]);

  return (
    <Figure caption={caption} ref={figureRef}>
      <Placeholder aspectRatio={width ? height / width : 0}>
        <Background />
        <Thumbnail src={thumbnail} alt={alt} />
        {loadTrigger && (
          <FullImage
            src={maxSrc}
            srcSet={srcSet}
            alt={alt}
            visible={isLoaded}
            onLoad={() => {
              setIsLoaded(true);
            }}
          />
        )}
      </Placeholder>
    </Figure>
  );
};

const Placeholder = styled.div<{ aspectRatio: number }>`
  position: relative;
  padding-bottom: ${(p) => p.aspectRatio * 100}%;
  overflow: hidden;
`;

const fullSize = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const FullImage = styled.img<{ visible: boolean }>`
  ${fullSize}
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: opacity 500ms ease-in-out 250ms;
`;

const Background = styled.div`
  ${fullSize}
  background-color: ${(p) => p.theme.palette.greys[100]};
`;

const Canvas = styled.canvas<{ visible: boolean }>`
  ${fullSize}
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
`;

const Thumbnail: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = src;

    image.onload = () => {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvasRGB(canvas, 0, 0, canvas.width, canvas.height, 30);
      setVisible(true);
    };
  }, [src]);

  return (
    <Canvas ref={canvasRef} visible={visible} aria-label={alt} role="img" />
  );
};

export default LazyLoadedImage;
