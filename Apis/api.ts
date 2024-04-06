interface AssignmentData{
    duration_in_seconds: number;
    ends_at: number;
    id: string;
    link: string;
    status: string;
    title: string;
}

export async function fetchAssignmentDetails(): Promise<AssignmentData> {
    try {
      // Make a fetch request to your API endpoint
      const response = await fetch('https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/assignment_details');
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      // Parse the JSON response
      const data: AssignmentData = await response.json();
      
      return data;
    } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  }