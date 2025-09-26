const User = require("../models/User");

const createProfile = async (req, res, next) => {
  try {
    const { username, displayName, bio } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Check if username already exists
    const exists = await User.findOne({ username: username.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const profile = new User({
      username: username.toLowerCase(),
      displayName,
      bio,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

const GetProfile = async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const AddLinks = async (req, res) => {
  try {
    const { title, url ,icon } = req.body;
    if (!title || !url)
      return res.status(400).json({ error: "Title and URL required" });

    const user = await User.findOne(); // single user
    if (!user) return res.status(404).json({ error: "User not found" });

    user.links.push({ title, url, icon });
    await user.save();
    res.status(201).json(user.links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all links
const GetLinks = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a link
const updateLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { title, url } = req.body;

    const user = await User.findOne();
    if (!user) return res.status(404).json({ error: "User not found" });

    const link = user.links.id(linkId);
    if (!link) return res.status(404).json({ error: "Link not found" });

    if (title) link.title = title;
    if (url) link.url = url;

    await user.save();
    res.json(user.links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a link
const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;

    const user = await User.findOne();
    if (!user) return res.status(404).json({ error: "User not found" });

    const link = user.links.id(linkId);
    if (!link) return res.status(404).json({ error: "Link not found" });

    link.deleteOne();
    await user.save();
    res.json(user.links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProfile,
  GetProfile,
  AddLinks,
  GetLinks,
  updateLink,
  deleteLink,
};
