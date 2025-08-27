// made by me 
import React from "react";
import ReactDOM from "react-dom/client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

const ConfirmationDialog = ({
  message,
  resolve,
}: {
  message: string;
  resolve: (value: boolean) => void;
}) => {
  const [open, setOpen] = React.useState(true);

  const handleConfirm = () => {
    setOpen(false);
    resolve(true);
  };

  const handleCancel = () => {
    setOpen(false);
    resolve(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
        <p>{message}</p>
        <DialogFooter>
          <Button onClick={handleCancel} variant="secondary" style={{ backgroundColor: "black", color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="default" style={{ backgroundColor: "#19B6C9", color: "white" }}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const confirmation = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    // Cleanup when promise resolves
    const cleanup = () => {
      root.unmount();
      document.body.removeChild(container);
    };

    // Patch resolve to cleanup after resolving
    const patchedResolve = (value: boolean) => {
      cleanup();
      resolve(value);
    };

    root.render(
      <ConfirmationDialog message={message} resolve={patchedResolve} />
    );
  });
};
