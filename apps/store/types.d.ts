type AuthContextType = {
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  user: UserResource | null | undefined;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};

type ListItemsProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};

type RigidPcbStoreStateType = {
  pcbname: string;
  layer: 1 | 2 | 4 | 6 | 8 | 10;
  baseMaterial: "FR4" | "Aluminum" | "CopperCore" | "Rogers";
  designFormat: "Single PCB" | "Panel by Customer" | "Panel by Manufacturer";
  differentDesignsInPanel: 1 | 2 | 3 | 4;
  material:
    | "FR4-Standard TG 135-140"
    | "FR-4 TG155"
    | "RO4350B (Dk=3.48, Df=0.0037)"
    | "FR-4 TG170";
  boardSizeX: number;
  boardSizeY: number;
  panelQty:
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000;
  columns: number;
  rows: number;
  singlePiecesQty: number;
  pcbQty:
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000;
  boardThickness: 0.51 | 0.76 | 1.52 | 0.4 | 0.6 | 0.8 | 1.0 | 1.2 | 1.6 | 2.0;
  soldermask:
    | "Green"
    | "Purple"
    | "Red"
    | "Yellow"
    | "Blue"
    | "Black"
    | "White";
  silkscreen: "White" | "Black";
  surfaceFinish: "HASL(with lead)" | "LeadFree HASL" | "ENIG" | "OSP";
  goldFingers: "Yes" | "No";
  goldThickness: '1 U"' | '2 U"';
  edgeRails: "No" | "On 2 Sides" | "On 4 Sides";
  edgeRailSize: "5mm" | "7mm" | "10mm";
  panelSizeX: number;
  panelSizeY: number;
  outerCuWeight: "1 oz" | "2 oz";
  copperStructure: "Direct Heatsink";
  thermalConductivity: 1 | 380;
  breakDownVoltage: 3000;
  innerCuWeight: "0.5 oz" | "1 oz" | "2 oz";
  impedenceControl: "Yes" | "No";
  viaCovering:
    | "Tented"
    | "Untented"
    | "Plugged"
    | "Epoxy Filled & Capped"
    | "Epoxy Filled & Untented"
    | "Copper paste Filled & Capped";
  minViaHoleSizeAndDiameter:
    | "0.3mm/(0.4/0.45mm)"
    | "0.25mm/(0.35/0.40mm)"
    | "0.2mm/(0.3/0.35mm)"
    | "0.15mm/(0.25/0.3mm)";
  boardOutlineTolerance: "±0.2mm(Regular)" | "±0.1mm(Precision)";
  viaHoles: number;
  castellatedHoles: "Yes" | "No";
  castellatedHolesEdges: 1 | 2 | 3 | 4;
  chamferedGoldFingers: "Yes" | "No";
  leadTime:
    | "3 Working days"
    | "5 Working days"
    | "7 Working days"
    | "10 Working days";
  dispatchUnit: "PCB" | "Panel";
  calculatedPrice: number;
  tentativeDispatchDate: string;
  designFile: string;

  layerOptions: Array<1 | 10 | 6 | 8 | 2 | 4>;
  baseMaterialOptions: Array<"FR4" | "Aluminum" | "CopperCore" | "Rogers">;
  designFormatOptions: Array<
    "Single PCB" | "Panel by Customer" | "Panel by Manufacturer"
  >;
  differentDesignsInPanelOptions: Array<1 | 2 | 3 | 4>;
  materialOptions: Array<
    | "FR4-Standard TG 135-140"
    | "FR-4 TG155"
    | "RO4350B (Dk=3.48, Df=0.0037)"
    | "FR-4 TG170"
  >;
  panelQtyOptions: Array<
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000
  >;
  pcbQtyOptions: Array<
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000
  >;
  boardThicknessOptions: Array<
    0.51 | 0.76 | 1.52 | 0.4 | 0.6 | 0.8 | 1.0 | 1.2 | 1.6 | 2.0
  >;
  soldermaskOptions: Array<
    "Green" | "Purple" | "Red" | "Yellow" | "Blue" | "Black" | "White"
  >;
  silkscreenOptions: Array<"White" | "Black">;
  surfaceFinishOptions: Array<
    "HASL(with lead)" | "LeadFree HASL" | "ENIG" | "OSP"
  >;
  goldFingersOptions: Array<"Yes" | "No">;
  goldThicknessOptions: Array<'1 U"' | '2 U"'>;
  edgeRailsOptions: Array<"No" | "On 2 Sides" | "On 4 Sides">;
  edgeRailSizeOptions: Array<"5mm" | "7mm" | "10mm">;
  outerCuWeightOptions: Array<"1 oz" | "2 oz">;
  copperStructureOptions: Array<"Direct Heatsink">;
  thermalConductivityOptions: Array<1 | 380>;
  breakDownVoltageOptions: Array<3000>;
  innerCuWeightOptions: Array<"0.5 oz" | "1 oz" | "2 oz">;
  impedenceControlOptions: Array<"Yes" | "No">;
  viaCoveringOptions: Array<
    | "Tented"
    | "Untented"
    | "Plugged"
    | "Epoxy Filled & Capped"
    | "Epoxy Filled & Untented"
    | "Copper paste Filled & Capped"
  >;
  minViaHoleSizeAndDiameterOptions: Array<
    | "0.3mm/(0.4/0.45mm)"
    | "0.25mm/(0.35/0.40mm)"
    | "0.2mm/(0.3/0.35mm)"
    | "0.15mm/(0.25/0.3mm)"
  >;
  boardOutlineToleranceOptions: Array<"±0.2mm(Regular)" | "±0.1mm(Precision)">;
  castellatedHolesOptions: Array<"Yes" | "No">;
  castellatedHolesEdgesOptions: Array<1 | 2 | 3 | 4>;
  leadTimeOptions: Array<
    "3 Working days" | "5 Working days" | "7 Working days" | "10 Working days"
  >;
  chamferedGoldFingersOptions: Array<"Yes" | "No">;
  dispatchUnitOptions: Array<"PCB" | "Panel">;
};

type FlexPcbStoreStateType = {
  pcbname: string;
  baseMaterial: "Flex (Polyimide)";
  layer: 1 | 2;
  boardSizeX: number;
  boardSizeY: number;
  pcbQty:
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000;
  designFormat: "Single PCB" | "Panel by Customer" | "Panel by Manufacturer";
  differentDesignsInPanel: 1 | 2 | 3 | 4;
  panelQty:
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000;
  columns: number;
  rows: number;
  singlePiecesQty: number;
  boardThickness: 0.07 | 0.11 | 0.12 | 0.2;
  coverlay: "Yellow";
  coverlayThickness: "PI:12.5um/AD:15um" | "PI:25um/AD:25um";
  silkscreen: "White";
  surfaceFinish: "ENIG";
  goldThickness: '1 U"' | '2 U"';
  edgeRails: "No" | "On 2 Sides" | "On 4 Sides";
  edgeRailSize: "5mm" | "7mm" | "10mm";
  panelSizeX: number;
  panelSizeY: number;
  outerCuWeight: "0.5 oz" | "1/3 oz" | "1.0 oz";
  boardOutlineTolerance: "±0.1mm" | "±0.05mm";
  viaHoles: number;
  leadTime:
    | "3 Working days"
    | "5 Working days"
    | "7 Working days"
    | "10 Working days";
  dispatchUnit: "PCB" | "Panel";
  copperType: "Electro-deposited";
  stiffner: Array<
    "Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape"
  >;
  polyimideThickness: 0.1 | 0.15 | 0.2 | 0.225 | 0.25;
  fr4Thickness: 0.1 | 0.2;
  stainlessSteelThickness: 0.1 | 0.2 | 0.3;
  threeMTapeThickness: "3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)";
  emiShieldingFilm:
    | "Without"
    | "Both sides (Black, 18um)"
    | "Single side (Black, 18um)";
  cuttingMethod: "Laser Cutting";
  calculatedPrice: number;
  tentativeDispatchDate: string;
  designFile: string;

  // options
  designFormatOptions: Array<
    "Single PCB" | "Panel by Customer" | "Panel by Manufacturer"
  >;
  layerOptions: Array<1 | 2>;
  baseMaterialOptions: Array<"Flex (Polyimide)">;
  differentDesignsInPanelOptions: Array<1 | 2 | 3 | 4>;
  panelQtyOptions: Array<
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000
  >;
  pcbQtyOptions: Array<
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 400
    | 450
    | 500
    | 600
    | 700
    | 800
    | 900
    | 1000
    | 1500
    | 2000
  >;
  boardThicknessOptions: Array<0.07 | 0.11 | 0.12 | 0.2>;
  coverlayOptions: Array<"Yellow">;
  coverlayThicknessOptions: Array<"PI:12.5um/AD:15um" | "PI:25um/AD:25um">;
  silkscreenOptions: Array<"White">;
  surfaceFinishOptions: Array<"ENIG">;
  goldThicknessOptions: Array<'1 U"' | '2 U"'>;
  edgeRailsOptions: Array<"No" | "On 2 Sides" | "On 4 Sides">;
  edgeRailSizeOptions: Array<"5mm" | "7mm" | "10mm">;
  outerCuWeightOptions: Array<"0.5 oz" | "1/3 oz" | "1.0 oz">;
  boardOutlineToleranceOptions: Array<"±0.1mm" | "±0.05mm">;
  leadTimeOptions: Array<
    "3 Working days" | "5 Working days" | "7 Working days" | "10 Working days"
  >;
  dispatchUnitOptions: Array<"PCB" | "Panel">;
  copperTypeOptions: Array<"Electro-deposited">;
  stiffnerOptions: Array<
    "Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape"
  >;
  polyimideThicknessOptions: Array<0.1 | 0.15 | 0.2 | 0.225 | 0.25>;
  fr4ThicknessOptions: Array<0.1 | 0.2>;
  stainlessSteelThicknessOptions: Array<0.1 | 0.2 | 0.3>;
  threeMTapeThicknessOptions: Array<"3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)">;
  emiShieldingFilmOptions: Array<
    "Without" | "Both sides (Black, 18um)" | "Single side (Black, 18um)"
  >;
  cuttingMethodOptions: Array<"Laser Cutting">;
};

type AssemblyPcbStoreStateType = {
  projectName: string;
  boardType: "Single PCB" | "Panel";
  boardTypeOptions: Array<"Single PCB" | "Panel">;
  pcbsPerPanel: number;
  quantity: number;
  assemblySides: "Top Side" | "Bottom Side" | "Both Sides";
  assemblySideOptions: Array<"Top Side" | "Bottom Side" | "Both Sides">;
  numOfUniqueComponents: number;
  numOfSmdComponents: number;
  numOfBgaComponents: number;
  numOfThroughHoleComponents: number;
  tempHumiditySensitivity: "Low" | "Medium" | "High";
  tempHumiditySensitivityOptions: Array<"Low" | "Medium" | "High">;
  dePanel: "Yes" | "No";
  dePanelOptions: Array<"Yes" | "No">;
  conformalCoating: "Top Side" | "Bottom Side" | "Both Sides";
  conformalCoatingOptions: Array<"Top Side" | "Bottom Side" | "Both Sides">;
  functionalTest: "Yes" | "No";
  functionalTestOptions: Array<"Yes" | "No">;
  componentsProcurement: "TurnKey" | "Consigned" | "Combo";
  componentsProcurementOptions: Array<"TurnKey" | "Consigned" | "Combo">;
  turnaroundTime: "Standard 5-7 days" | "Expedited 3-4 days";
  turnaroundTimeOptions: Array<"Standard 5-7 days" | "Expedited 3-4 days">;
  calculatedPrice: number;
  tentativeDispatchDate: string;
  oneTimeSetupCosts: number;
  bomFile: string;
  gerberFile: string;
  pickAndPlaceFile: string;
};
