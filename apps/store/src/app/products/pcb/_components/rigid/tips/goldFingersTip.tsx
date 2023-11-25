import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function GoldfingerTip() {
  return (
    <HelpPopover>
      <p>
        Gold fingers are the gold-plated columns along the connecting edges of
        PCBs. Only when ENIG surface finish is chosen, the fingers will be
        gold-plated. If you choose HASL surface finish, we will use HASL as edge
        connect plating.
      </p>
    </HelpPopover>
  );
}
