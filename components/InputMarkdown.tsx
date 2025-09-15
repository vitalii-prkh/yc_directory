import React from "react";
import MDEditor from "@uiw/react-md-editor";
import InputLabel from "@/components/InputLabel";
import InputError from "@/components/InputError";

type InputMarkdownProps = React.ComponentProps<typeof MDEditor> & {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  errors?: string[];
  required?: boolean;
};

function InputMarkdown(props: InputMarkdownProps) {
  const {id, name, label, errors, placeholder, required} = props;
  const isInvalid = Array.isArray(errors) && errors.length > 0;

  return (
    <div data-color-mode="light">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <MDEditor
        preview="edit"
        height={300}
        style={{
          borderRadius: 20,
          borderWidth: 3,
          borderColor: "#000",
          overflow: "hidden",
          boxShadow: "none",
        }}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        textareaProps={{
          id,
          name,
          placeholder,
          "aria-invalid": isInvalid,
          "aria-describedby": isInvalid ? `${id}-error` : undefined,
          required,
        }}
        previewOptions={{
          disallowedElements: ["style"],
        }}
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

export default InputMarkdown;
