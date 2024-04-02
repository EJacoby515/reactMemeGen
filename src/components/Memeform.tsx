import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import MemeService from '../api/service';

interface MemeFormProps {
  onClose: () => void;
  onImageUpload: () => void;
}

const MemeForm: React.FC<MemeFormProps> = ({ onClose, onImageUpload }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setValue('filename', file.name);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
	try {
	  if (selectedFile) {
		const user_id = '7d9545b3-1980-4bd7-b37d-a5e40341c705';
		await MemeService.uploadImage(selectedFile, data.filename, user_id);
		console.log('Image uploaded successfully!');
		onImageUpload();
	  } else {
		console.log('No image selected.');
	  }
	  onClose();
	} catch (error) {
	  console.log('Error creating data:', error);
	}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="filename">Filename</label>
        <Input
          {...register('filename', { required: true })}
          name="filename"
          placeholder="Filename"
        />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file"
          {...register('file', { required: true })}
          onChange={handleFileChange}
          name="file"
          accept="image/*"
          required
        />
      </div>
      <div className="flex p-1">
        <Button
          className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MemeForm;