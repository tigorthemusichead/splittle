"use client"
import {Flex, TextField, Select, Button} from "@radix-ui/themes";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import createExpenseAction from "@/app/group/[id]/actions/create-expene";
import {useRouter} from "next/navigation";

interface CreateNewExpenseProps {
  currency: string,
  users: Array<{
    user: {
      clerk_id: string,
      name: string
    }
  }>,
  userId: string
  groupId: number
}

export default function CreateNewExpense ({currency, users, userId, groupId}: CreateNewExpenseProps) {
  const {refresh} = useRouter()
  return (
    <form method="POST" onSubmit={async (e) => {
      e.preventDefault()
      const name: string = (e.target as any).elements.name.value
      const amount: number = Number((e.target as any).elements.amount.value)
      const payerId: string = (e.target as any).elements.payerId.value
      const payedToId: string = (e.target as any).elements.payedToId.value
      const isSplit = payedToId === 'split'
      await createExpenseAction({
        name,
        amount,
        payerId,
        groupId,
        isSplit,
        payedToId: !isSplit ? payedToId : undefined
      })
      refresh()
    }}>
      <Flex wrap={"wrap"} gap={"3"}>
        <TextField.Input placeholder={"Expense name"} type={"text"} name={"name"} required={true}/>
        <TextField.Root>
          <TextField.Input placeholder={"Expense amount"} type={"text"} inputMode={"numeric"} name={"amount"} required={true}/>
          <TextField.Slot>
            {currency}
          </TextField.Slot>
        </TextField.Root>
        <Flex align={"center"} gap={"3"}>
          <Select.Root defaultValue={userId} name={"payerId"}>
            <Select.Trigger />
            <Select.Content>
              {
                users.map(({user}) => (
                  <Select.Item value={user.clerk_id} key={user.clerk_id}>{user.name}</Select.Item>
                ))
              }
            </Select.Content>
          </Select.Root>
          <ArrowRightIcon/>
          <Select.Root defaultValue={'split'} name={"payedToId"}>
            <Select.Trigger />
            <Select.Content>
              <Select.Item value={'split'}>Split</Select.Item>
              {
                users.map(({user}) => (
                  <Select.Item value={user.clerk_id} key={user.clerk_id}>{user.name}</Select.Item>
                ))
              }
            </Select.Content>
          </Select.Root>
        </Flex>
        <Button type={"submit"}>Create expense</Button>
      </Flex>
    </form>
  )
}
