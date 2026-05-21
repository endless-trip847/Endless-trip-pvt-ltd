export const dynamic = "force-dynamic";


import AdminTabs from "@/components/admin/AdminTabs";
import RequestsPanel from "@/components/admin/RequestsPanel";

export default function Page() {
  return (
    <>
      <AdminTabs />
      <RequestsPanel />
    </>
  );
}
