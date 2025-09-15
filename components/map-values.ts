import {z} from "zod";
import {schema} from "@/lib/validation";

type SchemaValues = z.infer<typeof schema>;
type SchemaErrors = z.inferFlattenedErrors<typeof schema>["fieldErrors"];
type SchemaState = {
  status: string;
  values: SchemaValues;
  errors: SchemaErrors;
};

export function getInitialState(): SchemaState {
  return {
    status: "initial",
    values: getInitialValues(),
    errors: getInitialErrors(),
  };
}

export function getInitialValues() {
  return {
    title: "",
    description: "",
    category: "",
    link: "",
    pitch: "",
  };
}

export function getInitialErrors(): SchemaErrors {
  return {
    title: [],
    description: [],
    category: [],
    link: [],
    pitch: [],
  };
}
