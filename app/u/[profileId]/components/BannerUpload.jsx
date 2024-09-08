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
import { useEditUser } from "@/contexts/profile/context";
import { useEffect, useState } from "react";

import { Pen } from "lucide-react";

import { useDropzone } from "react-dropzone";

export function BannerUpload() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [image, setImage] = useState(null);

  const { handleUploadBannerPic, isLoading, userData, handleChange } =
    useEditUser();

  // console.log(acceptedFiles);

  useEffect(() => {
    function fileToDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
          resolve(event.target.result);
        };

        reader.onerror = function (error) {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    }

    if (acceptedFiles.length > 0) {
      fileToDataURL(acceptedFiles[0]).then((data) => {
        setImage(data);
        handleChange("banner", data);
      });
    }
  }, [acceptedFiles, handleChange]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" p-3 flex justify-center items-center text-white bg-[#009ED9] cursor-pointer rounded-full w-12 h-12 hover:bg-white hover:text-[#009ED9]">
          <Pen size={20}  />
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-screen max-h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogDescription>
            Make changes to your banner here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <section className="p-4 border max-w-full border-dashed border-[#009ed9]">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p className="cursor-pointer">
              Drag & drop some files here, or click to select files
            </p>
          </div>
        </section>
        <section className=" flex items-center  w-full max-w-screen justify-center ">
          <img
            className="object-cover object-center max-w-full  border w-full min-h-[150px] max-h-16 sm:max-h-20"
            alt="Profile"
            src={userData?.banner || image}
          />
        </section>

        <DialogFooter>
          <Button
            disabled={!image || isLoading}
            onClick={() => {
              handleUploadBannerPic(acceptedFiles[0]);
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
