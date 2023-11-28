import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function UploadBomTip() {
	return (
		<HelpPopover>
			<p>We only accept .xlsx / .csv files and max size of the file should not be more than 20 MB</p>
		</HelpPopover>
	);
}
