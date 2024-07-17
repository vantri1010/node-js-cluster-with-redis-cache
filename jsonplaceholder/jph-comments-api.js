import fetch from "node-fetch";

export async function fetchComments() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        if (!response.ok) {
            throw new Error(`Error fetching comments: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

// module.exports = new JphCommentsApi();