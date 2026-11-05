import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/login");
}

export default function LoginPage() {
  return <LoginForm />;
}
