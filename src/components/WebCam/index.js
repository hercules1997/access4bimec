import { useRef, useState } from "react";

// import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  ContainerItems,
  ContainerWebCam,
  ButtonOpenCam,
  WebcamStyle,
  ButtonStyle,
} from "./style";
// import { PopUp } from "../PopUp";

export const WebCam = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openCamera = () => {
    setShowCamera(true);
  };

  const closeCamera = () => {
    setCapturedImage(null);
    setShowCamera(false);
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({
        width: 500,
        height: 300,
      });
      setCapturedImage(imageSrc);
    }

  };

  // const openPopup = () => {
  //   setIsPopupOpen(true);
  // };
  // const closePopup = () => {
  //   setIsPopupOpen(false);
  // };

  const saveCapturedImage = () => {
    if (capturedImage) {
      // Crie um elemento de âncora.
      const a = document.createElement("a");

      // Defina o atributo href do elemento de âncora com a imagem capturada.
      a.href = capturedImage;

      // Defina o atributo download para o nome do arquivo desejado.
      a.download = "captured_image.jpeg"; // Defina o nome do arquivo como desejar.

      // Dispare um evento de clique no elemento de âncora para iniciar o download.
      a.click();
    }
    closeCamera();
  };

  return (
    <ContainerItems>
      <div>{capturedImage && <img src={capturedImage} alt="Captured" />}</div>
      {!showCamera ? (
        <ButtonOpenCam onClick={openCamera}>
          <AddAPhotoIcon />
        </ButtonOpenCam>
      ) : (
        <ContainerWebCam>
          <WebcamStyle
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <ContainerWebCam>
            <div>
              <ButtonStyle type="button" onClick={captureImage}>
                Tirar foto
              </ButtonStyle>
              <ButtonStyle type="button" onClick={saveCapturedImage}>
                Salvar Imagem
              </ButtonStyle>
            </div>
          </ContainerWebCam>
        </ContainerWebCam>
      )}
    </ContainerItems>
  );
};
