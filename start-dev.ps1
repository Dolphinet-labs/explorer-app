# PowerShell script to start the development server with --ignore-engines
# This bypasses the Node.js version check

Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host "Using --ignore-engines to bypass version check" -ForegroundColor Cyan
Write-Host ""

# Build sprite if needed and get hash
Write-Host "Building SVG sprite..." -ForegroundColor Yellow
yarn --ignore-engines svg:build-sprite

# Extract sprite hash from generated file and create sprite.svg copy
$spriteFiles = Get-ChildItem "public\icons\sprite.*.svg" -ErrorAction SilentlyContinue
if ($spriteFiles) {
    $spriteFile = $spriteFiles[0]
    $hash = ($spriteFile.Name -replace 'sprite\.(.+)\.svg', '$1')
    Write-Host "Sprite hash: $hash" -ForegroundColor Cyan
    
    # Create sprite.svg copy for fallback
    if (-not (Test-Path "public\icons\sprite.svg")) {
        Copy-Item $spriteFile.FullName "public\icons\sprite.svg"
        Write-Host "Created sprite.svg fallback" -ForegroundColor Green
    }
}

Write-Host ""

# Set development environment variables for CSP unsafe-eval support
# These will be inherited by the yarn process
$env:NEXT_PUBLIC_APP_ENV = "development"
if ($hash) {
    $env:NEXT_PUBLIC_ICON_SPRITE_HASH = $hash
}

# Start the dev server with environment variables
Write-Host "Starting dev server on port 3002..." -ForegroundColor Green
$env:NEXT_PUBLIC_APP_PORT = "3002"
yarn --ignore-engines dev

