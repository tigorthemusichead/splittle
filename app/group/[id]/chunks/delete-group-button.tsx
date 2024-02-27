"use client";
import {Button, Flex, Text, AlertDialog} from "@radix-ui/themes";
import {CrumpledPaperIcon} from "@radix-ui/react-icons";
import deleteGroupAction from "@/app/group/[id]/actions/delete-group";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function DeleteGroupButton ({id}: {id: number}) {
  const {push, refresh} = useRouter()
  const [loading, setLoading] = useState(false)
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color={"red"} disabled={loading}>
          <Flex align={"center"} gap={"2"}>
            <CrumpledPaperIcon/> <Text as={"div"}>Delete group</Text>
          </Flex>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete group</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? There will be no way to restore the deleted group data
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={() => {
              setLoading(true)
              void deleteGroupAction(id)
                .then((id) => {
                  if(id != null) {
                    push('/group')
                    refresh()
                  }
                })
                .finally(() => {
                  setLoading(false)
                })
            }}>
              Delete anyways
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
