/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef } from 'react';
import { Progress } from 'reactstrap';
import axios from 'axios';
import { Title, Form, Video, AnimationProps } from './style';
import tailFlying from '../../assets/tails_flying.gif';

// declaring the function as a const we can type the object more easily
// React.FC = React.FunctionComponent
// Classes were the old way of creating component in React
const ShareVideo: React.FC = () => {
  const fileInputElement = useRef<HTMLInputElement>(null);
  const [video, setVideo] = useState('');
  const [animationProp, setAnimationProp] = useState<AnimationProps>({
    videoOut: false,
    uploadDone: false,
  });
  const [uploading, setUploading] = useState(false);
  const [finished, setFinished] = useState(false);
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
    setAnimationProp({ videoOut: true, uploadDone: false });
    const data = new FormData();
    data.append('Content-Type', 'multipart/form-data');
    data.append('file', selectedFile);
    axios
      .post('/upload/video', data, {
        onUploadProgress: (progressEvent) => {
          const value = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadState(value);
        },
      })
      .finally(() => {
        setFinished(true);
        setAnimationProp({ videoOut: true, uploadDone: true });
      });
  }

  return (
    <>
      <Title>
        {finished
          ? 'Pronto!'
          : uploading
          ? 'Enviando ...'
          : 'Envie sua mensagem'}
      </Title>
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
            Gravar
          </button>
        )}

        {video && !uploading && (
          <button type="button" onClick={handleUploadVideo}>
            Enviar
          </button>
        )}

        {uploading && (
          <>
            <Progress max="100" value={uploadState}>
              {Math.round(uploadState)}%
            </Progress>
            <div className="div-progress">
              {/* <span>Enviando</span> */}
              <img src={tailFlying} alt="Tails!" />
            </div>
          </>
        )}
      </Form>

      {video && <Video id="player" src={video} controls {...animationProp} />}
    </>
  );
};

export default ShareVideo;
