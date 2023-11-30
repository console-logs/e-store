import HelpPopover from "@/app/products/pcb/_components/common/help";
import { setBomFile } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { convertFileToBase64 } from "@shared/lib/utils";
import { useDispatch } from "react-redux";

export default function UploadBomFile() {
	const dispatch = useDispatch();
	return (
		<div>
			<Label>
				Upload your Bill Of Materials (.xlsx / .csv)
				<UploadBomTip />
			</Label>
			<Input
				required
				accept=".csv"
				type="file"
				name="assemblyBomFiles"
				autoComplete="off"
				className="w-full"
				onChange={async e => {
					if (e.target.files) {
						const designFile = e.target.files[0]!;
						const base64File = (await convertFileToBase64(designFile).catch(console.error)) as string;
						dispatch(setBomFile(base64File));
					}
				}}
			/>
		</div>
	);
}

function UploadBomTip() {
	return (
		<HelpPopover>
			<p>We only accept .xlsx / .csv files and max size of the file should not be more than 20 MB</p>
		</HelpPopover>
	);
}