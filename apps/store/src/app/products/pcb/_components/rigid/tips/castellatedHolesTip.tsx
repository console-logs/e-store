import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function CastellatedHolesTip() {
  return (
    <HelpPopover>
      Castellations are plated through holes located in the edges of a printed
      circuit board and cut through to form a series of half holes.
      <ul className="my-1 list-disc space-y-2 px-3">
        <li>Hole diameter ≥ 0.6 mm</li>
        <li>Hole to board edge ≥ 1 mm</li>
        <li>Min. board size 10 x 10 mm</li>
        <li>
          Not available for small-batch single PCB orders, PCB panel is
          recommended.
        </li>
      </ul>
    </HelpPopover>
  );
}
