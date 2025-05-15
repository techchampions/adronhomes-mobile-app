import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "./Button";

function SignaturePad() {
  const sigCanvas = useRef({});
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    if (!sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setTrimmedDataURL(dataURL);
    } else {
      alert("Please provide a signature first.");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-fit">
      <div className="flex items-center gap-4">
        <h4>Sign here:</h4>
        <div className="border border-gray-400 rounded-2xl p-2">
          <SignatureCanvas
            penColor="black"
            canvasProps={{ height: 100, className: "sigCanvas" }}
            ref={sigCanvas}
          />
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <Button
          className="!bg-transparent text-sm !text-red-500"
          label="Clear"
          onClick={clear}
        />
        <Button className="!bg-black text-sm" label="Save" onClick={save} />
      </div>
      {trimmedDataURL && (
        <div>
          <h4>Preview:</h4>
          <img src={trimmedDataURL} alt="Signature preview" />
        </div>
      )}
    </div>
  );
}

export default SignaturePad;
