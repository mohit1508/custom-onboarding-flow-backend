const supabase = require('./db');

module.exports = {
  // Get the current page configuration
  async getPageConfig() {
    const { data, error } = await supabase.from("page_config").select("*");
    if (error) {
      throw new Error(`Failed to fetch page configuration: ${error.message}`);
    }
    return data.reduce((acc, row) => {
      acc[row.page] = row.components;
      return acc;
    }, {});
  },

  // Update the configuration for a specific page
  async updatePageConfig(page, components) {
    const { data, error } = await supabase
      .from("page_config")
      .upsert({ page, components }, { onConflict: "page" });

    if (error) {
      throw new Error(`Failed to update page configuration: ${error.message}`);
    }
    return data;
  },
};
