"use client";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { convertToBase64 } from "@shared/lib/utils";
import HelpPopover from "@store/src/components/pcb/shared/helpPopover";
import { setDesignFile } from "@/redux/reducers/flexPcbSlice";
import { useDispatch } from "react-redux";

export default function UploadDesignFile() {
	const dispatch = useDispatch();
	// tell the user to fuck off if they are not authenticated. Tell that in bright red text.
	return (
		<div>
			<Label>
				Upload Design Files(.zip){" "}
				<HelpPopover>
					<p>We only accept zip files and max size of the file should not be more than 16 MB</p>
				</HelpPopover>
			</Label>
			<Input
				required
				accept=".zip"
				type="file"
				name="designFile"
				autoComplete="off"
				className="w-full"
				onChange={async e => {
					if (e.target.files) {
						const designFile = e.target.files[0];
						const base64File = (await convertToBase64(designFile).catch(console.error)) as string;
						dispatch(setDesignFile(base64File));
					}
				}}
			/>
		</div>
	);
}
