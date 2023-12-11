import { uploadFile } from "@/app/products/pcb/_helpers/uploadFile";
import { selectName, setUploadedFileUrl } from "@/redux/reducers/rigidPcbSlice";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@packages/shared/components/ui/button";
import { useToast } from "@shared/components/ui/use-toast";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UploadFileButton(props: { file: File | undefined }) {
	const { file } = props;
	const [isLoading, startTransition] = useTransition();
	const name = useSelector(selectName);
	const dispatch = useDispatch();
	const { toast } = useToast();

	return (
		<Button
			disabled={isLoading}
			onClick={event => {
				startTransition(async () => {
					event.preventDefault();
					const response = await uploadFile({ file, Name: name });
					if (response.success) {
						dispatch(setUploadedFileUrl(response.fileUrl));
						//TODO: Set the file name in redux store.
						toast({
							variant: "default",
							title: "File upload success",
							description: "We've successfully uploaded your file!",
							duration: 4000,
						});
					}
				});
			}}>
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center"
					aria-hidden="true"
				/>
			) : (
				"Upload"
			)}
		</Button>
	);
}
