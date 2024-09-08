import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEditUser } from '@/contexts/profile/context'
import { useEffect, useState } from 'react'

import { Pen } from 'lucide-react'

import { useDropzone } from 'react-dropzone'

export function ProfileUpload() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [image, setImage] = useState(null)

  const {
    handleUploadProfilePic,
    isLoading,
    userData,
    handleChange,
  } = useEditUser()

  // console.log(acceptedFiles);

  useEffect(() => {
    function fileToDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = function (event) {
          resolve(event.target.result)
        }

        reader.onerror = function (error) {
          reject(error)
        }

        reader.readAsDataURL(file)
      })
    }

    if (acceptedFiles.length > 0) {
      fileToDataURL(acceptedFiles[0]).then((data) => {
        setImage(data)
        handleChange('photoURL', data)
      })
    }
  }, [acceptedFiles, handleChange])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" p-3 flex justify-center items-center text-white bg-[#009ED9] cursor-pointer rounded-full w-10 h-10 hover:bg-white hover:text-[#009ED9]">
          <Pen size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-fit max-h-screen ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <section className="p-4 border border-dashed border-[#009ed9]">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className="cursor-pointer">
              Drag & drop some files here, or click to select files
            </p>
          </div>
        </section>
        <section className=" flex items-center justify-center w-full">
          <img
            className="object-cover object-center w-[150px] border-2px  border h-[150px]"
            alt="Profile"
            src={userData?.photoURL || image}
          />
        </section>

        <DialogFooter>
          <Button
            disabled={!image || isLoading}
            onClick={() => {
              handleUploadProfilePic(acceptedFiles[0])
            }}
            type="submit"
          >
            {isLoading ? 'Loading...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
