import { useEffect, useRef, useState } from "react";

export default () => {
  const videoRef = useRef(null);
  const [taking, setTaking] = useState(true);
  const [imgURL, setImgURL] = useState(null);
  useEffect(() => {
    if (!imgURL) {
      startVideo();
    }
  }, [imgURL]);
  const startVideo = () => {
    const video = videoRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occured: ${err}`);
      });
  };

  function takepicture() {
    const canvas = document.getElementById("canvas");
    if (imgURL) {
      setImgURL(null);
      return;
    }

    const video = videoRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 340;
    canvas.height = (340 * 4) / 3;
    context.drawImage(video, 0, 0, 340, (340 * 4) / 3);

    const data = canvas.toDataURL("image/png");
    setImgURL(data);

    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
  }

  const download = () => {
    const link = document.createElement("a");
    (link.download = "yourPic.png"), (link.href = imgURL), link.click();
  };

  return {
    videoRef,
    imgURL,
    takepicture,
    download
  };
};
