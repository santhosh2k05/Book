// PUT route to update student profile
router.put('/update/:regNo', async (req, res) => {
  try {
    const { regNo } = req.params;
    const updates = req.body;

    const student = await UserPage.findOneAndUpdate(
      { StudentRegNo: regNo },
      { $set: updates },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      student
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({
      message: "Failed to update profile"
    });
  }
}); 