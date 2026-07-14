import { useRef, useState } from "react";

import { EditPencil } from "./EditPencil";

/**
 * Profile-photo box with an edit pencil. There is no upload endpoint yet, so
 * picking an image only previews it locally — nothing is persisted.
 * TODO: wire to an avatar upload API once the backend provides one.
 */
export function AvatarEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="relative mx-auto w-40">
      <div className="aspect-square w-40 overflow-hidden rounded-2xl bg-[#DEDEDE]">
        {preview && (
          <img src={preview} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="แก้ไขรูปโปรไฟล์"
        className="absolute -right-2 -bottom-2 grid size-11 place-items-center rounded-full bg-muted"
      >
        <EditPencil />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPick}
      />
    </div>
  );
}
