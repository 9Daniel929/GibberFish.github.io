#include <iostream>
#include <string>
#include <chrono>
#include <thread>
#include <random>

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
    for (;;) {
        std::this_thread::sleep_for(std::chrono::milliseconds(1500));
        std::cout << "GUARD|OK|" << randomCode() << std::endl;
        std::cout.flush();
    }
    return 0;
}
