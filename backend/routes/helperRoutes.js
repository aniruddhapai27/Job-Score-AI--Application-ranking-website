const express = require("express");
const router = express.Router();
const { main } = require("../controllers/helperController"); // Adjust the path as needed

router.get("/process-resumes", async (req, res) => {
  try {
    await main(); // Call the main function
    res
      .status(200)
      .json({ success: true, message: "Processing completed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
