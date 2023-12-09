import { uploadFile } from "@/app/api/upload/uploadFile";
import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectName, setFileUrl } from "@/redux/reducers/rigidPcbSlice";
import { Button } from "@packages/shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useToast } from "@shared/components/ui/use-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UploadDesignFile() {
	const [file, setFile] = useState<File | undefined>();
	const name = useSelector(selectName);
	const dispatch = useDispatch();
	const { toast } = useToast();

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
				<Button
					onClick={async event => {
						event.preventDefault();
						const response = await uploadFile({ file, Name: name });
						if (response.success) {
							dispatch(setFileUrl(response.fileUrl));
							toast({
								variant: "default",
								title: "File upload success",
								description: "We've successfully uploaded your file!",
								duration: 4000,
							});
						}
					}}>
					Upload
				</Button>
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
