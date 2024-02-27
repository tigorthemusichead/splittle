"use client";
import {useState} from "react";
import createInviteLink from "@/app/group/[id]/actions/create-invite";

export default function CreateInviteButton ({groupId, userId} : {groupId: number, userId: string}) {
  const [link, setLink] = useState<string | null>()
  return (
    <>
      <button type="submit" className={'bg-white text-black rounded-xl text-xl p-4'} onClick={() => {
        void createInviteLink(groupId, userId)
          .then(setLink)
      }}>
        Generate invite link
      </button>
      {
        link != null && <div>{window.location.protocol}{'//'}{window.location.host}{link}</div>
      }
    </>
  )
}
