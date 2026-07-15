// import { useRef, useState } from "react";

import { useSession } from "@lib/auth/useSession";

// import { EditPencil } from "./EditPencil";

//  use image now if possible connect edit with backend api if exist
export function AvatarEditor() {
  const session = useSession();
  const image = session.status === "authenticated" ? session.user.image : null;

  // const inputRef = useRef<HTMLInputElement>(null);
  // const [preview, setPreview] = useState<string | null>(null);
  //
  // const onPick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) setPreview(URL.createObjectURL(file));
  // };

  return (
    <div className="relative mx-auto w-40">
      <div className="aspect-square w-40 overflow-hidden rounded-2xl bg-[#DEDEDE]">
        {image && (
          <img
            src={image}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {/* <button
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
      /> */}
    </div>
  );
}
