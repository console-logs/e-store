import HelpPopover from "@/components/products/pcb/common/help-popover";
import UploadFileButton from "@/app/products/pcb/flex-pcb/_components/uploadBtn";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useState } from "react";

export default function UploadDesignFile() {
	const [file, setFile] = useState<File | undefined>();

	return (
		<div>
			<Label>
				Upload Design Files(.zip) <UploadDesignTip />
			</Label>
			<div className="flex gap-x-2">
				<Input
					required
					accept=".zip"
					id="file"
					type="file"
					autoComplete="off"
					className="w-full"
					onChange={async e => {
						const files = e.target.files;
						if (files) {
							setFile(files[0]);
						}
					}}
				/>
				<UploadFileButton file={file} />
			</div>
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
