import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../NavbarPublic";
import "./styles/gallery.css";
import ImageDisplay from "./ImageDisplay";
import GalleryContainer from "../GalleryContainer";
import "./../../components/font.css";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("https://commission.pythonanywhere.com/api/photos/tasks/")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="gallery-container">
        <div className="gallery-subcontainer">
          <h1 className="welcome">Welcomeeeeeeeee to the Gallery</h1>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              width: "100%",
              flex: 1,
            }}
          >
            <GalleryContainer images={images} showButtons={false} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
