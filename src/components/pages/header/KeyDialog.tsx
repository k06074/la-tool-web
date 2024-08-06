import { useAtom } from "jotai/react";
import { ChangeEvent, useEffect, useState } from "react";
import { keyDialogOpenAtom } from "@@/atoms/keyDialogOpen";
import { Button } from "@@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@@/components/ui/dialog";
import { Input } from "@@/components/ui/input";
import { Label } from "@@/components/ui/label";
import KeyIcon from "../../../../public/icon/key.svg";
import TrashIcon from "../../../../public/icon/trash.svg";

export default function KeyDialog() {
  const [open, setOpen] = useAtom(keyDialogOpenAtom);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const localKeys = localStorage.getItem("laApiKeys");
    if (localKeys) {
      setKeys(JSON.parse(localKeys));
    }
  }, []);

  const handleTrash = (index: number) => {
    setKeys((prev) => {
      const newKeys = [...prev];
      newKeys[index] = "";
      return newKeys;
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setKeys((prev) => {
      const newKeys = [...prev];
      newKeys[index] = e.target.value;
      return newKeys;
    });
  };

  const handleSubmit = () => {
    localStorage.setItem("laApiKeys", JSON.stringify(keys));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="size-8 p-1"
          onClick={() => setOpen(true)}
        >
          <KeyIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API key 추가</DialogTitle>
          <DialogDescription>
            <a
              href="https://developer-lostark.game.onstove.com/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              로스트아크 OpenAPI 사이트
            </a>
            에서 API 키를 발급받아주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 rounded bg-gray-200 py-4">
          {["key1", "key2"].map((key, index) => (
            <div className="flex items-center gap-2 px-4">
              <Label className="text-right">{key}</Label>
              <Input
                id={key}
                placeholder="API key를 붙여넣어주세요"
                value={keys[index] ?? ""}
                onChange={(e) => handleChange(e, index)}
              />

              <Button
                variant="outline"
                className="size-10 bg-red-200 p-2"
                onClick={() => handleTrash(index)}
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
