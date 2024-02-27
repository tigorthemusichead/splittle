"use client";
import {Box, DropdownMenu, Flex, Heading, IconButton, Section, Separator, Text} from "@radix-ui/themes";
import {UserButton} from "@clerk/nextjs";
import {CodeIcon, HamburgerMenuIcon, HomeIcon, Link2Icon, PersonIcon, PlusIcon} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Header () {
  return (
    <>
    <Flex justify={'between'} align={"center"} p={"4"}>
      <Link href={'/'}>
        <Heading as={'h1'}>Splittle</Heading>
      </Link>
      <Flex gap={'4'}>
        <UserButton/>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton>
              <HamburgerMenuIcon width={20} height={20}/>
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
                <Link href={'/'}>
                  <DropdownMenu.Item>
                  <Flex align={'center'} gap={'1'}>
                    <HomeIcon/>
                    <Text as={"div"}>Home</Text>
                  </Flex>
                    </DropdownMenu.Item>
                </Link>
              <DropdownMenu.Separator />
                <Link href={'/group'}>
                  <DropdownMenu.Item>
                  <Flex align={'center'} gap={'1'}>
                    <PersonIcon/>
                    <Text as={"div"}>My groups</Text>
                  </Flex>
                    </DropdownMenu.Item>
                </Link>
              <Link href={'/group/create'}>
                <DropdownMenu.Item>
                  <Flex align={'center'} gap={'1'}>
                    <PlusIcon/>
                    <Text as={"div"}>Create group</Text>
                  </Flex>
                </DropdownMenu.Item>
              </Link>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <Flex align={'center'} gap={'1'}>
                  <Link2Icon/>
                  <Text as={"div"}>My invites</Text>
                </Flex>
              </DropdownMenu.Item>
            <DropdownMenu.Separator />
              <Link href={'/api-doc'}>
                <DropdownMenu.Item>
                <Flex align={'center'} gap={'1'}>
                  <CodeIcon/>
                  <Text as={"div"}>API docs</Text>
                </Flex>
                </DropdownMenu.Item>
              </Link>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Flex>
      <Separator size={'4'} />
    </>
  )
}
