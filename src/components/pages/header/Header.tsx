import KeyDialog from "@@/components/pages/header/KeyDialog";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between bg-gray-800 px-4 py-2 text-white">
      <h1 className="text-xl font-bold">4티어 악세 검색기</h1>
      <KeyDialog />
    </header>
  );
}
