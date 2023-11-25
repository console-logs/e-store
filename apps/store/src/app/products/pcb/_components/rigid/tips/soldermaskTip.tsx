import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function SoldermaskTip() {
  return (
    <HelpPopover>
      <p>
        The PCB solder mask color. The green standard has the best performance
        and fastest turnaround time. For most colors, the silkscreen is printed
        white. Only for white solder mask, the silkscreen is printed black.
      </p>
    </HelpPopover>
  );
}
