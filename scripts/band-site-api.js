class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = "https://project-1-api.herokuapp.com/";
  }

  async postComment(comment) {
    try {
      const response = await axios.post(
        `${this.apiUrl}comments?api_key=${this.apiKey}`,
        comment
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getComments() {
    try {
      const response = await axios.get(
        `${this.apiUrl}comments?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getShows() {
    try {
      const shows = await axios.get(
        `${this.apiUrl}showdates?api_key=${this.apiKey}`
      );
      return shows.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addLike(commentId) {
    try {
      const response = await axios.put(
        `${this.apiUrl}comments/${commentId}/like?api_key=${this.apiKey}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  async deleteComment(commentId) {
    try {
      await axios.delete(
        `${this.apiUrl}comments/${commentId}?api_key=${this.apiKey}`
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export { BandSiteApi };
