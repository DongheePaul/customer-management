import { Validator } from "jsonschema";
import { tokenFormat } from "./data.format";

const v = new Validator();
v.addSchema(tokenFormat, "/tokenFormat");

const tokenFormatCheck = (token: any) => {
  const validationResult = v.validate(token, tokenFormat);
  if (validationResult.errors.length !== 0) {
    throw new Error(validationResult.errors.join(", "));
  }
};

export { tokenFormatCheck };
