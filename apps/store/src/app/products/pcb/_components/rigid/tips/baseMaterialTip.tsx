import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function BaseMaterialTip() {
  return (
    <HelpPopover>
      <ul className="my-1 list-disc space-y-2 px-3">
        <li>FR-4 is the most popular substrate material for rigid PCBs.</li>
        <li>
          Flex PCBs utilize a thin, flexible polymer film as the substrate for
          the circuitry. Flex PCBs reduce space consumption, and have lower
          weight.
        </li>
        <li>
          Aluminum/copper core boards have better heat dissipation and thermal
          transfer than standard FR-4 constructions.
        </li>
        <li>
          Rogers PCBs have excellent dielectric properties and minimal
          resistance. They are generally used in high-speed, high-frequency
          circuitry applications.
        </li>
      </ul>
      <p className="my-2">
        <span className="font-semibold">Note - </span>For Aluminum/Copper core
        boards, the min drill size is 1.0mm, and min slot width is 1.6mm.
      </p>
    </HelpPopover>
  );
}
