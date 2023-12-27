import { HelpPopover } from "@/components/products/pcb/help-popover";
import { UploadRigidDesignFileButton } from "@/components/products/pcb/rigid/rigid-design-file-upload-button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useState } from "react";

export function RigidUploadDesignFile() {
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
				<UploadRigidDesignFileButton file={file} />
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
