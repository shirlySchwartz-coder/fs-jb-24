import axios from 'axios';
import { useEffect, useState } from "react";

function MainApp() {
  async function handleUploadFile(file) {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://localhost:8000/uploadFile", formData, {
      onUploadProgress: (progressEvent) => {
        console.log(
          "Upload progress: " +
            Math.round(
              (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
            ) +
            "%"
        );
      },
    });
    console.log(res);
  }

  return (
    <div>
      <form>
        <input
          type="file"
          name="name"
          onChange={(e) =>
            handleUploadFile((e.target ).files?.[0])
          }
        />
      </form>
    </div>
  );
}


export default MainApp;
