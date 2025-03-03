import React from "react";
import Tabs from "../components/Tabs";
import CommonActions from "../components/CommonActions";
import useVotes from "../hooks/useVotes"; 
import logClass from "../components/LogList.module.css";

export default function Favourites() {
  const { images, handleAction } = useVotes("favourites", "Favourites");

  return (
    <>
      <Tabs classCss="tabs-container">
        <CommonActions label="FAVOURITES" />
      </Tabs>
      <div className="image-grid-wrapper">
        <div className="image-grid">
          {images.length === 0 ? (

            <p>No favourite images yet!</p>

          ) : (
            images.map((image) => (
              <div key={image.id}>
                <img 
                  src={image.url} 
                  alt="Favourite dog" 
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
