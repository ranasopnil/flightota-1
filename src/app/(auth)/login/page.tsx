import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import { LoginForm } from "./login-form";

export const metadata: Metadata = staticPageMetadata("/login");

export default function LoginPage() {
  return <LoginForm />;
}
