import { flexPcbSpecifications } from "@/content/flexPcbCapabilities";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@shared/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/components/ui/table";

export default function FlexPcbCapabilities() {
  return (
    <>
      {Object.entries(flexPcbSpecifications).map(([specification, values], specIdx) => (
        <div key={specIdx}>
          <Accordion
            type="single"
            collapsible
            className="w-full">
            <AccordionItem
              value="item-1"
              className="bg-gray-50 px-2 rounded-md">
              <AccordionTrigger className="text-md">{specification}</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-96 ">Features</TableHead>
                      <TableHead>Capability</TableHead>
                    </TableRow>
                  </TableHeader>
                  {Object.entries(values).map(
                    ([subSpecification, value], idx) => (
                      <TableBody key={idx}>
                        <TableRow>
                          <TableCell>{subSpecification}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      </TableBody>
                    )
                  )}
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </>
  );
}
