import { Schema } from "jsonschema";

const tokenFormat: Schema = {
  id: "/tokenFormat", // JSON Schema의 고유 식별자
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    sub: { type: "string" },
  },
  required: ["id", "name", "sub"],
};

export { tokenFormat };
