document.addEventListener("DOMContentLoaded", () => {
	// Initial Setup
	const startScreen = document.getElementById("start-screen");
	const imageContainer = document.getElementById("image-container");
	const memoryText = document.getElementById("memory-text");
	const finalSurprise = document.getElementById("final-surprise");
	const textContent = document.getElementById("text-content");

	let currentTextIndex = 0;
	const texts = [
		"Ты мое солнышко в пасмурный день ☀️",
		"С тобой даже дождь кажется теплым ❤️‍🔥",
		"Когда ты рядом, все становится легче 😊",
		"Спасибо за то, что ты есть в моей жизни ❤️",
		"С тобой даже тишина говорит о любви 💋",
		"Твоя улыбка лечит мою душу 😊",
		"Я очень счастлив быть с тобой ❤️",
	];

	// Заранее указанные позиции для картинок (в процентах)
	const predefinedPositions = [
		{ top: 10, left: 20 },
		{ top: 30, left: 50 },
		{ top: 50, left: 80 },
		{ top: 70, left: 10 },
		{ top: 90, left: 40 },
		{ top: 20, left: 70 },
		{ top: 40, left: 30 },
		{ top: 60, left: 60 },
		{ top: 80, left: 90 },
		{ top: 15, left: 45 },
		{ top: 25, left: 15 }, // Добавленные позиции
		{ top: 55, left: 25 },
		{ top: 75, left: 55 },
		{ top: 85, left: 75 },
		{ top: 10, left: 65 },
	];

	const imagePaths = [
		"images/hearty.png",
		"images/kiss.png",
		"images/kiss_2.png",
		"images/letter.png",
		"images/rose.png",
	];

	const imagesOnScreen = []; // Track images currently on screen

	// Event Listener for Continue Button
	document.getElementById("continue-btn").addEventListener("click", () => {
		startScreen.classList.add("hidden");
		showImages();
		startChaoticUpdates(); // Start chaotic updates
		showNextText();
	});

	// Show Images at Predefined Positions
	function showImages() {
		predefinedPositions.forEach((position) => {
			const img = document.createElement("img");
			img.src = imagePaths[Math.floor(Math.random() * imagePaths.length)]; // Random initial image
			img.classList.add("image-item");
			img.style.top = `${position.top}vh`; // Use vh for responsive positioning
			img.style.left = `${position.left}vw`; // Use vw for responsive positioning
			img.style.width = `${Math.random() * 10 + 5}vw`; // Responsive width
			img.style.transform = `rotate(${Math.random() * 30 - 15}deg)`; // Random rotation
			imageContainer.appendChild(img);
			imagesOnScreen.push(img); // Track the image
		});
	}

	// Start Chaotic Updates
	function startChaoticUpdates() {
		imagesOnScreen.forEach((img) => {
			setTimeout(() => updateSingleImage(img), Math.random() * 5000 + 2000);
		});
	}

	// Update a Single Image
	function updateSingleImage(img) {
		img.classList.add("fade-out"); // Start fading out

		setTimeout(() => {
			img.src = imagePaths[Math.floor(Math.random() * imagePaths.length)]; // Change image source
			img.style.width = `${Math.random() * 10 + 5}vw`; // Responsive width
			img.style.transform = `rotate(${Math.random() * 30 - 15}deg)`; // Random rotation
			img.classList.remove("fade-out");
			setTimeout(() => updateSingleImage(img), Math.random() * 5000 + 2000);
		}, 1000);
	}

	// Show Next Text
	function showNextText() {
		if (currentTextIndex < texts.length) {
			textContent.textContent = texts[currentTextIndex];
			memoryText.classList.remove("hidden");
			currentTextIndex++;
		} else {
			memoryText.classList.add("hidden");
			finalSurprise.classList.remove("hidden");
		}
	}

	// Debounce Function to Prevent Multiple Triggers
	let isProcessingClick = false; // Flag to track ongoing interactions
	let interactionTimeout = null; // Timeout to track the 2.5-second delay

	function handleInteractionStart(event) {
		if (isProcessingClick) return; // Ignore if already processing

		// Set a timeout for 2.5 seconds
		interactionTimeout = setTimeout(() => {
			isProcessingClick = true; // Allow interaction after 2.5 seconds

			// Process the interaction
			if (!startScreen.classList.contains("hidden")) return;
			if (!finalSurprise.classList.contains("hidden")) return;

			// Prevent default behavior only if it's not passive
			if (event.cancelable) {
				event.preventDefault();
			}

			showNextText();

			// Reset the flag after a short delay
			setTimeout(() => {
				isProcessingClick = false;
			}, 500); // 500ms cooldown to prevent rapid skipping
		}, 500); // 2.5-second delay
	}

	function handleInteractionEnd() {
		// Clear the timeout if the interaction ends before 2.5 seconds
		if (interactionTimeout) {
			clearTimeout(interactionTimeout);
			interactionTimeout = null;
		}
	}

	// Handle Mouse Events
	document.addEventListener("mousedown", handleInteractionStart);
	document.addEventListener("mouseup", handleInteractionEnd);

	// Handle Touch Events
	document.addEventListener(
		"touchstart",
		(event) => {
			handleInteractionStart(event);
		},
		{ passive: false } // Disable passive mode
	);

	document.addEventListener(
		"touchend",
		(event) => {
			handleInteractionEnd(event);
		},
		{ passive: false } // Disable passive mode
	);
});
