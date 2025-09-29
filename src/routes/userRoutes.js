const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

const router = express.Router();

// Get user profile - accessible by all logged-in users
router.get("/profile", authenticateToken, getUserProfile);

// Update user profile - accessible by all logged-in users
router.put("/profile", authenticateToken, updateUserProfile);

// Only doctors
router.get(
  "/doctor-dashboard",
  authenticateToken,
  authorizeRoles("doctor"),
  (req, res) => {
    res.json({ message: "Doctor Dashboard" });
  }
);

// Only patients
router.get(
  "/patient-dashboard",
  authenticateToken,
  authorizeRoles("patient"),
  (req, res) => {
    res.json({ message: "Patient Dashboard" });
  }
);

// Only admins
router.get(
  "/admin-dashboard",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin Dashboard" });
  }
);

module.exports = router;
