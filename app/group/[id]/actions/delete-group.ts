"use server";
import deleteGroup from "@/lib/group/delete";

export default async function deleteGroupAction (id: number): Promise<number | null> {
  const response = await deleteGroup(id)
  console.log(response)
  if (response.success) {
    return id
  }
  return null
}
