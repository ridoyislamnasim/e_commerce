import React, { useState } from "react";

const MediaModal = ({ show, onClose, mediaType, src }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex justify-center items-center">
          {mediaType === "image" ? (
            <img
              src={src}
              alt="popup-media"
              className="max-h-[500px] w-full object-contain rounded-lg"
            />
          ) : mediaType === "video" ? (
            <iframe
              width="100%"
              height="315"
              src={src}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          ) : (
            <p>No media available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
