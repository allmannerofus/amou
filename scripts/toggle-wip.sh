#!/bin/bash

# Toggle WIP mode script
# This script toggles between WIP=true (landing page) and WIP=false (full site)

LAYOUT_FILE="app/layout.tsx"
PAGE_FILE="app/page.tsx"

if [ ! -f "$LAYOUT_FILE" ] || [ ! -f "$PAGE_FILE" ]; then
    echo "Error: Required files not found"
    exit 1
fi

# Check current WIP status from layout file
if grep -q "const WIP = true" "$LAYOUT_FILE"; then
    echo "🔄 Switching from WIP mode (landing page) to full site mode..."
    sed -i '' 's/const WIP = true/const WIP = false/' "$LAYOUT_FILE"
    sed -i '' 's/const WIP = true/const WIP = false/' "$PAGE_FILE"
    echo "✅ Now showing full site (WIP = false)"
    echo "   - Navbar will be visible"
    echo "   - All sections will be shown (contact, expertise, experience, etc.)"
elif grep -q "const WIP = false" "$LAYOUT_FILE"; then
    echo "🔄 Switching from full site mode to WIP mode (landing page)..."
    sed -i '' 's/const WIP = false/const WIP = true/' "$LAYOUT_FILE"
    sed -i '' 's/const WIP = false/const WIP = true/' "$PAGE_FILE"
    echo "✅ Now showing landing page (WIP = true)"
    echo "   - No navbar"
    echo "   - Minimal design with hero, portfolio, about, and footer only"
else
    echo "❌ Could not determine current WIP status"
    exit 1
fi

echo ""
echo "🌐 The development server will automatically reload with the new settings."
echo "   Visit http://localhost:7007 to see the changes."
