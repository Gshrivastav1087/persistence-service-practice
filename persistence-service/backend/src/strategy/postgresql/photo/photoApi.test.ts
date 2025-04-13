import axios from "axios";

const baseURL = "http://localhost:8000";

describe("Photo API Integration", () => {
  let createdPhotoId: number;

  it("should create a photo", async () => {
    const payload = {
      name: "Test Photo",
      description: "A beautiful test photo",
      filename: "test.jpg"
    };

    const response = await axios.post(`${baseURL}/photos`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("id");
    createdPhotoId = response.data.id;
  });

  it("should retrieve the created photo", async () => {
    const response = await axios.get(`${baseURL}/photos/${createdPhotoId}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Test Photo");
  });

  it("should update the photo", async () => {
    const updates = { description: "Updated description" };
    const response = await axios.put(`${baseURL}/photos/${createdPhotoId}`, updates);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Photo updated successfully");
  });

  it("should retrieve all photos", async () => {
    const response = await axios.get(`${baseURL}/photos`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should delete the photo", async () => {
    const response = await axios.delete(`${baseURL}/photos/${createdPhotoId}`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Photo deleted successfully");
  });

  it("should return 404 for deleted photo", async () => {
    try {
      await axios.get(`${baseURL}/photos/${createdPhotoId}`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.error).toBe("Photo not found");
    }
  });
});
