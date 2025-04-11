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
      existing.totals = totals;
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

exports.getCompetency = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Find user by phone number
    const userData = await Compentecy.findOne({ phone });
    // console.log(userData);
    if (!userData) {
      return res.json({ message: "No data found", data: {} });
    }

    // Convert Mongoose document to a plain object
    const userWithUpdatedData = userData.toObject();

    // Convert Map fields to plain objects
    if (userWithUpdatedData.answers instanceof Map) {
      userWithUpdatedData.answers = Object.fromEntries(
        userWithUpdatedData.answers
      );
    }

    if (userWithUpdatedData.scores instanceof Map) {
      userWithUpdatedData.scores = Object.fromEntries(
        userWithUpdatedData.scores
      );
    }

    if (userWithUpdatedData.totals instanceof Map) {
      userWithUpdatedData.totals = Object.fromEntries(
        userWithUpdatedData.totals
      );
    }

    // Adding/Modifying the `name` field
    userWithUpdatedData.name = userWithUpdatedData.name || "Competency"; // Default to "MBTI" if not available

    // console.log(userWithUpdatedData);
    console.log(userWithUpdatedData);
    res.json({
      message: "Data retrieved successfully",
      data: userWithUpdatedData,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
