import { Radio, Menu } from "@mantine/core";

const fields = [
	{
		name: 'none',
		label: 'None',
	}, {
		name: 'title',
		label: 'Title',
	}, {
		name: 'author',
		label: 'Author',
	}, {
		name: 'dop',
		label: 'Publish Date',
	},
];

export default function SortFields() {
	return (
		<Radio.Group>
			{fields.map(({name, label}) => (
				<Menu.Item component="div" key={`${name}|${label}`}>
					<Radio size="xs" value={name} label={label}/>
				</Menu.Item>
			))}
		</Radio.Group>
	)
}