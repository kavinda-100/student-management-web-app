import type { ZodIssue } from "zod";

// function to map over the error messages and send them as an one long string
export const ZodCustomErrorMessages = (errors: ZodIssue[]): string => {
  //map over the error messages and send them as an one long string
  const errorMessages = errors
    .map((error: ZodIssue, index, array) => {
      const message = error.message;
      // if the error is the last one and the array length is more than 1, add "and" before the message
      if (index === array.length - 1 && array.length > 1) {
        return "and " + message;
      }
      return message;
    })
    .join(", ");
  return errorMessages;
};
