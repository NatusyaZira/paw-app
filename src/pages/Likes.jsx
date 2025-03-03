import React from "react";
import Tabs from "../components/Tabs";
import CommonActions from "../components/CommonActions";
import useVotes from "../hooks/useVotes"; 

export default function Likes() {
  const { images, handleAction } = useVotes("likes", "Likes");

  return (
    <>
      <Tabs classCss="tabs-container">
        <CommonActions label="LIKES" />
      </Tabs>
      <div className="image-grid-wrapper">
        <div className="image-grid">
          {images.length === 0 ? (
            <p>No liked images yet!</p>
          ) : (
            images.map((image) => (
              <div key={image.id} className="image-container">
                <img 
                  src={image.url} 
                  alt="Liked dog" 
                  width="200" 
                  className="item-img" 
                  onClick={() => handleAction(image.id, "Remove")}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
