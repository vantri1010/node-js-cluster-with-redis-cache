import fetch from "node-fetch";

export async function fetchPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

// module.exports = new JphPostsApi();