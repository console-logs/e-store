import HelpPopover from "@/app/products/pcb/_components/common/help";
import { setGerberFile } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { convertFileToBase64 } from "@shared/lib/utils";
import { useDispatch } from "react-redux";

export default function UploadGerberFile() {
	const dispatch = useDispatch();
	return (
		<div>
			<Label>
				Upload your Gerber Files(.zip)
				<UploadGerberTip />
			</Label>
			<Input
				required
				accept=".zip"
				type="file"
				name="assemblyGerberFiles"
				autoComplete="off"
				className="w-full"
				onChange={async e => {
					if (e.target.files) {
						const designFile = e.target.files[0]!;
						const base64File = (await convertFileToBase64(designFile).catch(console.error)) as string;
						dispatch(setGerberFile(base64File));
					}
				}}
			/>
		</div>
	);
}

function UploadGerberTip() {
	return (
		<HelpPopover>
			<p>We only accept zip files and max size of the file should not be more than 20 MB</p>
		</HelpPopover>
	);
}
