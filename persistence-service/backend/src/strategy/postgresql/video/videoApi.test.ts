import axios from "axios";

const baseURL = "http://localhost:8000"; // Changed port to 8000

describe("Video API Integration", () => {
  let createdVideoId: number;

  it("should create a video", async () => {
    const payload = {
      name: "Test Video",
      description: "A demo video",
      filename: "demo.mp4",
      duration: 120
    };

    const response = await axios.post(`${baseURL}/video`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("id");
    createdVideoId = response.data.id;
  });

  it("should retrieve the created video", async () => {
    const response = await axios.get(`${baseURL}/video/${createdVideoId}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Test Video");
  });

  it("should update the video", async () => {
    const updates = { duration: 150 };
    const response = await axios.put(`${baseURL}/video/${createdVideoId}`, updates);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Video updated successfully.");
  });

  it("should retrieve all videos", async () => {
    const response = await axios.get(`${baseURL}/videos`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should delete the video", async () => {
    const response = await axios.delete(`${baseURL}/video/${createdVideoId}`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Video deleted successfully.");
  });
});
