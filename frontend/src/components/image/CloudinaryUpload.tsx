import { Heading } from "@chakra-ui/react";
import React from "react";
import utilService from "../../services/util-service";

const CloudinaryUpload = () => {
  let myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "hzxyensd5",
      uploadPreset: "aoh4fpwm",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
      }
    }
  );

  Document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );
  return (
    <div>
      <Heading marginTop={utilService.HEADER_HEIGHT}>sdfgdagfdafgadf</Heading>
      <button id="upload_widget" className="cloudinary-button">
        Upload files
      </button>
    </div>
  );
};

export default CloudinaryUpload;
