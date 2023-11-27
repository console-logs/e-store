import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function CuttingMethodTip() {
	return (
		<HelpPopover>
			<p>
				Laser cutting is the default method. Carbonization at the cut edges can cause a slight shrink in the
				board&apos;s outline. To prevent this from removing support underneath gold fingers, all gold fingers
				are shortened by 0.2 mm in our DFM process..
			</p>
		</HelpPopover>
	);
}
