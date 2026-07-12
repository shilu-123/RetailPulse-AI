export const getAIResponse = async (message) => {
    return {
        success: true,
        response: `RetailPulse AI received: "${message}".
Business analytics will be available after database integration.`
    };
};