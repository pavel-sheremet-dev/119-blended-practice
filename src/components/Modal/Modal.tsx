import { useEffect } from "react";
import type { Photo } from "../../types/photo";
import styled from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  data: Photo;
}

export default function Modal({ onClose, data }: ModalProps) {
  const onBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackDropClick}
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <img src={data.src.original} alt={data.alt} />
      </div>
    </div>
  );
}
