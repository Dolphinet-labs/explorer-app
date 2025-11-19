#!/bin/bash

set -e

echo "🔨 Starting Vercel build process..."

# Function to load environment variables from preset (similar to entrypoint.sh)
export_envs_from_preset() {
  if [ -z "$ENVS_PRESET" ]; then
      return
  fi

  if [ "$ENVS_PRESET" = "none" ]; then
      return
  fi

  local preset_file="./configs/envs/.env.$ENVS_PRESET"

  if [ ! -f "$preset_file" ]; then
      # Try alternative format without .env prefix
      preset_file="./configs/envs/$ENVS_PRESET.env"
      if [ ! -f "$preset_file" ]; then
          echo "⚠️  Warning: Preset file not found: $preset_file"
          return
      fi
  fi

  local blacklist=(
    "NEXT_PUBLIC_APP_PROTOCOL"
    "NEXT_PUBLIC_APP_HOST"
    "NEXT_PUBLIC_APP_PORT"
    "NEXT_PUBLIC_APP_ENV"
    "NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL"
  )

  echo "📋 Loading environment preset: $ENVS_PRESET"

  while IFS='=' read -r name value; do
      name="${name#"${name%%[![:space:]]*}"}"  # Trim leading whitespace
      if [[ -n $name && $name == "NEXT_PUBLIC_"* && ! "${blacklist[*]}" =~ "$name" ]]; then
          export "$name"="$value"
          echo "  ✓ $name"
      fi
  done < <(grep "^[^#;]" "$preset_file")
}

# Load environment variables from preset if ENVS_PRESET is set
export_envs_from_preset

# Ensure scripts have execute permissions
chmod +x deploy/scripts/download_assets.sh
chmod +x deploy/scripts/build_sprite.sh
chmod +x deploy/scripts/make_envs_script.sh

# Step 1: Download external assets
echo "📥 Downloading external assets..."
bash deploy/scripts/download_assets.sh ./public/assets/configs

# Step 2: Build sprite and capture hash
echo "🎨 Building SVG sprite..."
# Source the script to ensure environment variables are exported
source deploy/scripts/build_sprite.sh

# Ensure sprite.svg exists as fallback (for cases where hash is not available)
if [ -n "$NEXT_PUBLIC_ICON_SPRITE_HASH" ] && [ -f "public/icons/sprite.${NEXT_PUBLIC_ICON_SPRITE_HASH}.svg" ]; then
    if [ ! -f "public/icons/sprite.svg" ]; then
        cp "public/icons/sprite.${NEXT_PUBLIC_ICON_SPRITE_HASH}.svg" "public/icons/sprite.svg"
        echo "✅ Created sprite.svg fallback with hash ${NEXT_PUBLIC_ICON_SPRITE_HASH}"
    fi
    echo "📦 Sprite hash: ${NEXT_PUBLIC_ICON_SPRITE_HASH}"
else
    echo "⚠️  Warning: Sprite hash not set or sprite file not found"
    # Try to find any sprite file and use it as fallback
    if ls public/icons/sprite.*.svg 1> /dev/null 2>&1; then
        SPRITE_FILE=$(ls public/icons/sprite.*.svg | head -n 1)
        if [ ! -f "public/icons/sprite.svg" ]; then
            cp "$SPRITE_FILE" "public/icons/sprite.svg"
            echo "✅ Created sprite.svg fallback from existing sprite file"
        fi
        # Extract hash from filename if NEXT_PUBLIC_ICON_SPRITE_HASH is not set
        if [ -z "$NEXT_PUBLIC_ICON_SPRITE_HASH" ]; then
            SPRITE_HASH=$(basename "$SPRITE_FILE" | sed 's/sprite\.\(.*\)\.svg/\1/')
            export NEXT_PUBLIC_ICON_SPRITE_HASH=${SPRITE_HASH}
            echo "📦 Extracted sprite hash from filename: ${NEXT_PUBLIC_ICON_SPRITE_HASH}"
        fi
    fi
fi

# Step 3: Generate envs.js with sprite hash
echo "📝 Generating envs.js..."
# Export the sprite hash to ensure it's available in the subprocess
# Also ensure it's in the environment for the subprocess
if [ -n "$NEXT_PUBLIC_ICON_SPRITE_HASH" ]; then
    export NEXT_PUBLIC_ICON_SPRITE_HASH
    echo "📦 Exporting NEXT_PUBLIC_ICON_SPRITE_HASH=${NEXT_PUBLIC_ICON_SPRITE_HASH} for envs.js"
fi
bash deploy/scripts/make_envs_script.sh

# Step 4: Build Next.js app
echo "🚀 Building Next.js app..."
next build

echo "✅ Build completed successfully!"

