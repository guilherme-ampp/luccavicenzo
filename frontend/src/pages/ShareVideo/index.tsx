import React from 'react';
import { Title, Form } from './style';

// declaring the function as a const we can type the object more easily
// React.FC = React.FunctionComponent
// Classes were the old way of creating component in React
const ShareVideo: React.FC = () => {
  const recorder = document.getElementById('recorder') as HTMLInputElement;
  const player = document.getElementById('player') as HTMLVideoElement;

  if (recorder) {
    recorder.addEventListener('change', (event: Event) => {
      if (!event?.target) return;
      const inputElement: HTMLInputElement = event?.target as HTMLInputElement;
      if (!inputElement.files) return;
      const file = inputElement.files[0];
      // Do something with the video file.
      player.src = URL.createObjectURL(file);
    });
  }

  return (
    <>
      <Title>Share video</Title>
      <Form method="POST" action="/upload/video" encType="multipart/form-data">
        <div>
          <label>Video:</label>
          <input
            type="file"
            name="file"
            accept="video/*"
            capture="user"
            id="recorder"
          />
        </div>
        <div>
          <input type="submit" name="btn_upload" value="Upload" />
        </div>
      </Form>

      <video id="player" controls />
    </>
  );
};

export default ShareVideo;
