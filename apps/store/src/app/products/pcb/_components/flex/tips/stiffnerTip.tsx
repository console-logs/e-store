import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function StiffnerTip() {
	return (
		<HelpPopover>
			<p>
				Bare FPCs are very light and flexible. When thickness or strength is required in parts of an FPC for
				installation or assembly, a rigid layer can be attached to the board&apos;s surface. This rigid material
				is called a stiffener.
			</p>
			<ul className="list-disc px-3 space-y-2 my-1">
				<li>1. We provide polyimide, FR4, stainless steel, and 3M tape stiffeners.</li>
				<li>2. Stiffeners of different thicknesses and materials can be used on the same FPC.</li>
				<li>
					3. &quot;Stiffener thickness&quot; refers to the stiffener alone. The total thickness is this value
					added to the FPC&apos;s thickness.
				</li>
				<li>
					4. A drawing or extra Gerber layer must be provided alongside other design files to show the
					location, material and thickness of stiffeners. See the diagram for the expected format. For gold
					fingers, please make sure to add stiffeners if needed so the connector has enough strength to mate
					with its receptacle.
				</li>
			</ul>
		</HelpPopover>
	);
}
