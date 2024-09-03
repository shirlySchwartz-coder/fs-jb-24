import vars from '../../utils/Variants';
import './LoadPic.css';

export function LoadPic(): JSX.Element {
  return (
    <div className='LoadPic'>
      <h2>Load Pic</h2>
      <div className='LoadPic'>
        <form
          id='uploadForm'
          action={vars.UPLOAD_PIC_URL}
          method='post'
          encType='multipart/form-data'
        >
          <input type='file' name='sampleFile' />
          <input type='submit' value='Upload!' />
        </form>
      </div>
    </div>
  );
}
