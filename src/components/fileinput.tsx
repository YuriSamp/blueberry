import { acceptedExt, checkType, getFileSizeMB } from '@lib/filetype';
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface FileinputProps {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
  onTypeError: () => void
  onSizeError: () => void
}

const types = ["JPG", "PNG", "AVIF", 'WEBP'];

export const Fileinput = ({ file, setFile, onTypeError, onSizeError }: FileinputProps) => {

  const maxSize = 5

  const validateFile = (file: File) => {
    if (types && !checkType(file, types)) {
      if (onTypeError) { onTypeError() };
      return false;
    }
    if (getFileSizeMB(file.size) > maxSize) {
      if (onSizeError) { onSizeError() };
      return false;
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      setFile(file);
    }
  }

  return (
    <div className='flex flex-col gap-2 pt-4 relative'>
      <label htmlFor="file-upload" className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2] focus:outline-none w-60 text-center cursor-pointer">
        {file === null ? 'Select file' : file.name}
      </label>
      <span className="after:rounded-lg after:top-6 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black" />
      <input
        id="file-upload"
        type="file"
        className='hidden'
        onChange={(e) => handleChange(e)}
        accept={acceptedExt(types)}
        multiple={false}
      />
    </div>
  )
}
