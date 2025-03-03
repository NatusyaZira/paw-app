import { useState, useEffect } from "react";

const useVotes = (storageKey, action) => {
  const [images, setImages] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem(storageKey)) || [];
    setImages(storedImages);
    const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(storedLogs);
  }, [storageKey]);

  const handleAction = (imageId, actionType) => {
    // Remove from localStorage when "Remove" action is triggered
    if (actionType === "Remove") {
      const updatedImages = images.filter((image) => image.id !== imageId);
      localStorage.setItem(storageKey, JSON.stringify(updatedImages));
      setImages(updatedImages);

      const newLog = {
        time: new Date().toLocaleTimeString(),
        action: `${actionType}: ${storageKey}`,
        imageId,
      };
      const updatedLogs = [newLog, ...logs];
      setLogs(updatedLogs);
      localStorage.setItem("logs", JSON.stringify(updatedLogs));
    }
  };

  return { images, logs, handleAction };
};

export default useVotes;
