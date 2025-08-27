import React, { useState } from "react";
import Image from "next/image";
import { FaRegEye, FaTimes } from "react-icons/fa";

interface PreviewImageProps {
  src: string;
  alt?: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ src, alt = "Image preview" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <Image
        src={src}
        alt={alt}
        height={60}
        width={60}
        className="object-contain w-[60px] h-[60px] cursor-pointer"
      />

      {/* Hover Icon */}
      {isHovered && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={toggleModal}
        >
          <FaRegEye className="w-6 h-6 text-black" />
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="relative bg-white p-4 rounded-lg max-w-full max-h-[80vh] overflow-hidden">
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-black text-xl"
              onClick={toggleModal}
            >
              <FaTimes />
            </button>

            {/* Image */}
            <img
              src={src}
              alt={alt}
              className="object-contain w-auto h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewImage;
