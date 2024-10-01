# Get all directory names under 'vynild'
$directories = Get-ChildItem -Directory -Path ./vynild | ForEach-Object { $_.FullName }

# Generate descriptors for each directory
foreach ($directory in $directories) {
    # Get the name of the directory
    $name = Split-Path $directory -Leaf
    # Generate the descriptors
    pnpm exec buf build --path ./vynild/$name -o node/$name/descriptors.binpb
}
