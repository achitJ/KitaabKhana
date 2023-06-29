import {
	Input,
	Menu,
	NativeSelect,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"

export default function FilterFields() {
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
					data={['None', 'Fiction', 'Non-Fiction']}
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