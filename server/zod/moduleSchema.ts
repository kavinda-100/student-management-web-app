import z from "zod";

export const ZodRoleEnum = z.enum(["student","teacher", "admin"]);
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
export const ZodGradeEnum = z.enum([
  "A",
  "B",
  "C",
  "D",
  "F",
]);
export const ZodSemesterEnum = z.enum(["1", "2", "3"]);
export const ZodAttendanceStatusEnum = z.enum(["present", "absent", "late"]);


// Define the schema for the user(teacher/admin/super admin) model
export const ZodUserSchema = z.object({
  _id: z.string().optional(),
  userName: z.string({
    required_error: "Username is required",
    message: "Username is required",
  }),
  name: z.string({
    required_error: "Name is required",
    message: "Name is required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: ZodRoleEnum.refine((val) => val != null, {
    message: "Role is required",
    
  }),
  avatar: z.string().url({ message: "Invalid URL" }).optional(),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .min(10, {
      message: "Phone number must be at least 10 characters long",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters long",
    }),
    emailVerifyToken: z.string().optional(),
    isEmailVerified: z.boolean().optional(),
    passwordResetOPT: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type ZodUserType = z.infer<typeof ZodUserSchema>;

// Define the schema for the student model
export const ZodStudentSchema = z.object({
  _id: z.string().optional(),
  name: z.string({
    required_error: "Name is required",
    message: "Name is required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  avatar: z.string().url({ message: "Invalid URL" }).optional(),
  studentID: z
    .number({ required_error: "Student ID is required" })
    .min(1000, { message: "Invalid student ID" }),
  grade: z
    .number({ required_error: "Grade is required" })
    .min(1, { message: "Invalid grade" })
    .max(12, { message: "Invalid grade" }),
  class: ZodClassEnum.refine((val) => val != null, {
    message: "class is required",
  }),
  subjects: z.array(z.string({ message: "subject IDs is required" })), // array of subject IDs
  teachers: z.array(z.string({ message: "teacher IDs is required" })), // array of teacher IDs
  parentName: z.string({
    required_error: "Parent name is required",
    message: "Parent name is required",
  }),
  address: z.object({
    street: z.string({
      required_error: "Street is required",
      message: "Street is required",
    }),
    city: z.string({
      required_error: "City is required",
      message: "City is required",
    }),
    state: z.string({
      required_error: "State is required",
      message: "State is required",
    }),
    zip: z.string({
      required_error: "Zip is required",
      message: "Zip is required",
    }),
  }),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .min(10, {
      message: "Phone number must be at least 10 characters long",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters long",
    }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ZodStudentType = z.infer<typeof ZodStudentSchema>;

// Define the schema for the Grade model
export const ZodGradeSchema = z.object({
  _id: z.string().optional(),
  studentID: z.string({ required_error: "Student ID is required" }), // refer to the student document student ID
  semester: ZodSemesterEnum.refine((val) => val != null, {
    message: "Semester is required",
  }),
  grades: z.array(
    z.object({
      subjectID: z.string({ required_error: "Subject ID is required" }), // refer to the subject document subject ID
      grade: ZodGradeEnum.refine((val) => val != null, {
        message: "Grade is required",
      }),
    })
  ),
  year: z.date({ required_error: "Year is required" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ZodGradeType = z.infer<typeof ZodGradeSchema>;

// Define the schema for the Student Attendance model
export const ZodStudentAttendanceSchema = z.object({
  _id: z.string().optional(),
  studentID: z.string({ required_error: "Student ID is required" }), // refer to the student document student ID
  date: z.date({ required_error: "Date is required" }),
  status: ZodAttendanceStatusEnum.refine((val) => val != null, {
    message: "Status is required",
  }),
  semester: ZodSemesterEnum.refine((val) => val != null, {
    message: "Semester is required",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ZodStudentAttendanceType = z.infer<typeof ZodStudentAttendanceSchema>;

// Define the schema for the Subject model
export const ZodSubjectSchema = z.object({
  _id: z.string().optional(),
  subjectID: z.string({ required_error: "Subject ID is required" }),
  teacherID: z.string({ required_error: "Teacher ID is required" }), // refer to the teacher document teacher ID
  subjectName: z.string({ required_error: "Subject name is required" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ZodSubjectType = z.infer<typeof ZodSubjectSchema>;
