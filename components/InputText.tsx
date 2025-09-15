import React from "react";
import {Input} from "@/components/ui/input";
import InputLabel from "@/components/InputLabel";
import InputError from "@/components/InputError";

type InputTextProps = React.ComponentProps<typeof Input> & {
  label: string;
  errors?: string[];
};

function InputText(props: InputTextProps) {
  const {id, label, errors, ...rest} = props;
  const isInvalid = Array.isArray(errors) && errors.length > 0;

  return (
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        {...rest}
        id={id}
        className="startup-form_input"
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

export default InputText;
