import {
	Menu,
	NativeSelect,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useState } from "react"

export default function FilterFields() {
	const [value, setValue] = useState<[Date | null, Date | null]>([new Date(), null]);

	return (
		<>
			<Menu.Item component="div">
				<DatePickerInput
					type="range"
					placeholder="Pick dates range"
					label="Publish Dates"
					value={value}
					onChange={(val) => {
						if(val[1] && val[1].toISOString() < (new Date()).toISOString()) {
							console.log('invalid date');
							setValue([new Date(), new Date()]);
							return;
						}
						setValue(val);
					}}
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
		</>
	)
}