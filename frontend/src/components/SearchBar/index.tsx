import { 
  ActionIcon,
  Autocomplete, 
  Button, 
  Flex,
  Menu,
} from "@mantine/core"
import { IconSortAscending, IconFilter } from "@tabler/icons-react"
import SortFields from "./SortFields"
import FilterFields from "./FilterFields"

export default function SearchBar() {
  return (
    <Flex
      w="100%"
      justify="center"
      align="center"
      gap={10}
    >
      <Autocomplete
        placeholder="Find your book"
        data={[]}
        w="80%"
      />
      <Button variant="outline" color="gray" size="sm">Search</Button>
      <Menu
        shadow="md"
        width={180}
        closeOnItemClick={false}
        position="bottom-end"
      >
        <Menu.Target>
          <ActionIcon size="lg" variant="outline">
            <IconSortAscending />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Sort</Menu.Label>
          <SortFields />
        </Menu.Dropdown>
      </Menu>

      <Menu
        shadow="md"
        width={320}
        closeOnItemClick={false}
        position="bottom-end"
      >
        <Menu.Target>
          <ActionIcon size="lg" variant="outline">
            <IconFilter />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Filter</Menu.Label>
          <FilterFields />
        </Menu.Dropdown>
      </Menu>
    </Flex>
  )
}