const Compentecy = require("../models/CompetencySchema");

exports.addCompetency = async (req, res) => {
  try {
    const { phone, answers, scores, totals } = req.body;

    if (!phone || !answers || !scores || !totals) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("scores --> ", scores);

    const existing = await Compentecy.findOne({ phone });
    if (existing) {
      existing.answers = answers;
      existing.scores = scores;
      existing.totals = scores;
      await existing.save();
      return res.json({
        message: "Data updated successfully",
        data: existing,
      });
    }

    const newCompetency = new Compentecy({ phone, answers, scores, totals });
    await newCompetency.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
