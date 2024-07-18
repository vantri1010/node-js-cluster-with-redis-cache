import fetch from "node-fetch";

export async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}