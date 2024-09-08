import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SingleComment from "./SingleComment";
import { usePost } from "@/contexts/posts/context";
import {
  UsePostByIdtStream,
  UsePostCommentsStream,
} from "@/lib/posts/firebase_read";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth/context";

export function ReportDiologBox({ children, post }) {
  const {
    handleReportReasonChange,
    handleReportSubmit,
    reportReason,
    isLoading,
  } = usePost();
  const { user } = useAuth();
  return (
    <Dialog className="max-h-screen h-fit">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div
          className="w-full p-2
              rounded-lg
               flex  my-5 flex-col gap-2"
        >
          <div
            className="flex p-2 rounded-lg justify-between items-center border
              border-gray-300
              focus:ring-2
              focus:ring-[#009ED9]
              focus:border-transparent
              outline-none
              transition
              duration-150 
              ease-in-out"
          >
            <h1>Not Intrested</h1>
            <input
              type="checkbox"
              className="w-5 h-5"
              disabled={
                reportReason &&
                reportReason != "Not Intrested" &&
                reportReason != ""
              }
              checked={reportReason === "Not Intrested"}
              onChange={(e) => {
                if (e.target.checked) {
                  handleReportReasonChange("Not Intrested");
                } else {
                  handleReportReasonChange("");
                }
              }}
            />
          </div>
          <div
            className="flex p-2 rounded-lg justify-between items-center border
              border-gray-300
              focus:ring-2
              focus:ring-[#009ED9]
              focus:border-transparent
              outline-none
              transition
              duration-150
              ease-in-out"
          >
            <h1>NSFW</h1>
            <input
              className="w-5 h-5"
              type="checkbox"
              disabled={
                reportReason && reportReason != "NSFW" && reportReason != ""
              }
              checked={reportReason === "NSFW"}
              onChange={(e) => {
                if (e.target.checked) {
                  handleReportReasonChange("NSFW");
                } else {
                  handleReportReasonChange("");
                }
              }}
            />
          </div>
          <div
            className="flex p-2 rounded-lg justify-between items-center border
              border-gray-300
              focus:ring-2
              focus:ring-[#009ED9]
              focus:border-transparent
              outline-none
              transition
              duration-150
              ease-in-out"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Crime</AccordionTrigger>
                <AccordionContent>
                  <div
                    className="w-full p-2
              rounded-lg
               flex flex-col gap-2"
                  >
                    <div
                      className="flex p-2 rounded-lg justify-between items-center border
              border-gray-300
              focus:ring-2
              focus:ring-[#009ED9]
              focus:border-transparent
              outline-none
              transition
              duration-150 
              ease-in-out"
                    >
                      <h1>Defamation</h1>
                      <input
                        className="w-5 h-5"
                        type="checkbox"
                        disabled={
                          reportReason &&
                          reportReason != "Defamation" &&
                          reportReason != ""
                        }
                        checked={reportReason === "Defamation"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleReportReasonChange("Defamation");
                          } else {
                            handleReportReasonChange("");
                          }
                        }}
                      />
                    </div>
                    <div
                      className="flex p-2 rounded-lg justify-between items-center border
              border-gray-300
              focus:ring-2
              focus:ring-[#009ED9]
              focus:border-transparent
              outline-none
              transition
              duration-150
              ease-in-out"
                    >
                      <h1>Sexual abuse</h1>
                      <input
                        className="w-5 h-5"
                        type="checkbox"
                        disabled={
                          reportReason &&
                          reportReason != "Sexual abuse" &&
                          reportReason != ""
                        }
                        checked={reportReason === "Sexual abuse"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleReportReasonChange("Sexual abuse");
                          } else {
                            handleReportReasonChange("");
                          }
                        }}
                      />
                    </div>
                    <div
                      className="flex p-2 rounded-lg justify-between items-center border
              border-gray-300
              focus:ring-2
              focus:ring-[#009ED9]
              focus:border-transparent
              outline-none
              transition
              duration-150
              ease-in-out"
                    >
                      <h1>Child safety</h1>
                      <input
                        className="w-5 h-5"
                        type="checkbox"
                        disabled={
                          reportReason &&
                          reportReason != "Child safety" &&
                          reportReason != ""
                        }
                        checked={reportReason === "Child safety" ? true : false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleReportReasonChange("Child safety");
                          } else {
                            handleReportReasonChange("");
                          }
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Button
            disabled={isLoading}
            onClick={async (e) => {
              await handleReportSubmit(e, post);
              document.getElementById("closeBtn").click();
            }}
            className="flex gap-2 hover:bg-[#009EC9] bg-[#009ED9]"
          >
            <CopyIcon size={20} />
            {isLoading ? "Loading..." : "Report"}
          </Button>
        </div>
      </DialogContent>

      <DialogClose asChild>
        <Button className="hidden" id="closeBtn">
          Close
        </Button>
      </DialogClose>
    </Dialog>
  );
}
