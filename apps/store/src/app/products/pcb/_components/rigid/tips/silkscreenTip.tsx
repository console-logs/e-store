import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function SilkscreenTip() {
  return (
    <HelpPopover>
      <p>
        For most colors, the silkscreen is printed white. Only for white solder
        mask, the silkscreen is printed black. Please note, white printed
        silkscreen could be easily blend in with the gray surface. No silkscreen
        is recommended on the bare Aluminum surface.
      </p>
    </HelpPopover>
  );
}
