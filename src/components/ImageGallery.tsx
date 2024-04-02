import React from 'react';

interface CustomImageData {
  id: string;
  img: string;
  title: string;
}

interface ImageGalleryProps {
  selectedImage: number | null;
  onImageClick: (index: number) => void;
  staticImageData: CustomImageData[];
  uploadedImageData?: CustomImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  selectedImage,
  onImageClick,
  staticImageData,
  uploadedImageData,
}) => {
  const combinedImageData = [...staticImageData, ...(uploadedImageData || [])];

  const isImageSelected = (index: number): boolean => selectedImage === index;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {combinedImageData.map((item, index) => (
        <div
          key={item.id || index}
          className="relative cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <img src={item.img} alt={item.title} loading="lazy" className="w-full h-auto" />
          {isImageSelected(index) && (
            <div className="absolute inset-0 bg-white opacity-75 rounded-lg">
              <svg
                className="absolute inset-0 w-full h-full text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white py-2 px-4">
            <p className="text-sm truncate">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;