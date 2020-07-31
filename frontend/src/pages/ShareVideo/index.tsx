import React, { useState } from 'react';
import { Title, Form, Video } from './style';

// declaring the function as a const we can type the object more easily
// React.FC = React.FunctionComponent
// Classes were the old way of creating component in React
const ShareVideo: React.FC = () => {
  const [video, setVideo] = useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;
    const file = event.target.files[0];
    // Do something with the video file.
    setVideo(URL.createObjectURL(file));
  }

  return (
    <>
      <Title> </Title>
      <Form
        method="POST"
        action="/upload/video"
        encType="multipart/form-data"
        id="formUpload"
      >
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
          <button type="submit" form="formUpload">
            Enviar
          </button>
        )}
      </Form>

      {video && <Video id="player" src={video} controls />}
    </>
  );
};

export default ShareVideo;
