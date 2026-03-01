const { createClient } = require("@supabase/supabase-js");
require("dotenv").config(); // or import 'dotenv/config' if you're using ES6

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY,
);
async function Track(busNo) {
	try {
		const res = await fetch(`${process.env.BUS_TRACKING_API}${busNo}`);
		const data = await res.json();
		const { error } = await supabase.from("bus_tracking").insert({
			lattitude: data[0]?.lattitude,
			longitude: data[0]?.longitude,
			// location: data[0].location,
			receivedDate: data[0]?.receivedDate,
			vehicleNo: data[0]?.vehicleNo,
			speed: data[0]?.speed,
			routename: data[0]?.routename,
			conductorname: data[0]?.conductorname,
			conductornumber: data[0]?.conductornumber,
		});
		if (error) {
			console.log("Superbase Errro");
			throw error;
		}
		console.log("Location successfully stored in Supabase.");
	} catch (error) {
		console.log("ERROR", error);
	}
}
Track("GJ16AY4712");
Track("GJ16AY4026");
