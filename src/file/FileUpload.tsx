import { useRef, useState } from 'react';
import styles from '../component.module.css';

const dPreventer = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = Array.from(event.dataTransfer.files);

    setFiles((prevFiles) => [
      ...prevFiles,
      ...droppedFiles.filter(
        (file) =>
          !prevFiles.some((existingFile) => existingFile.name === file.name)
      ),
    ]);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files as FileList);

    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles.filter(
        (file) =>
          !prevFiles.some((existingFile) => existingFile.name === file.name)
      ),
    ]);
  };

  return (
    <form>
      <div
        className={styles.filebox}
        onDragEnter={dPreventer}
        onDragLeave={dPreventer}
        onDragOver={dPreventer}
        onDrop={handleDrop}
      >
        <label
          htmlFor='fileUpload'
          onClick={() => fileInputRef.current?.click()}
        >
          파일선택
        </label>
        <input
          className={styles['upload-name']}
          accept='file_extension|audio/*|video/*|image/*|media_type'
          placeholder='선택된 파일 없음'
          value={files.map(({ name }) => name).join(',')}
          readOnly={true}
        />
        <input
          type='file'
          name='u_file'
          ref={fileInputRef}
          id='fileUpload'
          onChange={handleFileInput}
          multiple
        />
        <button
          type='button'
          className={styles['btn-delete']}
          onClick={() => setFiles([])}
        >
          삭제
        </button>
      </div>
    </form>
  );
};
