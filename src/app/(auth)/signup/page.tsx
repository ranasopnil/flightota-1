import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import { RegisterForm } from "../register/register-form";

export const metadata: Metadata = staticPageMetadata("/signup");

export default function SignUpPage() {
  return <RegisterForm />;
}
