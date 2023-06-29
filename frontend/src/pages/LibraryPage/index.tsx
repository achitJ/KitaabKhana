import {
  Container, 
} from "@mantine/core"
import SearchBar from "../../components/SearchBar"

export default function LibraryPage() {
  return (
    <Container mt={30}>
      <SearchBar />
    </Container>
  )
}