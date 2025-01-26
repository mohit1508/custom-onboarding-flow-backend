const supabase = require('./db');

module.exports = {
  // Fetch all states
  async getAllStates() {
    const { data, error } = await supabase.from("states").select("*").order("name");
    if (error) {
      throw new Error(`Failed to fetch states: ${error.message}`);
    }
    return data;
  },
};
