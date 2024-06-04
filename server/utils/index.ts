import type { ZodIssue } from "zod";
import bcrypt from "bcryptjs";

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

// function to generate a random string
export const generateRandomString = async (length: number): Promise<string> => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  const salt = await bcrypt.genSalt(10)
  result = await bcrypt.hash(result, salt);
  return result;
};

// function to generate a random 6 digit number
export const generateRandomNumber = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};
