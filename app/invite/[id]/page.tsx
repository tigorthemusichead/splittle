import readInvite, {ReadInviteResponse} from "../../../lib/invite/read";
import JoinButton from "@/app/invite/[id]/chunks/join-button";
import {currentUser, UserButton} from "@clerk/nextjs";
import updateUser from "@/lib/user/update";
import updateInvite from "@/lib/invite/update";
import {redirect} from "next/navigation";

export default async function Invite ({params}: {params: {id: string}}) {
  const {id} = params
  const inviteResponse = await readInvite(Number(id))
  const user = await currentUser()

  if (!inviteResponse.success || user == null) {
    return <h1 className={'text-2xl'}>Some error occurred. The link might be incorrect</h1>
  }

  if ((inviteResponse as ReadInviteResponse).isUsed) {
    return <h1 className={'text-2xl'}>This link has been used</h1>
  }

  if (new Date().getTime() - new Date((inviteResponse as ReadInviteResponse).createdAt).getTime() > 1000 * 60 * 60 * (inviteResponse as ReadInviteResponse).lifeSpan) {
    return <h1 className={'text-2xl'}>This link has expired</h1>
  }
  return (
    <section className={'container mx-auto pt-4'}>
      <UserButton/>
      <h1 className={'text-2xl my-2'}>
        User <b className={'text-gray-200'}>{(inviteResponse as ReadInviteResponse).user.name}</b> has invited you in a group <b className={'text-gray-200'}>{(inviteResponse as ReadInviteResponse).group.name}</b>
      </h1>
      <JoinButton clerk_id={user.id} inviteId={Number(id)} groupId={(inviteResponse as ReadInviteResponse).group.id}/>
    </section>
  )
}
