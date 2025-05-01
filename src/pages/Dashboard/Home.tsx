import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="col-span-3 space-y-6">
          <EcommerceMetrics />
        </div>
      </div>
    </>
  );
}
