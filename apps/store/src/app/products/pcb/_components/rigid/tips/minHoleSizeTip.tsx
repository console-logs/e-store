import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function MinHoleSizeTip() {
  return (
    <HelpPopover>
      <p>
        The minimum via hole size and via diameter. Via diameter should be
        0.1mm(0.15mm preferred) larger than Via hole size. e.g. when the via
        hole size is 0.2mm, the via diameter should be 0.3mm or 0.35mm.
      </p>
      <p>
        <span>Note: </span>Additional charges will apply when the via
        hole&lt;0.3mm and the via diameter≤0.4mm.No additional charge when the
        via hole&lt;0.3mm, and via diameter&gt;0.4mm. e.g. additional charge is
        needed for 0.2mm hole/0.4mm diameter, while 0.2mm hole/0.45mm diameter
        is free.
      </p>
    </HelpPopover>
  );
}
