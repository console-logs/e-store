export const RigidPcbRateCard: RigidPcbRateCardType = {
	baseMaterial: {
		FR4: 10,
		Aluminum: 15,
		CopperCore: 20,
		Rogers: 25,
	},
	material: {
		"FR4-Standard TG 135-140": 10,
		"FR-4 TG155": 12,
	},
	layer: {
		1: 100,
		2: 150,
		4: 200,
		6: 250,
		8: 300,
		10: 350,
	},
	dimensions: {
		boardSizeX: 1,
		boardSizeY: 1,
	},
	quantity: {
		// discounted
		upTo100: -0,
		101_200: -0.05,
		201_300: -0.1,
		301_400: -0.15,
		above400: -0.2,
	},
	differentDesigns: {
		"1 Design": 0,
		"2 Designs": 50,
		"3 Designs": 100,
		"4 Designs": 150,
	},
	designFormat: {
		"Single PCB": 0,
		"Panel by Customer": 50,
		"Panel by Manufacturer": 100,
	},
	pcbThickness: {
		0.4: 100,
		0.6: 120,
		0.8: 140,
		1.0: 160,
		1.2: 180,
		1.6: 200,
		2.0: 220,
	},
	soldermaskColor: {
		Green: 0,
		Purple: 5,
		Red: 10,
		Yellow: 15,
		Blue: 20,
		Black: 25,
		White: 30,
	},
	silkscreenColor: {
		White: 0,
		Black: 10,
	},
	surfaceFinish: {
		"HASL(with lead)": 0,
		"LeadFree HASL": 10,
		ENIG: 20,
		OSP: 20,
	},
	outerCuWeight: {
		"1 oz": 50,
		"2 oz": 100,
	},
	goldFingers: {
		No: 0,
		Yes: 50,
	},
	castellatedHoles: {
		No: 0,
		Yes: 10,
	},
	leadTime: {
		"3 Working days": 60,
		"5 Working days": 40,
		"7 Working days": 20,
		"10 Working days": 0,
	},
	dispatchUnit: {
		Panel: 0,
		Pcb: {
			1: 0, // pcbs / panel
			2_5: 200, // pcbs / panel
			6_10: 300, // pcbs / panel
			above10: 400, // pcbs / panel
		},
	},
	viaCovering: {
		tented: 0,
		untented: 5,
		plugged: 10,
		epoxyFilledCapped: 15,
	},
	boardOutlineTolerance: {
		regularCncRouting: 0,
		precisionCncRouting: 10,
	},
	goldThickness: {
		'1 U"': 10,
		'2 U"': 20,
	},
	edgeRailSize: {
		"5mm": 5,
		"7mm": 7,
		"10mm": 10,
	},
	thermalConductivity: {
		1: 5,
		380: 15,
	},
	breakDownVoltage: {
		3000: 10,
	},
	copperStructure: {
		directHeatSink: 10,
	},
	innerCuWeight: {
		"0.5 oz": 30,
		"1 oz": 50,
		"2 oz": 100,
	},
	impedenceControl: {
		Yes: 20,
		No: 0,
	},
	castellatedHolesEdges: {
		1: 5,
		2: 10,
		3: 15,
		4: 20,
	},
	chamferedGoldFingers: {
		No: 0,
		Yes: 10,
	},
	minViaHoleSizeAndDiameter: {
		"0.3mm/(0.4/0.45mm)": 5, // Example rate
		"0.25mm/(0.35/0.40mm)": 10, // Example rate
		"0.2mm/(0.3/0.35mm)": 15, // Example rate
		"0.15mm/(0.25/0.3mm)": 20, // Example rate
	},
	viaHoles: {
		1_50: 5,
		51_100: 10,
		101_150: 15,
		151_200: 20,
		above200: 25,
	},
};