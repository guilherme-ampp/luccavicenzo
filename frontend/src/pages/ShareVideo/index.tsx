/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Progress } from 'reactstrap';
import axios from 'axios';
import { Title, Form, Video } from './style';

// declaring the function as a const we can type the object more easily
// React.FC = React.FunctionComponent
// Classes were the old way of creating component in React
const ShareVideo: React.FC = () => {
  const [video, setVideo] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | Blob>('');
  const [uploadState, setUploadState] = useState(0);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;
    const file = event.target.files[0];
    // Do something with the video file.
    setVideo(URL.createObjectURL(file));
    setSelectedFile(file);
  }

  function handleUploadVideo(): void {
    const data = new FormData();
    data.append('Content-Type', 'multipart/form-data');
    data.append('file', selectedFile);
    axios.post('/upload/video', data, {
      onUploadProgress: (progressEvent) => {
        setUploadState((progressEvent.loaded / progressEvent.total) * 100);
      },
    });
  }

  return (
    <>
      <Title> </Title>
      <Form>
        <>
          <input
            type="file"
            name="file"
            accept="video/*"
            capture="user"
            id="recorder"
            onChange={handleInputChange}
          />
          {!video && <label htmlFor="recorder">Grave sua mensagem</label>}
        </>

        {video && (
          <button type="button" onClick={handleUploadVideo}>
            Enviar
          </button>
        )}

        {uploadState > 0 && (
          <Progress max="100" color="green" value={uploadState}>
            {Math.round(uploadState)}%
          </Progress>
        )}
      </Form>

      {video && <Video id="player" src={video} controls />}
    </>
  );
};

export default ShareVideo;
