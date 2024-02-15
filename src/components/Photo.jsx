import useCamera from "../hooks/useCamera";

function Photo() {
  const { videoRef, takepicture, imgURL, download } = useCamera();
  return (
    <div>
      <div className="media">
        {imgURL ? (
          <img src={imgURL} width={440} height={330} alt="" />
        ) : (
          <video ref={videoRef}></video>
        )}
        <div className="action">
          <button className="take" onClick={takepicture}>
            {imgURL ? "retake" : "take"}
          </button>
          {imgURL && (
            <button onClick={download} className="take">
              download{" "}
            </button>
          )}
        </div>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default Photo;
