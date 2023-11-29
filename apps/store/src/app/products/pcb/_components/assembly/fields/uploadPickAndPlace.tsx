import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";
import { setPickAndPlaceFile } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { convertFileToBase64 } from "@shared/lib/utils";
import { useDispatch } from "react-redux";

export default function UploadPickAndPlaceFile() {
	const dispatch = useDispatch();
	return (
		<div>
			<Label>
				Upload your Pick and Place Files (.zip) <UploadPickAndPlaceTip />
			</Label>
			<Input
				required
				accept=".zip"
				type="file"
				name="assemblyPickAndPlaceFiles"
				autoComplete="off"
				className="w-full"
				onChange={async e => {
					if (e.target.files) {
						const designFile = e.target.files[0]!;
						const base64File = (await convertFileToBase64(designFile).catch(console.error)) as string;
						dispatch(setPickAndPlaceFile(base64File));
					}
				}}
			/>
		</div>
	);
}

function UploadPickAndPlaceTip() {
	return (
		<HelpPopover>
			<p>We only accept zip files and max size of the file should not be more than 20 MB</p>
		</HelpPopover>
	);
}
