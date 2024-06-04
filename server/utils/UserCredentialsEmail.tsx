import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ZodRoleType } from "../zod/moduleSchema";

type EmailProps = {
  name: string;
  password: string;
  email: string;
  role: ZodRoleType
};

const DOMAIN = Bun.env.DOMAIN_NAME || process.env.DOMAIN_NAME;

const UserCredentialsEmail = ({ name, password, email, role }: EmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your user credentials</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              These are your login credentials for your new account
            </Text>
            <Text style={text}>Your Name: {name}</Text>
            <Text style={text}>Your Email: {email}</Text>
            <Text style={text}>Your Password: {password}</Text>
            <Text style={text}>Your Role: {role}</Text>
            <Link style={button} href={`${DOMAIN}/login`}>
              Login
            </Link>
            <Hr />
            <Text style={text}>
              please change your password as soon as you sign in to your account. for secure your account from third party access.
            </Text>
            <Hr />
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href={`${DOMAIN}/help`}>
                more security tips.
              </Link>
            </Text>
            <Text style={text}>Happy day {name}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};

export default UserCredentialsEmail;
