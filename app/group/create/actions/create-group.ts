"use server";
import createGroup, {CreateGroupResponse} from "@/lib/group/create";

export default async function createGroupAction(clerk_id: string, name: string, currency: string): Promise<number | null> {
  const response = await createGroup({
    userId: clerk_id,
    name,
    currency
  }) as CreateGroupResponse & {success: boolean}
  if (response.success) {
    return response.id
  }
  return null
}
