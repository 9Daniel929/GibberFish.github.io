#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"
g++ detection.cpp -O2 -std=c++17 -o detection
g++ security_core.cpp -O2 -std=c++17 -o security_core -lcrypto
g++ integrity_check.cpp -O2 -std=c++17 -o integrity_check -lcrypto
g++ collection_guard.cpp -O2 -std=c++17 -o collection_guard
chmod +x detection security_core integrity_check collection_guard
