import Header from "@@/components/pages/header/Header";
import ItemList from "@@/components/pages/item-list/ItemList";
import OptionsSetter from "@@/components/pages/options/OptionsSetter";

export default function Main() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col items-center gap-2 p-4">
        <OptionsSetter />
        <ItemList />
      </main>
    </>
  );
}
