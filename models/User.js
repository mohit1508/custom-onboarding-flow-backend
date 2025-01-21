const supabase = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  // Create a new user
  async createUser({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, current_step: 1 }])
      .select();

    if (error) {
      throw new Error('Failed to create user: ' + error.message);
    }

    return data[0];
  },

  // Update user data
  async updateUser(email, data) {
    const { data: updatedData, error } = await supabase
      .from('users')
      .update(data)
      .eq('email', email)
      .select();

    if (error) {
      throw new Error('Failed to update user: ' + error.message);
    }

    return updatedData[0];
  },

  // Get a user by email
  async getUserByEmail(email) {
    console.log("inside getUserByEmail")
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    return data;
  },

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword); // Compare passwords
  },

  // Fetch all users
  async getAllUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      throw new Error('Failed to fetch users: ' + error.message);
    }
    return data;
  },
};
