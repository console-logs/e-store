"use client";
import UploadDesignTip from "@/app/products/pcb/_components/flex/tips/uploadDesignTip";
import { setDesignFile } from "@/redux/reducers/flexPcbSlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { convertToBase64 } from "@shared/lib/utils";
import { useDispatch } from "react-redux";

export default function UploadDesignFile() {
	const dispatch = useDispatch();
	// tell the user to fuck off if they are not authenticated. Tell that in bright red text.
	return (
		<div>
			<Label>
				Upload Design Files(.zip) <UploadDesignTip />
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
