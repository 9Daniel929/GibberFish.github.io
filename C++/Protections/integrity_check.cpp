#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <openssl/sha.h>

static std::string trim(const std::string& s) {
    size_t a = s.find_first_not_of(" \t\r\n");
    if (a == std::string::npos) return "";
    size_t b = s.find_last_not_of(" \t\r\n");
    return s.substr(a, b - a + 1);
}

static std::string shaFile(const std::string& path) {
    std::ifstream in(path.c_str(), std::ios::binary);
    if (!in.is_open()) return "";
    SHA256_CTX ctx;
    SHA256_Init(&ctx);
    char buf[4096];
    while (in.good()) {
        in.read(buf, sizeof(buf));
        std::streamsize n = in.gcount();
        if (n > 0) SHA256_Update(&ctx, buf, static_cast<size_t>(n));
    }
    unsigned char out[SHA256_DIGEST_LENGTH];
    SHA256_Final(out, &ctx);
    std::ostringstream oss;
    for (int i = 0; i < SHA256_DIGEST_LENGTH; ++i) {
        oss << std::hex << std::setw(2) << std::setfill('0') << (int)out[i];
    }
    return oss.str();
}

static std::vector<std::pair<std::string, std::string>> expected() {
    std::vector<std::pair<std::string, std::string>> v;
    v.push_back(std::make_pair("security_core", ""));
    v.push_back(std::make_pair("detection", ""));
    v.push_back(std::make_pair("collection_guard", ""));
    v.push_back(std::make_pair("collection.json", ""));
    v.push_back(std::make_pair("withdrawal_limits.dat", ""));
    return v;
}

int main() {
    std::vector<std::pair<std::string, std::string>> v = expected();
    bool ok = true;
    for (size_t i = 0; i < v.size(); ++i) {
        std::string path = v[i].first;
        std::string h = shaFile(path);
        if (h.empty()) {
            std::cout << "FAIL|MISSING|" << path << std::endl;
            ok = false;
            continue;
        }
        std::cout << "OK|HASH|" << path << "|" << h << std::endl;
    }
    if (!ok) return 1;
    return 0;
}
