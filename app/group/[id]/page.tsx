import {currentUser, UserButton} from "@clerk/nextjs";
import readGroup, {ReadGroupResponse} from "@/lib/group/read";
import CreateInviteButton from "@/app/group/[id]/chunks/create-invite-button";
import {Box, Card, Flex, Separator, Text, Table} from "@radix-ui/themes";
import DeleteGroupButton from "@/app/group/[id]/chunks/delete-group-button";
import CreateNewExpense from "@/app/group/[id]/chunks/create-new-expense";
import calculateUserDebt from "@/lib/group/calculte-user-debt";

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
    <main className="flex min-h-screen flex-col items-center">
      <Flex wrap={"wrap"} width={"100%"} gap={'4'} p={'4'} pb={"0"}>
        <Card>
          <Flex width={"100%"} height={"100%"} align={"center"} justify={"center"}>
            <CreateNewExpense currency={(response as any).currency} users={response.users} userId={user.id} groupId={Number(id)}/>
          </Flex>
        </Card>
        { response.users.length < 2 ?
          <Card>
            <Flex width={"100%"} height={"100%"} align={"center"} justify={"center"}>
              <CreateInviteButton userId={user.id} groupId={Number(id)}/>
            </Flex>
          </Card> : <></>
        }
        <Card style={{ maxWidth: 240 }}>
          <Flex width={"100%"} height={"100%"} align={"center"} justify={"center"}>
            <DeleteGroupButton id={Number(id)}/>
          </Flex>
        </Card>
      </Flex>
      <Flex wrap={"wrap"} width={"100%"} justify={"center"} gap={'4'} p={'4'}>
        {
          response.users.map(({user}) => (
            <Card style={{ maxWidth: 240 }} key={user.clerk_id}>
              <Box>
                <Text as="div" size="2" color="gray" weight="bold">
                  {user.name}
                </Text>
                <Text as="div" size="2" color="gray">
                  Debt: {calculateUserDebt(response.expenses, user.clerk_id)} {(response as any).currency}
                </Text>
              </Box>
            </Card>
          ))
        }
      </Flex>
      <Separator size={'4'} />
      <Box mt={"4"} p={"8"} width={"100%"}>
        <Table.Root variant="surface" size={"2"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Expanse name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Paid by</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Paid to</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              response.expenses.map((expense: any) => (
                <Table.Row key={expense.id}>
                  <Table.RowHeaderCell>{expense.name}</Table.RowHeaderCell>
                  <Table.Cell>{expense.amount} {(response as any).currency}</Table.Cell>
                  <Table.Cell>{expense.user.name}</Table.Cell>
                  <Table.Cell>{expense.isSplit ? 'Split' : expense.payedTo.name}</Table.Cell>
                  <Table.Cell>{new Date(expense.createdAt).toISOString()}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
      </Box>
    </main>
  )
}
