import { selectName, setUploadedFileName, setUploadedFileUrl } from "@/redux/reducers/pcb-assembly-slice";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@packages/shared/components/ui/button";
import { useToast } from "@shared/components/ui/use-toast";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

export function UploadAssemblyDesignFileButton(props: { file: File | undefined }) {
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
					const formData = new FormData();
					formData.set("file", file as Blob, name);
					const response = await fetch("/api/file", {
						method: "POST",
						body: formData,
					});
					if (response.ok) {
						const data = (await response.json()) as { filename: string; fileUrl: string };
						dispatch(setUploadedFileUrl(data.fileUrl));
						dispatch(setUploadedFileName(data.filename));
						toast({
							variant: "default",
							title: "File upload success",
							description: "We've successfully uploaded your file!",
							duration: 4000,
						});
					} else {
						toast({
							variant: "destructive",
							title: "File upload failed",
							description: response.statusText,
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
