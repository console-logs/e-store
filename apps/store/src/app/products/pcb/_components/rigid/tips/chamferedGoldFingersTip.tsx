import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function ChamferedGoldFingersTip() {
  return (
    <HelpPopover>
      <p>
        Gold fingers are the gold-plated columns along the connecting edges of
        PCBs. Only when ENIG surface finish is chosen, the fingers will be
        gold-plated. This the angle at which the edges will be chamfered.
      </p>
    </HelpPopover>
  );
}
