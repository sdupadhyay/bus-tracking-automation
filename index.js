const { createClient } = require("@supabase/supabase-js");
require("dotenv").config(); // or import 'dotenv/config' if you're using ES6
const cron = require("node-cron");
const express = require("express");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY,
);
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/health", (req, res) => res.send("OK"));
app.get("/track/:busNo", async (req, res) => {
	const { busNo } = req.params;
	try {
		const response = await fetch(`${process.env.BUS_TRACKING_API}${busNo}`);
		const data = await response.json();
		const busData = {
			lattitude: data[0]?.lattitude,
			longitude: data[0]?.longitude,
			receivedDate: data[0]?.receivedDate,
			vehicleNo: data[0]?.vehicleNo,
			speed: data[0]?.speed,
			routename: data[0]?.routename,
			conductorname: data[0]?.conductorname,
			conductornumber: data[0]?.conductornumber,
			depotname: data[0]?.depotname,
		};
		return res.json(busData);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});
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

// Format: (minute) (hour) (day of month) (month) (day of week)
cron.schedule("*/5 08-19 * * *", async () => {
	await Track("GJ16AY4712");
	await Track("GJ16AY4026");
});
app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);
});
