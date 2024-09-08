import * as React from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNewPost } from "@/contexts/newPost/context";

export function MediaCarousel({ postMedia }) {
  // console.log(postMedia);
  const { handleDeSelectMedia } = useNewPost();

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className=" w-full md:w-[80%]"
    >
      <CarouselContent>
        {postMedia &&
          postMedia
            .slice()
            .reverse()
            .map((media, index) => (
              <>
                <CarouselItem key={index}>
                  <div className="w-full flex justify-end  text-end p-1 ">
                    {/* <Button varient="destructive">Delete</Button> */}
                    <X
                      onClick={() =>
                        handleDeSelectMedia(postMedia.length - 1 - index)
                      }
                      stroke="red"
                      className="cursor-pointer hover:scale-[102%] transition-all duration-150 ease-in-out"
                    />
                  </div>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-1">
                        {media?.type == "video" ? (
                          <video
                            src={URL.createObjectURL(media.file)}
                            className="h-full w-full object-cover rounded-lg"
                            controls
                          />
                        ) : media?.type === "gif" ? (
                          <img
                            src={media?.file?.url}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(media.file)}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </>
            ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
