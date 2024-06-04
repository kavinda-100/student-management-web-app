import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type EmailProps = {
  name: string;
  OPT: number;
};

const DOMAIN = Bun.env.DOMAIN_NAME || process.env.DOMAIN_NAME;

const PasswordOPTEmail = ({ name, OPT }: EmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>OPT for your password reset</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
                We received a request to change your password for your
                account. Your One Time (OTP) is:{" "}{OPT}
            </Text>
            <Text style={text}>
              Please enter this OPT to change your password.
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

export default PasswordOPTEmail;
