import { Button } from "@components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { Menu } from "lucide-react";

// not shadcn sidebar. actually a drawer
export function Sidebar() {
  return (
    <Drawer swipeDirection="up">
      <DrawerTrigger
        render={
          <Button>
            <Menu className="size-6.5 text-muted" />
          </Button>
        }
      />
      <DrawerContent className="select-none">
        <DrawerHeader>
          <DrawerTitle className="select-none">
            Pick a delivery time
          </DrawerTitle>
          <DrawerDescription className="select-none">
            We&apos;ll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div></div>
      </DrawerContent>
    </Drawer>
  );
}
