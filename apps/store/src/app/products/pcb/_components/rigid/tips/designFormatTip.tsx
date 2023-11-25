import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function DesignFormatTip() {
  return (
    <HelpPopover>
      This is the format of the design file supplied by you.
      <ul className="my-1 list-disc space-y-2 px-3">
        <li>
          <span className="font-semibold">Single PCB - </span> The design file
          is a single PCB.
        </li>
        <li>
          <span className="font-semibold">Panel by Customer -</span>
          You construct the PCB panel yourself and provide us the panelized data
          for PCB production.
        </li>
        <li>
          <span className="font-semibold">Panel by Manufacturer -</span>
          We construct your panel with v-cut according to your need.
        </li>
      </ul>
      <p className="my-2">
        <span className="font-semibold">Note - </span>We only provide panelizing
        service:
        <ul className="my-1 list-disc space-y-2 px-3">
          <li>If PCBs are Regular shapes like rectangle and circle</li>
          <li>
            If number of different designs in a panel is more than one, then you
            need to panalize it yourself.
          </li>
        </ul>
      </p>
    </HelpPopover>
  );
}
