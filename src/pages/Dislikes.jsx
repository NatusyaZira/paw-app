import React from "react";
import Tabs from "../components/Tabs";
import CommonActions from "../components/CommonActions";
import useVotes from "../hooks/useVotes"; 

export default function Dislikes() {
  const { images, logs, handleAction } = useVotes("dislikes", "Dislikes");

  return (
    <>
      <Tabs classCss="tabs-container">
        <CommonActions label="DISLIKES" />
      </Tabs>
      <div className="image-grid-wrapper">
        <div className="image-grid">
          {images.length === 0 ? (
            <p>No disliked images yet!</p>
          ) : (
            images.map((image) => (
              <div key={image.id} className="image-container">
                <img
                  src={image.url}
                  onClick={() => handleAction(image.id, "Remove")}
                  alt="Disliked dog"
                  className="item-img"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
