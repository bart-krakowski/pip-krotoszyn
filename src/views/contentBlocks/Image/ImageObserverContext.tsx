import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface Observer {
  observe: (element: Element, callback: () => void) => void;
  unobserve: (element: Element) => void;
}

const ImageObserverContext = createContext<Observer | null>(null);

export const useImageObserver = () => {
  const observer = useContext(ImageObserverContext);

  return observer;
};

const ImageObserver: FC = ({ children }) => {
  const observerRef = useRef<IntersectionObserver>();
  const registeredImages = useRef<{ [key in keyof any]: () => void }>({});
  const [contextValue, setContextValue] = useState<Observer | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((props) => {
      props.forEach((element) => {
        if (element.isIntersecting) {
          const symbolRef: symbol = (element.target as any).symbolRef;

          if (symbolRef) {
            registeredImages.current[(symbolRef as unknown) as string]?.();
          }
        }
      });
    });

    const observe = (element: Element, callback: () => void) => {
      (element as any).symbolRef = Symbol();

      registeredImages.current[(element as any).symbolRef] = callback;
      observerRef.current?.observe(element);
    };

    const unobserve = (element: Element) => {
      delete registeredImages.current[(element as any).symbolRef];
      observerRef.current?.unobserve(element);
    };

    setContextValue({
      observe,
      unobserve,
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <ImageObserverContext.Provider value={contextValue}>
      {children}
    </ImageObserverContext.Provider>
  );
};

export default ImageObserver;
