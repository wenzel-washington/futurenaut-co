// Get references to the HTML elements
const goalInput = document.getElementById('goalInput');
const generateButton = document.getElementById('generateButton');
const outputPrompt = document.getElementById('outputPrompt');
const copyButton = document.getElementById('copyButton'); // <-- Get the new button

// Add event listener to the GENERATE button
generateButton.addEventListener('click', () => {
    // Get the user's goal from the textarea and trim whitespace
    const userGoal = goalInput.value.trim();

    // --- Basic Input Validation ---
    if (!userGoal) {
        outputPrompt.textContent = "Please enter your learning goal first!";
        return; // Stop the function if input is empty
    }

    // --- Define the Fixed Prompt Template ---
    const promptTemplate = `
My goal is to learn how I can ${userGoal}.

I've seen some information about it, but need a clearer, step-by-step path. Please create a roadmap of steps I have to take in order to achieve this goal: ${userGoal}.

Keep in mind I have minimal coding experience. I'd love it if you could structure the roadmap with a gamification theme, like breaking down steps into quests, sidequests, etc. Start with the very beginning (Level 1) and work your way down to Level 60 (like in World of Warcraft) where I have successfully achieved a basic working version related to: ${userGoal}.

Please make sure the steps are easy to understand for a beginner and also cover the setup of all necessary software, tools, languages, or services involved.

If you have questions about me, my coding level, or need more details about my goal (${userGoal}) to create a more helpful roadmap, please ask!
`;

    // --- Display the generated prompt ---
    outputPrompt.textContent = promptTemplate.trim();

    // Optional: Scroll to the output section
    outputPrompt.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// --- Add event listener to the NEW COPY button ---
copyButton.addEventListener('click', async () => { // Use async for await
    const textToCopy = outputPrompt.textContent;

    // Check if there's actually text in the output to copy
    if (!textToCopy || !textToCopy.trim()) {
        // Optionally provide feedback if trying to copy empty text
        // console.log("Nothing to copy yet.");
        return;
    }

    try {
        // Use the Clipboard API to copy the text
        await navigator.clipboard.writeText(textToCopy);

        // Provide visual feedback
        const originalButtonText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.disabled = true; // Briefly disable button

        // Change the text back after a short delay
        setTimeout(() => {
            copyButton.textContent = originalButtonText;
            copyButton.disabled = false; // Re-enable button
        }, 1500); // 1500 milliseconds = 1.5 seconds

    } catch (err) {
        console.error('Failed to copy text: ', err);
        // Optionally inform the user that copying failed
        alert("Oops, couldn't copy the text. Please try copying manually.");
    }
});
// -----------------------------------------------