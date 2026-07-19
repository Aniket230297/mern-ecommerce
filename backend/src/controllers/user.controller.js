import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name, email } = req.body;

        if (!name && !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide name or email.",
            });
        }

        if (email) {
            const existingUser = await User.findOne({ email });

            if (
                existingUser &&
                existingUser._id.toString() !== user._id.toString()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists.",
                });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};