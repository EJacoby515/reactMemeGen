import Button from "./Button";
import Input from './Input';
import { useForm } from "react-hook-form";
import { server_calls } from "../api/server";
import { useDispatch } from "react-redux";
import { chooseFilename } from "../redux/slices/RootSlices";

interface MemeFormProps {
  onClose: () => void;
}

const MemeForm = (props: MemeFormProps) => {
  const { register, handleSubmit } = useForm({});
  const dispatch = useDispatch();

  const onSubmit = async (data: any, event: any) => {
    // Hardcoded user_id
    const user_id = '7d9545b3-1980-4bd7-b37d-a5e40341c705';

    // Dispatch action to choose filename
    dispatch(chooseFilename(data.filename));

    const formData = new FormData();
      formData.append('filename', data.filename);
      formData.append('user_id', user_id);
      formData.append('file',data.file[0]);
      console.log(formData);
    await server_calls.createWithFormData(formData);

    // Reset the form
    event.target.reset();

    // Close the form
    props.onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="filename">Filename</label>
        <Input {...register('filename')} name='filename' placeholder='Filename' />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input type="file" {...register('file')} name='file' />
      </div>
      <div className="flex p-1">
        <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded  hover:bg-slate-800 text-white">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MemeForm;
