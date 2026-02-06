#include <iostream>
#include <string>
#include <algorithm>

/**
 * Gibberfish Admin Security Module
 * Protects the 'collection-box' button from unauthorized access.
 */

// Function to handle the visibility logic
void updateAdminUI(std::string inputEmail) {
    // The target admin email
    const std::string ADMIN_EMAIL = "peppapig1235@gmail.com";

    // Standard check: If email matches, show button. Otherwise, hide it.
    if (inputEmail == ADMIN_EMAIL) {
        // CODE FOR DISPLAY:
        // This is where you put your GUI command, e.g., collectionBox.show()
        std::cout << "[SYSTEM] Admin identity confirmed. Displaying 'collection-box'." << std::endl;
    } else {
        // CODE FOR HIDING:
        // This ensures the button is completely hidden or disabled for others
        std::cout << "[SYSTEM] Unauthorized email. 'collection-box' remains hidden." << std::endl;
    }
}

int main() {
    // Replace this with the actual variable that stores your logged-in user's email
    std::string currentUserEmail = "peppapig1235@gmail.com"; 

    // Run the security check
    updateAdminUI(currentUserEmail);

    return 0;
}
