import {Card, Flex, TextField} from "@radix-ui/themes";
import GroupCreateForm from "@/app/group/create/chunks/create-form";
import {currentUser} from "@clerk/nextjs";

export default async function CreatePage () {
  const user = await currentUser()
  if (user === null) {
    return <h1 className={'text-2xl'}>Some error has occurred</h1>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GroupCreateForm clerk_id={user.id}/>
    </main>
  )
}
