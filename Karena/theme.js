// Karena Theme - Core Script
// Waits for Spicetify to load, then initializes custom features.

(async function KarenaTheme() {
    // Wait until Spicetify platform and essential elements are loaded
    if (!Spicetify.Platform || !Spicetify.CosmosAsync || !Spicetify.Menu) {
        setTimeout(KarenaTheme, 100);
        return;
    }

    console.log("Karena Theme: Initialized successfully.");

    // --- Feature: Dynamic Greeting in Top Bar ---
    function injectGreeting() {
        const topBarContent = document.querySelector(".main-topBar-topbarContent");

        if (!topBarContent) {
            setTimeout(injectGreeting, 300);
            return;
        }

        // Check if we already injected it
        if (document.getElementById("karena-greeting")) return;

        const date = new Date();
        const hours = date.getHours();
        let greetingText = "Good evening";

        if (hours < 12) {
            greetingText = "Good morning";
        } else if (hours < 18) {
            greetingText = "Good afternoon";
        }

        const greetingElement = document.createElement("div");
        greetingElement.id = "karena-greeting";
        greetingElement.innerText = greetingText;

        // Inline styles to match the Karena White aesthetic
        greetingElement.style.fontSize = "1.5rem";
        greetingElement.style.fontWeight = "700";
        greetingElement.style.color = "var(--spice-main-fg)";
        greetingElement.style.marginRight = "auto";
        greetingElement.style.marginLeft = "16px";
        greetingElement.style.letterSpacing = "-0.04em";

        // Insert at the beginning of the top bar content
        topBarContent.prepend(greetingElement);
    }

    // Run the greeting injection
    injectGreeting();

    // Re-inject on history change (page navigation) in case the DOM re-renders
    Spicetify.Platform.History.listen(() => {
        setTimeout(injectGreeting, 300);
    });

})();