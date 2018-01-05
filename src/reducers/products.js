import {
    TOGGLE_EXPAND_ALL_ROWS,
    UPDATE_QUANTITY,
    UPDATE_PRODUCTS,
    PLACE_ORDER,
    CLEAR_PRODUCT_QUANTITIES,
} from '../constants';

const initialState = [
	// {
	// 	"image": "http://wellworthnewengland.com/images/_DoubleDazzle.jpg",
	// 	"title": "Double Dazzle Tire Shine two sizes",
	// 	"item": 0,
	// 	"description": "Ready to use water base white silicone emulsion dressing. Won't attract dust. Use on interior vinyl, vinyl tops/covers.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/DOUBLE_DAZZLE.pdf",
	// 			"price": 100, 
	// 			"key": 20451,
	// 			"size": "1-gal"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/DOUBLE_DAZZLE.pdf",
	// 			"price": 100, 
	// 			"key": 20455,
	// 			"size": "5-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/_WasherFluid110153.jpg",
	// 	"title": "Windshield Washer Fluid",
	// 	"item": 2,
	// 	"description": "55 gallon Pre-Mix Windshield Washer Fluid. MSDS Win Wash.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/SDS-20_Splash_Windshield_Washer_Fluid.pdf",
	// 			"price": 100, 
	// 			"key": 110153,
	// 			"size": "55-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/03__WaterlessWashAndWax.jpg",
	// 	"title": "W3 Waterless Wash and Wax",
	// 	"item": 3,
	// 	"description": "One Step Wash and Wax.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/215232.pdf",
	// 			"price": 100, 
	// 			"key": 21525,
	// 			"size": "5-gal"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/215232.pdf",
	// 			"price": 100, 
	// 			"key": 215232,
	// 			"size": "1-qt"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/215232.pdf",
	// 			"price": 100, 
	// 			"key": 21521,
	// 			"size": "1-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/03_StreakFreeRTU.jpg",
	// 	"title": "Streak Free RTU",
	// 	"item": 4,
	// 	"description": "Economical, ready to use glass cleaner. Professional formula contains no soap or ammonia and leaves glass, mirrors and chrome sparkling clean.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/STREAK_FREE_RTU.pdf",
	// 			"price": 100, 
	// 			"key": 20661,
	// 			"size": "1-gal"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/STREAK_FREE_RTU.pdf",
	// 			"price": 100, 
	// 			"key": 20665,
	// 			"size": "5-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/05_FoamCitrusSurface.jpg",
	// 	"title": "Foaming Citrus Surface Cleaner",
	// 	"item": 5,
	// 	"description": "A foaming all purpose cleaner that instantly cleans Bugs, vinyl, plastic and hard surfaces. Biodegradable formula is non-corrosive, non-caustic.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/CITRUS_SURFACE_CLEANER.pdf",
	// 			"price": 100, 
	// 			"key": 21411,
	// 			"size": "1-gal"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/CITRUS_SURFACE_CLEANER.pdf",
	// 			"price": 100, 
	// 			"key": 21415,
	// 			"size": "5-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/01_SudsNShine.jpg",
	// 	"title": "Sudz 'n Shine",
	// 	"item": 6,
	// 	"description": "Wash and wax liquid soap. Thick shampoo produces a rich sudsy lather. Rinses spot free to leave a clean, just waxed look on any vehicle finish.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/SUDZ_AND_SHINE.pdf",
	// 			"price": 100, 
	// 			"key": 20671,
	// 			"size": "1-gal"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/SUDZ_AND_SHINE.pdf",
	// 			"price": 100, 
	// 			"key": 20675,
	// 			"size": "5-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/04_EcoKleen.jpg",
	// 	"title": "EcoKleen NEUTRAL RTU",
	// 	"item": 7,
	// 	"description": "High alkaline, concentrated, water base degreaser. Removes dirt and grease from interiors and exteriors. Biodegradable formula can be diluted as needed.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/SDS_ECOKLEEN_NEUTRAL_2161.pdf",
	// 			"price": 100, 
	// 			"key": 21611,
	// 			"size": "1-gal"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/SDS_ECOKLEEN_NEUTRAL_2161.pdf",
	// 			"price": 100, 
	// 			"key": 21615,
	// 			"size": "5-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/06_Resurrect.jpg",
	// 	"title": "Resurrect Rug Cleaner",
	// 	"item": 8,
	// 	"description": "Concentrated rug and fabric shampoo. Deep cleaning foam safely removes dirt and grease from cloth and velour, as well as, carpets and vinyl",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/RESURRECT.pdf",
	// 			"price": 100, 
	// 			"key": 20611,
	// 			"size": "1-gal"
	// 		},
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/RESURRECT.pdf",
	// 			"price": 100, 
	// 			"key": 20615,
	// 			"size": "5-gal"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/02_WipeOut.jpg",
	// 	"title": "Wipe Out Odor Eliminator",
	// 	"item": 9,
	// 	"description": "Liquid odor eliminator. Quickly eliminates most odors by destroying the sources that cause them (bacteria, mold or mildew). Spray directly on carpets, under seats and in air vents to freshen the air.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/WIPE_OUT.pdf",
	// 			"price": 100, 
	// 			"key": 207232,
	// 			"size": "Qt."
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/OdorMedic.jpg",
	// 	"title": "Odor Medic",
	// 	"item": 10,
	// 	"description": "Liquid odor eliminator. Quickly eliminates most odors by destroying the sources that cause them (bacteria, mold or mildew). Spray directly on carpets, under seats and in air vents to freshen the air.",
	// 	"options": [
	// 		{
	// 			"spec": "http://wellworthnewengland.com/pdfs/ODOR_MEDIC.pdf",
	// 			"price": 100, 
	// 			"key": 30175,
	// 			"size": "Qt."
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/07_10inchTruckBrush.jpg",
	// 	"title": "Wash Brushes",
	// 	"item": 11,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "132-3033",
	// 			"size": "10\""
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/07_10inchTruckBrush.jpg",
	// 	"title": "Brush Handles",
	// 	"item": 12,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "2009-6",
	// 			"size": "54\""
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/09_TriggerSprayer.jpg",
	// 	"title": "Spray Bottles WW Label",
	// 	"item": 13,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": 120125
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/09_TriggerSprayer.jpg",
	// 	"title": "Foaming Trigger Sprayer",
	// 	"item": 14,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": 110531
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/09_TriggerSprayer.jpg",
	// 	"title": "Trigger Sprayers",
	// 	"item": 0,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "A01-10"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/12_SnowRake.jpg",
	// 	"title": "Snow Rake",
	// 	"item": 15,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "105-500"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/_N903NitrileGloves.jpg",
	// 	"title": "NEEDS TITLE",
	// 	"item": 16,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "N903",
	// 			"size": "Large"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/_NWP310.jpg",
	// 	"title": "Blue Flat Shop Towels",
	// 	"item": 17,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "NWP310"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/_MF1MicoFiberTowels.jpg",
	// 	"title": "Micro Fiber Towels",
	// 	"item": 18,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "MF-1-36"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/13b_TorkTowels.jpg",
	// 	"title": "Tork Blue Shop Towels  2/cs.",
	// 	"item": 19,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": 132441
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/13a_TorkDispenser.jpg",
	// 	"title": "Tork Dispenser",
	// 	"item": 20,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": 203051
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/08_WashMitt.jpg",
	// 	"title": "Wash Mitt",
	// 	"item": 21,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": 2097
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/_VH20VacHose.jpg",
	// 	"title": "45' Vacuum Hose",
	// 	"item": 22,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "VH2.0"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/_VV2.jpg",
	// 	"title": "Vacuum Nozzle",
	// 	"item": 23,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "VV2"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "http://wellworthnewengland.com/images/14_Motor.jpg",
	// 	"title": "Vacuum Motor",
	// 	"item": 24,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "2M266"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "",
	// 	"title": "Bug Sponge",
	// 	"item": 25,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "A08-02"
	// 		}
	// 	]
	// },
	// {
	// 	"image": "",
	// 	"title": "California Water Blade",
	// 	"item": 26,
	// 	"options": [
	// 		{
	// 			"price": 100, 
	// 			"key": "20001"
	// 		}
	// 	]
	// }
];

function products(state = initialState, action) {
    const { type, productId, optionKey, quantity, products, orderMeta, response } = action;

    if (type === TOGGLE_EXPAND_ALL_ROWS) {

		state.map(row => {
			row.expanded = !row.expanded;
			return row;
		})

        return [
            ...state,
        ];
    } else if (type === UPDATE_QUANTITY) {

        // product
        state[state.findIndex(product => { return product.item === productId})].options
            .forEach(option => {
                if (option.key === optionKey) {
                    option.quantity = parseInt(quantity,10);
                }
                return option;
            });

        return [
            ...state,
        ];
    } else if (type === UPDATE_PRODUCTS) {
        return [
            ...products,
        ];
    } else if (type === CLEAR_PRODUCT_QUANTITIES) {
        return state.map(product => {
            if (product.options) {
                product.options = product.options.map( option => {
                    option.quantity = 0;
                    return option;
                });
                return product;
            } else {
                return product;
            }
        });
    } else {
        return state;
    }
}

export default products;
