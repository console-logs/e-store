import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function EmiShieldingTip() {
	return (
		<HelpPopover>
			<p>
				Flex circuit boards can be susceptible to electromagnetic interference (EMI) due to their compact size
				and lack of shielding, EMI shield film helps reduce electromagnetic interference in order to resolve EMI
				issues. The film can be applied to both sides of the FPC or one side only (please state which side in
				design files).
			</p>
		</HelpPopover>
	);
}
