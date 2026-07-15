// import { useRef, useState } from "react";

import { useSession } from "@lib/auth/useSession";

// import { EditPencil } from "./EditPencil";

/**
 * Profile-photo box. The photo comes from the Google account the user signed in
 * with — Better Auth stores it on the session as `user.image`, so it is
 * read-only here.
 *
 * The edit pencil + file picker are commented out below: there is still no
 * avatar upload endpoint, so picking a file could only ever preview locally and
 * would be silently discarded. Restore them once the backend can store one.
 */
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
