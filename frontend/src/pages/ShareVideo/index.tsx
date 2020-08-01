/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef } from 'react';
import { Progress } from 'reactstrap';
import axios from 'axios';
import { Title, Form, Video, AnimationProps } from './style';
import tailsFlying from '../../assets/tails_flying.gif';

// declaring the function as a const we can type the object more easily
// React.FC = React.FunctionComponent
// Classes were the old way of creating component in React
const ShareVideo: React.FC = () => {
  const fileInputElement = useRef<HTMLInputElement>(null);
  const [video, setVideo] = useState('');
  const [animationProp, setAnimationProp] = useState<AnimationProps>({
    videoOut: false,
    tailsIn: true,
  });
  const [uploading, setUploading] = useState(false);
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
    setUploading(true);
    setAnimationProp({ videoOut: true, tailsIn: true });
    const data = new FormData();
    data.append('Content-Type', 'multipart/form-data');
    data.append('file', selectedFile);
    axios.post('/upload/video', data, {
      onUploadProgress: (progressEvent) => {
        const value = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadState(value);
        if (value >= 100) {
          setAnimationProp({ videoOut: true, tailsIn: false });
        }
      },
    });
  }

  return (
    <>
      {/* <Title> </Title> */}
      <Form {...animationProp}>
        <input
          type="file"
          name="file"
          accept="video/*"
          capture="user"
          id="recorder"
          onChange={handleInputChange}
          ref={fileInputElement}
        />

        {!video && (
          <button
            type="button"
            onClick={() => fileInputElement?.current?.click()}
          >
            Grave sua mensagem
          </button>
        )}

        {video && !uploading && (
          <button type="button" onClick={handleUploadVideo}>
            Enviar
          </button>
        )}

        {uploadState > 0 && (
          <>
            <div className="div-progress">
              <img src={tailsFlying} alt="Tails!" />
              {/* <span>Enviando</span> */}
            </div>
            <Progress max="100" value={uploadState}>
              {Math.round(uploadState)}%
            </Progress>
          </>
        )}
      </Form>

      {video && <Video id="player" src={video} controls {...animationProp} />}
    </>
  );
};

export default ShareVideo;
