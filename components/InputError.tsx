import React from "react";

function InputError(props: React.PropsWithChildren<React.ComponentProps<"p">>) {
  return (
    <p
      {...props}
      className="startup-form_error"
    >
      {props.children}
    </p>
  );
}

export default InputError;
