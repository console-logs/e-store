import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function BoardoutlineToleranceTip() {
  return (
    <HelpPopover>
      <p>
        Regular and precision CNC routing differ mainly in how the PCB is
        aligned and the number of routing passes. In regular routing, a panel is
        fastened at points outside individual PCBs,whereas in precision routing
        alignment holes within each board are used for positioning. Regular
        routing is a single-pass process, while precision routing includes a
        rough pass and then a fine pass.
      </p>
    </HelpPopover>
  );
}
