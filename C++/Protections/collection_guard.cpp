#include <iostream>
#include <string>
#include <chrono>
#include <thread>
#include <random>
#include <windows.h> // Required for Windows permission checks

// Real function to check if the current process has Administrator rights
bool hasPermission() {
    BOOL fIsElevated = FALSE;
    HANDLE hToken = NULL;
    TOKEN_ELEVATION elevation;
    DWORD dwSize;

    // Get the access token for the current process
    if (!OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &hToken)) {
        return false;
    }

    // Check if the token has elevated privileges (Admin)
    if (GetTokenInformation(hToken, TokenElevation, &elevation, sizeof(elevation), &dwSize)) {
        fIsElevated = elevation.TokenIsElevated;
    }

    if (hToken) {
        CloseHandle(hToken);
    }
    return fIsElevated;
}

static std::string randomCode() {
    auto now = std::chrono::high_resolution_clock::now().time_since_epoch().count();
    std::mt19937_64 rng(static_cast<unsigned long long>(now));
    std::uniform_int_distribution<unsigned long long> dist;
    unsigned long long v = dist(rng);
    const char* hex = "0123456789abcdef";
    std::string out;
    out.reserve(12);
    for (int i = 0; i < 12; ++i) {
        out.push_back(hex[(v >> (i * 4)) & 0xF]);
    }
    return out;
}

int main() {
    // This now uses the real Windows API to check for Administrator privileges
    if (!hasPermission()) {
        std::cout << "CRITICAL ERROR: Access Denied." << std::endl;
        std::cout << "Please right-click the program and select 'Run as administrator'." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(3)); // Give them time to read the error
        return 1; 
    }

    // Only authorized users reach this loop
    for (;;) {
        std::this_thread::sleep_for(std::chrono::milliseconds(1500));
        std::cout << "GUARD|OK|" << randomCode() << std::endl;
        std::cout.flush();
    }
    return 0;
}
