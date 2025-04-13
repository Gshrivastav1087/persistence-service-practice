import axios from "axios";

const baseURL = "http://localhost:8000"; // Make sure the backend is running on this port

describe("Video API Integration", () => {
  let createdVideoId: number;

  // Test to create a new video
  it("should create a video", async () => {
    const payload = {
      name: "Test Video",          // Name of the video
      description: "A demo video", // Description of the video
      filename: "demo.mp4",        // Video filename
      duration: 120                // Video duration in seconds
    };

    const response = await axios.post(`${baseURL}/videos`, payload); // Updated path to '/videos'
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("id"); // Check that an ID is returned
    createdVideoId = response.data.id; // Store the created video ID for later use
  });

  // Test to retrieve the created video by ID
  it("should retrieve the created video", async () => {
    const response = await axios.get(`${baseURL}/videos/${createdVideoId}`); // Updated path to '/videos'
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Test Video"); // Check the video name
    expect(response.data.description).toBe("A demo video"); // Check the video description
  });

  // Test to update the video details
  it("should update the video", async () => {
    const updates = { 
      duration: 150 // Update the video duration
    };
    const response = await axios.put(`${baseURL}/videos/${createdVideoId}`, updates); // Updated path to '/videos'
    expect(response.status).toBe(200);
    expect(response.data.message).toMatch("Video updated successfully"); // Use toMatch for more flexible matching
  });

  // Test to retrieve all videos
  it("should retrieve all videos", async () => {
    const response = await axios.get(`${baseURL}/videos`); // Updated path to '/videos'
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true); // Ensure the response is an array of videos
  });

  // Test to delete the video
  it("should delete the video", async () => {
    const response = await axios.delete(`${baseURL}/videos/${createdVideoId}`); // Updated path to '/videos'
    expect(response.status).toBe(200);
    expect(response.data.message).toMatch("Video deleted successfully"); // Use toMatch for more flexible matching
  });
});
