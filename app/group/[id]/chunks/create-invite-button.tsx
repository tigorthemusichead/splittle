"use client";
import {useState} from "react";
import createInviteLink from "@/app/group/[id]/actions/create-invite";
import deleteGroupAction from "@/app/group/[id]/actions/delete-group";
import {Button, Flex, Text, Tooltip} from "@radix-ui/themes";
import {CrumpledPaperIcon, Link2Icon} from "@radix-ui/react-icons";

export default function CreateInviteButton ({groupId, userId} : {groupId: number, userId: string}) {
  const [link, setLink] = useState<string | null>()
  const [loading, setLoading] = useState(false)
  return (
    <Flex align={"center"} gap={"4"}>
      <Tooltip content="The invite link will be copied to clipboard">
        <Button disabled={loading} onClick={() => {
          setLoading(true)
          void createInviteLink(groupId, userId)
            .then((link) => {
              if (link != null) {
                setLink(link)
                navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}${link}`)
              }
            })
            .finally(() => {
              setLoading(false)
            })
        }}>
          <Flex align={"center"} gap={"2"}>
            <Link2Icon/> <Text as={"div"}>Invite friend</Text>
          </Flex>
        </Button>
      </Tooltip>
      { link != null &&
        <Text as={"div"} size={"1"} color={"gray"}>{`${window.location.protocol}//${window.location.host}${link}`}</Text>
      }
    </Flex>
  )
}
