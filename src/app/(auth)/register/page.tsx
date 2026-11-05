import type { Metadata } from "next";
import { RegisterForm } from "./register-form";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/register");
}

export default function RegisterPage() {
  return <RegisterForm />;
}
