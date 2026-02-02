#include <iostream>
#include <vector>
#include <random>

int main() {
    std::vector<double> weights;
    double w;
    while (std::cin >> w) {
        if (w > 0) weights.push_back(w);
    }
    if (weights.empty()) {
        std::cerr << "No weights provided\n";
        return 1;
    }

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<double> dist(0.0, 1.0);

    double total = 0.0;
    for (double x : weights) total += x;

    double r = dist(gen) * total;
    for (std::size_t i = 0; i < weights.size(); ++i) {
        if (r < weights[i]) {
            std::cout << i << std::endl;
            return 0;
        }
        r -= weights[i];
    }

    std::cout << weights.size() - 1 << std::endl;
    return 0;
}
