import { z } from "zod";

export const RigidPcbFabSpecsTypeSchema = z.object({
	Name: z.string(),
	Type: z.literal("Rigid PCB"),
	Category: z.literal("PCB"),
	OrderedQty: z.number(),
	Layer: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(6), z.literal(8), z.literal(10)]),
	BaseMaterial: z.union([z.literal("FR4"), z.literal("Aluminum"), z.literal("CopperCore"), z.literal("Rogers")]),
	DesignFormat: z.union([
		z.literal("Single PCB"),
		z.literal("Panel by Customer"),
		z.literal("Panel by Manufacturer"),
	]),
	DifferentDesignsInPanel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
	Material: z
		.union([
			z.literal("FR4-Standard TG 135-140"),
			z.literal("FR-4 TG155"),
			z.literal("RO4350B (Dk=3.48, Df=0.0037)"),
			z.literal("FR-4 TG170"),
		])
		.nullable(),
	BoardSizeX: z.number(),
	BoardSizeY: z.number(),
	PanelQty: z
		.union([
			z.literal(5),
			z.literal(10),
			z.literal(15),
			z.literal(20),
			z.literal(25),
			z.literal(30),
			z.literal(50),
			z.literal(75),
			z.literal(100),
			z.literal(125),
			z.literal(150),
			z.literal(200),
			z.literal(250),
			z.literal(300),
			z.literal(400),
			z.literal(450),
			z.literal(500),
			z.literal(600),
			z.literal(700),
			z.literal(800),
			z.literal(900),
			z.literal(1000),
			z.literal(1500),
			z.literal(2000),
		])
		.nullable(),
	Columns: z.number().nullable(),
	Rows: z.number().nullable(),
	SinglePiecesQty: z.number().nullable(),
	PcbQty: z
		.union([
			z.literal(5),
			z.literal(10),
			z.literal(15),
			z.literal(20),
			z.literal(25),
			z.literal(30),
			z.literal(50),
			z.literal(75),
			z.literal(100),
			z.literal(125),
			z.literal(150),
			z.literal(200),
			z.literal(250),
			z.literal(300),
			z.literal(400),
			z.literal(450),
			z.literal(500),
			z.literal(600),
			z.literal(700),
			z.literal(800),
			z.literal(900),
			z.literal(1000),
			z.literal(1500),
			z.literal(2000),
		])
		.nullable(),
	BoardThickness: z.union([
		z.literal(0.51),
		z.literal(0.76),
		z.literal(1.52),
		z.literal(0.4),
		z.literal(0.6),
		z.literal(0.8),
		z.literal(1),
		z.literal(1.2),
		z.literal(1.6),
		z.literal(2),
	]),
	Soldermask: z.union([
		z.literal("Green"),
		z.literal("Purple"),
		z.literal("Red"),
		z.literal("Yellow"),
		z.literal("Blue"),
		z.literal("Black"),
		z.literal("White"),
	]),
	Silkscreen: z.union([z.literal("White"), z.literal("Black")]),
	SurfaceFinish: z.union([
		z.literal("HASL(with lead)"),
		z.literal("LeadFree HASL"),
		z.literal("ENIG"),
		z.literal("OSP"),
	]),
	GoldFingers: z.union([z.literal("Yes"), z.literal("No")]),
	GoldThickness: z.union([z.literal('1 U"'), z.literal('2 U"')]).nullable(),
	EdgeRails: z.union([z.literal("No"), z.literal("On 2 Sides"), z.literal("On 4 Sides")]).nullable(),
	EdgeRailSize: z.union([z.literal("5mm"), z.literal("7mm"), z.literal("10mm")]).nullable(),
	PanelSizeX: z.number().nullable(),
	PanelSizeY: z.number().nullable(),
	OuterCuWeight: z.union([z.literal("1 oz"), z.literal("2 oz")]),
	CopperStructure: z.literal("Direct Heatsink").nullable(),
	ThermalConductivity: z.union([z.literal(1), z.literal(380)]).nullable(),
	BreakDownVoltage: z.literal(3000).nullable(),
	InnerCuWeight: z.union([z.literal("0.5 oz"), z.literal("1 oz"), z.literal("2 oz")]).nullable(),
	ImpedanceControl: z.union([z.literal("Yes"), z.literal("No")]).nullable(),
	ViaCovering: z
		.union([
			z.literal("Tented"),
			z.literal("Untented"),
			z.literal("Plugged"),
			z.literal("Epoxy Filled & Capped"),
			z.literal("Epoxy Filled & Untented"),
			z.literal("Copper paste Filled & Capped"),
		])
		.nullable(),
	MinViaHoleSizeAndDiameter: z
		.union([
			z.literal("0.3mm/(0.4/0.45mm)"),
			z.literal("0.25mm/(0.35/0.40mm)"),
			z.literal("0.2mm/(0.3/0.35mm)"),
			z.literal("0.15mm/(0.25/0.3mm)"),
		])
		.nullable(),
	BoardOutlineTolerance: z.union([z.literal("\u00B10.2mm(Regular)"), z.literal("\u00B10.1mm(Precision)")]).nullable(),
	ViaHoles: z.number().nullable(),
	CastellatedHoles: z.union([z.literal("Yes"), z.literal("No")]),
	CastellatedHolesEdges: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).nullable(),
	ChamferedGoldFingers: z.union([z.literal("Yes"), z.literal("No")]).nullable(),
	LeadTime: z.union([
		z.literal("3 Working days"),
		z.literal("5 Working days"),
		z.literal("7 Working days"),
		z.literal("10 Working days"),
	]),
	DispatchUnit: z.union([z.literal("PCB"), z.literal("Panel")]),
	NetPrice: z.number(),
	DesignFile: z.string(),
});

export const FlexPcbFabSpecsTypeSchema = z.object({
	Name: z.string(),
	Type: z.literal("Flex PCB"),
	Category: z.literal("PCB"),
	OrderedQty: z.number(),
	BaseMaterial: z.literal("Flex (Polyimide)"),
	Layer: z.union([z.literal(1), z.literal(2)]),
	BoardSizeX: z.number(),
	BoardSizeY: z.number(),
	PcbQty: z
		.union([
			z.literal(5),
			z.literal(10),
			z.literal(15),
			z.literal(20),
			z.literal(25),
			z.literal(30),
			z.literal(50),
			z.literal(75),
			z.literal(100),
			z.literal(125),
			z.literal(150),
			z.literal(200),
			z.literal(250),
			z.literal(300),
			z.literal(400),
			z.literal(450),
			z.literal(500),
			z.literal(600),
			z.literal(700),
			z.literal(800),
			z.literal(900),
			z.literal(1000),
			z.literal(1500),
			z.literal(2000),
		])
		.nullable(),
	SinglePiecesQty: z.number().nullable(),
	DesignFormat: z.union([
		z.literal("Single PCB"),
		z.literal("Panel by Customer"),
		z.literal("Panel by Manufacturer"),
	]),
	DifferentDesignsInPanel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
	PanelQty: z
		.union([
			z.literal(5),
			z.literal(10),
			z.literal(15),
			z.literal(20),
			z.literal(25),
			z.literal(30),
			z.literal(50),
			z.literal(75),
			z.literal(100),
			z.literal(125),
			z.literal(150),
			z.literal(200),
			z.literal(250),
			z.literal(300),
			z.literal(400),
			z.literal(450),
			z.literal(500),
			z.literal(600),
			z.literal(700),
			z.literal(800),
			z.literal(900),
			z.literal(1000),
			z.literal(1500),
			z.literal(2000),
		])
		.nullable(),
	Columns: z.number().nullable(),
	Rows: z.number().nullable(),
	BoardThickness: z.union([z.literal(0.07), z.literal(0.11), z.literal(0.12), z.literal(0.2)]),
	Coverlay: z.literal("Yellow"),
	CoverlayThickness: z.union([z.literal("PI:12.5um/AD:15um"), z.literal("PI:25um/AD:25um")]),
	Silkscreen: z.literal("White"),
	SurfaceFinish: z.literal("ENIG"),
	GoldThickness: z.union([z.literal('1 U"'), z.literal('2 U"')]).nullable(),
	EdgeRails: z.union([z.literal("No"), z.literal("On 2 Sides"), z.literal("On 4 Sides")]).nullable(),
	EdgeRailSize: z.union([z.literal("5mm"), z.literal("7mm"), z.literal("10mm")]).nullable(),
	OuterCuWeight: z.union([z.literal("0.5 oz"), z.literal("1/3 oz"), z.literal("1.0 oz")]),
	BoardOutlineTolerance: z.union([z.literal("\u00B10.1mm"), z.literal("\u00B10.05mm")]).nullable(),
	ViaHoles: z.number().nullable(),
	LeadTime: z.union([
		z.literal("3 Working days"),
		z.literal("5 Working days"),
		z.literal("7 Working days"),
		z.literal("10 Working days"),
	]),
	DispatchUnit: z.union([z.literal("PCB"), z.literal("Panel")]),
	CopperType: z.literal("Electro-deposited"),
	Stiffner: z.array(
		z.union([
			z.literal("Without"),
			z.literal("Polyimide"),
			z.literal("FR4"),
			z.literal("Stainless Steel"),
			z.literal("3M Tape"),
		])
	),
	PolyimideThickness: z
		.union([z.literal(0.1), z.literal(0.15), z.literal(0.2), z.literal(0.225), z.literal(0.25)])
		.nullable(),
	FR4Thickness: z.union([z.literal(0.1), z.literal(0.2)]).nullable(),
	StainlessSteelThickness: z.union([z.literal(0.1), z.literal(0.2), z.literal(0.3)]).nullable(),
	ThreeMTapeThickness: z.union([z.literal("3M468 (0.13mm)"), z.literal("3M9077 (HT, 0.05mm)")]).nullable(),
	EMIShieldingFilm: z.union([
		z.literal("Without"),
		z.literal("Both sides (Black, 18um)"),
		z.literal("Single side (Black, 18um)"),
	]),
	CuttingMethod: z.literal("Laser Cutting"),
	NetPrice: z.number(),
	DesignFile: z.string(),
});

export const PcbAssemblyFabSpecsTypeSchema = z.object({
	Name: z.string(),
	Type: z.literal("PCB Assembly"),
	Category: z.literal("PCB"),
	BoardType: z.union([z.literal("Single PCB"), z.literal("Panel")]),
	PcbsPerPanel: z.number().nullable(),
	OrderedQty: z.number(),
	AssemblySides: z.union([z.literal("Top Side"), z.literal("Bottom Side"), z.literal("Both Sides")]),
	NumOfUniqueComponents: z.number(),
	NumOfSmdComponents: z.number(),
	NumOfBgaComponents: z.number(),
	NumOfThroughHoleComponents: z.number(),
	TempHumiditySensitivity: z.union([z.literal("Low"), z.literal("Medium"), z.literal("High")]),
	DePanel: z.union([z.literal("Yes"), z.literal("No")]),
	ConformalCoating: z.union([z.literal("Top Side"), z.literal("Bottom Side"), z.literal("Both Sides")]),
	FunctionalTest: z.union([z.literal("Yes"), z.literal("No")]),
	ComponentsProcurement: z.union([z.literal("TurnKey"), z.literal("Consigned"), z.literal("Combo")]),
	TurnaroundTime: z.union([z.literal("Standard 5-7 days"), z.literal("Expedited 3-4 days")]),
	OneTimeSetupCosts: z.number(),
	NetPrice: z.number(),
	BOMFile: z.string(),
	GerberFile: z.string(),
	PickAndPlaceFile: z.string(),
});
