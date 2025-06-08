import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../button/Button";
import { Modal } from "./Modal";

export default function ModalPlayground() {
  const [open, setOpen] = useState(true);

  return (
    <Fragment>
      <Button content="Open" onClick={() => setOpen(true)} />
      <Modal
        title="Modal Title"
        content={<div className="p-4">This is the modal content.</div>}
        open={open}
        setOpen={setOpen}
      />
    </Fragment>
  );
}
