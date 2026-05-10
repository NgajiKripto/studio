import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminEntryPath,
  isAdminAuthorizedRequest,
} from "@/lib/admin-security";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!isAdminAuthorizedRequest(headerStore, sessionToken)) {
    redirect(getAdminEntryPath());
  }

  return children;
}
