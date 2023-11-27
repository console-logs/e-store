import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function CoverlayTip() {
	return (
		<HelpPopover>
			<p>
				The flexible polyimide cover layer has the same function as soldermask on rigid PCBs: to prevent solder
				attachment and to provide insulation. <br />
				<span className="font-bold">Note:</span>Cover layer webs between pads require at least 0.5 mm pad
				spacing, otherwise the webs will be removed.
			</p>
		</HelpPopover>
	);
}
