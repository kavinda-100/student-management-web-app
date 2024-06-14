import z from 'zod';

export const ZodRoleEnum = z.enum([
  "student",
  "teacher",
  "admin",
]);
export type ZodRoleType = z.infer<typeof ZodRoleEnum>;
export const ZodClassEnum = z.enum([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
]);
export const ZodGradeEnum = z.enum(["A", "B", "C", "D", "F"]);
export const ZodSemesterEnum = z.enum(["1", "2", "3"]);
export const ZodAttendanceStatusEnum = z.enum(["present", "absent", "late"]);