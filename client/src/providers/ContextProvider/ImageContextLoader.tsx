import { createContext, ReactNode, useContext, useState } from "react";

interface ImageContextType {
  image: string | null;
  loadImage: (src: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<string | null>(null);

  const loadImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImage(src);
    };
  };

  return (
    <ImageContext.Provider value={{ image, loadImage }}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
