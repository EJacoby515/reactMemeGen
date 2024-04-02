import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://memegenerator-h2ed.onrender.com/api';
const token = '755df95b5f87ff302d60e3424a6bae38a73c8ad3281a98d5';

const MemeService = {
    async uploadImage(file: File, filename: string, userId: string): Promise<AxiosResponse> {
      const formData = new FormData();
      formData.append('filename', filename);
      formData.append('user_id', userId);
  
      // Read the image file as a data URL
      const dataUrl = await readFileAsDataURL(file);
  
      // Extract the base64-encoded data from the data URL
      const base64Data = dataUrl.split(',')[1];
  
      formData.append('image', base64Data);
  
      return axios.post(`${API_URL}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `Bearer ${token}`,
        },
      });
    },
  // Add other methods for additional functionality
};

// Helper function to read a file as a data URL
function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

export default MemeService; 