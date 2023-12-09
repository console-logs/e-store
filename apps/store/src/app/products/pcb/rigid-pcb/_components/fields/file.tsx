import HelpPopover from "@/app/products/pcb/_components/common/help";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import type { Dispatch, SetStateAction } from "react";

export default function UploadDesignFile(props: { setFile: Dispatch<SetStateAction<File | undefined>> }) {
	const { setFile } = props;
	return (
		<div>
			<Label>
				Upload Design Files(.zip) <UploadDesignTip />
			</Label>
			<Input
				required
				accept=".zip"
				id="file"
				type="file"
				autoComplete="off"
				className="w-full"
				onChange={e => {
					const files = e.target.files;
					if (files) {
						setFile(files[0]);
					}
				}}
			/>
		</div>
	);
}

function UploadDesignTip() {
	return (
		<HelpPopover>
			<p>We only accept zip files and max size of the file should not be more than 16 MB</p>
		</HelpPopover>
	);
}
