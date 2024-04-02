import { useState, useEffect } from 'react';
import MemeTable from '../components/MemeTable';
import ImageGallery from '../components/ImageGallery';
import { server_calls } from '../api/server';
import distractedbf from '../assets/images/Distracted-Boyfriend.jpeg'
import hotlineBling from '../assets/images/Drake-Hotline-Bling.jpeg'
import exitRamp from '../assets/images/Left-Exit-12-Off-Ramp.jpeg'
import simply from '../assets/images/One-Does-Not-Simply.jpeg'
import Pooh from '../assets/images/Tuxedo-Winnie-The-Pooh.jpeg'
import Buttons from '../assets/images/Two-Buttons.jpeg'
import faceOne from '../assets/images/istockphoto-538665020-612x612.jpeg'
import Note from '../assets/images/passnote.jpeg'
import spongeBob from '../assets//images/spongebob.jpeg'
import Mcmahon from '../assets/images/vincemcmahon.jpeg'
import faceTwo from '../assets/images/face.jpeg'
import Stonks from '../assets/images/stonks.jpeg'

interface CustomImageData {
  id: string;
  img: string;
  title: string;
}

const staticImageData: CustomImageData[] = [
  {
    id: '1',
    img: distractedbf,
    title: 'distracted bf',
  },
  {
    id: '2',
    img: hotlineBling,
    title: 'Hotline Bling',
  },
  {
    id: '3',
    img: exitRamp,
    title: 'Left Exit',
  },
  {
    id: '4',
    img: simply,
    title: 'Dont Simply',
  },
  {
    id: '5',
    img: Pooh,
    title: 'Winnie the Pooh',
  },
  {
    id: '6',
    img: Buttons,
    title: 'Two Buttons',
  },
  {
    id: '7',
    img: faceOne,
    title: 'Weird Face',
  },
  {
    id: '8',
    img: Note,
    title: 'Pass Note',
  },
  {
    id: '9',
    img: spongeBob,
    title: 'Sponge Bob',
  },
  {
    id: '10',
    img: Mcmahon,
    title: 'Vince Mcmoahon',
  },
  {
    id: '11',
    img: faceTwo,
    title: 'Face',
  },
  {
    id: '12',
    img: Stonks,
    title: 'Stonks',
  }
];

function Meme() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [uploadedImageData, setUploadedImageData] = useState<CustomImageData[]>([]);

  useEffect(() => {
    fetchUploadedImageData();
  }, []);

  const fetchUploadedImageData = async () => {
    try {
      const result = await server_calls.get();
      if (result.images && Array.isArray(result.images)) {
        const uploadedImages = result.images.map((image: any) => ({
          id: image.id,
          title: image.filename,
          img: `data:image/jpeg;base64,${image.data}`,
        }));
        setUploadedImageData(uploadedImages);
      } else {
        console.log('Invalid response data:', result);
        setUploadedImageData([]);
      }
    } catch (error) {
      console.log('Error fetching uploaded image data:', error);
      setUploadedImageData([]);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  const handleImageUpload = () => {
    fetchUploadedImageData();
  };

  const handleUpdate = async (imageId: string, updatedData: any) => {
    try {
      console.log('updating image with data:', updatedData);
      const result = await server_calls.update(imageId, updatedData);
      console.log('Image updated successfully:', result);
      fetchUploadedImageData();
    } catch (error) {
      console.log('Error updating image:', error);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      const result = await server_calls.delete(imageId);
      console.log('Image deleted successfully:', result);
      fetchUploadedImageData();
    } catch (error) {
      console.log('Error deleting image:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 z-40">
       <MemeTable
      selectedImage={selectedImage}
      imageData={[...staticImageData, ...uploadedImageData]}
      onImageUpload={handleImageUpload}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
      <ImageGallery
        selectedImage={selectedImage}
        onImageClick={handleImageClick}
        staticImageData={staticImageData}
        uploadedImageData={uploadedImageData}
      />
    </div>
  );
}

export default Meme;

