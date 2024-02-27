"use client";
import {Box, Button, Card, Flex, TextField, Callout} from "@radix-ui/themes";
import createGroupAction from "@/app/group/create/actions/create-group";
import {useRouter} from "next/navigation";
import {CrossCircledIcon, InfoCircledIcon} from "@radix-ui/react-icons";
import {useRef, useState} from "react";

export default function GroupCreateForm ({clerk_id}: {clerk_id: string}) {
  const {push} = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <Box width={"100%"} p={"4"} mt={"8"} className={"max-w-[600px]"}>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        const name: string = (e.target as any).elements.name.value
        const currency: string = (e.target as any).elements.currency.value
        setLoading(true)
        void createGroupAction(clerk_id, name, currency)
          .then((id) => {
            if (id != null) {
              push(`/group/${id}`)
            } else {
              setError(true)
            }
          })
          .finally(() => {
            setLoading(false)
          })
      }}>
        <Flex direction={'column'} gap={"4"}>
          { error &&
            <Callout.Root>
              <Callout.Icon>
                <CrossCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Some error has occurred while form submitting
              </Callout.Text>
            </Callout.Root>
          }
          <TextField.Input size="2" placeholder="Name of the group" name={"name"} required={true}/>
          <TextField.Input size="2" placeholder="Currency" name={"currency"} required={true}/>
          <Button disabled={loading}>Create</Button>
        </Flex>
      </form>
    </Box>
  )
}
