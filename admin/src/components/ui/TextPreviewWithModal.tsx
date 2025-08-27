import React, { useState } from "react";
import { Modal } from "antd";

interface TextPreviewWithModalProps {
  text: string;
  previewLength?: number;
  readMoreText?: string;
  className?: string;
}

const TextPreviewWithModal: React.FC<TextPreviewWithModalProps> = ({
  text = "",
  previewLength = 60,
  readMoreText = "Read more",
  className = "",
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!text) return null;
  const preview = text.length > previewLength ? text.slice(0, previewLength) + "..." : text;

  return (
    <>
      {preview}
      {text.length > previewLength && (
        <button
          className={"text-blue-500 ml-1 underline text-xs " + className}
          onClick={() => setModalOpen(true)}
        >
          {readMoreText}
        </button>
      )}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
      >
        <div style={{ whiteSpace: "pre-line" }}>{text}</div>
      </Modal>
    </>
  );
};

export default TextPreviewWithModal;
