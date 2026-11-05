import type { Metadata } from "next";
import { RegisterForm } from "../register/register-form";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/signup");
}

export default function SignUpPage() {
  return <RegisterForm />;
}
