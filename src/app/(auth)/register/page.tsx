import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = staticPageMetadata("/register");

export default function RegisterPage() {
  return <RegisterForm />;
}
