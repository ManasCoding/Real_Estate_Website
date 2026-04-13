const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`[AUTH] Login attempt for: ${email}`);

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log(`[AUTH] Login failed: User not found (${email})`);
      return res.status(401).json({ message: 'Invalid email or password.', error: 'User not found' });
    }

    console.log(`[AUTH] User found. Verifying password...`);
    if (user.password !== password) {
      console.log(`[AUTH] Login failed: Password mismatch for ${email}`);
      return res.status(401).json({ message: 'Invalid email or password.', error: 'Password mismatch' });
    }

    console.log(`[AUTH] Login successful for: ${email}`);

    // Update last login
    user.lastLogin = new Date();
    user.loginCount += 1;
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
    });
  } catch (err) {
    console.error('[AUTH] Login error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = {
  loginUser,
};
