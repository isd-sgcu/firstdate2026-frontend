import editIcon from "@assets/icons/material-symbols_edit-rounded.svg";
import { cn } from "@lib/utils";

/** The fd-red edit pencil (svg fill is already fd-red). */
export function EditPencil({ className }: { className?: string }) {
  return <img src={editIcon.src} alt="" className={cn("size-5", className)} />;
}
