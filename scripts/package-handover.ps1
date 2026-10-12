param(
  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

$ErrorActionPreference = "Stop"
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$resolvedOutputDirectory = (Resolve-Path (Split-Path -Parent $OutputPath)).Path
$outputFileName = Split-Path -Leaf $OutputPath

if ($outputFileName -ne "Bangladesh-Buildcon-2026-Developer-Handover.zip") {
  throw "Unexpected handover filename: $outputFileName"
}

$finalOutputPath = Join-Path $resolvedOutputDirectory $outputFileName
if (Test-Path -LiteralPath $finalOutputPath) {
  Remove-Item -LiteralPath $finalOutputPath -Force
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$excludedDirectories = @(
  ".git",
  ".next",
  "node_modules",
  "test-results",
  "playwright-report",
  "blob-report",
  "coverage",
  "tmp",
  "out",
  "build",
  ".vercel"
)

$files = Get-ChildItem -LiteralPath $projectRoot -Recurse -File | Where-Object {
  $relativePath = $_.FullName.Substring($projectRoot.Length + 1)
  $segments = $relativePath -split "[\\/]"
  $isExcludedDirectory = $segments | Where-Object { $excludedDirectories -contains $_ }

  -not $isExcludedDirectory -and
  $_.Name -ne ".env.local" -and
  $_.Extension -ne ".zip" -and
  $_.Name -ne "tsconfig.tsbuildinfo"
}

$fileStream = [System.IO.File]::Open($finalOutputPath, [System.IO.FileMode]::CreateNew)
$archive = [System.IO.Compression.ZipArchive]::new(
  $fileStream,
  [System.IO.Compression.ZipArchiveMode]::Create,
  $false
)

try {
  foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($projectRoot.Length + 1).Replace("\", "/")
    $entryName = "Bangladesh-Buildcon-2026/$relativePath"
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $archive,
      $file.FullName,
      $entryName,
      [System.IO.Compression.CompressionLevel]::Optimal
    ) | Out-Null
  }
}
finally {
  $archive.Dispose()
  $fileStream.Dispose()
}

$readArchive = [System.IO.Compression.ZipFile]::OpenRead($finalOutputPath)
try {
  $entries = @($readArchive.Entries)
  $forbiddenEntries = @($entries | Where-Object {
    $_.FullName -match "(^|/)(\.env\.local|node_modules|\.next|test-results|playwright-report|tmp)(/|$)"
  })

  if ($forbiddenEntries.Count -ne 0) {
    throw "The handover archive contains forbidden local or secret files."
  }

  $requiredEntries = @(
    "Bangladesh-Buildcon-2026/.env.example",
    "Bangladesh-Buildcon-2026/package.json",
    "Bangladesh-Buildcon-2026/README.md",
    "Bangladesh-Buildcon-2026/DEPLOYMENT-HANDOFF.md",
    "Bangladesh-Buildcon-2026/src/app/layout.tsx"
  )

  foreach ($requiredEntry in $requiredEntries) {
    if ($entries.FullName -notcontains $requiredEntry) {
      throw "Required archive entry missing: $requiredEntry"
    }
  }

  Write-Output "Entries: $($entries.Count)"
  Write-Output "Forbidden entries: $($forbiddenEntries.Count)"
}
finally {
  $readArchive.Dispose()
}

$zipItem = Get-Item -LiteralPath $finalOutputPath
$zipHash = Get-FileHash -LiteralPath $finalOutputPath -Algorithm SHA256

Write-Output "ZIP: $($zipItem.FullName)"
Write-Output "Size: $($zipItem.Length) bytes"
Write-Output "SHA256: $($zipHash.Hash)"
