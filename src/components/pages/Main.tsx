import ItemList from "@@/components/pages/item-list/ItemList";
import OptionsSetter from "@@/components/pages/options/OptionsSetter";

export default function Main() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 p-12">
      <OptionsSetter />
      <ItemList />
    </main>
  );
}
