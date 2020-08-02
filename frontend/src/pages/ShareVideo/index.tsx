/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef } from 'react';
import { Progress } from 'reactstrap';
import api from '../../services/api';
import {
  Title,
  ExitButton,
  Form,
  Video,
  AnimationProps,
  Message,
} from './style';
import tailFlying from '../../assets/tails_flying.gif';
import { useAuth } from '../../hooks/auth';

// declaring the function as a const we can type the object more easily
// React.FC = React.FunctionComponent
// Classes were the old way of creating component in React
const ShareVideo: React.FC = () => {
  const fileInputElement = useRef<HTMLInputElement>(null);
  const [video, setVideo] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [animationProp, setAnimationProp] = useState<AnimationProps>({
    videoOut: false,
    uploadDone: false,
  });
  const [uploading, setUploading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | Blob>('');
  const [uploadState, setUploadState] = useState(0);
  const { phonenumber, signOut } = useAuth();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;
    const file = event.target.files[0];
    // Do something with the video file.
    setVideo(URL.createObjectURL(file));
    setSelectedFile(file);
  }

  async function handleUploadVideo(): Promise<void> {
    setError(false);
    setUploading(true);
    setFinished(false);
    setFailureMessage('');
    setAnimationProp({ videoOut: true, uploadDone: false });
    const data = new FormData();
    data.append('Content-Type', 'multipart/form-data');
    data.append('phonenumber', phonenumber);
    data.append('file', selectedFile);
    await api
      .post('/upload/video', data, {
        onUploadProgress: (progressEvent) => {
          const value = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadState(value);
        },
      })
      .catch((err) => {
        setError(true);
        setFinished(false);
        setUploading(false);
        setUploadState(0);
        setAnimationProp({ videoOut: false, uploadDone: true });
        setFailureMessage(`${err}`);
      })
      .then(() => {
        setFinished(true);
        setAnimationProp({ videoOut: true, uploadDone: true });
      });
  }

  return (
    <>
      <Title>
        {error
          ? 'Whoops! Algo deu errado!'
          : finished
          ? 'Pronto!'
          : uploading
          ? uploadState > 99
            ? 'Quase lá!'
            : 'Enviando ...'
          : 'Envie sua mensagem'}
      </Title>
      <Message>
        {finished ? 'Enviando' : 'Enviado'} de: {phonenumber} {failureMessage}
      </Message>
      <ExitButton type="button" onClick={signOut}>
        Sair
      </ExitButton>
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
            Abrir camera
          </button>
        )}

        {video && !uploading && (
          <button type="button" onClick={handleUploadVideo}>
            {error ? 'Tentar novamente' : 'Enviar'}
          </button>
        )}

        {uploading && (
          <>
            <Progress max="100" value={uploadState}>
              {Math.round(uploadState)}%
            </Progress>
            <div className="div-progress">
              <img src={tailFlying} alt="Tails!" />
            </div>
          </>
        )}
      </Form>

      {(video || error) && (
        <Video id="player" src={video} controls {...animationProp} />
      )}
    </>
  );
};

export default ShareVideo;
