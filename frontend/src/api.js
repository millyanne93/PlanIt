const API_URL = 'http://localhost:5000'; // Adjust the port as needed

export const signup = async (userData) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const login = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const createTask = async (formData, token) => {
    console.log("Token passed to createTask:", token);
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),  // 'due_date' is part of taskData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Error creating task');
    }

    return response.json();
};

export const getTasks = async (token) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    // Handle response errors
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching tasks:', errorData);
        throw new Error(errorData.error || 'Error fetching tasks');
    }

    return response.json();
};

export const updateTask = async (taskId, formData, token) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error updating task');
    }

    return response.json();
};

export const deleteTask = async (taskId, token) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error deleting task');
    }

    return response.json();
};
