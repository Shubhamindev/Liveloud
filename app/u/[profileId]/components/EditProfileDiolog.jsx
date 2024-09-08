import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditUser } from "@/contexts/profile/context";

export default function EditProfileDiolog({ children }) {
  const { isLoading, userData, handleChange, handleUpdateUser, error } =
    useEditUser();
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(e) => {
                handleChange("name", e.target.value);
              }}
              id="name"
              value={userData?.name || ""}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Handle
            </Label>
            <Input
              onChange={(e) => {
                handleChange("handle", e.target.value);
              }}
              id="username"
              value={userData?.handle || ""}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              onChange={(e) => {
                handleChange("bio", e.target.value);
              }}
              id="bio"
              value={userData?.bio || ""}
              className="col-span-3 border"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={async (e) => {
              e.preventDefault();
              await handleUpdateUser();
            }}
            type="submit"
          >
            {isLoading ? "Loading..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
