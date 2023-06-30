import {
	Input,
	Menu,
	NativeSelect,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useGenresStore } from "../../stores/genres"

export default function FilterFields() {
	const genreNames = useGenresStore(state => state.genreNames);

	return (
		<>
			<Menu.Item component="div">
				<DatePickerInput
					type="range"
					placeholder="Pick dates range"
					label="Publish Dates"
					mx="auto"
					maw={400}
				/>
			</Menu.Item>
			<Menu.Item component="div">
				<NativeSelect
					data={genreNames}
					label="Genres"
				/>
			</Menu.Item>
			<Menu.Item component="div">
				<Input.Wrapper label="Author">
					<Input placeholder="Enter author name"/>
				</Input.Wrapper>
			</Menu.Item>
			<Menu.Item component="div">
				<Input.Wrapper label="Title">
					<Input placeholder="Enter book title"/>
				</Input.Wrapper>
			</Menu.Item>
		</>
	)
}