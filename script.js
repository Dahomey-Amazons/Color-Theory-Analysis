const uploadInput = document.getElementById('upload-image');
const hairDropper = document.getElementById('hair-dropper');
const skinDropper = document.getElementById('skin-dropper');
const eyeDropper = document.getElementById('eye-dropper');
const paletteContainer = document.getElementById('palette');

let imageLoaded = false;
let imageWidth, imageHeight;

// Function to handle image load
function handleImageLoad(imageUrl) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        imageWidth = img.naturalWidth;
        imageHeight = img.naturalHeight;
        imageLoaded = true;

        // Enable droppers once image is loaded
        hairDropper.querySelector('input').disabled = false;
        skinDropper.querySelector('input').disabled = false;
        eyeDropper.querySelector('input').disabled = false;

        // Handle dropper clicks
        hairDropper.addEventListener('click', function() {
            showDropper(img, 'hair');
        });

        skinDropper.addEventListener('click', function() {
            showDropper(img, 'skin');
        });

        eyeDropper.addEventListener('click', function() {
            showDropper(img, 'eye');
        });
    };
    img.src = imageUrl;
}

// Function to show dropper and extract color at clicked position
function showDropper(img, type) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

    // Show the canvas over the image
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
    imageContainer.appendChild(canvas);

    // Add click event listener to canvas
    canvas.addEventListener('click', function(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const rgbColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
        const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

        // Update the input field with the extracted color
        if (type === 'hair') {
            hairDropper.querySelector('input').value = hexColor;
        } else if (type === 'skin') {
            skinDropper.querySelector('input').value = hexColor;
        } else if (type === 'eye') {
            eyeDropper.querySelector('input').value = hexColor;
        }

        // Generate palette based on selected colors
        generatePalette();
    });
}

// Function to convert RGB to Hex color
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Event listener for file upload
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const imageUrl = event.target.result;
        handleImageLoad(imageUrl);
    };

    reader.readAsDataURL(file);
});

// Function to generate color palette based on selected colors
function generatePalette() {
    const skinColor = skinDropper.querySelector('input').value.toLowerCase();
    const eyeColor = eyeDropper.querySelector('input').value.toLowerCase();
    const hairColor = hairDropper.querySelector('input').value.toLowerCase();

    const colorCombinations = [
        {
            skin: 'dark',
            hair: 'black',
            eyes: 'black',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'fair',
            hair: 'brown',
            eyes: 'hazel',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'fair',
            hair: 'black',
            eyes: 'light brown',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'fair',
            hair: 'black',
            eyes: 'green',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'fair',
            hair: 'brown',
            eyes: 'dark brown',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'fair',
            hair: 'brown',
            eyes: 'light brown',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'fair',
            hair: 'brown',
            eyes: 'green',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'fair',
            hair: 'blonde',
            eyes: 'blue',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'medium',
            hair: 'black',
            eyes: 'dark brown',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'medium',
            hair: 'brown',
            eyes: 'hazel',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'medium',
            hair: 'black',
            eyes: 'light brown',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'medium',
            hair: 'black',
            eyes: 'green',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'medium',
            hair: 'brown',
            eyes: 'dark brown',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'medium',
            hair: 'brown',
            eyes: 'light brown',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'medium',
            hair: 'brown',
            eyes: 'green',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'medium',
            hair: 'blonde',
            eyes: 'blue',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'dark',
            hair: 'black',
            eyes: 'dark brown',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'dark',
            hair: 'brown',
            eyes: 'hazel',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'dark',
            hair: 'black',
            eyes: 'light brown',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'dark',
            hair: 'black',
            eyes: 'green',
            recommendedColors: ['#8B4513', '#2E8B57', '#000080', '#FFD700', '#800000', '#FFDAB9', '#9370DB']
        },
        {
            skin: 'dark',
            hair: 'brown',
            eyes: 'dark brown',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'dark',
            hair: 'brown',
            eyes: 'light brown',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'dark',
            hair: 'brown',
            eyes: 'green',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        {
            skin: 'dark',
            hair: 'blonde',
            eyes: 'blue',
            recommendedColors: ['#FFC0CB', '#00FF00', '#87CEEB', '#D2B48C', '#808000', '#FF7F50', '#FF00FF']
        },
        // Add more combinations as needed
    ];
    

    // Find matching combination
    const matchingCombination = colorCombinations.find(combination =>
        combination.skin === skinColor &&
        combination.hair === hairColor &&
        combination.eyes === eyeColor
    );

    if (matchingCombination) {
        const recommendedColors = matchingCombination.recommendedColors;

        // Clear previous palette
        paletteContainer.innerHTML = '';

        // Display recommended colors
        recommendedColors.forEach(color => {
            const div = document.createElement('div');
            div.style.backgroundColor = color;
            paletteContainer.appendChild(div);
        });
    } else {
        paletteContainer.innerHTML = '<p>No matching palette found for selected colors.</p>';
    }
}
