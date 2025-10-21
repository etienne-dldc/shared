import { useState } from "react";
import { Button } from "../../shared/components/button/Button";
import { Modal } from "../../shared/components/popovers/Modal";

export default function ModalPlayground() {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      disclosure={<Button onClick={() => setOpen(true)}>Open</Button>}
      title="Modal Title"
      open={open}
      setOpen={setOpen}
    >
      <div className="p-4">This is the modal content.</div>
    </Modal>
  );
}
