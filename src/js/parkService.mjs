const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

/**
 * Reusable core function to fetch JSON data from any NPS API endpoint.
 * It handles the API key injection, base URL prepending, and response checks.
 * * @param {string} url - The resource path and query parameters (e.g., "parks?parkCode=yell").
 * @returns {Promise<Object>} The raw JSON object response from the API.
 */
async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  
  // Combine the constant baseUrl with the dynamic resource path (url)
  const response = await fetch(baseUrl + url, options);
  
  // Check if the response status is successful (200-299)
  if (response.ok) {
    data = await response.json();
  } else {
    // Throw an error if the response was not okay (e.g., 404, 500)
    throw new Error("response not ok");
  }
  
  return data;
}

/**
 * Fetches data for a single park using the reusable getJson function.
 * * @param {string} parkCode - The code for the park to fetch (default: 'yell').
 * @returns {Promise<Object>} A single park object extracted from the API response array.
 */
export async function getParkData(parkCode = 'yell') {
  // Construct the endpoint URL path and pass it to the generic fetcher
  const rawData = await getJson(`parks?parkCode=${parkCode}`);
  
  // The park data is nested in the 'data' array of the API response, so we return the first item.
  return rawData.data[0]; 
}

/**
 * NEW: Example function to demonstrate reusability for fetching visitor centers.
 * * @param {string} parkCode - The code for the park.
 * @returns {Promise<Object>} The first visitor center object for the specified park.
 */
export async function getVisitorCenterData(parkCode = 'yell') {
    const rawData = await getJson(`visitorcenters?parkCode=${parkCode}`);
    return rawData.data[0];
}


// --- getInfoLinks and parkInfoLinks definition remains below ---

// The array is defined locally, not exported directly
const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: "https://www.nps.gov/common/uploads/structured_data/3C7D383B-1DD8-B71B-0BEC4A4D6BDF7CAD.jpg",
    description: "See what conditions to expect in the park before leaving on your trip!",
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: "https://www.nps.gov/common/uploads/structured_data/3C7D334F-1DD8-B71B-0B108C7771F4E854.jpg",
    description: "Learn about the fees and passes that are available.",
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: "https://www.nps.gov/common/uploads/structured_data/3C7D95DD-1DD8-B71B-0BC4FA19BD72F0EC.jpg",
    description: "Learn about the visitor centers in the park.",
  },
];

/**
 * Updates the image URLs in parkInfoLinks array using images from the API data.
 * @param {Array<Object>} data - The array of image objects from the park API response.
 * @returns {Array<Object>} The parkInfoLinks array with updated image URLs.
 */
export function getInfoLinks(data) {
    const withUpdatedImages = parkInfoLinks.map((item, index) => {
        const newItem = { ...item };
        
        // Use index + 2 to skip the first two images, as per previous logic
        if (data[index + 2]) {
            newItem.image = data[index + 2].url;
        } else {
            console.warn(`Not enough images returned by API to set link image at index ${index + 2}.`);
        }

        return newItem;
    });
    return withUpdatedImages;
}