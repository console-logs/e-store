import { z } from "zod";

export const RigidPcbFabSpecsTypeSchema = z.object({
	pcbname: z.string(),
	layer: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(6), z.literal(8), z.literal(10)]),
	baseMaterial: z.union([z.literal("FR4"), z.literal("Aluminum"), z.literal("CopperCore"), z.literal("Rogers")]),
	designFormat: z.union([
		z.literal("Single PCB"),
		z.literal("Panel by Customer"),
		z.literal("Panel by Manufacturer"),
	]),
	differentDesignsInPanel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
	material: z
		.union([
			z.literal("FR4-Standard TG 135-140"),
			z.literal("FR-4 TG155"),
			z.literal("RO4350B (Dk=3.48, Df=0.0037)"),
			z.literal("FR-4 TG170"),
		])
		.nullable(),
	boardSizeX: z.number(),
	boardSizeY: z.number(),
	panelQty: z
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
	columns: z.number().nullable(),
	rows: z.number().nullable(),
	singlePiecesQty: z.number().nullable(),
	pcbQty: z
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
	boardThickness: z.union([
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
	soldermask: z.union([
		z.literal("Green"),
		z.literal("Purple"),
		z.literal("Red"),
		z.literal("Yellow"),
		z.literal("Blue"),
		z.literal("Black"),
		z.literal("White"),
	]),
	silkscreen: z.union([z.literal("White"), z.literal("Black")]),
	surfaceFinish: z.union([
		z.literal("HASL(with lead)"),
		z.literal("LeadFree HASL"),
		z.literal("ENIG"),
		z.literal("OSP"),
	]),
	goldFingers: z.union([z.literal("Yes"), z.literal("No")]),
	goldThickness: z.union([z.literal('1 U"'), z.literal('2 U"')]).nullable(),
	edgeRails: z.union([z.literal("No"), z.literal("On 2 Sides"), z.literal("On 4 Sides")]).nullable(),
	edgeRailSize: z.union([z.literal("5mm"), z.literal("7mm"), z.literal("10mm")]).nullable(),
	panelSizeX: z.number().nullable(),
	panelSizeY: z.number().nullable(),
	outerCuWeight: z.union([z.literal("1 oz"), z.literal("2 oz")]),
	copperStructure: z.literal("Direct Heatsink").nullable(),
	thermalConductivity: z.union([z.literal(1), z.literal(380)]).nullable(),
	breakDownVoltage: z.literal(3000).nullable(),
	innerCuWeight: z.union([z.literal("0.5 oz"), z.literal("1 oz"), z.literal("2 oz")]).nullable(),
	impedenceControl: z.union([z.literal("Yes"), z.literal("No")]).nullable(),
	viaCovering: z
		.union([
			z.literal("Tented"),
			z.literal("Untented"),
			z.literal("Plugged"),
			z.literal("Epoxy Filled & Capped"),
			z.literal("Epoxy Filled & Untented"),
			z.literal("Copper paste Filled & Capped"),
		])
		.nullable(),
	minViaHoleSizeAndDiameter: z
		.union([
			z.literal("0.3mm/(0.4/0.45mm)"),
			z.literal("0.25mm/(0.35/0.40mm)"),
			z.literal("0.2mm/(0.3/0.35mm)"),
			z.literal("0.15mm/(0.25/0.3mm)"),
		])
		.nullable(),
	boardOutlineTolerance: z.union([z.literal("\u00B10.2mm(Regular)"), z.literal("\u00B10.1mm(Precision)")]).nullable(),
	viaHoles: z.number().nullable(),
	castellatedHoles: z.union([z.literal("Yes"), z.literal("No")]),
	castellatedHolesEdges: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).nullable(),
	chamferedGoldFingers: z.union([z.literal("Yes"), z.literal("No")]).nullable(),
	leadTime: z.union([
		z.literal("3 Working days"),
		z.literal("5 Working days"),
		z.literal("7 Working days"),
		z.literal("10 Working days"),
	]),
	dispatchUnit: z.union([z.literal("PCB"), z.literal("Panel")]),
	calculatedPrice: z.number(),
	designFile: z.string(),
});

export const FlexPcbFabSpecsTypeSchema = z.object({
	pcbname: z.string(),
	baseMaterial: z.literal("Flex (Polyimide)"),
	layer: z.union([z.literal(1), z.literal(2)]),
	boardSizeX: z.number(),
	boardSizeY: z.number(),
	pcbQty: z
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
	singlePiecesQty: z.number().nullable(),
	designFormat: z.union([
		z.literal("Single PCB"),
		z.literal("Panel by Customer"),
		z.literal("Panel by Manufacturer"),
	]),
	differentDesignsInPanel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
	panelQty: z
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
	columns: z.number().nullable(),
	rows: z.number().nullable(),
	boardThickness: z.union([z.literal(0.07), z.literal(0.11), z.literal(0.12), z.literal(0.2)]),
	coverlay: z.literal("Yellow"),
	coverlayThickness: z.union([z.literal("PI:12.5um/AD:15um"), z.literal("PI:25um/AD:25um")]),
	silkscreen: z.literal("White"),
	surfaceFinish: z.literal("ENIG"),
	goldThickness: z.union([z.literal('1 U"'), z.literal('2 U"')]).nullable(),
	edgeRails: z.union([z.literal("No"), z.literal("On 2 Sides"), z.literal("On 4 Sides")]).nullable(),
	edgeRailSize: z.union([z.literal("5mm"), z.literal("7mm"), z.literal("10mm")]).nullable(),
	outerCuWeight: z.union([z.literal("0.5 oz"), z.literal("1/3 oz"), z.literal("1.0 oz")]),
	boardOutlineTolerance: z.union([z.literal("\u00B10.1mm"), z.literal("\u00B10.05mm")]).nullable(),
	viaHoles: z.number().nullable(),
	leadTime: z.union([
		z.literal("3 Working days"),
		z.literal("5 Working days"),
		z.literal("7 Working days"),
		z.literal("10 Working days"),
	]),
	dispatchUnit: z.union([z.literal("PCB"), z.literal("Panel")]),
	copperType: z.literal("Electro-deposited"),
	stiffner: z.array(
		z.union([
			z.literal("Without"),
			z.literal("Polyimide"),
			z.literal("FR4"),
			z.literal("Stainless Steel"),
			z.literal("3M Tape"),
		])
	),
	polyimideThickness: z
		.union([z.literal(0.1), z.literal(0.15), z.literal(0.2), z.literal(0.225), z.literal(0.25)])
		.nullable(),
	fr4Thickness: z.union([z.literal(0.1), z.literal(0.2)]).nullable(),
	stainlessSteelThickness: z.union([z.literal(0.1), z.literal(0.2), z.literal(0.3)]).nullable(),
	threeMTapeThickness: z.union([z.literal("3M468 (0.13mm)"), z.literal("3M9077 (HT, 0.05mm)")]).nullable(),
	emiShieldingFilm: z.union([
		z.literal("Without"),
		z.literal("Both sides (Black, 18um)"),
		z.literal("Single side (Black, 18um)"),
	]),
	cuttingMethod: z.literal("Laser Cutting"),
	calculatedPrice: z.number(),
	designFile: z.string(),
});

export const PcbAssemblyFabSpecsTypeSchema = z.object({
	projectName: z.string(),
	boardType: z.union([z.literal("Single PCB"), z.literal("Panel")]),
	pcbsPerPanel: z.number().nullable(),
	quantity: z.number(),
	assemblySides: z.union([z.literal("Top Side"), z.literal("Bottom Side"), z.literal("Both Sides")]),
	numOfUniqueComponents: z.number(),
	numOfSmdComponents: z.number(),
	numOfBgaComponents: z.number(),
	numOfThroughHoleComponents: z.number(),
	tempHumiditySensitivity: z.union([z.literal("Low"), z.literal("Medium"), z.literal("High")]),
	dePanel: z.union([z.literal("Yes"), z.literal("No")]),
	conformalCoating: z.union([z.literal("Top Side"), z.literal("Bottom Side"), z.literal("Both Sides")]),
	functionalTest: z.union([z.literal("Yes"), z.literal("No")]),
	componentsProcurement: z.union([z.literal("TurnKey"), z.literal("Consigned"), z.literal("Combo")]),
	turnaroundTime: z.union([z.literal("Standard 5-7 days"), z.literal("Expedited 3-4 days")]),
	oneTimeSetupCosts: z.number(),
	calculatedPrice: z.number(),
	bomFile: z.string(),
	gerberFile: z.string(),
	pickAndPlaceFile: z.string(),
});