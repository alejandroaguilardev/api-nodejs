const { response } = require("express");
const Event = require("../model/Event");

const getEvents = async (req, res = response) => {
	const events = await Event.find().populate("user", "name email");
	res.json({
		ok: true,
		events,
	});
};

const newEvent = async (req, res = response) => {
	const event = new Event(req.body);
	try {
		event.user = req.uid;
		const record = await event.save();
		res.status(201).json({
			ok: true,
			data: record,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const updateEvent = async (req, res = response) => {
	try {
		const find = await Event.findById(req.params.id);

		if (!find) {
			return res.status(404).json({
				ok: false,
				msg: "No exist event",
			});
		}

		if (find.user.toString() !== req.uid) {
			return res.status(404).json({
				ok: false,
				msg: "No permit",
			});
		}

		const event = await Event.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
				user: req.uid,
			},
			{ new: true }
		);

		res.status(200).json({
			ok: true,
			event,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const deleteEvent = async (req, res = response) => {
	const find = await Event.findById(req.params.id);

	if (!find) {
		return res.status(404).json({
			ok: false,
			msg: "No exist event",
		});
	}

	if (find.user.toString() !== req.uid) {
		return res.status(404).json({
			ok: false,
			msg: "No permit",
		});
	}

	const event = await Event.findByIdAndRemove(req.params.id);

	res.status(200).json({
		ok: true
	});
};

module.exports = {
	getEvents,
	newEvent,
	updateEvent,
	deleteEvent,
};
