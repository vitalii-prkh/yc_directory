import React from "react";
import {Textarea as TextArea} from "@/components/ui/textarea";
import InputLabel from "@/components/InputLabel";
import InputError from "@/components/InputError";

type InputTextProps = React.ComponentProps<typeof TextArea> & {
  label: string;
  errors?: string[];
};

function Textarea(props: InputTextProps) {
  const {id, label, errors, ...rest} = props;
  const isInvalid = Array.isArray(errors) && errors.length > 0;

  return (
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <TextArea
        {...rest}
        id={id}
        className="startup-form_textarea"
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? `${id}-error` : undefined}
      />
      {isInvalid && (
        <InputError
          id={`${id}-error`}
          aria-live="assertive"
          role="alert"
        >
          {errors.join(", ")}
        </InputError>
      )}
    </div>
  );
}

export default Textarea;
