export const dynamic = "force-dynamic";


import AdminTabs from "@/components/admin/AdminTabs";
import AddEditPackage from "@/components/admin/AddEditPackage";

export default function Page() {
  return (
    <>
      <AdminTabs />
      <AddEditPackage />
    </>
  );
}
