import React from "react";

function InputLabel(
  props: React.PropsWithChildren<React.ComponentProps<"label">>,
) {
  return (
    <label
      {...props}
      className="startup-form_label"
    >
      {props.children}
    </label>
  );
}

export default InputLabel;
