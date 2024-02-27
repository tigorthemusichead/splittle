"use client";
import joinGroup from "@/app/invite/[id]/actions/joinGroup";
import {useRouter} from "next/navigation";


type JoinButtonProps = {
  clerk_id: string
  inviteId: number
  groupId: number
}

export default function JoinButton ({clerk_id, inviteId, groupId}: JoinButtonProps) {
  const {push} = useRouter()
  return (
      <button type="submit" className={'bg-white text-black rounded-xl text-xl p-4'} onClick={() => {
        void joinGroup(clerk_id, inviteId, groupId)
          .then((groupId) => {
            if (groupId != null) {
              void push(`/group/${groupId}`)
            }
          })
      }}>
        Join the group
      </button>
  )
}
