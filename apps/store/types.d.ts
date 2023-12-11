/**
 * Declare global types that are accessible through out the app here!
 *
 * Note: When you import a type into this file, TypeScript will start treating types.d.ts file as a module,
 * which changes the scope from global to module-level.
 * This means that the types declared in this file are no longer globally available.
 *
 * NOTE: If you need to use a type from an external package,
 * consider importing it directly in the files where it's needed.

 */

type Unwrap<T> = {
	[K in keyof T]: T[K];
} & object;

/****************************** RIGID PCB FAB *********************************************/
type BaseRigidPcbFabSpecsType = {
	Type: "Rigid PCB";
	Category: "PCB";
	Name: string;
	OrderedQty: number;
	Layer: 1 | 2 | 4 | 6 | 8 | 10;
	BaseMaterial: "FR4" | "Aluminum" | "CopperCore" | "Rogers";
	DesignFormat: "Single PCB" | "Panel by Customer" | "Panel by Manufacturer";
	DifferentDesignsInPanel: 1 | 2 | 3 | 4;
	Material: "FR4-Standard TG 135-140" | "FR-4 TG155" | "RO4350B (Dk=3.48, Df=0.0037)" | "FR-4 TG170";
	BoardSizeX: number;
	BoardSizeY: number;
	PanelQty:
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
	Columns: number;
	Rows: number;
	SinglePiecesQty: number;
	PcbQty:
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
	BoardThickness: 0.51 | 0.76 | 1.52 | 0.4 | 0.6 | 0.8 | 1.0 | 1.2 | 1.6 | 2.0;
	Soldermask: "Green" | "Purple" | "Red" | "Yellow" | "Blue" | "Black" | "White";
	Silkscreen: "White" | "Black";
	SurfaceFinish: "HASL(with lead)" | "LeadFree HASL" | "ENIG" | "OSP";
	GoldFingers: "Yes" | "No";
	GoldThickness: '1 U"' | '2 U"';
	EdgeRails: "No" | "On 2 Sides" | "On 4 Sides";
	EdgeRailSize: "5mm" | "7mm" | "10mm";
	PanelSizeX: number;
	PanelSizeY: number;
	OuterCuWeight: "1 oz" | "2 oz";
	CopperStructure: "Direct Heatsink";
	ThermalConductivity: 1 | 380;
	BreakDownVoltage: 3000;
	InnerCuWeight: "0.5 oz" | "1 oz" | "2 oz";
	ImpedanceControl: "Yes" | "No";
	ViaCovering:
		| "Tented"
		| "Untented"
		| "Plugged"
		| "Epoxy Filled & Capped"
		| "Epoxy Filled & Untented"
		| "Copper paste Filled & Capped";
	MinViaHoleSizeAndDiameter:
		| "0.3mm/(0.4/0.45mm)"
		| "0.25mm/(0.35/0.40mm)"
		| "0.2mm/(0.3/0.35mm)"
		| "0.15mm/(0.25/0.3mm)";
	BoardOutlineTolerance: "±0.2mm(Regular)" | "±0.1mm(Precision)";
	ViaHoles: number;
	CastellatedHoles: "Yes" | "No";
	CastellatedHolesEdges: 1 | 2 | 3 | 4;
	ChamferedGoldFingers: "Yes" | "No";
	LeadTime: "3 Working days" | "5 Working days" | "7 Working days" | "10 Working days";
	DispatchUnit: "PCB" | "Panel";
	NetPrice: number;
	UploadedFileName: string;
	UploadedFileUrl: string;
};

type RigidPcbStoreStateType = Unwrap<
	BaseRigidPcbFabSpecsType & {
		TentativeDispatchDate: string;
		LayerOptions: Array<1 | 10 | 6 | 8 | 2 | 4>;
		BaseMaterialOptions: Array<"FR4" | "Aluminum" | "CopperCore" | "Rogers">;
		DesignFormatOptions: Array<"Single PCB" | "Panel by Customer" | "Panel by Manufacturer">;
		DifferentDesignsInPanelOptions: Array<1 | 2 | 3 | 4>;
		MaterialOptions: Array<
			"FR4-Standard TG 135-140" | "FR-4 TG155" | "RO4350B (Dk=3.48, Df=0.0037)" | "FR-4 TG170"
		>;
		PanelQtyOptions: Array<
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
		PcbQtyOptions: Array<
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
		BoardThicknessOptions: Array<0.51 | 0.76 | 1.52 | 0.4 | 0.6 | 0.8 | 1.0 | 1.2 | 1.6 | 2.0>;
		SoldermaskOptions: Array<"Green" | "Purple" | "Red" | "Yellow" | "Blue" | "Black" | "White">;
		SilkscreenOptions: Array<"White" | "Black">;
		SurfaceFinishOptions: Array<"HASL(with lead)" | "LeadFree HASL" | "ENIG" | "OSP">;
		GoldFingersOptions: Array<"Yes" | "No">;
		GoldThicknessOptions: Array<'1 U"' | '2 U"'>;
		EdgeRailsOptions: Array<"No" | "On 2 Sides" | "On 4 Sides">;
		EdgeRailSizeOptions: Array<"5mm" | "7mm" | "10mm">;
		OuterCuWeightOptions: Array<"1 oz" | "2 oz">;
		CopperStructureOptions: Array<"Direct Heatsink">;
		ThermalConductivityOptions: Array<1 | 380>;
		BreakDownVoltageOptions: Array<3000>;
		InnerCuWeightOptions: Array<"0.5 oz" | "1 oz" | "2 oz">;
		ImpedanceControlOptions: Array<"Yes" | "No">;
		ViaCoveringOptions: Array<
			| "Tented"
			| "Untented"
			| "Plugged"
			| "Epoxy Filled & Capped"
			| "Epoxy Filled & Untented"
			| "Copper paste Filled & Capped"
		>;
		MinViaHoleSizeAndDiameterOptions: Array<
			"0.3mm/(0.4/0.45mm)" | "0.25mm/(0.35/0.40mm)" | "0.2mm/(0.3/0.35mm)" | "0.15mm/(0.25/0.3mm)"
		>;
		BoardOutlineToleranceOptions: Array<"±0.2mm(Regular)" | "±0.1mm(Precision)">;
		CastellatedHolesOptions: Array<"Yes" | "No">;
		CastellatedHolesEdgesOptions: Array<1 | 2 | 3 | 4>;
		LeadTimeOptions: Array<"3 Working days" | "5 Working days" | "7 Working days" | "10 Working days">;
		ChamferedGoldFingersOptions: Array<"Yes" | "No">;
		DispatchUnitOptions: Array<"PCB" | "Panel">;
	}
>;

type RigidPcbFabSpecsType = Unwrap<
	BaseRigidPcbFabSpecsType & {
		// override specific props in base to be nullable
		Material: null | "FR4-Standard TG 135-140" | "FR-4 TG155" | "RO4350B (Dk=3.48, Df=0.0037)" | "FR-4 TG170";
		PcbQty:
			| null
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
		PanelQty:
			| null
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
		Columns: null | number;
		Rows: null | number;
		SinglePiecesQty: null | number;
		GoldThickness: null | '1 U"' | '2 U"';
		EdgeRails: null | "No" | "On 2 Sides" | "On 4 Sides";
		EdgeRailSize: null | "5mm" | "7mm" | "10mm";
		PanelSizeX: null | number;
		PanelSizeY: null | number;
		CopperStructure: null | "Direct Heatsink";
		ThermalConductivity: null | 1 | 380;
		BreakDownVoltage: null | 3000;
		InnerCuWeight: null | "0.5 oz" | "1 oz" | "2 oz";
		ImpedanceControl: null | "Yes" | "No";
		ViaCovering:
			| null
			| "Tented"
			| "Untented"
			| "Plugged"
			| "Epoxy Filled & Capped"
			| "Epoxy Filled & Untented"
			| "Copper paste Filled & Capped";
		MinViaHoleSizeAndDiameter:
			| null
			| "0.3mm/(0.4/0.45mm)"
			| "0.25mm/(0.35/0.40mm)"
			| "0.2mm/(0.3/0.35mm)"
			| "0.15mm/(0.25/0.3mm)";
		BoardOutlineTolerance: null | "±0.2mm(Regular)" | "±0.1mm(Precision)";
		ViaHoles: null | number;
		CastellatedHolesEdges: null | 1 | 2 | 3 | 4;
		ChamferedGoldFingers: null | "Yes" | "No";
	}
>;

/****************************** FLEX PCB FAB *********************************************/
type BaseFlexPcbFabSpecsType = {
	Type: "Flex PCB";
	Category: "PCB";
	Name: string;
	OrderedQty: number;
	BaseMaterial: "Flex (Polyimide)";
	Layer: 1 | 2;
	BoardSizeX: number;
	BoardSizeY: number;
	PanelSizeX: number;
	PanelSizeY: number;
	PcbQty:
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
	SinglePiecesQty: number;
	DesignFormat: "Single PCB" | "Panel by Customer" | "Panel by Manufacturer";
	DifferentDesignsInPanel: 1 | 2 | 3 | 4;
	PanelQty:
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
	Columns: number;
	Rows: number;
	BoardThickness: 0.07 | 0.11 | 0.12 | 0.2;
	Coverlay: "Yellow";
	CoverlayThickness: "PI:12.5um/AD:15um" | "PI:25um/AD:25um";
	Silkscreen: "White";
	SurfaceFinish: "ENIG";
	GoldThickness: '1 U"' | '2 U"';
	EdgeRails: "No" | "On 2 Sides" | "On 4 Sides";
	EdgeRailSize: "5mm" | "7mm" | "10mm";
	OuterCuWeight: "0.5 oz" | "1/3 oz" | "1.0 oz";
	BoardOutlineTolerance: "±0.1mm" | "±0.05mm";
	ViaHoles: number;
	LeadTime: "3 Working days" | "5 Working days" | "7 Working days" | "10 Working days";
	DispatchUnit: "PCB" | "Panel";
	CopperType: "Electro-deposited";
	Stiffner: Array<"Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape">;
	PolyimideThickness: 0.1 | 0.15 | 0.2 | 0.225 | 0.25;
	FR4Thickness: 0.1 | 0.2;
	StainlessSteelThickness: 0.1 | 0.2 | 0.3;
	ThreeMTapeThickness: "3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)";
	EMIShieldingFilm: "Without" | "Both sides (Black, 18um)" | "Single side (Black, 18um)";
	CuttingMethod: "Laser Cutting";
	NetPrice: number;
	DesignFile: string;
};

type FlexPcbStoreStateType = Unwrap<
	BaseFlexPcbFabSpecsType & {
		TentativeDispatchDate: string;
		DesignFormatOptions: Array<"Single PCB" | "Panel by Customer" | "Panel by Manufacturer">;
		LayerOptions: Array<1 | 2>;
		BaseMaterialOptions: Array<"Flex (Polyimide)">;
		DifferentDesignsInPanelOptions: Array<1 | 2 | 3 | 4>;
		PanelQtyOptions: Array<
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
		PcbQtyOptions: Array<
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
		BoardThicknessOptions: Array<0.07 | 0.11 | 0.12 | 0.2>;
		CoverlayOptions: Array<"Yellow">;
		CoverlayThicknessOptions: Array<"PI:12.5um/AD:15um" | "PI:25um/AD:25um">;
		SilkscreenOptions: Array<"White">;
		SurfaceFinishOptions: Array<"ENIG">;
		GoldThicknessOptions: Array<'1 U"' | '2 U"'>;
		EdgeRailsOptions: Array<"No" | "On 2 Sides" | "On 4 Sides">;
		EdgeRailSizeOptions: Array<"5mm" | "7mm" | "10mm">;
		OuterCuWeightOptions: Array<"0.5 oz" | "1/3 oz" | "1.0 oz">;
		BoardOutlineToleranceOptions: Array<"±0.1mm" | "±0.05mm">;
		LeadTimeOptions: Array<"3 Working days" | "5 Working days" | "7 Working days" | "10 Working days">;
		DispatchUnitOptions: Array<"PCB" | "Panel">;
		CopperTypeOptions: Array<"Electro-deposited">;
		StiffnerOptions: Array<"Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape">;
		PolyimideThicknessOptions: Array<0.1 | 0.15 | 0.2 | 0.225 | 0.25>;
		FR4ThicknessOptions: Array<0.1 | 0.2>;
		StainlessSteelThicknessOptions: Array<0.1 | 0.2 | 0.3>;
		ThreeMTapeThicknessOptions: Array<"3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)">;
		EMIShieldingFilmOptions: Array<"Without" | "Both sides (Black, 18um)" | "Single side (Black, 18um)">;
		CuttingMethodOptions: Array<"Laser Cutting">;
	}
>;

type FlexPcbFabSpecsType = Unwrap<
	BaseFlexPcbFabSpecsType & {
		PcbQty:
			| null
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
		SinglePiecesQty: null | number;
		Columns: null | number;
		Rows: null | number;
		EdgeRails: null | "No" | "On 2 Sides" | "On 4 Sides";
		EdgeRailSize: null | "5mm" | "7mm" | "10mm";
		GoldThickness: null | '1 U"' | '2 U"';
		PolyimideThickness: null | 0.1 | 0.15 | 0.2 | 0.225 | 0.25;
		ThreeMTapeThickness: null | "3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)";
		StainlessSteelThickness: null | 0.1 | 0.2 | 0.3;
		FR4Thickness: null | 0.1 | 0.2;
		BoardOutlineTolerance: null | "±0.1mm" | "±0.05mm";
		ViaHoles: null | number;
		PanelQty:
			| null
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
		PanelSizeX: null | number;
		PanelSizeY: null | number;
	}
>;

/****************************** PCB ASSEMBLY FAB *********************************************/
type PcbAssemblyFabSpecsType = {
	Type: "PCB Assembly";
	Category: "PCB";
	Name: string;
	BoardType: "Single PCB" | "Panel";
	PcbsPerPanel: number;
	OrderedQty: number;
	AssemblySides: "Top Side" | "Bottom Side" | "Both Sides";
	NumOfUniqueComponents: number;
	NumOfSmdComponents: number;
	NumOfBgaComponents: number;
	NumOfThroughHoleComponents: number;
	TempHumiditySensitivity: "Low" | "Medium" | "High";
	DePanel: "Yes" | "No";
	ConformalCoating: "Top Side" | "Bottom Side" | "Both Sides";
	FunctionalTest: "Yes" | "No";
	ComponentsProcurement: "TurnKey" | "Consigned" | "Combo";
	TurnaroundTime: "Standard 5-7 days" | "Expedited 3-4 days";
	OneTimeSetupCosts: number;
	NetPrice: number;
	BOMFile: string;
	GerberFile: string;
	PickAndPlaceFile: string;
};

type PcbAssemblyStoreStateType = Unwrap<
	PcbAssemblyFabSpecsType & {
		TentativeDispatchDate: string;
		DePanelOptions: Array<"Yes" | "No">;
		BoardTypeOptions: Array<"Single PCB" | "Panel">;
		AssemblySideOptions: Array<"Top Side" | "Bottom Side" | "Both Sides">;
		TempHumiditySensitivityOptions: Array<"Low" | "Medium" | "High">;
		ConformalCoatingOptions: Array<"Top Side" | "Bottom Side" | "Both Sides">;
		FunctionalTestOptions: Array<"Yes" | "No">;
		ComponentsProcurementOptions: Array<"TurnKey" | "Consigned" | "Combo">;
		TurnaroundTimeOptions: Array<"Standard 5-7 days" | "Expedited 3-4 days">;
	}
>;

/****************************** PART *********************************************/
type PartResultsType = {
	Parts: Record<string, PartDataType>;
	Errors: ErrorsType | null;
};

type PartDataType = {
	Type: "Part";
	Availability: string;
	DatasheetUrl: string;
	Description: string;
	ImagePath: string;
	Category: string;
	Manufacturer: string;
	Name: string;
	Min: string;
	Mult: string;
	BCDPercent: number;
	PriceBreaks: Array<PriceBreakType>;
	ROHSStatus: string;
	HSCode: string;
	OrderedQty: number;
};

type ErrorsType = {
	Status: number;
	Text: string;
};

type PriceBreakType = {
	Quantity: number;
	Price: string;
	Currency: string;
};

/****************************** PCB RATE CARD *********************************************/
type RigidPcbRateCardType = {
	baseMaterial: {
		FR4: number;
		Aluminum: number;
		CopperCore: number;
		Rogers: number;
	};
	layer: {
		1: number;
		2: number;
		4: number;
		6: number;
		8: number;
		10: number;
	};
	dimensions: {
		boardSizeX: number;
		boardSizeY: number;
	};
	differentDesigns: {
		"1 Design": number;
		"2 Designs": number;
		"3 Designs": number;
		"4 Designs": number;
	};
	designFormat: {
		"Single PCB": number;
		"Panel by Customer": number;
		"Panel by Manufacturer": number;
	};
	pcbThickness: {
		0.4: number;
		0.6: number;
		0.8: number;
		1.0: number;
		1.2: number;
		1.6: number;
		2.0: number;
	};
	soldermaskColor: {
		Green: number;
		Purple: number;
		Red: number;
		Black: number;
		Yellow: number;
		Blue: number;
		White: number;
	};
	silkscreenColor: {
		Black: number;
		White: number;
	};
	surfaceFinish: {
		"HASL(with lead)": number;
		"LeadFree HASL": number;
		ENIG: number;
		OSP: number;
	};
	outerCuWeight: {
		"1 oz": number;
		"2 oz": number;
	};
	goldFingers: {
		Yes: number;
		No: number;
	};
	castellatedHoles: {
		Yes: number;
		No: number;
	};
	leadTime: {
		"3 Working days": number;
		"5 Working days": number;
		"7 Working days": number;
		"10 Working days": number;
	};
	dispatchUnit: {
		Pcb: {
			1: number;
			2_5: number;
			6_10: number;
			above10: number;
		};
		Panel: number;
	};
	quantity: {
		upTo100: number;
		101_200: number;
		201_300: number;
		301_400: number;
		above400: number;
	};
	viaCovering: {
		tented: number;
		untented: number;
		plugged: number;
		epoxyFilledCapped: number;
	};
	boardOutlineTolerance: {
		regularCncRouting: number;
		precisionCncRouting: number;
	};
	goldThickness: {
		'1 U"': number;
		'2 U"': number;
	};
	edgeRailSize: {
		"5mm": number;
		"7mm": number;
		"10mm": number;
	};
	thermalConductivity: {
		1: number;
		380: number;
	};
	breakDownVoltage: {
		3000: number;
	};
	copperStructure: {
		directHeatSink: number;
	};
	innerCuWeight: {
		"0.5 oz": number;
		"1 oz": number;
		"2 oz": number;
	};
	impedenceControl: {
		Yes: number;
		No: number;
	};
	castellatedHolesEdges: {
		1: number;
		2: number;
		3: number;
		4: number;
	};
	chamferedGoldFingers: {
		No: number;
		Yes: number;
	};
	minViaHoleSizeAndDiameter: {
		"0.3mm/(0.4/0.45mm)": number;
		"0.25mm/(0.35/0.40mm)": number;
		"0.2mm/(0.3/0.35mm)": number;
		"0.15mm/(0.25/0.3mm)": number;
	};
	material: {
		"FR4-Standard TG 135-140": number;
		"FR-4 TG155": number;
	};
	viaHoles: {
		1_50: number;
		51_100: number;
		101_150: number;
		151_200: number;
		above200: number;
	};
};

type FlexPcbRateCardType = {
	baseMaterial: {
		flex: number;
	};
	layer: {
		1: number;
		2: number;
	};
	dimensions: {
		boardSizeX: number;
		boardSizeY: number;
	};
	quantity: {
		upTo100: number;
		101_200: number;
		201_300: number;
		301_400: number;
		above400: number;
	};
	differentDesigns: {
		"1 Design": number;
		"2 Designs": number;
		"3 Designs": number;
		"4 Designs": number;
	};
	designFormat: {
		"Single PCB": number;
		"Panel by Customer": number;
		"Panel by Manufacturer": number;
	};
	edgeRailSize: {
		"5mm": number;
		"7mm": number;
		"10mm": number;
	};
	boardThickness: {
		0.07: number;
		0.11: number;
		0.12: number;
		0.2: number;
	};
	coverlay: {
		Yellow: number;
	};
	silkscreenColor: {
		White: number;
	};
	surfaceFinish: {
		ENIG: number;
	};
	copperType: {
		Electrodeposited: number;
	};
	goldThickness: {
		'1 U"': number;
		'2 U"': number;
	};
	outerCuWeight: {
		"0.5 oz": number;
		"1/3 oz": number;
	};
	coverlayThickness: {
		"PI:12.5um/AD:15um": number;
	};
	stiffner: {
		polyimide: {
			0.1: number;
			0.15: number;
			0.2: number;
			0.225: number;
			0.25: number;
		};
		threeMTape: {
			"3M468 (0.13mm)": number;
			"3M9077 (HT, 0.05mm)": number;
		};
		stainlessSteel: {
			0.1: number;
			0.2: number;
			0.3: number;
		};
		fr4: {
			0.1: number;
			0.2: number;
		};
	};
	emiShielding: {
		"Both sides (Black, 18um)": number;
		"Single side (Black, 18um)": number;
	};
	cuttingMethod: {
		laser: number;
	};
	boardOutlineTolerance: {
		regularCncRouting: number;
		precisionCncRouting: number;
	};
	dispatchUnit: {
		Pcb: {
			1: number;
			2_5: number;
			6_10: number;
			above10: number;
		};
		Panel: number;
	};
	leadTime: {
		"3 Working days": number;
		"5 Working days": number;
		"7 Working days": number;
		"10 Working days": number;
	};
	viaHoles: {
		1_50: number;
		51_100: number;
		101_150: number;
		151_200: number;
		above200: number;
	};
};

type PcbAssemblyRateCardType = {
	boardType: {
		single: number;
		panel: {
			2: number;
			3_5: number;
			6_10: number;
			above10: number;
		};
	};
	assemblySides: {
		"Top Side": number;
		"Bottom Side": number;
		"Both Sides": number;
	};
	quantity: {
		upTo10: number;
		11_50: number;
		51_100: number;
		101_500: number;
		above500: number;
	};
	uniqueComponents: {
		upTo5: number;
		6_10: number;
		11_20: number;
		above20: number;
	};
	smdParts: {
		upTo10: number;
		11_20: number;
		21_50: number;
		above50: number;
	};
	bgaQfpParts: {
		upTo2: number;
		3_5: number;
		above5: number;
	};
	throughHoleParts: {
		upTo5: number;
		6_10: number;
		11_20: number;
		above20: number;
	};
	tempHumiditySensitive: {
		low: number;
		moderate: number;
		high: number;
	};
	dePanel: {
		1: number;
		2_5: number;
		6_10: number;
		above10: number;
	};
	conformalCoating: {
		"Top Side": number;
		"Bottom Side": number;
		"Both Sides": number;
	};
	functionalTesting: number;
	turnaroundTime: {
		standard: number;
		expedited: number;
		rush: number;
	};
	oneTimeSetupCharges: {
		single: number;
		panel2: number;
		panel3_5: number;
		panel6_10: number;
		panel10_above: number;
	};
};

/****************************** CART *********************************************/
type CartDataType = {
	cartId?: string; // used only with guest carts
	cartSize: number;
	cartItems: Array<PartDataType | RigidPcbFabSpecsType | FlexPcbFabSpecsType | PcbAssemblyFabSpecsType>;
};

/****************************** USER *********************************************/
type UserType = {
	createdAt: Date;
	userId: string;
	email: string;
	firstName: string;
	lastName: string;
	cart: CartDataType;
	billingAddresses: Array<AddressType>;
	shippingAddresses: Array<AddressType>;
	orders: Array<OrderType>;
};

/****************************** ADDRESS *********************************************/
type AddressType = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	pincode: string;
	company: string;
	country: string;
} & (BillingAddressProps | ShippingAddressProps);

type BillingAddressProps = {
	type: "Billing Address";
	gst: string;
	po: string;
};

type ShippingAddressProps = {
	type: "Shipping Address";
	landmark: string;
	shippingInstructions: string;
};

/****************************** RAZORPAY *********************************************/
type RazorpayResponseType = {
	razorpay_payment_id: string;
	razorpay_order_id: string;
	razorpay_signature: string;
};

type RazorpayErrorType = {
	error: {
		code: string;
		description: string;
		source: string;
		step: string;
		reason: string;
		metadata: { order_id: string; payment_id: string };
	};
};

/****************************** ORDER *********************************************/
type OrderType = {
	id: string;
	createdAt: Date;
	status: "PLACED" | "PROCESSING" | "SHIPPED" | "COMPLETE" | "CANCELLED" | "REJECTED";
	cartValue: number;
	discountCode: string;
	discountValue: number;
	tax: number;
	shippingCost: number;
	cartTotal: number;
	paymentId: string;
	paymentOrderId: string;
	paymentSignature: string;
	shipper: string | null;
	awb: string | null;
	billingAddress: AddressType;
	shippingAddress: AddressType;
	cart: CartDataType;
	remarks: string | null;
};

type OpenOrderType = Unwrap<
	OrderType & {
		userId: string | null;
		notes: string | null;
	}
>;

/****************************** ACTION PROPS *********************************************/
type SignupPropsType = Pick<UserType, "userId" | "firstName" | "lastName" | "email">;

type CartUpdatePropsType = PartDataType | FlexPcbFabSpecsType | RigidPcbFabSpecsType | PcbAssemblyFabSpecsType;

type UpdatePartQtyPropsType = {
	name: string;
	newQty: number;
};

type NewAddressPropsType = {
	billingAddress: AddressType;
	shippingAddress: AddressType;
};

type FetchAddressesPropsType = Pick<UserType, "billingAddresses" | "shippingAddresses">;

type RazorpayPropsType = {
	razorpayResponses: RazorpayResponseType;
	razorpayOrderValue: string;
};

type CheckoutDataType = Pick<UserType, "cart" | "billingAddresses" | "shippingAddresses">;

type FieldsType = {
	acl: string;
	"Content-Type": string;
	bucket: string;
	"X-Amz-Algorithm": string;
	"X-Amz-Credential": string;
	"X-Amz-Date": string;
	key: string;
	Policy: string;
	"X-Amz-Signature": string;
};
