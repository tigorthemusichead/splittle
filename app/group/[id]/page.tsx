import {currentUser, UserButton} from "@clerk/nextjs";
import readGroup, {ReadGroupResponse} from "@/lib/group/read";
import CreateInviteButton from "@/app/group/[id]/chunks/create-invite-button";

export default async function Group ({params}: {params: {id: string}}) {
  const {id} = params
  const user = await currentUser()
  const response = await readGroup(Number(id)) as ReadGroupResponse & {success: boolean}
  if (user == null || !response.success) {
    return <h1 className={'text-2xl'}>Some error has occurred</h1>
  }

  if (!response.users.some(({ user: dbUser }) => dbUser.clerk_id === user.id)) {
    return <h1 className={'text-2xl'}>You are not in this group</h1>
  }

  return (
    <section className={'container mx-auto py-8'}>
      <UserButton/>
      <h1 className={'text-2xl'}>{(response as any).name}</h1>
      <h2 className={'text-xl'}>{(response as any).currency}</h2>
      <ul>
      {
        response.users.map(({user}) => (
          <li key={user.clerk_id}>
            {user.name}
          </li>
        ))
      }
      </ul>
      <CreateInviteButton userId={user.id} groupId={Number(id)}/>
    </section>
  )
}
