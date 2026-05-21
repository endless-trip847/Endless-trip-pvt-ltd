export const dynamic = "force-dynamic";

import AdminTabs from "@/components/admin/AdminTabs";
import ManagePackages from "@/components/admin/ManagePackages";

export default function Page() {
  return (
    <>
      <AdminTabs />
      <ManagePackages />
    </>
  );
}
