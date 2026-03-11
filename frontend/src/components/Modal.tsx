import React from "react";
import Button from "./Button";

type ModalProps = {
  show: boolean;
  title: string | undefined;
  children: React.ReactNode;
  submitButton: boolean;
  submitButtonText?: string;
  submitButtonBootstrap?: string;
  secondaryButtonBootstrap?: string;
  secondaryButtonText: string;
  toggleShow: () => void;
  target?: number;
  action?: (id: number) => void;
};

function Modal({
  show,
  title,
  children,
  submitButton,
  submitButtonText,
  submitButtonBootstrap,
  secondaryButtonBootstrap = "btn btn-secondary",
  secondaryButtonText = "Cancel·la",
  toggleShow,
  target = undefined,
  action,
}: ModalProps) {
  return (
    <>
      {show && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <Button
                  bootstrap="btn-close"
                  type="button"
                  action={() => toggleShow()}
                />
              </div>

              <div className="modal-body">{children}</div>

              <div className="modal-footer">
                <Button
                  bootstrap={secondaryButtonBootstrap}
                  type="button"
                  action={() => toggleShow()}
                >
                  {secondaryButtonText}
                </Button>
                {submitButton && (
                  <Button
                    bootstrap={submitButtonBootstrap}
                    type="button"
                    action={() => {
                      if (action && target !== undefined) action(target);
                    }}
                  >
                    {submitButtonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default Modal;
