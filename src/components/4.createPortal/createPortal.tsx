import "./index.css";
import { createPortal } from "react-dom";
import React, { useState } from "react";

const Modal = ({ handles }: { handles: { setIsOpen: (isOpen: boolean) => void } }) => {
  return createPortal(
    <div className="modal">
      <div className="modal-header">
        <div className="modal-title">标题</div>
      </div>
      <div className="modal-content">
        <h1>Modal</h1>
      </div>
      <div className="modal-footer">
        <button className="modal-close-button" onClick={() => handles.setIsOpen(false)}>
          关闭
        </button>
        <button className="modal-confirm-button" onClick={() => handles.setIsOpen(false)}>
          确定
        </button>
      </div>
    </div>,
    document.body,
  );
};

const CreatePortal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && <Modal handles={{ setIsOpen }} />}
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "关闭modal" : "打开modal"}</button>
    </div>
  );
};

export default CreatePortal;
