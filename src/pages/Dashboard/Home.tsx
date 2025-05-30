import AssetCard from "../../components/cards/AssetCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard"
        description="This is Dashboard page"
      />
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="col-span-3 space-y-6">
          <AssetCard />
        </div>
      </div>
    </>
  );
}
